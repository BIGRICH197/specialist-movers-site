/** @type {import('next').NextConfig} */

const serviceSlugs = [
  "house-moving",
  "office-moving",
  "commercial-moving",
  "packing-services",
  "hard-to-shift",
  "cleaning-services",
  "international-moving",
  "loading-unloading",
  "winz-quotes",
  "storage",
];

function cityRedirects() {
  const rules = [];
  for (const slug of serviceSlugs) {
    rules.push({
      source: `/services/${slug}/auckland`,
      destination: `/services/${slug}`,
      permanent: true,
    });
    rules.push({
      source: `/services/${slug}/hamilton`,
      destination: `/services/${slug}-hamilton`,
      permanent: true,
    });
  }
  return rules;
}

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
        source: "/services/piano-movers/auckland",
        destination: "/piano-movers/auckland",
        permanent: true,
      },
      {
        source: "/services/piano-movers/hamilton",
        destination: "/piano-movers/hamilton",
        permanent: true,
      },
      {
        source: "/piano-movers-auckland",
        destination: "/piano-movers/auckland",
        permanent: true,
      },
      {
        source: "/piano-movers-auckland/",
        destination: "/piano-movers/auckland",
        permanent: true,
      },
      {
        source: "/piano-movers-hamilton",
        destination: "/piano-movers/hamilton",
        permanent: true,
      },
      {
        source: "/piano-movers-hamilton/",
        destination: "/piano-movers/hamilton",
        permanent: true,
      },
      {
        source: "/piano-tuning",
        destination: "/piano-movers/piano-tuning",
        permanent: true,
      },
      {
        source: "/piano-tuning/",
        destination: "/piano-movers/piano-tuning",
        permanent: true,
      },
      {
        source: "/piano-movers/piano-tuning-hamilton",
        destination: "/piano-movers/piano-tuning",
        permanent: true,
      },
      {
        source: "/services/moving/international-moving",
        destination: "/services/international-moving",
        permanent: true,
      },
      {
        source: "/services/moving-hamilton",
        destination: "/services/moving",
        permanent: true,
      },
      {
        source: "/services/moving/auckland",
        destination: "/services/moving",
        permanent: true,
      },
      {
        source: "/services/moving/hamilton",
        destination: "/services/moving",
        permanent: true,
      },
      {
        source: "/specialties",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/specialties/:path*",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/cleaning-bookings",
        destination: "/services/cleaning-services",
        permanent: true,
      },
      {
        source: "/cleaning-bookings/",
        destination: "/services/cleaning-services",
        permanent: true,
      },
      ...cityRedirects(),
    ];
  },
};

export default nextConfig;
