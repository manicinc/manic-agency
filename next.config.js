
const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'src/app/styles')],
      },
}

module.exports = nextConfig
