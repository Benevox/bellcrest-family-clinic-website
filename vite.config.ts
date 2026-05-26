import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";
import { defineConfig as defineViteConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// If building for production (Render, Hostinger, etc.), force Nitro to use the Node.js server preset.
// wrangler.jsonc in the project root causes TanStack Start to auto-detect
// Cloudflare, so we override it here before Nitro reads the environment.
const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER === "true" || process.env.HOSTINGER === "true";
if (isProduction) {
  process.env.NITRO_PRESET = "node-server";
}

export default isProduction
  ? defineViteConfig({
      plugins: [
        tsconfigPaths(),
        tailwindcss(),
        tanstackStart({
          server: { preset: "node-server" },
        }),
        react(),
      ],
    })
  : defineLovableConfig({
      tanstackStart: {
        server: { entry: "server" },
      },
    });
