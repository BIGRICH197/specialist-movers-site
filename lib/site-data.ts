import { serviceBlurbs, serviceWhyChooseCopy } from "./legacy-site-content";

export const jobTypes = [
  "Piano Move",
  "Home Move",
  "Office Move",
  "Commercial Move",
  "Packing",
  "Hard to Shift",
  "Cleaning",
] as const;

export type JobType = (typeof jobTypes)[number];

export const phoneNumber = "0212282728";
export const phoneDisplay = "(021) 228 2728";

export const services = [
  {
    slug: "furniture-movers",
    title: serviceBlurbs["furniture-movers"].title,
    description: serviceBlurbs["furniture-movers"].excerpt,
    defaultJobType: "Home Move" as const,
    includedBullets: [
      "Single-item moves, part-loads, and full household furniture removals",
      "Heavy and awkward pieces: spa pools, safes, pool tables, marble tops",
      "Disassembly and reassembly of beds, tables, and modular furniture",
      "Blankets, shrink wrap or mattress covers included, not charged as an extra",
    ],
    whyChooseCopy: serviceWhyChooseCopy["furniture-movers"],
    relatedSlugs: ["house-moving", "hard-to-shift", "packing-services"],
  },
  {
    slug: "house-moving",
    title: serviceBlurbs["house-moving"].title,
    description: serviceBlurbs["house-moving"].excerpt,
    defaultJobType: "Home Move" as const,
    includedBullets: [
      "Residential moving for houses, apartments, and townhouses",
      "Local and long-distance moves across New Zealand",
      "Furniture removals, professional packing, storage solutions, secure transportation, and timely delivery",
      "Professional packing and unpacking support",
      "Furniture disassembly and reassembly",
      "Secure storage solutions when needed",
    ],
    whyChooseCopy: serviceWhyChooseCopy["house-moving"],
    relatedSlugs: [
      "packing-services",
      "piano-movers",
      "office-moving",
      "hard-to-shift",
      "loading-unloading",
      "commercial-moving",
    ],
  },
  {
    slug: "office-moving",
    title: serviceBlurbs["office-moving"].title,
    description: serviceBlurbs["office-moving"].excerpt,
    defaultJobType: "Office Move" as const,
    includedBullets: [
      "Office furniture moved and rebuilt: workstations, task chairs, filing, compactus, and boardroom tables",
      "IT equipment and fragile items handled with care",
      "After-hours and weekend moves to reduce downtime",
      "Lift access, loading zones, and building rules planned in advance",
    ],
    whyChooseCopy: serviceWhyChooseCopy["office-moving"],
    relatedSlugs: ["commercial-moving", "packing-services", "loading-unloading", "house-moving"],
  },
  {
    slug: "piano-movers",
    title: serviceBlurbs["piano-movers"].title,
    description: serviceBlurbs["piano-movers"].excerpt,
    defaultJobType: "Piano Move" as const,
    includedBullets: [
      "Piano skids, skid boards, dollies, straps, and protective coverings",
      "Shrink wrap and padded covers for damage-free Auckland transport",
      "Upright, baby grand, grand, and digital pianos",
      "Custom crating for grand and international moves",
      "Short-term and long-term piano storage",
      "Minimum three trained movers on standard piano jobs",
      "Specialist transport insurance options on request",
    ],
    whyChooseCopy: serviceWhyChooseCopy["piano-movers"],
    relatedSlugs: ["house-moving", "packing-services", "hard-to-shift"],
  },
  {
    slug: "commercial-moving",
    title: serviceBlurbs["commercial-moving"].title,
    description: serviceBlurbs["commercial-moving"].excerpt,
    defaultJobType: "Commercial Move" as const,
    includedBullets: [
      "Cabinetry and fit outs",
      "Office relocations, staging, and tenant moves",
      "Printer, vending machine, and specialist equipment deliveries",
      "Trained crews with the right gear, careful handling, and clear timelines",
    ],
    whyChooseCopy: serviceWhyChooseCopy["commercial-moving"],
    relatedSlugs: ["office-moving", "loading-unloading", "packing-services", "house-moving"],
  },
  {
    slug: "packing-services",
    title: serviceBlurbs["packing-services"].title,
    description: serviceBlurbs["packing-services"].excerpt,
    defaultJobType: "Packing" as const,
    includedBullets: [
      "Professional packing service with quality packing materials and moving blankets",
      "Packing and unpacking assistance",
      "Furniture disassembly and reassembly support",
      "Access to storage facilities for short-term and long-term needs",
    ],
    whyChooseCopy: serviceWhyChooseCopy["packing-services"],
    relatedSlugs: ["house-moving", "commercial-moving", "piano-movers"],
  },
  {
    slug: "hard-to-shift",
    title: serviceBlurbs["hard-to-shift"].title,
    description: serviceBlurbs["hard-to-shift"].excerpt,
    defaultJobType: "Hard to Shift" as const,
    includedBullets: [
      "Fragile and bulky furniture with packing materials and moving blankets to protect in transit",
      "Spa pools, bathtubs, saunas and other difficult items",
      "Specialist equipment and safe moving techniques",
      "Careful planning for stairs, tight access points and tricky pathways",
    ],
    whyChooseCopy: serviceWhyChooseCopy["hard-to-shift"],
    relatedSlugs: ["house-moving", "loading-unloading", "packing-services"],
  },
  {
    slug: "cleaning-services",
    title: serviceBlurbs["cleaning-services"].title,
    description: serviceBlurbs["cleaning-services"].excerpt,
    defaultJobType: "Cleaning" as const,
    includedBullets: [
      "Tenancy, settlement, and post-construction cleans across Auckland, Hamilton, and the Waikato",
      "Fixed prices by bedrooms and bathrooms on our quote form",
      "Property spotless and fully ready for inspection",
      "Smooth and hassle-free handover process",
      "Scheduling aligned with your move-out date",
    ],
    whyChooseCopy: serviceWhyChooseCopy["cleaning-services"],
    relatedSlugs: ["house-moving", "packing-services", "hard-to-shift"],
  },
  {
    slug: "international-moving",
    title: serviceBlurbs["international-moving"].title,
    description: serviceBlurbs["international-moving"].excerpt,
    defaultJobType: "Home Move" as const,
    includedBullets: [
      "North Island, South Island and international destinations",
      "Careful planning and packaging coordination",
      "Clear communication around timing and logistics",
      "Reliable handling for furniture and delicate items",
    ],
    whyChooseCopy: serviceWhyChooseCopy["international-moving"],
    relatedSlugs: ["packing-services", "house-moving"],
  },
  {
    slug: "loading-unloading",
    title: serviceBlurbs["loading-unloading"].title,
    description: serviceBlurbs["loading-unloading"].excerpt,
    defaultJobType: "Home Move" as const,
    includedBullets: [
      "Movers for hire for transportation and heavy lifting",
      "Loading and unloading trucks, containers and storage",
      "Careful handling for furniture and boxed items",
      "Services adapted to suit your needs",
    ],
    whyChooseCopy: serviceWhyChooseCopy["loading-unloading"],
    relatedSlugs: ["house-moving", "commercial-moving", "hard-to-shift"],
  },
  {
    slug: "winz-quotes",
    title: serviceBlurbs["winz-quotes"].title,
    description: serviceBlurbs["winz-quotes"].excerpt,
    defaultJobType: "Home Move" as const,
    includedBullets: [
      "Written itemised quote for a Moving Costs Grant application",
      "Clear scope and prompt follow-up",
      "Simple communication so you get the details you need",
    ],
    whyChooseCopy: serviceWhyChooseCopy["winz-quotes"],
    relatedSlugs: ["house-moving", "cleaning-services", "packing-services"],
  },
] as const;

