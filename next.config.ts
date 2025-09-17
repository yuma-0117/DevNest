import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["http://localhost:3000"],
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
