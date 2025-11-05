/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@headlessui/react", "@heroicons/react", "framer-motion", "clsx"],
  },
};

module.exports = nextConfig;
