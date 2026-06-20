import { ProposalReviewsBadge } from "@/components/quote-deck/house-move/ProposalReviewsBadge";
import { QuoteActions } from "@/components/quote-deck/QuoteActions";

export function ProposalCoverFooter({
  className = "",
  quoteRef,
}: {
  className?: string;
  quoteRef?: string;
}) {
  if (!quoteRef) {
    return (
      <div className={`proposal-cover-footer flex flex-col items-center gap-4 ${className}`}>
        <ProposalReviewsBadge />
      </div>
    );
  }

  return (
    <div
      className={`proposal-cover-footer flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between ${className}`}
    >
      <ProposalReviewsBadge />
      <QuoteActions quoteRef={quoteRef} />
    </div>
  );
}
