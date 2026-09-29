import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 80, 85, 90],
    deviceSizes: [390, 640, 768, 1024, 1280, 1536, 1920, 2560],
    // Photos saisies dans le Studio Sanity (références), limitées au projet du site.
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/dpjlojol/**" }],
  },
  /* config options here */
};

export default nextConfig;
