/**
 * The back of the A5 trade card, as page content.
 *
 * The card answers the question the rest of the site does not: what will you
 * actually take. A quote enquiry for a four-step stone staircase arrived in
 * August 2026 apologising for asking, because "from the website it looks like
 * you are primarily involved in piano removals" — the sender had read the site
 * and concluded we were the wrong company. The lists live here so the trade
 * card and the site cannot drift apart.
 *
 * Source: brain/sales/drive-by/leave-behind-press.html (page 2).
 */

export type WhatWeMoveRegion = "Auckland" | "Waikato";

/** Column 1 — the objects themselves, which is what people search for. */
export const hardToShiftItems = [
  "Pianos, uprights to concert grands",
  "Safes and vaults",
  "Stone slabs and benchtops",
  "Custom cabinetry and joinery",
  "Photocopiers and office MFPs",
  "Gym rigs, racks and treadmills",
  "Combi ovens, walk-in fridges, bar units",
  "Artwork, sculpture and antiques",
  "Server racks and IT gear",
  "Dental chairs and medical equipment",
  "Saunas",
  "Boardroom tables and reception desks",
  "Commercial office furniture",
  "Anything over 200kg that has to go up stairs",
] as const;

/**
 * Column 2 — the jobs. "Piano moving" carries the region because a Hamilton
 * page claiming Auckland-wide coverage reads as boilerplate lifted from
 * somewhere else.
 */
export function whatWeDoItems(region: WhatWeMoveRegion): readonly string[] {
  return [
    "Workshop-to-site trade delivery",
    "Install support and on-call labour",
    "Fitout decommissioning and store defits",
    "Office and commercial relocations",
    "House and apartment moves",
    `Piano moving, ${region}-wide`,
    "Single-item and one-piece moves",
    "Insurance pack-outs and returns",
    "Packing and unpacking",
    "Secure storage, short or long term",
    "Disposal and dump runs",
    "Same-day turnaround in town, queue allowing",
  ];
}

/** Column 3 — the trades who book us, so a reader can find themselves. */
export const whoWeDoItForItems = [
  "Cabinetmakers and joinery shops",
  "Stone and benchtop fabricators",
  "Kitchen and bathroom companies",
  "Plumbers and installers",
  "Commercial fitout and shopfitters",
  "Office furniture suppliers",
  "Copier and office equipment leasing",
  "Hospitality equipment dealers",
  "Commercial gym equipment",
  "Music stores and piano dealers",
  "Auction houses and galleries",
  "Home staging companies",
  "Loss adjusters and insurance restoration",
  "Medical and dental suppliers",
  "Safe and security companies",
  "AV and IT installers",
  "Real estate agents",
] as const;

/** Anchor target, so the nav can link straight at the lists. */
export const WHAT_WE_MOVE_ANCHOR = "what-we-move";

export type WhatWeMoveCopy = {
  heading: string;
  intro: string;
};

/**
 * Heading and intro vary by page. The three lists are the same everywhere,
 * which is deliberate — it is one operational fact about the business — but
 * four pages opening with identical prose would read as boilerplate to a
 * reader and to a crawler.
 */
export function whatWeMoveCopy(
  page: "hard-to-shift" | "commercial-moving",
  region: WhatWeMoveRegion,
): WhatWeMoveCopy {
  const place = region === "Auckland" ? "Auckland" : "Hamilton and the Waikato";

  if (page === "commercial-moving") {
    return {
      heading: "What we shift, and who we shift it for",
      intro: `The commercial work behind the moving trucks. These are the items, the jobs, and the trades we run for across ${place} — if your gear is on this list, we have moved it before, and there is a crew and a truck sized for it.`,
    };
  }

  return {
    heading: "What we move, what we do, and who we do it for",
    intro: `If you are not sure whether we will take it, this is the answer. Everything below is work we do across ${place} as a matter of routine, not a special request — and the last line of the first column is the honest summary of the rest.`,
  };
}
