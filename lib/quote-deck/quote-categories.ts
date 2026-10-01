// One hosted quote page, many kinds of job. Everything that differs between a
// house move, a piano, an office, a kitchen run and so on lives HERE: the cover
// wording and photo, the "what's included" panel, which add-ons the customer
// can tick, the owner's-risk wording, and which questions the booking form
// asks. The deck, the add-ons panel, the booking form and POST /api/bookings
// all read from this, so a category is added or changed in one place.
//
// Keys follow ShiftMate's job types (crm_move_types), which is also how the
// work-client types sort: piano stores and venues -> piano, kitchens ->
// kitchen, commercial / depot -> commercial, insurers -> insurance, storage ->
// storage. house / packing / cleaning are the three that existed before
// (Richard, 2026-10-01): their add-ons and booking questions are unchanged.

import { pianoCoverIncluded } from "@/lib/company-facts";
import type { MoveInclusionCategory } from "@/lib/quote-deck/house-move-inclusions";
import { moveInclusionCategories } from "@/lib/quote-deck/house-move-inclusions";
import { sitePhotos } from "@/lib/quote-deck/site-photos";

export type QuoteCategoryKey =
  | "house"
  | "packing"
  | "cleaning"
  | "piano"
  | "office"
  | "commercial"
  | "kitchen"
  | "insurance"
  | "storage"
  | "furniture";

export type AddOnId = "cleaning" | "packing" | "insurance";

/** Booking-form questions that already exist on the house form. A category
 *  hides the ones that make no sense for it and can relabel the rest. */
export type BaseBookingField =
  | "pickupAddress"
  | "dropoffAddress"
  | "moveDate"
  | "sizeOfMove"
  | "howManyMovers"
  | "typeOfMove"
  | "payment"
  | "cleaningBooked"
  | "packing"
  | "unpacking"
  | "fragileItems"
  | "furnitureDismantle"
  | "accessRestrictions"
  | "settlementDay";

/** A question only some categories ask (piano type, claim number, ...). */
export type ExtraBookingField = {
  key: string;
  label: string;
  hint?: string;
  kind: "text" | "textarea" | "select";
  options?: readonly string[];
  required: boolean;
  /** Full width in the two-column grid. */
  wide?: boolean;
  /** "contact" sits with the name / phone / email; "job" (the default) sits
   *  with the date and addresses. */
  group?: "contact" | "job";
};

export type TermsSetId = "residential" | "commercial";

export type QuoteCategory = {
  key: QuoteCategoryKey;
  /** What the job is, in a sentence: "piano move", "office move". */
  noun: string;
  /** Cover pill, e.g. "Piano moving proposal". */
  pill: string;
  /** Heading over the price table. */
  totalHeading: string;
  /** Label for the date row in the move details. */
  dateLabel: string;
  pickupLabel: string;
  dropoffLabel: string;
  hero: { src: string; alt: string; caption: string; position: string };
  included: { eyebrow: string; title: string; categories: readonly MoveInclusionCategory[] };
  /** Add-on rows on the quote, in order. Empty hides the panel. */
  addOns: readonly AddOnId[];
  /** The insurance add-on row. */
  insuranceLabel: string;
  insuranceHint: string;
  /** The box ticked instead of asking for cover. */
  ownersRisk: string;
  booking: {
    intro: string;
    hidden: readonly BaseBookingField[];
    labels: Partial<Record<BaseBookingField, { label: string; hint?: string }>>;
    extras: readonly ExtraBookingField[];
    terms: TermsSetId;
  };
};

// ── Shared pieces ────────────────────────────────────────────────────────────

const safety: MoveInclusionCategory = moveInclusionCategories.find((c) => c.id === "safety")!;

const siteSafety: MoveInclusionCategory = {
  id: "safety",
  title: "Safety and site access",
  bullets: [
    "SiteWise Gold prequalification for managed and construction sites",
    "Public liability certificate on request for site access",
    "Trained crews, not casual labour",
    "Clear communication from quote to handover",
  ],
};

const OWNERS_RISK =
  "I understand my goods are moved at owner's risk under the Contract and Commercial Law Act 2017, unless I arrange separate insurance cover.";

