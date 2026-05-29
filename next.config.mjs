/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.trustindex.io",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blog/ultimate-guide-house-moving-auckland",
        destination: "/blog/the-ultimate-guide-to-house-moving-in-auckland",
        permanent: true,
      },
      {
        source: "/blog/moving-piano-safely-nz",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/services/piano-movers",
        destination: "/piano-movers",
        permanent: true,
      },
      {
        source: "/services/moving/international-moving",
        destination: "/services/international-moving",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
