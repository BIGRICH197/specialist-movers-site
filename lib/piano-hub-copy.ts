import { regions } from "@/lib/regions";

export const pianoHubMeta = {
  title: "Piano moving Auckland & Hamilton | Specialist Piano Movers",
  description:
    "Hire Special Movers, your piano moving experts in Auckland. We move your piano safely both locally and internationally. Contact us today to know more.",
};

export const pianoHubHero = {
  eyebrow:
    "Trusted by Steinway and Auckland music retailers. Piano specialists.",
  h1: "Specialist Piano Movers.",
  h1Sub: "Auckland and Hamilton moving specialists.",
  lead:
    "We move uprights, baby grands, and grands with dedicated piano trucks and crews who do this every day. Choose your city below, or request a quote and we will confirm the right depot and crew.",
  subline: "Piano moves from $300. Free quote. Callback within 15 minutes.",
  photoTagline: "You play. We move.",
};

export const pianoHubCitiesIntro = {
  title: "Piano moving in your area",
  body: `We run daily piano work from our Auckland (Wairau Valley) and Hamilton bases, with regular routes between the two cities and ${regions.serviceArea} coverage.`,
};

export const pianoHubCities = [
  {
    id: "auckland",
    label: "Auckland",
    href: "/piano-movers/auckland",
    title: "Piano movers Auckland",
    excerpt:
      "North Shore, central, west, south, and east Auckland. Trusted by Lewis Eady, Rockshop, Piano Traders, and Steinway.",
    cta: "Auckland piano moving",
  },
  {
    id: "hamilton",
    label: "Hamilton",
    href: "/piano-movers/hamilton",
    title: "Piano moving Hamilton",
    excerpt:
      "Hamilton city, Cambridge, and the Waikato. Regular Hamilton to Auckland corridor runs for homes and music stores.",
    cta: "Hamilton piano moving",
  },
] as const;

export const pianoHubServicesIntro = {
  title: "Piano services",
  body: "Upright, grand, tuning, international shipping, or storage. Pick the option that fits your piano.",
};
