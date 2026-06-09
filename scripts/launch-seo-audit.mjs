/**
 * Pre-launch SEO audit against specialistmovers.co.nz recommendations.
 */
const BASE = (process.argv[2] ?? "https://specialist-movers-site.vercel.app").replace(/\/$/, "");

const servicePaths = [
  "/services/house-moving",
  "/services/office-moving",
  "/services/commercial-moving",
  "/piano-movers/auckland",
  "/piano-movers",
  "/services/packing-services",
  "/services/hard-to-shift",
  "/services/cleaning-services",
  "/services/international-moving",
  "/services/loading-unloading",
  "/services/winz-quotes",
  "/piano-movers/grand-piano",
  "/piano-movers/upright-piano",
  "/piano-movers/piano-tuning",
  "/apartment-movers-auckland",
  "/piano-movers-hamilton",
  "/house-movers-hamilton",
];

const locationPaths = {
  waikato: ["/locations/cambridge", "/locations/morrinsville", "/locations/te-awamutu", "/locations/matamata"],
  regional: ["/locations/tauranga", "/locations/rotorua", "/locations/taupo", "/locations/thames"],
  longDistance: ["/locations/wellington", "/locations/napier", "/locations/hastings", "/locations/palmerston-north"],
  suburb: ["/locations/herne-bay", "/locations/ponsonby"],
};

function strip(s) {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function hasDirectAnswer(text) {
  const t = text.trim();
  return /^(Yes|No|\$|[0-9]|Two |Three |Four |Most |Every |Upright |Grand |Small |Minimum )/i.test(t);
}

async function fetchPage(path) {
  const url = `${BASE}${path}`;
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "SpecialistMovers-LaunchAudit/1.0" },
      signal: AbortSignal.timeout(35000),
      redirect: "follow",
    });
    const html = await res.text();
    const finalPath = new URL(res.url).pathname;
    return { path, finalPath, status: res.status, html, redirected: finalPath !== path };
  } catch (e) {
    return { path, status: 0, error: e.message, html: "" };
  }
}

