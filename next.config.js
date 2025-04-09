const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
  output: 'export',
  assetPrefix: '', // ✅ deploys to root
  basePath: '',    // ✅ deploys to root
};

module.exports = nextConfig;
