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
  
  // Output as static HTML/CSS/JS
  output: 'export',
  
  // Skip TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Skip ESLint checking during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // For local development, don't use any base path
  basePath: process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS 
    ? '' 
    : '',
  
  assetPrefix: process.env.NODE_ENV === 'production' && process.env.GITHUB_ACTIONS 
    ? '' 
    : '',
};

module.exports = nextConfig;