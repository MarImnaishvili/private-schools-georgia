import nextIntl from "next-intl/plugin";

const withNextIntl = nextIntl();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your existing Next.js config options here
};

export default withNextIntl(nextConfig);