const INSURANCE_LABEL = "Request insurance cover";
const INSURANCE_HINT =
  "Our team will send you insurance options. Your goods are otherwise carried at owner's risk.";

/** The trade questions: who the company is and who is on site on the day. */
const companyFields: ExtraBookingField[] = [
  { key: "companyName", label: "Company name", kind: "text", required: true, wide: true, group: "contact" },
  {
    key: "siteContact",
    label: "Contact on the day",
    hint: "Name and phone of the person our crew should call on site.",
    kind: "text",
    required: true,
    wide: true,
    group: "contact",
  },
];

const HOUSE_ONLY: BaseBookingField[] = [
  "sizeOfMove",
  "typeOfMove",
  "cleaningBooked",
  "packing",
  "unpacking",
  "settlementDay",
];

// ── The categories ───────────────────────────────────────────────────────────

const house: QuoteCategory = {
  key: "house",
  noun: "move",
  pill: "Home relocation proposal",
  totalHeading: "Cost of your move",
  dateLabel: "Move date",
  pickupLabel: "Pickup",
  dropoffLabel: "Drop off",
  hero: {
    src: sitePhotos.homeHero,
    alt: "You relax. We move.",
    caption: "You relax. We move.",
    position: "center 38%",
  },
  included: {
    eyebrow: "The Specialist Movers standard",
    title: "What's included in every move",
    categories: moveInclusionCategories.filter((c) => c.id !== "optional"),
  },
  addOns: ["cleaning", "packing", "insurance"],
  insuranceLabel: INSURANCE_LABEL,
  insuranceHint:
    "Our team will send you insurance options. Your move is otherwise carried at owner's risk.",
  ownersRisk: OWNERS_RISK,
  booking: {
    intro: "A few details to lock in your move.",
    hidden: [],
    labels: {},
    extras: [],
    terms: "residential",
  },
};

const packing: QuoteCategory = {
  ...house,
  key: "packing",
  noun: "packing",
  pill: "Packing proposal",
  totalHeading: "Cost of your packing",
  dateLabel: "Packing date",
  hero: {
    src: sitePhotos.packing,
    alt: "Packers wrapping glassware in bubble wrap",
    caption: "Every box, packed properly.",
    position: "center 40%",
  },
  included: {
    eyebrow: "The Specialist Movers standard",
    title: "What's included in your pack",
    categories: [
      {
        id: "materials",
        title: "Packing materials",
        bullets: [
          "Quality boxes, tape, bubble wrap and packing paper",
          "Port-a-robe wardrobe boxes so clothes go on the hanger",
          "Mattress and couch protectors",
          "Moving blankets for furniture",
        ],
      },
      {
        id: "packed",
        title: "Packed properly",
        bullets: [
          "Fragile items, glassware and screens wrapped piece by piece",
          "Packers come in the day before your move",
          "Unpacking at the other end on request",
          "Furniture disassembly and reassembly support",
        ],
      },
      safety,
    ],
  },
};

const cleaning: QuoteCategory = {
  ...house,
  key: "cleaning",
  noun: "clean",
  pill: "Cleaning proposal",
  totalHeading: "Cost of your clean",
  dateLabel: "Cleaning date",
  pickupLabel: "Address",
  dropoffLabel: "Second address",
  hero: {
    src: `/photos/source/batch-p126-p127/P1260162.jpg`,
    alt: "Our team at work in a kitchen",
    caption: "Spotless for handover.",
    position: "center 35%",
  },
  included: {
    eyebrow: "Specialist Cleaners",
    title: "What's included in your clean",
    categories: [
      {
        id: "clean",
        title: "The clean",
        bullets: [
          "Fixed price by bedrooms and bathrooms",
          "Room-by-room schedule, so you know what gets done",
          "Property spotless and ready for inspection",
        ],
      },
      {
        id: "timing",
        title: "Timed with your move",
        bullets: [
          "Scheduling aligned with your move-out date",
          "Smooth and hassle-free handover",
          "Re-clean policy under our cleaning terms",
        ],
      },
    ],
  },
};

