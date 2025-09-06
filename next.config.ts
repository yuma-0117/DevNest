import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: ["localhost", "devnest.local"],
    },
  },
};

export default nextConfig;
