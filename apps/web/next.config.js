// apps/web/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/auth'],
  
  // Add an empty turbopack config to silence the error
  turbopack: {},
  
  // Keep webpack config for non-Turbopack builds
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
      'react-native-svg$': 'react-native-svg-web',
      'lucide-react-native$': 'lucide-react',
    };
    return config;
  },
};

module.exports = nextConfig;