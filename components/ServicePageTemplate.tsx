import Link from "next/link";
import { Check } from "lucide-react";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { GoogleReviewsBand } from "@/components/GoogleReviewsBand";
import { HeroVisual } from "@/components/HeroVisual";
import { CleaningBookingForm } from "@/components/CleaningBookingForm";
import { ProcessStepsGrid, type ProcessStep } from "@/components/ProcessStepsGrid";
import { QuoteForm } from "@/components/QuoteForm";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { HamiltonPageLink } from "@/components/HamiltonPageLink";
import { ServiceHeroWithQuote } from "@/components/ServiceHeroWithQuote";
import { resolveServiceLink } from "@/lib/service-links";
import type { FaqItem } from "@/lib/service-faqs";
import { services } from "@/lib/site-data";

type ServicePageTemplateProps = {
  title: string;
  description: string;
  includedBullets: readonly string[];
  whyChooseCopy: string;
  relatedSlugs: readonly string[];
  defaultJobType: (typeof services)[number]["defaultJobType"];
  breadcrumbs: Crumb[];
  heroPhoto?: string;
  heroPhotoAlt?: string;
  hamiltonBaseSlug?: string;
  useCleaningQuoteForm?: boolean;
  extraRelatedLinks?: readonly { label: string; href: string }[];
  bodyParagraphs?: readonly string[];
  faqs?: readonly FaqItem[];
  processTitle?: string;
  processSteps?: readonly ProcessStep[];
  reviewSlot?: string;
  pianoReviews?: boolean;
};

export function ServicePageTemplate({
  title,
  description,
  includedBullets,
  whyChooseCopy,
  relatedSlugs,
  defaultJobType,
  breadcrumbs,
  heroPhoto,
  heroPhotoAlt,
  hamiltonBaseSlug,
  useCleaningQuoteForm = false,
  extraRelatedLinks = [],
  bodyParagraphs = [],
  faqs = [],
  processTitle = "How we run your move",
  processSteps = [],
  reviewSlot,
  pianoReviews = false,
}: ServicePageTemplateProps) {
  const slot = reviewSlot ?? `service-${hamiltonBaseSlug ?? "page"}`;

  return (
    <div className="bg-brand-white">
      {faqs.length > 0 ? <FaqPageJsonLd items={faqs} /> : null}
      <ServiceHeroWithQuote
        topNav={<Breadcrumbs items={breadcrumbs} light />}
        title={
          <h1 className="font-heading text-3xl leading-[1.12] text-white sm:text-4xl lg:text-5xl lg:leading-tight">
            {title}
          </h1>
        }
        lead={
          <p className="max-w-2xl text-base leading-relaxed text-white/88 sm:text-lg">
            {description}
          </p>
        }
        meta={
          hamiltonBaseSlug ? (
            <HamiltonPageLink serviceSlug={hamiltonBaseSlug} variant="hero" />
          ) : null
        }
        photo={
          heroPhoto ? (
            <HeroVisual
              photoSrc={heroPhoto}
              photoAlt={heroPhotoAlt ?? `${title} , Specialist Movers`}
              priority
            />
          ) : undefined
        }
        quote={
          useCleaningQuoteForm ? (
            <CleaningBookingForm />
          ) : (
            <QuoteForm defaultJobType={defaultJobType} />
          )
        }
      />

      <section className="mx-auto max-w-7xl py-12 container-px">
        <article className="space-y-10">
          {bodyParagraphs.length > 0 ? (
            <div className="space-y-4 text-base leading-relaxed text-brand-purple/85">
              {bodyParagraphs.map((p) => (
                <p key={p.slice(0, 48)}>{p}</p>
              ))}
            </div>
          ) : null}

          <div className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-2xl text-brand-purple">
              What&apos;s included
            </h2>
            <ul className="mt-5 space-y-3">
              {includedBullets.map((b) => (
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
            <h2 className="font-heading text-2xl text-brand-purple">
              Why choose us for this service
            </h2>
            <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
              {whyChooseCopy}
            </p>
          </div>

          {processSteps.length > 0 ? (
            <div className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="font-heading text-2xl text-brand-purple">{processTitle}</h2>
              <ProcessStepsGrid steps={processSteps} className="mt-6" />
            </div>
          ) : null}

          <GoogleReviewsBand slot={slot} piano={pianoReviews} />

          {faqs.length > 0 ? (
            <div>
              <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
                Common questions
              </h2>
              <dl className="mt-6 space-y-4">
                {faqs.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-brand-purple/12 bg-white p-5 shadow-sm"
                  >
                    <dt className="font-heading text-base text-brand-purple">{item.q}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-brand-purple/80">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ) : null}

          <div>
            <h2 className="font-heading text-xl text-brand-purple">
              Related services
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {extraRelatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40 hover:bg-brand-purple/[0.04]"
                >
                  {link.label}
                </Link>
              ))}
              {relatedSlugs.map((slug) => {
                const link = resolveServiceLink(slug);
                if (!link) return null;
                return (
                  <Link
                    key={slug}
                    href={link.href}
                    className="rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40 hover:bg-brand-purple/[0.04]"
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
