import { popularAddOns, type PopularAddOn } from "@/lib/quote-deck/house-move-inclusions";
import type { HouseMoveQuote } from "@/lib/quote-deck/house-move-quote";

export type AddOnStatus = {
  addOn: PopularAddOn;
  included: boolean;
};

function quoteLineText(quote: HouseMoveQuote): string {
  return quote.lineItems.map((item) => item.description.toLowerCase()).join(" ");
}

function isAddOnMatchedInQuote(addOn: PopularAddOn, quotedText: string): boolean {
  return addOn.matchTerms.some((term) => quotedText.includes(term.toLowerCase()));
}

/** Included on this quote — explicit JSON list wins, else match line item descriptions */
export function isAddOnIncluded(quote: HouseMoveQuote, addOn: PopularAddOn): boolean {
  if (quote.excludedAddOns?.includes(addOn.id)) return false;
  if (quote.includedAddOns?.includes(addOn.id)) return true;
  return isAddOnMatchedInQuote(addOn, quoteLineText(quote));
}

export function popularAddOnsWithStatus(quote: HouseMoveQuote): AddOnStatus[] {
  return popularAddOns.map((addOn) => ({
    addOn,
    included: isAddOnIncluded(quote, addOn),
  }));
}
