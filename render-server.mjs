/**
 * render-server.mjs
 * Wraps the compiled TanStack Start Cloudflare-style fetch handler in a
 * standard Node.js HTTP server so it can be hosted on Render as a Web Service.
 */
import { createServer } from "node:http";

const port = process.env.PORT || 3000;

// Dynamically import the compiled server bundle after the build.
const { default: handler } = await import("./dist/server/server.js");

const server = createServer(async (req, res) => {
  const host = req.headers.host || `localhost:${port}`;
  const url = new URL(req.url, `http://${host}`);

  // Buffer the request body (for POST/PUT etc.)
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = chunks.length > 0 ? Buffer.concat(chunks) : null;

  const request = new Request(url, {
    method: req.method,
    headers: Object.fromEntries(
      Object.entries(req.headers).filter(([, v]) => v !== undefined)
    ),
    // GET/HEAD cannot have a body
    ...(body && req.method !== "GET" && req.method !== "HEAD"
      ? { body, duplex: "half" }
      : {}),
  });

  try {
    // Call the TanStack Start / Cloudflare-style handler
    const response = await handler.fetch(request, {}, { waitUntil: () => {} });

    // Forward status + headers
    const headers = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });
    res.writeHead(response.status, headers);

    // Stream the response body
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
    console.error("Server error:", err);
    res.writeHead(500);
    res.end("Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Bellcrest Family Clinic server running on http://localhost:${port}`);
});
