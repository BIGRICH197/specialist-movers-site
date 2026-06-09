import type { Location } from "@/lib/location-types";

export type FaqItem = { q: string; a: string };

export type LocationSeoPatch = {
  extraParagraphs?: readonly string[];
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
  return {
    ...location,
    paragraphs: patch.extraParagraphs
      ? [...location.paragraphs, ...patch.extraParagraphs]
      : location.paragraphs,
    faqs: patch.faqs ?? location.faqs,
  };
}
