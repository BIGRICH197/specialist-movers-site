import {
  standardInclusionCategories,
  whatsIncludedCopy,
  type MoveInclusionCategory,
} from "@/lib/quote-deck/house-move-inclusions";

type Content = { eyebrow: string; title: string; categories: readonly MoveInclusionCategory[] };

const houseContent: Content = {
  eyebrow: whatsIncludedCopy.eyebrow,
  title: whatsIncludedCopy.title,
  categories: standardInclusionCategories,
};

/** Condensed inclusions panel — grows to fill left column beside quote. The
 *  content is the quote category's own list (lib/quote-deck/quote-categories). */
export function ProposalWhatsIncludedCompact({
  className = "",
  content = houseContent,
}: {
  className?: string;
  content?: Content;
}) {
  return (
    <div className={`proposal-purple-panel proposal-included-panel flex min-h-0 flex-1 flex-col px-4 py-5 sm:px-5 sm:py-6 ${className}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-yellow/90 sm:text-xs">
        {content.eyebrow}
      </p>
      <h2 className="mt-1.5 font-heading text-base leading-snug text-white sm:text-lg">
        {content.title}
      </h2>

      <div className="mt-4 flex flex-1 flex-col justify-between gap-4 sm:mt-5 sm:gap-5">
        {content.categories.map((cat) => (
          <div key={cat.id}>
            <h3 className="font-heading text-xs font-bold text-brand-yellow sm:text-sm">{cat.title}</h3>
            <ul className="mt-1.5 space-y-1 sm:space-y-1.5">
              {cat.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-xs leading-relaxed text-white/88 sm:text-sm">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-yellow" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
