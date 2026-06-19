/**
 * Rasterise Logomark Purple.svg into PNG + ICO favicons for Google / browsers.
 * Run: node scripts/generate-favicons.mjs
 */
import puppeteer from "puppeteer";
import pngToIco from "png-to-ico";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "public/brand/logos/svg/Logomark Purple.svg");
const svg = readFileSync(svgPath, "utf8");

function svgHtml(size) {
  const sized = svg.replace(
    /<svg\b/,
    `<svg width="${size}" height="${size}"`,
  );
  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;background:#fff;display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;overflow:hidden;">
${sized}
</body></html>`;
}

async function screenshot(page, size) {
  await page.setViewport({ width: size, height: size, deviceScaleFactor: 1 });
  await page.setContent(svgHtml(size), { waitUntil: "networkidle0" });
  return page.screenshot({ type: "png" });
}

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();

const icon32 = await screenshot(page, 32);
const icon48 = await screenshot(page, 48);
const apple180 = await screenshot(page, 180);

await browser.close();

writeFileSync(join(root, "app/icon.png"), icon48);
writeFileSync(join(root, "app/apple-icon.png"), apple180);
writeFileSync(join(root, "public/favicon-32.png"), icon32);
writeFileSync(join(root, "public/favicon-48.png"), icon48);
writeFileSync(join(root, "public/apple-touch-icon.png"), apple180);

const ico = await pngToIco([
  join(root, "public/favicon-32.png"),
  join(root, "public/favicon-48.png"),
]);
writeFileSync(join(root, "public/favicon.ico"), ico);

console.log(
  "Wrote app/icon.png, app/apple-icon.png, public/favicon.ico, public/favicon-*.png",
);
