import { HouseMoveDeck } from "@/components/quote-deck/house-move/HouseMoveDeck";
import type { HouseMoveQuote } from "@/lib/quote-deck/house-move-quote";

export const metadata = {
  title: "Quote preview",
  robots: { index: false, follow: false },
};

/** Static sample so we can eyeball the ported deck. The real page is /quote/[token]. */
const sample: HouseMoveQuote = {
  clientName: "Whakapono Nepata-Tuake",
  quoteDate: "19 June 2026",
  moveDate: "Friday 26 June 2026",
  pickup: { line1: "191 Millwater Parkway", suburb: "Silverdale" },
  delivery: { line1: "350 Whitehills Road", suburb: "Dairy Flat" },
  lineItems: [
    { description: "Call out fee (2 trucks)", amountExclGst: 160 },
    { description: "Fuel surcharge", amountExclGst: 25 },
    {
      description: "Labour - 3 movers",
      hours: 7.5,
      hourlyRateExclGst: 190,
      amountExclGst: 1425,
    },
  ],
  includedAddOns: ["packing", "cleaning"],
  validFor: "14 days",
  notes: [],
};

export default function QuotePreviewPage() {
  return <HouseMoveDeck quote={sample} />;
}
