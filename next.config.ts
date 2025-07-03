import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ⚠️ Ignora ESLint durante build
  },
};

export default nextConfig;
