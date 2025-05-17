import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import { resolve } from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  if (command === "serve") {
    // dev config - playground
    return {
      plugins: [react(), tailwindcss(), tsConfigPaths()],
      root: ".",
      publicDir: "playground/public",
    };
  }
  // build config - library
  return {
    plugins: [react(), tailwindcss(), tsConfigPaths()],
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "UiReact",
        fileName: "index",
        formats: ["es", "cjs"] as const,
      },
      rollupOptions: {
        external: ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
          assetFileNames: "index[extname]",
        },
      },
    },
  };
});
