import { NextConfig } from "next";
import dotenv from "dotenv";
dotenv.config();

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: ["122.155.209.212"], // Allow images from your server
    unoptimized: true, // Disable Next.js image optimization (useful for external hosting)
  },

  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000, // Adjust if needed
        aggregateTimeout: 300,
        ignored: /node_modules/, // Avoid unnecessary file watching
      };
    }

    return config;
  },
};

export default nextConfig;
