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
  
  // Configure base path and asset prefix for GitHub Pages
  basePath: isProd ? `/${repoName}` : '',
  assetPrefix: isProd ? `/${repoName}/` : '', // <---- Note trailing slash here!
};

module.exports = nextConfig;