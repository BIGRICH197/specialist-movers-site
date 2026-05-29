"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { MoveInclusionCategory } from "@/lib/service-clusters";
import { cn } from "@/lib/utils";

type Props = {
  categories: readonly MoveInclusionCategory[];
  /** Light cards on white, or inverted on purple band */
  variant?: "light" | "purple";
};

export function InclusionAccordion({ categories, variant = "light" }: Props) {
  const [openId, setOpenId] = useState<string>(categories[0]?.id ?? "");
  const onPurple = variant === "purple";

  return (
    <div
      className={cn(
        "divide-y rounded-2xl shadow-sm",
        onPurple
          ? "divide-white/15 border border-white/20 bg-white/10 backdrop-blur-sm"
          : "divide-brand-purple/12 border border-brand-purple/15 bg-white",
      )}
    >
      {categories.map((cat) => {
        const isOpen = openId === cat.id;
        return (
          <div key={cat.id}>
            <button
              type="button"
              className={cn(
                "flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition sm:px-6 sm:py-5",
                onPurple ? "hover:bg-white/10" : "hover:bg-brand-purple/[0.03]",
              )}
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? "" : cat.id)}
            >
              <span
                className={cn(
                  "font-heading text-lg sm:text-xl",
                  onPurple ? "text-white" : "text-brand-purple",
                )}
              >
                {cat.title}
              </span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 transition-transform duration-200",
                  isOpen ? "rotate-180" : "",
                  onPurple ? "text-brand-yellow/80" : "text-brand-purple/50",
                )}
              />
            </button>
            {isOpen ? (
              <div
                className={cn(
                  "border-t px-5 pb-5 pt-1 sm:px-6 sm:pb-6",
                  onPurple ? "border-white/15" : "border-brand-purple/10",
                )}
              >
                {cat.intro ? (
                  <p
                    className={cn(
                      "mb-3 text-sm leading-relaxed",
                      onPurple ? "text-white/85" : "text-brand-purple/78",
                    )}
                  >
                    {cat.intro}
                  </p>
                ) : null}
                <ul className="space-y-2.5">
                  {cat.bullets.map((b) => (
                    <li
                      key={b}
                      className={cn(
                        "flex gap-3 text-sm",
                        onPurple ? "text-white/90" : "text-brand-purple/85",
                      )}
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow text-brand-purple">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
