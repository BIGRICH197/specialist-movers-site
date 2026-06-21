import type { Location } from "@/lib/location-types";

export type FaqItem = { q: string; a: string };

export type LocationSeoPatch = {
  /** Replace the templated meta description (keep ≥120 chars). */
  metaDescription?: string;
  /** Replace the templated intro line. */
  intro?: string;
  /** Replace the templated body paragraphs entirely. */
  paragraphs?: readonly string[];
  /** Append unique paragraphs after the (templated or replaced) body. */
  extraParagraphs?: readonly string[];
  /** Replace the templated highlight bullets. */
  highlights?: readonly string[];
  faqs?: readonly FaqItem[];
};

const waikatoInAreaPricing =
  "Travel from our Hamilton base is included in your quote for in-area Waikato towns, no hidden callout added on move day.";

const regionalPricing =
  "Longer routes are quoted with travel and access included upfront. You see the full price before you book, no hidden fees on the day.";

const longDistancePricing =
  "Long-distance moves are quoted individually with travel, crew time, and access factored in before you confirm. Return trips and multi-day legs are priced clearly in writing.";

const pianoProtection =
  "Pianos are wrapped in padded blankets and shrink wrap, secured with specialist straps, and carried on piano boards or custom dollies. Grands are padded and tilted safely before transport; uprights are wrapped and strapped inside the truck.";

