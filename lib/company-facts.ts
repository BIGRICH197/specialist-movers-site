/**
 * Canonical company facts. One place, so pages stop contradicting each other.
 *
 * The GEO audit (H3) found four figures with two live values each, and its
 * point was that an AI reading two of our pages finds conflicting facts and
 * downgrades confidence in all of them:
 *
 *   move volume  "4,000+ families moved"      vs "1,500+ Auckland moves"
 *   depot        "Wairau Valley"              vs "Glenfield"
 *   cheapest     "from $350"                  vs "$300 plus GST" (blog maths)
 *   experience   "Founded 2023"               vs "15 years experience"
 *
 * All four resolved with Richard, 2026-08-03. Anything that renders one of
 * these numbers reads it from here.
 */

/**
 * Volume. Xero is at invoice 3,880 and roughly 600 jobs predate Xero, so the
 * real total is about 4,480. Rounded down hard to 4,000+ because a handful of
 * those invoices are voids and re-issues.
 *
 * The noun matters: the old stat tile said "families moved", which is wrong —
 * a decent share of that count is piano retailers, commercial clients and
 * insurers, who are not families. "Moves" is true of all of them.
 *
 * The old "1,500+ Auckland moves" was a narrower, older figure. Superseded
 * rather than kept alongside, because two volume numbers is the problem.
 */
export const movesCompleted = "4,000+";
export const movesCompletedLabel = "Moves completed";
export const movesCompletedPhrase = "4,000+ moves across Auckland and the Waikato";

/**
 * Cheapest realistic job, excl GST. A two-person crew at the Tuesday rate of
 * $120/hr for two hours plus the $60 Zone A callout is $300. That is the floor
 * and it is arithmetic, not marketing. The old "from $350" had no derivation
 * anyone could point at.
 *
 * Piano keeps its own floor ($290 upright, $550 grand) because it is a
 * different service with a different rate card — that was the source of
 * Richard's "one was for pianos and one for moving".
 */
export const moveFromPrice = "$300";
export const pianoFromPrice = "$290";
export const grandPianoFromPrice = "$550";

/**
 * Founded 2023. The "15 years" on the Sirelo and Wise Move profiles is
 * Richard's own time in the trade, not the company's age, and stated bare next
 * to a 2023 founding date it reads as a contradiction. Attributed to a person
 * it is an E-E-A-T asset, so it lives in the byline bio and nowhere else.
 */
export const foundedYear = "2023";
export const founderYearsInTrade = 15;

/**
 * NAP. Confirmed against the Google Business Profile 2026-08-03: Google itself
 * labels this address Wairau Valley. Glenfield appears in
 * brain/context/pricing.md as the distance anchor for quoting, which is an
 * internal thing and fine — but the public NAP is Wairau Valley, and
 * components/simon-james/SimonJamesDeck.tsx said Glenfield (audit L12).
 */
export const nap = {
  legalName: "KB Logistics Limited",
  tradingName: "Specialist Movers",
  nzbn: "9429051410414",
  streetAddress: "8/186 Target Road",
  suburb: "Wairau Valley",
  city: "Auckland",
  postcode: "0627",
} as const;

export const nzbnUrl = `https://www.nzbn.govt.nz/mynzbn/nzbndetails/${nap.nzbn}/`;
export const linkedInUrl =
  "https://www.linkedin.com/company/specialist-movers-new-zealand";
