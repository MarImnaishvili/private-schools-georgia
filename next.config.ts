// next.config.ts
import nextIntl from "next-intl/plugin";

const withNextIntl = nextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config options
};

export default withNextIntl(nextConfig);
