
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/app/styles')],
  },
  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
};

module.exports = nextConfig;
