import { aucklandServiceHref } from "@/lib/legacy-auckland-urls";
import {
  furnitureMoversAucklandPage,
  furnitureMoversHamiltonPage,
} from "@/lib/furniture-pages";
import { houseMovingProcess } from "@/lib/moving-process";
import { AUCKLAND_ONLY, WAIKATO_ONLY, type ServiceArea } from "@/lib/service-areas";
import { sitePhotos } from "@/lib/site-photos";
import type { JobType } from "@/lib/site-data";

export type NicheFaq = { q: string; a: string };

/**
 * Item → handling → typical time. A real table of first-party operational
 * facts is one of the most extractable things a service page can carry, and
 * nothing on the site had one.
 */
export type NicheItemTable = {
  title: string;
  intro?: string;
  rows: readonly { item: string; method: string; time: string }[];
  footnote?: string;
};

export type NicheServicePageConfig = {
  path: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  lead: string;
  subline: string;
  defaultJobType: JobType;
  heroPhoto: string;
  heroPhotoAlt: string;
  /** About section image , must differ from heroPhoto on the same page */
  aboutSidePhoto?: string;
  aboutSidePhotoAlt?: string;
  heroOverlayCaption?: string;
  aboutTitle: string;
  aboutBody: string;
  trustHighlights: readonly { title: string; text: string }[];
  whyTitle: string;
  whyBody: string;
  includedBullets: readonly string[];
  relatedLinks: readonly { label: string; href: string }[];
  faqHeading: string;
  faqs: readonly NicheFaq[];
  itemTable?: NicheItemTable;
  processTitle?: string;
  breadcrumbs: readonly { label: string; href?: string }[];
  /** HubSpot / form service label */
  serviceLabel: string;
  /**
   * Service schema areaServed. Omit and ServiceJsonLd falls back to its
   * default of Auckland + Hamilton + Waikato, which is right for a page that
   * genuinely serves all three and wrong for a geo-split pair: two pages whose
   * visible copy is deliberately Auckland-only and Waikato-only should not
   * emit identically-scoped Service entities.
   */
  areaServed?: ServiceArea[];
};

export const apartmentMoversPage: NicheServicePageConfig = {
  path: "/apartment-movers-auckland",
  metaTitle: "Apartment Movers Auckland | Specialist Movers",
  metaDescription:
    "Apartment movers Auckland. Lifts, loading zones, and access codes planned before move day. Free quote.",
  eyebrow: "Auckland apartment moving specialists",
  h1: "Apartment movers Auckland",
  lead:
    "Moving apartments means narrow stairways, lifts, building rules, and furniture that has to fit. Our crews plan access before move day so your relocation stays smooth, not stressful.",
  subline: "Free quote. We usually call back within 15 minutes. 7 days a week.",
  defaultJobType: "Home Move",
  heroPhoto: sitePhotos.homeHero,
  heroPhotoAlt: "Specialist Movers crew moving furniture in an Auckland apartment",
  aboutSidePhoto: sitePhotos.houseMove,
  aboutSidePhotoAlt: "Crew moving wrapped furniture in an Auckland apartment",
  heroOverlayCaption: "You settle in. We handle the stairs.",
  aboutTitle: "Apartment relocation done properly",
  aboutBody:
    "We are not a one-size-fits-all relocation crew. Specialist Movers knows Auckland apartments: walk-ups, secure buildings, shared lifts, and body corporate rules. We pack, load, and deliver with the same care we use on family homes, adapted to your building.",
  trustHighlights: [
    {
      title: "Lift and stair plans",
      text: "We confirm lift bookings, parking, and carry paths before your move date.",
    },
    {
      title: "Careful crews",
      text: "Fragile items, bulky furniture, and tight turns handled by trained movers.",
    },
    {
      title: "Clear pricing",
      text: "No hidden fees. Free quote so you know the cost up front.",
    },
  ],
  whyTitle: "Why Auckland residents choose us",
  whyBody:
    "Timely service, friendly trained movers, and hundreds of 5-star reviews. From studio flats to multi-level apartments, we make move day feel like a step forward, not chaos.",
  includedBullets: [
    "Apartment-to-apartment and house-to-apartment moves",
    "Packing and unpacking available (packers come in the day before)",
    "Careful handling of fragile and bulky items",
    "Local and longer-distance moves when you need them",
    "Optional exit cleaning aligned with your move-out",
  ],
  relatedLinks: [
    { label: "Moving house", href: aucklandServiceHref("house-moving") },
    { label: "Packing services", href: aucklandServiceHref("packing-services") },
    { label: "Exit cleaning", href: aucklandServiceHref("cleaning-services") },
    { label: "Loading and unloading", href: aucklandServiceHref("loading-unloading") },
  ],
  faqHeading: "Apartment moving questions",
  faqs: [
    {
      q: "Do you handle lift bookings and building access?",
      a: "Yes. Tell us your building rules when you request a quote. We plan lift time, parking, and carry routes before move day.",
    },
    {
      q: "Can you move a small flat as well as a large apartment?",
      a: "Yes. We tailor crew size and truck to your home, from studio flats to multi-bedroom apartments.",
    },
    {
      q: "Do you offer packing for apartment moves?",
      a: "Yes. Our packers come in the day before your move when you book a full pack. We can also unpack at your new place.",
    },
    {
      q: "How do I get a price for my apartment move?",
      a: "Fill in the quote form or call us. We will call back within 15 minutes with a clear quote for your addresses and access.",
    },
    {
      q: "How far in advance should I book an apartment move?",
      a: "Two weeks ahead is ideal for weekends and month-end. Call (021) 228 2728, we often have sooner slots when lift access allows.",
    },
    {
      q: "How do you protect furniture in tight apartment access?",
      a: "Blankets, wrap, and careful carry paths are planned before move day. We measure tight turns and stairwells when we quote.",
    },
  ],
  processTitle: houseMovingProcess.title,
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Apartment movers Auckland" },
  ],
  serviceLabel: "Apartment Move",
};

