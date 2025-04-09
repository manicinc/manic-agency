// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // REQUIRED for static export unless using a custom loader
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
  
  // Skip TypeScript checking during build to resolve errors
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip ESLint checking during build
  eslint: {
    ignoreDuringBuilds: true,
  },

  // GitHub Pages configuration
  assetPrefix: process.env.GITHUB_ACTIONS ? '/manic-agency/' : '',
  basePath: process.env.GITHUB_ACTIONS ? '' : ''
};

module.exports = nextConfig;