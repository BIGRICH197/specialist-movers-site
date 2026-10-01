// Sample quotes, one per category, for the /quote/preview pages only: they let
// the team see each kind of quote page and booking form before Joey can make
// one. The prices are illustrative, built from the live rate tables, and are
// never stored or sent anywhere.

import type { HouseMoveQuote, QuoteLineItem } from "@/lib/quote-deck/house-move-quote";
import type { QuotePrefill } from "@/lib/quote-store";
import type { QuoteCategoryKey } from "@/lib/quote-deck/quote-categories";

const hourly = (description: string, hours: number, rate: number, section?: string): QuoteLineItem => ({
  description: `${description} (${hours}hrs @ $${rate}/hr)`,
  hours,
  hourlyRateExclGst: rate,
  amountExclGst: hours * rate,
  ...(section ? { section } : {}),
});
const fixed = (description: string, amount: number, section?: string): QuoteLineItem => ({
  description,
  amountExclGst: amount,
  ...(section ? { section } : {}),
});

type Sample = { quote: HouseMoveQuote; prefill: QuotePrefill };

const base = {
  quoteDate: "1 October 2026",
  moveDate: "Friday 16 October 2026",
  validFor: "14 days",
};

export const SAMPLE_QUOTES: Record<QuoteCategoryKey, Sample> = {
  house: {
    quote: {
      ...base,
      clientName: "Sarah Thompson",
      pickup: { suburb: "12 Example Street, Remuera" },
      delivery: { suburb: "4 Sample Road, Ponsonby" },
      lineItems: [fixed("Call out fee", 80), hourly("3 Movers + Truck", 6, 190)],
    },
    prefill: { bedrooms: 3, bathrooms: 2, movers: "3", typeOfMove: "Home Move" },
  },
  packing: {
    quote: {
      ...base,
      clientName: "Sarah Thompson",
      moveDate: "Thursday 15 October 2026",
      pickup: { suburb: "12 Example Street, Remuera" },
      delivery: { suburb: "" },
      lineItems: [
        fixed("Packing call out fee", 80, "Packing"),
        hourly("3 Packers", 7, 190, "Packing"),
        { description: "Large boxes x30", quantity: 30, unitPriceExclGst: 9.5, amountExclGst: 285, section: "Packing" },
        { description: "Small/medium boxes x35", quantity: 35, unitPriceExclGst: 6.5, amountExclGst: 227.5, section: "Packing" },
      ],
    },
    prefill: { bedrooms: 3, bathrooms: 2, movers: "3" },
  },
  cleaning: {
    quote: {
      ...base,
      clientName: "Sarah Thompson",
      moveDate: "Saturday 17 October 2026",
      pickup: { suburb: "12 Example Street, Remuera" },
      delivery: { suburb: "" },
      lineItems: [fixed("End of tenancy clean - 3 bedroom, 2 bathroom", 480, "Cleaning")],
    },
    prefill: { bedrooms: 3, bathrooms: 2 },
  },
  piano: {
    quote: {
      ...base,
      clientName: "Sarah Thompson",
      pickup: { suburb: "12 Example Street, Remuera", access: "6 steps to the front door" },
      delivery: { suburb: "4 Sample Road, Ponsonby" },
      lineItems: [fixed("Upright piano move - Remuera to Ponsonby", 290), fixed("Stairs - 1 flight at pick-up", 100)],
    },
    prefill: {},
  },
  office: {
    quote: {
      ...base,
      clientName: "Harbour Accounting Ltd",
      contactName: "Jane Wilson",
      moveDate: "Saturday 17 October 2026",
      pickup: { suburb: "Level 3, 20 Example Street, Auckland CBD" },
      delivery: { suburb: "Level 1, 8 Sample Road, Newmarket" },
      lineItems: [fixed("Call out fee", 100), hourly("4 Movers + Truck", 7, 250)],
      notes: ["Lift booked by building management for 7am to 3pm.", "Workstations dismantled and rebuilt."],
    },
    prefill: { movers: "4" },
  },
  commercial: {
    quote: {
      ...base,
      clientName: "Sample Retail Ltd",
      contactName: "Tom Baker",
      pickup: { suburb: "Unit 4, 10 Example Place, Wairau Valley" },
      delivery: { suburb: "Shop 12, Sample Mall, Albany" },
      lineItems: [fixed("Call out fee", 80), hourly("3 Movers + Truck", 4, 190)],
    },
    prefill: { movers: "3" },
  },
  kitchen: {
    quote: {
      ...base,
      clientName: "Sample Kitchens Ltd",
      contactName: "Mike Chen",
      moveDate: "Tuesday 13 October 2026",
      pickup: { suburb: "Workshop, 5 Example Road, East Tamaki" },
      delivery: { suburb: "Site, 22 Sample Avenue, Mission Bay" },
      lineItems: [fixed("Call out fee", 60), hourly("2 Movers + Truck", 2.5, 140)],
    },
    prefill: { movers: "2" },
  },
  insurance: {
    quote: {
      ...base,
      clientName: "Sample Claims Ltd - 12 Example Street",
      pickup: { suburb: "12 Example Street, Remuera" },
      delivery: { suburb: "Specialist Movers storage, Wairau Valley" },
      lineItems: [
        fixed("Part 1 - pack-out: call out fee", 100),
        hourly("Part 1 - pack-out: 3 Movers + Truck", 7, 190),
      ],
    },
    prefill: { movers: "3", bedrooms: 3 },
  },
  storage: {
    quote: {
      ...base,
      clientName: "Sarah Thompson",
      moveDate: "Friday 16 October 2026",
      pickup: { suburb: "12 Example Street, Remuera" },
      delivery: { suburb: "TBC" },
      lineItems: [
        fixed("Collection: call out fee", 60),
        hourly("Collection: 2 Movers + Truck", 3, 150),
        { description: "Storage, per week x4", quantity: 4, unitPriceExclGst: 65, amountExclGst: 260 },
      ],
    },
    prefill: { movers: "2" },
  },
  furniture: {
    quote: {
      ...base,
      clientName: "Sarah Thompson",
      pickup: { suburb: "Sample Furniture Store, Mt Wellington" },
      delivery: { suburb: "4 Sample Road, Ponsonby" },
      lineItems: [fixed("Call out fee", 60), hourly("2 Movers + Truck", 1.5, 150)],
    },
    prefill: { movers: "2" },
  },
};