export const retirementHomeMoversPage: NicheServicePageConfig = {
  path: "/retirement-home-movers-auckland",
  metaTitle: "Retirement Home Movers Auckland | Specialist Movers",
  metaDescription:
    "Retirement village and rest-home movers in Auckland. Patient crews, full pack-and-move options. Free quote.",
  eyebrow: "Auckland retirement village and rest-home moves",
  h1: "Retirement home movers Auckland",
  lead:
    "Moving to a retirement home or village is a big life change. Our team plans every step with patience and care, including full pack-and-move options and in-home visits so we understand what matters to you.",
  subline: "Personalised quotes. Callback within 15 minutes.",
  defaultJobType: "Home Move",
  heroPhoto: sitePhotos.homeHero,
  heroPhotoAlt: "Specialist Movers team carefully handling furniture for a senior client move",
  aboutSidePhoto: sitePhotos.packing,
  aboutSidePhotoAlt: "Specialist Movers team carefully packing items for a senior client move",
  heroOverlayCaption: "We listen first. Then we move.",
  aboutTitle: "Moves tailored for seniors and families",
  aboutBody:
    "We work with clients, families, and facility coordinators across Auckland. Our relocation consultants reduce stress with clear timelines, careful packing, and respectful crews. We are happy to visit in person so your quote matches the real job.",
  trustHighlights: [
    {
      title: "Specialist approach",
      text: "Experienced in retirement home and village relocations across Auckland.",
    },
    {
      title: "Full service",
      text: "Packing, transport, unpacking, and placement in your new room or unit.",
    },
    {
      title: "Peace of mind",
      text: "Cherished belongings handled with care from start to finish.",
    },
  ],
  whyTitle: "Why Auckland families trust Specialist Movers",
  whyBody:
    "One point of contact from the first phone call to the last box. Auckland villages each run their own way: booked lift windows in the apartment-style complexes, gatehouse sign-in, contractor inductions, and a delivery bay you have to share. We confirm all of it with the village before move day so nobody is standing in a corridor waiting on a key.",
  includedBullets: [
    "Retirement village, rest-home, and downsizing moves across Auckland",
    "Full pack and move service, with packers in the day before",
    "Furniture placement in the new unit, beds made up and reassembled",
    "Short-term storage for whatever will not fit the new floor plan",
    "In-home assessment so the quote matches the real job",
  ],
  areaServed: AUCKLAND_ONLY,
  relatedLinks: [
    { label: "Moving house", href: aucklandServiceHref("house-moving") },
    { label: "Packing services", href: aucklandServiceHref("packing-services") },
    { label: "Apartment movers", href: "/apartment-movers-auckland" },
    // Both pages' FAQ copy discusses the other region's leg of the move, so
    // the reciprocal link is earned rather than decorative.
    { label: "Retirement home movers Hamilton", href: "/retirement-home-movers-hamilton" },
  ],
  faqHeading: "Retirement home moving questions",
  faqs: [
    {
      q: "Can you pack everything for us?",
      a: "Yes. Our full pack and move service covers packing, transport, and unpacking so your family has less to coordinate.",
    },
    {
      q: "Will someone visit our home before quoting?",
      a: "We are happy to visit in person, especially for larger homes or complex access. That helps us give an accurate fixed price.",
    },
    {
      q: "How do you protect fragile and sentimental items?",
      a: "We use proper materials and careful handling. Tell us about special items when you book so we plan extra protection.",
    },
    {
      q: "How do we get started?",
      a: "Call us or use the quote form. We will discuss your move date, facility access, and services you need, then confirm pricing.",
    },
    {
      q: "How far in advance should we book?",
      a: "Two to three weeks ahead helps secure your preferred date, especially around month-end. We can often help sooner for smaller loads.",
    },
    {
      q: "What areas of Auckland do you cover?",
      a: "Every village and rest home in the Auckland region, run out of our North Shore depot. The callout fee rises with distance, so a Takapuna move and a Pukekohe one are not priced the same. If the move is out to the Waikato, our Hamilton branch covers that end from its own depot.",
    },
    {
      q: "What happens to the furniture that will not fit the new unit?",
      a: "Worth deciding before move day rather than on the driveway. We can drop items to family on the same run, or put them into short-term storage while everyone decides. Tell us at the quote stage so the truck and the route allow for it.",
    },
  ],
  processTitle: houseMovingProcess.title,
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Retirement home movers Auckland" },
  ],
  serviceLabel: "Retirement Home Move",
};

