import type { ProcessStep } from "@/components/ProcessStepsGrid";
import {
  houseMovingProcess,
  pianoMovingProcess,
  workplaceMovingProcess,
} from "@/lib/moving-process";
import {
  generalServiceFaqs,
  grandPianoFaqs,
  packingServiceFaqs,
  cleaningServiceFaqs,
  uprightPianoFaqs,
  officeServiceFaqs,
  commercialServiceFaqs,
  type FaqItem,
} from "@/lib/service-faqs";

export type ServiceSeoExtension = {
  bodyParagraphs: readonly string[];
  /** Heading above bodyParagraphs on landing-layout pages. Written per service
   *  rather than derived from the H1, which produced "How office movers
   *  auckland actually works". */
  bodyTitle?: string;
  faqs: readonly FaqItem[];
  processTitle: string;
  processSteps: readonly ProcessStep[];
  piano?: boolean;
};

const pianoProtectionBody =
  "Every piano is wrapped in padded blankets and shrink wrap before it leaves your home. Uprights are secured upright inside the truck with specialist straps. Grands are tilted onto a piano board, padded, and strapped for transport. Humidity and finish are protected with proper wrap, not just a furniture blanket.";

const pianoProcessSteps = pianoMovingProcess.steps;
const defaultProcess = houseMovingProcess.steps;

