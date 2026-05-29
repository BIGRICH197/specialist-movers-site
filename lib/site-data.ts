import { serviceBlurbs, serviceWhyChooseCopy } from "./legacy-site-content";

export const jobTypes = [
  "Piano Move",
  "House Move",
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
    slug: "house-moving",
    title: serviceBlurbs["house-moving"].title,
    description: serviceBlurbs["house-moving"].excerpt,
    defaultJobType: "House Move" as const,
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
      "Office and workplace relocations , desks, chairs, filing, and meeting rooms",
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
      "Careful collection, shrink wrapping, secure delivery, and full setup upon arrival",
      "Upright, electric, and grand pianos transported safely and on time",
      "Protective padding, tape and secure straps for safe transport",
      "Specialised transport insurance options , talk to our team for more information",
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
    defaultJobType: "House Move" as const,
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
    defaultJobType: "House Move" as const,
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
    defaultJobType: "House Move" as const,
    includedBullets: [
      "Written quote for moving assistance applications",
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
    relatedSlugs: ["grand-piano", "upright-piano", "piano-movers"],
  },
] as const;

/** Slugs match WordPress paths on specialistmovers.co.nz for SEO continuity. */
export const blogPosts = [
  {
    slug: "the-ultimate-guide-to-house-moving-in-auckland",
    title: "The Ultimate Guide to House Moving in Auckland",
    excerpt:
      "Moving isn't hard because of the boxes. It's hard because it messes with your routine. If you're moving house in Auckland, here's the straight talk , dates, packing, movers, and Auckland-specific tips.",
  },
  {
    slug: "diy-packing-vs-professional-packing-services",
    title: "Comparing Do-It-Yourself Packing with Expert Packing Services",
    excerpt:
      "DIY vs professional packing: costs, control, stress, and when expert packers in Auckland are worth it.",
  },
  {
    slug: "stress-free-moving-in-auckland-expert-tips-from-specialist-movers",
    title: "Stress-Free Moving in Auckland: Expert Tips from Specialist Movers",
    excerpt:
      "Proper planning and expert guidance can simplify your relocating experience , tips from expert movers for Auckland moves.",
  },
] as const;
