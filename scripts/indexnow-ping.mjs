/**
 * M11 — ping IndexNow with every URL in the sitemap after a production deploy.
 *
 * The audit called Bing "the cheapest win in this audit": /indexnow.txt,
 * /BingSiteAuth.xml and the msvalidate.01 meta tag were all missing, so new
 * pages were taking weeks to reach Bing instead of minutes. IndexNow is a
 * single POST and it feeds Bing, Yandex, Seznam and Naver at once.
 *
 * Runs as postbuild. Guarded to production only — preview and local builds
 * must not announce themselves, and a failure here must never fail a deploy,
 * so every error path exits 0.
 *
 * Note this handles submission only. Verifying the site in Bing Webmaster
 * Tools still needs a human with the Google Search Console login (one-click
 * import), and the msvalidate.01 token has to come from that account.
 */

const KEY = "286aadb8632173a6b5ab723e6be14745";
const HOST = "www.specialistmovers.co.nz";
const ORIGIN = `https://${HOST}`;

function skip(reason) {
  console.log(`[indexnow] skipped: ${reason}`);
  process.exit(0);
}

if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
  skip(`VERCEL_ENV=${process.env.VERCEL_ENV}`);
}
if (!process.env.VERCEL_ENV && process.env.INDEXNOW_FORCE !== "1") {
  skip("not a Vercel production build (set INDEXNOW_FORCE=1 to override)");
}

const res = await fetch(`${ORIGIN}/sitemap.xml`).catch((e) => {
  skip(`could not fetch sitemap: ${e.message}`);
});
if (!res?.ok) skip(`sitemap returned ${res?.status}`);

const xml = await res.text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim())
  .filter((u) => u.startsWith(ORIGIN));

if (urlList.length === 0) skip("no URLs parsed from sitemap");

const submit = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `${ORIGIN}/${KEY}.txt`,
    urlList,
  }),
}).catch((e) => {
  skip(`submit failed: ${e.message}`);
});

// 200 and 202 both mean accepted; 422 usually means the key file is not
// reachable yet on a fresh deploy, which is not worth failing a build over.
console.log(`[indexnow] submitted ${urlList.length} URLs, status ${submit?.status}`);
process.exit(0);