/** SEO patches keyed by /locations/[slug] */
export const locationSeoPatches: Record<string, LocationSeoPatch> = {
  // ── North Shore (core, near the Glenfield/Wairau Valley depot) ──
  glenfield: {
    metaDescription:
      "Glenfield movers next door in Wairau Valley. Home relocations, furniture removals and piano across Glenfield. Often short notice. Free quote.",
    intro:
      "Glenfield is home turf, our depot sits next door in Wairau Valley, so we reach local jobs fast and know the streets, malls, and cul-de-sacs well.",
    paragraphs: [
      "Glenfield is mostly 1970s and 80s brick-and-tile homes, newer townhouse infill, and cross-leases off shared driveways. We check driveway width and parking at your free viewing so the truck lands close to the door.",
      "Being minutes from base keeps Glenfield callouts low and lets us slot in shorter-notice moves. We handle home relocations, packing, piano transport, and office relocations across the suburb.",
    ],
    highlights: [
      "Depot next door in Wairau Valley",
      "Shared-driveway and cross-lease access sorted",
      "Often available on shorter notice",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "How quickly can you move me in Glenfield?",
        a: "Because our depot is next door in Wairau Valley, Glenfield is one of our fastest suburbs to schedule, we can often fit short-notice and mid-week moves. Call (021) 228 2728 for the next available crew.",
      },
      {
        q: "Can you handle cross-lease and shared-driveway access?",
        a: "Yes. a lot of Glenfield homes sit down shared drives. We check width, turning, and parking at your free viewing so the truck gets as close to the door as possible.",
      },
    ],
  },
  birkenhead: {
    metaDescription:
      "Birkenhead movers for hillside villas and harbour-edge homes. Specialist Movers plans narrow streets, steep drives, and tight parking from our nearby Glenfield depot. Free quote.",
    intro:
      "Birkenhead moves mean hills, character villas, and narrow harbour-side streets, we scope steep drives and parking before move day.",
    paragraphs: [
      "From Highbury's older villas and bungalows to the steep streets above Little Shoal Bay, Birkenhead access is often tight: narrow frontages, sloped driveways, and limited on-street parking. We plan truck placement and carry routes at the viewing.",
      "Our Glenfield depot is just up the road, so Birkenhead is a regular run. Home relocations, pianos, packing, and exit cleans are all covered.",
    ],
    highlights: [
      "Hillside villa and character-home access",
      "Narrow-street parking planned in advance",
      "Close to our Glenfield depot",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Can your truck reach steep Birkenhead driveways?",
        a: "We scope this at the viewing. Where a driveway is too steep or narrow, we plan the carry route or use a smaller shuttle vehicle so your gear still moves safely.",
      },
      {
        q: "Do you move villas and character homes?",
        a: "Yes. Birkenhead and Highbury have many older villas with steep steps and narrow hallways. We protect doorways and handle awkward pieces every week.",
      },
    ],
  },
  northcote: {
    metaDescription:
      "Northcote movers for villas, units, and the regenerated town centre. Specialist Movers covers Northcote Point to Onepoto from our nearby Glenfield base. Free quote.",
    intro:
      "Northcote runs from character villas on the Point to the redeveloped town-centre townhouses, we plan access for both.",
    paragraphs: [
      "Northcote Point's pre-war villas have steep steps and narrow hallways, while the regenerated town centre brings new townhouses with shared lanes and parking limits. We confirm the access type at your viewing so the quote fits the property.",
      "We are minutes away in Glenfield, so Northcote is a frequent run for home relocations, pianos, and packing, with easy motorway access for moves over the bridge.",
    ],
    highlights: [
      "Villas on the Point and new townhouses",
      "Shared-lane and parking access planned",
      "Quick run from our Glenfield depot",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you cover both Northcote Point and the new town centre?",
        a: "Yes. from the Point's character villas to the regenerated town-centre townhouses. We confirm whether it is villa steps or shared-lane townhouse access when we quote.",
      },
      {
        q: "Can you move across the harbour bridge?",
        a: "Yes. Northcote's motorway access makes city and cross-bridge moves straightforward, travel is included in your written quote.",
      },
    ],
  },
  hillcrest: {
    metaDescription:
      "Hillcrest movers for family homes and units near our Glenfield depot. Specialist Movers handles cross-lease driveways and unit access across Hillcrest. Free quote.",
    intro:
      "Hillcrest is a quick run from our Glenfield depot, established family homes, units, and cross-leases we move every week.",
    paragraphs: [
      "Much of Hillcrest is 1960s to 80s homes and brick units down shared driveways, where parking and carry distance matter most. We scope the driveway and door access so the crew works efficiently.",
      "Close to base, Hillcrest moves are easy to schedule, often on shorter notice. House, piano, packing, and office moves are all covered.",
    ],
    highlights: [
      "Minutes from our Glenfield depot",
      "Cross-lease and unit access sorted",
      "Often available on shorter notice",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "How soon can you move me in Hillcrest?",
        a: "Hillcrest is minutes from our Glenfield depot, so it is easy to schedule, often on shorter notice. Contact us for the next available crew.",
      },
      {
        q: "Do you move brick-and-tile units?",
        a: "Yes. many Hillcrest units sit down shared driveways. We plan parking and carry distance at the viewing so the move runs efficiently.",
      },
    ],
  },
  takapuna: {
    metaDescription:
      "Takapuna movers for beachfront apartments and character homes. Specialist Movers plans lift bookings, loading zones, and town-centre parking before move day. Free quote.",
    intro:
      "Takapuna moves split between beachfront apartments and character homes, we plan lift bookings, loading zones, and town-centre parking before move day.",
    paragraphs: [
      "Apartment moves around the town centre and waterfront need lift bookings, loading-dock times, and sometimes building-manager sign-off, we arrange these in advance. Older homes near the lake and Hauraki bring villa steps and narrow drives.",
      "From our nearby North Shore depot we run Takapuna constantly: home relocations, apartments, piano transport, and commercial fit-outs in the business district.",
    ],
    highlights: [
      "Apartment lift and loading-zone planning",
      "Beachfront apartments and character homes",
      "Close to our North Shore depot",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you move apartments in Takapuna?",
        a: "Yes, regularly. We book the lift, confirm loading-zone times, and check any building-manager requirements before move day so there are no hold-ups.",
      },
      {
        q: "Where will the truck park in the town centre?",
        a: "We plan this in advance, finding the closest legal loading zone or arranging building access, so the carry distance is kept short.",
      },
    ],
  },
  albany: {
    metaDescription:
      "Albany movers for new builds, large family homes, and townhouses. Specialist Movers covers Albany, Pinehill, and Oteha with easy motorway access. Free quote.",
    intro:
      "Albany is newer and bigger, large family homes, modern subdivisions, and townhouse blocks across Pinehill and Oteha. We size the crew and truck to match the volume.",
    paragraphs: [
      "Albany's newer homes mean more to move: double garages, multiple living areas, and townhouse complexes with shared parking and access codes. We scope it at the viewing so the right truck and crew turn up.",
      "Sitting on the motorway, Albany is a fast run from our depot and a natural staging point for moves further north. Home relocations, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Large homes and new builds, crew sized to volume",
      "Easy motorway access",
      "Townhouse complex codes and parking handled",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Can you handle large Albany homes?",
        a: "Yes. Albany new builds often have more volume, double garages and multiple living areas. We size the crew and truck to the home so it is done in one efficient run.",
      },
      {
        q: "Do you cover Pinehill, Oteha, and Rosedale?",
        a: "Yes. the wider Albany area is a regular run from our depot, with easy motorway access in and out.",
      },
    ],
  },
  "browns-bay": {
    metaDescription:
      "Browns Bay movers for the East Coast Bays. Specialist Movers covers beachside family homes, units, and downsizes from our North Shore depot. Free quote.",
    intro:
      "Browns Bay and the East Coast Bays mix beachside family homes, units, and retiree downsizes, we plan parking and access for each.",
    paragraphs: [
      "Many Browns Bay homes are 1960s to 70s on the bays' slopes, with sloped driveways and busy beachside parking near the village. We confirm truck placement and carry routes so move day runs smoothly.",
      "We cover the wider Bays, Mairangi, Murrays, and Rothesay, on our regular North Shore schedule. Home relocations, pianos, packing, and downsizing moves are all welcome.",
    ],
    highlights: [
      "Across the East Coast Bays",
      "Sloped-drive and beachside parking planned",
      "Retiree downsizing a specialty",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you help with downsizing moves?",
        a: "Yes. retiree and downsizing moves are common across the Bays. We work at a careful pace and can combine the move with packing or storage when you need it.",
      },
      {
        q: "Do you cover the wider East Coast Bays?",
        a: "Yes. Mairangi Bay, Murrays Bay, Rothesay Bay, and Torbay are all on our regular North Shore schedule.",
      },
    ],
  },
  "long-bay": {
    metaDescription:
      "Long Bay movers for the new subdivision's modern homes and townhouses. Specialist Movers plans complex access codes, shared lanes, and parking. Free quote.",
    intro:
      "Long Bay is one of the Shore's newest neighbourhoods, modern homes and townhouse blocks where access codes, shared lanes, and parking need planning.",
    paragraphs: [
      "The Long Bay development brings large new builds and tightly packed townhouses with shared driveways, visitor-parking limits, and gated access. We confirm these before the truck arrives so there are no hold-ups.",
      "It is an outer-north run from our depot; we schedule Long Bay alongside Torbay and the upper Bays. Home relocations, pianos, and packing are all covered.",
    ],
    highlights: [
      "Gated access and visitor-parking limits handled",
      "Modern homes and townhouse blocks",
      "Scheduled with the upper Bays",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Can you access gated Long Bay complexes?",
        a: "Yes. we confirm gate codes, visitor parking, and shared-lane access before the truck arrives so move day is smooth.",
      },
      {
        q: "Do you move new townhouses?",
        a: "Yes. Long Bay's modern townhouses often have tight internal stairs and shared parking. We plan the carry and protect finishes as we go.",
      },
    ],
  },
  torbay: {
    metaDescription:
      "Torbay movers for hillside coastal homes. Specialist Movers plans steep driveways, narrow winding streets, and carry distance from our North Shore base. Free quote.",
    intro:
      "Torbay is steep and coastal, winding streets and sloped driveways that need a proper access plan before move day.",
    paragraphs: [
      "Many Torbay homes sit up or down steep drives on narrow, winding streets where a large truck cannot always reach the door. We scope carry distance and whether a smaller shuttle vehicle is needed at the viewing.",
      "Torbay is part of our regular upper-Bays schedule from the North Shore depot. Home relocations, pianos, packing, and exit cleans are all covered.",
    ],
    highlights: [
      "Steep-driveway and narrow-street planning",
      "Shuttle vehicle for tight access when needed",
      "Hillside coastal homes",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "What if a large truck cannot reach my Torbay home?",
        a: "We plan for it. on steep or narrow streets we use a smaller shuttle vehicle or work out the carry route at the viewing, so nothing is rushed on the day.",
      },
      {
        q: "Do you move hillside homes with lots of steps?",
        a: "Yes, often. We bring the right crew size and equipment for the steps and tight turns common in Torbay.",
      },
    ],
  },
  silverdale: {
    metaDescription:
      "Silverdale movers for Millwater, new subdivisions, and rural-residential. Specialist Movers covers the northern growth area with travel quoted upfront. Free quote.",
    intro:
      "Silverdale and Millwater are fast-growing, new subdivisions, large homes, and rural-residential blocks at the northern edge of our patch.",
    paragraphs: [
      "Silverdale's new builds bring volume, double garages, sheds, and multiple living areas, while rural-residential lots add long driveways and gates. We scope the whole property so the truck and crew are right-sized.",
      "Silverdale sits in our outer-north zone, so we quote travel clearly upfront, with no surprise callout on the day. Home relocations, pianos, and packing are all covered.",
    ],
    highlights: [
      "New subdivisions and lifestyle blocks",
      "Outer-north travel quoted upfront",
      "Crew sized to larger homes",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Is Silverdale in your service area?",
        a: "Yes. Silverdale and Millwater are in our outer-north zone. We quote travel clearly upfront so there is no surprise callout on the day.",
      },
      {
        q: "Do you move rural-residential and lifestyle blocks?",
        a: "Yes. long driveways, sheds, and outbuildings add volume, so we scope the whole property to size the truck and crew correctly.",
      },
    ],
  },
  orewa: {
    metaDescription:
      "Orewa movers for the Hibiscus Coast. Specialist Movers covers beachfront apartments, family homes, and retiree downsizes, travel quoted upfront. Free quote.",
    intro:
      "Orewa moves run from beachfront apartments along the strip to family homes and retiree downsizes across the Hibiscus Coast.",
    paragraphs: [
      "Orewa's beachfront apartments need lift bookings and loading-zone timing, while the newer hillside subdivisions bring volume and access codes. We plan both at the viewing.",
      "Orewa is in our outer-north zone; travel is quoted upfront with no hidden callout. Home relocations, apartments, pianos, packing, and downsizing are all covered.",
    ],
    highlights: [
      "Beachfront apartment lift and loading planning",
      "Outer-north travel quoted upfront",
      "Retiree downsizing a specialty",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you move Orewa beachfront apartments?",
        a: "Yes. we book the lift and loading zone and confirm building requirements in advance, common for the apartments along the Orewa strip.",
      },
      {
        q: "Is travel to Orewa included in the quote?",
        a: "Orewa is in our outer-north zone; travel is quoted upfront and included in your written price, with no hidden callout.",
      },
    ],
  },
  // ── Inner / West ──
  "grey-lynn": {
    metaDescription:
      "Grey Lynn movers for villas and character homes. We plan narrow streets, on-street parking, and steep villa steps across the inner-west. Free quote.",
    intro:
      "Grey Lynn is villa country, narrow streets, tight on-street parking, and steep front steps that we plan around before move day.",
    paragraphs: [
      "Most Grey Lynn homes are renovated villas and bungalows with narrow hallways, high ceilings, and steps up from the street. We measure doorways and access at your free viewing so big pieces move without drama.",
      "Parking is the inner-west catch, limited driveways and busy permit zones. We sort truck placement early, and the city fringe keeps us close for quick central runs. Home relocations, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Villa and character-home access",
      "On-street parking sorted in advance",
      "Inner-west, close to the city",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Can you get a truck down narrow Grey Lynn streets?",
        a: "Yes. we plan truck size and placement for tight inner-west streets at the viewing, and arrange the closest legal parking so the carry stays short.",
      },
      {
        q: "Do you move renovated villas?",
        a: "Yes, constantly. We protect restored floors, doorways, and narrow hallways, and carry awkward pieces up villa steps with the right crew.",
      },
    ],
  },
  "mount-albert": {
    metaDescription:
      "Mount Albert movers for villas, bungalows, and family homes. Specialist Movers covers Mount Albert with easy Northwestern motorway access. Free quote.",
    intro:
      "Mount Albert mixes character villas and bungalows with newer family homes, we plan access for each and use the handy motorway links.",
    paragraphs: [
      "Many Mount Albert homes are pre-war villas and bungalows with steps and narrow halls, alongside newer townhouses near the town centre and Unitec. We scope the property so the right crew and truck arrive.",
      "Sitting on the Northwestern motorway, Mount Albert is an easy run for city, west, and cross-town moves. Home relocations, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Villas, bungalows, and newer homes",
      "Easy Northwestern motorway access",
      "Free in-home viewing for accurate pricing",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you move character villas in Mount Albert?",
        a: "Yes. we handle villa steps, narrow hallways, and high-value pieces carefully, with doorway and floor protection as standard.",
      },
      {
        q: "How far ahead should I book?",
        a: "Two weeks is ideal for weekends and month-end, though we can often move sooner. Call (021) 228 2728 for the next available crew.",
      },
    ],
  },
  "te-atat": {
    metaDescription:
      "Te Atatū Peninsula movers for harbour-edge homes and new builds. Specialist Movers plans peninsula access and parking with easy motorway links. Free quote.",
    intro:
      "Te Atatū Peninsula is harbour-edge living, 60s and 70s homes and new builds along a single peninsula with one main road in and out.",
    paragraphs: [
      "The peninsula's older homes and recent infill townhouses sit on quiet cul-de-sacs and waterfront streets. We plan truck access and parking, especially on narrower coastal roads, at your viewing.",
      "Right by the Northwestern motorway, Te Atatū is a quick run to the city and west. Home relocations, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Peninsula and waterfront access planned",
      "Older homes and new townhouses",
      "Quick Northwestern motorway run",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you cover all of the Te Atatū Peninsula?",
        a: "Yes, from the motorway end out to the harbour tip. We plan parking and carry distance for narrower coastal streets at the viewing.",
      },
      {
        q: "Can you handle new townhouses on the peninsula?",
        a: "Yes. we plan shared-driveway and parking access and protect finishes in newer builds as we carry.",
      },
    ],
  },
  hobsonville: {
    metaDescription:
      "Hobsonville movers for Hobsonville Point townhouses and apartments. We plan shared lanes, access codes, and parking before move day. Free quote.",
    intro:
      "Hobsonville, and Hobsonville Point especially, is modern and masterplanned: townhouses and apartments with shared lanes, access codes, and tight parking.",
    paragraphs: [
      "Hobsonville Point's terraced homes and apartments have narrow internal stairs, shared driveways, and visitor-parking limits. We confirm codes, lift bookings, and loading spots before the truck arrives so move day flows.",
      "Easy on the Northwestern motorway and a regular run for us. Home relocations, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Hobsonville Point townhouses and apartments",
      "Access codes, lifts, and parking handled",
      "Northwestern motorway access",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Can you access Hobsonville Point complexes?",
        a: "Yes. we confirm gate and lift codes, visitor parking, and loading zones in advance so there are no hold-ups on the day.",
      },
      {
        q: "Do you move narrow terraced townhouses?",
        a: "Yes. tight internal stairs are common at the Point, we bring the right crew and protect walls and finishes on the carry.",
      },
    ],
  },
  titirangi: {
    metaDescription:
      "Titirangi movers for bush-clad homes on steep, winding streets. We plan tight access, steep drives, and carry routes before move day. Free quote.",
    intro:
      "Titirangi is bush living, steep winding streets, long native-shaded driveways, and homes tucked into the hillside that need a real access plan.",
    paragraphs: [
      "Many Titirangi homes sit down steep drives or up bush steps where a large truck cannot get close. We scope the carry route and whether a smaller shuttle vehicle is needed at the viewing, so nothing is rushed.",
      "We cover Titirangi and the western bush fringe on our regular schedule. Home relocations, pianos, packing, and exit cleans are all covered, with care for tight, leafy access.",
    ],
    highlights: [
      "Steep drives and bush-step access planned",
      "Shuttle vehicle for tight sites when needed",
      "Hillside and bush-clad homes",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "My Titirangi driveway is steep and narrow, can you still move me?",
        a: "Yes. we plan for it, using a smaller shuttle vehicle or a planned carry route from the viewing so your gear moves safely.",
      },
      {
        q: "Do you move pianos in Titirangi's hillside homes?",
        a: "Yes. we handle uprights and grands on steep, awkward access with piano boards, padding, and the right crew size.",
      },
    ],
  },
  // ── Central / East (affluent isthmus) ──
  ponsonby: {
    metaDescription:
      "Ponsonby movers for villas and apartments. We plan narrow streets, on-street parking, and character-home steps across the inner city. Free quote.",
    intro:
      "Ponsonby moves mean villas, narrow frontages, and tight on-street parking, we scope all of it before move day so nothing stalls the truck.",
    paragraphs: [
      "Most Ponsonby homes are pre-1920 villas and bungalows with high ceilings, narrow hallways, and steep front steps that make big furniture awkward. We measure access at your free viewing so the crew comes ready.",
      "Parking is the other Ponsonby catch, limited driveways and busy on-street zones, so we plan truck placement and any permits early. Home relocations, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Villa and character-home access",
      "On-street parking and permits planned",
      "Inner-city fringe, close to base routes",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Where will the truck park in Ponsonby?",
        a: "We plan it in advance, finding the closest legal space or arranging a temporary parking spot, so the carry distance stays short on a busy street.",
      },
      {
        q: "Do you move restored villas?",
        a: "Yes, often. We protect restored floors, doorways, and narrow hallways and carry awkward pieces up villa steps with the right crew.",
      },
    ],
  },
  "herne-bay": {
    metaDescription:
      "Herne Bay movers for waterfront villas and grand homes. We handle high-value, large character properties with careful, planned access. Free quote.",
    intro:
      "Herne Bay is Auckland's premium address, large waterfront villas and grand character homes that deserve careful, well-planned moves.",
    paragraphs: [
      "Herne Bay's homes are often big, high-value villas on narrow leafy streets, with valuable contents, fragile pieces, and tight street parking. We plan crew, protection, and truck placement thoroughly at the viewing.",
      "We handle these moves at a careful pace with full furniture protection. Home relocations, pianos, packing, art and antiques, and office relocations are all covered.",
    ],
    highlights: [
      "Large, high-value villa moves",
      "Careful handling of art and antiques",
      "Street parking and access planned",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Can you handle high-value and fragile contents?",
        a: "Yes. we wrap and protect art, antiques, and fragile pieces, and can arrange transit insurance options, ask when you request your quote.",
      },
      {
        q: "Do you move large Herne Bay villas?",
        a: "Yes. we size the crew to the home and plan protection and parking so a big villa move runs calmly from start to finish.",
      },
    ],
  },
  parnell: {
    metaDescription:
      "Parnell movers for villas, apartments, and city-fringe homes. We plan steep streets, apartment lifts, and tight parking. Free quote.",
    intro:
      "Parnell, Auckland's oldest suburb, mixes heritage villas with city-fringe apartments on steep, narrow streets, we plan for both.",
    paragraphs: [
      "Parnell's character villas have steep steps and narrow halls, while the apartments need lift bookings and loading-zone timing. We confirm which you have and plan access before move day.",
      "On the city fringe, Parnell is a quick run for central and cross-town moves. Home relocations, apartments, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Heritage villas and city apartments",
      "Lift bookings and loading zones arranged",
      "City-fringe, quick central access",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you move Parnell apartments?",
        a: "Yes. we book the lift, confirm loading-zone times, and check building requirements in advance so the move runs without hold-ups.",
      },
      {
        q: "Can you handle steep Parnell driveways and steps?",
        a: "Yes. we plan the carry route at the viewing and bring the crew and gear to handle steps and tight access safely.",
      },
    ],
  },
  remuera: {
    metaDescription:
      "Remuera movers for large character homes and leafy estates. We size crews to big-volume moves with careful handling. Free in-home viewing.",
    intro:
      "Remuera means large, leafy character homes, plenty of volume, valuable contents, and the occasional steep drive that we plan for.",
    paragraphs: [
      "Remuera homes are typically big, grand villas and substantial family homes with multiple living areas, so volume is the main factor. We scope the whole house at the viewing to size the crew and truck and avoid a second trip.",
      "We move at a careful pace with full protection for high-value contents. Home relocations, pianos, packing, art and antiques, and office relocations are all covered.",
    ],
    highlights: [
      "Crew sized to large, high-volume homes",
      "Careful handling of valuable contents",
      "Free in-home viewing for accurate pricing",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you handle large Remuera homes in one move?",
        a: "Yes. we scope the full volume at the viewing and bring the right truck and crew so a big home is done in a single efficient run.",
      },
      {
        q: "Can you move pianos and valuable items?",
        a: "Yes. uprights and grands are wrapped and carried on boards, and we protect art, antiques, and fragile pieces throughout.",
      },
    ],
  },
  epsom: {
    metaDescription:
      "Epsom movers for villas, bungalows, and grammar-zone family homes. Specialist Movers covers Epsom with a free in-home viewing and fixed pricing. Free quote.",
    intro:
      "Epsom is classic family-home territory, villas, bungalows, and the busy double-grammar zone, moved carefully with clear pricing.",
    paragraphs: [
      "Epsom's pre-war villas and bungalows bring steps, narrow hallways, and established gardens to work around. We scope access and volume at your free viewing so your fixed price matches the real job.",
      "Central and well-connected, Epsom is an easy run for city and cross-town moves. Home relocations, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Villas, bungalows, and family homes",
      "Free in-home viewing, fixed pricing",
      "Central, easy cross-town access",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you move character homes in Epsom?",
        a: "Yes. we handle villa steps and narrow halls carefully, with doorway and floor protection as standard.",
      },
      {
        q: "How far ahead should I book an Epsom move?",
        a: "Two weeks is ideal for weekends and month-end. We can often move sooner, call for the next available crew.",
      },
    ],
  },
  "mt-eden": {
    metaDescription:
      "Mount Eden movers for villas, bungalows, and village character homes. Specialist Movers plans narrow streets and steep steps around the maunga. Free quote.",
    intro:
      "Mount Eden is character living around the maunga, villas and bungalows on narrow streets with steps and tight parking.",
    paragraphs: [
      "Most Mount Eden homes are pre-war villas and bungalows with front steps, narrow halls, and limited off-street parking near the village. We measure access at the viewing so big pieces move smoothly.",
      "Close to the city, Mount Eden is a quick central run. Home relocations, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Villa and bungalow character homes",
      "Narrow-street parking planned",
      "Close to the city centre",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Can you move villas with steep front steps?",
        a: "Yes, often. We bring the right crew and protect doorways and floors as we carry awkward pieces up and down steps.",
      },
      {
        q: "Where will the truck park near Mount Eden village?",
        a: "We plan the closest legal spot in advance so the carry stays short, even on narrow or busy streets.",
      },
    ],
  },
  newmarket: {
    metaDescription:
      "Newmarket movers for apartments and city-fringe homes. Specialist Movers plans lift bookings, loading zones, and tight retail-district parking. Free quote.",
    intro:
      "Newmarket is busy and central, apartments and city-fringe homes around the retail district where parking and lift access need planning.",
    paragraphs: [
      "Newmarket apartment moves need lift bookings, loading-dock times, and sometimes building-manager sign-off, we arrange these ahead. Older homes on the fringe bring villa steps and narrow drives.",
      "Central and well-connected, Newmarket is a quick run for city and cross-town moves, including office relocations in the commercial district. Home relocations, pianos, and packing are all covered.",
    ],
    highlights: [
      "Apartment lifts and loading zones arranged",
      "Retail-district parking planned",
      "Office and commercial moves",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you move Newmarket apartments?",
        a: "Yes. we book the lift, confirm loading-zone times, and check building requirements in advance so there are no hold-ups.",
      },
      {
        q: "Can you do office moves in Newmarket?",
        a: "Yes. we handle commercial and office relocations in the district, planned around access and after-hours timing when needed.",
      },
    ],
  },
  "st-heliers": {
    metaDescription:
      "St Heliers movers for eastern-bays beachside homes and apartments. We cover St Heliers, Kohimarama, and Mission Bay with planned access. Free quote.",
    intro:
      "St Heliers is eastern-bays beachside living, family homes and apartments near the village and waterfront, moved with planned access and parking.",
    paragraphs: [
      "St Heliers homes range from character bungalows to clifftop homes and beachfront apartments. The apartments need lift and loading-zone bookings, while hillside homes bring steep drives. We plan both at the viewing.",
      "We cover the eastern bays, Kohimarama, Mission Bay, and Glendowie, on our regular schedule. Home relocations, apartments, pianos, packing, and downsizing are all covered.",
    ],
    highlights: [
      "Beachside homes and apartments",
      "Lift, loading, and steep-drive access planned",
      "Across the eastern bays",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you move St Heliers beachfront apartments?",
        a: "Yes. we book the lift and loading zone and confirm building requirements in advance for waterfront apartment moves.",
      },
      {
        q: "Do you cover the wider eastern bays?",
        a: "Yes. Kohimarama, Mission Bay, and Glendowie are all on our regular schedule alongside St Heliers.",
      },
    ],
  },
  // ── Priority additions ──
  greenhithe: {
    metaDescription:
      "Greenhithe movers for Upper Harbour homes and lifestyle blocks. We plan long driveways and access from our nearby North Shore base. Free quote.",
    intro:
      "Greenhithe is leafy Upper Harbour living, larger homes and semi-rural lifestyle blocks with long driveways we plan around.",
    paragraphs: [
      "Many Greenhithe properties sit on big sections with long or shared driveways and plenty of volume. We scope the whole property at the viewing so the right truck and crew arrive.",
      "Close to our North Shore base with easy Upper Harbour motorway access. Home relocations, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Upper Harbour homes and lifestyle blocks",
      "Long-driveway access planned",
      "Easy Upper Harbour motorway run",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you move large Greenhithe properties?",
        a: "Yes. we size the crew and truck to bigger homes and lifestyle blocks, scoped at the viewing so it is done in one run.",
      },
      {
        q: "Can you handle long or shared driveways?",
        a: "Yes. we check driveway length, turning, and parking so the truck gets as close as possible and the carry is planned.",
      },
    ],
  },
  "stanmore-bay": {
    metaDescription:
      "Stanmore Bay movers on the Whangaparāoa Peninsula. We cover Hibiscus Coast homes with outer-north travel quoted upfront. Free quote.",
    intro:
      "Stanmore Bay sits on the Whangaparāoa Peninsula, beachside Hibiscus Coast homes we cover on our outer-north schedule.",
    paragraphs: [
      "Peninsula homes range from older beachside houses to newer subdivisions, with one main road along the peninsula and parking that gets busy near the coast. We plan access and timing at the viewing.",
      "Stanmore Bay is in our outer-north zone, so travel is quoted clearly upfront. Home relocations, pianos, packing, and downsizing are all covered.",
    ],
    highlights: [
      "Whangaparāoa Peninsula coverage",
      "Outer-north travel quoted upfront",
      "Beachside homes and new subdivisions",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Is Stanmore Bay in your service area?",
        a: "Yes. Stanmore Bay and the Whangaparāoa Peninsula are in our outer-north zone, travel is quoted upfront with no surprise callout.",
      },
      {
        q: "How far ahead should I book?",
        a: "Two weeks is ideal for weekends. Call (021) 228 2728 for the next crew heading up the Hibiscus Coast.",
      },
    ],
  },
  "red-beach": {
    metaDescription:
      "Red Beach movers on the Hibiscus Coast. We cover beachside family homes and new subdivisions, outer-north travel quoted upfront. Free quote.",
    intro:
      "Red Beach is Hibiscus Coast beachside living, family homes and newer subdivisions we cover on our outer-north schedule.",
    paragraphs: [
      "Red Beach mixes established beachside homes with newer developments. We plan parking and access, busy near the beach, at the viewing.",
      "Red Beach is in our outer-north zone with travel quoted upfront. Home relocations, pianos, packing, and downsizing are all covered.",
    ],
    highlights: [
      "Hibiscus Coast beachside homes",
      "Outer-north travel quoted upfront",
      "Established homes and new subdivisions",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Is Red Beach in your service area?",
        a: "Yes. Red Beach is in our outer-north Hibiscus Coast zone, travel is quoted upfront.",
      },
      {
        q: "Do you do downsizing moves?",
        a: "Yes. we handle retiree and downsizing moves at a careful pace, with packing and storage available.",
      },
    ],
  },
  "dairy-flat": {
    metaDescription:
      "Dairy Flat movers for rural and lifestyle properties. We cover the outer-north countryside, long driveways and travel quoted upfront. Free quote.",
    intro:
      "Dairy Flat is rural outer-north, lifestyle blocks, long driveways, and sheds that add volume and need a viewing.",
    paragraphs: [
      "Dairy Flat properties are often on acreage with long driveways, gates, and outbuildings, so volume and access are the key factors. We scope the whole property before quoting.",
      "Dairy Flat is in our outer-north zone with travel quoted clearly upfront. Home relocations, pianos, packing, and farm-gate pickups are all covered.",
    ],
    highlights: [
      "Rural and lifestyle properties",
      "Long driveways and outbuildings scoped",
      "Outer-north travel quoted upfront",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you cover rural Dairy Flat properties?",
        a: "Yes. lifestyle blocks and acreage are covered. We scope driveways, gates, and sheds at the viewing so volume and access are clear.",
      },
      {
        q: "Is travel included?",
        a: "Dairy Flat is in our outer-north zone; travel is quoted upfront and included in your written price.",
      },
    ],
  },
  "point-chevalier": {
    metaDescription:
      "Point Chevalier movers for villas, bungalows, and beachside homes. We plan narrow streets and parking on the inner-west peninsula. Free quote.",
    intro:
      "Point Chevalier is a beachside inner-west peninsula, villas and bungalows on quiet streets near the coast that we plan access for.",
    paragraphs: [
      "Pt Chev's pre-war villas and bungalows bring steps and narrow hallways, while the peninsula's quiet streets and beach reserves shape parking. We plan truck placement at the viewing.",
      "On the Northwestern motorway, Point Chevalier is a quick city and west run. Home relocations, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Villa and bungalow access",
      "Beachside peninsula parking planned",
      "Quick Northwestern motorway run",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you move villas in Point Chevalier?",
        a: "Yes. we handle villa steps and narrow halls carefully, with doorway and floor protection as standard.",
      },
      {
        q: "Where will the truck park?",
        a: "We plan the closest legal spot in advance so the carry stays short on Pt Chev's quieter streets.",
      },
    ],
  },
  "west-harbour": {
    metaDescription:
      "West Harbour movers for Upper Harbour homes and marina-side streets. We plan access and parking from our nearby base. Free quote.",
    intro:
      "West Harbour sits on the Upper Harbour, family homes and marina-side properties we cover with easy motorway access.",
    paragraphs: [
      "West Harbour homes range from 80s and 90s family houses to newer builds, often on sloped sections with shared driveways. We scope access and parking at the viewing.",
      "Close to the Upper Harbour motorway, West Harbour is a quick run for city and west moves. Home relocations, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Upper Harbour family homes",
      "Sloped-section and driveway access planned",
      "Easy Upper Harbour motorway run",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you cover West Harbour and Marina View?",
        a: "Yes. West Harbour and the marina-side streets are on our regular west schedule.",
      },
      {
        q: "Can you handle sloped driveways?",
        a: "Yes. we plan carry routes and parking for sloped sections at the viewing so move day runs smoothly.",
      },
    ],
  },
  riverhead: {
    metaDescription:
      "Riverhead movers for village homes and lifestyle blocks. We cover the outer north-west, long driveways and travel quoted upfront. Free quote.",
    intro:
      "Riverhead is outer north-west village and lifestyle living, growing subdivisions and rural blocks at the edge of our patch.",
    paragraphs: [
      "Riverhead mixes new village subdivisions with rural lifestyle blocks, long driveways, sheds, and volume that we scope before quoting.",
      "Riverhead sits in our outer north-west zone with travel quoted upfront. Home relocations, pianos, packing, and farm-gate pickups are all covered.",
    ],
    highlights: [
      "Village homes and lifestyle blocks",
      "Outer north-west travel quoted upfront",
      "Long driveways and sheds scoped",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Is Riverhead in your service area?",
        a: "Yes. Riverhead is in our outer north-west zone, travel is quoted clearly upfront.",
      },
      {
        q: "Do you move lifestyle blocks?",
        a: "Yes. we scope long driveways, gates, and outbuildings so the truck and crew are right-sized.",
      },
    ],
  },
  "st-johns": {
    metaDescription:
      "St Johns movers for family homes near Meadowbank and Stonefields. We plan access and parking on the central-east fringe. Free quote.",
    intro:
      "St Johns sits between Remuera and the eastern bays, established family homes and newer Stonefields-edge builds we move regularly.",
    paragraphs: [
      "St Johns homes range from post-war houses to newer townhouses near Stonefields, with a mix of driveways and shared access. We scope it at the viewing so pricing matches the job.",
      "Central and well-connected, St Johns is a quick cross-town run. Home relocations, pianos, packing, and office relocations are all covered.",
    ],
    highlights: [
      "Family homes and newer townhouses",
      "Driveway and shared-access planning",
      "Quick central-east access",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you cover St Johns and Stonefields?",
        a: "Yes. St Johns and the Stonefields edge are on our regular central-east schedule.",
      },
      {
        q: "How far ahead should I book?",
        a: "Two weeks is ideal for peak dates, though we can often move sooner, call for the next crew.",
      },
    ],
  },
  glendowie: {
    metaDescription:
      "Glendowie movers for eastern-bays family homes. We cover Glendowie and St Heliers with planned access and parking. Free quote.",
    intro:
      "Glendowie is leafy eastern-bays living, larger family homes near the coast and St Heliers that we move with planned access.",
    paragraphs: [
      "Glendowie homes are often substantial family houses on bigger sections, some with steep drives down toward the water. We scope volume and access at the viewing so the right crew arrives.",
      "We cover Glendowie alongside St Heliers, Kohimarama, and Mission Bay. Home relocations, pianos, packing, and downsizing are all covered.",
    ],
    highlights: [
      "Eastern-bays family homes",
      "Steep-drive and access planning",
      "Covered with the wider eastern bays",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you cover Glendowie and the eastern bays?",
        a: "Yes. Glendowie, St Heliers, Kohimarama, and Mission Bay are all on our regular schedule.",
      },
      {
        q: "Can you handle steep driveways toward the water?",
        a: "Yes. we plan the carry route and parking at the viewing so steep or narrow access is sorted before the day.",
      },
    ],
  },
  cambridge: {
    extraParagraphs: [
      `Cambridge is a strong piano corridor, we move uprights and grands for homes, schools, and music retailers across town and nearby lifestyle blocks. ${pianoProtection}`,
      `Rural driveways, equestrian properties, and town-centre villas all need a viewing so we plan truck access and crew size. ${waikatoInAreaPricing}`,
    ],
    faqs: [
      {
        q: "Do you cover rural properties around Cambridge?",
        a: "Yes. lifestyle blocks, dairy farms, and rural driveways around Cambridge are part of our regular Hamilton schedule. We visit before larger home relocations so access and volume are clear in your fixed quote.",
      },
      {
        q: "How far in advance should I book a Cambridge move?",
        a: "Two weeks ahead is ideal for weekends and month-end. We can often move sooner, call (021) 228 2728 and we will check the next Hamilton crew available for Cambridge.",
      },
      {
        q: "Are travel costs included in my Cambridge quote?",
        a: "Yes. Cambridge sits in our in-area Waikato zone from Hamilton. Travel is built into your written quote, not added as a surprise on move day.",
      },
    ],
  },
  morrinsville: {
    extraParagraphs: [
      `Morrinsville sees steady demand for home relocations, farm-gate pickups, and piano transport for homes and local retailers. ${pianoProtection}`,
      `Town-centre villas and rural properties on the outskirts both benefit from a viewing so we send the right truck and crew. ${waikatoInAreaPricing}`,
    ],
    faqs: [
      {
        q: "Do you cover rural properties around Morrinsville?",
        a: "Yes. town and rural Morrinsville properties are serviced from our Hamilton base. We scope driveways, gates, and carrying distance at your viewing.",
      },
      {
        q: "How far in advance should I book?",
        a: "Book two weeks ahead when you can, especially for end-of-month dates. Shorter notice is often possible, contact us for the next available slot.",
      },
      {
        q: "Are travel costs included in the quote?",
        a: "Yes. Morrinsville is in our in-area Waikato pricing from Hamilton. Your quote includes travel; there is no separate callout on the day.",
      },
    ],
  },
  "te-awamutu": {
    extraParagraphs: [
      `Te Awamutu moves include house relocations, commercial runs, and regular piano transport for homes and music schools. ${pianoProtection}`,
      waikatoInAreaPricing,
    ],
    faqs: [
      {
        q: "Do you cover rural properties around Te Awamutu?",
        a: "Yes. we cover Te Awamutu town and surrounding rural roads from Hamilton. A viewing locks in truck access and a fixed house-move price.",
      },
      {
        q: "How far in advance should I book?",
        a: "Two weeks is recommended for peak dates. Call us for shorter-notice moves, we schedule Te Awamutu jobs several times each week.",
      },
      {
        q: "Are travel costs included?",
        a: "Yes. Te Awamutu is in-area from Hamilton. Travel is included in your written quote upfront.",
      },
    ],
  },
  matamata: {
    extraParagraphs: [
      `Matamata and nearby rural properties need clear access planning, we visit before larger home relocations. Piano moves for homes and local businesses use padded blankets, shrink wrap, and specialist crews. ${pianoProtection}`,
      `Matamata sits in Waikato Zone C from our Hamilton base, travel is quoted clearly when you book. ${waikatoInAreaPricing}`,
    ],
    faqs: [
      {
        q: "Do you cover rural properties around Matamata?",
        a: "Yes. Matamata town and surrounding rural roads are covered from Hamilton. We confirm driveways, gates, and volume at a viewing.",
      },
      {
        q: "How far in advance should I book a Matamata move?",
        a: "Two weeks ahead is best for weekends. We can often accommodate shorter notice, call for the next crew heading through Matamata.",
      },
      {
        q: "Are travel costs included in the quote?",
        a: "Yes. travel from Hamilton is included in your written price for in-area Matamata jobs. Zone callout, if applicable, is confirmed before you book.",
      },
    ],
  },
  huntly: {
    metaDescription:
      "Huntly movers on the Hamilton to Auckland corridor. We cover town and riverside homes from our Hamilton base, travel quoted upfront. Free quote.",
    intro:
      "Huntly sits on the Waikato River and the main Hamilton to Auckland route, a regular stop on our corridor runs from the Hamilton base.",
    paragraphs: [
      "We move Huntly town homes, riverside properties, and rural blocks on the town's edge. Larger moves get a viewing so driveways, access, and volume are clear before we lock your price.",
      `Being right on the corridor, Huntly is easy to schedule alongside Hamilton and Auckland jobs. Home relocations, pianos, packing, and commercial work are all covered. ${waikatoInAreaPricing}`,
    ],
    highlights: [
      "On the Hamilton to Auckland corridor",
      "Town, riverside, and rural blocks",
      "Travel quoted upfront from Hamilton",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Is Huntly easy to schedule?",
        a: "Yes. Huntly is right on our Hamilton to Auckland corridor, so we can often combine it with other jobs and offer flexible dates.",
      },
      {
        q: "Are travel costs included for Huntly?",
        a: "Yes. Huntly is in our in-area Waikato pricing from Hamilton, travel is in your written quote, with no surprise callout.",
      },
    ],
  },
  ngaruawahia: {
    metaDescription:
      "Ngāruawāhia movers minutes from our Hamilton base. Specialist Movers covers town and rural moves at the river confluence, travel quoted upfront. Free quote.",
    intro:
      "Ngāruawāhia sits where the Waikato and Waipā rivers meet, just up the road from our Hamilton base, so it is a quick, low-travel run.",
    paragraphs: [
      "We move town homes, riverside properties, and rural blocks around Ngāruawāhia. A viewing before larger moves keeps driveways, gates, and volume clear in your fixed quote.",
      `Close to Hamilton, Ngāruawāhia is easy to schedule on short notice. Home relocations, pianos, packing, and commercial work are all covered. ${waikatoInAreaPricing}`,
    ],
    highlights: [
      "Minutes from our Hamilton base",
      "Town and rural-block access planned",
      "Travel quoted upfront",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "How close is Ngāruawāhia to your base?",
        a: "Just up the road from Hamilton, so it is a quick, low-travel run that is easy to schedule, often on shorter notice.",
      },
      {
        q: "Are travel costs included?",
        a: "Yes. Ngāruawāhia is in-area from Hamilton, travel is built into your written quote with no separate callout.",
      },
    ],
  },
  raglan: {
    metaDescription:
      "Raglan movers for the coast. Specialist Movers covers Raglan baches, homes, and hillside properties from our Hamilton base, travel quoted upfront. Free quote.",
    intro:
      "Raglan is the Waikato's surf coast, about 45 minutes from our Hamilton base, with baches, family homes, and hillside properties above the harbour.",
    paragraphs: [
      "Raglan's coastal and hillside homes often have steep or narrow access and holiday-home timing to work around. We scope the carry route and access at the viewing so the move runs smoothly.",
      `We run Raglan from Hamilton with travel quoted clearly upfront. Home relocations, pianos, packing, and bach relocations are all covered. ${waikatoInAreaPricing}`,
    ],
    highlights: [
      "Coastal, bach, and hillside homes",
      "Steep or narrow access planned",
      "Travel from Hamilton quoted upfront",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you cover Raglan's hillside and coastal homes?",
        a: "Yes. we plan steep or narrow access and the carry route at the viewing so coastal and hillside moves go smoothly.",
      },
      {
        q: "Is travel to Raglan included?",
        a: "Yes. Raglan is quoted from our Hamilton base with travel included upfront, no hidden callout on the day.",
      },
    ],
  },
  tauranga: {
    extraParagraphs: [
      `Piano transport between Hamilton and Tauranga uses padded blankets, shrink wrap, piano boards for grands, and securing straps inside our trucks. ${pianoProtection}`,
      `Tauranga and Papamoa moves are quoted as regional routes from Hamilton. ${regionalPricing}`,
    ],
    faqs: [
      {
        q: "How much does it cost to move a piano to Tauranga?",
        a: "Piano moves to Tauranga are quoted individually, uprights and grands are priced with stairs, access, and travel included. Request a quote online or call (021) 228 2728 for a firm price.",
      },
      {
        q: "How long does a Hamilton to Tauranga move take?",
        a: "Most regional house loads are a full day including travel and unload. We confirm crew arrival, drive time, and completion window when we quote.",
      },
      {
        q: "How is furniture protected on longer routes?",
        a: "Yes. blankets, wrap, and strapping are standard on every load. Items are secured inside the truck for the full journey; pianos and fragile pieces get extra padding.",
      },
      {
        q: "Are travel costs included upfront?",
        a: "Yes. Tauranga routes are quoted with travel and access included before you confirm. No hidden fees on move day.",
      },
    ],
  },
  rotorua: {
    extraParagraphs: [
      `Rotorua piano moves use specialist equipment, piano boards, padded blankets, shrink wrap, and experienced crews for uprights and grands. ${pianoProtection}`,
      regionalPricing,
    ],
    faqs: [
      {
        q: "How much does it cost to move a piano to Rotorua?",
        a: "Each piano move is quoted on stairs, piano type, and access, travel from Hamilton is included in your written price. Uprights and grands are priced separately before you book.",
      },
      {
        q: "How long does a Hamilton to Rotorua move take?",
        a: "Most regional moves are one full day including travel and unload. We give you an arrival window and completion estimate when we quote.",
      },
      {
        q: "How is furniture protected on longer routes?",
        a: "Yes. furniture is blanket-wrapped and strapped for the full drive. Fragile and high-value items are boxed or extra-padded before loading.",
      },
      {
        q: "Are travel costs included in the quote?",
        a: "Yes. Rotorua routes are quoted with travel included upfront. You approve the full price before move day.",
      },
    ],
  },
  taupo: {
    extraParagraphs: [
      `Taupo piano and home relocations use the same careful wrapping, blankets, shrink wrap, and secure strapping for the longer drive. ${pianoProtection}`,
      regionalPricing,
    ],
    faqs: [
      {
        q: "How much does it cost to move to Taupo?",
        a: "Taupo moves are quoted individually based on volume, access, and travel from Hamilton. You receive a written price before you confirm, typically one day on site for a full house load.",
      },
      {
        q: "How long does a move to Taupo take?",
        a: "Most Taupo jobs are a full day including travel and unload. Multi-day or storage legs are quoted clearly if your settlement dates do not align.",
      },
      {
        q: "How is furniture protected on longer routes?",
        a: "Yes. standard blanket wrap and truck strapping apply on every Taupo run. Pianos and fragile items receive specialist padding.",
      },
      {
        q: "Are travel costs included?",
        a: "Yes. travel from Hamilton is built into your quote before you book. No surprise travel charge on the day.",
      },
    ],
  },
  thames: {
    extraParagraphs: [
      `Thames and Coromandel gateway moves often include coastal access and longer drive times, we quote travel clearly from Hamilton. ${pianoProtection}`,
      regionalPricing,
    ],
    faqs: [
      {
        q: "How much does it cost to move to Thames?",
        a: "Thames moves are quoted as a regional route from Hamilton with travel included. Price depends on volume, access, and property type, we confirm in writing before you book.",
      },
      {
        q: "How long does a move to Thames take?",
        a: "Most Thames jobs are one full day including travel and unload. Narrow access or hillside properties may need extra crew time, scoped at viewing.",
      },
      {
        q: "How is furniture protected on the drive?",
        a: "Yes. blankets, wrap, and internal truck strapping are standard. Coastal humidity is managed with proper wrap so items arrive dry and secure.",
      },
      {
        q: "Are travel costs included upfront?",
        a: "Yes. Thames routes are quoted with travel included. You see the full price before you confirm.",
      },
    ],
  },
  wellington: {
    extraParagraphs: [
      `Long-distance moves to Wellington are planned in stages, viewing or detailed inventory, written quote, confirmed dates, then load, travel, and unload with the same crew lead throughout.`,
      `Piano transport on long routes uses padded blankets, shrink wrap, piano boards, and dedicated securing inside the truck. Transit insurance options are available, ask when you quote. ${longDistancePricing}`,
    ],
    faqs: [
      {
        q: "How long does a move to Wellington take?",
        a: "Most Wellington routes are two days, load day, overnight travel, and unload the next day. We confirm timing and crew plan in your written quote.",
      },
      {
        q: "What is included in a long-distance quote?",
        a: "Yes. labour, truck, travel, standard wrapping, and unload are included. Packing, storage, piano specialist handling, and insurance are itemised when you need them.",
      },
      {
        q: "How is a piano protected on a long route to Wellington?",
        a: "Yes. pianos are blanket-wrapped, shrink-wrapped, and strapped on boards inside the truck. Grands are tilted and padded; uprights are secured upright for the full journey.",
      },
      {
        q: "Do you do return trips from Wellington?",
        a: "Yes. return loads and backhaul dates are often available. Call with your dates and we will match a return trip where possible.",
      },
      {
        q: "How far in advance should I book a Wellington move?",
        a: "Four weeks ahead is ideal for long-distance routes. Two weeks minimum for month-end, call early to secure your preferred dates.",
      },
    ],
  },
  napier: {
    extraParagraphs: [
      `Napier and Hastings Hawke's Bay routes are quoted as dedicated regional moves from Hamilton with travel included upfront. ${pianoProtection}`,
      longDistancePricing,
    ],
    faqs: [
      {
        q: "How long does a move to Napier take?",
        a: "Most Napier routes are two days, load, travel, and unload. We confirm drive time and crew plan when we quote.",
      },
      {
        q: "What is included in a Napier move quote?",
        a: "Yes. crew, truck, travel, and standard furniture protection are included. Packing, storage, and specialist piano handling are added when required.",
      },
      {
        q: "How is a piano protected on the Napier route?",
        a: "Yes. padded blankets, shrink wrap, and piano boards are standard. The piano is secured inside the truck for the full Hawke's Bay drive.",
      },
      {
        q: "How far in advance should I book?",
        a: "Three to four weeks ahead is best for Hawke's Bay routes. Call (021) 228 2728 for shorter-notice availability.",
      },
      {
        q: "Do you do return trips from Napier?",
        a: "Yes. return loads and backhaul dates are often available. Call with your dates and we will match a return trip where possible.",
      },
    ],
  },
  hastings: {
    extraParagraphs: [
      `Hastings moves cover horticulture properties, town homes, and commercial sites across Hawke's Bay, quoted with travel from Hamilton included. ${pianoProtection}`,
      longDistancePricing,
    ],
    faqs: [
      {
        q: "How long does a move to Hastings take?",
        a: "Most Hastings jobs are two days including travel from Hamilton. Same-day regional loads are quoted individually when distance allows.",
      },
      {
        q: "What is included in a Hastings move quote?",
        a: "Yes. labour, truck, travel, and blanket wrap are included in your written price. Add-ons like packing or storage are listed separately.",
      },
      {
        q: "How is furniture protected on longer routes?",
        a: "Yes. furniture is wrapped and strapped for the full drive. Pianos and fragile items get specialist padding and securing.",
      },
      {
        q: "How far in advance should I book?",
        a: "Book three to four weeks ahead for Hawke's Bay routes when possible. We will confirm your dates when you request a quote.",
      },
      {
        q: "Do you do return trips from Hastings?",
        a: "Yes. return loads and backhaul dates are often available on Hawke's Bay routes. Call with your dates and we will check availability.",
      },
    ],
  },
  "palmerston-north": {
    extraParagraphs: [
      `Palmerston North sits on our lower North Island corridor from Hamilton, house, office, piano, and commercial moves with travel quoted upfront. ${pianoProtection}`,
      longDistancePricing,
    ],
    faqs: [
      {
        q: "How long does a move to Palmerston North take?",
        a: "Most Palmerston North routes are two days, load day, travel, and unload. Timing is confirmed in your written quote.",
      },
      {
        q: "What is included in a long-distance quote?",
        a: "Yes. crew, truck, travel, and standard protection are included. Specialist piano handling, packing, and insurance are itemised when needed.",
      },
      {
        q: "How is a piano protected on the route?",
        a: "Yes. blankets, shrink wrap, and piano boards are used on every piano move. The instrument is secured inside the truck for the full journey.",
      },
      {
        q: "How far in advance should I book?",
        a: "Three weeks ahead is recommended for Manawatu routes. Call for availability on shorter notice.",
      },
      {
        q: "Do you do return trips from Palmerston North?",
        a: "Yes. return loads and backhaul dates are often available on lower North Island routes. Call with your dates and we will match a return trip where possible.",
      },
    ],
  },
};

export function applyLocationSeo(location: Location): Location {
  const patch = locationSeoPatches[location.slug];
  if (!patch) return location;
  const body = patch.paragraphs ?? location.paragraphs;
  return {
    ...location,
    metaDescription: patch.metaDescription ?? location.metaDescription,
    intro: patch.intro ?? location.intro,
    paragraphs: patch.extraParagraphs
      ? [...body, ...patch.extraParagraphs]
      : body,
    highlights: patch.highlights ?? location.highlights,
    faqs: patch.faqs ?? location.faqs,
  };
}
