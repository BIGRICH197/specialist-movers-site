import Link from "next/link";

export type Crumb = { label: string; href?: string };

type Props = {
  items: Crumb[];
  light?: boolean;
};

export function Breadcrumbs({ items, light }: Props) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((crumb, i) => (
          <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 && (
              <span
                className={light ? "text-white/45" : "text-brand-purple/40"}
                aria-hidden
              >
                /
              </span>
            )}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className={
                  light
                    ? "text-white/80 hover:text-brand-yellow"
                    : "text-brand-purple/70 hover:text-brand-purple"
                }
              >
                {crumb.label}
              </Link>
            ) : (
              <span className={light ? "text-white/95" : "text-brand-purple"}>
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
