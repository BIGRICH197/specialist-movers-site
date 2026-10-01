import {
  formatNzd,
  quoteTotalInclGst,
  type HouseMoveQuote,
} from "@/lib/quote-deck/house-move-quote";
import type { StoredQuote } from "@/lib/quote-store";
import { quoteCategory } from "@/lib/quote-deck/quote-categories";

function routeLabel(quote: HouseMoveQuote): string {
  const from = quote.pickup?.suburb?.trim();
  const to = quote.delivery?.suburb?.trim();
  if (from && to) return `${from} to ${to}`;
  if (from) return `Pickup: ${from}`;
  if (to) return `Drop-off: ${to}`;
  return "Auckland and Waikato";
}

export function quotePreviewCopy(stored: StoredQuote, ref: string) {
  const quote = stored.quote;
  const total = formatNzd(quoteTotalInclGst(quote));
  const route = routeLabel(quote);
  const client = quote.clientName?.trim() || "your move";

  const title = `Quote for ${client} - ${total} incl. GST`;
  const category = quoteCategory(stored.quoteType);
  const kind = category.key === "house" ? "relocation" : category.pill.replace(/ proposal$/i, "").toLowerCase();
  const description = `Your ${kind} quote from Specialist Movers. ${route}. Total ${total} incl. GST. Open to view the full proposal.`;

  return {
    title,
    description,
    path: `/quote/${ref}` as const,
    client,
    total,
    route,
    /** The cover-pill words for the link preview image, e.g. "Your piano moving quote". */
    badge: category.key === "house" ? "Your moving quote" : `Your ${kind} quote`,
  };
}
