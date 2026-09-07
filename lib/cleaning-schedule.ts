// Specialist Cleaners — End of Tenancy / Bond cleaning schedule.
// Source: "Specialist Cleaners Cleaning Schedule.docx". One place to edit.
// Rendered at /cleaning-schedule and linked from quotes that include cleaning.

export type CleaningRoom = { title: string; items: string[] };

export const cleaningAgreementNote =
  "Real estate agencies and property managers may have different requirements for bond / end-of-tenancy cleans. Please check your tenancy agreement for any special conditions and let us know as soon as possible so we can include them with your clean. If we are not told before the service, they are not covered by our guarantee.";

export const cleaningRooms: CleaningRoom[] = [
  {
    title: "Entry / Hallway",
    items: [
      "Spot clean walls",
      "Dust and remove cobwebs",
      "Wipe down skirting boards",
      "Clean and dust lighting, switches and fixtures",
      "Vacuum and mop entryways",
      "Wipe down inside and outside of door",
      "Clean inside cupboards and built-in wardrobes",
    ],
  },
  {
    title: "Laundry",
    items: [
      "Vacuum and mop floor",
      "Dust and remove cobwebs",
      "Clean window ledges and indoor window framing (inside window tracks is extra)",
      "Wipe down skirting boards",
      "Clean and dust lighting, switches and fixtures",
      "Clean sink",
      "Wipe all counters",
      "Clean cabinets, cupboards, drawers and doors inside and outside",
      "Spot clean walls",
    ],
  },
  {
    title: "Kitchen",
    items: [
      "Clean and scrub cabinets, cupboards, pantry, drawers and doors inside and outside",
      "Clean oven outside only (inside is extra)",
      "Scrub and clean cook stovetop",
      "Clean outside of dishwasher and other appliances staying in the property",
      "Clean and shine sink and polish taps",
      "Vacuum and mop floor",
      "Clean window ledges and indoor window framing (inside window tracks is extra)",
      "Dust and remove cobwebs",
      "Clean and dust lighting, switches and fixtures",
      "Wipe down skirting boards",
      "Damp wipe all kitchen bench tops",
      "Wipe all counters",
      "Empty and clean all bins staying in the property",
      "Spot clean walls",
    ],
  },
  {
    title: "Bedrooms",
    items: [
      "Vacuum carpets",
      "Wipe down skirting boards",
      "Clean and dust lighting, switches and fixtures",
      "Clean window ledges and indoor window framing (inside window tracks is extra)",
      "Dust and remove cobwebs",
      "Clean and wipe empty shelves and wardrobes",
      "Spot clean walls",
      "Dust and clean ceiling fans",
    ],
  },
  {
    title: "Bathroom and Toilets",
    items: [
      "Clean mirrors and all counters",
      "Clean shower head and soap dish / shelves, and clean and descale shower screen and tiles",
      "Vacuum and mop floors",
      "Clean exhaust fans",
      "Clean window ledges and indoor window framing (inside window tracks is extra)",
      "Dust and remove cobwebs",
      "Clean and scrub bathroom sinks and bathtub",
      "Clean the toilet inside and outside",
      "Wipe down skirting boards",
      "Clean and dust lighting, switches and fixtures",
      "Clean cupboards, drawers and doors inside and outside",
      "Spot clean walls",
    ],
  },
  {
    title: "Lounge and Dining Room",
    items: [
      "Clean cabinets, cupboards, shelves, drawers and doors inside and outside",
      "Wipe down skirting boards",
      "Clean and dust accessible lighting, switches and fixtures",
      "Dust and remove cobwebs",
      "Vacuum and mop floor",
      "Clean window ledges and indoor window framing (inside window tracks is extra)",
      "Dust and clean accessible ceiling fans",
      "Spot clean walls",
    ],
  },
  {
    title: "Other Areas Included",
    items: [
      "Garage: vacuum / sweep out, basic wipe and dust down",
      "Front and back outdoor areas: sweep",
      "Balcony or small patio swept and cleared of spider webs and dirt",
    ],
  },
];

export type CleaningExtra = {
  id: string;
  label: string;
  /** Price excl. GST. */
  priceExclGst: number;
  /** When set, the price is per this unit and the customer picks a quantity. */
  unit?: string;
};

export const cleaningOptionalExtras: CleaningExtra[] = [
  { id: "window-panes-inside", label: "Clean inside window panes", priceExclGst: 30, unit: "per story-level" },
  { id: "ranch-slider-track", label: "Ranch slider inside track clean", priceExclGst: 35 },
  { id: "window-tracks", label: "Clean inside all window tracks", priceExclGst: 60 },
  { id: "oven-single", label: "Inside single-oven clean", priceExclGst: 40 },
  { id: "oven-double", label: "Inside double-oven clean", priceExclGst: 60 },
  { id: "range-hood", label: "Range hood clean, including the internal filter vent", priceExclGst: 30 },
  { id: "dishwasher", label: "Inside door, internal and filter dishwasher clean", priceExclGst: 40 },
  { id: "fridge-freezer", label: "Inside a fridge / freezer", priceExclGst: 40 },
  { id: "blinds", label: "Blind dusting / cleaning", priceExclGst: 10, unit: "per set" },
  { id: "ceilings", label: "Ceilings spot clean", priceExclGst: 20, unit: "per room" },
  { id: "garage-intensive", label: "Intensive garage or storage locker cleaning", priceExclGst: 60 },
];

/** Display label with its price, e.g. "Inside a fridge / freezer ($40 + GST)". */
export function cleaningExtraLabel(x: CleaningExtra): string {
  const unit = x.unit ? ` ${x.unit}` : "";
  return `${x.label} ($${x.priceExclGst}${unit} + GST)`;
}

export const cleaningExclusionsIntro =
  "The following are not included in our bond cleaning service:";

export const cleaningExclusions: string[] = [
  "Exterior cleaning: outdoor window panes, outdoor furniture, spa pool covers, larger decks and lots of outdoor stairs are not part of the clean",
  "Baby / child safety latch or lock removal",
  "Removal of stickers or removable hooks",
  "Carpet cleaning and carpet shampoo: we do not offer this service. Carpets are vacuumed as part of the clean, but shampoo and stain removal are a separate service by a carpet specialist.",
  "Outdoor council rubbish bin cleaning",
  "High-reach areas beyond the reach of a step ladder",
  "Full indoor or outdoor wall washing",
  "Nicotine, smoke or cigarette staining: this is not covered by our guarantee, as staining generally remains even after intensive cleaning.",
  "Garage floor or driveway oil removal",
  "Chandelier light cleaning",
  "Animal waste cleaning",
  "Gardening, garden waste or pulled-weed removal",
  "Tile and grout cleaning: our cleaners manually scrub tiled areas as part of a bond clean, but we do not specialise in tile and grout cleaning. A professional tile and grout clean may be needed depending on condition and is a separate service.",
  "Any cleaning that would result in damage",
];
