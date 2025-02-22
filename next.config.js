/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.rotaracthub.in',
        pathname: '/api/companies/get-image/**',
      },
    ],
  },
};

module.exports = nextConfig;
