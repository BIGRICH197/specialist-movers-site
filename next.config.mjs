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

/**
 * Report-Only CSP. Never blocks anything — the browser evaluates the policy and
 * reports violations to the console, so we can find every host the site really
 * needs before switching to enforcement.
 *
 * Built from the hosts referenced in app/, components/ and lib/, plus what the
 * Lighthouse run on 2026-08-07 observed at runtime (GTM, GA, Trustindex,
 * Google Maps autocomplete, Google avatars).
 *
 * 'unsafe-inline' and 'unsafe-eval' in script-src are required by Next 14's
 * inline hydration bootstrap. Removing them needs nonces, which is a separate
 * job — don't drop them just because a scanner complains.
 *
 * Before enforcing: run this for a week, collect the violation reports, and
 * fold any missing hosts in. Enforcing this as-is is untested.
 */
const cspReportOnly = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://cdn.trustindex.io https://maps.googleapis.com https://va.vercel-scripts.com",
  "style-src 'self' 'unsafe-inline' https://cdn.trustindex.io",
  "img-src 'self' data: blob: https://lh3.googleusercontent.com https://cdn.trustindex.io https://www.googletagmanager.com https://www.google-analytics.com https://maps.gstatic.com https://maps.googleapis.com https://www.google.com https://www.google.co.nz",
  "font-src 'self' data:",
  "connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://cdn.trustindex.io https://maps.googleapis.com https://va.vercel-scripts.com",
  "frame-src 'self' https://www.googletagmanager.com https://td.doubleclick.net https://www.google.com",
].join("; ");

const nextConfig = {
  compress: true,
  images: {
    // Next's default is ["image/webp"] only. AVIF typically lands 20-30%
    // under WebP at the same visual quality, and every browser we target
    // supports it. The optimizer tries formats in order and falls back to
    // WebP, then the original, so older clients are unaffected.
    //
    // This is what PageSpeed's "increasing the image compression factor"
    // note on the hero photo was asking for. Dropping `quality` below the
    // default 75 was the other option and was rejected: the hero is the LCP
    // element and the most-looked-at photo on the site, so trading visible
    // quality for a few KiB there is the wrong side of the deal.
    formats: ["image/avif", "image/webp"],
    // No minimumCacheTTL override here, deliberately. The worry with moving
    // static logos onto the optimizer is that /_next/image responses fall back
    // to Next's 60s default while raw files get a year from the headers() rule
    // below. That does not happen on this site: the optimizer inherits the
    // upstream Cache-Control, and the headers() rule already stamps
    // `max-age=31536000, immutable` on files with an extension. Verified on a
    // production build — an optimized response comes back with
    // `max-age=31536000`, so a floor lower than that would be dead config.
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
        // CSP now ships in Report-Only mode (see cspReportOnly above) — the
        // documented prerequisite before enforcement. It cannot break anything.
        //
        // Still deliberately excluded:
        //  - Content-Security-Policy in ENFORCEMENT mode: needs a week of
        //    Report-Only violation data first. Enforcing untested would break
        //    the Trustindex widget, Google Maps address autocomplete, and GTM.
        //    Lighthouse only credits enforced CSP, so Best Practices stays at
        //    77 until then. That is the correct trade.
        //  - HSTS includeSubDomains/preload: the header is already set (see
        //    Vercel), but includeSubDomains forces HTTPS on every subdomain and
        //    preload is effectively irreversible. Confirm subdomains first.
        //
        // Referrer-Policy is strict-origin-when-cross-origin (Chrome's own
        // default) on purpose. Do NOT tighten to no-referrer: it would strip
        // this site from referral partners' analytics.
        //
        // COOP is same-origin-allow-popups, not same-origin: the latter breaks
        // OAuth/share popups and Google Maps auth windows.
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Content-Security-Policy-Report-Only",
            value: cspReportOnly,
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
      // "Te Atatū" used to slugify to "te-atat" (the macron strip ate the
      // trailing vowel). That URL indexed and self-canonicalised, so it keeps
      // its 301 even though nothing generates it any more.
      {
        source: "/locations/te-atat",
        destination: "/locations/te-atatu",
        permanent: true,
      },
      // ~200-word stub with a broken step sequence (two "Step 4"s, no Step 6)
      // and no content under any heading. The Ultimate Guide covers the topic.
      {
        source: "/blog/stress-free-moving-in-auckland-expert-tips-from-specialist-movers",
        destination: "/blog/the-ultimate-guide-to-house-moving-in-auckland",
        permanent: true,
      },
      // Both of these 404'd while "furniture movers" was the primary goal term.
      {
        source: "/furniture-movers",
        destination: "/furniture-movers-auckland",
        permanent: true,
      },
      {
        source: "/furniture-removals-auckland",
        destination: "/furniture-movers-auckland",
        permanent: true,
      },
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
        // Was pointing at the stub, which now redirects on to the guide.
        // Sent straight there so this stays a single hop.
        source: "/stress-free-moving-in-auckland-expert-tips-from-specialist-movers",
        destination: "/blog/the-ultimate-guide-to-house-moving-in-auckland",
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
        destination: "/blog/the-ultimate-guide-to-house-moving-in-auckland",
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
