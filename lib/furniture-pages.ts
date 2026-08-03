import { aucklandServiceHref } from "@/lib/legacy-auckland-urls";
import type { NicheServicePageConfig } from "@/lib/niche-service-pages";
import { sitePhotos } from "@/lib/site-photos";

/**
 * H1 from the 2026-07-28 GEO audit: "furniture movers" was the primary goal
 * keyword and no page targeted it. /furniture-movers and
 * /furniture-movers-auckland both 404'd, and the word appeared zero times in
 * any URL, title tag, H1 or H2 across all 101 pages, while Urban Movers,
 * LJ Furniture Movers and Express Movers all ran exact-match pages.
 *
 * Search Console backs the call to chase "furniture" over "house": across the
 * 90 days to 2026-08-02, non-brand queries containing "furniture" drew 7,272
 * impressions at average position 31.8, ahead of "house" on 6,444 at 34.6.
 * "furniture movers north shore" already sits at 9.7 off the homepage alone,
 * with no page behind it.
 *
 * Every price below is excl. GST and checked against brain/context/pricing.md
 * (last_updated 2026-07-07). $120/hr is the TUESDAY 2-man Auckland rate — the
 * cheapest day, not the standard one — so it is never written without the
 * Friday rate beside it.
 */
export const furnitureMoversAucklandPage: NicheServicePageConfig = {
  path: "/furniture-movers-auckland",
  metaTitle: "Furniture Movers Auckland | Specialist Movers",
  metaDescription:
    "Furniture movers in Auckland for a single item or a full house. Real hourly rates, trained crews, and the people Steinway dealers trust with a grand piano.",
  eyebrow: "Auckland furniture moving specialists",
  h1: "Furniture movers Auckland",
  lead:
    "One heavy item or a whole houseful. We move furniture across Auckland seven days a week, with crews who plan the stairs and the tight corners before the truck arrives.",
  subline: "Free quote. We call back within 15 minutes. 7 days a week.",
  defaultJobType: "Home Move",
  heroPhoto: sitePhotos.houseMove,
  heroPhotoAlt:
    "Specialist Movers crew carrying wrapped furniture to the truck in Auckland",
  aboutSidePhoto: sitePhotos.homeHero,
  aboutSidePhotoAlt:
    "Wrapped furniture loaded and strapped inside an Auckland moving truck",
  heroOverlayCaption: "We move concert grands. Your dining table will be fine.",
  aboutTitle: "The crew that moves pianos for Steinway dealers",
  aboutBody:
    "Most furniture is straightforward. The pieces that are not, a marble dining table, a spa pool, a safe, a pool table, a wardrobe that will not turn on the landing, are the ones that decide whether a move goes well. We move grand pianos for Auckland's Steinway dealers every week, so the awkward end of furniture moving is simply what we do. That experience is why the easy jobs stay easy.",
  trustHighlights: [
    {
      title: "Single items welcome",
      text: "One couch, one fridge, one piano. You do not need a full house move to call us.",
    },
    {
      title: "Wrapped as standard",
      text: "Moving blankets, shrink wrap, and mattress covers on every job, not as an upsell.",
    },
    {
      title: "Apart and back together",
      text: "Beds, dining tables, and modular units come apart and go back together.",
    },
  ],
  whyTitle: "What furniture moving costs in Auckland",
  whyBody:
    "A two-person crew and truck runs $120 per hour plus GST on a Tuesday, our cheapest day, rising to $150 on a Friday. Three movers are $160 on a Tuesday and $190 on a Friday. On top of the hourly rate there is a callout fee based on distance from our depot, starting at $60 for a two-person crew inside about 23km, and a flat $25 fuel surcharge. A single awkward item is usually an hour or two. A full three-bedroom house is normally a day. The whole number goes in writing before you book, and for larger homes we come and look first so the price is a price rather than a guess.",
  includedBullets: [
    "Single-item moves, part-loads, and full household relocations",
    "Heavy and awkward pieces: spa pools, safes, pool tables, marble tops",
    "Disassembly and reassembly of beds, tables, and modular furniture",
    "Moving blankets, shrink wrap, and mattress covers as standard",
    "Stairs, balcony hoists, and tight-access carries planned before the day",
    "Storage between settlement dates when the timing does not line up",
  ],
  relatedLinks: [
    { label: "Moving house Auckland", href: aucklandServiceHref("house-moving") },
    { label: "Hard to shift items", href: aucklandServiceHref("hard-to-shift") },
    { label: "Piano moving", href: "/piano-movers" },
    { label: "Packing services", href: aucklandServiceHref("packing-services") },
    { label: "Office furniture movers", href: aucklandServiceHref("office-moving") },
    { label: "Furniture movers Hamilton", href: "/furniture-movers-hamilton" },
  ],
  faqHeading: "Furniture moving questions",
  faqs: [
    {
      q: "How much do furniture movers cost in Auckland?",
      a: "A two-person crew and truck is $120 per hour plus GST on a Tuesday and $150 on a Friday, plus a callout fee from $60 depending on distance from our depot and a flat $25 fuel surcharge. A single heavy item is usually one to two hours. A three-bedroom house is normally a full day.",
    },
    {
      q: "Will you move just one item?",
      a: "Yes. Single-item jobs are a regular part of our week, whether that is a couch up a flight of stairs, a fridge across town, or a piano. You do not need a full house move to book us.",
    },
    {
      q: "Do you move heavy or awkward things like spa pools and safes?",
      a: "Yes. Spa pools, safes, pool tables, marble table tops, and kilns are all jobs we do regularly, and we run balcony hoists and crane lifts when stairs are not an option. Send photos of both ends when you ask for a quote and we will tell you exactly what the job needs.",
    },
    {
      q: "Do you wrap furniture, or should I?",
      a: "We do. Moving blankets, shrink wrap, and mattress covers come on every job as standard rather than as an extra. If you want everything boxed as well, our packers can come in the day before.",
    },
    {
      q: "Can you take apart a bed or a dining table?",
      a: "Yes. Beds, dining tables, and modular office furniture are disassembled for transport and put back together at the other end. Tell us when you quote so we allow the time.",
    },
    {
      q: "What happens if the furniture will not fit through the door?",
      a: "It happens more often than you would think, usually with sofas and wardrobes in older Auckland villas. We check the carry path at both addresses before move day, and when nothing fits we hoist over a balcony or through a window. We have done that with a grand piano, so a couch is manageable.",
    },
    {
      q: "How much notice do you need?",
      a: "Two weeks is ideal for weekends and month-end. Single items and smaller jobs we can often fit sooner, so call (021) 228 2728 and we will check the next available crew.",
    },
    {
      // Real sub-cluster: "office furniture movers auckland" alone drew 595
      // impressions in 90 days, landing on the office page with nothing
      // written for it.
      q: "Do you move office furniture as well as household?",
      a: "Yes, and it is a big part of our week. Desks and workstations come apart with the hardware bagged and labelled per desk, so they go back together the same way. We handle filing, boardroom tables, and server gear, and we work after hours or at weekends when a business cannot lose a working day. Building access, lift bookings, and loading zones are confirmed before the day.",
    },
    {
      q: "Which parts of Auckland do you cover?",
      a: "All of it, from our North Shore depot. North Shore, central, east, west, and south Auckland are standard callout areas, with the fee varying by distance. Hibiscus Coast, Pukekohe, and Warkworth are outer zones and priced accordingly.",
    },
  ],
  itemTable: {
    title: "How long each item takes, and how we handle it",
    intro:
      "Times are for two movers with normal access, measured on our own jobs. Stairs, long carries, and tight doorways add to them, which is why we ask about both ends before quoting.",
    rows: [
      {
        item: "Three-seater sofa",
        method: "Blanket-wrapped, shrink wrapped, carried on its end through doorways",
        time: "20 to 40 min",
      },
      {
        item: "Bed and mattress",
        method: "Frame disassembled, mattress in a cover, reassembled at the other end",
        time: "30 to 45 min",
      },
      {
        item: "Fridge or freezer",
        method: "Emptied and defrosted beforehand, strapped upright to an appliance trolley",
        time: "20 to 30 min",
      },
      {
        item: "Wardrobe or tallboy",
        method: "Emptied, doors taped, blanket-wrapped and walked on a flat trolley",
        time: "20 to 40 min",
      },
      {
        item: "Dining table, timber",
        method: "Legs removed, top wrapped and carried on edge",
        time: "30 to 45 min",
      },
      {
        item: "Dining table, marble or glass top",
        method: "Top travels vertically in a padded frame, never flat",
        time: "45 to 90 min",
      },
      {
        item: "Upright piano",
        method: "Padded, shrink wrapped, piano trolley and straps, minimum three movers",
        time: "45 to 90 min",
      },
      {
        item: "Grand piano",
        method: "Legs and pedals off, tilted onto a padded piano board, minimum three movers",
        time: "1.5 to 3 hrs",
      },
      {
        item: "Pool table, slate",
        method: "Slate beds separated and carried individually, reassembled and levelled",
        time: "2 to 4 hrs",
      },
      {
        item: "Spa pool",
        method: "Drained beforehand, tilted onto a spa dolly, four movers or a crane on tight sites",
        time: "1.5 to 3 hrs",
      },
      {
        item: "Safe",
        method: "Weight confirmed first, heavy-duty trolley, stair-climber or hoist over about 150kg",
        time: "1 to 3 hrs",
      },
      {
        item: "Office desks and workstations",
        method: "Broken down to components, hardware bagged and labelled per desk",
        time: "20 to 30 min each",
      },
    ],
    footnote:
      "Anything that will not fit the stairs goes over a balcony or through a window on a hoist. We do that with grand pianos, so it is a normal day rather than a last resort.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Furniture movers Auckland" },
  ],
  serviceLabel: "Furniture Move",
};

