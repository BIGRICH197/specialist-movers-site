import Link from "next/link";
import { Check } from "lucide-react";
import { HeroVisual } from "@/components/HeroVisual";
import { QuoteForm } from "@/components/QuoteForm";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { ServiceHeroWithQuote } from "@/components/ServiceHeroWithQuote";
import type { ServiceClusterItem } from "@/lib/service-clusters";
import { resolveServiceLink } from "@/lib/service-links";
import { getServicePhoto } from "@/lib/site-photos";

type Props = {
  item: ServiceClusterItem;
  hubLabel: string;
  hubHref: string;
  photoSlug?: string;
};

export function ServiceClusterDetail({
  item,
  hubLabel,
  hubHref,
  photoSlug = "house-moving",
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
      <ServiceHeroWithQuote
        topNav={<Breadcrumbs items={breadcrumbs} light />}
        title={
          <h1 className="font-heading text-3xl leading-[1.12] text-white sm:text-4xl lg:text-5xl lg:leading-tight">
            {item.title}
          </h1>
        }
        lead={
          <p className="max-w-2xl text-base leading-relaxed text-white/88 sm:text-lg">
            {item.description}
          </p>
        }
        meta={
          <p className="text-sm text-white/75">
            <Link href="/#whats-included" className="underline hover:text-white">
              See what&apos;s included in every move →
            </Link>
          </p>
        }
        photo={
          heroPhoto ? (
            <HeroVisual
              photoSrc={heroPhoto}
              photoAlt={`${item.title}, Specialist Movers`}
            />
          ) : undefined
        }
        quote={<QuoteForm defaultJobType={item.defaultJobType} />}
      />

      <section className="mx-auto max-w-7xl py-12 container-px">
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
      </section>
    </div>
  );
}
