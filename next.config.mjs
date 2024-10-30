/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '', // Optional; leave as an empty string if there's no specific port.
        pathname: '/**', // Allows all paths from this domain.
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '', // Leave empty for default port
        pathname: '/**', // Allows all paths
      },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;