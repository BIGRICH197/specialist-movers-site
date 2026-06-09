import type { ProcessStep } from "@/components/ProcessStepsGrid";
import { houseMovingProcess } from "@/lib/moving-process";
import {
  generalServiceFaqs,
  packingServiceFaqs,
  cleaningServiceFaqs,
  type FaqItem,
} from "@/lib/service-faqs";

export type ServiceSeoExtension = {
  bodyParagraphs: readonly string[];
  faqs: readonly FaqItem[];
  processTitle: string;
  processSteps: readonly ProcessStep[];
  piano?: boolean;
};

const pianoProtectionBody =
  "Every piano is wrapped in padded blankets and shrink wrap before it leaves your home. Uprights are secured upright inside the truck with specialist straps. Grands are tilted onto a piano board, padded, and strapped for transport. Humidity and finish are protected with proper wrap — not just a furniture blanket.";

const defaultProcess = houseMovingProcess.steps;

export const serviceSeoExtensions: Partial<Record<string, ServiceSeoExtension>> = {
  "packing-services": {
    bodyParagraphs: [
      "Our packing crew arrives the day before your move with cartons, paper, and wrap. Kitchens, fragile items, and wardrobes are packed room by room so load day is faster and safer.",
      "We label boxes by room and priority so unload at your new address is straightforward. Partial packs are available when you only need help with breakables or a few rooms.",
    ],
    faqs: packingServiceFaqs,
    processTitle: "Packing process",
    processSteps: [
      { title: "Quote by bedroom count", body: "Fixed packing price based on home size. Add packing when you request your house move quote." },
      { title: "Pack day", body: "Crew packs the day before move day with materials supplied." },
      { title: "Move day", body: "Pre-packed cartons load faster — your move crew handles furniture and transport." },
      { title: "Unpack on request", body: "Unpacking and box removal can be added when you book." },
    ],
  },
  "hard-to-shift": {
    bodyParagraphs: [
      "Spa pools, large safes, gym equipment, and oversized furniture need planning — we scope access, weight, and equipment before we quote.",
      "Padded blankets, custom dollies, and extra crew are arranged when needed. We have moved spa pools, bathtubs, and commercial fit-outs across Auckland and the Waikato.",
    ],
    faqs: generalServiceFaqs,
    processTitle: "Specialist item process",
    processSteps: defaultProcess,
  },
  "cleaning-services": {
    bodyParagraphs: [
      "Exit cleans are fixed-price by bedrooms and bathrooms on our booking form — no hourly surprises. Kitchen, bathrooms, floors, and living areas are cleaned to tenancy inspection standard.",
      "Settlement-day and post-construction cleans are available across Auckland, Hamilton, and Waikato towns. Add extra living rooms on the form when you need them.",
    ],
    faqs: cleaningServiceFaqs,
    processTitle: "Exit clean process",
    processSteps: [
      { title: "Fixed quote online", body: "Select bedrooms, bathrooms, and clean type for an instant fixed price." },
      { title: "Schedule around move-out", body: "We book your clean to align with handover or settlement." },
      { title: "Inspection-ready finish", body: "Kitchen, bathrooms, and living areas cleaned to standard." },
      { title: "Invoice matches quote", body: "Fixed price on the form is what you pay — no hidden add-ons." },
    ],
  },
  "international-moving": {
    bodyParagraphs: [
      "International and inter-island moves are planned in stages — inventory, written quote, confirmed dates, then pack, export wrap, and coordinated delivery.",
      "We work with trusted partners for overseas freight; North and South Island relocations are run with our own crews and clear timelines.",
    ],
    faqs: generalServiceFaqs,
    processTitle: "International move process",
    processSteps: defaultProcess,
    piano: false,
  },
  "loading-unloading": {
    bodyParagraphs: [
      "Hire our crew and truck for load-only, unload-only, or both — ideal when you are moving yourself but need experienced movers for the heavy work.",
      "We bring blankets, straps, and the right crew size for stairs and bulky items. Priced by the hour with a clear minimum call-out.",
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
      "House moves, packing, and cleaning quotes are available — tell us your deadline when you call.",
    ],
    faqs: [
      {
        q: "How fast can you provide a WINZ quote?",
        a: "Yes — we aim to return written quotes within one business day. Call (021) 228 2728 if your application deadline is sooner.",
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
    bodyParagraphs: [pianoProtectionBody, "Grand piano moves include leg removal where required, piano board tilt, padded wrap, and placement at your new address."],
    faqs: generalServiceFaqs,
    processTitle: "Grand piano move process",
    processSteps: defaultProcess,
    piano: true,
  },
  "upright-piano": {
    bodyParagraphs: [pianoProtectionBody, "Upright pianos are wrapped, strapped, and moved on specialist dollies through tight hallways and doorways."],
    faqs: generalServiceFaqs,
    processTitle: "Upright piano move process",
    processSteps: defaultProcess,
    piano: true,
  },
  "international-piano": {
    bodyParagraphs: [pianoProtectionBody, "International piano shipping includes export wrap, crating when required, and coordination with our freight partners."],
    faqs: generalServiceFaqs,
    processTitle: "International piano process",
    processSteps: defaultProcess,
    piano: true,
  },
  "piano-storage": {
    bodyParagraphs: [pianoProtectionBody, "Climate-aware piano storage is available short or long term while sale, renovation, or international timing is sorted."],
    faqs: generalServiceFaqs,
    processTitle: "Piano storage process",
    processSteps: defaultProcess,
    piano: true,
  },
};

export function getServiceSeoExtension(slug: string): ServiceSeoExtension | undefined {
  return serviceSeoExtensions[slug];
}
