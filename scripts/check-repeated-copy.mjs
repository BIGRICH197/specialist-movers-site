/**
 * Fails the build when a page says the same thing twice.
 *
 * Written 2026-08-06 after Richard read the office page and asked why the copy
 * reads well to a machine and badly to a person. The answer was repetition:
 * these pages stack six content layers (lead, aboutBody, trustHighlights,
 * includedBullets, whyBody, bodyParagraphs, FAQs) and each was written to
 * stand alone, because a self-contained chunk extracts better. Stacked on one
 * page they said the same thing three times over. The sweep found 102
 * full-sentence repeats across 78 pages.
 *
 * The reason this needs to be a check and not a careful edit: fixing the prose
 * against the FAQ duplicated it against aboutBody, and fixing that duplicated
 * the client list against whyBody. Three rounds, each fix creating the next
 * collision, because no human holds six layers of one page in their head at
 * once. A machine does.
 *
 * Runs against the built HTML, so it sees what a reader actually sees rather
 * than what the source files say in isolation.
 *
 * Usage: node scripts/check-repeated-copy.mjs [--max N] [--verbose]
 */
import { readFileSync, readdirSync, statSync } from "fs";
import { join } from "path";

const BUILD_DIR = ".next/server/app";
const MIN_LEN = 85;      // full sentences only, not bullet fragments
const SIMILARITY = 0.62; // share of the shorter sentence's meaningful words

// Contracts restate clauses on purpose, and legacy service pages predate this
// work. Both are tracked separately rather than blocking every build.
const EXEMPT = [/policies\.html$/, /booking-terms/];

const STOPWORDS = new Set(
  ("the a an and we you your is are to of for in on or so that with it our us " +
   "be as at by from this they their can will not but if when what how")
    .split(" "),
);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

function sentences(html) {
  const stripped = html
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<style[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, "\n")
    .replace(/&#x27;|&rsquo;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&ldquo;|&rdquo;|&quot;/g, '"');
  const seen = new Set();
  const out = [];
  for (const line of stripped.split("\n")) {
    for (const raw of line.replace(/\s+/g, " ").trim().split(/(?<=[.!?])\s+/)) {
      const s = raw.trim();
      if (s.length >= MIN_LEN && !seen.has(s)) {
        seen.add(s);
        out.push(s);
      }
    }
  }
  return out;
}

const words = (s) =>
  new Set(
    (s.toLowerCase().match(/[a-z0-9]+/g) ?? []).filter((w) => !STOPWORDS.has(w)),
  );

// The rate card legitimately appears in both the pricing prose and the "how
// much does it cost" FAQ: the FAQ answer has to stand alone for FAQPage schema,
// and buyers scan for the number. Repeating a price is not the failure mode
// this check exists to catch.
const bothQuotePrices = (a, b) => /\$\d/.test(a) && /\$\d/.test(b);

function overlap(a, b) {
  const A = words(a), B = words(b);
  if (A.size < 4 || B.size < 4) return 0;
  let shared = 0;
  for (const w of A) if (B.has(w)) shared++;
  return shared / Math.min(A.size, B.size);
}

// Ratchet, not a target. 102 when this was written; 48 after the 2026-08-06
// pass. What remains is legacy service copy (cleaning, packing, loading,
// storage) and piano boilerplate on a few location pages, none of it touched
// yet. Lower this number as those get cleaned; never raise it.
const DEFAULT_CEILING = 48;
const maxAllowed = Number(process.argv.includes("--max")
  ? process.argv[process.argv.indexOf("--max") + 1] : DEFAULT_CEILING);
const verbose = process.argv.includes("--verbose");

let total = 0;
const offenders = [];
for (const file of walk(BUILD_DIR)) {
  if (EXEMPT.some((rx) => rx.test(file))) continue;
  const S = sentences(readFileSync(file, "utf8"));
  const hits = [];
  for (let i = 0; i < S.length; i++)
    for (let j = i + 1; j < S.length; j++)
      if (!bothQuotePrices(S[i], S[j]) && overlap(S[i], S[j]) >= SIMILARITY)
        hits.push([S[i], S[j]]);
  if (hits.length) {
    total += hits.length;
    offenders.push([file.replace(BUILD_DIR, ""), hits]);
  }
}

offenders.sort((a, b) => b[1].length - a[1].length);
for (const [page, hits] of offenders.slice(0, verbose ? 999 : 10)) {
  console.log(`\n${page}  (${hits.length})`);
  for (const [a, b] of hits.slice(0, verbose ? 99 : 2)) {
    console.log(`   A: ${a.slice(0, 96)}`);
    console.log(`   B: ${b.slice(0, 96)}`);
  }
}

console.log(
  `\n${offenders.length} pages repeat themselves, ${total} repeated sentences ` +
  `(ceiling ${maxAllowed})`,
);

if (total > maxAllowed) {
  console.error(
    `\nFAIL: repeated copy went up. Say each thing once, in the layer that ` +
    `owns it: FAQs answer transactional questions, prose carries the ` +
    `reasoning, highlights carry three short differentiators.`,
  );
  process.exit(1);
}