/**
 * Hamilton retirement moving.
 *
 * This page used to spread the Auckland config and override six fields, which
 * left both URLs shipping the same FAQs, the same bullets, the same why-copy
 * and the same related links , and those links pointed at Auckland service
 * pages from a Hamilton page. Two near-identical pages compete with each other
 * rather than adding reach, and the FaqPageJsonLd block was byte-identical on
 * both.
 *
 * Everything a reader actually reads is now written for the Waikato. It still
 * spreads the Auckland config for the structural fields (job type, process,
 * form label) so a new field cannot be silently forgotten here , but if you
 * add prose to the Auckland page, write the Hamilton version too rather than
 * letting it inherit.
 *
 * Town names below are the real Zone B and Zone C lists from
 * hamilton-pricing-data.ts, not an invented service area.
 */
export const retirementHomeMoversHamiltonPage: NicheServicePageConfig = {
  ...retirementHomeMoversPage,
  path: "/retirement-home-movers-hamilton",
  metaTitle: "Retirement Home Movers Hamilton | Specialist Movers",
  metaDescription:
    "Retirement village and rest-home movers in Hamilton and the Waikato. Full pack and move, in-home visits. Free quote.",
  eyebrow: "Hamilton and Waikato retirement village and rest-home moves",
  h1: "Retirement home movers Hamilton",
  lead:
    "Moving into a village or rest home in Hamilton or the wider Waikato is a big change, and it is rarely just a move. Our Hamilton crews work to the village's timetable, not ours, so the day stays calm for everyone involved.",
  subline: "Waikato crews. In-home visits. Callback within 15 minutes.",
  heroPhoto: sitePhotos.houseMove,
  heroPhotoAlt:
    "Specialist Movers crew carrying wrapped furniture on a Hamilton retirement village move",
  aboutSidePhoto: sitePhotos.packing,
  aboutSidePhotoAlt:
    "Specialist Movers packer wrapping china and glassware for a Waikato downsizing move",
  heroOverlayCaption: "Their timetable. Our problem.",
  aboutTitle: "A Waikato crew, not a truck sent down from Auckland",
  aboutBody:
    "We are based in Hamilton, so a village move here is a local job rather than a two-hour drive before the first box is lifted. Our crews work across Hamilton and out through Cambridge, Te Awamutu, Morrinsville, Ngaruawahia, Huntly, and Raglan, with Matamata, Otorohanga, Te Kuiti, and Putaruru on the wider zone. We deal with clients, adult children, and village coordinators, often all three on the same move, and we keep one person across the whole thing so nobody has to repeat the story.",
  trustHighlights: [
    {
      title: "Waikato based",
      text: "Hamilton depot with crews who know the local villages and rest homes.",
    },
    {
      title: "Built around the village",
      text: "Move-in windows, gate access, and contractor sign-in confirmed before the day.",
    },
    {
      title: "Downsizing, handled",
      text: "What fits goes in. The rest goes to family or into storage, decided beforehand.",
    },
  ],
  whyTitle: "Moving a parent into a Waikato village",
  whyBody:
    "Most of these moves are not from across town. They are a parent coming down from Auckland to be near family in Cambridge, or leaving a lifestyle block outside Morrinsville for a unit in Hamilton. We run both an Auckland and a Hamilton branch, so a move between the two is one company and one quote rather than a handover between strangers. Families organising it from another city are the norm here, not the exception.",
  includedBullets: [
    "Village, rest-home, and downsizing moves across Hamilton and the Waikato",
    "Auckland to Waikato moves handled end to end by our own crews",
    "Full pack and move, including the kitchen and the china cabinet",
    "Unpacking and furniture placement so the first night is liveable",
    "Storage in Hamilton for anything that will not fit the new unit",
  ],
  areaServed: WAIKATO_ONLY,
  relatedLinks: [
    { label: "Moving house Hamilton", href: "/services/house-moving-hamilton" },
    { label: "Packing services Hamilton", href: "/services/packing-services-hamilton" },
    { label: "Storage Hamilton", href: "/services/storage-hamilton" },
    { label: "Retirement home movers Auckland", href: "/retirement-home-movers-auckland" },
  ],
  faqHeading: "Waikato retirement moving questions",
  faqs: [
    {
      q: "Which Waikato towns do you cover for village and rest-home moves?",
      a: "Hamilton is our base. Cambridge, Te Awamutu, Huntly, Morrinsville, Ngaruawahia, and Raglan are standard callout areas, and Matamata, Otorohanga, Te Kuiti, and Putaruru sit on the wider zone. The callout fee changes with distance and we tell you which zone you are in when we quote.",
    },
    {
      q: "Can you move someone from Auckland into a Waikato village?",
      a: "Yes, and it is one of the most common moves we do. We run branches in both Auckland and Hamilton, so it is handled by our own crews on both ends rather than passed to a partner. One quote, one point of contact, and no second company to chase.",
    },
    {
      q: "Our village gave us a move-in window. Can you work to it?",
      a: "That is the normal way these moves run. Villages usually set a date and a time slot, and often a contractor sign-in and a single loading bay shared with everyone else moving that week. Send us what the village has given you and we build the day around it.",
    },
    {
      q: "The unit is much smaller than the house. What happens to the rest?",
      a: "Decide it before move day rather than on the driveway. We can drop items to family in the Waikato on the same run, and we have storage in Hamilton for the things nobody is ready to part with yet. Tell us at the quote stage so the truck and the route allow for it.",
    },
    {
      q: "We live overseas or in another city. Can we organise it remotely?",
      a: "Yes. A lot of Waikato village moves are arranged by adult children who are not in the country. We can do the in-home assessment with your parent present, send the quote to you, and keep you both updated. One person stays across the move from start to finish.",
    },
    {
      q: "How far ahead should we book a village move?",
      a: "Two to three weeks secures your preferred date, and month-end fills first. Village move-in dates are often set well ahead, so book as soon as you have the date. Smaller loads we can often help with sooner.",
    },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Retirement home movers Hamilton" },
  ],
};

