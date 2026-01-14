import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tailwindcss()],
  base: "./",
  build: {
    outDir: "../app",
    emptyOutDir: false,
    rollupOptions: {
      input: {
        widget: path.resolve(__dirname, "widget.html"),
      },
    },
  },
});
