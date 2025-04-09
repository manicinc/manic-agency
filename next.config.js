// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Required for static export
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
  
  // Output as static HTML/CSS/JS (replaces the old "export" command)
  output: 'export',
  
  // Skip TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip ESLint checking during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Add rewrites for blog posts (these only work in dev/server mode, not with export)
  // For static exports, you'll need to rely on client-side redirects
  
  // GitHub Pages configuration
  basePath: process.env.GITHUB_ACTIONS ? '/manic-agency' : '',
  assetPrefix: process.env.GITHUB_ACTIONS ? '' : '',
};

module.exports = nextConfig;