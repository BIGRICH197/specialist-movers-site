import Link from "next/link";
import { ArrowLeftRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** The two scheduled runs. Edit here and the hero + /regular-runs both follow. */
export const regularRuns = [
  { route: "Auckland ⇄ Hamilton", cadence: "Every day" },
  { route: "Auckland ⇄ Tauranga & Bay of Plenty", cadence: "Every week" },
] as const;

export const REGULAR_RUNS_PATH = "/regular-runs";

/** Hero strip: the regular runs, linking to the page with details and the form. */
export function RegularRunsChips({ className }: { className?: string }) {
  return (
    <Link
      href={REGULAR_RUNS_PATH}
      aria-label="Our regular runs: Auckland to Hamilton every day, Auckland to Tauranga and Bay of Plenty every week"
      className={cn(
        "group flex w-full min-w-0 flex-wrap items-center gap-2 text-xs font-semibold text-white",
        className,
      )}
    >
      {regularRuns.map((run) => (
        <span
          key={run.route}
          className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-brand-yellow/50 bg-brand-yellow/10 px-3 py-1.5 transition-colors duration-200 group-hover:border-brand-yellow group-hover:bg-brand-yellow/20"
        >
          <ArrowLeftRight className="h-3.5 w-3.5 shrink-0 text-brand-yellow" aria-hidden />
          <span className="truncate">{run.route}</span>
          <span className="shrink-0 text-brand-yellow">· {run.cadence}</span>
        </span>
      ))}
      <span className="inline-flex items-center gap-0.5 text-brand-yellow underline-offset-2 group-hover:underline">
        Room on the truck?
        <ChevronRight className="h-3.5 w-3.5" aria-hidden />
      </span>
    </Link>
  );
}
