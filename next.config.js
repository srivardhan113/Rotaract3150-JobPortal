/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['backend.rotaracthub.in'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'backend.rotaracthub.in',
          pathname: '/api/companies/get-image/**',
        },
      ],
    },
  }

module.exports = nextConfig
