import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["https://raw.githubusercontent.com", "https://pokeapi.co"], //make it 'your-domain.com'
  },
};

export default nextConfig;
