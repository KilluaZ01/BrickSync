import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // For local development
        secure: false,
      },
    },
  },
  define: {
    // For frontend to correctly handle environment-based API URLs
    "process.env": {
      VITE_API_URL:
        process.env.VITE_API_URL || "https://bricksync.onrender.com", // Set the default production URL here
    },
  },
});
