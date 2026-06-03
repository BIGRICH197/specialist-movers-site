/**
 * City page copy from specialistmovers.co.nz/piano-movers-auckland/
 * and specialistpianomovers.co.nz (merged for /piano-movers/auckland).
 */
import type { ServiceCitySlug } from "@/lib/service-cities";

export type PianoCityExtra = {
  lead: string;
  paragraphs: readonly string[];
  highlights: readonly { title: string; body: string }[];
  includedBullets: readonly string[];
  whyChooseCopy: string;
  faqs: readonly { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
};

export const pianoAucklandCity: PianoCityExtra = {
  metaTitle: "Piano Movers Auckland | Specialist Piano Movers",
  metaDescription:
    "Trusted piano movers in Auckland for upright, grand, and digital pianos. Local, cross-island, and international moves. Skids, dollies, storage, and insured specialist crews. Free quote.",
  lead:
    "Looking for reliable piano movers in Auckland? Specialist Piano Movers handles local moves, runs between Auckland and Hamilton, and coordinates international piano shipping when you need it.",
  paragraphs: [
    "At Specialist Piano Movers we focus on safe, efficient transport for pianos of all types and sizes. Our Auckland crew moves uprights, baby grands, grands, and digital pianos with equipment built for the job, not general furniture trucks.",
    "Your piano is often a family heirloom and the centrepiece of your home. We treat each move with meticulous care from collection through to placement at your new address.",
    "We are trusted by Steinway and major Auckland music retailers including Lewis Eady, Rockshop, and Piano Traders. From our Wairau Valley base we cover the North Shore, central suburbs, west, south, and east Auckland every week.",
    "Need storage between homes? We offer short-term and long-term piano storage with the same specialist handling. Emergency and short-notice moves are available when our schedule allows.",
  ],
  highlights: [
    {
      title: "Customised approach",
      body: "Each piano move is planned around your instrument, access, stairs, and parking.",
    },
    {
      title: "Prompt and reliable",
      body: "Clear communication and updates from quote through to delivery.",
    },
    {
      title: "Flexible scheduling",
      body: "Seven days a week. We work with music stores, schools, and home owners.",
    },
    {
      title: "Satisfaction guarantee",
      body: "Licensed crews, specialist insurance options, and hundreds of 5-star reviews.",
    },
  ],
  includedBullets: [
    "Piano skids, skid boards, dollies, straps, and protective coverings",
    "Shrink wrap and padded covers for damage-free transport",
    "Custom and secure crating for grand and international moves",
    "Expert handling of delicate parts and large rigging when required",
    "Short-term and long-term piano storage",
    "Local Auckland moves, Auckland to Hamilton, and international coordination",
    "Minimum three trained movers on standard piano jobs",
  ],
  whyChooseCopy:
    "We are a dedicated piano removal team, not general furniture labour. Our removalists use purpose-made blankets, secure straps, and route planning for stairs and tight hallways. You get transparent pricing and a competitive quote before we lock your move date.",
  faqs: [
    {
      q: "How do you keep my piano safe during transport?",
      a: "Our crews use specialist piano moving equipment, protective padding, and secure tie-downs in our piano trucks. Every move is handled as its own project so nothing is rushed.",
    },
    {
      q: "What types of pianos do you move in Auckland?",
      a: "Upright, console, baby grand, grand, and digital pianos. We scope access and stairs before we confirm crew size and price.",
    },
    {
      q: "Can you move a piano with difficult access or stairs?",
      a: "Yes. Our teams are used to narrow hallways, stairwells, and tight turns. Tell us about both addresses when you request a quote.",
    },
    {
      q: "How do I get a quote for piano moving in Auckland?",
      a: "Use the form on this page, call (021) 228 2728, or email richard@specialistmovers.co.nz. We call back within 15 minutes with a clear scope and price.",
    },
    {
      q: "Will my piano need tuning after the move?",
      a: "The move itself rarely affects tuning, but humidity changes can. Book a tuner 2 to 3 weeks after the piano settles in its new room.",
    },
  ],
};

export function getPianoCityExtra(
  city: ServiceCitySlug,
): PianoCityExtra | null {
  if (city === "auckland") return pianoAucklandCity;
  return null;
}
