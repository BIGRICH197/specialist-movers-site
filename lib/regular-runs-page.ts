import type { NicheServicePageConfig } from "@/lib/niche-service-pages";
import type { ServiceArea } from "@/lib/service-areas";
import { sitePhotos } from "@/lib/site-photos";

/**
 * /regular-runs: the scheduled Auckland to Hamilton (daily) and
 * Auckland to Tauranga & Bay of Plenty (weekly) runs. Linked from the homepage
 * hero strip (components/RegularRunsLine.tsx).
 *
 * Positioning (Richard, 2026-11-02): we are a service company, so this page
 * sells the SAME service on a set schedule, never a cheap shared trip. No
 * "going that way anyway", no "costs less because you share the truck", no
 * bargain framing. No part-load prices published yet.
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
    "Auckland to Hamilton every day, Auckland to Tauranga and the Bay of Plenty every week. Single items, pianos and full house moves, wrapped, carried in and placed by our own crew. Free quote.",
  eyebrow: "Hamilton every day · Tauranga every week",
  h1: "Regular runs",
  lead:
    "We run Auckland to Hamilton every day and Auckland to Tauranga and the Bay of Plenty every week. One treasured piece, a piano or a whole house, moved by our own crew with the same care we give a move across town.",
  subline: "Free quote. We usually call back within 15 minutes. 7 days a week.",
  // No defaultJobType: the form opens on the chooser (house, piano, commercial,
  // call back). Single items and part loads use the call-back (Richard, 2026-11-02).
  heroPhoto: sitePhotos.truckLoad,
  heroPhotoAlt: "Wrapped furniture loaded and strapped inside a Specialist Movers truck",
  aboutSidePhoto: sitePhotos.houseMove,
  aboutSidePhotoAlt: "Specialist Movers crew carrying wrapped furniture to the truck",
  heroOverlayCaption: "Same crew. Further down the road.",
  aboutTitle: "The same service, on a timetable",
  aboutBody:
    "Our Auckland and Hamilton bases mean the road between them is part of every working day, and Tauranga and the Bay of Plenty get a scheduled run each week. Whatever travels with us, a single heirloom, a piano or a whole house, gets the treatment it would get across town: two movers minimum, wrapped before it leaves, carried in and placed where you want it, never left at the kerb. A regular schedule simply means you know when we are coming.",
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
      title: "Placed, not dropped",
      text: "Carried in, unwrapped and put where you want it. Beds and tables go back together.",
    },
  ],
  whyTitle: "How we price it",
  whyBody:
    "Every job is quoted on what it actually needs: the items, the access at both ends, and the crew to do it properly. You get a fixed price in writing before you book, and it does not move afterwards. Booking onto a scheduled run gives you a set day and a crew that drives this road every week.",
  includedBullets: [
    "Auckland to Hamilton and the Waikato, every day",
    "Auckland to Tauranga, Mount Maunganui and the Bay of Plenty, every week",
    "Single items and part loads booked onto a scheduled run",
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
      a: "Every day. We have bases at both ends, so Hamilton is part of our normal week rather than a long-distance special.",
    },
    {
      q: "How often do you go to Tauranga and the Bay of Plenty?",
      a: "Once a week. Tell us what is going and where, and we will confirm the run day when you book.",
    },
    {
      q: "Can you take just one item?",
      a: "Yes, and it gets the same care as a full house. Leave your number in the quote form and we will call you back to talk it through, or call us on (021) 228 2728.",
    },
    {
      q: "Do you just drop it at the door?",
      a: "No. Two movers carry it in, unwrap it and put it where you want it. Beds and tables are put back together.",
    },
    {
      q: "Can you move a piano to Hamilton or Tauranga?",
      a: "Yes. Our piano crew moves uprights and grands for North Island music retailers, and pianos travel on these runs regularly.",
    },
    {
      q: "Can you collect from a store or a private seller?",
      a: "Yes. Give us the pickup address and a contact there, and we will collect it, wrap it and bring it to you on the scheduled run.",
    },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Regular runs" },
  ],
  serviceLabel: "Furniture Move",
};