export const serviceSeoExtensions: Partial<Record<string, ServiceSeoExtension>> = {
  /**
   * Office and commercial were the only two services on the site with no
   * bodyParagraphs at all, which left them the thinnest pages we run: roughly
   * 165 words of unique prose each against 342 for house moving.
   *
   * They are also the biggest search opportunity we have. Non-brand GSC, 90
   * days to 2026-08-02: office and commercial queries pull 18,021 impressions
   * at average position 23.5, ahead of residential's 15,211, with 57 queries
   * already inside position 20. Unlike residential, where a three-slot map
   * pack takes the click before anyone reaches an organic result, B2B buyers
   * read and compare, so depth on the page is the thing that moves it.
   *
   * Three high-volume terms appeared nowhere on either page before this:
   * "removalists" (1,764 impressions, position 15.7), "office furniture"
   * (~884 across three variants) and "corporate relocation" (173). They are
   * worked in below as the words a buyer would actually use, not as keywords.
   */
  "office-moving": {
    bodyTitle: "What an office move actually involves",
    bodyParagraphs: [
      "Weekend and after-hours office moves are available, and for most offices that is the cheaper way to do it. The crew costs more outside business hours. The hours your team cannot work usually cost more again.",
      "Desks, monitors, filing and meeting-room furniture are wrapped and secured. Tell us about servers or specialist gear when you ask for a quote so we can plan padding and carry paths before the day rather than on it.",
      "Small offices up to about ten staff are usually quoted from around $800 plus GST. Medium and large floors get a site visit first, because access and volume set the price more than the furniture count does. A single floor often completes in a day; larger or multi-site work may run to two.",
      "Lift bookings, loading zones and body corporate rules are confirmed before move day. We supply insurance details to building managers routinely, though it takes a day to turn around, so ask early. We hold SiteWise Gold certification with a 90%+ health and safety score, which is what gets a crew onto managed and construction sites. Two to three weeks notice is ideal for multi-floor or CBD moves.",
    ],
    faqs: officeServiceFaqs,
    processTitle: workplaceMovingProcess.title,
    processSteps: [
      {
        title: "Walkthrough of both sites",
        body: "We look at the space you are leaving and the one you are going to. Lift sizes, dock access, door widths, and what actually needs to move rather than what should have been thrown out.",
      },
      {
        title: "Written plan and quote",
        body: "Crew size, truck count, timing, and the after-hours or weekend window if you need one. Fixed in writing before you commit.",
      },
      {
        title: "Access booked in advance",
        body: "Lifts, loading zones, dock times, security sign-in and building manager requirements confirmed ahead of the day, along with the certificate of insurance if the building wants one.",
      },
      {
        title: "Move and set down",
        body: "Desks broken down with the hardware bagged and labelled, IT wrapped, and everything set down where your floor plan says it goes rather than stacked in a corridor.",
      },
      {
        title: "Set back up",
        body: "Desks rebuilt and boxes in the right rooms, then a walk through the floor with you before we leave."
      },
    ],
  },
  "commercial-moving": {
    bodyTitle: "How commercial work is different",
    bodyParagraphs: [
      "Commercial work runs to a window. A shop fit out has a date the doors open, and an install slot in a managed building might be a few hours on a weekday morning. We confirm arrival time, access and handover points in writing before the day.",
      "SiteWise Gold with a 90%+ health and safety score matters on retail, construction and managed sites, where prequalification decides whether a crew gets through the gate at all.",
      "Kitchen installs, shop fit outs, staging, printer and vending machine deliveries, and tenant relocations. Beyond that we regularly take the awkward end of the work: spa pools, pool tables, safes, marble tops, kilns and machinery, with balcony hoists and crane lifts when the stairwell is not an option.",
      "Blankets, wrap and custom dollies are standard, and fragile joinery and glass are padded and strapped inside the truck before we leave site. Crew labour, truck, standard protection and local travel are included in the price, with extra crew, stairs or specialist gear confirmed in writing upfront.",
      "Auckland from Wairau Valley and the Waikato from our Hamilton base. One to two weeks notice suits fit outs and multi-item runs, and there is often next-day capacity for urgent printer or equipment deliveries.",
    ],
    faqs: commercialServiceFaqs,
    processTitle: workplaceMovingProcess.title,
    processSteps: [
      {
        title: "Tell us the window",
        body: "Access times, install date, trading hours, and any site inductions. This is what the plan is built around.",
      },
      {
        title: "Site scope",
        body: "We look at both ends: floor loadings, lift and stair access, dock height, and what gear the job actually needs.",
      },
      {
        title: "Prequalification sorted",
        body: "SiteWise documentation, insurance certificates, and site inductions handled before the day so nobody is turned away at the gate.",
      },
      {
        title: "Delivered to the window",
        body: "Crew and gear sized to hit the slot. Fixtures protected, positioned where the fit out team needs them.",
      },
      {
        title: "Sign off",
        body: "Walk the job with you, confirm nothing is outstanding, and book the next run if it is recurring work.",
      },
    ],
  },
  "packing-services": {
    bodyParagraphs: [
      "Our packing crew arrives the day before your move with cartons, paper, and wrap. Kitchens, fragile items, and wardrobes are packed room by room so load day is faster and safer.",
      "We label boxes by room and priority so unload at your new address is straightforward. Partial packs are available when you only need help with breakables or a few rooms.",
    ],
    faqs: packingServiceFaqs,
    processTitle: "Packing process",
    processSteps: [
      { title: "Quote by bedroom count", body: "Fixed packing price based on home size. Add packing when you request your moving quote." },
      { title: "Pack day", body: "Crew packs the day before move day with materials supplied." },
      { title: "Move day", body: "Pre-packed cartons load faster, your move crew handles furniture and transport." },
      { title: "Unpack on request", body: "Unpacking and box removal can be added when you book." },
    ],
  },
  "hard-to-shift": {
    bodyParagraphs: [
      "Spa pools, large safes, gym equipment, and oversized furniture need planning, we scope access, weight, and equipment before we quote.",
      "Padded blankets, custom dollies, and extra crew are arranged when needed. We have moved spa pools, bathtubs, and commercial fit-outs across Auckland and the Waikato.",
    ],
    faqs: generalServiceFaqs,
    processTitle: "Specialist item process",
    processSteps: defaultProcess,
  },
  "cleaning-services": {
    bodyParagraphs: [
      "Exit cleans are fixed-price by bedrooms and bathrooms on our booking form, no hourly surprises. Kitchen, bathrooms, floors, and living areas are cleaned to tenancy inspection standard.",
      "Settlement-day and post-construction cleans are available across Auckland, Hamilton, and Waikato towns. Add extra living rooms on the form when you need them.",
    ],
    faqs: cleaningServiceFaqs,
    processTitle: "Exit clean process",
    processSteps: [
      { title: "Fixed quote online", body: "Select bedrooms, bathrooms, and clean type for an instant fixed price." },
      { title: "Schedule around move-out", body: "We book your clean to align with handover or settlement." },
      { title: "Inspection-ready finish", body: "Kitchen, bathrooms, and living areas cleaned to standard." },
      { title: "Invoice matches quote", body: "Fixed price on the form is what you pay, no hidden add-ons." },
    ],
  },
  "international-moving": {
    bodyParagraphs: [
      "International and inter-island moves are planned in stages: inventory or viewing, written quote, confirmed dates, then pack, export wrap, and coordinated delivery.",
      "We work with trusted partners for overseas freight; North and South Island relocations are run with our own crews and clear timelines.",
      "Sole-use containers, shared sea freight, and air freight are explained for your load size. Storage in transit is available when collection and delivery dates do not align.",
    ],
    faqs: generalServiceFaqs,
    processTitle: "International move process",
    processSteps: defaultProcess,
    piano: false,
  },
  "loading-unloading": {
    bodyParagraphs: [
      "Hire our crew and truck for load-only, unload-only, or both, ideal when you are moving yourself but need experienced movers for the heavy work.",
      "We bring blankets, straps, and the right crew size for stairs and bulky items. Priced by the hour with a clear minimum call-out.",
      "Popular for container deliveries, storage unit loads, and DIY moves where you drive the truck but want professional help at each end.",
    ],
    faqs: generalServiceFaqs,
    processTitle: "Load and unload process",
    processSteps: [
      { title: "Scope the job", body: "Tell us addresses, stairs, and what needs moving." },
      { title: "Crew and truck", body: "We confirm crew size, hourly rate, and arrival window." },
      { title: "Load or unload", body: "Careful handling with blankets and straps as standard." },
      { title: "Sign-off", body: "Walk through with the team leader before we leave." },
    ],
  },
  "winz-quotes": {
    bodyParagraphs: [
      "WINZ and housing assistance applications need a clear written quote fast. We provide itemised pricing and respond promptly so you have paperwork ready.",
      "Home relocation, packing, and cleaning quotes are available, tell us your deadline when you call.",
      "We visit when needed so volume, access, and distance are accurate on your application, not guessed over the phone.",
    ],
    faqs: [
      {
        q: "How fast can you provide a WINZ quote?",
        a: "We aim to return written quotes within one business day. Call (021) 228 2728 if your application deadline is sooner.",
      },
      ...generalServiceFaqs.slice(1, 6),
    ],
    processTitle: "Quote process",
    processSteps: [
      { title: "Tell us your deadline", body: "Share WINZ paperwork requirements and dates needed." },
      { title: "Viewing or phone scope", body: "We confirm volume and access for an accurate written price." },
      { title: "Written quote", body: "Itemised quote suitable for your application." },
      { title: "Book when approved", body: "Lock your move date once assistance is confirmed." },
    ],
  },
  "grand-piano": {
    bodyParagraphs: [
      pianoProtectionBody,
      "Grand piano moves include leg removal where required, piano board tilt, padded wrap, and placement at your new address.",
    ],
    faqs: grandPianoFaqs,
    processTitle: pianoMovingProcess.title,
    processSteps: pianoProcessSteps,
    piano: true,
  },
  "upright-piano": {
    bodyParagraphs: [
      pianoProtectionBody,
      "Upright pianos are wrapped, strapped, and moved on specialist dollies through tight hallways and doorways.",
    ],
    faqs: uprightPianoFaqs,
    processTitle: pianoMovingProcess.title,
    processSteps: pianoProcessSteps,
    piano: true,
  },
  "international-piano": {
    bodyParagraphs: [
      pianoProtectionBody,
      "International piano shipping includes export wrap, crating when required, and coordination with our freight partners.",
    ],
    faqs: grandPianoFaqs,
    processTitle: pianoMovingProcess.title,
    processSteps: pianoProcessSteps,
    piano: true,
  },
  "piano-storage": {
    bodyParagraphs: [
      pianoProtectionBody,
      "Climate-aware piano storage is available short or long term while sale, renovation, or international timing is sorted.",
    ],
    faqs: uprightPianoFaqs,
    processTitle: pianoMovingProcess.title,
    processSteps: pianoProcessSteps,
    piano: true,
  },
};

export function getServiceSeoExtension(slug: string): ServiceSeoExtension | undefined {
  return serviceSeoExtensions[slug];
}
