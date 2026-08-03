import type { ProcessStep } from "@/components/ProcessStepsGrid";
import type { HamiltonBaseSlug, HamiltonPageConfig } from "@/lib/hamilton-pages";
import { houseMovingProcess, workplaceMovingProcess } from "@/lib/moving-process";
import { pianoFaqs } from "@/lib/piano-faqs";
import type { FaqItem } from "@/lib/service-faqs";
import {
  cleaningServiceFaqs,
  generalServiceFaqs,
  packingServiceFaqs,
} from "@/lib/service-faqs";

const hamiltonCoverageFaq: FaqItem = {
  q: "What areas do you cover from Hamilton?",
  a: "Yes. daily coverage across Hamilton city, Cambridge, Morrinsville, Te Awamutu, Matamata, and wider Waikato towns. Auckland corridor moves are quoted with travel included upfront.",
};

const hamiltonBookingFaq: FaqItem = {
  q: "How far in advance should I book a Hamilton move?",
  a: "Two weeks ahead is ideal for weekends and month-end. Call (021) 228 2728, we often have sooner slots for local Waikato jobs.",
};

const hamiltonTravelFaq: FaqItem = {
  q: "Are travel costs included in my Hamilton quote?",
  a: "Yes. in-area Waikato jobs include travel from our Hamilton base in your written quote. Regional routes (Auckland, Bay of Plenty, etc.) show travel upfront before you book.",
};

const hamiltonQuoteFaq: FaqItem = {
  q: "How do I get a Hamilton quote?",
  a: "Fill in the form on this page or call (021) 228 2728. We call back within 15 minutes with a clear price for your addresses and access.",
};

const hamiltonHouseFaqs: readonly FaqItem[] = [
  {
    q: "How much does it cost to move house in Hamilton?",
    a: "Most local Hamilton home relocations start from around $300 excl. GST for smaller loads. Full home moves are fixed after a free viewing, volume, stairs, and travel drive the final price.",
  },
  hamiltonCoverageFaq,
  hamiltonBookingFaq,
  hamiltonTravelFaq,
  {
    q: "Do you offer packing and exit cleaning in Hamilton?",
    a: "Yes. professional packing the day before your move and fixed-price exit cleans can be added to the same Hamilton quote.",
  },
  hamiltonQuoteFaq,
];

const hamiltonOfficeFaqs: readonly FaqItem[] = [
  {
    q: "How much does an office move cost in Hamilton?",
    a: "Office moves are quoted after a site walkthrough. Price depends on desk count, IT equipment, access, and whether you need after-hours timing.",
  },
  hamiltonCoverageFaq,
  {
    q: "Can you move our office after hours?",
    a: "Yes. weekend and evening Hamilton office moves are available to reduce staff downtime.",
  },
  hamiltonBookingFaq,
  hamiltonTravelFaq,
  hamiltonQuoteFaq,
];

const hamiltonPianoFaqs: readonly FaqItem[] = [
  ...pianoFaqs.slice(0, 6),
];

const hamiltonPackingFaqs: readonly FaqItem[] = [
  packingServiceFaqs[0],
  packingServiceFaqs[1],
  hamiltonCoverageFaq,
  hamiltonBookingFaq,
  hamiltonTravelFaq,
  hamiltonQuoteFaq,
];

const hamiltonCleaningFaqs: readonly FaqItem[] = [
  cleaningServiceFaqs[0],
  cleaningServiceFaqs[1],
  hamiltonCoverageFaq,
  hamiltonBookingFaq,
  hamiltonTravelFaq,
  hamiltonQuoteFaq,
];

const defaultHamiltonFaqs: readonly FaqItem[] = [
  {
    q: "How much does this service cost in Hamilton?",
    a: "Pricing depends on scope, access, and travel. Most local jobs start from around $300 excl. GST, we confirm a written price before you book.",
  },
  hamiltonCoverageFaq,
  hamiltonBookingFaq,
  hamiltonTravelFaq,
  generalServiceFaqs[5],
  hamiltonQuoteFaq,
];

const hamiltonProcesses: Record<
  HamiltonBaseSlug,
  { title: string; steps: readonly ProcessStep[] }
