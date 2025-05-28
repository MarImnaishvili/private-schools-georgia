/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path";
import nextIntl from "next-intl/plugin";

const withNextIntl = nextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config: { resolve: { alias: any } }) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },
  // add other config options here if needed
};

export default withNextIntl(nextConfig);
