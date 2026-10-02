// One hosted quote page, many kinds of job. Everything that differs between a
// house move, a piano, an office, a kitchen run and so on lives HERE: the cover
// wording and photo, the "what's included" panel, which add-ons the customer
// can tick, the owner's-risk wording, and which questions the booking form
// asks. The deck, the add-ons panel, the booking form and POST /api/bookings
// all read from this, so a category is added or changed in one place.
//
// Four kinds (Richard, 2026-10-02). HOUSE is the quote as it has always been:
// moving, packing and cleaning on one quote, with the house details, add-ons
// and booking form, and the packing / cleaning quote types render it too.
// PIANO, OFFICE and COMMERCIAL are the new ones, and anything odd (kitchens,
// storage, furniture or materials deliveries, staging, depots) is COMMERCIAL.

import { pianoCoverIncluded } from "@/lib/company-facts";
import type { MoveInclusionCategory } from "@/lib/quote-deck/house-move-inclusions";
import { moveInclusionCategories } from "@/lib/quote-deck/house-move-inclusions";
import { sitePhotos } from "@/lib/quote-deck/site-photos";

export type QuoteCategoryKey = "house" | "piano" | "office" | "commercial";

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
    caption: "You relax. We move.",
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
    caption: "You relax. We move.",
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
        ],
      },
      {
        id: "trucks",
        title: "Crew and trucks",
        bullets: [
          "Crew labour and trucks for your quote",
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
    caption: "You relax. We move.",
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
        ],
      },
      siteSafety,
    ],
  },
  booking: {
    ...office.booking,
    intro: "A few details to lock in your job.",
    // Commercial also takes the odd private job (storage, a delivery), so the
    // company is asked but not required.
    extras: [
      { ...companyFields[0], required: false },
      companyFields[1],
      {
        key: "deliveryWindow",
        label: "Any time it needs to be there by?",
        hint: "e.g. installers on site from 8am.",
        kind: "text",
        required: false,
      },
    ],
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

export const QUOTE_CATEGORIES: Record<QuoteCategoryKey, QuoteCategory> = {
  house,
  piano,
  office,
  commercial,
};

/** Other names a category arrives under: ShiftMate job types and the
 *  work-client types (clients.json), so Joey can pass either. packing and
 *  cleaning are house: the same one quote they have always been. */
const ALIASES: Record<string, QuoteCategoryKey> = {
  packing: "house",
  cleaning: "house",
  insurance: "house",
  venue_piano: "piano",
  "piano-store": "piano",
  venue: "piano",
  "commercial-office": "office",
  kitchen: "commercial",
  cabinetry: "commercial",
  joinery: "commercial",
  storage: "commercial",
  furniture: "commercial",
  furniture_delivery: "commercial",
  materials_delivery: "commercial",
  staging: "commercial",
  depot: "commercial",
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
