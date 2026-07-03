/**
 * render-server.mjs
 * Serves static assets from dist/client/ and falls back to the compiled
 * TanStack Start SSR fetch handler for all other requests.
 */
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const port = process.env.PORT || 3000;
const clientDir = join(__dirname, "dist", "client");

const MIME_TYPES = {
  ".html": "text/html",
  ".js":   "application/javascript",
  ".mjs":  "application/javascript",
  ".css":  "text/css",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".avif": "image/avif",
  ".webp": "image/webp",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".ttf":  "font/ttf",
  ".txt":  "text/plain",
};

// Import the compiled TanStack Start / Cloudflare-style SSR handler
const { default: handler } = await import("./dist/server/server.js");

// --- Crash prevention: global safety net ---
// Clients (bots, health probes, flaky mobile connections) that drop a
// connection mid-request cause Node's HTTP internals to throw
// `Error: aborted` / ECONNRESET as an *uncaught* exception, crashing
// the process. We swallow those specific errors here; everything else
// is still treated as fatal so real bugs surface normally.
process.on('uncaughtException', (err) => {
  if (err.message === 'aborted' || err.code === 'ECONNRESET') {
    console.warn('[server] client disconnected early, ignoring:', err.message);
    return;
  }
  console.error('[server] fatal uncaught exception:', err);
  process.exit(1);
});

const server = createServer(async (req, res) => {
  // --- Crash prevention: per-request aborted/close listener ---
  // The `for await` body-read loop below throws `Error: aborted` as an
  // uncaught exception when a client drops the connection mid-read.
  // Attaching a `close` listener here tells Node the event is handled,
  // preventing it from surfacing as an uncaught exception.
  let clientAborted = false;
  req.on('close', () => { clientAborted = true; });
  // `aborted` is deprecated in Node 17+ but kept for older runtimes
  req.on('aborted', () => { clientAborted = true; });

  // 1. Try to serve a static file from dist/client/
  const decodedPathname = decodeURIComponent(req.url.split("?")[0]);
  const filePath = join(clientDir, decodedPathname);
  if (existsSync(filePath) && statSync(filePath).isFile()) {
    const ext = extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    // Long-lived cache for hashed assets, short for everything else
    const isHashed = /\.[a-f0-9]{8,}\.\w+$/.test(filePath);
    res.writeHead(200, {
      "Content-Type": contentType,
      "Cache-Control": isHashed
        ? "public, max-age=31536000, immutable"
        : "public, max-age=3600",
    });
    createReadStream(filePath).pipe(res);
    return;
  }

  // 2. Fall back to the SSR handler
  const host = req.headers.host || `localhost:${port}`;
  const url = new URL(req.url, `http://${host}`);

  const chunks = [];
  try {
    for await (const chunk of req) chunks.push(chunk);
  } catch (readErr) {
    if (clientAborted || readErr.message === 'aborted' || readErr.code === 'ECONNRESET') {
      console.warn('[server] client disconnected during body read:', req.url);
      return; // connection is gone, nothing to respond to
    }
    throw readErr; // re-throw unexpected read errors
  }
  const body = chunks.length > 0 ? Buffer.concat(chunks) : null;

  const request = new Request(url, {
    method: req.method,
    headers: Object.fromEntries(
      Object.entries(req.headers).filter(([, v]) => v !== undefined)
    ),
    ...(body && req.method !== "GET" && req.method !== "HEAD"
      ? { body, duplex: "half" }
      : {}),
  });

  try {
    const response = await handler.fetch(request, {}, { waitUntil: () => {} });

    const headers = {};
    response.headers.forEach((value, key) => { headers[key] = value; });
    res.writeHead(response.status, headers);

    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (err) {
    console.error("SSR error:", err);
    res.writeHead(500);
    res.end("Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Bellcrest Family Clinic server running on http://localhost:${port}`);
});
