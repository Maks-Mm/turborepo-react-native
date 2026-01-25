/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@repo/ui", "@repo/auth"],
  
  // Webpack config for standard builds/fallback
  webpack: (config) => {
    config.resolve.alias["react-native"] = "react-native-web";
    return config;
  },

  // This tells Next.js 16+ how to handle aliases in Turbopack
  experimental: {
    turbo: {
      resolveAlias: {
        'react-native': 'react-native-web',
      },
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

module.exports = nextConfig;