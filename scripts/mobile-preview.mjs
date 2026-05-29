/**
 * Mobile preview screenshots — run: node scripts/mobile-preview.mjs
 * Requires: npx puppeteer (auto-downloads on first run via npm script)
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import puppeteer from "puppeteer";

const baseUrl = process.env.PREVIEW_URL ?? "http://localhost:3020";
const outDir = join(process.cwd(), "mobile-preview");

mkdirSync(outDir, { recursive: true });

const viewports = [
  { name: "iphone-14", width: 390, height: 844 },
  { name: "iphone-se", width: 375, height: 667 },
];

const browser = await puppeteer.launch({ headless: true });

for (const vp of viewports) {
  const page = await browser.newPage();
  await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 2 });
  await page.goto(baseUrl, { waitUntil: "networkidle2", timeout: 120_000 });

  const topPath = join(outDir, `${vp.name}-top.png`);
  await page.screenshot({ path: topPath });

  await page.evaluate(() => window.scrollBy(0, window.innerHeight * 1.2));
  await new Promise((r) => setTimeout(r, 400));

  const scrollPath = join(outDir, `${vp.name}-scroll.png`);
  await page.screenshot({ path: scrollPath });

  // Open mobile nav if hamburger exists
  const menuBtn = await page.$('button[aria-label="Open menu"]');
  if (menuBtn) {
    await menuBtn.click();
    await new Promise((r) => setTimeout(r, 300));
    const menuPath = join(outDir, `${vp.name}-menu.png`);
    await page.screenshot({ path: menuPath });
  }

  await page.close();
  console.log(`Saved ${vp.name} screenshots to ${outDir}`);
}

await browser.close();
console.log(`Done. Open folder: ${outDir}`);
