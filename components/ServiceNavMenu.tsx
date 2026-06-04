import Link from "next/link";
import { getServiceNavRows, serviceNavHubLink } from "@/lib/service-nav";

const linkClass =
  "block rounded-xl px-3 py-2 text-sm font-medium text-brand-yellow/90 transition-colors hover:bg-white/10 hover:text-brand-yellow";

type Props = {
  /** Show link to /services hub at the bottom */
  showHubLink?: boolean;
};

/** Two-column Auckland | Hamilton services menu for the header. */
export function ServiceNavMenu({ showHubLink = true }: Props) {
  const rows = getServiceNavRows();

  return (
    <div className="max-h-[min(70vh,28rem)] overflow-y-auto overscroll-contain">
      <div className="sticky top-0 z-10 grid grid-cols-2 border-b border-white/10 bg-brand-purple">
        <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-brand-yellow/55">
          Auckland
        </p>
        <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-brand-yellow/55">
          Hamilton
        </p>
      </div>

      <div className="px-1 pb-1 pt-1">
        {rows.map((row) => (
          <div key={row.key} className="grid grid-cols-2 gap-x-0.5">
            <Link href={row.auckland.href} className={linkClass}>
              {row.auckland.label}
            </Link>
            {row.hamilton ? (
              <Link href={row.hamilton.href} className={linkClass}>
                {row.hamilton.label}
              </Link>
            ) : (
              <span
                className="block px-3 py-2 text-sm text-brand-yellow/35"
                aria-hidden
              >
                —
              </span>
            )}
          </div>
        ))}
      </div>

      {showHubLink ? (
        <div className="border-t border-white/10 px-1 pb-1 pt-1">
          <Link href={serviceNavHubLink.href} className={`${linkClass} font-semibold`}>
            {serviceNavHubLink.label} →
          </Link>
        </div>
      ) : null}
    </div>
  );
}
