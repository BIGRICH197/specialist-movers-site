/**
 * Additional suburbs and Waikato towns, merged into allLocations in locations.ts
 */
import { createSuburb, createTown } from "@/lib/location-builders";

/** Auckland suburbs not in the core locations list */
export const extraAucklandSuburbs = [
  // North Shore
  createSuburb("Castor Bay", "north-shore", undefined, ["Castor"]),
  createSuburb("Birkenhead", "north-shore"),
  createSuburb("Northcote", "north-shore"),
  createSuburb("Browns Bay", "north-shore"),
  createSuburb("Mairangi Bay", "north-shore", undefined, ["Mairangi"]),
  createSuburb("Forrest Hill", "north-shore", undefined, ["Forest Hill"]),
  createSuburb("Hillcrest", "north-shore", undefined, ["Hill crest"]),
  createSuburb("Bayswater", "north-shore"),
  createSuburb("Beach Haven", "north-shore"),
  createSuburb("Torbay", "north-shore"),
  createSuburb("Long Bay", "north-shore"),
  createSuburb("Orewa", "north-shore"),
  createSuburb("Warkworth", "north-shore", "Rodney moves from our North Shore schedule, outer north pricing may apply."),
  // Central
  createSuburb("Grey Lynn", "central-auckland"),
  createSuburb("Epsom", "central-auckland"),
  createSuburb("Newmarket", "central-auckland"),
  createSuburb("Kingsland", "central-auckland"),
  createSuburb("Sandringham", "central-auckland"),
  createSuburb("Mount Albert", "central-auckland", undefined, ["Mt Albert"]),
  createSuburb("Greenlane", "central-auckland"),
  createSuburb("Ellerslie", "central-auckland"),
  createSuburb("Onehunga", "central-auckland"),
  createSuburb("Mount Wellington", "central-auckland", undefined, ["Mt Wellington"]),
  createSuburb("St Heliers", "central-auckland", undefined, ["Saint Heliers"]),
  createSuburb("Kohimarama", "central-auckland"),
  createSuburb("Orakei", "central-auckland"),
  createSuburb("Freemans Bay", "central-auckland"),
  // West
  createSuburb("Blockhouse Bay", "west-auckland"),
  createSuburb("Massey", "west-auckland"),
  createSuburb("Te Atatū", "west-auckland", undefined, ["Te Atatu", "Te Atatu Peninsula"]),
  createSuburb("Swanson", "west-auckland"),
  createSuburb("Ranui", "west-auckland"),
  createSuburb("Hobsonville", "west-auckland"),
  createSuburb("Westgate", "west-auckland"),
  createSuburb("Green Bay", "west-auckland"),
  createSuburb("Laingholm", "west-auckland"),
  // South
  createSuburb("Takanini", "south-auckland"),
  createSuburb("Manurewa", "south-auckland"),
  createSuburb("Otahuhu", "south-auckland"),
  createSuburb("Mangere", "south-auckland", undefined, ["Māngere", "Mangere East"]),
  createSuburb("Pukekohe", "south-auckland", "Outer south / Tier 3 pricing may apply, we confirm both addresses when we quote."),
  createSuburb("Waiuku", "south-auckland"),
  createSuburb("Flat Bush", "south-auckland"),
  createSuburb("Papatoetoe", "south-auckland"),
  createSuburb("Otara", "south-auckland", undefined, ["Ōtara"]),
  createSuburb("Clevedon", "south-auckland"),
  // East
  createSuburb("Pakuranga", "east-auckland"),
  createSuburb("Botany Downs", "east-auckland", undefined, ["Botany", "Botany Town Centre"]),
  createSuburb("Bucklands Beach", "east-auckland"),
  createSuburb("Half Moon Bay", "east-auckland"),
  createSuburb("Highland Park", "east-auckland"),
  createSuburb("Dannemora", "east-auckland"),
  createSuburb("Farm Cove", "east-auckland"),
  createSuburb("Beachlands", "east-auckland"),
  createSuburb("Maraetai", "east-auckland"),
] as const;

/** Waikato towns beyond the original four */
export const extraWaikatoTowns = [
  createTown(
    "Matamata",
    "Matamata and nearby rural properties are part of our Hamilton coverage.",
    ["Matamata-Piako"],
  ),
  createTown("Huntly", "Huntly moves are scheduled from Hamilton with clear travel in your quote."),
  createTown("Ngaruawahia", "Ngaruawahia and the river corridor, we service from Hamilton.", [
    "Ngaruawāhia",
  ]),
  createTown("Raglan", "Raglan and west coast Waikato, access and timing planned upfront."),
  createTown("Tokoroa", "Tokoroa and south Waikato moves from our Hamilton base."),
  createTown("Thames", "Thames and Coromandel gateway towns, quote includes travel from Hamilton."),
  createTown("Otorohanga", "Otorohanga and surrounding towns serviced from Hamilton."),
  createTown("Putaruru", "Putaruru and south Waikato, viewing-first for house moves."),
  createTown("Te Kuiti", "Te Kuiti and wider King Country, contact us for scope and timing."),
  createTown(
    "Taupo",
    "Taupo and central North Island moves, longer regional routes quoted clearly.",
    ["Lake Taupo"],
  ),
] as const;
