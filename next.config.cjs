/** @type {import('next').NextConfig} */
const webpack = require("webpack");
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    domains: ['infowarescripts.com'],
  experimental: {
      images: {
          allowFutureImage: true
      }
    },
  },
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.plugins.push(
  //       new webpack.ProvidePlugin({
  //         $: "jquery",
  //         jQuery: "jquery",
  //         "window.jQuery": "jquery",
  //       })
  //     );
  //   }
  //   return config;
  // },
};

module.exports = nextConfig;
