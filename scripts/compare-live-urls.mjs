/**
 * Compare live specialistmovers.co.nz URLs vs new site coverage.
 */
const LIVE = "https://www.specialistmovers.co.nz";

function locs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

function toPath(url) {
  try {
    return new URL(url).pathname.replace(/\/$/, "") || "/";
  } catch {
    return url;
  }
}

async function fetchText(url) {
  const r = await fetch(url, { headers: { "User-Agent": "SM-Compare/1" } });
  return { status: r.status, text: r.ok ? await r.text() : "" };
}

async function livePaths() {
  const index = await fetchText(`${LIVE}/sitemap_index.xml`);
  const subs = locs(index.text);
  const all = [];
  for (const u of subs) {
    const sub = await fetchText(u);
    all.push(...locs(sub.text));
  }
  const fromSitemap = [...new Set(all.map(toPath))];

  const home = await fetchText(`${LIVE}/`);
  const hrefs = [
    ...home.text.matchAll(/href=["'](https:\/\/[^"']*specialistmovers\.co\.nz[^"']*|\/[^"'#?]*)/gi),
  ].map((m) => m[1]);
  const fromNav = new Set();
  for (const h of hrefs) {
    const p = h.startsWith("http") ? toPath(h) : h.split("?")[0].split("#")[0].replace(/\/$/, "") || "/";
    if (!p.startsWith("/wp-") && !p.includes(".php")) fromNav.add(p);
  }

  return { fromSitemap, fromNav: [...fromNav].sort() };
}

/** Map live path → new site equivalent or null if missing */
const coverage = {
  "/": "/",
  "/about-us": "/about",
  "/contact": "/contact",
  "/faq": "/faq",
  "/reviews": "/reviews",
  "/blog": "/blog",
  "/services": "/services",
  "/privacy-policy": "/policies",
  "/piano-movers-auckland": "/piano-movers/auckland",
  "/house-moving-and-packing-auckland": "/services/house-moving",
  "/packing-services-auckland": "/services/packing-services",
  "/office-movers-auckland": "/services/office-moving",
  "/commercial-moving-auckland": "/services/commercial-moving",
  "/business-relocation-auckland": "/services/commercial-moving",
  "/hard-to-shift-items": "/services/hard-to-shift",
  "/loading-and-unloading": "/services/loading-unloading",
  "/international-moving": "/services/international-moving",
  "/international-piano-moves": "/piano-movers/international-piano",
  "/winz-quotes": "/services/winz-quotes",
  "/the-ultimate-guide-to-house-moving-in-auckland": "/blog/the-ultimate-guide-to-house-moving-in-auckland",
  "/diy-packing-vs-professional-packing-services": "/blog/diy-packing-vs-professional-packing-services",
  "/stress-free-moving-in-auckland-expert-tips-from-specialist-movers":
    "/blog/stress-free-moving-in-auckland-expert-tips-from-specialist-movers",
};

const noEquivalent = [
  "/apartment-movers-auckland",
  "/retirement-home-movers-auckland",
  "/booking",
  "/booking-hamilton",
  "/cleaning-bookings",
  "/international-moving/moving-to-australia",
  "/expert-tips-for-choosing-the-best-piano-movers-in-auckland",
  "/packing-hacks-for-auckland-movers-maximize-space-and-minimize-stress",
  "/seasonal-moving-in-auckland-tips-for-summer-and-winter-moves",
  "/what-to-look-for-in-a-reliable-house-moving-company-in-auckland",
];

async function main() {
  const { fromSitemap, fromNav } = await livePaths();
  const allLive = [...new Set([...fromSitemap, ...fromNav])].sort();

  const missing = [];
  const redirected = [];
  const covered = [];

  for (const p of fromSitemap) {
    if (noEquivalent.includes(p)) {
      missing.push({ path: p, reason: "no dedicated new page" });
    } else if (coverage[p]) {
      covered.push({ live: p, new: coverage[p] });
    } else if (p.startsWith("/blog/") || p.includes("-auckland") || p.includes("-hamilton")) {
      missing.push({ path: p, reason: "check redirect or content merge" });
    } else {
      missing.push({ path: p, reason: "not mapped" });
    }
  }

  console.log(JSON.stringify({ fromSitemap, fromNavOnly: fromNav.filter((p) => !fromSitemap.includes(p)), covered, missing, noEquivalent }, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
