/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'http',
          hostname: 'localhost',
          port: '8000', // Port Laravel Anda
          pathname: "/storage/**",
        },
      ],
    },
  };

export default nextConfig;