/**
 * Hamilton mirror. Rates come from the Hamilton matrix, which is a different
 * table: 2-man is $140 on Tuesday and capped at $150 every other day
 * (Richard, 2026-07-07).
 */
export const furnitureMoversHamiltonPage: NicheServicePageConfig = {
  path: "/furniture-movers-hamilton",
  metaTitle: "Furniture Movers Hamilton | Specialist Movers",
  metaDescription:
    "Furniture movers in Hamilton and the Waikato for a single item or a full house. Real hourly rates, trained crews, and careful handling on the awkward pieces.",
  eyebrow: "Hamilton and Waikato furniture specialists",
  h1: "Furniture movers Hamilton",
  lead:
    "One heavy item or a whole houseful, moved across Hamilton and the Waikato by crews who plan access before the truck turns up.",
  subline: "Free quote. We call back within 15 minutes. 7 days a week.",
  defaultJobType: "Home Move",
  heroPhoto: sitePhotos.houseMove,
  heroPhotoAlt:
    "Specialist Movers crew carrying wrapped furniture to the truck in Hamilton",
  aboutSidePhoto: sitePhotos.homeHero,
  aboutSidePhotoAlt: "Wrapped furniture strapped inside a Specialist Movers truck",
  heroOverlayCaption: "The awkward ones are the ones we like.",
  aboutTitle: "Waikato furniture moving, run from our Hamilton base",
  aboutBody:
    "We run Hamilton and the wider Waikato from our own base here, not as an Auckland crew making a long trip. That means Cambridge, Te Awamutu, Huntly, Ngāruawāhia, Morrinsville and Matamata are ordinary working days rather than special jobs. The same crews handle pianos for music retailers across the North Island, so heavy and awkward furniture is familiar ground.",
  trustHighlights: [
    {
      title: "Local base",
      text: "Hamilton crews and trucks, so Waikato towns are a normal day's work.",
    },
    {
      title: "Single items welcome",
      text: "One couch, one fridge, one piano. No need for a full house move.",
    },
    {
      title: "Wrapped as standard",
      text: "Blankets, shrink wrap, and mattress covers on every job.",
    },
  ],
  whyTitle: "What furniture moving costs in Hamilton",
  whyBody:
    "A two-person crew and truck is $140 per hour plus GST on a Tuesday and $150 on any other day, with three movers at $180 to $190. On top of that there is a callout fee from $60 depending on distance from our Hamilton base, and a flat $25 fuel surcharge. A single heavy item is usually an hour or two; a three-bedroom house is normally a day. Everything goes in writing before you book, and for bigger homes we come and look first.",
  includedBullets: [
    "Single-item moves, part-loads, and full household relocations",
    "Heavy and awkward pieces: spa pools, safes, pool tables, marble tops",
    "Disassembly and reassembly of beds, tables, and modular furniture",
    "Moving blankets, shrink wrap, and mattress covers as standard",
    "Cambridge, Te Awamutu, Huntly, Ngāruawāhia, Morrinsville, and Matamata",
    "Hamilton to Auckland runs when you are moving between the two",
  ],
  relatedLinks: [
    { label: "Moving house Hamilton", href: "/services/house-moving-hamilton" },
    { label: "Piano moving Hamilton", href: "/piano-movers/hamilton" },
    { label: "Furniture movers Auckland", href: "/furniture-movers-auckland" },
    { label: "Packing services", href: aucklandServiceHref("packing-services") },
  ],
  faqHeading: "Furniture moving questions",
  faqs: [
    {
      q: "How much do furniture movers cost in Hamilton?",
      a: "A two-person crew and truck is $140 per hour plus GST on a Tuesday and $150 on any other day, plus a callout fee from $60 depending on distance from our Hamilton base and a flat $25 fuel surcharge. A single heavy item is usually one to two hours; a three-bedroom house is normally a full day.",
    },
    {
      q: "Will you move just one item?",
      a: "Yes. Single-item jobs are a regular part of our week in Hamilton, from a couch up a staircase to a piano across town.",
    },
    {
      q: "Which Waikato towns do you cover?",
      a: "Cambridge, Te Awamutu, Huntly, Ngāruawāhia, Morrinsville, Matamata, Raglan, Tokoroa, and the towns between them. Travel is quoted upfront, not added afterwards.",
    },
    {
      q: "Do you move heavy or awkward things like spa pools and safes?",
      a: "Yes. Spa pools, safes, pool tables, and marble tops are regular work. Send photos of both ends when you ask for a quote and we will tell you what the job needs.",
    },
    {
      q: "Can you move furniture between Hamilton and Auckland?",
      a: "Yes. That corridor is a weekly route for us and we have depots at both ends, so it is quoted as a normal job rather than a long-distance special.",
    },
    {
      q: "How much notice do you need?",
      a: "Two weeks is ideal for weekends and month-end. Smaller jobs we can often fit sooner, so call (021) 228 2728 and we will check crew availability.",
    },
  ],
  itemTable: {
    title: "How long each item takes, and how we handle it",
    intro:
      "Times are for two movers with normal access, measured on our own jobs. Stairs, long carries, and tight doorways add to them, so we ask about both ends before quoting.",
    rows: [
      {
        item: "Three-seater sofa",
        method: "Blanket-wrapped, shrink wrapped, carried on its end through doorways",
        time: "20 to 40 min",
      },
      {
        item: "Bed and mattress",
        method: "Frame disassembled, mattress in a cover, reassembled at the other end",
        time: "30 to 45 min",
      },
      {
        item: "Fridge or freezer",
        method: "Emptied and defrosted beforehand, strapped upright to an appliance trolley",
        time: "20 to 30 min",
      },
      {
        item: "Dining table, timber",
        method: "Legs removed, top wrapped and carried on edge",
        time: "30 to 45 min",
      },
      {
        item: "Upright piano",
        method: "Padded, shrink wrapped, piano trolley and straps, minimum three movers",
        time: "45 to 90 min",
      },
      {
        item: "Grand piano",
        method: "Legs and pedals off, tilted onto a padded piano board, minimum three movers",
        time: "1.5 to 3 hrs",
      },
      {
        item: "Pool table, slate",
        method: "Slate beds separated and carried individually, reassembled and levelled",
        time: "2 to 4 hrs",
      },
      {
        item: "Spa pool",
        method: "Drained beforehand, tilted onto a spa dolly, four movers on tight sites",
        time: "1.5 to 3 hrs",
      },
    ],
    footnote:
      "Rural Waikato properties often have long gravel drives or a gate well back from the house. Tell us when you quote and we will bring the right truck rather than shuttling.",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Furniture movers Hamilton" },
  ],
  serviceLabel: "Furniture Move",
};
