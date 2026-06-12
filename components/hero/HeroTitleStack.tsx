import { HeroTitleFit } from "@/components/hero/HeroTitleFit";
import { cn } from "@/lib/utils";

type Props = {
  heading: string;
  eyebrowLabel?: string;
  className?: string;
  /** Keep title on one line; scales to fit column width (default). */
  nowrap?: boolean;
};

/** Yellow h1 + white eyebrow pill above the hero photo (desktop). */
export function HeroTitleStack({
  heading,
  eyebrowLabel,
  className,
  nowrap = true,
}: Props) {
  return (
    <div
      className={cn(
        "mb-3 flex w-full min-w-0 flex-col items-start gap-1.5",
        className,
      )}
    >
      {nowrap ? (
        <HeroTitleFit text={heading} />
      ) : (
        <h1 className="max-w-full font-heading text-[2.75rem] leading-[1.12] text-brand-yellow">
          {heading}
        </h1>
      )}
      {eyebrowLabel ? (
        <p className="inline-flex w-max max-w-full whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white">
          {eyebrowLabel}
        </p>
      ) : null}
    </div>
  );
}
