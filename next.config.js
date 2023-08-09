/** @type {import('next').NextConfig} */
const nextConfig = {
    /* config options here */
  }
   
  module.exports = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.resolve.fallback.fs = false;
      }
      return config;
    },
  }
  