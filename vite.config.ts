import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import sitemap from "vite-plugin-sitemap";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    sitemap({
      hostname: "https://medibiotech.vn",
      dynamicRoutes: [
        "/",
        "/gioi-thieu",
        "/san-pham",
        "/lien-he",
        "/tin-tuc",
        "/chinh-sach",
        "/quy-trinh-san-xuat",
        "yeu-thich",
      ],
    }),
  ],
});
