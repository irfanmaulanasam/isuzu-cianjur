/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ['via.placeholder.com'], // Ini yang harus ditambahkan
  },
};

export default nextConfig;
