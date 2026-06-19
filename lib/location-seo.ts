import type { Location } from "@/lib/location-types";

export type FaqItem = { q: string; a: string };

export type LocationSeoPatch = {
  /** Replace the templated meta description (keep ≥120 chars). */
  metaDescription?: string;
  /** Replace the templated intro line. */
  intro?: string;
  /** Replace the templated body paragraphs entirely. */
  paragraphs?: readonly string[];
  /** Append unique paragraphs after the (templated or replaced) body. */
  extraParagraphs?: readonly string[];
  /** Replace the templated highlight bullets. */
  highlights?: readonly string[];
  faqs?: readonly FaqItem[];
};

const waikatoInAreaPricing =
  "Travel from our Hamilton base is included in your quote for in-area Waikato towns, no hidden callout added on move day.";

const regionalPricing =
  "Longer routes are quoted with travel and access included upfront. You see the full price before you book, no hidden fees on the day.";

const longDistancePricing =
  "Long-distance moves are quoted individually with travel, crew time, and access factored in before you confirm. Return trips and multi-day legs are priced clearly in writing.";

const pianoProtection =
  "Pianos are wrapped in padded blankets and shrink wrap, secured with specialist straps, and carried on piano boards or custom dollies. Grands are padded and tilted safely before transport; uprights are wrapped and strapped inside the truck.";

