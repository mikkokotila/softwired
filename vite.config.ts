import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Install newer builds automatically instead of leaving an old waiting
      // worker in control until the learner discovers a settings button.
      registerType: "autoUpdate",
      includeAssets: ["icons/*.png", "favicon.svg", "licenses/*.txt"],
      manifest: {
        name: "SOFTWIRED — Terveystieto 8",
        short_name: "Softwired",
        description:
          "Pieni hetki, vahvempi osaaminen. Terveystiedon oma oppimispolku.",
        lang: "fi",
        theme_color: "#080b13",
        background_color: "#080b13",
        display: "standalone",
        start_url: "/",
        scope: "/",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
          {
            src: "/icons/maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
        globPatterns: ["**/*.{js,css,html,png,svg,woff2}"],
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api\//],
        cleanupOutdatedCaches: true,
      },
    }),
  ],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: "vendor", test: /node_modules/ },
            { name: "curriculum", test: /src\/content\// },
          ],
        },
      },
    },
  },
  server: {
    proxy: { "/api": { target: "http://127.0.0.1:3001", changeOrigin: false } },
    strictPort: true,
  },
  preview: { port: 4173, strictPort: true },
});
