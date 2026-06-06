/** @type {import('next').NextConfig} */

import legacyAucklandUrls from "./lib/legacy-auckland-urls.json" with { type: "json" };

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

function aucklandServicePath(slug) {
  const legacy = legacyAucklandUrls.find((entry) => entry.slug === slug);
  return legacy ? legacy.legacyPath : `/services/${slug}`;
}

function cityRedirects() {
  const rules = [];
  for (const slug of serviceSlugs) {
    rules.push({
      source: `/services/${slug}/auckland`,
      destination: aucklandServicePath(slug),
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

/** Live WordPress Auckland URLs → serve the matching /services/{slug} page. */
function legacyAucklandRewrites() {
  const rules = [];
  for (const entry of legacyAucklandUrls) {
    const destination = `/services/${entry.slug}`;
    rules.push({ source: entry.legacyPath, destination });
    for (const alias of entry.aliases ?? []) {
      rules.push({ source: alias, destination });
    }
  }
  return rules;
}

/** One canonical URL per Auckland service (legacy path from live site). */
function legacyAucklandCanonicalRedirects() {
  return legacyAucklandUrls.map((entry) => ({
    source: `/services/${entry.slug}`,
    destination: entry.legacyPath,
    permanent: true,
  }));
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
  async rewrites() {
    return {
      beforeFiles: legacyAucklandRewrites(),
    };
  },
  async redirects() {
    return [
      ...legacyAucklandCanonicalRedirects(),
      {
        source: "/business-relocation-auckland",
        destination: "/commercial-moving-auckland",
        permanent: true,
      },
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/policies",
        permanent: true,
      },
      {
        source: "/the-ultimate-guide-to-house-moving-in-auckland",
        destination: "/blog/the-ultimate-guide-to-house-moving-in-auckland",
        permanent: true,
      },
      {
        source: "/diy-packing-vs-professional-packing-services",
        destination: "/blog/diy-packing-vs-professional-packing-services",
        permanent: true,
      },
      {
        source: "/stress-free-moving-in-auckland-expert-tips-from-specialist-movers",
        destination:
          "/blog/stress-free-moving-in-auckland-expert-tips-from-specialist-movers",
        permanent: true,
      },
      {
        source: "/international-piano-moves",
        destination: "/piano-movers/international-piano",
        permanent: true,
      },
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
        destination: "/piano-movers",
        permanent: true,
      },
      {
        source: "/piano-movers-auckland/",
        destination: "/piano-movers",
        permanent: true,
      },
      {
        source: "/piano-movers/auckland",
        destination: "/piano-movers",
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
      ...cityRedirects(),
    ];
  },
};

export default nextConfig;
