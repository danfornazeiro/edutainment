import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig = {
  images: {
    domains: [
      "d4lgxe9bm8juw.cloudfront.net",
      "www.youtube.com",
      "img.youtube.com",
      "cdn.pixabay.com",
    ],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
})(nextConfig);
