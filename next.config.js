/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  sassOptions: {
    includePaths: [require('path').join(process.cwd(), 'src/app/styles')],
  },
  // Skip TypeScript checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  assetPrefix: process.env.GITHUB_ACTIONS ? '/manic-agency/' : '',
  basePath: process.env.GITHUB_ACTIONS ? '/manic-agency/' : '',
};

module.exports = nextConfig;