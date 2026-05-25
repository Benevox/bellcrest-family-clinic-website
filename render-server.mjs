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

const server = createServer(async (req, res) => {
  // 1. Try to serve a static file from dist/client/
  const filePath = join(clientDir, req.url.split("?")[0]);
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
  for await (const chunk of req) chunks.push(chunk);
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
