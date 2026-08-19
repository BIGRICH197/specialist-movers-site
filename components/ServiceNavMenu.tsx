import Image from "next/image";
import Link from "next/link";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { brandAssets } from "@/lib/brand-assets";
import {
  getServiceNavMenuColumns,
  serviceNavCompanyLinks,
  serviceNavInternationalExtras,
  serviceNavPianoExtras,
  whatWeMoveNavLink,
  type ServiceNavRow,
} from "@/lib/service-nav";

type Props = {
  onNavigate?: () => void;
};

const cityLinkClass =
  "text-white/85 transition-colors hover:text-brand-yellow";

function ServiceNavRowItem({
  row,
  onNavigate,
}: {
  row: ServiceNavRow;
  onNavigate?: () => void;
}) {
  return (
    <div>
      <p className="font-heading text-sm font-bold leading-snug text-brand-yellow">
        {row.label}
      </p>
      <p className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
        <Link
          href={row.auckland.href}
          onClick={onNavigate}
          className={cityLinkClass}
        >
          {row.auckland.label}
        </Link>
        {row.hamilton ? (
          <Link
            href={row.hamilton.href}
            onClick={onNavigate}
            className={cityLinkClass}
          >
            {row.hamilton.label}
          </Link>
        ) : null}
      </p>
    </div>
  );
}

/** Full-width services mega menu, tagline, 2-column service grid, piano + company links. */
export function ServiceNavMenu({ onNavigate }: Props) {
  const { left: leftRows, right: rightRows } = getServiceNavMenuColumns();

  return (
    <div className="relative overflow-hidden py-6 sm:py-8">
      <BrandLogomarkWatermark
        mark="yellow"
        position="center-right"
        size={300}
        opacity={0.07}
      />
      <div className="relative z-[1] grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)_minmax(0,1fr)] lg:gap-10">
        <div>
          <p className="max-w-[14rem] text-sm leading-relaxed text-white/85">
            Auckland and Hamilton bases, servicing Auckland and the Waikato
          </p>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.instagram.com/specialistmovers/"
              aria-label="Instagram"
              className="rounded-lg border border-white/30 bg-white/10 p-2.5 transition hover:bg-white/20"
            >
              <Image
                src={brandAssets.socialInstagram}
                alt=""
                width={22}
                height={22}
                unoptimized
              />
            </a>
            <a
              href="https://www.facebook.com/people/Specialist-Movers/61563245376572/"
              aria-label="Facebook"
              className="rounded-lg border border-white/30 bg-white/10 p-2.5 transition hover:bg-white/20"
            >
              <Image
                src={brandAssets.socialFacebook}
                alt=""
                width={22}
                height={22}
                unoptimized
              />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:gap-x-10 sm:gap-y-5">
          <div className="space-y-4 sm:space-y-5">
            {leftRows.map((row) => (
              <ServiceNavRowItem
                key={row.key}
                row={row}
                onNavigate={onNavigate}
              />
            ))}
          </div>
          <div className="space-y-4 sm:space-y-5">
            {rightRows.map((row) => (
              <ServiceNavRowItem
                key={row.key}
                row={row}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>

        <div className="space-y-5 text-sm text-white/85">
          <p className="pb-4">
            <Link
              href={whatWeMoveNavLink.href}
              onClick={onNavigate}
              className="font-semibold text-brand-yellow transition-colors hover:text-white"
            >
              {whatWeMoveNavLink.label}
            </Link>
          </p>
          <ul className="space-y-2 border-t border-white/10 pt-4">
            {serviceNavPianoExtras.map((link) => (
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
          <ul className="mt-4 space-y-2 border-t border-white/10 pt-4">
            {serviceNavInternationalExtras.map((link) => (
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
          <ul className="space-y-2 border-t border-white/10 pt-4">
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
