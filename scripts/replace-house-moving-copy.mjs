/**
 * One-off: replace customer-facing "house moving" phrasing. URLs/slugs unchanged.
 * Run: node scripts/replace-house-moving-copy.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

/** Longest match first */
const REPLACEMENTS = [
  [
    "The Ultimate Guide to House Moving in Auckland",
    "The Ultimate Guide to Moving Home in Auckland",
  ],
  [
    "House Moving Guide Auckland",
    "Moving Home Guide Auckland",
  ],
  [
    "Relocating your home can be stressful, but not anymore with Specialist Movers, your expert house moving and packing services company in Auckland. Hire us today!",
    "Relocating your home can be stressful, but not anymore with Specialist Movers, your expert furniture removal and packing team in Auckland. Hire us today!",
  ],
  ["Looking for Winz house moving quotes?", "Looking for WINZ home relocation quotes?"],
  [
    "Professional house and office packing in Auckland",
    "Professional home and office packing in Auckland",
  ],
  [
    "Specialist Movers Auckland for house, commercial, international, and piano moves",
    "Specialist Movers Auckland for home relocations, commercial, international, and piano moves",
  ],
  ["House moving clean", "Home relocation clean"],
  ["House move proposal", "Home relocation proposal"],
  [
    "Your house move quote from Specialist Movers",
    "Your relocation quote from Specialist Movers",
  ],
  ["House move instant quote", "Home move instant quote"],
  ["one-size-fits-all house move crew", "one-size-fits-all relocation crew"],
  [
    "without booking a full house move",
    "without booking a full home relocation",
  ],
  ["Combine with house moving or storage", "Combine with relocating or storage"],
  ["Can bundle with house moving", "Can bundle with home relocations"],
  ["combine packing with house moving", "combine packing with your relocation"],
  ["Hamilton house moving teams", "Hamilton residential moving teams"],
  ["our house moving teams", "our residential moving teams"],
  [
    "alongside our Hamilton house moving teams",
    "alongside our Hamilton residential moving teams",
  ],
  ["packing and house moving on one plan", "packing and relocating on one plan"],
  ["Pair with house moving or storage", "Pair with relocating or storage"],
  [
    "when you request your house move quote",
    "when you request your moving quote",
  ],
  ["Fixed-price house moves when", "Fixed-price home relocations when"],
  ["Waikato house moves every week", "Waikato home relocations every week"],
  [
    "Coordination with house moves when needed",
    "Coordination with home relocations when needed",
  ],
  [
    "House moves, packing, and cleaning quotes are available",
    "Home relocation, packing, and cleaning quotes are available",
  ],
  [
    "House move, pack, and clean quotes available",
    "Home relocation, pack, and clean quotes available",
  ],
  [
    "House moves, packing, and cleaning quotes available from the same team",
    "Home relocations, packing, and cleaning quotes available from the same team",
  ],
  [
    "same crew standards as our house moves",
    "same crew standards as our home relocations",
  ],
  [
    "Calculate an instant quote for a house move",
    "Calculate an instant quote for a home relocation",
  ],
  ["**House moves**:", "**Home relocations**:"],
  ["house moves, piano moves", "home relocations, piano moves"],
  ["for house moves if", "for home relocations if"],
  ["add-ons for house moves", "add-ons for home relocations"],
  ["For house moves, mention", "For home relocations, mention"],
  ["this means: house moves,", "this means: home relocations,"],
  [
    "Practical moving tips, packing guides, and house move advice",
    "Practical moving tips, packing guides, and relocation advice",
  ],
  ["viewing-first for house moves", "viewing-first for home relocations"],
  ["piano and house moves use", "piano and home relocations use"],
  ["Free in-home viewing for house moves", "Free in-home viewing for home relocations"],
  ["In-home viewing for house moves", "In-home viewing for home relocations"],
  ["Piano and house specialists", "Piano and relocation specialists"],
  ["larger house moves so", "larger home relocations so"],
  ["larger house moves in", "larger home relocations in"],
  ["larger house moves.", "larger home relocations."],
  ["before larger house moves", "before larger home relocations"],
  ["A full house move is quoted", "A full home relocation is quoted"],
  ["Full house moves are quoted", "Full home relocations are quoted"],
  [
    "Most local Hamilton house moves start",
    "Most local Hamilton home relocations start",
  ],
  ["from smaller loads to full house moves", "from smaller loads to full home relocations"],
  [
    "Same-day and short-notice house moves",
    "Same-day and short-notice home relocations",
  ],
  [
    "Many customers choose us for house moves,",
    "Many customers choose us for home relocations,",
  ],
  ["during a house move", "during a home relocation"],
  [
    "House moves, piano transport, packing",
    "Home relocations, piano transport, packing",
  ],
  ["steady demand for house moves,", "steady demand for home relocations,"],
  ["House movers East Auckland", "Furniture removalists East Auckland"],
  ["Glenfield house movers near", "Glenfield movers near"],
  ["Parnell house movers Auckland", "Parnell movers Auckland"],
  ["Henderson house movers West", "Henderson movers West"],
  ["Drury house movers South", "Drury movers South"],
  [" house and piano movers.", " furniture removalists and piano movers."],
  [" house and piano movers,", " furniture removalists and piano movers,"],
  ["Trusted house and piano movers", "Trusted home and piano movers"],
  ["House & Piano", "Home & Piano"],
  [
    "House, piano, commercial, packing",
    "Home relocations, piano, commercial, packing",
  ],
  [
    "house and piano moving with",
    "home and piano relocations with",
  ],
  [
    "Auckland and Hamilton movers for house, piano",
    "Auckland and Hamilton movers for home relocations, piano",
  ],
  ['keyword: "house movers"', 'keyword: "home movers"'],
  ['jobFocus: "house moves"', 'jobFocus: "home relocations"'],
  [
    "Hamilton house moves are planned",
    "Hamilton home relocations are planned",
  ],
  ["Pair with a Hamilton house move", "Pair with a Hamilton home relocation"],
  ["House moves, ", "Home relocations, "],
  ["house moves, ", "home relocations, "],
  ["house moves.", "home relocations."],
  ["for a house move.", "for a home relocation."],
  ["House move,", "Home relocation,"],
  ["Town House Move", "Townhouse move"],
  ["House Move", "Home Move"],
  ["house move", "home relocation"],
];

