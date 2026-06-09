/**
 * Full-site audit: crawl sitemap URLs, check HTTP status, SEO basics, assets.
 * Usage: node scripts/site-audit.mjs [baseUrl]
 */
const BASE = (process.argv[2] ?? "https://specialist-movers-site.vercel.app").replace(/\/$/, "");
const CONCURRENCY = 8;
const FETCH_TIMEOUT = 20000;

function timeoutSignal(ms) {
  const c = new AbortController();
  const t = setTimeout(() => c.abort(), ms);
  return { signal: c.signal, clear: () => clearTimeout(t) };
}

async function fetchWithMeta(path, method = "GET") {
  const url = path.startsWith("http") ? path : `${BASE}${path}`;
  const { signal, clear } = timeoutSignal(FETCH_TIMEOUT);
  try {
    const res = await fetch(url, {
      method,
      signal,
      redirect: "follow",
      headers: { "User-Agent": "SpecialistMovers-SiteAudit/1.0" },
    });
    const finalUrl = res.url;
    const text = method === "GET" ? await res.text() : "";
    clear();
    return {
      url,
      finalUrl,
      status: res.status,
      redirected: finalUrl !== url,
      headers: {
        contentType: res.headers.get("content-type"),
        cacheControl: res.headers.get("cache-control"),
        xVercel: res.headers.get("x-vercel-id"),
      },
      body: text,
    };
  } catch (e) {
    clear();
    return { url, status: 0, error: e.message, body: "" };
  }
}

function parseSitemapXml(xml) {
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return locs;
}

function seoChecks(html, path) {
  const issues = [];
  const title = html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
  const desc = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1]
    ?? html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1];
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i)?.[1]
    ?? html.match(/<link[^>]+href=["']([^"']*)["'][^>]+rel=["']canonical["']/i)?.[1];
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    m[1].replace(/<[^>]+>/g, "").trim(),
  );
  const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i)?.[1];

  if (!title) issues.push("missing <title>");
  else if (title.length < 10) issues.push(`short title (${title.length} chars)`);
  else if (title.length > 70) issues.push(`long title (${title.length} chars)`);

  if (!desc) issues.push("missing meta description");
  else if (desc.length < 50) issues.push(`short meta description (${desc.length})`);
  else if (desc.length > 165) issues.push(`long meta description (${desc.length})`);

  if (h1s.length === 0) issues.push("missing h1");
  if (h1s.length > 1) issues.push(`multiple h1 (${h1s.length})`);

  if (canonical && !canonical.startsWith("http")) issues.push("relative canonical");

  const imgBroken = [];
  const imgs = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
  for (const [, src] of imgs.slice(0, 30)) {
    if (src.startsWith("data:")) continue;
    if (src.includes("placeholder")) continue;
  }

  return { path, title, desc: desc?.slice(0, 80), canonical, h1Count: h1s.length, h1: h1s[0]?.slice(0, 60), ogTitle, issues, imgCount: imgs.length };
}