const piano: QuoteCategory = {
  key: "piano",
  noun: "piano move",
  pill: "Piano moving proposal",
  totalHeading: "Cost of your piano move",
  dateLabel: "Move date",
  pickupLabel: "Pickup",
  dropoffLabel: "Drop off",
  hero: {
    src: sitePhotos.pianoMove,
    alt: "Our piano crew loading a wrapped piano onto the piano truck",
    caption: "Your piano, in safe hands.",
    position: "center 45%",
  },
  included: {
    eyebrow: "Specialist Piano Movers",
    title: "What's included in your piano move",
    categories: [
      {
        id: "handling",
        title: "The right gear",
        bullets: [
          "Piano skids, skid boards, dollies and straps",
          "Padded covers and shrink wrap for the trip",
          "Upright, baby grand, grand and digital pianos",
        ],
      },
      {
        id: "cover",
        title: "Cover and care",
        bullets: [
          `Cover of up to ${pianoCoverIncluded} for your piano while we move it, on our piano terms`,
          "More cover can be arranged through our team on request",
          "Grand legs, pedals and lid removed and refitted",
        ],
      },
      {
        id: "placed",
        title: "Placed where you want it",
        bullets: [
          "Stairs, tight corners and access planned before the day",
          "Carried in and positioned in the room you choose",
        ],
      },
      safety,
    ],
  },
  addOns: ["insurance"],
  insuranceLabel: "Request extra cover",
  insuranceHint: `Your piano has cover of up to ${pianoCoverIncluded} as standard. Tick and our team will send options for more.`,
  ownersRisk: `I understand my piano has cover of up to ${pianoCoverIncluded} on Specialist Movers' piano terms, and anything beyond that is at owner's risk under the Contract and Commercial Law Act 2017 unless I arrange extra cover.`,
  booking: {
    intro: "A few details to lock in your piano move.",
    hidden: [...HOUSE_ONLY, "howManyMovers", "fragileItems", "furnitureDismantle"],
    labels: {
      accessRestrictions: {
        label: "Stairs and access",
        hint: "How many steps at pick-up and at drop-off? Any tight corners, gravel, slopes or a lift?",
      },
    },
    extras: [
      {
        key: "pianoType",
        label: "Type of piano",
        kind: "select",
        options: ["Upright piano", "Baby grand piano", "Grand piano", "Digital piano", "Other"],
        required: true,
      },
      {
        key: "dropoffContact",
        label: "Someone else at the drop-off?",
        hint: "Name and phone, if it isn't you.",
        kind: "text",
        required: false,
        wide: true,
      },
    ],
    terms: "residential",
  },
};

const office: QuoteCategory = {
  key: "office",
  noun: "office move",
  pill: "Office relocation proposal",
  totalHeading: "Cost of your office move",
  dateLabel: "Move date",
  pickupLabel: "Moving from",
  dropoffLabel: "Moving to",
  hero: {
    src: sitePhotos.officeMove,
    alt: "Our crew carrying boxes through an office",
    caption: "Moved without the downtime.",
    position: "center 40%",
  },
  included: {
    eyebrow: "The Specialist Movers standard",
    title: "What's included in your office move",
    categories: [
      {
        id: "furniture",
        title: "Furniture and IT",
        bullets: [
          "Workstations, task chairs, filing, compactus and boardroom tables moved and rebuilt",
          "IT equipment and fragile items handled with care",
          "Blankets and wrap for furniture, not charged as an extra",
        ],
      },
      {
        id: "planned",
        title: "Planned around your business",
        bullets: [
          "After-hours and weekend moves to reduce downtime",
          "Lift access, loading zones and building rules planned in advance",
        ],
      },
      {
        id: "trucks",
        title: "Crew and trucks",
        bullets: [
          "Crew labour and trucks for your quote",
          "Six trucks from 15 to 40 cubic metres, taillift on every one",
        ],
      },
      siteSafety,
    ],
  },
  addOns: ["insurance"],
  insuranceLabel: INSURANCE_LABEL,
  insuranceHint: INSURANCE_HINT,
  ownersRisk: OWNERS_RISK,
  booking: {
    intro: "A few details to lock in your office move.",
    hidden: [...HOUSE_ONLY, "payment"],
    labels: {
      fragileItems: {
        label: "IT, screens and fragile items?",
        hint: "Computers, monitors, printers, server racks, artwork.",
      },
      furnitureDismantle: {
        label: "Furniture to dismantle and rebuild?",
        hint: "Workstations, boardroom tables, compactus, shelving.",
      },
      accessRestrictions: {
        label: "Building access",
        hint: "Lift bookings, loading dock, parking, after-hours access, building management rules.",
      },
    },
    extras: companyFields,
    terms: "commercial",
  },
};

