// apps/web/next.config.js

const nextConfig = {
  transpilePackages: [
    '@repo/ui',
    '@repo/auth',
    'react-native',
    'react-native-web',
    'expo',
    'expo-router',
    'expo-modules-core'
  ],

  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'react-native$': 'react-native-web',
      'react-native-svg$': 'react-native-svg',
    };

    config.resolve.extensions = [
      '.web.tsx',
      '.web.ts',
      '.web.js',
      ...config.resolve.extensions,
    ];

    return config;
  },
};

module.exports = nextConfig;