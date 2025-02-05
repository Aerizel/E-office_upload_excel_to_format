import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpackDevMiddleware: (config: any) => {
    config.watchOptions = {
      poll: 800,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;
