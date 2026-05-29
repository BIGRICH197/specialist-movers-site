import Link from "next/link";
import { Check } from "lucide-react";
import { HeroVisual } from "@/components/HeroVisual";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { QuoteForm } from "@/components/QuoteForm";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import type { ServiceClusterItem } from "@/lib/service-clusters";
import { resolveServiceLink } from "@/lib/service-links";
import { getServicePhoto } from "@/lib/site-photos";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

type Props = {
  item: ServiceClusterItem;
  hubLabel: string;
  hubHref: string;
  photoSlug?: string;
  pageMomentKey?: string;
};

export function ServiceClusterDetail({
  item,
  hubLabel,
  hubHref,
  photoSlug = "house-moving",
  pageMomentKey,
}: Props) {
  const breadcrumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: hubLabel, href: hubHref },
    { label: item.title },
  ];

  const heroPhoto = getServicePhoto(photoSlug) ?? getServicePhoto("house-moving");

  return (
    <div className="bg-brand-white">
      <section className="border-b border-white/10 bg-brand-purple py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center container-px">
          <div>
            <Breadcrumbs items={breadcrumbs} light />
            <h1 className="mt-2 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {item.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/88 sm:text-lg">
              {item.description}
            </p>
            <a
              href={`tel:${phoneNumber}`}
              className="mt-6 inline-flex font-heading text-xl font-bold text-brand-yellow transition-colors duration-200 hover:text-white sm:text-2xl"
            >
              {phoneDisplay}
            </a>
            <p className="mt-4 text-sm text-white/75">
              <Link href="/#whats-included" className="underline hover:text-white">
                See what&apos;s included in every move →
              </Link>
            </p>
          </div>
          {heroPhoto ? (
            <HeroVisual
              photoSrc={heroPhoto}
              photoAlt={`${item.title}, Specialist Movers`}
            />
          ) : null}
        </div>
      </section>

      {pageMomentKey ? <PagePhotoMomentStrip momentKey={pageMomentKey} /> : null}

      <section className="mx-auto grid max-w-7xl gap-10 py-12 container-px lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:items-start">
        <article className="space-y-10">
          <div className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-2xl text-brand-purple">
              What&apos;s included
            </h2>
            <ul className="mt-5 space-y-3">
              {item.includedBullets.map((b) => (
                <li key={b} className="flex gap-3 text-brand-purple/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow/90 text-brand-purple">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-brand-purple/15 bg-brand-purple/[0.04] p-6 sm:p-8">
            <h2 className="font-heading text-2xl text-brand-purple">Why Specialist Movers</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
              {item.whyChooseCopy}
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl text-brand-purple">Related services</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.relatedSlugs.map((slug) => {
                const link = resolveServiceLink(slug);
                if (!link) return null;
                return (
                  <Link
                    key={slug}
                    href={link.href}
                    className="rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple transition hover:border-brand-purple/40 hover:bg-brand-yellow/30"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </article>

        <div id="quote" className="lg:sticky lg:top-28">
          <p className="mb-2 font-heading text-sm font-bold uppercase tracking-wide text-brand-purple">
            Request a free quote
          </p>
          <QuoteForm defaultJobType={item.defaultJobType} />
        </div>
      </section>
    </div>
  );
}
