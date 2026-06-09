import Link from "next/link";
import { Check } from "lucide-react";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { GoogleReviewsBand } from "@/components/GoogleReviewsBand";
import { HeroVisual } from "@/components/HeroVisual";
import { ProcessStepsGrid } from "@/components/ProcessStepsGrid";
import { QuoteForm } from "@/components/QuoteForm";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { ServiceHeroWithQuote } from "@/components/ServiceHeroWithQuote";
import { getClusterSeoExtension } from "@/lib/cluster-seo";
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
  const seo = getClusterSeoExtension(item.slug);
  const breadcrumbs: Crumb[] = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: hubLabel, href: hubHref },
    { label: item.title },
  ];

  const heroPhoto = getServicePhoto(photoSlug) ?? getServicePhoto("house-moving");
  const faqs = seo?.faqs ?? [];

  return (
    <div className="bg-brand-white">
      {faqs.length > 0 ? <FaqPageJsonLd items={faqs} /> : null}
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
          {seo && seo.bodyParagraphs.length > 0 ? (
            <div className="space-y-4 text-base leading-relaxed text-brand-purple/85">
              {seo.bodyParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          ) : null}

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

          {seo && seo.processSteps.length > 0 ? (
            <div className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-heading text-2xl text-brand-purple">{seo.processTitle}</h2>
              <ProcessStepsGrid steps={seo.processSteps} className="mt-6" />
            </div>
          ) : null}

          <GoogleReviewsBand slot={`cluster-${item.slug}`} piano={seo?.piano} />

          {faqs.length > 0 ? (
            <div>
              <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
                Common questions
              </h2>
              <dl className="mt-6 space-y-4">
                {faqs.map((faq) => (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-brand-purple/12 bg-white p-5 shadow-sm"
                  >
                    <dt className="font-heading text-base text-brand-purple">{faq.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-brand-purple/80">
                      {faq.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

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