export const pianoServices = [
  {
    slug: "grand-piano",
    title: "Grand Piano Moving",
    defaultJobType: "Piano Move" as const,
    includedBullets: [
      "Specialist preparation for grand pianos (including legs/pedals/lid handling)",
      "Protective padding, tape and secure straps",
      "Safe transport with careful care for delicate instrument components",
      "Timing updates and expert placement",
    ],
    whyChooseCopy:
      "Grand pianos require extra precision. We use proven techniques and the right tools to protect your instrument from pickup to final placement.",
    relatedSlugs: ["upright-piano", "piano-storage", "international-piano", "piano-movers"],
  },
  {
    slug: "upright-piano",
    title: "Upright Piano Moving",
    defaultJobType: "Piano Move" as const,
    includedBullets: [
      "Careful handling for upright pianos through tight access and stairs",
      "Custom dollies, padding tape and secure straps to reduce risk",
      "Protective moving materials for safe transit",
      "Experienced team with clear communication",
    ],
    whyChooseCopy:
      "Upright pianos can be awkward to move. We plan the route, protect the instrument, and handle the job with the care it deserves.",
    relatedSlugs: ["grand-piano", "piano-storage", "piano-movers"],
  },
  {
    slug: "international-piano",
    title: "International Piano Shipping",
    defaultJobType: "Piano Move" as const,
    includedBullets: [
      "Overseas piano shipping guidance and specialist coordination",
      "Protective packing and careful instrument handling",
      "Clear communication around timing and logistics",
      "Support for safe and reliable delivery",
    ],
    whyChooseCopy:
      "International piano shipping is high-stakes. We focus on careful prep, clear communication, and specialist handling that protects your instrument across the journey.",
    relatedSlugs: ["grand-piano", "upright-piano", "piano-storage", "piano-movers"],
  },
  {
    slug: "piano-storage",
    title: "Piano Storage",
    defaultJobType: "Piano Move" as const,
    includedBullets: [
      "Safe piano storage planning",
      "Protective handling during pickup and storage transitions",
      "Careful coordination so your piano is ready when you are",
      "Expert team with experience moving pianos into storage solutions",
    ],
    whyChooseCopy:
      "When timing changes, storage can save your move. We help you store your piano safely with expert handling before the next step.",
    relatedSlugs: ["grand-piano", "upright-piano", "piano-tuning", "piano-movers"],
  },
  {
    slug: "piano-tuning",
    title: "Piano tuning",
    defaultJobType: "Piano Move" as const,
    includedBullets: [
      "Standard tuning for upright and grand pianos",
      "Pitch correction when the piano has slipped between services",
      "Advice on humidity, heating, and how often to book",
      "Coordination with piano moves when you need both services",
    ],
    whyChooseCopy:
      "Regular tuning keeps your piano sounding its best and helps catch small problems before they become expensive repairs.",
    relatedSlugs: ["piano-movers", "grand-piano", "upright-piano", "piano-storage"],
  },
] as const;

