import type { Metadata } from "next";
import Link from "next/link";
import { LocationSearch } from "@/components/LocationSearch";
import { PageHero } from "@/components/PageHero";
import { SectionReveal } from "@/components/SectionReveal";
import { getLocationHubGroups } from "@/lib/locations";
import { regions } from "@/lib/regions";

export const metadata: Metadata = {
  title: "Areas We Serve",
  description:
    "House and piano movers across Auckland suburbs and the Waikato. Bases in Auckland (Wairau Valley) and Hamilton. Find your area and get a free quote.",
};

export default function LocationsPage() {
  const hubGroups = getLocationHubGroups();

  return (
    <div className="bg-brand-canvas">
      <PageHero
        variant="purple"
        eyebrow="Service areas"
        title="Areas we serve"
        description={`${regions.basesLong}. Search your suburb or browse Auckland regions and Waikato towns below. Every area listed has its own page with how we work in your neighbourhood.`}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Locations" }]}
      />

      <SectionReveal className="mx-auto max-w-7xl py-12 container-px sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:items-start">
          <LocationSearch />
          <div className="rounded-2xl border border-brand-purple/15 bg-brand-purple/[0.04] p-6">
            <h2 className="font-heading text-xl text-brand-purple">Quick links</h2>
            <p className="mt-2 text-sm text-brand-purple/75">
              Auckland regions and Waikato towns we serve.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-purple/50">
              Auckland regions
            </p>
            <ul className="mt-2 space-y-2">
              {hubGroups[0].regions.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/locations/${r.slug}`}
                    className="text-sm font-semibold text-brand-purple underline decoration-brand-purple/30 underline-offset-2 hover:decoration-brand-purple"
                  >
                    {r.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-brand-purple/50">
              Waikato towns
            </p>
            <ul className="mt-2 columns-2 gap-x-4 space-y-2">
              {[...hubGroups[1].towns]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((t) => (
                  <li key={t.slug} className="break-inside-avoid">
                    <Link
                      href={`/locations/${t.slug}`}
                      className="text-sm font-semibold text-brand-purple underline decoration-brand-purple/30 underline-offset-2 hover:decoration-brand-purple"
                    >
                      {t.name}
                    </Link>
                  </li>
                ))}
            </ul>
            <Link
              href="/#quote"
              className="mt-6 inline-flex rounded-full bg-brand-purple px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-brand-yellow"
            >
              Free quote
            </Link>
          </div>
        </div>

        {hubGroups.map((group) => (
          <div key={group.id} className="mt-14 border-t border-brand-purple/10 pt-12 first:mt-14">
            <h2 className="font-heading text-3xl text-brand-purple">{group.title}</h2>

            {group.regions.length > 0 && (
              <div className="mt-8">
                <h3 className="font-heading text-lg text-brand-purple/90">Regions</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.regions.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/locations/${r.slug}`}
                      className="card-interactive rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-sm"
                    >
                      <p className="font-heading text-lg text-brand-purple">{r.name}</p>
                      <p className="mt-2 line-clamp-2 text-sm text-brand-purple/75">{r.intro}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {group.suburbs.length > 0 && (
              <div className="mt-10">
                <h3 className="font-heading text-lg text-brand-purple/90">Suburbs</h3>
                <ul className="mt-4 columns-2 gap-x-6 sm:columns-3 lg:columns-4">
                  {[...group.suburbs]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((s) => (
                      <li key={s.slug} className="mb-2 break-inside-avoid">
                        <Link
                          href={`/locations/${s.slug}`}
                          className="text-sm font-medium text-brand-purple/90 underline decoration-brand-purple/20 underline-offset-2 hover:text-brand-purple hover:decoration-brand-purple"
                        >
                          {s.name}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {group.towns.length > 0 && (
              <div className="mt-10">
                <h3 className="font-heading text-lg text-brand-purple/90">Waikato towns</h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {group.towns.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/locations/${t.slug}`}
                      className="card-interactive rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-sm"
                    >
                      <p className="font-heading text-lg text-brand-purple">{t.name}</p>
                      <p className="mt-2 line-clamp-2 text-sm text-brand-purple/75">{t.intro}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </SectionReveal>
    </div>
  );
}
