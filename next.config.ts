import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // crossOrigin(172.16.2.8)
  allowedDevOrigins: ['172.16.2.8:3000', '172.16.2.8:3000'],
};

export default nextConfig;
