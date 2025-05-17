import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint during builds
  },
  trailingSlash: true,
  output: 'export', // Enables static export
  images: {
    unoptimized: true, // Disables Image Optimization API
  },
};

export default nextConfig;