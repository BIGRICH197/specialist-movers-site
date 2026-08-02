/**
 * Export hero photos with yellow slogan overlays (same look as the website).
 * Run: npx tsx scripts/export-slogan-photos.mjs
 */
import puppeteer from "puppeteer";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join, dirname, extname } from "path";
import { fileURLToPath } from "url";
import { serviceHeroOverlayCaptionBySlug } from "../lib/service-hero-detail.ts";
import { servicePhotoBySlug, sitePhotos } from "../lib/site-photos.ts";
import { hero } from "../lib/homepage-copy.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const downloads = join(process.env.USERPROFILE ?? "C:\\Users\\richa", "Downloads");
const outDir = join(downloads, "Specialist Movers slogan photos");

function sanitizeFilename(text) {
  return text
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function photoAbs(publicPath) {
  return join(root, "public", publicPath.replace(/^\//, ""));
}

function toDataUrl(absPath) {
  const ext = extname(absPath).toLowerCase();
  const mime =
    ext === ".png"
      ? "image/png"
      : ext === ".webp"
        ? "image/webp"
        : "image/jpeg";
  const b64 = readFileSync(absPath).toString("base64");
  return `data:${mime};base64,${b64}`;
}

function renderHtml(opts) {
  const { photoDataUrl, fontDataUrl, caption, width, height } = opts;
  const safeCaption = caption
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  @font-face {
    font-family: Termina;
    src: url("${fontDataUrl}") format("opentype");
    font-weight: 700;
    font-style: normal;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${width}px;
    height: ${height}px;
    overflow: hidden;
  }
  .frame {
    position: relative;
    width: ${width}px;
    height: ${height}px;
    border-radius: 16px;
    overflow: hidden;
    isolation: isolate;
    border: 1px solid rgba(255,255,255,0.15);
    box-shadow: 0 20px 50px -20px rgba(0,0,0,0.4);
    background: #9739b0;
  }
  .frame img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index: 1;
  }
  .frame::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    border-radius: inherit;
    background-image: linear-gradient(
      to top,
      rgba(151, 57, 176, 0.92) 0%,
      rgba(151, 57, 176, 0.58) 16%,
      rgba(151, 57, 176, 0.22) 34%,
      rgba(190, 118, 239, 0.06) 48%,
      transparent 58%
    );
  }
  .caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    padding: 6rem 2rem 1.75rem;
    font-family: Termina, ui-sans-serif, system-ui, sans-serif;
    font-size: 2.75rem;
    font-weight: 700;
    line-height: 1.12;
    color: #f3d02a;
    max-width: 42rem;
  }
</style>
</head>
<body>
  <div class="frame" id="export">
    <img id="photo" src="${photoDataUrl}" alt="" />
    <p class="caption">${safeCaption}</p>
  </div>
</body>
</html>`;
}

function buildItems() {
  const items = [];
  items.push({ id: "homepage", photo: sitePhotos.homeHero, caption: hero.photoTagline });

  for (const [slug, caption] of Object.entries(serviceHeroOverlayCaptionBySlug)) {
    const photo = servicePhotoBySlug[slug];
    if (!photo) continue;
    items.push({ id: slug, photo, caption });
  }

  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.photo}|${item.caption}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const WIDTH = 1200;
const HEIGHT = 900;

mkdirSync(outDir, { recursive: true });

const items = buildItems();
const fontPath = join(root, "app/fonts/TerminaTest-Bold.otf");
const fontDataUrl = toDataUrl(fontPath);

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: WIDTH, height: HEIGHT, deviceScaleFactor: 2 });

const manifest = [
  "Specialist Movers — hero photos with on-image slogans",
  `Exported: ${new Date().toISOString().slice(0, 10)}`,
  "",
];

let index = 0;
for (const item of items) {
  const abs = photoAbs(item.photo);
  if (!existsSync(abs)) {
    manifest.push(`SKIPPED ${item.id}: missing ${item.photo}`);
    console.warn(`Skip ${item.id}: file not found ${abs}`);
    continue;
  }

  index += 1;
  const filename = `${String(index).padStart(2, "0")} - ${sanitizeFilename(item.id)} - ${sanitizeFilename(item.caption)}.png`;
  const photoDataUrl = toDataUrl(abs);
  const html = renderHtml({
    photoDataUrl,
    fontDataUrl,
    caption: item.caption,
    width: WIDTH,
    height: HEIGHT,
  });

  await page.setContent(html, { waitUntil: "load" });
  await page.waitForFunction(
    () => {
      const img = document.getElementById("photo");
      return img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0;
    },
    { timeout: 30000 },
  );
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
  });

  const el = await page.$("#export");
  if (!el) continue;
  await el.screenshot({
    path: join(outDir, filename),
    type: "png",
  });

  manifest.push(`${filename}`);
  manifest.push(`  Page: ${item.id}`);
  manifest.push(`  Photo: ${item.photo}`);
  manifest.push(`  Slogan: ${item.caption}`);
  manifest.push("");
  console.log(`Saved ${filename}`);
}

await browser.close();

writeFileSync(join(outDir, "README.txt"), manifest.join("\n"), "utf8");
console.log(`\nDone. ${index} images in:\n${outDir}`);
