import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/git-explorer",
  images: {
    unoptimized: true,
  },
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  crossOrigin: "anonymous",
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
