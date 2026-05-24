import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";
import { defineConfig as defineViteConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// If building on Render, bypass the Cloudflare plugin to output a standard Node server.
const isRender = process.env.RENDER === "true";

export default isRender
  ? defineViteConfig({
      plugins: [
        tsconfigPaths(),
        tailwindcss(),
        tanstackStart(),
        react(),
      ],
    })
  : defineLovableConfig({
      tanstackStart: {
        server: { entry: "server" },
      },
    });
