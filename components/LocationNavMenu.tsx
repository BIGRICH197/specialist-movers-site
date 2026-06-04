import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import {
  locationNavDepotColumns,
  locationNavSidebarLinks,
  type LocationNavLink,
} from "@/lib/location-nav";
import { serviceNavCompanyLinks } from "@/lib/service-nav";

type Props = {
  onNavigate?: () => void;
};

const linkClass = "text-white/85 transition-colors hover:text-brand-yellow";

function TownLinks({
  links,
  onNavigate,
  columns = 1,
}: {
  links: readonly LocationNavLink[];
  onNavigate?: () => void;
  columns?: 1 | 2;
}) {
  const splitAt = columns === 2 ? Math.ceil(links.length / 2) : links.length;
  const cols =
    columns === 2
      ? [links.slice(0, splitAt), links.slice(splitAt)]
      : [links];

  return (
    <div className={columns === 2 ? "grid grid-cols-2 gap-x-6 gap-y-1" : ""}>
      {cols.map((col, colIdx) => (
        <ul key={colIdx} className="space-y-1">
          {col.map((item) => (
            <li key={item.href}>
              <Link href={item.href} onClick={onNavigate} className={`text-xs ${linkClass}`}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

/** Full-width locations mega menu — depot columns + sidebar links. */
export function LocationNavMenu({ onNavigate }: Props) {
  return (
    <div className="relative overflow-hidden py-4 sm:py-5">
      <BrandLogomarkWatermark
        mark="yellow"
        position="center-right"
        size={300}
        opacity={0.07}
      />
      <div className="relative z-[1] grid gap-6 lg:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)] lg:gap-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:gap-x-10">
          {locationNavDepotColumns.map((depot) => (
            <div key={depot.id}>
              <p className="font-heading text-sm font-bold text-brand-yellow">
                {depot.depotTitle}
              </p>
              <p className="mt-0.5 text-xs text-white/65">{depot.coverageTitle}</p>

              {depot.primaryLink ? (
                <Link
                  href={depot.primaryLink.href}
                  onClick={onNavigate}
                  className="mt-2 flex items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-semibold text-brand-yellow transition hover:bg-white/10"
                >
                  <span>{depot.primaryLink.label}</span>
                  <ChevronRight className="h-4 w-4 shrink-0" aria-hidden />
                </Link>
              ) : null}

              {depot.subsections.map((section) => (
                <div
                  key={section.title ?? depot.id}
                  className={depot.primaryLink ? "mt-3" : "mt-2"}
                >
                  {section.title ? (
                    <p className="mb-1.5 text-[11px] font-bold uppercase tracking-wider text-brand-yellow/55">
                      {section.title}
                    </p>
                  ) : null}
                  <TownLinks
                    links={section.links}
                    onNavigate={onNavigate}
                    columns={section.links.length > 5 ? 2 : 1}
                  />
                  {section.footnote ? (
                    <p className="mt-1.5 text-[11px] leading-relaxed text-white/55">
                      {section.footnote}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="space-y-4 text-sm text-white/85">
          <ul className="space-y-2">
            {locationNavSidebarLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="transition-colors hover:text-brand-yellow"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 border-t border-white/10 pt-3">
            {serviceNavCompanyLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="transition-colors hover:text-brand-yellow"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
