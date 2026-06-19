/** Client quote data — filled from Xero */

export type MoveAddress = {
  line1?: string;
  suburb: string;
  postcode?: string;
  access?: string;
};

export type QuoteLineItem = {
  description: string;
  /** Line amount excl. GST (as on Xero quote) */
  amountExclGst: number;
  /** For hourly lines — show "3.5 hrs × $180/hr" under the description (proposal table only) */
  hours?: number;
  hourlyRateExclGst?: number;
  /** Xero-style table: quantity and unit price excl. GST */
  quantity?: number;
  unitPriceExclGst?: number;
};

export type QuoteTableFormat = "proposal" | "xero";

export type ProposalType = "house" | "office" | "retirement";

export type HouseMoveQuote = {
  /** house = residential deck; office = commercial relocation deck */
  proposalType?: ProposalType;
  clientName: string;
  /** e.g. AMP Office Relocation */
  projectTitle?: string;
  /** e.g. Loscie Mu */
  contactName?: string;
  /** e.g. SM-2026-0617 */
  quoteNumber?: string;
  /** e.g. Danielle Maritz, Office Manager */
  preparedBy?: string;
  /** Date the quote was issued (shown left column). From Xero quote date. */
  quoteDate?: string;
  /** proposal = description + total; xero = qty, unit price, amount like Xero PDF */
  quoteTable?: QuoteTableFormat;
  pickup: MoveAddress;
  delivery: MoveAddress;
  moveDate?: string;
  dates?: {
    pack?: string;
    uplift?: string;
    delivery?: string;
  };
  lineItems: QuoteLineItem[];
  /** Tick these add-on ids even if line items do not match (packing, cleaning, etc.) */
  includedAddOns?: string[];
  /** Force unticked even if a line item would match */
  excludedAddOns?: string[];
  notes?: string[];
  /** Shown on the office proposal pricing slide */
  pricingNotes?: string[];
  validFor?: string;
};

export function formatNzd(amount: number): string {
  const hasCents = Math.round(amount * 100) % 100 !== 0;
  return new Intl.NumberFormat("en-NZ", {
    style: "currency",
    currency: "NZD",
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

const GST_RATE = 0.15;

export function quoteSubtotalExclGst(quote: HouseMoveQuote): number {
  return quote.lineItems.reduce((sum, item) => sum + item.amountExclGst, 0);
}

export function quoteGstAmount(quote: HouseMoveQuote): number {
  return quoteSubtotalExclGst(quote) * GST_RATE;
}

export function quoteTotalInclGst(quote: HouseMoveQuote): number {
  return quoteSubtotalExclGst(quote) * (1 + GST_RATE);
}

export function formatAddress(addr: MoveAddress): string {
  const suburbPart = `${addr.suburb}${addr.postcode ? ` ${addr.postcode}` : ""}`;
  if (addr.line1) return [addr.line1, suburbPart].join(", ");
  return suburbPart;
}

export function hasNotes(quote: HouseMoveQuote): boolean {
  return Boolean(quote.notes?.some((n) => n.trim()));
}

export function formatHourlyCalc(item: QuoteLineItem): string | null {
  if (item.hours == null || item.hourlyRateExclGst == null) return null;
  const hrs = Number.isInteger(item.hours) ? String(item.hours) : String(item.hours);
  return `${hrs} hrs × ${formatNzd(item.hourlyRateExclGst)}/hr`;
}

export function usesXeroQuoteTable(quote: HouseMoveQuote): boolean {
  if (quote.quoteTable === "xero") return true;
  if (quote.quoteTable === "proposal") return false;
  return quote.lineItems.some(
    (item) => item.quantity != null && item.unitPriceExclGst != null,
  );
}

export function formatQuoteQuantity(qty: number): string {
  return qty.toLocaleString("en-NZ", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function isOfficeProposal(quote: HouseMoveQuote): boolean {
  return quote.proposalType === "office";
}

export function isRetirementProposal(quote: HouseMoveQuote): boolean {
  return quote.proposalType === "retirement";
}

export function quoteSectionTotals(quote: HouseMoveQuote): {
  trucks: number;
  labour: number;
  materials: number;
} {
  let trucks = 0;
  let labour = 0;
  let materials = 0;

  for (const item of quote.lineItems) {
    const d = item.description.toLowerCase();
    if (d.includes("callout") || d.includes("call out") || d.includes("call-out")) {
      trucks += item.amountExclGst;
    } else if (/^day \d/.test(d)) {
      labour += item.amountExclGst;
    } else {
      materials += item.amountExclGst;
    }
  }

  return { trucks, labour, materials };
}

export function quoteTimelineSteps(quote: HouseMoveQuote): { step: string; title: string; body: string }[] {
  return quote.lineItems
    .filter((item) => /^Day \d/i.test(item.description))
    .map((item, index) => {
      const [titlePart, ...rest] = item.description.split(":");
      return {
        step: String(index + 1).padStart(2, "0"),
        title: titlePart?.trim() ?? `Day ${index + 1}`,
        body: rest.join(":").trim() || item.description,
      };
    });
}

export function fixedLabourAndTrucksExclGst(quote: HouseMoveQuote): number {
  return quote.lineItems.reduce((sum, item) => {
    const d = item.description.toLowerCase();
    if (/^day [1-5]/.test(d) || d.includes("callout") || d.includes("call out") || d.includes("call-out")) {
      return sum + item.amountExclGst;
    }
    return sum;
  }, 0);
}

export function materialsEstimateExclGst(quote: HouseMoveQuote): number {
  return quote.lineItems.reduce((sum, item) => {
    const d = item.description.toLowerCase();
    if (isMaterialLineItem(d)) return sum + item.amountExclGst;
    return sum;
  }, 0);
}

function isMaterialLineItem(description: string): boolean {
  const d = description.toLowerCase();
  return !d.includes("callout") && !d.includes("call out") && !d.includes("call-out") && !/^day \d/.test(d);
}
