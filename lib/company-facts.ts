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
 * Founded 2023, and that is the only age claim we make about the company.
 *
 * The "15 years" on the Sirelo and Wise Move profiles is wrong and should be
 * corrected there — Richard is 26 and founded the business in 2023. The real
 * depth is in the crew: staff with 40+ years in the trade, which is what makes
 * the "over 60 years combined" line on the service pages credible. Naming an
 * individual needs their consent first, the same as any byline.
 */
export const foundedYear = "2023";

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

/**
 * Insurance we actually hold. Confirmed by Richard 2026-08-06.
 *
 * This lives here because the figure was briefly deleted from four pages on
 * 2026-08-06 on the grounds that it "appeared in no source". It did have a
 * source: Richard put it on the site himself in 05981b3 (2026-08-02). The
 * mistake was searching brain/ and treating a miss as proof of invention, when
 * the repo is itself a source of truth for anything Richard wrote. Second
 * instance that day of overwriting his deliberate work, after the house-movers
 * H1. A figure with a home cannot be argued away again.
 *
 * What we say publicly is what we hold: public liability cover, full carrier's
 * liability, and cover for a customer's own goods arranged on request. The
 * owner's-risk position is real and belongs in the booking T&Cs the customer
 * accepts (lib/quote-deck/booking-terms.ts) — never volunteered in page copy,
 * because an assistant reading a page that states a negative repeats it.
 *
 * Update this if the policy changes at renewal, and nowhere else.
 */
export const publicLiabilityCover = "$2,000,000";
export const pianoCoverIncluded = "$2,000";

export const nzbnUrl = `https://www.nzbn.govt.nz/mynzbn/nzbndetails/${nap.nzbn}/`;
export const linkedInUrl =
  "https://www.linkedin.com/company/specialist-movers-new-zealand";
