import fs from "fs";
import path from "path";

const urlArg = process.argv.find((a) => a.startsWith("--url="));
const url = urlArg?.slice("--url=".length);

let html;
if (url) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Fetch failed", res.status, url);
    process.exit(1);
  }
  html = await res.text();
  const tmp = path.join(process.cwd(), "tmp-trustindex-embed.html");
  fs.writeFileSync(tmp, html, "utf8");
  console.log("Saved", tmp);
} else {
  const htmlPath = path.join(process.cwd(), "tmp-live-home.html");
  html = fs.readFileSync(htmlPath, "utf8");
}
const match = html.match(
  /<template id="trustindex-google-widget-html">([\s\S]*?)<\/template>/,
);
if (!match) {
  console.error("Template not found");
  process.exit(1);
}
const inner = match[1].trim();
const out = path.join(process.cwd(), "lib", "trustindex-widget-template.html");
fs.writeFileSync(out, inner, "utf8");
console.log("Wrote", out, "bytes:", inner.length);
