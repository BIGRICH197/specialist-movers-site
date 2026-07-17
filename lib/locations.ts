/**
 * Service areas, regions, suburbs, and Waikato towns.
 * Every entry here has a page at /locations/[slug].
 */

import { normalizeLocationMeta } from "@/lib/location-builders";
import { applyLocationDefaults } from "@/lib/location-default-faqs";
import { extraAucklandSuburbs, extraWaikatoTowns } from "@/lib/locations-extra";
import { applyLocationSeo } from "@/lib/location-seo";
import { regionMetaDescriptions } from "@/lib/meta-keyword-copy";
import type { Location, LocationGroup } from "@/lib/location-types";

export type { Location, LocationGroup, LocationKind } from "@/lib/location-types";

const sharedServices =
  "Home relocations, piano transport, packing, office and commercial work, exit cleans, and hard-to-shift items.";

function suburbCopy(
  name: string,
  areaNote: string,
  parentRegionName: string,
): Pick<Location, "intro" | "paragraphs" | "highlights"> {
  return {
    intro: `We move homes and pianos in ${name} and nearby streets. Our Auckland crew plans access, parking, and timing before move day.`,
    paragraphs: [
      `${areaNote} We quote after a free in-home viewing when you need an accurate fixed price for a home relocation.`,
      `From our Wairau Valley depot we run ${name} jobs often, alongside wider ${parentRegionName} work. ${sharedServices}`,
      `Need a piano move in ${name}? We are trusted by Auckland music stores and handle uprights and grands with care.`,
    ],
    highlights: [
      "Free in-home viewing for home relocations",
      "Fixed-price quotes when we have scoped the job",
      "Piano specialists, upright and grand",
      "Licensed and insured crews",
    ],
  };
}

const regions: Location[] = [
  {
    slug: "north-shore",
    name: "North Shore",
    kind: "region",
    group: "auckland",
    parentSlug: null,
    metaTitle: "Movers North Shore Auckland",
    metaDescription:
      regionMetaDescriptions["north-shore"],
    intro:
      "Regular North Shore work from Takapuna and Milford through to Albany and Silverdale. We plan ferry access, apartments, and driveway limits before your move.",
    paragraphs: [
      "Our Auckland base is in Wairau Valley, so North Shore jobs are a natural fit. We do home relocations, piano transport, packing, and commercial runs across the Shore every week.",
      "Tight driveways, walk-up apartments, and villa steps are common here. We scope those at your free viewing so your quote matches the real job.",
      sharedServices,
    ],
    highlights: [
      "Daily North Shore runs from our Auckland depot",
      "Apartments, villas, and townhouses",
      "Piano moves for homes and music stores",
    ],
  },
  {
    slug: "central-auckland",
    name: "Central Auckland",
    kind: "region",
    group: "auckland",
    parentSlug: null,
    metaTitle: "Movers Central Auckland",
    metaDescription:
      regionMetaDescriptions["central-auckland"],
    intro:
      "Central suburbs mean character homes, apartments, and careful handling. We work in Herne Bay, Ponsonby, Remuera, and across the inner city.",
    paragraphs: [
      "Many of our residential moves are in central Auckland. We focus on clear communication, floor protection, and crews who treat your home with respect.",
      "Parking and building access need planning in the CBD fringe. We sort that at viewing so move day stays smooth.",
      sharedServices,
    ],
    highlights: [
      "Character homes and apartments",
      "Careful floor and doorway protection",
      "Trusted for high-value and piano moves",
    ],
  },
  {
    slug: "west-auckland",
    name: "West Auckland",
    kind: "region",
    group: "auckland",
    parentSlug: null,
    metaTitle: "Movers West Auckland",
    metaDescription:
      regionMetaDescriptions["west-auckland"],
    intro:
      "West Auckland covers everything from Henderson and New Lynn out to Titirangi hillside homes. We quote properly for access and distance.",
    paragraphs: [
      "Hills, long driveways, and split-level homes are common in the west. We bring the right crew size and gear once we have seen the property.",
      "We also handle moves between West Auckland and other parts of the city, or longer relocations across New Zealand.",
      sharedServices,
    ],
    highlights: [
      "Hillside and split-level experience",
      "Local and long-distance moves",
      "Packing day before your move",
    ],
  },
  {
    slug: "south-auckland",
    name: "South Auckland",
    kind: "region",
    group: "auckland",
    parentSlug: null,
    metaTitle: "Movers South Auckland",
    metaDescription:
      regionMetaDescriptions["south-auckland"],
    intro:
      "South Auckland runs from Manukau and Papakura out toward Drury and the wider south. We check both ends of your move for fair pricing tiers.",
    paragraphs: [
      "Moves touching Papakura, Pukekohe, or outer south addresses can sit in a different pricing tier. We confirm pickup and dropoff when we quote.",
      "Our teams handle townhouses, family homes, and piano deliveries for retailers across the south.",
      sharedServices,
    ],
    highlights: [
      "Clear pricing for outer south zones",
      "Townhouses and family homes",
      "Piano and retail deliveries",
    ],
  },
  {
    slug: "east-auckland",
    name: "East Auckland",
    kind: "region",
    group: "auckland",
    parentSlug: null,
    metaTitle: "Movers East Auckland",
    metaDescription:
      regionMetaDescriptions["east-auckland"],
    intro:
      "East Auckland includes coastal suburbs and growing residential areas. We plan for apartments, bungalows, and busy weekend roads.",
    paragraphs: [
      "From Mission Bay and St Heliers through to Howick and Panmure, we run east-side moves with the same careful process as the rest of Auckland.",
      "Coastal properties sometimes mean extra care for furniture and pianos going up steps or through tight hallways.",
      sharedServices,
    ],
    highlights: [
      "Coastal and hillside access",
      "Weekend and weekday scheduling",
      "Full packing and unpacking available",
    ],
  },
];

