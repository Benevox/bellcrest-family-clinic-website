/**
 * render-server.mjs
 * Serves static assets from dist/client/ and falls back to the compiled
 * TanStack Start SSR fetch handler for all other requests.
 *
 * Hardened against all known crash vectors:
 *  - Client disconnections (ECONNRESET / aborted) at any point in the pipeline
 *  - Malformed request URLs from scanner bots
 *  - Static file stream errors (file deleted between existsSync and read)
 *  - Double-response errors (ERR_HTTP_HEADERS_SENT) in the SSR error path
 *  - Oversized request bodies
 *  - Slow/hung connections (request timeout)
 *  - Unhandled promise rejections from any async code
 */
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const port = process.env.PORT || 3000;
const clientDir = join(__dirname, "dist", "client");

// Maximum request body size (1 MB). Requests exceeding this are rejected
// to prevent memory exhaustion from bots or malformed clients.
const MAX_BODY_BYTES = 1 * 1024 * 1024;

// Timeout (ms) before we forcibly end a slow/hung request.
const REQUEST_TIMEOUT_MS = 30_000;

const MIME_TYPES = {
  ".html":  "text/html",
  ".js":    "application/javascript",
  ".mjs":   "application/javascript",
  ".css":   "text/css",
  ".json":  "application/json",
  ".png":   "image/png",
  ".jpg":   "image/jpeg",
  ".jpeg":  "image/jpeg",
  ".avif":  "image/avif",
  ".webp":  "image/webp",
  ".svg":   "image/svg+xml",
  ".ico":   "image/x-icon",
  ".woff":  "font/woff",
  ".woff2": "font/woff2",
  ".ttf":   "font/ttf",
  ".txt":   "text/plain",
};

// ---------------------------------------------------------------------------
// Global process-level safety nets
// ---------------------------------------------------------------------------

// Catch ECONNRESET / aborted errors that escape every other handler.
// These are always caused by client-side network behaviour, never by bugs
// in application code. Everything else is still treated as fatal.
process.on("uncaughtException", (err) => {
  if (err.message === "aborted" || err.code === "ECONNRESET" || err.code === "EPIPE") {
    console.warn("[server] client disconnected (uncaughtException), ignoring:", err.message);
    return;
  }
  console.error("[server] fatal uncaught exception:", err);
  process.exit(1);
});

// Unhandled promise rejections — same rule: client disconnects are noise,
// everything else is fatal. Without this handler Node 15+ crashes the process.
process.on("unhandledRejection", (reason) => {
  const err = reason instanceof Error ? reason : new Error(String(reason));
  if (err.message === "aborted" || err.code === "ECONNRESET" || err.code === "EPIPE") {
    console.warn("[server] client disconnected (unhandledRejection), ignoring:", err.message);
    return;
  }
  console.error("[server] fatal unhandled rejection:", err);
  process.exit(1);
});

// ---------------------------------------------------------------------------
// Load the compiled SSR handler
// ---------------------------------------------------------------------------
const { default: handler } = await import("./dist/server/server.js");

// ---------------------------------------------------------------------------
// Helper: safely send an error response only if headers haven't been sent yet
// ---------------------------------------------------------------------------
function safeError(res, status, message) {
  try {
    if (!res.headersSent) {
      res.writeHead(status, { "Content-Type": "text/plain" });
    }
    if (!res.writableEnded) {
      res.end(message);
    }
  } catch {
    // Response is already closed — nothing we can do, and nothing to crash over.
  }
}

