// next.config.js
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
  
  // Skip TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Add rewrites for blog posts
  async rewrites() {
    return [
      {
        source: '/blog/:slug',
        destination: '/api/find-post-category/:slug',
      },
    ];
  },

  // GitHub Pages configuration
  assetPrefix: process.env.GITHUB_ACTIONS ? '/manic-agency/' : '',
  basePath: process.env.GITHUB_ACTIONS ? '' : '',
};

module.exports = nextConfig;