import Link from "next/link";
import { hamiltonPath, hasHamiltonPage } from "@/lib/hamilton-pages";

type Props = {
  serviceSlug: string;
  variant?: "hero" | "inline";
};

/** Link to the dedicated Hamilton service page (SEO: separate URL, not /city subpath). */
export function HamiltonPageLink({ serviceSlug, variant = "inline" }: Props) {
  if (!hasHamiltonPage(serviceSlug)) return null;

  const href = hamiltonPath(
    serviceSlug as Parameters<typeof hamiltonPath>[0],
  );
  const linkClass =
    variant === "hero"
      ? "rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-1.5 text-xs font-semibold text-brand-yellow transition hover:bg-brand-yellow/20"
      : "rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40";

  return (
    <div className={variant === "hero" ? "mt-5 flex flex-wrap gap-2" : "mt-4 flex flex-wrap gap-2"}>
      <Link href={href} className={linkClass}>
        {serviceSlug === "piano-movers" ? "Hamilton piano page →" : "Hamilton service page →"}
      </Link>
    </div>
  );
}
