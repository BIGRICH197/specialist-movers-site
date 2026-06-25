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
      "Range hood extraction outside clean including the internal filter vent",
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

export const cleaningOptionalExtras: string[] = [
  "Clean inside window panes ($30 per story-level of the house)",
  "Clean outside window panes ($40, one-story level only)",
  "Ranch slider inside track clean ($35)",
  "Clean inside all window tracks ($60)",
  "Carpet shampoo (price on assessment)",
  "Inside single-oven clean ($40)",
  "Inside double-oven clean ($60)",
  "Inside door, internal and filter dishwasher clean ($40)",
  "Inside a fridge / freezer ($40)",
  "Blind dusting / cleaning ($10 per set)",
  "Ceilings spot clean ($20 per room)",
  "Intensive garage or storage locker cleaning ($60)",
  "Outdoor furniture or spa pool cover surface clean ($40)",
];

export const cleaningExclusionsIntro =
  "The following are not included in our bond cleaning service:";

export const cleaningExclusions: string[] = [
  "Extensive external cleaning such as larger decks or lots of outdoor stairs",
  "Baby / child safety latch or lock removal",
  "Removal of stickers or removable hooks",
  "Carpet shampoo stains: our carpet shampoo does not include stain removal. The cleaner assesses stains during cleaning and quotes extra if significant. We cannot guarantee 100% stain removal; some stains may fade up to around 80%.",
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