const FILES = [
  "lib/regions.ts",
  "lib/legacy-meta-descriptions.ts",
  "lib/location-builders.ts",
  "lib/location-seo.ts",
  "lib/locations.ts",
  "lib/locations-extra.ts",
  "lib/hamilton-pages.ts",
  "lib/service-cities.ts",
  "lib/service-clusters.ts",
  "lib/service-faqs.ts",
  "lib/cluster-seo.ts",
  "lib/hamilton-seo.ts",
  "lib/service-seo-extensions.ts",
  "lib/legacy-site-content.ts",
  "lib/niche-service-pages.ts",
  "lib/portal-tiles.ts",
  "lib/aroha-system-prompt.ts",
  "lib/joey-system-prompt.ts",
  "lib/blog-articles.ts",
  "lib/site-data.ts",
  "lib/quote-preview-meta.ts",
  "components/QuoteForm.tsx",
  "components/CleaningBookingForm.tsx",
  "components/quote-deck/BookingForm.tsx",
  "components/quote-deck/house-move/HouseMoveDeck.tsx",
  "app/blog/page.tsx",
  "app/portal/page.tsx",
  "app/api/chat/route.ts",
  "app/api/cleaning-booking/route.ts",
];

let total = 0;
for (const rel of FILES) {
  const filePath = path.join(ROOT, rel);
  if (!fs.existsSync(filePath)) continue;
  let text = fs.readFileSync(filePath, "utf8");
  const before = text;
  for (const [from, to] of REPLACEMENTS) {
    text = text.split(from).join(to);
  }
  if (text !== before) {
    fs.writeFileSync(filePath, text, "utf8");
    total += 1;
    console.log("updated", rel);
  }
}
console.log(`Done. ${total} files updated.`);
