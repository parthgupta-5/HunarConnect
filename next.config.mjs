/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Force Next.js to use the pages router ONLY
  experimental: {
    appDir: false,
  },
};