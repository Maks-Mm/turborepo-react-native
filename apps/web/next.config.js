/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native$": "react-native-web",
    };
    return config;
  },

  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};

module.exports = nextConfig;
