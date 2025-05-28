/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const nextIntl = require("next-intl/plugin");

const withNextIntl = nextIntl();

const nextConfig = {
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
};

module.exports = withNextIntl(nextConfig);
