/**
 * Find elements wider than viewport — run: node scripts/overflow-audit.mjs [url]
 */
import puppeteer from "puppeteer";

const url = process.argv[2] ?? "https://specialist-movers-site.vercel.app";
const width = 390;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width, height: 844, deviceScaleFactor: 2, isMobile: true });
await page.goto(url, { waitUntil: "networkidle2", timeout: 120_000 });

await new Promise((r) => setTimeout(r, 3000));

const report = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const sw = document.documentElement.scrollWidth;
  const offenders = [];

  for (const el of document.querySelectorAll("*")) {
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) continue;
    const right = rect.right;
    const left = rect.left;
    if (right > vw + 2 || left < -2) {
      const tag = el.tagName.toLowerCase();
      const id = el.id ? `#${el.id}` : "";
      const cls =
        typeof el.className === "string"
          ? el.className.split(/\s+/).slice(0, 4).join(".")
          : "";
      offenders.push({
        tag,
        selector: `${tag}${id}${cls ? `.${cls}` : ""}`,
        left: Math.round(left),
        right: Math.round(right),
        width: Math.round(rect.width),
        overflow: getComputedStyle(el).overflow,
        position: getComputedStyle(el).position,
      });
    }
  }

  offenders.sort((a, b) => b.width - a.width);
  return {
    clientWidth: vw,
    scrollWidth: sw,
    hasHorizontalOverflow: sw > vw + 1,
    scrollX: window.scrollX,
    bodyScrollWidth: document.body.scrollWidth,
    topOffenders: offenders.slice(0, 25),
  };
});

console.log(JSON.stringify(report, null, 2));
await browser.close();
