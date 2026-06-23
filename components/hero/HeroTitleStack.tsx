import type { ElementType } from "react";

import { HeroTitleFit } from "@/components/hero/HeroTitleFit";

import { formatHeadingText } from "@/lib/heading-ampersand";
import { isMultilineServiceMobileHeroTitle } from "@/lib/mobile-hero-title-reference";

import { cn } from "@/lib/utils";

type Props = {
  heading: string;
  eyebrowLabel?: string;
  className?: string;
  /** Keep title on one line; scales to fit column width (default). */
  nowrap?: boolean;
  /** Element for the visible title. Use "div"/"h2" when the <h1> is elsewhere. */
  headingAs?: "h1" | "h2" | "div";
};

/** Yellow title above the hero photo (desktop). Eyebrow pill is mobile-only on service pages. */
export function HeroTitleStack({
  heading,
  eyebrowLabel,
  className,
  nowrap = true,
  headingAs = "h1",
}: Props) {
  const HeadingTag = headingAs as ElementType;
  const multiline = isMultilineServiceMobileHeroTitle(heading);
  const lines = multiline
    ? heading.split("\n").map((line) => line.trim()).filter(Boolean)
    : [heading];

  return (
    <div
      className={cn(
        "mb-3 flex w-full min-w-0 flex-col items-start gap-1.5",
        className,
      )}
    >
      {multiline ? (
        <div className="flex w-full min-w-0 flex-col gap-0.5">
          {lines.map((line) => (
            <HeadingTag
              key={line}
              className="max-w-full font-heading text-[2.35rem] leading-[1.12] text-brand-yellow xl:text-[2.75rem]"
            >
              {formatHeadingText(line)}
            </HeadingTag>
          ))}
        </div>
      ) : nowrap ? (
        <HeroTitleFit text={heading} as={headingAs} />
      ) : (
        <HeadingTag className="max-w-full font-heading text-[2.75rem] leading-[1.12] text-brand-yellow">
          {formatHeadingText(heading)}
        </HeadingTag>
      )}

      {eyebrowLabel ? (
        <p className="inline-flex w-max max-w-full whitespace-nowrap rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wider text-white">
          {eyebrowLabel}
        </p>
      ) : null}
    </div>
  );
}
