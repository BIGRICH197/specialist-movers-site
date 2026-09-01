import type { NicheServicePageConfig } from "@/lib/niche-service-pages";
import { sitePhotos } from "@/lib/site-photos";

/**
 * Kitchen, cabinetry and joinery delivery. Richard asked for this on
 * 2026-09-01.
 *
 * NOT an organic SEO play, and it should not be judged as one. Across the 90
 * days to 2026-08-29 the whole kitchen/cabinetry/joinery query family drew a
 * single query, two impressions, at position 60. Nobody searches for a
 * "kitchen mover". This page exists for three other jobs:
 *
 *   1. A landing page for the trade kitchen ads campaign, live since
 *      2026-08-19 at $10/day, which has been running without a dedicated
 *      destination and pointing at consumer house-moving copy.
 *   2. Something to send a joinery firm when we pitch them, and the
 *      destination the A5 door-knock trade card should have had.
 *   3. Proof for a segment we already serve and never talk about.
 *
 * The proof is real and worth stating plainly. Xero, all time: 69 invoices
 * across 12 cabinetry and kitchen accounts, $43,868 ex GST. Several are deep
 * repeat customers, the largest on 14 jobs. Per the standing privacy rule no
 * client is named here, but "a dozen Auckland cabinetmakers" and "some of them
 * on their fourteenth job" are both literally true and checkable against
 * _kitchen_invoices.py.
 *
 * Rates are the trade card's, matching lib/trade-page.ts: $140/hr for two
 * movers plus a $60 callout, $180 plus $80 for three. Excl GST. After the
 * 2026-08-19 retail flattening these are the same as the public Auckland
 * rates, which is why the page does not claim a trade discount.
 */
export const joineryDeliveryPage: NicheServicePageConfig = {
  path: "/kitchen-and-joinery-delivery",
  metaTitle: "Kitchen Cabinetry & Joinery Delivery Auckland | Specialist Movers",
  metaDescription:
    "Workshop to site delivery for Auckland kitchen and joinery makers. Blanket wrapped, install windows met, SiteWise Gold for managed and construction sites.",
  eyebrow: "For Auckland Cabinetmakers and Joiners",
  h1: "Kitchen Cabinetry and Joinery Delivery",
  lead:
    "Workshop to site, across Auckland and the Waikato. Finished cabinetry travels blanket wrapped and strapped, arrives in the window your installers are booked for, and gets carried in rather than left on the driveway.",
  subline: "Trade rates. Recurring runs scheduled. Callback within 15 minutes.",
  defaultJobType: "Commercial Move",
  heroPhoto: sitePhotos.commercialHero,
  heroPhotoAlt:
    "Specialist Movers truck loaded with wrapped cabinetry for an Auckland joinery delivery",
  aboutSidePhoto: sitePhotos.commercialTeam,
  aboutSidePhotoAlt: "Specialist Movers crew in uniform beside the company truck",
  heroOverlayCaption: "You build it. We get it there intact.",
  aboutTitle: "We Already Do This Every Week",
  aboutBody:
    "A dozen Auckland cabinetmakers and kitchen companies use us on repeat, several of them dozens of jobs deep, and it is the quietest part of our business. Joinery is not furniture. It arrives finished, unpackaged, and usually irreplaceable in the sense that a scuff means a remake rather than a touch up, so it gets wrapped before it moves rather than after someone notices a mark.",
  trustHighlights: [
    {
      title: "Wrapped before it moves",
      text: "Blankets and strapping on finished faces and edges, in the workshop, not on site.",
    },
    {
      title: "SiteWise Gold",
      text: "90%+ score, so managed and construction sites let the crew through the gate.",
    },
    {
      title: "Booked to your window",
      text: "Installers are waiting or they are not. We plan the run around your slot.",
    },
  ],
  whyTitle: "What It Costs",
  whyBody:
    "Two movers and a truck are $140 an hour plus GST with a $60 callout. Three movers are $180 plus $80, and four are $240 plus $100 for a full defit or a big install day. Most single kitchen runs sit inside a couple of hours. For regular work or a larger one-off we will fix a price instead, so there is no clock ticking, and anything outside Auckland we come and look at first and then fix a price on that. If you have a weekly run rather than one delivery, tell us and we will schedule it, which means the same crew each week and no re-explaining how your workshop loading bay works.",
  includedBullets: [
    "Workshop to site delivery for kitchens, vanities, wardrobes and commercial joinery",
    "Benchtops, splashbacks and stone tops carried on edge and strapped upright",
    "Blanket wrap and strapping on finished surfaces, included rather than charged as an extra",
    "Carried to the room, not left at the door or on the drive",
    "Recurring weekly or fortnightly runs scheduled with the same crew",
    "SiteWise Gold prequalification for managed and construction sites",
    "Six trucks from 15 to 40 cubic metres, taillift on every one",
    "Public liability certificate on request for site access",
  ],
  relatedLinks: [
    { label: "Commercial moving Auckland", href: "/commercial-moving-auckland" },
    { label: "Hard to shift items", href: "/hard-to-shift-items" },
    { label: "Loading and unloading", href: "/loading-and-unloading" },
  ],
  faqHeading: "Kitchen Cabinetry Questions",
  faqs: [
    {
      q: "Do you handle stone and engineered benchtops?",
      a: "Yes. Tops travel on edge, strapped upright against a padded frame rather than laid flat, because flat is how they crack. Tell us the size and weight when you book so we bring the right crew.",
    },
    {
      q: "Can you deliver to a site that needs prequalification?",
      a: "Yes. We hold SiteWise Gold with a 90%+ health and safety score, and we can supply insurance details and site induction paperwork before the day. Ask early, because the paperwork takes about a day to turn around.",
    },
    {
      q: "What happens if the site is not ready when we arrive?",
      a: "It happens. Tell us as soon as you know and we will re-slot the run. If we are already loaded and the site is locked, the cabinetry comes back to our Wairau Valley depot and goes out again on the next available window.",
    },
    {
      q: "Do you carry it in, or is it a kerbside drop?",
      a: "Carried in and set down where the installers want it. Kerbside drops are how finished joinery gets damaged.",
    },
    {
      q: "Can you do regular runs rather than one-off deliveries?",
      a: "Yes, and it is most of the cabinetry work we do. Recurring runs are scheduled ahead so you get the same crew, who already know your workshop and your usual sites.",
    },
    {
      q: "Do you deliver outside Auckland?",
      a: "Yes, and we have a Hamilton base as well as the Wairau Valley one. For anything out of town we would rather look at the run first and then fix a price on it, so you are not paying for a driver sitting in traffic.",
    },
    {
      q: "What does it cost?",
      a: "Two movers and a truck are $140 an hour plus GST with a $60 callout, three movers $180 with an $80 callout, and four movers $240 with a $100 callout. Most single kitchen deliveries are inside a couple of hours. Regular runs and bigger jobs can be fixed-price instead. You get the number in writing before we load.",
    },
  ],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Kitchen Cabinetry and Joinery Delivery" },
  ],
  serviceLabel: "Commercial Move",
};
