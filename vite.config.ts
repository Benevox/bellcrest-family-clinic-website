import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";
import { defineConfig as defineViteConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

// If building on Render, force Nitro to use the Node.js server preset.
// wrangler.jsonc in the project root causes TanStack Start to auto-detect
// Cloudflare, so we override it here before Nitro reads the environment.
const isRender = process.env.RENDER === "true";
if (isRender) {
  process.env.NITRO_PRESET = "node-server";
}

export default isRender
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
