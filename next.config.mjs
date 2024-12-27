/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'scontent.cdninstagram.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