const commercial: QuoteCategory = {
  ...office,
  key: "commercial",
  noun: "job",
  pill: "Commercial moving proposal",
  totalHeading: "Cost of your job",
  dateLabel: "Date",
  pickupLabel: "Pickup",
  dropoffLabel: "Delivery",
  hero: {
    src: sitePhotos.commercialTeam,
    alt: "The Specialist Movers team and trucks at the depot",
    caption: "Built for trade work.",
    position: "center 45%",
  },
  included: {
    eyebrow: "The Specialist Movers standard",
    title: "What's included in your job",
    categories: [
      {
        id: "work",
        title: "What we move",
        bullets: [
          "Cabinetry and fit outs",
          "Office relocations, staging and tenant moves",
          "Printers, vending machines and specialist equipment",
        ],
      },
      {
        id: "handling",
        title: "Handled properly",
        bullets: [
          "Blanket wrap and strapping included, not charged as an extra",
          "Carried to where it is needed, not left at the door",
        ],
      },
      {
        id: "trucks",
        title: "Crew and trucks",
        bullets: [
          "Trained crews with the right gear and clear timelines",
          "Six trucks from 15 to 40 cubic metres, taillift on every one",
        ],
      },
      siteSafety,
    ],
  },
  booking: {
    ...office.booking,
    intro: "A few details to lock in your job.",
    labels: {
      fragileItems: {
        label: "What are we moving?",
        hint: "Items, sizes, and anything heavy or fragile.",
      },
      accessRestrictions: {
        label: "Site access",
        hint: "Loading dock, lifts, parking, site induction, opening hours.",
      },
    },
  },
};

const kitchen: QuoteCategory = {
  key: "kitchen",
  noun: "delivery",
  pill: "Cabinetry delivery proposal",
  totalHeading: "Cost of your delivery",
  dateLabel: "Delivery date",
  pickupLabel: "Workshop",
  dropoffLabel: "Site",
  hero: {
    src: "/photos/source/batch-p125/P1250050.jpg",
    alt: "The Specialist Movers team with a truck",
    caption: "Workshop to site, carried in.",
    position: "center 45%",
  },
  included: {
    eyebrow: "The Specialist Movers standard",
    title: "What's included in your delivery",
    categories: [
      {
        id: "delivery",
        title: "Workshop to site",
        bullets: [
          "Kitchens, vanities, wardrobes and commercial joinery",
          "Carried to the room, not left at the door or on the drive",
        ],
      },
      {
        id: "protection",
        title: "Protection",
        bullets: [
          "Benchtops and stone tops carried on edge and strapped upright",
          "Blanket wrap and strapping on finished surfaces, not charged as an extra",
        ],
      },
      {
        id: "trucks",
        title: "Crew and trucks",
        bullets: [
          "Six trucks from 15 to 40 cubic metres, taillift on every one",
          "Regular weekly or fortnightly runs with the same crew",
        ],
      },
      siteSafety,
    ],
  },
  addOns: ["insurance"],
  insuranceLabel: INSURANCE_LABEL,
  insuranceHint: INSURANCE_HINT,
  ownersRisk: OWNERS_RISK,
  booking: {
    intro: "A few details to lock in your delivery.",
    hidden: [...HOUSE_ONLY, "payment", "furnitureDismantle"],
    labels: {
      pickupAddress: { label: "Pick-up (workshop) address" },
      dropoffAddress: { label: "Delivery (site) address" },
      moveDate: { label: "Delivery date" },
      fragileItems: {
        label: "What are we delivering?",
        hint: "Kitchen, vanities, wardrobes, benchtops. Note any stone tops and their size.",
      },
      accessRestrictions: {
        label: "Site access",
        hint: "Site induction, parking, stairs, and which room it goes to.",
      },
    },
    extras: [
      ...companyFields,
      {
        key: "deliveryWindow",
        label: "When do the installers need it?",
        hint: "e.g. on site by 8am.",
        kind: "text",
        required: false,
      },
    ],
    terms: "commercial",
  },
};

