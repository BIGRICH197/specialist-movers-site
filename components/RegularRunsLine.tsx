import Link from "next/link";
import { cn } from "@/lib/utils";

export const REGULAR_RUNS_PATH = "/regular-runs";

/** One line of small yellow text above the homepage title, linking to /regular-runs. */
export function RegularRunsLine({ className }: { className?: string }) {
  return (
    <Link
      href={REGULAR_RUNS_PATH}
      className={cn(
        "block w-full min-w-0 truncate text-xs font-semibold tracking-wide text-brand-yellow underline-offset-4 transition-colors duration-200 hover:text-white hover:underline sm:text-sm",
        className,
      )}
    >
      <span className="sm:hidden">Hamilton every day · Tauranga every week ›</span>
      <span className="hidden sm:inline">
        Auckland to Hamilton every day · Auckland to Tauranga &amp; Bay of Plenty every week ›
      </span>
    </Link>
  );
}
