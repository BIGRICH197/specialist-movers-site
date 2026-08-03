/** @type {import('next').NextConfig} */

import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const legacyAucklandUrls = JSON.parse(
  readFileSync(join(__dirname, "lib/legacy-auckland-urls.json"), "utf8"),
);

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
  compress: true,
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
  async headers() {
    return [
      {
        // Baseline security headers on every route.
        //
        // Deliberately excluded for now:
        //  - Content-Security-Policy: needs a Report-Only run first. A strict
        //    policy would break the Trustindex widget, Google Maps address
        //    autocomplete, and GTM.
        //  - HSTS includeSubDomains/preload: the header is already set (see
        //    Vercel), but includeSubDomains forces HTTPS on every subdomain and
        //    preload is effectively irreversible. Confirm subdomains first.
        //
        // Referrer-Policy is strict-origin-when-cross-origin (Chrome's own
        // default) on purpose. Do NOT tighten to no-referrer: it would strip
        // this site from referral partners' analytics.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
        ],
      },
      {
        source: "/llms.txt",
        headers: [
          {
            key: "Content-Type",
            value: "text/plain; charset=utf-8",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        source: "/:path*\\.(jpg|jpeg|png|webp|avif|gif|svg|ico|woff|woff2|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/logo-lab", destination: "/logo-lab.html" },
        ...legacyAucklandRewrites(),
      ],
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
      // Legacy root-level URLs flagged as 404 in Search Console (2026-07).
      {
        source: "/packing-hacks-for-auckland-movers-maximize-space-and-minimize-stress",
        destination: "/blog/diy-packing-vs-professional-packing-services",
        permanent: true,
      },
      {
        source: "/expert-tips-for-choosing-the-best-piano-movers-in-auckland",
        destination: "/piano-movers",
        permanent: true,
      },
      {
        source: "/what-to-look-for-in-a-reliable-house-moving-company-in-auckland",
        destination: "/blog/the-ultimate-guide-to-house-moving-in-auckland",
        permanent: true,
      },
      {
        source: "/seasonal-moving-in-auckland-tips-for-summer-and-winter-moves",
        destination:
          "/blog/stress-free-moving-in-auckland-expert-tips-from-specialist-movers",
        permanent: true,
      },
      {
        source: "/booking",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/international-piano-moves-to",
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
        destination: "/international-moving",
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
        source: "/house-movers-hamilton",
        destination: "/services/house-moving-hamilton",
        permanent: true,
      },
      {
        source: "/house-movers-hamilton/",
        destination: "/services/house-moving-hamilton",
        permanent: true,
      },
      {
        source: "/locations/auckland-central",
        destination: "/locations/central-auckland",
        permanent: true,
      },
      {
        source: "/locations/auckland-central/",
        destination: "/locations/central-auckland",
        permanent: true,
      },
      ...cityRedirects(),
    ];
  },
};

export default nextConfig;