const insurance: QuoteCategory = {
  key: "insurance",
  noun: "job",
  pill: "Insurance relocation proposal",
  totalHeading: "Cost of the job",
  dateLabel: "Date",
  pickupLabel: "Pickup",
  dropoffLabel: "Drop off",
  hero: {
    src: "/photos/source/batch-p126-p127/P1260446.jpg",
    alt: "Our packers wrapping contents in a dining room",
    caption: "Packed, stored and returned with care.",
    position: "center 40%",
  },
  included: {
    eyebrow: "The Specialist Movers standard",
    title: "What's included in this job",
    categories: [
      {
        id: "packout",
        title: "Pack-out and protection",
        bullets: [
          "Contents wrapped and packed by trained crews, not casual labour",
          "Furniture and fragile items protected for transit",
        ],
      },
      {
        id: "visits",
        title: "Every visit accounted for",
        bullets: [
          "Pack-out, storage and return with the same team",
          "Each visit booked and invoiced as its own part of the claim",
          "Photos taken on site at every visit",
        ],
      },
      safety,
    ],
  },
  addOns: [],
  insuranceLabel: INSURANCE_LABEL,
  insuranceHint: INSURANCE_HINT,
  ownersRisk: OWNERS_RISK,
  booking: {
    intro: "A few details to lock in this job.",
    hidden: ["typeOfMove", "payment", "cleaningBooked", "packing", "unpacking", "settlementDay"],
    labels: {},
    extras: [
      { key: "insurerName", label: "Insurer or claims company", kind: "text", required: true, group: "contact" },
      { key: "claimNumber", label: "Claim number", kind: "text", required: true, group: "contact" },
      {
        key: "policyholderContact",
        label: "Policyholder name and phone",
        hint: "If it isn't you, so our crew can arrange access.",
        kind: "text",
        required: false,
        wide: true,
        group: "contact",
      },
    ],
    terms: "residential",
  },
};

const storage: QuoteCategory = {
  key: "storage",
  noun: "storage",
  pill: "Storage proposal",
  totalHeading: "Cost of your storage",
  dateLabel: "Collection date",
  pickupLabel: "Collect from",
  dropoffLabel: "Deliver to",
  hero: {
    src: sitePhotos.houseMove,
    alt: "Our crew wrapping furniture",
    caption: "Stored safely until you're ready.",
    position: "center 40%",
  },
  included: {
    eyebrow: "The Specialist Movers standard",
    title: "What's included in your storage",
    categories: [
      {
        id: "collection",
        title: "Collection",
        bullets: [
          "Careful pickup, wrapping and inventory on the way in",
          "Can combine with packing and your move on one plan",
        ],
      },
      {
        id: "stored",
        title: "While it's stored",
        bullets: [
          "Weeks or months, no long minimum stay",
          "Furniture and boxed goods held safely",
          "Clear access and retrieval arrangements",
        ],
      },
      {
        id: "return",
        title: "Back out again",
        bullets: ["Delivered to your new address when you are ready"],
      },
      safety,
    ],
  },
  addOns: ["insurance"],
  insuranceLabel: INSURANCE_LABEL,
  insuranceHint: INSURANCE_HINT,
  ownersRisk: OWNERS_RISK,
  booking: {
    intro: "A few details to lock in your storage.",
    hidden: ["typeOfMove", "cleaningBooked", "packing", "unpacking", "settlementDay"],
    labels: {
      pickupAddress: { label: "Collection address" },
      dropoffAddress: {
        label: "Delivery address when it comes out",
        hint: "Write TBC if you don't know yet.",
      },
      moveDate: { label: "Collection date" },
    },
    extras: [
      {
        key: "storageLength",
        label: "How long do you need storage?",
        kind: "select",
        options: ["A few weeks", "1 to 3 months", "3 to 6 months", "6 months or more", "Not sure yet"],
        required: true,
      },
    ],
    terms: "residential",
  },
};

