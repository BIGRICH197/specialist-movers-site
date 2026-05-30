import puppeteer from "puppeteer";

const url = process.argv[2] ?? "https://specialist-movers-site.vercel.app/";

const browser = await puppeteer.launch({ headless: "new" });
const page = await browser.newPage();
const logs = [];
page.on("console", (m) => logs.push(`${m.type()}: ${m.text()}`));
page.on("pageerror", (e) => logs.push(`PAGEERROR: ${e.message}`));

await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });

const buttons = await page.$$("button");
for (const btn of buttons) {
  const t = await page.evaluate((el) => el.textContent, btn);
  if (t?.includes("House Move")) {
    await btn.click();
    break;
  }
}

await new Promise((r) => setTimeout(r, 2500));

const hints = await page.evaluate(() =>
  Array.from(document.querySelectorAll("p.text-xs"))
    .map((x) => x.textContent?.trim())
    .filter(Boolean),
);

const inputs = await page.$$("input");
let addrInput = null;
for (const inp of inputs) {
  const ph = await page.evaluate((el) => el.placeholder, inp);
  if (ph?.toLowerCase().includes("street")) {
    addrInput = inp;
    break;
  }
}

if (addrInput) {
  await addrInput.click();
  await addrInput.type("12 Queen Street Auckland", { delay: 40 });
  await new Promise((r) => setTimeout(r, 4000));
}

const pac = await page.evaluate(() => {
  const el = document.querySelector(".pac-container");
  return el
    ? {
        exists: true,
        display: getComputedStyle(el).display,
        childCount: el.childElementCount,
      }
    : null;
});

const googleLogs = logs.filter((l) =>
  /google|maps|places|referer|api|key|autocomplete/i.test(l),
);

console.log(
  JSON.stringify(
    {
      url,
      hints: hints.slice(0, 12),
      hasKeyHint: hints.some((h) => h.includes("Choose a match from the dropdown")),
      noKeyHint: hints.some((h) => h.includes("Include street, suburb")),
      pac,
      googleLogs,
    },
    null,
    2,
  ),
);

await browser.close();
