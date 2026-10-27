import type { NicheServicePageConfig } from "@/lib/niche-service-pages";
import type { ServiceArea } from "@/lib/service-areas";
import { sitePhotos } from "@/lib/site-photos";

/**
 * /regular-runs: the scheduled Auckland to Hamilton (daily) and
 * Auckland to Tauranga & Bay of Plenty (weekly) runs. Linked from the homepage
 * hero strip (components/RegularRunsChips.tsx, which holds the run list).
 *
 * Route keywords ("movers auckland to tauranga") have near-zero search volume
 * (Keyword Planner, 2026-10-28), so this page sells the scheduled truck, not
 * the route: part loads and single items riding a run that is going anyway.
 * No part-load prices published yet; add them here once Richard sets them.
 */
const RUNS_AREA: ServiceArea[] = [
  { "@type": "City", name: "Auckland" },
  { "@type": "City", name: "Hamilton" },
  { "@type": "City", name: "Tauranga" },
  { "@type": "AdministrativeArea", name: "Bay of Plenty" },
];

export const regularRunsPage: NicheServicePageConfig = {
  path: "/regular-runs",
  areaServed: RUNS_AREA,
  metaTitle: "Auckland to Hamilton & Tauranga Movers | Regular Runs | Specialist Movers",
  metaDescription:
    "Auckland to Hamilton every day, Auckland to Tauranga and the Bay of Plenty every week. Part loads, single items, pianos and full moves on a truck that is already going. Free quote.",
  eyebrow: "Hamilton every day · Tauranga every week",
  h1: "Regular runs",
  lead:
    "We drive Auckland to Hamilton every day and Auckland to Tauranga and the Bay of Plenty every week. If you have a couch, a piano or a whole house going either way, there is probably a truck heading there already.",
  subline: "Free quote. We usually call back within 15 minutes. 7 days a week.",
  defaultJobType: "Home Move",
  heroPhoto: sitePhotos.truckLoad,
  heroPhotoAlt: "Wrapped furniture loaded and strapped inside a Specialist Movers truck",
  aboutSidePhoto: sitePhotos.houseMove,
  aboutSidePhotoAlt: "Specialist Movers crew carrying wrapped furniture to the truck",
  heroOverlayCaption: "Going that way anyway.",
  aboutTitle: "A truck that is already going",
  aboutBody:
    "We have bases in Auckland and Hamilton, so the road between them is part of an ordinary day for us, not a long-distance special. Tauranga and the Bay of Plenty get a run every week. That means you do not need a full house to make the trip worth it: a single piece of furniture, a piano, a few boxes or a part load can ride along with work that is already booked. Bigger moves get their own truck on the day that suits you.",
  trustHighlights: [
    {
      title: "Hamilton every day",
      text: "Auckland to Hamilton and back, seven days a week, with depots at both ends.",
    },
    {
      title: "Tauranga every week",
      text: "A weekly run to Tauranga and the Bay of Plenty. We confirm the day when you book.",
    },
    {
      title: "One item is a job",
      text: "A couch, a fridge, a piano, a TradeMe find. You do not need a whole house to book us.",
    },
  ],
  whyTitle: "What it costs",
  whyBody:
    "A part load or single item on a scheduled run costs less than a truck of your own, because you are sharing the trip. A full house move is priced like any other move, by the hours and crew it needs. Either way you get a fixed price in writing before you book, and it does not move afterwards.",
  includedBullets: [
    "Auckland to Hamilton and the Waikato, every day",
    "Auckland to Tauranga, Mount Maunganui and the Bay of Plenty, every week",
    "Single items and part loads riding a scheduled run",
    "Full house moves in either direction, on the day that suits you",
    "Pianos and heavy items, moved by our piano crew",
    "Furniture wrapped in blankets, shrink wrap or mattress covers as the item needs",
    "Store and trade deliveries between the cities",
  ],
  relatedLinks: [
    { label: "Furniture movers Auckland", href: "/furniture-movers-auckland" },
    { label: "Furniture movers Hamilton", href: "/furniture-movers-hamilton" },
    { label: "Piano movers", href: "/piano-movers" },
    { label: "Moving house Hamilton", href: "/services/house-moving-hamilton" },
  ],
  faqHeading: "Regular run questions",
  faqs: [
    {
      q: "How often do you go between Auckland and Hamilton?",
      a: "Every day. We have bases at both ends, so a single item or a part load can usually go on a truck that is already making the trip.",
    },
    {
      q: "How often do you go to Tauranga and the Bay of Plenty?",
      a: "Once a week. Tell us what is going and where, and we will confirm the run day when you book.",
    },
    {
      q: "Can you take just one item?",
      a: "Yes. Single items and part loads are exactly what the regular runs are for. Send photos with your quote request if the item is big or awkward.",
    },
    {
      q: "Is it cheaper than booking a whole truck?",
      a: "For a part load or a single item, yes, because you are sharing a trip that is already happening. A full house still gets its own truck and is priced like any other move.",
    },
    {
      q: "Can you move a piano to Hamilton or Tauranga?",
      a: "Yes. Our piano crew moves uprights and grands for North Island music retailers, and pianos travel on these runs regularly.",
    },
    {
      q: "Do you pick up from stores or TradeMe sellers?",
      a: "Yes. Give us the pickup address and a contact for the seller, and we will collect it and bring it to you on the next run.",
    },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Regular runs" },
  ],
  serviceLabel: "Furniture Move",
};
