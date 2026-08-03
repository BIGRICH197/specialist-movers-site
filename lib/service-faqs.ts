/** SEO-friendly FAQs, answers lead with a direct fact, number, or yes/no. */

export type FaqItem = { q: string; a: string };

export const generalServiceFaqs: readonly FaqItem[] = [
  {
    q: "How much does it cost to hire movers in Auckland?",
    a: "Most local moves start from around $300 excl. GST for smaller jobs. A full home relocation is quoted after a free in-home viewing and depends on volume, distance, crew size, and add-ons like packing or cleaning.",
  },
  {
    q: "What is the process for booking?",
    a: "We start with a free viewing or clear phone quote. Once we have seen access, volume, and timing, you receive a written price and we lock your move date.",
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

export const officeServiceFaqs: readonly FaqItem[] = [
  {
    q: "How much does office moving cost in Auckland?",
    a: "Small offices (up to ~10 staff) are often quoted from around $800 excl. GST. Medium and large floors need a site visit; we confirm crew size, lift access, and timing in writing before you book.",
  },
  {
    q: "Can you move our office after hours or on weekends?",
    a: "Yes. Weekend and after-hours office moves are available to reduce staff downtime. Tell us your preferred window when you request a quote.",
  },
  {
    q: "Do you handle IT equipment and fragile office items?",
    a: "Yes. Desks, monitors, filing, and meeting-room furniture are wrapped and secured. Tell us about servers or specialist gear so we plan extra padding and carry paths.",
  },
  {
    q: "How do you plan lift access and building rules?",
    a: "We confirm lift bookings, loading zones, and body corporate rules before move day. Share building contact details when you quote so nothing is left to chance.",
  },
  {
    q: "How far in advance should I book an office move?",
    a: "Two to three weeks ahead is ideal for multi-floor or CBD moves. Shorter notice is often possible, call (021) 228 2728 and we will check crew availability.",
  },
  {
    q: "What is included in an office move quote?",
    a: "Labour, truck, blankets, and standard wrap are included. Packing, storage, and specialist item handling are itemised separately when you need them.",
  },
  {
    q: "Do you cover Auckland and Hamilton offices?",
    a: "Yes. We relocate workplaces across Auckland suburbs and Hamilton from our two bases. Regional office moves are quoted individually with travel included upfront.",
  },
  {
    q: "How long does a typical office move take?",
    a: "A single-floor office often completes in one day. Larger floors or multi-site projects may run two days; we confirm hours and crew size when we quote.",
  },
];

export const commercialServiceFaqs: readonly FaqItem[] = [
  {
    q: "How much does commercial moving cost in Auckland?",
    a: "Commercial jobs are quoted individually based on item type, access, and crew time. Printer runs and single heavy deliveries often start from around $300 excl. GST; fit-outs and multi-drop work are scoped on site.",
  },
  {
    q: "What commercial work do you handle?",
    a: "Kitchen installs, shop fit-outs, staging, printer and vending machine deliveries, and tenant relocations. We bring the dollies, straps, and crew size the job needs.",
  },
  {
    q: "Are your crews SiteWise certified?",
    a: "Yes. Specialist Movers holds SiteWise Gold certification with a 90%+ health and safety score, important for retail, construction, and managed sites.",
  },
  {
    q: "Can you work to a tight install or delivery window?",
    a: "Yes. We confirm arrival time, access, and handover points in writing before the day. After-hours and early-morning slots are available when sites require them.",
  },
  {
    q: "How far in advance should I book a commercial job?",
    a: "One to two weeks ahead is ideal for fit-outs and multi-item runs. Call (021) 228 2728 for urgent printer or equipment deliveries, we often have next-day capacity.",
  },
  {
    q: "Do you service Hamilton and the Waikato for commercial work?",
    a: "Yes. Our Hamilton base handles Waikato fit-outs, deliveries, and relocations with the same quoting and safety systems as Auckland.",
  },
  {
    q: "How do you protect fixtures and cabinetry in transit?",
    a: "Blankets, wrap, and custom dollies are standard. Fragile joinery and glass are padded and strapped inside the truck before we leave site.",
  },
  {
    q: "What is included in a commercial quote?",
    a: "Crew labour, truck, standard protection, and travel for local jobs are included. Extra crew, stairs, or specialist gear are confirmed in your written price upfront.",
  },
];

export const pianoServiceFaqsExtra: readonly FaqItem[] = [
  {
    q: "How is my piano protected during transport?",
    a: "Every piano move includes padded blankets, shrink wrap, and securing straps. Grands are tilted and padded on a piano board; uprights are wrapped and strapped inside the truck.",
  },
  {
    q: "How much does piano moving cost in Auckland?",
    a: "Upright piano moves typically start from $290 excl. GST locally; grands from $550 excl. GST. Stairs, distance, and outer suburbs add to the quote, we confirm before you book.",
  },
];

export const grandPianoFaqs: readonly FaqItem[] = [
  {
    q: "How much does grand piano moving cost?",
    a: "Grand piano moves typically start from $550 excl. GST locally in Auckland. Stairs, distance, and leg removal add to the quote; we confirm a fixed price before you book.",
  },
  {
    q: "How is a grand piano protected during transport?",
    a: "Legs and pedals are removed when needed, the body is padded and tilted onto a piano board, then shrink wrapped and strapped inside our piano truck.",
  },
  {
    q: "How many movers do you send for a grand piano?",
    a: "Minimum three trained movers on standard grand jobs. Tight access or long carries may need a fourth; we confirm crew size when we quote.",
  },
  {
    q: "Can you move a grand piano with stairs or tight turns?",
    a: "Yes. Our teams move grands through narrow hallways and stairwells across Auckland and Hamilton regularly. Tell us about both addresses when you request a quote.",
  },
  {
    q: "How far in advance should I book a grand piano move?",
    a: "Two weeks ahead is ideal for weekends. Call (021) 228 2728 for shorter notice, we run piano jobs seven days a week from Auckland and Hamilton.",
  },
  {
    q: "Will my grand piano need tuning after the move?",
    a: "The move itself rarely knocks a piano out of tune, but humidity changes can. Book a tuner 2 to 3 weeks after placement so the instrument settles in its new room.",
  },
  {
    q: "Do you cover Auckland and Hamilton for grand piano moves?",
    a: "Yes. Daily grand piano work from Wairau Valley (Auckland) and Hamilton, including Auckland–Hamilton corridor runs and wider Waikato routes when quoted.",
  },
  {
    q: "Is specialist insurance available for grand pianos?",
    a: "Every piano we move carries $2,000 of insurance-backed cover as standard. For a concert grand that is not enough, so we can arrange higher cover through our broker. Ask when you quote and we will include the details in your written price. Household goods on a general move travel at owner's risk unless you arrange transit cover with us.",
  },
];

export const uprightPianoFaqs: readonly FaqItem[] = [
  {
    q: "How much does upright piano moving cost?",
    a: "Upright piano moves typically start from $290 excl. GST locally in Auckland. Stairs, distance, and outer suburbs are confirmed in your written quote before you book.",
  },
  {
    q: "How is an upright piano protected during transport?",
    a: "Quilted blankets, shrink wrap, and securing straps are applied before the piano leaves your home. It is moved on specialist dollies and strapped upright inside the truck.",
  },
  {
    q: "Can you move an upright through a narrow hallway or stairwell?",
    a: "Yes. Uprights are awkward in tight access; we plan the route and use custom dollies. Tell us about stairs and turns at both addresses when you quote.",
  },
  {
    q: "How many movers do you send for an upright piano?",
    a: "Minimum three trained movers on standard upright jobs. We never send fewer than three on a piano move.",
  },
  {
    q: "How far in advance should I book an upright piano move?",
    a: "Two weeks ahead is best for month-end and weekends. We can often move sooner, call (021) 228 2728 for the next available piano crew.",
  },
  {
    q: "Do you move digital and electric pianos?",
    a: "Yes. Digital and electric pianos are lighter but still need careful handling on stairs. We scope access and confirm price before move day.",
  },
  {
    q: "What areas do you cover for upright piano moves?",
    a: "Auckland suburbs daily from Wairau Valley, plus Hamilton, Cambridge, and regular Auckland–Waikato corridor runs.",
  },
  {
    q: "Will my upright need tuning after the move?",
    a: "Usually not from the move alone, but temperature and humidity changes can affect pitch. We suggest tuning 2 to 3 weeks after the piano settles in its new room.",
  },
];

export const packingServiceFaqs: readonly FaqItem[] = [
  {
    q: "How much does professional packing cost?",
    a: "Packing is a fixed price by bedroom count, from $1,599 excl. GST for a 1-bedroom home. The crew packs the day before your move with cartons and wrap supplied.",
  },
  {
    q: "What is included in your packing service?",
    a: "Cartons, paper, wrap, and a team of packers. We pack kitchens, fragile items, and wardrobes; partial packs are available for breakables only.",
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
    a: "Kitchen, bathrooms, floors, and living areas to tenancy inspection standard. Oven, windows, and garages can be added when you book.",
  },
  ...generalServiceFaqs.slice(3, 7),
];

export function faqsForService(slug: string): readonly FaqItem[] {
  if (slug === "piano-movers") return generalServiceFaqs;
  if (slug === "office-moving") return officeServiceFaqs;
  if (slug === "commercial-moving") return commercialServiceFaqs;
  if (slug === "packing-services") return packingServiceFaqs;
  if (slug === "cleaning-services") return cleaningServiceFaqs;
  if (slug === "grand-piano") return grandPianoFaqs;
  if (slug === "upright-piano") return uprightPianoFaqs;
  if (slug.startsWith("piano-") || slug === "international-piano" || slug === "piano-storage") {
    return [...generalServiceFaqs.slice(0, 4), ...pianoServiceFaqsExtra];
  }
  return generalServiceFaqs;
}
