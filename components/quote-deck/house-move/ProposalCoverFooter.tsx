import { ProposalReviewsBadge } from "@/components/quote-deck/house-move/ProposalReviewsBadge";

export function ProposalCoverFooter({ className = "" }: { className?: string }) {
  return (
    <div className={`proposal-cover-footer flex flex-col items-center gap-4 ${className}`}>
      <ProposalReviewsBadge />
    </div>
  );
}