/** SEO patches keyed by /locations/[slug] */
export const locationSeoPatches: Record<string, LocationSeoPatch> = {
  // ── North Shore (core, near the Glenfield/Wairau Valley depot) ──
  glenfield: {
    metaDescription:
      "Glenfield movers based next door in Wairau Valley. House and piano moves across Glenfield's 1970s homes, units, and townhouses, often at short notice. Free quote.",
    intro:
      "Glenfield is home turf, our depot sits next door in Wairau Valley, so we reach local jobs fast and know the streets, malls, and cul-de-sacs well.",
    paragraphs: [
      "Glenfield is mostly 1970s and 80s brick-and-tile homes, newer townhouse infill, and cross-leases off shared driveways. We check driveway width and parking at your free viewing so the truck lands close to the door.",
      "Being minutes from base keeps Glenfield callouts low and lets us slot in shorter-notice moves. We handle house moves, packing, piano transport, and office relocations across the suburb.",
    ],
    highlights: [
      "Depot next door in Wairau Valley",
      "Shared-driveway and cross-lease access sorted",
      "Often available on shorter notice",
      "Piano specialists, upright and grand",
    ],
  },
  birkenhead: {
    metaDescription:
      "Birkenhead movers for hillside villas and harbour-edge homes. Specialist Movers plans narrow streets, steep drives, and tight parking from our nearby Glenfield depot. Free quote.",
    intro:
      "Birkenhead moves mean hills, character villas, and narrow harbour-side streets, we scope steep drives and parking before move day.",
    paragraphs: [
      "From Highbury's older villas and bungalows to the steep streets above Little Shoal Bay, Birkenhead access is often tight: narrow frontages, sloped driveways, and limited on-street parking. We plan truck placement and carry routes at the viewing.",
      "Our Glenfield depot is just up the road, so Birkenhead is a regular run. House moves, pianos, packing, and exit cleans are all covered.",
    ],
    highlights: [
      "Hillside villa and character-home access",
      "Narrow-street parking planned in advance",
      "Close to our Glenfield depot",
      "Piano specialists, upright and grand",
    ],
  },
  northcote: {
    metaDescription:
      "Northcote movers for villas, units, and the regenerated town centre. Specialist Movers covers Northcote Point to Onepoto from our nearby Glenfield base. Free quote.",
    intro:
      "Northcote runs from character villas on the Point to the redeveloped town-centre townhouses, we plan access for both.",
    paragraphs: [
      "Northcote Point's pre-war villas have steep steps and narrow hallways, while the regenerated town centre brings new townhouses with shared lanes and parking limits. We confirm the access type at your viewing so the quote fits the property.",
      "We are minutes away in Glenfield, so Northcote is a frequent run for house moves, pianos, and packing, with easy motorway access for moves over the bridge.",
    ],
    highlights: [
      "Villas on the Point and new townhouses",
      "Shared-lane and parking access planned",
      "Quick run from our Glenfield depot",
      "Piano specialists, upright and grand",
    ],
  },
  hillcrest: {
    metaDescription:
      "Hillcrest movers for family homes and units near our Glenfield depot. Specialist Movers handles cross-lease driveways and unit access across Hillcrest. Free quote.",
    intro:
      "Hillcrest is a quick run from our Glenfield depot, established family homes, units, and cross-leases we move every week.",
    paragraphs: [
      "Much of Hillcrest is 1960s to 80s homes and brick units down shared driveways, where parking and carry distance matter most. We scope the driveway and door access so the crew works efficiently.",
      "Close to base, Hillcrest moves are easy to schedule, often on shorter notice. House, piano, packing, and office moves are all covered.",
    ],
    highlights: [
      "Minutes from our Glenfield depot",
      "Cross-lease and unit access sorted",
      "Often available on shorter notice",
      "Piano specialists, upright and grand",
    ],
  },
  takapuna: {
    metaDescription:
      "Takapuna movers for beachfront apartments and character homes. Specialist Movers plans lift bookings, loading zones, and town-centre parking before move day. Free quote.",
    intro:
      "Takapuna moves split between beachfront apartments and character homes, we plan lift bookings, loading zones, and town-centre parking before move day.",
    paragraphs: [
      "Apartment moves around the town centre and waterfront need lift bookings, loading-dock times, and sometimes building-manager sign-off, we arrange these in advance. Older homes near the lake and Hauraki bring villa steps and narrow drives.",
      "From our nearby North Shore depot we run Takapuna constantly: house moves, apartments, piano transport, and commercial fit-outs in the business district.",
    ],
    highlights: [
      "Apartment lift and loading-zone planning",
      "Beachfront apartments and character homes",
      "Close to our North Shore depot",
      "Piano specialists, upright and grand",
    ],
  },
  albany: {
    metaDescription:
      "Albany movers for new builds, large family homes, and townhouses. Specialist Movers covers Albany, Pinehill, and Oteha with easy motorway access. Free quote.",
    intro:
      "Albany is newer and bigger, large family homes, modern subdivisions, and townhouse blocks across Pinehill and Oteha. We size the crew and truck to match the volume.",
    paragraphs: [
      "Albany's newer homes mean more to move: double garages, multiple living areas, and townhouse complexes with shared parking and access codes. We scope it at the viewing so the right truck and crew turn up.",
      "Sitting on the motorway, Albany is a fast run from our depot and a natural staging point for moves further north. House moves, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Large homes and new builds, crew sized to volume",
      "Easy motorway access",
      "Townhouse complex codes and parking handled",
      "Piano specialists, upright and grand",
    ],
  },
  "browns-bay": {
    metaDescription:
      "Browns Bay movers for the East Coast Bays. Specialist Movers covers beachside family homes, units, and downsizes from our North Shore depot. Free quote.",
    intro:
      "Browns Bay and the East Coast Bays mix beachside family homes, units, and retiree downsizes, we plan parking and access for each.",
    paragraphs: [
      "Many Browns Bay homes are 1960s to 70s on the bays' slopes, with sloped driveways and busy beachside parking near the village. We confirm truck placement and carry routes so move day runs smoothly.",
      "We cover the wider Bays, Mairangi, Murrays, and Rothesay, on our regular North Shore schedule. House moves, pianos, packing, and downsizing moves are all welcome.",
    ],
    highlights: [
      "Across the East Coast Bays",
      "Sloped-drive and beachside parking planned",
      "Retiree downsizing a specialty",
      "Piano specialists, upright and grand",
    ],
  },
  "long-bay": {
    metaDescription:
      "Long Bay movers for the new subdivision's modern homes and townhouses. Specialist Movers plans complex access codes, shared lanes, and parking. Free quote.",
    intro:
      "Long Bay is one of the Shore's newest neighbourhoods, modern homes and townhouse blocks where access codes, shared lanes, and parking need planning.",
    paragraphs: [
      "The Long Bay development brings large new builds and tightly packed townhouses with shared driveways, visitor-parking limits, and gated access. We confirm these before the truck arrives so there are no hold-ups.",
      "It is an outer-north run from our depot; we schedule Long Bay alongside Torbay and the upper Bays. House moves, pianos, and packing are all covered.",
    ],
    highlights: [
      "Gated access and visitor-parking limits handled",
      "Modern homes and townhouse blocks",
      "Scheduled with the upper Bays",
      "Piano specialists, upright and grand",
    ],
  },
  torbay: {
    metaDescription:
      "Torbay movers for hillside coastal homes. Specialist Movers plans steep driveways, narrow winding streets, and carry distance from our North Shore base. Free quote.",
    intro:
      "Torbay is steep and coastal, winding streets and sloped driveways that need a proper access plan before move day.",
    paragraphs: [
      "Many Torbay homes sit up or down steep drives on narrow, winding streets where a large truck cannot always reach the door. We scope carry distance and whether a smaller shuttle vehicle is needed at the viewing.",
      "Torbay is part of our regular upper-Bays schedule from the North Shore depot. House moves, pianos, packing, and exit cleans are all covered.",
    ],
    highlights: [
      "Steep-driveway and narrow-street planning",
      "Shuttle vehicle for tight access when needed",
      "Hillside coastal homes",
      "Piano specialists, upright and grand",
    ],
  },
  silverdale: {
    metaDescription:
      "Silverdale movers for Millwater, new subdivisions, and rural-residential. Specialist Movers covers the northern growth area with travel quoted upfront. Free quote.",
    intro:
      "Silverdale and Millwater are fast-growing, new subdivisions, large homes, and rural-residential blocks at the northern edge of our patch.",
    paragraphs: [
      "Silverdale's new builds bring volume, double garages, sheds, and multiple living areas, while rural-residential lots add long driveways and gates. We scope the whole property so the truck and crew are right-sized.",
      "Silverdale sits in our outer-north zone, so we quote travel clearly upfront, with no surprise callout on the day. House moves, pianos, and packing are all covered.",
    ],
    highlights: [
      "New subdivisions and lifestyle blocks",
      "Outer-north travel quoted upfront",
      "Crew sized to larger homes",
      "Piano specialists, upright and grand",
    ],
  },
  orewa: {
    metaDescription:
      "Orewa movers for the Hibiscus Coast. Specialist Movers covers beachfront apartments, family homes, and retiree downsizes, travel quoted upfront. Free quote.",
    intro:
      "Orewa moves run from beachfront apartments along the strip to family homes and retiree downsizes across the Hibiscus Coast.",
    paragraphs: [
      "Orewa's beachfront apartments need lift bookings and loading-zone timing, while the newer hillside subdivisions bring volume and access codes. We plan both at the viewing.",
      "Orewa is in our outer-north zone; travel is quoted upfront with no hidden callout. House moves, apartments, pianos, packing, and downsizing are all covered.",
    ],
    highlights: [
      "Beachfront apartment lift and loading planning",
      "Outer-north travel quoted upfront",
      "Retiree downsizing a specialty",
      "Piano specialists, upright and grand",
    ],
  },
  cambridge: {
    extraParagraphs: [
      `Cambridge is a strong piano corridor, we move uprights and grands for homes, schools, and music retailers across town and nearby lifestyle blocks. ${pianoProtection}`,
      `Rural driveways, equestrian properties, and town-centre villas all need a viewing so we plan truck access and crew size. ${waikatoInAreaPricing}`,
    ],
    faqs: [
      {
        q: "Do you cover rural properties around Cambridge?",
        a: "Yes. lifestyle blocks, dairy farms, and rural driveways around Cambridge are part of our regular Hamilton schedule. We visit before larger house moves so access and volume are clear in your fixed quote.",
      },
      {
        q: "How far in advance should I book a Cambridge move?",
        a: "Two weeks ahead is ideal for weekends and month-end. We can often move sooner, call (021) 228 2728 and we will check the next Hamilton crew available for Cambridge.",
      },
      {
        q: "Are travel costs included in my Cambridge quote?",
        a: "Yes. Cambridge sits in our in-area Waikato zone from Hamilton. Travel is built into your written quote, not added as a surprise on move day.",
      },
    ],
  },
  morrinsville: {
    extraParagraphs: [
      `Morrinsville sees steady demand for house moves, farm-gate pickups, and piano transport for homes and local retailers. ${pianoProtection}`,
      `Town-centre villas and rural properties on the outskirts both benefit from a viewing so we send the right truck and crew. ${waikatoInAreaPricing}`,
    ],
    faqs: [
      {
        q: "Do you cover rural properties around Morrinsville?",
        a: "Yes. town and rural Morrinsville properties are serviced from our Hamilton base. We scope driveways, gates, and carrying distance at your viewing.",
      },
      {
        q: "How far in advance should I book?",
        a: "Book two weeks ahead when you can, especially for end-of-month dates. Shorter notice is often possible, contact us for the next available slot.",
      },
      {
        q: "Are travel costs included in the quote?",
        a: "Yes. Morrinsville is in our in-area Waikato pricing from Hamilton. Your quote includes travel; there is no separate callout on the day.",
      },
    ],
  },
  "te-awamutu": {
    extraParagraphs: [
      `Te Awamutu moves include house relocations, commercial runs, and regular piano transport for homes and music schools. ${pianoProtection}`,
      waikatoInAreaPricing,
    ],
    faqs: [
      {
        q: "Do you cover rural properties around Te Awamutu?",
        a: "Yes. we cover Te Awamutu town and surrounding rural roads from Hamilton. A viewing locks in truck access and a fixed house-move price.",
      },
      {
        q: "How far in advance should I book?",
        a: "Two weeks is recommended for peak dates. Call us for shorter-notice moves, we schedule Te Awamutu jobs several times each week.",
      },
      {
        q: "Are travel costs included?",
        a: "Yes. Te Awamutu is in-area from Hamilton. Travel is included in your written quote upfront.",
      },
    ],
  },
  matamata: {
    extraParagraphs: [
      `Matamata and nearby rural properties need clear access planning, we visit before larger house moves. Piano moves for homes and local businesses use padded blankets, shrink wrap, and specialist crews. ${pianoProtection}`,
      `Matamata sits in Waikato Zone C from our Hamilton base, travel is quoted clearly when you book. ${waikatoInAreaPricing}`,
    ],
    faqs: [
      {
        q: "Do you cover rural properties around Matamata?",
        a: "Yes. Matamata town and surrounding rural roads are covered from Hamilton. We confirm driveways, gates, and volume at a viewing.",
      },
      {
        q: "How far in advance should I book a Matamata move?",
        a: "Two weeks ahead is best for weekends. We can often accommodate shorter notice, call for the next crew heading through Matamata.",
      },
      {
        q: "Are travel costs included in the quote?",
        a: "Yes. travel from Hamilton is included in your written price for in-area Matamata jobs. Zone callout, if applicable, is confirmed before you book.",
      },
    ],
  },
  tauranga: {
    extraParagraphs: [
      `Piano transport between Hamilton and Tauranga uses padded blankets, shrink wrap, piano boards for grands, and securing straps inside our trucks. ${pianoProtection}`,
      `Tauranga and Papamoa moves are quoted as regional routes from Hamilton. ${regionalPricing}`,
    ],
    faqs: [
      {
        q: "How much does it cost to move a piano to Tauranga?",
        a: "Piano moves to Tauranga are quoted individually, uprights and grands are priced with stairs, access, and travel included. Request a quote online or call (021) 228 2728 for a firm price.",
      },
      {
        q: "How long does a Hamilton to Tauranga move take?",
        a: "Most regional house loads are a full day including travel and unload. We confirm crew arrival, drive time, and completion window when we quote.",
      },
      {
        q: "How is furniture protected on longer routes?",
        a: "Yes. blankets, wrap, and strapping are standard on every load. Items are secured inside the truck for the full journey; pianos and fragile pieces get extra padding.",
      },
      {
        q: "Are travel costs included upfront?",
        a: "Yes. Tauranga routes are quoted with travel and access included before you confirm. No hidden fees on move day.",
      },
    ],
  },
  rotorua: {
    extraParagraphs: [
      `Rotorua piano moves use specialist equipment, piano boards, padded blankets, shrink wrap, and experienced crews for uprights and grands. ${pianoProtection}`,
      regionalPricing,
    ],
    faqs: [
      {
        q: "How much does it cost to move a piano to Rotorua?",
        a: "Each piano move is quoted on stairs, piano type, and access, travel from Hamilton is included in your written price. Uprights and grands are priced separately before you book.",
      },
      {
        q: "How long does a Hamilton to Rotorua move take?",
        a: "Most regional moves are one full day including travel and unload. We give you an arrival window and completion estimate when we quote.",
      },
      {
        q: "How is furniture protected on longer routes?",
        a: "Yes. furniture is blanket-wrapped and strapped for the full drive. Fragile and high-value items are boxed or extra-padded before loading.",
      },
      {
        q: "Are travel costs included in the quote?",
        a: "Yes. Rotorua routes are quoted with travel included upfront. You approve the full price before move day.",
      },
    ],
  },
  taupo: {
    extraParagraphs: [
      `Taupo piano and house moves use the same careful wrapping, blankets, shrink wrap, and secure strapping for the longer drive. ${pianoProtection}`,
      regionalPricing,
    ],
    faqs: [
      {
        q: "How much does it cost to move to Taupo?",
        a: "Taupo moves are quoted individually based on volume, access, and travel from Hamilton. You receive a written price before you confirm, typically one day on site for a full house load.",
      },
      {
        q: "How long does a move to Taupo take?",
        a: "Most Taupo jobs are a full day including travel and unload. Multi-day or storage legs are quoted clearly if your settlement dates do not align.",
      },
      {
        q: "How is furniture protected on longer routes?",
        a: "Yes. standard blanket wrap and truck strapping apply on every Taupo run. Pianos and fragile items receive specialist padding.",
      },
      {
        q: "Are travel costs included?",
        a: "Yes. travel from Hamilton is built into your quote before you book. No surprise travel charge on the day.",
      },
    ],
  },
  thames: {
    extraParagraphs: [
      `Thames and Coromandel gateway moves often include coastal access and longer drive times, we quote travel clearly from Hamilton. ${pianoProtection}`,
      regionalPricing,
    ],
    faqs: [
      {
        q: "How much does it cost to move to Thames?",
        a: "Thames moves are quoted as a regional route from Hamilton with travel included. Price depends on volume, access, and property type, we confirm in writing before you book.",
      },
      {
        q: "How long does a move to Thames take?",
        a: "Most Thames jobs are one full day including travel and unload. Narrow access or hillside properties may need extra crew time, scoped at viewing.",
      },
      {
        q: "How is furniture protected on the drive?",
        a: "Yes. blankets, wrap, and internal truck strapping are standard. Coastal humidity is managed with proper wrap so items arrive dry and secure.",
      },
      {
        q: "Are travel costs included upfront?",
        a: "Yes. Thames routes are quoted with travel included. You see the full price before you confirm.",
      },
    ],
  },
  wellington: {
    extraParagraphs: [
      `Long-distance moves to Wellington are planned in stages, viewing or detailed inventory, written quote, confirmed dates, then load, travel, and unload with the same crew lead throughout.`,
      `Piano transport on long routes uses padded blankets, shrink wrap, piano boards, and dedicated securing inside the truck. Transit insurance options are available, ask when you quote. ${longDistancePricing}`,
    ],
    faqs: [
      {
        q: "How long does a move to Wellington take?",
        a: "Most Wellington routes are two days, load day, overnight travel, and unload the next day. We confirm timing and crew plan in your written quote.",
      },
      {
        q: "What is included in a long-distance quote?",
        a: "Yes. labour, truck, travel, standard wrapping, and unload are included. Packing, storage, piano specialist handling, and insurance are itemised when you need them.",
      },
      {
        q: "How is a piano protected on a long route to Wellington?",
        a: "Yes. pianos are blanket-wrapped, shrink-wrapped, and strapped on boards inside the truck. Grands are tilted and padded; uprights are secured upright for the full journey.",
      },
      {
        q: "Do you do return trips from Wellington?",
        a: "Yes. return loads and backhaul dates are often available. Call with your dates and we will match a return trip where possible.",
      },
      {
        q: "How far in advance should I book a Wellington move?",
        a: "Four weeks ahead is ideal for long-distance routes. Two weeks minimum for month-end, call early to secure your preferred dates.",
      },
    ],
  },
  napier: {
    extraParagraphs: [
      `Napier and Hastings Hawke's Bay routes are quoted as dedicated regional moves from Hamilton with travel included upfront. ${pianoProtection}`,
      longDistancePricing,
    ],
    faqs: [
      {
        q: "How long does a move to Napier take?",
        a: "Most Napier routes are two days, load, travel, and unload. We confirm drive time and crew plan when we quote.",
      },
      {
        q: "What is included in a Napier move quote?",
        a: "Yes. crew, truck, travel, and standard furniture protection are included. Packing, storage, and specialist piano handling are added when required.",
      },
      {
        q: "How is a piano protected on the Napier route?",
        a: "Yes. padded blankets, shrink wrap, and piano boards are standard. The piano is secured inside the truck for the full Hawke's Bay drive.",
      },
      {
        q: "How far in advance should I book?",
        a: "Three to four weeks ahead is best for Hawke's Bay routes. Call (021) 228 2728 for shorter-notice availability.",
      },
      {
        q: "Do you do return trips from Napier?",
        a: "Yes. return loads and backhaul dates are often available. Call with your dates and we will match a return trip where possible.",
      },
    ],
  },
  hastings: {
    extraParagraphs: [
      `Hastings moves cover horticulture properties, town homes, and commercial sites across Hawke's Bay, quoted with travel from Hamilton included. ${pianoProtection}`,
      longDistancePricing,
    ],
    faqs: [
      {
        q: "How long does a move to Hastings take?",
        a: "Most Hastings jobs are two days including travel from Hamilton. Same-day regional loads are quoted individually when distance allows.",
      },
      {
        q: "What is included in a Hastings move quote?",
        a: "Yes. labour, truck, travel, and blanket wrap are included in your written price. Add-ons like packing or storage are listed separately.",
      },
      {
        q: "How is furniture protected on longer routes?",
        a: "Yes. furniture is wrapped and strapped for the full drive. Pianos and fragile items get specialist padding and securing.",
      },
      {
        q: "How far in advance should I book?",
        a: "Book three to four weeks ahead for Hawke's Bay routes when possible. We will confirm your dates when you request a quote.",
      },
      {
        q: "Do you do return trips from Hastings?",
        a: "Yes. return loads and backhaul dates are often available on Hawke's Bay routes. Call with your dates and we will check availability.",
      },
    ],
  },
  "palmerston-north": {
    extraParagraphs: [
      `Palmerston North sits on our lower North Island corridor from Hamilton, house, office, piano, and commercial moves with travel quoted upfront. ${pianoProtection}`,
      longDistancePricing,
    ],
    faqs: [
      {
        q: "How long does a move to Palmerston North take?",
        a: "Most Palmerston North routes are two days, load day, travel, and unload. Timing is confirmed in your written quote.",
      },
      {
        q: "What is included in a long-distance quote?",
        a: "Yes. crew, truck, travel, and standard protection are included. Specialist piano handling, packing, and insurance are itemised when needed.",
      },
      {
        q: "How is a piano protected on the route?",
        a: "Yes. blankets, shrink wrap, and piano boards are used on every piano move. The instrument is secured inside the truck for the full journey.",
      },
      {
        q: "How far in advance should I book?",
        a: "Three weeks ahead is recommended for Manawatu routes. Call for availability on shorter notice.",
      },
      {
        q: "Do you do return trips from Palmerston North?",
        a: "Yes. return loads and backhaul dates are often available on lower North Island routes. Call with your dates and we will match a return trip where possible.",
      },
    ],
  },
};

export function applyLocationSeo(location: Location): Location {
  const patch = locationSeoPatches[location.slug];
  if (!patch) return location;
  const body = patch.paragraphs ?? location.paragraphs;
  return {
    ...location,
    metaDescription: patch.metaDescription ?? location.metaDescription,
    intro: patch.intro ?? location.intro,
    paragraphs: patch.extraParagraphs
      ? [...body, ...patch.extraParagraphs]
      : body,
    highlights: patch.highlights ?? location.highlights,
    faqs: patch.faqs ?? location.faqs,
  };
}