> = {
  "house-moving": houseMovingProcess,
  "office-moving": workplaceMovingProcess,
  "commercial-moving": workplaceMovingProcess,
  "piano-movers": {
    title: "Piano moving process",
    steps: [
      {
        title: "Quote and confirm details",
        body: "Tell us upright or grand, both addresses, and stairs. We confirm crew size and price for Hamilton or inter-city routes.",
      },
      {
        title: "Prepare and protect",
        body: "Padded blankets, shrink wrap, and piano boards applied before the instrument leaves your home.",
      },
      {
        title: "Specialist transport",
        body: "Minimum three trained movers. Secure strapping inside the truck for the full journey.",
      },
      {
        title: "Placement and sign-off",
        body: "We position the piano where you need it and walk through with you before we leave.",
      },
    ],
  },
  "packing-services": {
    title: "Packing process",
    steps: [
      { title: "Scope and quote", body: "Fixed packing price by home size after we understand volume and access." },
      { title: "Pack day", body: "Crew packs the day before move day with materials supplied." },
      { title: "Move day", body: "Pre-packed cartons load efficiently with your move crew." },
      { title: "Unpack optional", body: "Unpacking at your new Waikato or Auckland address on request." },
    ],
  },
  "hard-to-shift": houseMovingProcess,
  "cleaning-services": {
    title: "Exit clean process",
    steps: [
      { title: "Fixed quote online", body: "Select bedrooms, bathrooms, and clean type for an instant price." },
      { title: "Schedule around move-out", body: "Book to align with handover or settlement." },
      { title: "Inspection-ready clean", body: "Kitchen, bathrooms, and living areas to standard." },
      { title: "Invoice matches quote", body: "Fixed price confirmed before we start." },
    ],
  },
  "international-moving": houseMovingProcess,
  "loading-unloading": houseMovingProcess,
  "winz-quotes": {
    title: "Quote process",
    steps: [
      { title: "Share your deadline", body: "Tell us WINZ paperwork requirements and dates." },
      { title: "Viewing or phone scope", body: "We confirm volume and access for an accurate written price." },
      { title: "Written quote", body: "Itemised quote suitable for your application." },
      { title: "Book when approved", body: "Lock your move date once assistance is confirmed." },
    ],
  },
  storage: {
    title: "Storage process",
    steps: [
      { title: "Scope and quote", body: "We confirm what is stored, duration, and delivery timing." },
      { title: "Careful intake", body: "Wrapped and inventoried on collection." },
      { title: "Secure holding", body: "Goods stored until your new date is ready." },
      { title: "Return delivery", body: "Same careful crew delivers when you are ready." },
    ],
  },
};

const hamiltonExtraParagraphs: Partial<Record<HamiltonBaseSlug, readonly string[]>> = {
  "piano-movers": [
    "Every Hamilton piano move uses padded blankets, shrink wrap, and securing straps. Grands are tilted onto piano boards; uprights are wrapped and strapped inside the truck. Humidity and lacquer finishes are protected with proper wrap, not standard furniture blankets alone.",
  ],
  "hard-to-shift": [
    "Spa pools, safes, and oversized items need planning, we scope weight, access, and equipment before we quote from Hamilton.",
  ],
};

function faqsForHamiltonBase(base: HamiltonBaseSlug): readonly FaqItem[] {
  switch (base) {
    case "house-moving":
      return hamiltonHouseFaqs;
    case "office-moving":
      return hamiltonOfficeFaqs;
    case "commercial-moving":
      return hamiltonOfficeFaqs;
    case "piano-movers":
      return hamiltonPianoFaqs;
    case "packing-services":
      return hamiltonPackingFaqs;
    case "cleaning-services":
      return hamiltonCleaningFaqs;
    default:
      return defaultHamiltonFaqs;
  }
}

export function enrichHamiltonPageConfig(config: HamiltonPageConfig): HamiltonPageConfig {
  const process = hamiltonProcesses[config.baseSlug as HamiltonBaseSlug];
  const extra = hamiltonExtraParagraphs[config.baseSlug as HamiltonBaseSlug] ?? [];
  const mergedFaqs =
    config.faqs && config.faqs.length >= 6
      ? config.faqs
      : faqsForHamiltonBase(config.baseSlug as HamiltonBaseSlug);

  return {
    ...config,
    paragraphs: [...config.paragraphs, ...extra],
    faqs: mergedFaqs,
    processTitle: process.title,
    processSteps: process.steps,
  };
}