/** Slugs match WordPress paths on specialistmovers.co.nz for SEO continuity. */
export const blogPosts = [
  {
    slug: "the-ultimate-guide-to-house-moving-in-auckland",
    title: "The Ultimate Guide to Moving Home in Auckland",
    seoTitle: "Moving Home Guide Auckland | Specialist Movers",
    publishedDate: "2026-04-22",
    excerpt:
      "Moving house in Auckland? Straight talk on dates, packing, movers, and local tips. Plan your move with less stress and clearer costs.",
  },
  {
    slug: "diy-packing-vs-professional-packing-services",
    title: "DIY Packing vs Professional Packers: What Each Really Costs",
    seoTitle: "DIY vs Professional Packing Auckland: Real Prices | Specialist Movers",
    publishedDate: "2026-08-03",
    excerpt:
      "What packing your own house really costs against paying packers, with our actual Auckland prices by bedroom count, and the split most people end up choosing.",
  },
  {
    slug: "how-much-do-movers-cost-in-auckland",
    title: "How Much Do Movers Cost in Auckland? Real 2026 Numbers",
    seoTitle: "Moving Costs Auckland 2026: Real Prices | Specialist Movers",
    publishedDate: "2026-07-20",
    excerpt:
      "Actual Auckland moving costs from a company that does this daily: hourly rates, callout fees, worked examples by house size, and what pushes the price up.",
  },
  {
    slug: "office-move-auckland-planning-guide",
    title: "Planning an Office Move in Auckland: Timeline, Costs and What Everyone Forgets",
    seoTitle: "Office Move Auckland: Planning Guide & Costs | Specialist Movers",
    publishedDate: "2026-07-20",
    excerpt:
      "A realistic office relocation guide for Auckland businesses: the 6-week timeline, how commercial moves are priced, and the details that derail move day.",
  },
  {
    slug: "auckland-moving-day-checklist",
    title: "The Complete Auckland Moving-Day Checklist: 4 Weeks to Keys in Hand",
    seoTitle: "Auckland Moving Checklist | Specialist Movers",
    publishedDate: "2026-07-24",
    excerpt:
      "Exactly what to do 4 weeks out, 1 week out, the night before, and on moving day. Auckland-specific tips on rain, parking, lifts, and traffic.",
  },
  {
    slug: "moving-into-out-of-auckland-apartment",
    title: "Moving Into or Out of an Auckland Apartment: What You Need to Know",
    seoTitle: "Auckland Apartment Moving Guide | Specialist Movers",
    publishedDate: "2026-07-24",
    excerpt:
      "Body corporate rules, service lifts, loading zones and more. A plain-English guide to apartment moves in Auckland, from the team who does them every week.",
  },
  {
    slug: "balcony-fridge-delivery-st-heliers-auckland",
    title: "How We Got a Full-Size Fridge Up a Balcony in St Heliers",
    seoTitle: "Balcony Fridge Move St Heliers | Specialist Movers",
    publishedDate: "2026-07-24",
    excerpt:
      "A 900mm-wide fridge, an 820mm balcony gap, one flight of stairs. Here is exactly how our two-person crew planned and completed this St Heliers job.",
  },
  {
    slug: "hoist-move-newmarket-how-we-did-it",
    title: "When the Stairs Are Not an Option: A Hoist Job in Newmarket",
    seoTitle: "Hoist Movers Auckland: A Real Job Story | Specialist Movers",
    publishedDate: "2026-07-30",
    excerpt:
      "A Newmarket commercial move needed a hoist to shift heavy items safely. Here is exactly how our four-person crew planned and executed it.",
  },
  {
    slug: "piano-and-couch-lift-to-balcony-freemans-bay-auckland",
    title: "How We Got a Piano and a Couch Up to a Freemans Bay Balcony",
    seoTitle: "Piano & Couch Balcony Lift, Freemans Bay | Specialist Movers",
    publishedDate: "2026-08-02",
    excerpt:
      "A Freemans Bay apartment job that needed a piano moved and a couch lifted to a balcony. Here's exactly how our crew planned and pulled it off.",
  },
  {
    slug: "how-to-choose-a-moving-company-auckland",
    title: "How to Choose a Moving Company in Auckland: the Exact Questions to Ask Before You Book",
    seoTitle: "How to Choose a Moving Company Auckland | Specialist Movers",
    publishedDate: "2026-07-30",
    excerpt:
      "Not all Auckland removalists are the same. Here are the exact questions to ask before you hand over your keys and your couch.",
  },
  {
    slug: "moving-house-with-kids-and-pets-nz",
    title: "Moving House with Kids and Pets: How to Keep the Day on Track",
    seoTitle: "Moving with Kids & Pets NZ | Specialist Movers",
    publishedDate: "2026-07-30",
    excerpt:
      "Practical advice for Auckland families moving house with children and pets. Plan the day, settle animals fast, and time your move around school zones.",
  },
  {
    slug: "downsizing-retirement-village-auckland",
    title: "Moving to a Retirement Village in Auckland: A Plain Guide to Downsizing",
    seoTitle: "Downsizing to a Retirement Village Auckland | Specialist Movers",
    publishedDate: "2026-08-02",
    excerpt:
      "Practical advice on sorting what comes with you, lining up settlement dates, bridging storage, and why a viewing makes retirement moves smoother in Auckland.",
  },
  {
    slug: "moving-in-winter-auckland",
    title: "Moving in Winter Auckland: Why July to September Might Be Your Best Option",
    seoTitle: "Winter Moving Auckland: Tips & Benefits | Specialist Movers",
    publishedDate: "2026-08-02",
    excerpt:
      "Thinking about moving in winter in Auckland? July to September has real advantages. Here's what to expect and how we keep your gear dry on rainy days.",
  },
  {
    slug: "how-much-does-it-cost-to-move-a-piano-in-auckland",
    title: "How Much Does It Cost to Move a Piano in Auckland? Real 2026 Numbers",
    seoTitle: "Piano Moving Cost Auckland: Real 2026 Prices | Specialist Movers",
    publishedDate: "2026-08-10",
    excerpt:
      "What moving a piano actually costs in Auckland, how movers charge for it, and the access details that change the number. Upright, grand and digital, with real rates.",
  },
  {
    slug: "how-much-does-it-cost-to-move-an-office-in-auckland",
    title: "How Much Does It Cost to Move an Office in Auckland? Real 2026 Numbers",
    seoTitle: "Office Move Cost Auckland: Real 2026 Prices | Specialist Movers",
    publishedDate: "2026-08-10",
    excerpt:
      "Auckland office move costs by desk count, the three ways movers price commercial jobs, and the downtime cost that never appears on the invoice. With our real rates.",
  },
  {
    slug: "how-much-do-furniture-movers-cost-in-auckland",
    title: "How Much Do Furniture Movers Cost in Auckland? Real 2026 Numbers",
    seoTitle: "Furniture Moving Cost Auckland: Real 2026 Prices | Specialist Movers",
    publishedDate: "2026-08-10",
    excerpt:
      "What it costs to move a sofa, bed, fridge or a Trade Me pickup in Auckland, how long each item actually takes, and why moving several at once costs far less per item.",
  },
] as const;