function auditService(html, path, finalPath) {
  const issues = [];
  const passes = [];
  const h1 = strip(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
  const faqs = [...html.matchAll(/<dt[^>]*>([\s\S]*?)<\/dt>/gi)].map((m) => ({
    q: strip(m[1]),
  }));
  const answers = [...html.matchAll(/<dd[^>]*>([\s\S]*?)<\/dd>/gi)].map((m) => strip(m[1]));

  const processH2 = html.match(/<h2[^>]*>([^<]*(?:process|How we run|How piano tuning)[^<]*)<\/h2>/gi);
  const hasProcess = processH2 && processH2.length > 0;
  const hasFaqSchema = html.includes("FAQPage");
  const hasWhatWeHandle = /What we handle|What&apos;s included/i.test(html);
  const hasWhy = /Why (choose|offices|families|businesses)/i.test(html);
  const has49 = /4\.9/.test(html);
  const has331 = /331\+?/.test(html);
  const hasReviewExcerpts = html.includes("blockquote") || /What customers say/i.test(html);
  const body = strip(html);
  const shrinkWrap = /shrink wrap|padded blanket|humidity/i.test(body);
  const introLead = strip(html.match(/text-white\/85[^>]*>([\s\S]{40,500}?)<\/p>/i)?.[1] ?? "");
  const seoIntroAfterBadge = /SiteWise Gold certified crew|Grand piano moving in Auckland|Load-only and unload-only|International and inter-island moves from Auckland/i.test(html);

  if (path === "/piano-movers/auckland" && finalPath === "/piano-movers") {
    issues.push("CRITICAL: /piano-movers/auckland redirects to hub");
  } else if (path === "/piano-movers/auckland" && /Piano movers Auckland/i.test(h1)) {
    passes.push("piano-auckland-landing-live");
  }

  if (!h1) issues.push("missing-h1");
  else passes.push("h1");

  if (introLead) {
    const hasPrice = /\$[\d,]+|from \$/i.test(introLead + strip(html.match(/text-white\/90[^>]*>([^<]{0,120})/i)?.[1] ?? ""));
    const hasLoc = /Auckland|Hamilton|Waikato|New Zealand/i.test(introLead);
    const hasCred = /licensed|insured|SiteWise|trusted|specialist|retailer|years/i.test(introLead);
    if (!hasPrice && !seoIntroAfterBadge) issues.push("intro-missing-price");
    if (!hasLoc && !seoIntroAfterBadge) issues.push("intro-missing-location");
    if (!hasCred && !seoIntroAfterBadge) issues.push("intro-missing-credential");
    if (seoIntroAfterBadge) passes.push("seo-intro-after-badge");
  }

  if (hasWhy) passes.push("why-section");
  if (hasWhatWeHandle) passes.push("what-we-handle");
  else issues.push("missing-what-we-handle");

  if (hasProcess) passes.push("process-section");
  else issues.push("missing-process-section");

  if (faqs.length >= 6) passes.push(`faqs-${faqs.length}`);
  else issues.push(`faqs-too-few-${faqs.length}`);

  if (hasFaqSchema) passes.push("faq-schema");
  else if (faqs.length > 0) issues.push("missing-faq-schema");

  const weakAnswers = answers.filter((a) => /^(it depends|please contact)/i.test(a));
  if (weakAnswers.length) issues.push(`weak-faq-openers-${weakAnswers.length}`);

  const nonDirect = answers.filter((a) => !hasDirectAnswer(a) && a.length > 20);
  if (nonDirect.length > 2) issues.push(`faq-answers-not-direct-${nonDirect.length}`);

  if (path.includes("piano") && !shrinkWrap && !path.includes("tuning")) {
    issues.push("piano-page-missing-protection-detail");
  } else if (path.includes("piano") && shrinkWrap) {
    passes.push("piano-protection-copy");
  }

  if (has49 && has331) passes.push("rating-visible");
  if (hasReviewExcerpts) passes.push("review-excerpts");

  const isOffice = path.includes("office");
  if (isOffice && !/office moving cost|after hours|IT equipment/i.test(body)) {
    issues.push("office-page-generic-faqs");
  }

  return { path, finalPath, h1: h1.slice(0, 60), faqCount: faqs.length, issues, passes };
}

function auditLocation(html, path, tier) {
  const issues = [];
  const passes = [];
  const h1 = strip(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
  const faqs = [...html.matchAll(/<dt[^>]*>([\s\S]*?)<\/dt>/gi)].map((m) => strip(m[1]));
  const body = strip(html);
  const hasReviewsBand = /Google customer reviews/i.test(html) || (/4\.9/.test(html) && /331\+/.test(html) && /Based on/i.test(html));
  const hasFaqSchema = html.includes("FAQPage");
  const pianoPara = /piano transport|piano board|shrink wrap|padded blanket/i.test(body);
  const travelPricing = /travel.*included|included upfront|no hidden/i.test(body);
  const longDistExplain = /long-distance|two days|load day|overnight travel|stages/i.test(body);
  const ruralFaq = faqs.some((q) => /rural/i.test(q));

  if (!h1) issues.push("missing-h1");
  if (hasReviewsBand) passes.push("reviews-band");
  else issues.push("missing-reviews-band");

  if (hasFaqSchema && faqs.length) passes.push("faq-schema");
  if (tier === "waikato") {
    if (faqs.length >= 2 && faqs.length <= 4) passes.push(`faqs-${faqs.length}`);
    else issues.push(`waikato-faq-count-${faqs.length}`);
    if (ruralFaq) passes.push("rural-faq");
    else issues.push("missing-rural-faq");
    if (pianoPara) passes.push("piano-para");
  }
  if (tier === "regional") {
    if (faqs.length >= 3 && faqs.length <= 5) passes.push(`faqs-${faqs.length}`);
    else issues.push(`regional-faq-count-${faqs.length}`);
    if (pianoPara) passes.push("piano-para");
    else issues.push("missing-piano-para");
    if (travelPricing) passes.push("travel-pricing");
    else issues.push("missing-travel-pricing");
  }
  if (tier === "longDistance") {
    if (faqs.length >= 4 && faqs.length <= 6) passes.push(`faqs-${faqs.length}`);
    else issues.push(`longdistance-faq-count-${faqs.length}`);
    if (pianoPara) passes.push("piano-para");
    if (longDistExplain) passes.push("longdistance-explain");
    if (travelPricing) passes.push("travel-pricing");
    if (!/return trip/i.test(body)) issues.push("missing-return-trips-faq");
  }
  if (tier === "suburb") {
    if (faqs.length === 0) issues.push("suburb-no-faqs");
  }

  return { path, tier, h1: h1.slice(0, 50), faqCount: faqs.length, issues, passes };
}

async function main() {
  const report = {
    base: BASE,
    auditedAt: new Date().toISOString(),
    services: [],
    locations: [],
    summary: { critical: [], warnings: [], passes: 0, issues: 0 },
  };

  for (const path of servicePaths) {
    const page = await fetchPage(path);
    if (page.status !== 200) {
      report.services.push({ path, status: page.status, error: page.error, issues: [`http-${page.status}`] });
      report.summary.critical.push(`${path} → HTTP ${page.status}`);
      continue;
    }
    const r = auditService(page.html, path, page.finalPath);
    r.status = page.status;
    r.redirected = page.redirected;
    report.services.push(r);
  }

  for (const [tier, paths] of Object.entries(locationPaths)) {
    for (const path of paths) {
      const page = await fetchPage(path);
      if (page.status !== 200) {
        report.locations.push({ path, tier, status: page.status, issues: [`http-${page.status}`] });
        report.summary.critical.push(`${path} → HTTP ${page.status}`);
        continue;
      }
      const r = auditLocation(page.html, path, tier);
      r.status = page.status;
      report.locations.push(r);
    }
  }

  for (const r of [...report.services, ...report.locations]) {
    for (const i of r.issues ?? []) {
      report.summary.issues++;
      if (i.startsWith("CRITICAL") || i.startsWith("http-")) report.summary.critical.push(`${r.path}: ${i}`);
      else report.summary.warnings.push(`${r.path}: ${i}`);
    }
    report.summary.passes += (r.passes ?? []).length;
  }

  console.log(JSON.stringify(report, null, 2));
}

main();
