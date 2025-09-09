import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Configurações do Next.js */
  reactStrictMode: true, // opcional, mas recomendado
  eslint: {
    ignoreDuringBuilds: true, // ⚠️ desativa o ESLint no build
  },
  images: {
    domains: [
      "d4lgxe9bm8juw.cloudfront.net",
      "www.youtube.com",
      "img.youtube.com",
      "cdn.pixabay.com",
    ],
  },
};

export default nextConfig;
