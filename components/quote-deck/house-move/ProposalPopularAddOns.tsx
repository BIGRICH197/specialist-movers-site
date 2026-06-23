import { popularAddOnsWithStatus } from "@/lib/quote-deck/house-move-addons";
import { popularAddOnsTitle } from "@/lib/quote-deck/house-move-inclusions";
import type { HouseMoveQuote } from "@/lib/quote-deck/house-move-quote";
import { cn } from "@/lib/quote-deck/utils";

type Props = {
  quote: HouseMoveQuote;
  className?: string;
};

export function ProposalPopularAddOns({ quote, className = "" }: Props) {
  const items = popularAddOnsWithStatus(quote);

  return (
    <div
      className={cn(
        "proposal-purple-panel proposal-addons-panel px-4 py-4 sm:px-5 sm:py-5",
        className,
      )}
    >
      <h3 className="font-heading text-xs font-bold text-brand-yellow sm:text-sm">
        {popularAddOnsTitle}
      </h3>
      <p className="mt-1 text-[10px] text-white/60 sm:text-xs">Ticked = included on this quote</p>
      <ul className="proposal-addon-list mt-2.5 space-y-2">
        {items.map(({ addOn, included }) => (
          <li key={addOn.id} className="flex items-start gap-2.5 text-xs leading-relaxed sm:text-sm">
            <span
              className={cn(
                "proposal-addon-checkbox mt-0.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-sm border sm:h-4 sm:w-4",
                included
                  ? "border-brand-yellow bg-brand-yellow text-brand-purple"
                  : "border-white/45 bg-transparent",
              )}
              aria-hidden
            >
              {included ? (
                <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 sm:h-3 sm:w-3" fill="currentColor">
                  <path d="M10.2 2.8 4.5 8.5 1.8 5.8l-.9.9 3.6 3.6 6.6-6.6-.9-.9Z" />
                </svg>
              ) : null}
            </span>
            <span className={included ? "text-white" : "text-white/75"}>{addOn.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
