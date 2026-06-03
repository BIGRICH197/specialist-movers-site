import Link from "next/link";
import {
  getServiceCityPath,
  hasServiceCityPages,
  serviceCitySlugs,
  type ServiceCitySlug,
} from "@/lib/service-cities";

const cityLabels: Record<ServiceCitySlug, string> = {
  auckland: "Auckland",
  hamilton: "Hamilton",
};

type Props = {
  serviceSlug: string;
  variant?: "hero" | "inline";
};

export function ServiceCityLinks({ serviceSlug, variant = "inline" }: Props) {
  if (!hasServiceCityPages(serviceSlug)) return null;

  const linkClass =
    variant === "hero"
      ? "rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-1.5 text-xs font-semibold text-brand-yellow transition hover:bg-brand-yellow/20"
      : "rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40";

  return (
    <div className={variant === "hero" ? "mt-5 flex flex-wrap gap-2" : "mt-4 flex flex-wrap gap-2"}>
      {serviceCitySlugs.map((city) => {
        const href = getServiceCityPath(serviceSlug, city);
        if (!href) return null;
        return (
          <Link key={city} href={href} className={linkClass}>
            {cityLabels[city]} page →
          </Link>
        );
      })}
    </div>
  );
}
