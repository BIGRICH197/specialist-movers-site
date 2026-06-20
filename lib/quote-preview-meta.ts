import {
  formatNzd,
  quoteTotalInclGst,
  type HouseMoveQuote,
} from "@/lib/quote-deck/house-move-quote";
import type { StoredQuote } from "@/lib/quote-store";

function routeLabel(quote: HouseMoveQuote): string {
  const from = quote.pickup.suburb?.trim();
  const to = quote.delivery.suburb?.trim();
  if (from && to) return `${from} to ${to}`;
  if (from) return `Pickup: ${from}`;
  if (to) return `Drop-off: ${to}`;
  return "Auckland and Waikato";
}

export function quotePreviewCopy(stored: StoredQuote, ref: string) {
  const quote = stored.quote;
  const total = formatNzd(quoteTotalInclGst(quote));
  const route = routeLabel(quote);
  const client = quote.clientName.trim();

  const title = `Quote for ${client} - ${total} incl. GST`;
  const description = `Your house move quote from Specialist Movers. ${route}. Total ${total} incl. GST. Open to view the full proposal.`;

  return {
    title,
    description,
    path: `/quote/${ref}` as const,
    client,
    total,
    route,
  };
}
