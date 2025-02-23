/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ncaa-openai.onrender.com",
      },
    ],
  },
};

module.exports = nextConfig;
