import type { ReactNode } from "react";
import { ProcessIllustration } from "@/components/ProcessIllustration";
import { cn } from "@/lib/utils";

export type NumberedInfoItem = {
  readonly title?: string;
  readonly body: ReactNode;
  readonly image?: string;
  readonly imageAlt?: string;
};

type Props = {
  items: readonly NumberedInfoItem[];
  /** 1, 2, or 3 columns on desktop */
  columns?: 1 | 2 | 3;
  /** First badge number (for split columns: left 1, right 3) */
  startNumber?: number;
  className?: string;
};

/**
 * Numbered cards , yellow badge, purple type, white surface (matches process steps).
 */
export function NumberedInfoGrid({
  items,
  columns = 2,
  startNumber = 1,
  className,
}: Props) {
  const colClass =
    columns === 3
      ? "md:grid-cols-3"
      : columns === 1
        ? "grid-cols-1"
        : "sm:grid-cols-2";

  return (
    <ul className={cn("m-0 grid list-none gap-4 p-0", colClass, className)}>
      {items.map((item, index) => {
        const n = startNumber + index;
        return (
          <li
            key={item.title ?? `item-${n}`}
            className={cn(
              "card-interactive relative rounded-2xl border border-brand-purple/15 bg-white p-6 pl-14 shadow-sm",
              item.image ? "pr-24 sm:pr-28" : "",
            )}
          >
            <span className="absolute left-5 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-brand-yellow font-heading text-sm font-bold text-brand-purple">
              {n}
            </span>
            {item.image ? (
              <div className="pointer-events-none absolute right-3 top-3 h-24 w-24 sm:right-4 sm:top-4 sm:h-28 sm:w-28">
                <ProcessIllustration
                  src={item.image}
                  alt={
                    item.imageAlt ?? (typeof item.title === "string" ? item.title : `Step ${n}`)
                  }
                  className="object-right-top"
                />
              </div>
            ) : null}
            {item.title ? (
              <h3 className="font-heading text-lg leading-snug text-brand-purple">{item.title}</h3>
            ) : null}
            <div
              className={cn(
                "text-sm leading-relaxed text-brand-purple/75",
                item.title ? "mt-2" : "",
              )}
            >
              {item.body}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
