/** @type {import('next').NextConfig} */


// next.config.mjs
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*',
        },
      ],
    },
  };
  
  export default nextConfig;
  