const suburbs: Location[] = [
  {
    slug: "takapuna",
    name: "Takapuna",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Takapuna",
    metaDescription: "house and piano moving in Takapuna. Specialist Movers North Shore. Free in-home viewing.",
    ...suburbCopy(
      "Takapuna",
      "Beachside apartments and office-adjacent homes mean lifts, stairs, and parking matter.",
      "North Shore",
    ),
  },
  {
    slug: "milford",
    name: "Milford",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Milford",
    metaDescription: "Milford movers, houses and pianos. Specialist Movers. North Shore Auckland.",
    ...suburbCopy("Milford", "Quiet streets and older homes often mean narrow hallways and careful piano placement.", "North Shore"),
  },
  {
    slug: "glenfield",
    name: "Glenfield",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Glenfield",
    metaDescription: "Glenfield movers near our Wairau Valley depot. Piano moves. Free quote.",
    ...suburbCopy(
      "Glenfield",
      "Close to our Wairau Valley base, so Glenfield jobs are quick to schedule and easy to revisit for viewing.",
      "North Shore",
    ),
  },
  {
    slug: "albany",
    name: "Albany",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Albany",
    metaDescription: "Albany movers, townhouses and family homes. Specialist Movers Auckland.",
    ...suburbCopy("Albany", "Newer townhouses and family homes are common; we plan truck access and time slots with you.", "North Shore"),
  },
  {
    slug: "silverdale",
    name: "Silverdale",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Silverdale",
    metaDescription: "Silverdale and Hibiscus Coast movers. House and piano. Specialist Movers.",
    ...suburbCopy(
      "Silverdale",
      "North of the bridge, Silverdale and nearby coast suburbs are part of our regular North Shore schedule.",
      "North Shore",
    ),
  },
  {
    slug: "stanmore-bay",
    name: "Stanmore Bay",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    searchTerms: ["Whangaparaoa", "Hibiscus Coast"],
    metaTitle: "Movers Stanmore Bay",
    metaDescription:
      "Stanmore Bay movers on the Whangaparaoa Peninsula. House, piano, and insurance moves from our North Shore depot. Free quote in 15 minutes.",
    intro:
      "Stanmore Bay is part of our regular run up the Whangaparaoa Peninsula. We have handled dozens of jobs here, from full house moves to single pianos.",
    paragraphs: [
      "The peninsula has one road in and out, so timing matters. We schedule Stanmore Bay moves to miss the Whangaparaoa Road crush, and our depot is about 25 minutes away with a clear run.",
      "Housing here is a real mix. Older baches sit next to new builds, and plenty of homes step down towards the beach. Split levels and downhill carries are normal for us, and we bring the right crew for them.",
      "We also do insurance restoration work in Stanmore Bay, packing out and packing back homes for insurers and project managers. The same careful handling applies to a flood pack-out as to a grand piano.",
      "Every move gets at least two movers, a truck with a taillift, and blankets and straps as standard. If your quote needs eyes on the job first, we come to you.",
    ],
    highlights: [
      "Regular jobs across the Whangaparaoa Peninsula",
      "About 25 minutes from our Wairau Valley depot",
      "Insurance pack-out and pack-back experience",
      "Piano specialists, upright and grand",
    ],
    faqs: [
      {
        q: "Do you charge extra travel for Stanmore Bay?",
        a: "No. Stanmore Bay is inside our standard Auckland service area and we are on the peninsula most weeks, so you pay our normal rates.",
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
  {
    slug: "red-beach",
    name: "Red Beach",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    searchTerms: ["Hibiscus Coast", "Orewa"],
    metaTitle: "Movers Red Beach",
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
  {
    slug: "dairy-flat",
    name: "Dairy Flat",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    searchTerms: ["lifestyle block", "rural North Shore"],
    metaTitle: "Movers Dairy Flat",
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
        a: "Dairy Flat is in our normal service area, about 20 minutes from our depot. You pay standard rates. Larger properties get a free viewing so the quote is right.",
      },
    ],
  },
  {
    slug: "greenhithe",
    name: "Greenhithe",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Greenhithe",
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
  {
    slug: "devonport",
    name: "Devonport",
    kind: "suburb",
    group: "auckland",
    parentSlug: "north-shore",
    metaTitle: "Movers Devonport",
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
  {
    slug: "herne-bay",
    name: "Herne Bay",
    kind: "suburb",
    group: "auckland",
    parentSlug: "central-auckland",
    metaTitle: "Movers Herne Bay",
    metaDescription: "Herne Bay house and piano moving. Premium careful moves. Specialist Movers.",
    ...suburbCopy("Herne Bay", "Premium villas and apartments, we protect floors and door frames as standard.", "central Auckland"),
  },
  {
    slug: "ponsonby",
    name: "Ponsonby",
    kind: "suburb",
    group: "auckland",
    parentSlug: "central-auckland",
    metaTitle: "Movers Ponsonby",
    metaDescription: "Ponsonby movers, apartments and villas. Specialist Movers Auckland.",
    ...suburbCopy("Ponsonby", "Terraced homes and apartments mean stairs and tight turns; we scope that at viewing.", "central Auckland"),
  },
  {
    slug: "remuera",
    name: "Remuera",
    kind: "suburb",
    group: "auckland",
    parentSlug: "central-auckland",
    metaTitle: "Movers Remuera",
    metaDescription: "Remuera movers, large homes and pianos. Specialist Movers. Free viewing.",
    ...suburbCopy("Remuera", "Larger homes and grand pianos are common; we bring experienced crews and proper equipment.", "central Auckland"),
  },
  {
    slug: "parnell",
    name: "Parnell",
    kind: "suburb",
    group: "auckland",
    parentSlug: "central-auckland",
    metaTitle: "Movers Parnell",
    metaDescription: "Parnell movers Auckland. Specialist Movers, careful, professional crews.",
    ...suburbCopy("Parnell", "Mix of apartments and character homes close to the city fringe.", "central Auckland"),
  },
  {
    slug: "mt-eden",
    name: "Mt Eden",
    searchTerms: ["Mount Eden"],
    kind: "suburb",
    group: "auckland",
    parentSlug: "central-auckland",
    metaTitle: "Movers Mt Eden",
    metaDescription: "Mt Eden movers, houses and apartments. Specialist Movers Auckland.",
    ...suburbCopy("Mt Eden", "Sloped streets and mixed housing; we confirm truck access when we visit.", "central Auckland"),
  },
  {
    slug: "point-chevalier",
    name: "Point Chevalier",
    kind: "suburb",
    group: "auckland",
    parentSlug: "central-auckland",
    searchTerms: ["Pt Chev", "Pt Chevalier", "Point Chev"],
    metaTitle: "Movers Point Chevalier",
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
  {
    slug: "henderson",
    name: "Henderson",
    kind: "suburb",
    group: "auckland",
    parentSlug: "west-auckland",
    metaTitle: "Movers Henderson",
    metaDescription: "Henderson movers West Auckland. Specialist Movers. Free quote.",
    ...suburbCopy("Henderson", "Central West Auckland hub, good road links for local and cross-city moves.", "West Auckland"),
  },
  {
    slug: "titirangi",
    name: "Titirangi",
    kind: "suburb",
    group: "auckland",
    parentSlug: "west-auckland",
    metaTitle: "Movers Titirangi",
    metaDescription: "Titirangi movers, bush properties and hills. Specialist Movers West Auckland.",
    ...suburbCopy("Titirangi", "Bush sections and steep driveways need extra planning for large items and pianos.", "West Auckland"),
  },
  {
    slug: "new-lynn",
    name: "New Lynn",
    kind: "suburb",
    group: "auckland",
    parentSlug: "west-auckland",
    metaTitle: "Movers New Lynn",
    metaDescription: "New Lynn movers West Auckland. Apartments and houses. Specialist Movers.",
    ...suburbCopy("New Lynn", "Apartments near the town centre and suburban streets on the flats.", "West Auckland"),
  },
  {
    slug: "west-harbour",
    name: "West Harbour",
    kind: "suburb",
    group: "auckland",
    parentSlug: "west-auckland",
    searchTerms: ["Westpark", "marina"],
    metaTitle: "Movers West Harbour",
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
  {
    slug: "riverhead",
    name: "Riverhead",
    kind: "suburb",
    group: "auckland",
    parentSlug: "west-auckland",
    searchTerms: ["Coatesville", "Kumeu"],
    metaTitle: "Movers Riverhead",
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
  {
    slug: "manukau",
    name: "Manukau",
    kind: "suburb",
    group: "auckland",
    parentSlug: "south-auckland",
    metaTitle: "Movers Manukau",
    metaDescription: "Manukau movers South Auckland. House and commercial. Specialist Movers.",
    ...suburbCopy("Manukau", "Busy commercial and residential area, we schedule to avoid peak traffic where we can.", "South Auckland"),
  },
  {
    slug: "papakura",
    name: "Papakura",
    kind: "suburb",
    group: "auckland",
    parentSlug: "south-auckland",
    metaTitle: "Movers Papakura",
    metaDescription: "Papakura movers, outer Auckland tier pricing explained upfront. Specialist Movers.",
    ...suburbCopy(
      "Papakura",
      "Outer south pricing may apply depending on your other address. We explain that clearly in your quote.",
      "South Auckland",
    ),
  },
  {
    slug: "drury",
    name: "Drury",
    kind: "suburb",
    group: "auckland",
    parentSlug: "south-auckland",
    metaTitle: "Movers Drury",
    metaDescription: "Drury movers South Auckland. Specialist Movers. Free quote.",
    ...suburbCopy("Drury", "Growing south corridor, new builds and family moves are common.", "South Auckland"),
  },
  {
    slug: "howick",
    name: "Howick",
    kind: "suburb",
    group: "auckland",
    parentSlug: "east-auckland",
    metaTitle: "Movers Howick",
    metaDescription: "Howick movers East Auckland. House and piano. Specialist Movers.",
    ...suburbCopy("Howick", "Family homes and established streets east of the tamaki.", "East Auckland"),
  },
  {
    slug: "mission-bay",
    name: "Mission Bay",
    kind: "suburb",
    group: "auckland",
    parentSlug: "east-auckland",
    metaTitle: "Movers Mission Bay",
    metaDescription: "Mission Bay movers, coastal homes. Specialist Movers Auckland.",
    ...suburbCopy("Mission Bay", "Coastal properties and apartment blocks near the waterfront.", "East Auckland"),
  },
  {
    slug: "st-johns",
    name: "Saint Johns",
    kind: "suburb",
    group: "auckland",
    parentSlug: "east-auckland",
    searchTerms: ["St Johns", "St. Johns", "Stonefields"],
    metaTitle: "Movers Saint Johns",
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
  {
    slug: "glendowie",
    name: "Glendowie",
    kind: "suburb",
    group: "auckland",
    parentSlug: "east-auckland",
    searchTerms: ["Glen Dowie", "St Heliers"],
    metaTitle: "Movers Glendowie",
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
  {
    slug: "panmure",
    name: "Panmure",
    kind: "suburb",
    group: "auckland",
    parentSlug: "east-auckland",
    metaTitle: "Movers Panmure",
    metaDescription: "Panmure movers East Auckland. Specialist Movers, reliable crews.",
    ...suburbCopy("Panmure", "Central east location with good links across Auckland.", "East Auckland"),
  },
];

const towns: Location[] = [
  {
    slug: "hamilton",
    name: "Hamilton",
    kind: "town",
    group: "waikato",
    parentSlug: null,
    metaTitle: "Movers Hamilton",
    metaDescription:
      regionMetaDescriptions.hamilton,
    intro:
      "Hamilton is our second base. We run daily work across Hamilton city and nearby towns, with Auckland crews when needed.",
    paragraphs: [
      "From student flats to family homes and commercial fit-outs, we plan Hamilton moves with the same viewing-first approach as Auckland.",
      "Piano moves between Hamilton and Auckland are a regular route for us. We handle uprights and grands with proper wrapping and crew experience.",
      "We also service Cambridge, Te Awamutu, Morrinsville, and wider Waikato when you need us.",
    ],
    highlights: [
      "Hamilton depot alongside Auckland",
      "House, piano, office, and commercial",
      "Moves between Hamilton and Auckland",
    ],
  },
  {
    slug: "cambridge",
    name: "Cambridge",
    kind: "town",
    group: "waikato",
    parentSlug: null,
    metaTitle: "Movers Cambridge Waikato",
    metaDescription: "Cambridge movers, Waikato house and piano moves. Specialist Movers Hamilton base.",
    intro:
      "Cambridge and nearby Waikato towns are part of our regular Hamilton coverage. We quote travel and access clearly.",
    paragraphs: [
      "Lifestyle blocks and town homes around Cambridge need a proper viewing for accurate fixed pricing on home relocations.",
      "We coordinate crews from Hamilton with clear arrival windows and the same communication you get in Auckland.",
      sharedServices,
    ],
    highlights: [
      "Serviced from our Hamilton base",
      "Clear quote after viewing",
      "Piano and relocation specialists",
    ],
  },
  {
    slug: "te-awamutu",
    name: "Te Awamutu",
    kind: "town",
    group: "waikato",
    parentSlug: null,
    metaTitle: "Movers Te Awamutu",
    metaDescription: "Te Awamutu movers Waikato. Specialist Movers. House and piano moves.",
    intro:
      "Te Awamutu moves are scheduled from Hamilton. We cover Waikato towns with the same careful crews and quoting process.",
    paragraphs: [
      "We visit before larger home relocations so stairs, driveways, and volume are clear before we lock your price.",
      "Piano transport to and from Te Awamutu is available with specialist handling and shrink wrap.",
      sharedServices,
    ],
    highlights: [
      "Waikato scheduling from Hamilton",
      "In-home viewing for home relocations",
      "Piano specialists",
    ],
  },
  {
    slug: "morrinsville",
    name: "Morrinsville",
    kind: "town",
    group: "waikato",
    parentSlug: null,
    metaTitle: "Movers Morrinsville",
    metaDescription: "Morrinsville Waikato movers. Specialist Movers Hamilton. Free quote.",
    intro:
      "Morrinsville sits in our Waikato patch from Hamilton. Call for home relocations, pianos, and commercial work.",
    paragraphs: [
      "Town and rural properties around Morrinsville benefit from a viewing so we send the right truck and crew size.",
      "We keep you updated on timing from quote through to move day.",
      sharedServices,
    ],
    highlights: [
      "Waikato town coverage",
      "Fixed quotes after viewing",
      "Licensed and insured",
    ],
  },
];

function mergeLocations(...groups: Location[][]): Location[] {
  const bySlug = new Map<string, Location>();
  for (const group of groups) {
    for (const loc of group) {
      if (!bySlug.has(loc.slug)) bySlug.set(loc.slug, loc);
    }
  }
  return Array.from(bySlug.values());
}

const coreSuburbs = suburbs;
const coreTowns = towns;

export const allLocations: readonly Location[] = mergeLocations(
  regions,
  coreSuburbs,
  [...extraAucklandSuburbs],
  coreTowns,
  [...extraWaikatoTowns],
).map(applyLocationSeo).map(normalizeLocationMeta).map(applyLocationDefaults);

const bySlug = new Map(allLocations.map((l) => [l.slug, l]));

export function getLocation(slug: string): Location | undefined {
  return bySlug.get(slug);
}

export function getLocationSlugs(): string[] {
  return allLocations.map((l) => l.slug);
}

/** Header dropdown, All Auckland suburbs first, then Waikato towns. */
export type LocationNavItem = {
  label: string;
  href: string;
  group: LocationGroup;
};

export const locationNavItems: readonly LocationNavItem[] = [
  { label: "All Auckland suburbs", href: "/locations", group: "auckland" },
  { label: "Hamilton", href: "/locations/hamilton", group: "waikato" },
  { label: "Cambridge", href: "/locations/cambridge", group: "waikato" },
  { label: "Te Awamutu", href: "/locations/te-awamutu", group: "waikato" },
  { label: "Morrinsville", href: "/locations/morrinsville", group: "waikato" },
  { label: "Matamata", href: "/locations/matamata", group: "waikato" },
];

export function getChildLocations(parentSlug: string): Location[] {
  return allLocations.filter((l) => l.parentSlug === parentSlug);
}

export type LocationHubGroup = {
  id: LocationGroup;
  title: string;
  regions: Location[];
  suburbs: Location[];
  towns: Location[];
};

/** Hub page columns */
export function getLocationHubGroups(): LocationHubGroup[] {
  const aucklandSuburbs = allLocations.filter(
    (l) => l.kind === "suburb" && l.group === "auckland",
  );
  const waikatoTowns = allLocations.filter(
    (l) => l.kind === "town" && l.group === "waikato",
  );

  return [
    {
      id: "waikato",
      title: "Waikato",
      regions: [],
      suburbs: [],
      towns: waikatoTowns,
    },
    {
      id: "auckland",
      title: "Auckland suburbs",
      regions: [],
      suburbs: aucklandSuburbs,
      towns: [],
    },
  ];
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function locationSearchBlob(loc: Location): string {
  const parent = loc.parentSlug ? bySlug.get(loc.parentSlug)?.name : "";
  const terms = loc.searchTerms?.join(" ") ?? "";
  return normalizeSearchText([loc.name, loc.slug.replace(/-/g, " "), parent, terms].join(" "));
}

/** Search, name, slug, parent region, aliases; supports short partial queries */
export function searchLocations(query: string): Location[] {
  const q = normalizeSearchText(query);
  if (!q) return [];

  const tokens = q.split(/\s+/).filter(Boolean);

  const scored = allLocations
    .map((loc) => {
      const blob = locationSearchBlob(loc);
      const slugNorm = normalizeSearchText(loc.slug.replace(/-/g, " "));

      let score = 0;
      if (blob.startsWith(q) || slugNorm.startsWith(q)) score += 100;
      if (blob.includes(q) || slugNorm.includes(q)) score += 50;
      for (const token of tokens) {
        if (token.length < 2) continue;
        if (blob.includes(token) || slugNorm.includes(token)) score += 20;
        if (loc.name.toLowerCase().split(/\s+/).some((w) => w.startsWith(token))) score += 15;
      }
      return { loc, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.loc.name.localeCompare(b.loc.name));

  return scored.map((x) => x.loc);
}

export function getNearbyLocations(location: Location, limit = 6): Location[] {
  if (location.kind === "region") {
    return getChildLocations(location.slug).slice(0, limit);
  }
  if (location.parentSlug) {
    const siblings = getChildLocations(location.parentSlug).filter((l) => l.slug !== location.slug);
    const parent = getLocation(location.parentSlug);
    return parent ? [parent, ...siblings].slice(0, limit) : siblings.slice(0, limit);
  }
  return towns.filter((t) => t.slug !== location.slug).slice(0, limit);
}
