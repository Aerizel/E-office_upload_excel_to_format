/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["122.155.209.212"], // Allow images from your server
    unoptimized: true, // Disable Next.js image optimization (useful for external hosting)
  },
  webpackDevMiddleware: (config: any) => {
    config.watchOptions = {
      poll: 1000, // Adjust if needed
      aggregateTimeout: 300,
      ignored: /node_modules/, // Avoid unnecessary file watching
    };
    return config;
  },
};

export default nextConfig;
