import { ProposalReviewsBadge } from "@/components/quote-deck/house-move/ProposalReviewsBadge";
import { DeckEyebrow } from "@/components/quote-deck/deck/DeckTypography";

export function ProposalCoverFooter({ className = "" }: { className?: string }) {
  return (
    <div className={`proposal-cover-footer flex flex-col items-stretch gap-4 ${className}`}>
      <div className="proposal-cover-next-steps w-full">
        <DeckEyebrow>Next steps</DeckEyebrow>
        <p className="mt-3 text-left text-sm font-bold leading-relaxed text-brand-purple sm:text-base">
          Reply to confirm, or call us to lock in your date.
        </p>
      </div>

      <ProposalReviewsBadge className="self-end" />
    </div>
  );
}
