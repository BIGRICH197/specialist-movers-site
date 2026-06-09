import type { ProcessStep } from "@/components/ProcessStepsGrid";
import { houseMovingProcess } from "@/lib/moving-process";
import type { FaqItem } from "@/lib/service-faqs";
import { generalServiceFaqs } from "@/lib/service-faqs";

export type ClusterSeoExtension = {
  bodyParagraphs: readonly string[];
  faqs: readonly FaqItem[];
  processTitle: string;
  processSteps: readonly ProcessStep[];
  piano?: boolean;
};

const regionalPricing =
  "Longer routes are quoted with travel and access included upfront, no hidden fees on move day.";

const pianoProtection =
  "Pianos are wrapped in padded blankets and shrink wrap, secured with specialist straps, and carried on piano boards when required.";

const clusterSeo: Record<string, ClusterSeoExtension> = {
  "local-moving": {
    bodyParagraphs: [
      "Local Auckland and Hamilton moves use the same SiteWise Gold crews whether you are in a walk-up apartment or a lifestyle block. We confirm parking, stairs, and lift access before move day.",
      "Day rates and call-out fees are explained when you quote, Auckland outer suburbs and Waikato zones are priced clearly upfront.",
    ],
    faqs: [
      {
        q: "How much does a local move cost in Auckland?",
        a: "Most local moves start from around $350 excl. GST. Full house moves are quoted after a viewing based on volume, crew size, and access.",
      },
      {
        q: "What is included in a local move quote?",
        a: "Yes. crew labour, truck, blankets, and standard local travel are included. Packing, cleaning, and storage are quoted separately when you need them.",
      },
      generalServiceFaqs[3],
      generalServiceFaqs[4],
      generalServiceFaqs[5],
      generalServiceFaqs[6],
    ],
    processTitle: houseMovingProcess.title,
    processSteps: houseMovingProcess.steps,
  },
  "regional-moving": {
    bodyParagraphs: [
      `Regional moves between Auckland, Hamilton, Bay of Plenty, and Northland stay on our trucks with one company end to end. ${regionalPricing}`,
      `Piano transport on regional routes uses ${pianoProtection.toLowerCase()} Your instrument is secured for the full drive.`,
    ],
    faqs: [
      {
        q: "How much does a regional move cost?",
        a: "Regional moves are quoted individually based on volume, both addresses, and travel time. You receive a written price before you confirm, typically one full day on site.",
      },
      {
        q: "How long does an Auckland to Hamilton move take?",
        a: "Most corridor moves are one full day including load, travel, and unload. Multi-day legs are quoted clearly when access or distance requires it.",
      },
      {
        q: "How is furniture protected on longer routes?",
        a: "Yes. blankets, wrap, and internal truck strapping are standard on every regional load.",
      },
      {
        q: "Are travel costs included upfront?",
        a: "Yes. travel and access are built into your written quote before you book.",
      },
      generalServiceFaqs[3],
      generalServiceFaqs[6],
    ],
    processTitle: houseMovingProcess.title,
    processSteps: houseMovingProcess.steps,
  },
  "international-moving": {
    bodyParagraphs: [
      "International and inter-island moves are planned in stages, inventory, written quote, confirmed dates, then pack, export wrap, and coordinated delivery.",
      `${pianoProtection} International piano shipping includes export wrap and crating when quoted.`,
      "Long-distance quotes include travel, crew time, and access factored in before you confirm.",
    ],
    faqs: [
      {
        q: "How long does an international move take?",
        a: "Timing depends on destination and freight mode. We confirm collection, transit windows, and delivery when we quote.",
      },
      {
        q: "What is included in an international move quote?",
        a: "Yes. labour, packing coordination, and transport to port or freight handover are itemised. Storage in transit can be added when dates do not align.",
      },
      {
        q: "How is a piano protected on an international route?",
        a: "Yes. export wrap, crating when required, and specialist handling through to freight handover.",
      },
      generalServiceFaqs[3],
      generalServiceFaqs[4],
      generalServiceFaqs[6],
    ],
    processTitle: "International move process",
    processSteps: houseMovingProcess.steps,
  },
  "short-term-storage": {
    bodyParagraphs: [
      "Short-term storage bridges overlapping tenancies, we collect, wrap, and inventory your goods, then deliver when your next home is ready.",
      regionalPricing,
    ],
    faqs: [
      {
        q: "How much does short-term storage cost?",
        a: "Storage is quoted by volume and duration after we understand what is held and when you need delivery back.",
      },
      {
        q: "What is included in storage?",
        a: "Yes. careful pickup, wrapping on intake, secure holding, and delivery to your new address when ready.",
      },
      generalServiceFaqs[3],
      generalServiceFaqs[6],
      generalServiceFaqs[5],
      generalServiceFaqs[4],
    ],
    processTitle: "Storage process",
    processSteps: [
      { title: "Scope and quote", body: "Confirm duration, volume, and delivery timing." },
      { title: "Collection", body: "Wrapped and inventoried on pickup." },
      { title: "Secure holding", body: "Goods stored until your date is ready." },
      { title: "Return delivery", body: "Delivered to your new address when you confirm." },
    ],
  },
  "long-term-storage": {
    bodyParagraphs: [
      "Long-term storage suits overseas postings, extended builds, and months between properties. Household furniture and boxed goods are protected on intake and return delivery.",
      regionalPricing,
    ],
    faqs: [
      {
        q: "How much does long-term storage cost?",
        a: "Pricing depends on volume and how long goods are held. We quote monthly or for the full term before you commit.",
      },
      {
        q: "Can I access my goods while in storage?",
        a: "Yes. retrieval visits are arranged on agreed terms. Most clients book delivery when their new property is ready.",
      },
      generalServiceFaqs[3],
      generalServiceFaqs[6],
      generalServiceFaqs[5],
      generalServiceFaqs[4],
    ],
    processTitle: "Storage process",
    processSteps: [
      { title: "Scope and quote", body: "Volume, duration, and access terms confirmed in writing." },
      { title: "Intake", body: "Careful wrapping and inventory on collection." },
      { title: "Held securely", body: "Goods stored for the agreed period." },
      { title: "Delivery", body: "Return to your address when you are ready." },
    ],
  },
  "storage-in-transit": {
    bodyParagraphs: [
      "Storage in transit keeps your load accounted for between pickup, overnight holding, and final delivery on regional routes.",
      regionalPricing,
    ],
    faqs: [
      {
        q: "When is storage in transit used?",
        a: "Yes. when a regional or long-distance move cannot finish in one day, goods are secured between legs rather than left unattended.",
      },
      {
        q: "Is storage in transit included in the quote?",
        a: "Yes. overnight or multi-day holding is planned and priced before move day, not added as a surprise.",
      },
      generalServiceFaqs[3],
      generalServiceFaqs[6],
      generalServiceFaqs[5],
      generalServiceFaqs[4],
    ],
    processTitle: "Storage in transit process",
    processSteps: houseMovingProcess.steps,
  },
  "overnight-storage": {
    bodyParagraphs: [
      "Overnight storage supports multi-day moves when distance, building access, or crew hours require a planned stop between load and delivery.",
      regionalPricing,
    ],
    faqs: [
      {
        q: "When do you use overnight storage?",
        a: "Yes. when a move spans two days or building rules limit single-day access, your goods are secured overnight between crew shifts.",
      },
      {
        q: "Is overnight storage included in my quote?",
        a: "Yes. planned overnight legs are priced upfront before you confirm the move.",
      },
      generalServiceFaqs[3],
      generalServiceFaqs[6],
      generalServiceFaqs[5],
      generalServiceFaqs[4],
    ],
    processTitle: "Multi-day move process",
    processSteps: houseMovingProcess.steps,
  },
  "piano-storage": {
    bodyParagraphs: [
      `Piano storage is handled by our Specialist Piano Movers team, not generic household locker storage. ${pianoProtection}`,
      "Short and long-term piano holding is available when settlement dates or international timing does not line up.",
    ],
    faqs: [
      {
        q: "How much does piano storage cost?",
        a: "Piano storage is quoted by instrument type and duration. Upright and grand pianos are priced separately before you book.",
      },
      {
        q: "How is my piano protected in storage?",
        a: "Yes. padded blankets, shrink wrap, and climate-aware handling. Collection and return delivery use the same specialist crew.",
      },
      generalServiceFaqs[3],
      generalServiceFaqs[6],
      generalServiceFaqs[5],
      generalServiceFaqs[4],
    ],
    processTitle: "Piano storage process",
    processSteps: houseMovingProcess.steps,
    piano: true,
  },
};

export function getClusterSeoExtension(slug: string): ClusterSeoExtension | undefined {
  return clusterSeo[slug];
}
