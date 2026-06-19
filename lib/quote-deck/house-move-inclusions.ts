/** What's included — matches specialistmovers.co.nz homepage */

export type MoveInclusionCategory = {
  id: string;
  title: string;
  intro?: string;
  bullets: readonly string[];
};

export const whatsIncludedCopy = {
  eyebrow: "The Specialist Movers standard",
  title: "What's included in every move",
  lead:
    "Premium moving means knowing what you are paying for before move day. These are the standards our crews bring to every job across New Zealand.",
  asideTitle: "Clear quotes, no surprises",
  asideBody:
    "Your written quote sets out labour, transport, and any add-ons (packing, cleaning, storage, specialty items). If access is unusual, stairs, long carries, or tight parking, we flag it when we quote, not on the invoice.",
} as const;

export const moveInclusionCategories: readonly MoveInclusionCategory[] = [
  {
    id: "wrapping",
    title: "Wrapping and protection",
    intro: "Furniture and fragile items are protected for transit as standard on full moves.",
    bullets: [
      "Moving blankets and wrap for furniture",
      "Mattress protectors available upon request",
      "Flat screens and fragile items packed safely",
      "Standard paintings and small mirrors. Ask us about oversized or high-value pieces",
    ],
  },
  {
    id: "disassembly",
    title: "Disassembly and reassembly",
    bullets: [
      "Beds, tables, and modular furniture taken apart and reassembled where safe",
      "Care taken with hardware, bags labelled for your new room",
      "Specialist items (pianos, spa pools, commercial gear) quoted separately",
    ],
  },
  {
    id: "transport",
    title: "Labour, truck, and local travel",
    bullets: [
      "Crew labour and truck for your quote",
      "Local travel and standard route costs included in day-rate quotes",
      "Call-out and tier explained when you book",
      "Tolls on longer regional jobs included when quoted",
    ],
  },
  {
    id: "safety",
    title: "Safety and professionalism",
    bullets: [
      "SiteWise Gold health and safety systems",
      "Trained crews, not casual labour",
      "Licensed and insured operations",
      "Clear communication from quote to handover",
    ],
  },
] as const;

/** Standard inclusions only — add-ons shown separately and filtered against the quote */
export const standardInclusionCategories = moveInclusionCategories.filter((cat) => cat.id !== "optional");

export type PopularAddOn = {
  id: string;
  label: string;
  /** If any term appears in a quote line description, this add-on is already quoted */
  matchTerms: readonly string[];
};

export const popularAddOnsTitle = "Add-ons";

export const popularAddOns: readonly PopularAddOn[] = [
  {
    id: "packing",
    label: "Full packing and unpacking, packers come in the day before",
    matchTerms: ["packing", "packer", "unpacking", "packed"],
  },
  {
    id: "cleaning",
    label: "Exit cleaning, fixed-price tenancy cleans",
    matchTerms: ["cleaning", "clean", "tenancy clean", "exit clean"],
  },
  {
    id: "insurance",
    label: "Full moving insurance, personalised transit cover for your belongings",
    matchTerms: ["insurance", "transit cover", "transit insurance"],
  },
  {
    id: "storage",
    label: "Storage, short-term, long-term, in transit, and overnight",
    matchTerms: ["storage", "in transit", "overnight storage"],
  },
  {
    id: "specialist",
    label: "Piano, commercial, and hard-to-shift specialist moves",
    matchTerms: ["piano", "commercial", "spa pool", "specialist move", "hard-to-shift"],
  },
] as const;