const furniture: QuoteCategory = {
  key: "furniture",
  noun: "delivery",
  pill: "Furniture delivery proposal",
  totalHeading: "Cost of your delivery",
  dateLabel: "Delivery date",
  pickupLabel: "Pickup",
  dropoffLabel: "Delivery",
  hero: {
    src: "/photos/source/batch-p126-p127/P1260743.jpg",
    alt: "Our crew carrying a couch",
    caption: "Carried in, set down where you want it.",
    position: "center 45%",
  },
  included: {
    eyebrow: "The Specialist Movers standard",
    title: "What's included in your delivery",
    categories: [
      {
        id: "handling",
        title: "Handling",
        bullets: [
          "Single items, part-loads and full furniture deliveries",
          "Heavy and awkward pieces: spa pools, safes, pool tables, marble tops",
        ],
      },
      {
        id: "protection",
        title: "Protection",
        bullets: [
          "Blankets, shrink wrap or mattress covers included, not charged as an extra",
          "Beds, tables and modular furniture taken apart and rebuilt",
        ],
      },
      {
        id: "delivery",
        title: "Delivered properly",
        bullets: ["Carried to the room, not left at the door or on the drive"],
      },
      safety,
    ],
  },
  addOns: ["insurance"],
  insuranceLabel: INSURANCE_LABEL,
  insuranceHint: INSURANCE_HINT,
  ownersRisk: OWNERS_RISK,
  booking: {
    intro: "A few details to lock in your delivery.",
    hidden: HOUSE_ONLY,
    labels: {
      moveDate: { label: "Delivery date" },
      fragileItems: {
        label: "What are we moving?",
        hint: "Each item, and anything heavy, oversized or fragile.",
      },
    },
    extras: [],
    terms: "residential",
  },
};

export const QUOTE_CATEGORIES: Record<QuoteCategoryKey, QuoteCategory> = {
  house,
  packing,
  cleaning,
  piano,
  office,
  commercial,
  kitchen,
  insurance,
  storage,
  furniture,
};

/** Other names a category arrives under: ShiftMate job types and the
 *  work-client types (clients.json), so Joey can pass either. */
const ALIASES: Record<string, QuoteCategoryKey> = {
  venue_piano: "piano",
  "piano-store": "piano",
  venue: "piano",
  "commercial-office": "office",
  depot: "commercial",
  staging: "commercial",
  materials_delivery: "commercial",
  cabinetry: "kitchen",
  joinery: "kitchen",
  furniture_delivery: "furniture",
};

/** The category for a stored quoteType. Anything unknown (or missing) is a
 *  house move, which is what every quote was before categories existed. */
export function quoteCategory(quoteType?: string | null): QuoteCategory {
  const k = String(quoteType ?? "").trim().toLowerCase();
  if (k in QUOTE_CATEGORIES) return QUOTE_CATEGORIES[k as QuoteCategoryKey];
  if (k in ALIASES) return QUOTE_CATEGORIES[ALIASES[k]];
  return house;
}

/** The booking questions POST /api/bookings must see answered. House keeps
 *  exactly the list it always had; other categories drop what they hide and
 *  add their own required extras. */
const BASE_REQUIRED: readonly BaseBookingField[] = [
  "pickupAddress",
  "dropoffAddress",
  "moveDate",
  "sizeOfMove",
  "howManyMovers",
  "typeOfMove",
  "payment",
  "cleaningBooked",
  "packing",
  "unpacking",
  "fragileItems",
  "furnitureDismantle",
  "accessRestrictions",
  "settlementDay",
];

export function requiredBookingKeys(cat: QuoteCategory): string[] {
  return [
    "fullName",
    "phone",
    "email",
    ...BASE_REQUIRED.filter((k) => !cat.booking.hidden.includes(k)),
    ...cat.booking.extras.filter((x) => x.required).map((x) => x.key),
  ];
}
