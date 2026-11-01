import Link from "next/link";
import { ArrowLeftRight } from "lucide-react";
import { cn } from "@/lib/utils";

export const REGULAR_RUNS_PATH = "/regular-runs";

const runs = [
  { to: "Hamilton", cadence: "Daily" },
  { to: "Tauranga", cadence: "Weekly" },
] as const;

/** One thin line of yellow text above the homepage title, linking to /regular-runs. */
export function RegularRunsLine({ className }: { className?: string }) {
  return (
    <Link
      href={REGULAR_RUNS_PATH}
      aria-label="Truck space: Auckland to Hamilton daily, Auckland to Tauranga weekly"
      className={cn(
        "inline-flex w-fit max-w-full items-center gap-1.5 whitespace-nowrap text-[11px] font-light tracking-normal sm:gap-2 sm:tracking-wide text-brand-yellow transition-colors duration-200 hover:text-white sm:text-sm",
        className,
      )}
    >
      <span className="font-normal">Truck space:</span>
      {runs.map((run, i) => (
        <span key={run.to} className="inline-flex items-center gap-1.5 sm:gap-2">
          {i > 0 ? <span aria-hidden>·</span> : null}
          <span className="inline-flex items-center gap-0.5 sm:gap-1">
            Auckland
            <ArrowLeftRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={1.25} aria-hidden />
            {run.to} {run.cadence}
          </span>
        </span>
      ))}
    </Link>
  );
}
