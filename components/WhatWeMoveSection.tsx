import { SectionReveal } from "@/components/SectionReveal";
import {
  WHAT_WE_MOVE_ANCHOR,
  hardToShiftItems,
  whatWeDoItems,
  whatWeMoveCopy,
  whoWeDoItForItems,
  type WhatWeMoveRegion,
} from "@/lib/what-we-move";

type Props = {
  page: "hard-to-shift" | "commercial-moving";
  region: WhatWeMoveRegion;
};

function Column({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  return (
    <div className="min-w-0">
      <h3 className="border-b border-brand-purple/15 pb-2 font-heading text-xs uppercase tracking-[0.14em] text-brand-purple">
        {title}
      </h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2.5 text-sm leading-relaxed text-brand-purple/85"
          >
            <span
              aria-hidden
              className="mt-1.5 h-2 w-2 shrink-0 rounded-[2px] bg-brand-yellow"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * The trade card's back page, on the site. Three plain lists — the objects,
 * the jobs, the trades — because the fastest way to answer "will you take it"
 * is to show the thing itself rather than describe a capability.
 */
export function WhatWeMoveSection({ page, region }: Props) {
  const { heading, intro } = whatWeMoveCopy(page, region);

  return (
    <SectionReveal
      id={WHAT_WE_MOVE_ANCHOR}
      className="scroll-mt-24 border-t border-brand-purple/10 bg-brand-canvas py-12 container-px sm:py-14"
    >
      <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-purple/80">
        {intro}
      </p>
      <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        <Column title="The hard-to-shift stuff" items={hardToShiftItems} />
        <Column title="What we do" items={whatWeDoItems(region)} />
        <Column title="Who we do it for" items={whoWeDoItForItems} />
      </div>
    </SectionReveal>
  );
}