// ---------------------------------------------------------------------------
// HTTP server
// ---------------------------------------------------------------------------
const server = createServer(async (req, res) => {
  // ---- Per-request disconnect tracking ----
  // Must be registered before any async work so we catch early disconnects.
  let clientAborted = false;
  const onClientGone = () => { clientAborted = true; };
  req.on("close",   onClientGone);
  req.on("aborted", onClientGone); // deprecated in Node 17+ but harmless

  // ---- Request timeout ----
  // Kill connections that stall (e.g. a bot that opens a socket and never
  // sends data, holding a slot open forever).
  req.setTimeout(REQUEST_TIMEOUT_MS, () => {
    console.warn("[server] request timed out:", req.url);
    safeError(res, 408, "Request Timeout");
    req.destroy();
  });

  // ---- 1. Static assets from dist/client/ ----
  let decodedPathname;
  try {
    decodedPathname = decodeURIComponent(req.url.split("?")[0]);
  } catch {
    // Malformed percent-encoding from scanner bots — just treat as SSR.
    decodedPathname = "/";
  }

  // Path traversal guard: ensure we never escape clientDir.
  const filePath = join(clientDir, decodedPathname);
  if (!filePath.startsWith(clientDir)) {
    safeError(res, 403, "Forbidden");
    return;
  }

  if (existsSync(filePath) && statSync(filePath).isFile()) {
    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const isHashed = /\.[a-f0-9]{8,}\.\w+$/.test(filePath);
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": isHashed
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600",
    });
    const stream = createReadStream(filePath);
    stream.on("error", (streamErr) => {
      // File was deleted between existsSync and read, or a read error occurred.
      console.error("[server] static file stream error:", streamErr.message);
      safeError(res, 500, "Internal Server Error");
    });
    stream.pipe(res);
    return;
  }

  // ---- 2. SSR fallback ----
  let parsedUrl;
  try {
    const host = req.headers.host || `localhost:${port}`;
    parsedUrl = new URL(req.url, `http://${host}`);
  } catch {
    // Malformed URL (e.g. null bytes in the path from a scanner bot).
    safeError(res, 400, "Bad Request");
    return;
  }

  // Read the request body with size and disconnect guards.
  const chunks = [];
  let bodyBytes = 0;
  try {
    for await (const chunk of req) {
      bodyBytes += chunk.length;
      if (bodyBytes > MAX_BODY_BYTES) {
        console.warn("[server] request body too large, rejecting:", req.url);
        safeError(res, 413, "Payload Too Large");
        req.destroy();
        return;
      }
      chunks.push(chunk);
    }
  } catch (readErr) {
    if (clientAborted || readErr.message === "aborted" || readErr.code === "ECONNRESET") {
      console.warn("[server] client disconnected during body read:", req.url);
      return; // connection is gone, nothing to respond to
    }
    console.error("[server] unexpected body read error:", readErr);
    safeError(res, 500, "Internal Server Error");
    return;
  }

  if (clientAborted) {
    // Client disconnected between body read completion and SSR start.
    return;
  }

  const body = chunks.length > 0 ? Buffer.concat(chunks) : null;

  const request = new Request(parsedUrl, {
    method: req.method,
    headers: Object.fromEntries(
      Object.entries(req.headers).filter(([, v]) => v !== undefined)
    ),
    ...(body && req.method !== "GET" && req.method !== "HEAD"
      ? { body, duplex: "half" }
      : {}),
  });

  // ---- SSR handler ----
  try {
    const response = await handler.fetch(request, {}, { waitUntil: () => {} });

    const headers = {};
    response.headers.forEach((value, key) => { headers[key] = value; });

    // Guard: client may have disconnected while SSR was rendering.
    if (clientAborted || res.writableEnded) return;

    res.writeHead(response.status, headers);

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        // Guard: stop writing if the client has gone away mid-stream.
        if (clientAborted || res.writableEnded) {
          reader.cancel().catch(() => {});
          return;
        }
        try {
          res.write(value);
        } catch (writeErr) {
          // EPIPE / ECONNRESET when the client drops during streaming.
          if (writeErr.code === "EPIPE" || writeErr.code === "ECONNRESET") {
            reader.cancel().catch(() => {});
            return;
          }
          throw writeErr;
        }
      }
    }

    if (!res.writableEnded) res.end();
  } catch (err) {
    // ECONNRESET / EPIPE = client gone during SSR — not an application error.
    if (err.code === "ECONNRESET" || err.code === "EPIPE" || err.message === "aborted") {
      console.warn("[server] client disconnected during SSR:", req.url);
      return;
    }
    console.error("[server] SSR error:", err);
    safeError(res, 500, "Internal Server Error");
  }
});

// Catch low-level TCP errors on the server socket itself (e.g. accept() failures).
server.on("error", (err) => {
  console.error("[server] server socket error:", err);
});

server.listen(port, () => {
  console.log(`[server] Bellcrest Family Clinic running on http://localhost:${port}`);
});
