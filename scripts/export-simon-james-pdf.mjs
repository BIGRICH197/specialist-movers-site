/**
 * Build Simon James deck PDF (per-slide capture — no Chrome print dialog).
 * Output: ~/Downloads/Simon-James-Pitch-Deck-2026.pdf
 * Requires: npm run dev:3010
 */
import { existsSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { PDFDocument } from "pdf-lib";
import puppeteer from "puppeteer";

const baseUrl = process.env.DECK_URL ?? "http://127.0.0.1:3010/simon-james";
const outFile =
  process.env.PDF_OUT ?? join(homedir(), "Downloads", "Simon-James-Pitch-Deck-2026.pdf");

const A4_W_PT = 595.28;

const exportCss = `
  .deck-no-print, .deck-bar { display: none !important; }
  html.deck-document, html.deck-document body { background: white !important; }
  .deck-root {
    width: 210mm !important;
    max-width: 210mm !important;
    margin: 0 !important;
    padding: 0 !important;
    scroll-snap-type: none !important;
  }
  .deck-slide {
    min-height: 0 !important;
    height: auto !important;
    max-height: none !important;
    width: 210mm !important;
    border: none !important;
    overflow: visible !important;
  }
  .deck-slide-inner { padding: 7mm 9mm !important; }
  .deck-slide > .pointer-events-none { display: none !important; }
  #experience .deck-experience-photo { display: none !important; }
  #values .deck-pillars {
    display: flex !important;
    flex-direction: column !important;
    gap: 2.5mm !important;
  }
  #cover .deck-slide-inner {
    display: flex !important;
    flex-direction: column !important;
    gap: 3mm !important;
  }
  #cover .hero-photo-ambient { max-height: 95mm !important; min-height: 0 !important; }
`;

const chromePath = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
].find(existsSync);

console.log("Launching browser…");
const browser = await puppeteer.launch({
  headless: true,
  executablePath: chromePath,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1 });

  console.log("Loading", baseUrl);
  const res = await page.goto(baseUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
  if (!res?.ok()) throw new Error(`HTTP ${res?.status() ?? "failed"}`);

  await page.addStyleTag({ content: exportCss });
  await new Promise((r) => setTimeout(r, 6000));

  const slideCount = await page.evaluate(() => document.querySelectorAll(".deck-slide").length);
  if (slideCount < 1) throw new Error("No slides found");
  console.log(`Found ${slideCount} slides`);

  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    for (const img of document.images) {
      if (!img.complete) {
        await new Promise((resolve) => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      }
    }
  });

  const pdfDoc = await PDFDocument.create();

  for (let i = 0; i < slideCount; i++) {
    console.log(`  capturing slide ${i + 1}/${slideCount}…`);
    const inner = await page.$(`#${["cover", "about", "values", "experience", "zones", "pricing-delivery", "pricing-warehouse", "included", "contact"][i]} .deck-slide-inner`);
    const target =
      inner ?? (await page.$$('.deck-slide'))[i];
    if (!target) {
      console.warn(`  skip slide ${i + 1}`);
      continue;
    }

    const box = await target.boundingBox();
    if (!box || box.height < 10) {
      console.warn(`  skip slide ${i + 1} (no box)`);
      continue;
    }
    console.log(`    ${Math.round(box.width)}x${Math.round(box.height)}px`);

    const png = await target.screenshot({ type: "png", captureBeyondViewport: false });
    const image = await pdfDoc.embedPng(png);
    const scale = A4_W_PT / image.width;
    const w = A4_W_PT;
    const h = image.height * scale;
    const pdfPage = pdfDoc.addPage([w, h]);
    pdfPage.drawImage(image, { x: 0, y: 0, width: w, height: h });
    console.log(`  slide ${i + 1}: ${Math.round(h)}pt`);
  }

  const bytes = await pdfDoc.save();
  writeFileSync(outFile, bytes);
  console.log("Wrote", outFile, `(${(bytes.length / 1024 / 1024).toFixed(2)} MB)`);
} finally {
  await browser.close();
}
