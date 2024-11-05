import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    staleTimes: {
      static: 3600,
    },
  },
};

export default nextConfig;
