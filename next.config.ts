import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/git-explorer",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
