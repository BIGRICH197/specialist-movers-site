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
      "Close to base, Hillcrest moves are easy to schedule, often on shorter notice. Home relocations, piano, packing, and office moves are all covered.",
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
      "Looking for movers in Takapuna? Specialist Movers covers all of Takapuna from our nearby Wairau Valley depot. Dozens of local moves completed.",
    intro:
      "Takapuna is one of the Shore's most varied suburbs to move in. You have got high-rise apartments on the beachfront, older brick-and-tile units behind the main strip, and solid three-bedroom homes on established streets further back.",
    paragraphs: [
      "The apartment buildings along The Strand and around the lake end of Takapuna come with their own set of logistics. Lift bookings, loading zone permits, and body corporate rules all need sorting before the truck arrives. We ask those questions early so move day does not stall waiting for a lift or a warden.",
      "The older character homes on streets like Anzac and Huron tend to have generous rooms but tight driveway access and mature trees that can make reversing a truck tricky. Our crew scopes the property before move day for anything that needs a rethink. We bring the right gear rather than muscle through it.",
      "We are based in Wairau Valley, about four kilometres away. That puts us in Takapuna in roughly nine minutes. It also means we are in zone A for pricing, so there is no distance premium added to your quote. You see the full price before you confirm anything.",
      "Takapuna has a lot of long-term residents downsizing into smaller homes or beachside apartments. That often means decades of furniture and effects that need careful handling. We offer a packing service the day before the move if you want a hand getting everything boxed up properly.",
    ],
    highlights: [
      "Apartment lift bookings and loading zones sorted in advance",
      "Tight Takapuna driveway access scoped before move day",
      "Zone A pricing, no distance premium from Wairau Valley",
      "Dozens of Takapuna moves completed",
    ],
    faqs: [
      {
        q: "My apartment building requires a lift booking and a bond. Can you handle that?",
        a: "Yes. We deal with body corporate lift bookings regularly in Takapuna. Tell us the building and we will contact the building manager ahead of time, confirm the booking window, and plan the job around it. You should still check the body corporate rules yourself, but we are used to the process.",
      },
      {
        q: "The street outside my place fills up fast. How do you manage parking for the truck?",
        a: "For busy Takapuna streets we look at the loading zone situation when we quote the job. If a temporary parking permit or a cone run is needed to hold space, we talk that through with you beforehand. Turning up without a plan and hoping for a gap does not work in this suburb.",
      },
      {
        q: "I am downsizing from a large family home in Takapuna to a smaller apartment. Is that a straightforward job for you?",
        a: "We do a lot of these. The key is knowing what is going to the new place and what is not before the truck is loaded. We can help with packing the day before if that is useful. For bigger homes we also offer a free in-home viewing so the quote is accurate and there are no surprises on the day.",
      },
      {
        q: "How quickly can I get a quote for a Takapuna move?",
        a: "Send us the details online and we aim to have a quote back to you in about 15 minutes during business hours. Hourly rates are the same across Auckland. The fixed callout for Takapuna is in our standard zone, so the price you see upfront is what you pay.",
      },
    ],
  },
  albany: {
    metaDescription:
      "Albany movers with dozens of local jobs done. Specialist Movers handles large family homes, Pinehill townhouses, and everything in between. Get a quote in 15 minutes.",
    intro:
      "Albany is one of the Shore's biggest and busiest suburbs, large homes on generous sections, multi-storey townhouse blocks, and everything in between. We have completed dozens of moves here and know what each property type asks of a crew.",
    paragraphs: [
      "A lot of Albany homes are two or three storeys with double garages, big living areas, and a full set of furniture to match. Volume is the main challenge here, not terrain. We size the crew and truck to the job so nothing gets left behind or rushed.",
      "Pinehill, Oteha, and the newer townhouse developments around Albany Highway bring a different set of access questions. Shared driveways, narrow lanes, body-corporate parking rules, and lift bookings in taller blocks all need sorting before move day, not on it. We ask those questions at the quote stage.",
      "Albany sits about 14 minutes from our Wairau Valley depot. That proximity keeps callout costs low and means we can turn around quickly if a job runs long or needs a second trip. You see the full price before you confirm, with no surprises on the day.",
      "A good number of Albany households have a piano, a gym setup, or both. We are the movers trusted by Steinway dealers and Auckland Town Hall for piano work, so whatever is sitting in your living room, we have moved something like it before.",
    ],
    highlights: [
      "Dozens of Albany jobs completed",
      "Large-home crews of up to 4 movers",
      "Pinehill and Oteha townhouse access sorted upfront",
      "14 minutes from our Wairau Valley depot",
    ],
    faqs: [
      {
        q: "We are in a Pinehill townhouse with a shared driveway. Can the truck get in?",
        a: "We check access before move day, not on it. Tell us the address at quote stage and we will confirm whether the truck can get close, or plan the carry if it cannot. Shared driveways and narrow lanes are common in Albany and we work around them regularly.",
      },
      {
        q: "Our Albany home is big, three storeys and a double garage full of gear. How do you handle the volume?",
        a: "We size the crew and truck to the job. Larger Albany homes often need a crew of three or four and a full-size truck with a taillift. We work that out at the quote stage so you are not watching two movers struggle with a house that needs four.",
      },
      {
        q: "Does moving from Albany cost more because it is further north?",
        a: "No distance premium applies to Albany. Hourly rates are the same across Auckland. The fixed callout reflects distance from our Wairau Valley depot, and Albany is only about 14 minutes away, so that figure is modest. You see the full price before you book.",
      },
      {
        q: "We have a grand piano in the lounge. Is that something you can move?",
        a: "Yes. Piano moving is one of the things we are known for on the Shore. Steinway dealers and Auckland Town Hall use us for that work. We treat a piano as its own job within the move, not an afterthought, and we have the equipment and crew skill to do it properly.",
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
      "Grey Lynn movers with dozens of local jobs done. Specialist Movers handles villas, steep steps, and tight streets across Grey Lynn. Get a quote in 15 minutes.",
    intro:
      "Grey Lynn is full of character villas on narrow streets, and moving in or out of them takes a bit more thought than a standard house. We have completed dozens of moves here and know what to plan for.",
    paragraphs: [
      "Most Grey Lynn homes are villas or bungalows built well before cars were a consideration. Front paths are often long, steps are steep, and hallways are narrow. We look at all of this before move day so the crew arrives with the right gear and a clear plan.",
      "Parking on Richmond Road, Williamson Avenue, and the surrounding streets can be tight on a weekday morning. We check what is available, whether a parking restriction applies, and how close we can get the truck. A tailift truck needs room to operate safely, and we sort that out in advance.",
      "A lot of Grey Lynn moves involve buyers and renters who have accumulated serious furniture over years in a well-loved villa. Big rimu wardrobes, upright pianos, clawfoot baths turned into planters. We are Auckland's specialists for piano moving, trusted by Steinway dealers, and we handle heavy awkward pieces carefully on stairs.",
      "Grey Lynn is about 18 minutes from our Wairau Valley depot, so we arrive on time and do not burn the first hour of your day in traffic. Quotes come back in about 15 minutes during business hours, and we operate seven days a week.",
    ],
    highlights: [
      "Dozens of Grey Lynn jobs completed",
      "Villa hallways and steep front steps planned for",
      "On-street parking checked before move day",
      "18 minutes from our depot, no distance premium",
    ],
    faqs: [
      {
        q: "Our villa has steep front steps and a long narrow path. Is that a problem?",
        a: "No, but it does need planning. We walk the access before move day on larger jobs, or talk it through with you for smaller ones. The crew knows to bring the right equipment for stairs and tight paths, and we factor the carry time into your quote so there are no surprises.",
      },
      {
        q: "Where does the truck park on a narrow Grey Lynn street?",
        a: "That depends on your street. We check parking restrictions, available space, and tailift clearance ahead of time. If the main truck cannot get close, we plan the carry accordingly rather than working it out on the day.",
      },
      {
        q: "We have a big old upright piano in the lounge. Can you move it?",
        a: "Yes. Piano moving is one of the things we are best known for. We are trusted by Steinway dealers and have moved instruments into and out of villas plenty of times. Steep steps and narrow hallways are not unusual for us.",
      },
      {
        q: "How much does a Grey Lynn move cost?",
        a: "We do not publish set prices here because every move is different. What we can tell you is that hourly rates are the same across Auckland, and because Grey Lynn is in our standard callout area there is no distance premium. You see the full price upfront before you book. Send us your details and we will have a quote back to you in about 15 minutes during business hours.",
      },
    ],
  },
  "mount-albert": {
    metaDescription:
      "Looking for movers in Mount Albert, Auckland? Specialist Movers has completed dozens of jobs here. Local crews, tailift trucks, quotes in 15 minutes.",
    intro:
      "Mount Albert is a suburb of older bungalows, steep cross-lease sections, and a growing number of townhouse blocks squeezed into former back gardens. We have done dozens of moves here and know what that mix throws at you.",
    paragraphs: [
      "The older housing stock is the big thing in Mount Albert. Bungalows and character homes from the 1940s through the 1970s sit on sections that were subdivided long before townhouses were the norm. That means tight side access, low carports that a large truck cannot fit under, and front paths that were never designed for furniture. We walk the access before move day on anything that looks tight.",
      "Cross-lease sections are common here. That shared driveway or right-of-way often has a turning circle that suits a car, not a truck. We check the geometry in advance and size the vehicle accordingly. Sometimes a smaller truck and a second run is the right call. We tell you that upfront, not on move day.",
      "The townhouse developments along the main corridors, particularly near the train station and along New North Road, are a different job again. Shared driveways, intercom gates, and body corporate rules around truck access and times all need to be sorted before we arrive. We have worked through these before and know what to ask.",
      "Our Wairau Valley depot is about 19 minutes from Mount Albert on a normal morning. That keeps travel costs low. Hourly rates are the same across Auckland, and the callout for Mount Albert sits in our standard pricing zone, so there is no distance premium on top.",
    ],
    highlights: [
      "Dozens of Mount Albert moves completed",
      "Cross-lease and right-of-way access checked before move day",
      "Standard callout zone, no distance premium",
      "Tailift trucks suited to bungalow-era properties",
    ],
    faqs: [
      {
        q: "Our bungalow has a low carport and the truck will not fit underneath. What happens?",
        a: "We sort this before move day, not on arrival. We confirm clearance and plan where to park the truck on the street or in the driveway approach. The tailift works just as well from the kerbside. It adds a bit of carry distance but it is not a problem we improvise around on the day.",
      },
      {
        q: "We are in a cross-lease property with a shared driveway. Can you get a truck in?",
        a: "Often yes, but it depends on the width and the turning room at the end. Send us the address and we will check it on Street View and confirm before booking. If the full-size truck does not fit, we will tell you and offer the right alternative.",
      },
      {
        q: "Our Mount Albert townhouse has a body corporate rule about truck access times. Can you work around that?",
        a: "Yes. Tell us the time window and any gate or intercom details when you book. We plan the start time to fit and make sure the crew knows the access setup before they leave the depot.",
      },
      {
        q: "How quickly can we get a quote for a Mount Albert move?",
        a: "Send us the details during business hours and you will usually have a quote back in about 15 minutes. For a larger home where room counts and access matter, we offer a free viewing so the quote is accurate and nothing surprises anyone on move day.",
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
      "Looking for movers in Herne Bay, Auckland? Specialist Movers handles villas, steep sites, and tight street access across this inner-west suburb. Get a quote in 15 min.",
    intro:
      "Herne Bay is one of Auckland's most character-rich suburbs, and it comes with the access challenges to match. Grand villas, elevated sites, and narrow bays-side streets mean every move here needs a proper plan.",
    paragraphs: [
      "Most of the housing stock in Herne Bay is older, think large two-storey villas and bungalows with high front steps, long hallways, and rooms that were not designed with sofas in mind. We carry furniture through these spaces regularly. Knowing where the tight corners are before move day saves a lot of time on the day.",
      "The streets around the waterfront and the upper ridge can be genuinely tricky for a large truck. Parking is limited on many of the residential streets, and some driveways rise sharply off the road. We check access before we arrive, not when the truck is already blocking the street.",
      "Herne Bay attracts buyers who have accumulated quality pieces over the years, good furniture, artwork, instruments. We are New Zealand's piano moving specialists, trusted by Steinway dealers and Auckland Town Hall, so if you have a grand or upright that needs to come with you, that is well within our usual work.",
      "Our Wairau Valley depot is about 15 minutes and 12 km from Herne Bay, so we are not travelling across town to reach you. We operate seven days and we have completed dozens of moves in this suburb. The callout to Herne Bay sits in our standard pricing zone, so there is no distance premium on top of your quote.",
    ],
    highlights: [
      "Experienced with Herne Bay villas and their tight hallways and high steps",
      "Access checked before move day, not on arrival",
      "Piano moving for the suburb's many quality instruments",
      "Standard callout zone, no distance premium, full price shown upfront",
    ],
    faqs: [
      {
        q: "Our villa has a steep front path and a lot of steps. Can you manage heavy furniture?",
        a: "Yes. Steep entries and high front steps are common in Herne Bay and we come prepared with the right equipment and crew size. We will ask about the access when you book so nothing catches us off guard on move day.",
      },
      {
        q: "Parking on our street is very limited. How do you handle the truck?",
        a: "We plan this before we arrive. We will talk through the street layout with you and, if needed, we time our arrival to make the most of quieter periods or identify the best nearby loading spot. We do not just show up and hope for the best.",
      },
      {
        q: "We have a grand piano in the lounge. Can you move it as part of the house move?",
        a: "Absolutely. Piano moving is one of our specialities. We are trusted by Steinway dealers and Auckland Town Hall, so a grand piano coming out of a Herne Bay villa is straightforward for our crew. Just let us know when you enquire.",
      },
      {
        q: "How much does a Herne Bay move cost?",
        a: "We do not publish set prices here because the right answer depends on your home size, what you are moving, and how far you are going. What we can tell you is that Herne Bay sits in our standard callout zone, so there is no distance premium. Hourly rates are the same across Auckland. You see the full price upfront before you commit, and in business hours we usually get a quote back to you in about 15 minutes.",
      },
    ],
  },
  parnell: {
    metaDescription:
      "Moving in Parnell? Specialist Movers has completed dozens of jobs in this historic Auckland suburb. Local crew, taillifted trucks, quotes in 15 minutes.",
    intro:
      "Parnell is one of Auckland's oldest suburbs, and the housing stock shows it. Heritage villas, converted apartments in old buildings, and steep sections that catch movers off guard if they haven't been before.",
    paragraphs: [
      "We've completed dozens of moves in Parnell. The jobs range from Victorian and Edwardian villas on elevated sections to boutique apartment buildings along the ridge. Access varies a lot from street to street, so we check it before move day, not on the morning of.",
      "The terrain here is real. Some of Parnell's streets drop away sharply toward the Domain or the waterfront, and a driveway that looks fine on Google Maps can be a different story with a full truck. Our taillifted trucks help, and we size the crew to handle the carry when the vehicle can't get close.",
      "Apartment buildings in Parnell tend to be older conversions rather than purpose-built towers. That often means a smaller lift, or no lift at all, and corridor widths that weren't designed with sofas in mind. We walk through the access before we quote on larger jobs so there are no surprises.",
      "Our depot is in Wairau Valley, about 18 minutes from Parnell. That puts us well within our standard callout area, so there's no distance premium added to your job. You see the full price before you confirm anything.",
    ],
    highlights: [
      "Dozens of Parnell jobs completed, villas to heritage apartments",
      "Steep-section and narrow-street access planned in advance",
      "Older apartment buildings assessed for lift and corridor size",
      "Standard callout zone, no distance premium from our depot",
    ],
    faqs: [
      {
        q: "We're in a converted villa apartment with no lift and a tight stairwell. Can you still move us?",
        a: "Yes, this is common in Parnell. Older conversions rarely have lifts, and staircases are often narrow or turn sharply. We factor that into the crew size and the time allowed. It's worth mentioning when you request a quote so we plan it properly.",
      },
      {
        q: "Our section slopes quite steeply and the truck may not get onto the drive. What happens?",
        a: "We confirm the driveway grade, width, and surface before move day. If the truck needs to stay on the street, we plan the carry distance into the job. Parnell has plenty of steep sections and we've worked around most of them.",
      },
      {
        q: "Street parking near our Parnell villa is limited. How do you handle that?",
        a: "We check parking options when we scope the job. In some cases we arrive early to secure a position close to the door. If a loading zone permit is worth organising, we'll tell you ahead of time so you can arrange it with Auckland Transport.",
      },
      {
        q: "We have a grand piano in our Parnell home. Is that something you can move?",
        a: "Piano moving is something we're known for across Auckland. We work with Steinway dealers and have moved instruments into Auckland Town Hall. A grand piano in a Parnell villa, including down steps or around tight corners, is well within what we handle. Mention the piano when you enquire and we'll confirm the right crew and equipment.",
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
      "Moving in Mount Eden? Specialist Movers has completed dozens of jobs across this suburb. Local knowledge, honest pricing, quotes in 15 minutes.",
    intro:
      "Mount Eden packs a lot into a small area. Steep volcanic terrain, century-old villas, and some of Auckland's tightest driveways. We have completed dozens of moves here and know what to plan for.",
    paragraphs: [
      "The housing stock is largely pre-1940. Villas and bungalows with high timber floors, narrow hallways, and front doors that face the street at an angle. Getting a sofa or a king bed through those spaces takes patience and the right approach, not brute force. We scope the tight spots before move day so nothing gets held up on the day.",
      "Mount Eden Road and Dominion Road are busy arterials and parking enforcement is active. Side streets off the volcano slopes can be one-lane with no kerb space for a large truck. We check access and arrange parking before we arrive. Our trucks have taillifts, which matters when the street drops away steeply from where we need to load.",
      "The suburb attracts a mix of long-term owner-occupiers and younger families buying into character homes for the first time. Both groups often have pianos. We are New Zealand's piano moving specialists, trusted by Steinway dealers and Auckland Town Hall, so a grand or upright in a Villa front room is familiar territory for our crew.",
      "We run seven days and can have a quote back to you in around 15 minutes during business hours. For larger homes we offer a free viewing so we can size the crew and truck properly. Mount Eden is about 21 minutes from our Wairau Valley depot, well within our standard callout area, so there is no distance premium on the job.",
    ],
    highlights: [
      "Dozens of Mount Eden moves completed",
      "Pre-1940 villa access and narrow hallways handled routinely",
      "Piano moves trusted by Steinway dealers and Auckland Town Hall",
      "Parking and steep street access planned before move day",
    ],
    faqs: [
      {
        q: "The front path to our villa is narrow and there are steps. How do you handle that?",
        a: "It is one of the most common situations we deal with in Mount Eden. We confirm the step count, path width, and any tight turns at the door before move day. The crew comes prepared with the right equipment and enough people to carry safely without rushing or damaging door frames.",
      },
      {
        q: "Parking on our street is very limited. Can your truck actually get close enough?",
        a: "We sort this out before we arrive. If we cannot get a loading zone permit or confirmed street space, we plan the carry distance instead of hoping for the best on the day. Our trucks have taillifts, which helps when the road surface slopes away from the kerb.",
      },
      {
        q: "We have an upright piano in the villa. Can you move it?",
        a: "Yes. Piano moving is one of the things we are specifically known for across Auckland. We have moved pianos in and out of villas like yours many times, including navigating the angles that old doorways and hallways create. Just mention it when you book so we allocate the right crew size.",
      },
      {
        q: "How do you price a Mount Eden job and will I see the cost before committing?",
        a: "Hourly rates are the same across Auckland. The callout fee varies with distance from our depot and Mount Eden sits in our standard zone, so there is no distance premium. You see the full price before you confirm the booking, and quotes come back in around 15 minutes during business hours.",
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
      "Saint Heliers movers with dozens of local jobs done. Specialist Movers handles bungalows, clifftop homes, and steep beach-suburb access with care.",
    intro:
      "Saint Heliers sits on the edge of the Waitemata, and the homes here reflect that. Older bungalows, character houses on sloped sections, and a suburb where the street layout and sea views often mean tricky access.",
    paragraphs: [
      "A lot of Saint Heliers homes were built decades ago, and they show it in the best way. Wide verandahs, wooden floors, high ceilings, and furniture to match. We carry heavy, oversized pieces out of these homes every week and we know how to protect doorframes and polished floors while we do it.",
      "The terrain here catches people out. Some streets drop sharply toward the waterfront, and driveways can be steep, narrow, or both. We look at access before move day, not on it. If a tailgate truck cannot get close, we plan the carry in advance so nothing is improvised.",
      "Saint Heliers has a settled, owner-occupier feel, but we also move plenty of renters and families upsizing within the suburb. Whatever the job, we bring a crew sized to match it, usually two to four movers, and a truck with a taillift to handle the heavy work safely.",
      "Our depot is in Wairau Valley, about 30 minutes and 23 kilometres from Saint Heliers. That puts us well within our standard callout area, so there is no distance premium on top of your quote. You see the full price before you confirm.",
    ],
    highlights: [
      "Dozens of Saint Heliers jobs completed",
      "Steep driveways and beach-suburb access planned in advance",
      "Right crew size for older bungalows and character homes",
      "Standard callout area, no distance surcharge",
    ],
    faqs: [
      {
        q: "Our house is on a steep section above the waterfront. Can you get a truck close enough?",
        a: "We check this before move day. Tell us the address and we will look at the street, the driveway grade, and how far back the truck can safely go. If we need to carry from the road, we build that into the plan upfront, not when we arrive.",
      },
      {
        q: "We have heavy antique furniture from an older bungalow. Is that a problem?",
        a: "Not at all. Solid timber sideboards, cast-iron beds, upright pianos, we move these regularly from Saint Heliers homes. We bring the right gear and the right number of hands. We are also trusted by Steinway dealers for piano moves if that is relevant.",
      },
      {
        q: "What does it cost to move within Saint Heliers or from here to another Auckland suburb?",
        a: "We charge hourly rates, which are the same across Auckland. Because Saint Heliers sits in our standard callout area, the fixed callout fee does not carry a distance premium. You get the full price upfront before you book, with no surprises on the day.",
      },
      {
        q: "Can you help with packing the day before the move?",
        a: "Yes. We offer a full packing service the day before your move date. That works well for Saint Heliers homes with a lot of rooms or fragile items to wrap. Just mention it when you get your quote and we will add it to the booking.",
      },
    ],
  },
  // ── Priority additions ──
  devonport: {
    metaDescription:
      "Devonport movers for villas, apartments, and pianos. Careful crews who know the village streets. Specialist Movers North Shore. Free quote in 15 minutes.",
    intro:
      "Devonport is one of our most-visited suburbs, with dozens of jobs done here. Heritage villas, village streets, and more pianos per square kilometre than almost anywhere in Auckland.",
    paragraphs: [
      "Devonport villas are beautiful and unforgiving. Narrow hallways, steep internal stairs, and front steps that have seen a century of feet. We protect floors and door frames as standard and bring crews who have done this exact house before, just on a different street.",
      "Parking is the other Devonport puzzle. Village streets are tight and busy, especially near the ferry. We plan where the truck stands and get any council permissions sorted before the day.",
      "Pianos are a Devonport specialty of ours. We are trusted by Auckland's music stores, and uprights and grands come down villa steps with the right gear, the right numbers, and no drama. Every piano gets a complimentary polish after the move.",
      "Apartment moves near the waterfront are common too. We handle lift bookings and building requirements so the body corporate stays happy.",
    ],
    highlights: [
      "Dozens of Devonport jobs done, villas our specialty",
      "Floor and door frame protection as standard",
      "Piano specialists trusted by Auckland music stores",
      "Truck parking planned before move day",
    ],
    faqs: [
      {
        q: "Can you get furniture out of a villa with narrow halls and steep stairs?",
        a: "Yes, it is the standard Devonport job. We measure the tight points, sometimes take doors off, and carry with enough hands so nothing touches a wall.",
      },
      {
        q: "Where does the truck park on a narrow Devonport street?",
        a: "We plan that before the day. Usually there is a spot within a sensible carry, and where a permit or cones are needed we arrange them.",
      },
      {
        q: "Can you move a grand piano out of a Devonport villa?",
        a: "Yes. Grands come apart, travel on a piano trolley with proper padding, and get reassembled and polished at the other end. It is what we are known for.",
      },
      {
        q: "Do you move apartments near the ferry terminal?",
        a: "Often. We book the lift, protect the lobby, and follow the building's move-in rules so everything goes smoothly.",
      },
    ],
  },
  greenhithe: {
    metaDescription:
      "Greenhithe movers just minutes from our North Shore depot. Large family homes, stairs, and pianos handled with care. Free quote in 15 minutes.",
    intro:
      "Greenhithe is ten minutes from our depot, which makes it one of the easiest suburbs in Auckland for us to service. We move homes here regularly, many of them large ones.",
    paragraphs: [
      "Greenhithe homes tend to be big. Four bedrooms, two living areas, stairs, and a garage that has been quietly filling up for a decade. We size the crew honestly for that, usually three or four movers, so the day does not drag.",
      "Leafy shared driveways are part of the suburb's charm and part of our planning. We confirm where the truck can stand and how far the carry is before move day, not during it.",
      "Being ten minutes away matters more than it sounds. Early starts are genuinely early, a second trip is not a drama, and if you need us back for the piano or the pot plants, we are close.",
      "We also handle full packs here. Kitchen, wardrobes, artwork, the lot, done the day before so move day starts at boxes-ready.",
    ],
    highlights: [
      "10 minutes from our Wairau Valley depot",
      "Large-home crews, three or four movers as standard",
      "Shared driveway and carry planning before move day",
      "Full packing service available",
    ],
    faqs: [
      {
        q: "How early can you start a Greenhithe move?",
        a: "Early. We are ten minutes away, so a 7.30 or 8am start is easy to lock in. Big homes deserve the full day.",
      },
      {
        q: "Our driveway is shared and slopes down. Can a truck get in?",
        a: "We check before the day. If the truck cannot stand close to the house we plan the carry distance into the quote, so there are no surprises.",
      },
      {
        q: "Do you do viewings for bigger homes?",
        a: "Yes, and for a four bedroom Greenhithe home we recommend one. It is free, takes about 20 minutes, and makes the price accurate.",
      },
      {
        q: "Can you store some furniture between houses?",
        a: "Yes, we offer storage for the in-between gap when settlement dates do not line up. Ask when you book and we will build it into the plan.",
      },
    ],
  },
  "stanmore-bay": {
    metaDescription:
      "Stanmore Bay movers on the Whangaparāoa Peninsula. House, piano, and insurance moves from our North Shore depot. Free quote in 15 minutes.",
    intro:
      "Stanmore Bay is part of our regular run up the Whangaparāoa Peninsula. We have handled dozens of jobs here, from full house moves to single pianos.",
    paragraphs: [
      "The peninsula has one road in and out, so timing matters. We schedule Stanmore Bay moves to miss the Whangaparāoa Road crush, and our depot is about 25 minutes away with a clear run.",
      "Housing here is a real mix. Older baches sit next to new builds, and plenty of homes step down towards the beach. Split levels and downhill carries are normal for us, and we bring the right crew for them.",
      "We also do insurance restoration work in Stanmore Bay, packing out and packing back homes for insurers and project managers. The same careful handling applies to a flood pack-out as to a grand piano.",
      "Every move gets at least two movers, a truck with a taillift, and blankets and straps as standard. If your quote needs eyes on the job first, we come to you.",
    ],
    highlights: [
      "Regular jobs across the Whangaparāoa Peninsula",
      "About 25 minutes from our Wairau Valley depot",
      "Insurance pack-out and pack-back experience",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you charge extra travel for Stanmore Bay?",
        a: "Hourly rates are the same across Auckland. Stanmore Bay's fixed callout is slightly higher than inner North Shore because of the distance, and you see the full price upfront before you book.",
      },
      {
        q: "My house is on a slope with steps to the door. Is that a problem?",
        a: "It is common in Stanmore Bay and we plan for it. Tell us about the steps when you book, and we will bring the right crew size and gear for a safe carry.",
      },
      {
        q: "Can you move a piano out of a beach house here?",
        a: "Yes. We are Auckland's piano specialists and we move uprights and grands across the Hibiscus Coast, including tricky downhill and multi-step access.",
      },
      {
        q: "How fast can you give me a price?",
        a: "For most Stanmore Bay moves we can quote from your details in about 15 minutes. Larger homes get a free viewing first so the price is accurate.",
      },
    ],
  },
  "red-beach": {
    metaDescription:
      "Red Beach movers on the Hibiscus Coast. Family house moves, packing, and pianos handled by our North Shore crews. Free quote in 15 minutes.",
    intro:
      "Red Beach is family-move country, and it is one of our regular Hibiscus Coast stops. We have done dozens of jobs here, most of them three and four bedroom homes.",
    paragraphs: [
      "A lot of Red Beach moves are growing families going up a bedroom or moving in from other parts of Auckland. Three and four bedroom houses are our bread and butter, and we usually send a three-mover crew so the day stays short.",
      "The newer subdivisions have good truck access, while some of the older streets near the beach are tighter. We check access before move day so the truck is never the surprise.",
      "Need packing too? Our packers can do the whole house the day before, or just the kitchen and the fragiles. Plenty of Red Beach customers take the packing and moving bundle.",
      "We are about 20 minutes up the motorway from our Wairau Valley depot, so morning starts are easy to lock in.",
    ],
    highlights: [
      "Regular Hibiscus Coast crew, dozens of Red Beach jobs done",
      "Three and four bedroom family moves are our standard work",
      "Packing service available the day before",
      "About 20 minutes from our depot, easy morning starts",
    ],
    faqs: [
      {
        q: "How long does a four bedroom Red Beach move take?",
        a: "Most take a day with a three-person crew, packing done beforehand. We confirm crew size and timing when we scope your move.",
      },
      {
        q: "Can you pack the house for us as well?",
        a: "Yes. Our packers usually come the day before with all materials, so move day starts with everything boxed and labelled.",
      },
      {
        q: "Do you move within Red Beach, not just in and out?",
        a: "Absolutely. Short local shifts across the Hibiscus Coast are common for us and are priced on our normal hourly rates.",
      },
      {
        q: "Is a weekend move possible?",
        a: "Yes, we run seven days. Weekends book out first on the coast, so lock your date in early.",
      },
    ],
  },
  "dairy-flat": {
    metaDescription:
      "Dairy Flat movers for lifestyle blocks and rural properties. Long driveways, sheds, and big items handled properly. Free quote in 15 minutes.",
    intro:
      "Dairy Flat moves are different, and we like them. Lifestyle blocks, long driveways, sheds full of gear. We have moved plenty of households out here, 20 minutes from our depot.",
    paragraphs: [
      "A lifestyle block move is not a suburban move. There is the house, and then there is the shed, the workshop, the ride-on, and the stuff in the barn. We quote Dairy Flat properties with all of that in mind, so nothing gets left for a second trip you did not plan.",
      "Long gravel driveways and gates are standard here. We check truck clearance and turning room before the day, and our bigger trucks mean fewer runs up and down that driveway.",
      "Heavy and awkward items are our specialty. Safes, workshop machinery, spa pools, statues, and pianos all travel with the right gear and enough hands.",
      "Moving to Dairy Flat from town, or leaving the block for something smaller? Either way we plan the day around the property, not the other way round.",
    ],
    highlights: [
      "Lifestyle block experience, house plus sheds and outbuildings",
      "Trucks up to 33 cubic metres, fewer trips on long driveways",
      "Heavy and awkward items are our specialty",
      "20 minutes from our Wairau Valley depot",
    ],
    faqs: [
      {
        q: "Can you move the shed and workshop contents too?",
        a: "Yes, and tell us about them when you book. Workshop gear and outdoor equipment change the truck size and crew we send, and we would rather plan it than discover it.",
      },
      {
        q: "Our driveway is long gravel with a gate. Will the truck get in?",
        a: "Usually yes. We confirm clearance, width, and turning room before move day. If the big truck cannot get close, we plan the carry instead of improvising.",
      },
      {
        q: "Do you move spa pools and safes?",
        a: "Yes. Hard-to-shift items are one of our specialties, with the gear and crew to do it without damage.",
      },
      {
        q: "Do rural moves cost more?",
        a: "Dairy Flat is in our normal service area, about 20 minutes from our depot, and hourly rates are the same across Auckland. Larger properties get a free viewing so the quote is right.",
      },
    ],
  },
  "point-chevalier": {
    metaDescription:
      "Point Chevalier movers for bungalows and villas. Careful crews, narrow driveway know-how, and pianos. Specialist Movers Auckland. Free quote in 15 minutes.",
    intro:
      "Pt Chev's 1920s bungalows are some of our favourite houses to move. We are in the suburb regularly, house moves, cleans, and pianos alike.",
    paragraphs: [
      "Character bungalows and villas dominate Point Chevalier, and they come with character quirks. Narrow side driveways, low verandas, and hallways that were not designed with a three-seater couch in mind. We plan the tight points before the day and protect the original timber as we go.",
      "Street trees and driveway width decide where the truck stands. We are honest about carry distance in the quote, so the price you get is the price it costs.",
      "Families here often pair the move with an exit clean of the old place. We do fixed-price end-of-tenancy and pre-settlement cleans, and can run the clean while the truck heads to the new house.",
      "From our depot it is about 20 minutes over the bridge, and we schedule Pt Chev jobs to miss the motorway crush.",
    ],
    highlights: [
      "Bungalow and villa experience, floors protected as standard",
      "Honest carry-distance quoting on narrow driveways",
      "Fixed-price exit cleans available with your move",
      "Piano moves handled by specialists",
    ],
    faqs: [
      {
        q: "Will a big couch fit through a bungalow hallway?",
        a: "Usually yes, with planning. We measure the tight points, remove feet or doors where needed, and carry with enough people that nothing gets forced.",
      },
      {
        q: "Can you do the move and the exit clean together?",
        a: "Yes, it is a popular combo in Pt Chev. The cleaners start as the truck loads, and the old place is handed over done.",
      },
      {
        q: "Our driveway is too narrow for a truck. What happens?",
        a: "We park on the street and plan the carry. You will know the plan and the price before move day, not after.",
      },
      {
        q: "Do you move pianos in Point Chevalier?",
        a: "Yes. Uprights and grands, moved by the crew that Auckland's music stores trust, with a complimentary polish after.",
      },
    ],
  },
  "west-harbour": {
    metaDescription:
      "West Harbour movers, 15 minutes from our depot. Family homes, insurance moves, and packing done properly. Specialist Movers Auckland. Free quote in 15 minutes.",
    intro:
      "West Harbour sits just across the upper harbour from our depot, about 15 minutes door to door. We have done dozens of jobs here, from family homes to insurance pack-outs.",
    paragraphs: [
      "Family homes around the marina and the harbour edge make up most of our West Harbour work. Established streets, decent access, and the odd steep driveway down to a view. We plan crew size around the house, not a formula.",
      "We also do insurance restoration work in the suburb, packing out homes for restoration companies and packing them back when the work is done. Careful inventory and handling is the whole job there, and it shows in how we treat every move.",
      "Our packers are popular in West Harbour. Kitchens, artwork, and the garage, boxed the day before, so the truck rolls at 8am with no taping in sight.",
      "Being 15 minutes away means flexible timing, quick second trips, and easy viewings when a quote needs eyes on the job.",
    ],
    highlights: [
      "About 15 minutes from our Wairau Valley depot",
      "Dozens of West Harbour jobs done",
      "Insurance pack-out and pack-back experience",
      "Day-before packing service available",
    ],
    faqs: [
      {
        q: "Our driveway drops steeply to the house. Can you handle it?",
        a: "Yes, steep West Harbour driveways are familiar ground. We assess where the truck stands and plan the carry so it is safe and priced correctly.",
      },
      {
        q: "Do you handle insurance moves?",
        a: "Yes, we work with restoration companies and insurers on pack-out and pack-back jobs, with proper inventory as standard.",
      },
      {
        q: "Can I get a viewing before I commit?",
        a: "Easily. We are 15 minutes away and viewings are free. For bigger homes we recommend one so the price is exact.",
      },
      {
        q: "How much notice do you need?",
        a: "The more the better, but being this close to our depot means we can sometimes fit West Harbour jobs in on short notice. Ask.",
      },
    ],
  },
  riverhead: {
    metaDescription:
      "Riverhead movers for village homes, new builds, and lifestyle blocks. Big trucks, careful crews. Specialist Movers Auckland. Free quote in 15 minutes.",
    intro:
      "Riverhead mixes village charm, new subdivisions, and lifestyle blocks on the forest edge. We move households in and out of all three, about 25 minutes from our depot.",
    paragraphs: [
      "The new Riverhead subdivisions move like clockwork: good access, modern layouts, done by mid-afternoon. The older village streets and lifestyle properties take more thought, and that is where the planning we do before move day earns its keep.",
      "Lifestyle blocks towards Coatesville mean long driveways, sheds, and the kind of gear that does not fit in a hatchback. Our bigger trucks, up to 33 cubic metres, mean one trip where two would have been.",
      "Moving out from the city to Riverhead? That is most of our work here. We pack in town, drive out, and set you up the same day.",
      "Pianos come too. Uprights and grands travel safely on proper equipment, whatever the driveway looks like.",
    ],
    highlights: [
      "Village, new build, and lifestyle block experience",
      "Trucks up to 33 cubic metres, one trip not two",
      "City-to-Riverhead moves done in a day",
      "Piano transport with specialist gear",
    ],
    faqs: [
      {
        q: "Do you charge extra to come out to Riverhead?",
        a: "No. Riverhead is inside our standard Auckland service area, about 25 minutes from our depot, and priced at normal rates.",
      },
      {
        q: "We are moving from central Auckland to Riverhead. One day or two?",
        a: "Usually one. We size the crew and truck so the load, the drive, and the unload fit inside a day, packing done beforehand.",
      },
      {
        q: "Can you handle the shed and outdoor gear on a lifestyle block?",
        a: "Yes, just tell us what is out there when you book so we bring the right truck and enough hands.",
      },
      {
        q: "Is there a piano-safe way down a gravel driveway?",
        a: "Yes. Piano trolleys, boards, and patience. We have done it plenty of times and the piano arrives polished, literally.",
      },
    ],
  },
  "st-johns": {
    metaDescription:
      "Saint Johns movers for townhouses, new developments, and family homes in Auckland's east. Specialist Movers. Free quote in 15 minutes.",
    intro:
      "Saint Johns and the neighbouring Stonefields development are regular stops for our eastern crews. Townhouses, terraces, and family homes, we move them all.",
    paragraphs: [
      "Much of Saint Johns is newer medium-density housing: townhouses, terraces, and apartments with internal stairs and tandem garages. We move these efficiently because we know the layouts, where the truck fits, and how to protect shared walls and stairwells on the way through.",
      "Body corporate rules and shared driveways are part of the deal here. We handle the notice, the protection, and the neighbours' driveways with the same care as your furniture.",
      "The established streets have classic family homes too, and those moves get the same treatment: honest crew sizing, floor protection, and a plan made before the day.",
      "Moving across town? Saint Johns to anywhere in Auckland is a routine day for us, packing service included if you want it.",
    ],
    highlights: [
      "Townhouse and terrace experience, stairs included",
      "Body corporate and shared-access moves handled properly",
      "Crews regularly working Auckland's eastern suburbs",
      "Packing service available",
    ],
    faqs: [
      {
        q: "Can you move a three-storey townhouse with internal stairs?",
        a: "Yes, it is standard work for us in Saint Johns. We bring the crew numbers for safe stair carries and protect the stairwell as we go.",
      },
      {
        q: "Our complex has body corporate move rules. Do you deal with that?",
        a: "We do. Tell us the requirements and we will meet them: protection, timing windows, and proof of insurance if the body corporate asks.",
      },
      {
        q: "Where does the truck go if my garage is tandem and the street is busy?",
        a: "We plan that in advance. Usually there is a legal spot within a short carry, and the plan is agreed with you before move day.",
      },
      {
        q: "Do you do small moves, like one-bedroom apartments?",
        a: "Yes. Every job gets a minimum of two movers and a taillift truck, whatever the size.",
      },
    ],
  },
  glendowie: {
    metaDescription:
      "Glendowie movers for large family homes and premium furniture. Careful crews, proper protection, pianos too. Specialist Movers. Free quote in 15 minutes.",
    intro:
      "Glendowie homes are big, the furniture is good, and the views come with slopes. This is careful-move territory, which is exactly the work we built our name on.",
    paragraphs: [
      "Large family homes near the water mean quality furniture, artwork, and the kind of pieces you do not want learning about stairs the hard way. We wrap, pad, and protect as standard, and our crews are chosen for care first, speed second.",
      "Cliff-side streets and sloped sections decide the plan. We work out where the truck stands and how the heavy pieces travel before anyone lifts anything.",
      "Grand pianos live in Glendowie, and we are the crew Auckland's music stores trust with them. Uprights and grands are moved on specialist gear and polished after the move, always.",
      "For bigger homes we recommend a free viewing. Twenty minutes of walking the house with us gets you an accurate fixed price and a plan you can see.",
    ],
    highlights: [
      "Premium furniture wrapped and protected as standard",
      "Sloped section and long-carry planning before move day",
      "Grand piano specialists, complimentary polish included",
      "Free in-home viewing for accurate fixed pricing",
    ],
    faqs: [
      {
        q: "How do you protect good furniture and artwork?",
        a: "Blankets, shrink wrap, edge protection, and dance-floor sheets for delicate floors. Artwork travels padded and upright, and we plan placement at the new house before we load.",
      },
      {
        q: "Our house is below street level with a long path. Does that change the price?",
        a: "It changes the plan, and the quote reflects the real carry. That is why we view bigger Glendowie homes first, so the fixed price is honest both ways.",
      },
      {
        q: "Can you move a grand piano with steps involved?",
        a: "Yes. Grands are our specialty: partial disassembly, piano board, proper padding, and enough experienced hands. Steps are normal, not a problem.",
      },
      {
        q: "Do you offer storage if our settlement dates do not line up?",
        a: "Yes, short and longer-term storage is available, and we move things in and out of it ourselves so handling stays careful end to end.",
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
      `Te Awamutu moves include home relocations, commercial runs, and regular piano transport for homes and music schools. ${pianoProtection}`,
      waikatoInAreaPricing,
    ],
    faqs: [
      {
        q: "Do you cover rural properties around Te Awamutu?",
        a: "Yes. we cover Te Awamutu town and surrounding rural roads from Hamilton. A viewing locks in truck access and a fixed price for your move.",
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
      `Palmerston North sits on our lower North Island corridor from Hamilton, home, office, piano, and commercial moves with travel quoted upfront. ${pianoProtection}`,
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
