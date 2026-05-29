import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { SectionReveal } from "@/components/SectionReveal";
import { NumberedInfoGrid } from "@/components/NumberedInfoGrid";
import type { Location } from "@/lib/locations";
import { getChildLocations, getLocation, getNearbyLocations } from "@/lib/locations";
import { regions } from "@/lib/regions";

type Props = {
  location: Location;
};

export function LocationPageTemplate({ location }: Props) {
  const children = location.kind === "region" ? getChildLocations(location.slug) : [];
  const parent = location.parentSlug ? getLocation(location.parentSlug) : null;
  const nearby = getNearbyLocations(location);

  const kindLabel =
    location.kind === "region" ? "Region" : location.kind === "town" ? "Waikato" : "Suburb";

  return (
    <div className="bg-brand-canvas">
      <PageHero
        variant="purple"
        eyebrow={`${kindLabel} · ${regions.serviceAreaBadge}`}
        title={
          location.kind === "suburb"
            ? `Movers ${location.name}`
            : `${location.name} movers`
        }
        description={location.intro}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          ...(parent
            ? [{ label: parent.name, href: `/locations/${parent.slug}` }]
            : []),
          { label: location.name },
        ]}
      />

      <SectionReveal className="mx-auto max-w-7xl py-12 container-px sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:items-start lg:gap-12">
          <div>
            <div className="space-y-4 text-base leading-relaxed text-brand-purple/85">
              {location.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <NumberedInfoGrid
              className="mt-8"
              columns={2}
              items={location.highlights.map((body) => ({ body }))}
            />

            {children.length > 0 && (
              <div className="mt-10">
                <h2 className="font-heading text-2xl text-brand-purple">
                  Suburbs in {location.name}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {children.map((sub) => (
                    <li key={sub.slug}>
                      <Link
                        href={`/locations/${sub.slug}`}
                        className="card-interactive inline-block rounded-full border border-brand-purple/15 bg-white px-4 py-2 text-sm font-medium text-brand-purple shadow-sm"
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {nearby.length > 0 && children.length === 0 && (
              <div className="mt-10">
                <h2 className="font-heading text-2xl text-brand-purple">Nearby areas</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {nearby.map((loc) => (
                    <li key={loc.slug}>
                      <Link
                        href={`/locations/${loc.slug}`}
                        className="card-interactive inline-block rounded-full border border-brand-purple/15 bg-white px-4 py-2 text-sm font-medium text-brand-purple shadow-sm"
                      >
                        {loc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <p className="mt-10 text-sm text-brand-purple/70">
              <Link href="/locations" className="font-semibold text-brand-purple underline">
                ← All areas we serve
              </Link>
              {" · "}
              <Link href="/services/house-moving" className="font-semibold text-brand-purple underline">
                House moving
              </Link>
              {" · "}
              <Link href="/piano-movers" className="font-semibold text-brand-purple underline">
                Piano movers
              </Link>
            </p>
          </div>

          <div id="quote" className="lg:sticky lg:top-28">
            <QuoteForm />
          </div>
        </div>
      </SectionReveal>
    </div>
  );
}
