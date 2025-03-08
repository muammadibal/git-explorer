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
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.github.com/:path*',
      },
    ]
  },
};

export default nextConfig;
