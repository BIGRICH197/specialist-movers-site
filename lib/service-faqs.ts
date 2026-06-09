/** SEO-friendly FAQs, answers lead with a direct fact, number, or yes/no. */

export type FaqItem = { q: string; a: string };

export const generalServiceFaqs: readonly FaqItem[] = [
  {
    q: "How much does it cost to hire movers in Auckland?",
    a: "Most local moves start from around $350 excl. GST for smaller jobs. A full house move is quoted after a free in-home viewing and depends on volume, distance, crew size, and add-ons like packing or cleaning.",
  },
  {
    q: "What is the process for booking?",
    a: "Yes. we start with a free viewing or clear phone quote. Once we have seen access, volume, and timing, you receive a written price and we lock your move date.",
  },
  {
    q: "How long will a typical move take?",
    a: "A standard 2–3 bedroom local move usually takes one day on site. Packing is often scheduled the day before; we confirm hours and crew size when we quote.",
  },
  {
    q: "How far in advance should I book my move?",
    a: "Two weeks ahead is ideal, especially for weekends and month-end. We can often help sooner, call (021) 228 2728 and we will check the next available crew.",
  },
  {
    q: "Do you provide packing services?",
    a: "Yes. Professional packing is available the day before your move, priced by bedroom count. We supply cartons, wrap, and a dedicated packing crew.",
  },
  {
    q: "How do you protect furniture during the move?",
    a: "Every load uses moving blankets, wrap, and mattress covers as standard. Fragile items are boxed or crated; pianos and high-value pieces get specialist padding and securing.",
  },
  {
    q: "What areas do you cover?",
    a: "Daily coverage across Auckland and Hamilton, plus Waikato towns and regional North Island routes. Mixed Auckland–Waikato or very long routes are quoted individually upfront.",
  },
  {
    q: "Do you offer furniture disassembly and reassembly?",
    a: "Yes. Beds, dining tables, and modular office furniture are disassembled for safe transport and reassembled at delivery when needed.",
  },
];

export const pianoServiceFaqsExtra: readonly FaqItem[] = [
  {
    q: "How is my piano protected during transport?",
    a: "Yes. every piano move includes padded blankets, shrink wrap, and securing straps. Grands are tilted and padded on a piano board; uprights are wrapped and strapped inside the truck.",
  },
  {
    q: "How much does piano moving cost in Auckland?",
    a: "Upright piano moves typically start from $290 excl. GST locally; grands from $550 excl. GST. Stairs, distance, and outer suburbs add to the quote, we confirm before you book.",
  },
];

export const packingServiceFaqs: readonly FaqItem[] = [
  {
    q: "How much does professional packing cost?",
    a: "Packing is a fixed price by bedroom count, from $1,599 excl. GST for a 1-bedroom home. The crew packs the day before your move with cartons and wrap supplied.",
  },
  {
    q: "What is included in your packing service?",
    a: "Yes. cartons, paper, wrap, and a team of packers. We pack kitchens, fragile items, and wardrobes; partial packs are available for breakables only.",
  },
  ...generalServiceFaqs.slice(2, 6),
];

export const cleaningServiceFaqs: readonly FaqItem[] = [
  {
    q: "How much does exit cleaning cost?",
    a: "Exit cleans start from $280 excl. GST for a 1-bedroom, 1-bathroom home. Price scales by bedrooms, bathrooms, and extra living rooms, fixed on our quote form.",
  },
  {
    q: "What is included in an exit clean?",
    a: "Yes. kitchen, bathrooms, floors, and living areas to tenancy inspection standard. Oven, windows, and garages can be added when you book.",
  },
  ...generalServiceFaqs.slice(3, 7),
];

export function faqsForService(slug: string): readonly FaqItem[] {
  if (slug === "piano-movers") return generalServiceFaqs;
  if (slug === "packing-services") return packingServiceFaqs;
  if (slug === "cleaning-services") return cleaningServiceFaqs;
  if (slug.startsWith("piano-") || slug === "grand-piano" || slug === "upright-piano") {
    return [...generalServiceFaqs.slice(0, 4), ...pianoServiceFaqsExtra];
  }
  return generalServiceFaqs;
}
