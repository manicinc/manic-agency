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
  assetPrefix: process.env.NODE_ENV === 'production' ? '/logomaker' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/logomaker' : '',

  // ✅ THIS is the important part for static exports
  output: 'export',
};

module.exports = nextConfig;
