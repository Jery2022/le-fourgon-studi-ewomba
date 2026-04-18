import { defineConfig } from "vite";

export default defineConfig({
  optimizeDeps: {
    exclude: ["react-router-dom", "react", "react-dom", "styled-components"],
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
});