async function pool(items, fn, limit) {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await fn(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function main() {
  const report = {
    base: BASE,
    auditedAt: new Date().toISOString(),
    infrastructure: {},
    sitemap: {},
    crawl: {},
    seo: {},
    security: {},
    samples: {},
    criticalIssues: [],
    warnings: [],
  };

  // Infrastructure
  for (const path of ["/", "/robots.txt", "/sitemap.xml"]) {
    const r = await fetchWithMeta(path);
    report.infrastructure[path] = {
      status: r.status,
      error: r.error,
      contentType: r.headers?.contentType,
      xVercel: r.headers?.xVercel,
      size: r.body?.length ?? 0,
    };
  }

  const robots = report.infrastructure["/robots.txt"];
  if (robots.status !== 200) report.criticalIssues.push("robots.txt not reachable");

  const sitemapRes = await fetchWithMeta("/sitemap.xml");
  let paths = [];
  if (sitemapRes.status === 200) {
    const locs = parseSitemapXml(sitemapRes.body);
    report.sitemap.urlCount = locs.length;
    report.sitemap.sampleHosts = [...new Set(locs.map((u) => new URL(u).host))].slice(0, 5);
    report.sitemap.firstThree = locs.slice(0, 3);
    paths = locs.map((u) => {
      try {
        const p = new URL(u);
        return p.pathname + (p.search || "");
      } catch {
        return u;
      }
    });
    const wrongHost = locs.filter((u) => !u.includes(new URL(BASE).host) && !u.includes("specialistmovers"));
    if (wrongHost.length) {
      report.warnings.push(`Sitemap has ${wrongHost.length} URLs not matching live host (canonical domain mismatch)`);
      report.sitemap.wrongHostSample = wrongHost.slice(0, 3);
    }
  } else {
    report.criticalIssues.push(`sitemap.xml returned ${sitemapRes.status}`);
    // Fallback: key routes
    paths = [
      "",
      "/about",
      "/contact",
      "/faq",
      "/reviews",
      "/piano-movers",
      "/piano-movers-hamilton",
      "/services",
      "/services/house-moving",
      "/services/moving",
      "/locations",
      "/blog",
      "/policies",
    ];
  }

  // Crawl all sitemap paths (map to live host)
  const crawlPaths = [...new Set(paths.map((p) => (p.startsWith("/") ? p : `/${p}`)))];
  const crawlResults = await pool(
    crawlPaths,
    async (path) => {
      const livePath = path || "/";
      const r = await fetchWithMeta(livePath);
      return {
        path: livePath,
        status: r.status,
        error: r.error,
        redirected: r.redirected,
        finalUrl: r.finalUrl,
      };
    },
    CONCURRENCY,
  );

  const byStatus = {};
  for (const r of crawlResults) {
    const k = r.status || "error";
    byStatus[k] = (byStatus[k] || 0) + 1;
  }
  report.crawl.total = crawlResults.length;
  report.crawl.byStatus = byStatus;
  report.crawl.errors = crawlResults.filter((r) => r.status === 0).slice(0, 10);
  report.crawl.notFound = crawlResults.filter((r) => r.status === 404).slice(0, 30);
  report.crawl.serverError = crawlResults.filter((r) => r.status >= 500).slice(0, 10);

  if (report.crawl.notFound.length) {
    report.criticalIssues.push(`${report.crawl.notFound.length} URLs return 404 (see crawl.notFound)`);
  }
  if (report.crawl.serverError.length) {
    report.criticalIssues.push(`${report.crawl.serverError.length} URLs return 5xx`);
  }

  // SEO sample on key pages + any 404s
  const seoSamplePaths = [
    "/",
    "/piano-movers",
    "/piano-movers-hamilton",
    "/services/house-moving",
    "/contact",
    "/reviews",
    "/locations/auckland-central",
    "/blog",
    ...report.crawl.notFound.slice(0, 5).map((r) => r.path),
  ];
  const seoResults = [];
  for (const path of [...new Set(seoSamplePaths)]) {
    const r = await fetchWithMeta(path);
    if (r.status === 200) seoResults.push(seoChecks(r.body, path));
    else seoResults.push({ path, issues: [`HTTP ${r.status}`] });
  }
  report.seo.samples = seoResults;
  report.seo.pagesWithIssues = seoResults.filter((s) => s.issues?.length);

  // Security headers (homepage)
  const homeHead = await fetchWithMeta("/", "HEAD");
  report.security.homepage = {
    status: homeHead.status,
    strictTransport: null,
    xFrame: null,
    contentType: homeHead.headers?.contentType,
  };
  const headRes = await fetch(`${BASE}/`, { method: "GET" });
  report.security.headers = {
    "strict-transport-security": headRes.headers.get("strict-transport-security"),
    "x-frame-options": headRes.headers.get("x-frame-options"),
    "x-content-type-options": headRes.headers.get("x-content-type-options"),
    "content-security-policy": headRes.headers.get("content-security-policy") ? "present" : null,
  };

  // Redirect checks (legacy WordPress paths)
  const legacyPaths = [
    "/piano-movers-auckland",
    "/services/piano-movers",
    "/piano-tuning",
    "/services/moving/auckland",
    "/blog/moving-piano-safely-nz",
  ];
  report.samples.redirects = [];
  for (const path of legacyPaths) {
    const { signal, clear } = timeoutSignal(FETCH_TIMEOUT);
    try {
      const res = await fetch(`${BASE}${path}`, { redirect: "manual", signal });
      report.samples.redirects.push({
        path,
        status: res.status,
        location: res.headers.get("location"),
      });
    } catch (e) {
      report.samples.redirects.push({ path, error: e.message });
    }
    clear();
  }

  // robots.txt content check
  const robotsBody = (await fetchWithMeta("/robots.txt")).body || "";
  if (robotsBody && !robotsBody.includes(BASE.replace("https://", ""))) {
    report.warnings.push("robots.txt sitemap URL may not match Vercel deployment host");
  }

  // Check internal preview routes (should not be in sitemap but test exposure)
  for (const path of ["/portal", "/patterns"]) {
    const r = await fetchWithMeta(path);
    report.samples.internalPages = report.samples.internalPages || [];
    report.samples.internalPages.push({ path, status: r.status });
  }

  console.log(JSON.stringify(report, null, 2));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