export const movingToAustraliaPage: NicheServicePageConfig = {
  path: "/international-moving/moving-to-australia",
  metaTitle: "Moving to Australia from NZ | Specialist Movers",
  metaDescription:
    "International movers NZ to Australia. Sea and air freight, customs support, door to door. Free quote.",
  eyebrow: "New Zealand to Australia international moving",
  h1: "Moving to Australia from New Zealand",
  lead:
    "Relocating across the Tasman should feel organised, not overwhelming. Specialist Movers coordinates sea and air freight, customs paperwork, and delivery through trusted partners in Australia.",
  subline: "Free international moving quote. Expert advice on shipping options.",
  defaultJobType: "Home Move",
  heroPhoto: sitePhotos.homeHero,
  heroPhotoAlt: "Specialist Movers international relocation consultation",
  heroOverlayCaption: "Moving to Australia? We handle it.",
  aboutSidePhoto: sitePhotos.commercialHero,
  aboutSidePhotoAlt: "Specialist Movers truck ready for an international relocation load",
  aboutTitle: "International shipping and moving experts",
  aboutBody:
    "We handle household goods, personal effects, and specialist items including vehicles when required. Choose shared container sea freight for value or sole-use containers and air freight when timing matters. Customs, quarantine, and bio-security steps are managed with clear updates along the way.",
  trustHighlights: [
    {
      title: "Sea and air options",
      text: "Shared containers, sole-use shipping, and air freight to suit your timeline and budget.",
    },
    {
      title: "Door to door",
      text: "Packing in New Zealand through to delivery at your Australian address.",
    },
    {
      title: "Experienced team",
      text: "Guidance on customs, insurance, and what you can ship before you commit.",
    },
  ],
  whyTitle: "Popular Australian destinations we serve",
  whyBody:
    "Sydney, Melbourne, Brisbane, Gold Coast, Sunshine Coast, and more. Tell us your destination city and move size and we will recommend the right shipping method and timeline.",
  includedBullets: [
    "Full household and partial-load moves to Australia",
    "Professional packing and unpacking",
    "Motor vehicle and bulky item coordination",
    "Moving insurance options",
    "Customs and quarantine guidance",
  ],
  relatedLinks: [
    { label: "International moving Auckland", href: aucklandServiceHref("international-moving") },
    { label: "Packing services", href: aucklandServiceHref("packing-services") },
    { label: "Piano moving", href: "/piano-movers" },
    { label: "Moving house Auckland", href: aucklandServiceHref("house-moving") },
  ],
  faqHeading: "Moving to Australia FAQ",
  faqs: [
    {
      q: "How long does a move from New Zealand to Australia take?",
      a: "Most sea freight moves take about 2 to 4 weeks depending on port, volume, and customs. Air freight is faster but costs more.",
    },
    {
      q: "How are international moving costs calculated?",
      a: "Volume in cubic metres, destination, and shipping method (shared sea, sole container, or air) drive the price. We provide a free quote after we understand your goods list.",
    },
    {
      q: "What shipping options are available?",
      a: "Sea freight in shared or sole-use containers, and air freight for urgent shipments. We explain pros and cons for your load size.",
    },
    {
      q: "What should I do to prepare?",
      a: "Declutter early, gather passports and visa documents, and list items that need special approval. We help with packing lists and customs forms.",
    },
    {
      q: "How far in advance should I book an Australia move?",
      a: "Eight to twelve weeks before your target departure is ideal for sea freight. Air freight can be booked on shorter notice when volume is smaller.",
    },
    {
      q: "Can you store goods before they ship to Australia?",
      a: "Yes. short-term storage bridges settlement gaps while freight is booked and customs paperwork is finalised.",
    },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "International moving", href: aucklandServiceHref("international-moving") },
    { label: "Moving to Australia" },
  ],
  serviceLabel: "International Move to Australia",
};

export const nicheServicePages = [
  apartmentMoversPage,
  retirementHomeMoversPage,
  retirementHomeMoversHamiltonPage,
  movingToAustraliaPage,
  furnitureMoversAucklandPage,
  furnitureMoversHamiltonPage,
] as const;
