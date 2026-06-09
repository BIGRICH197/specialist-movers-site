import { Check } from "lucide-react";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { ServiceTrustindexBand } from "@/components/ServiceTrustindexBand";
import { HeroVisual } from "@/components/HeroVisual";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { NumberedInfoGrid } from "@/components/NumberedInfoGrid";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceHeroWithQuote } from "@/components/ServiceHeroWithQuote";
import { SectionReveal } from "@/components/SectionReveal";
import {
  ServiceBottomCta,
  ServiceFaqSection,
  ServiceProcessSection,
  ServiceRelatedLink,
  ServiceRelatedLinksSection,
  ServiceWhyChooseSection,
} from "@/components/ServiceLandingSections";
import { getServiceProcessSteps } from "@/lib/process-steps-with-images";
import { getDistinctAboutPhoto } from "@/lib/site-photos";
import { houseMovingProcess } from "@/lib/moving-process";
import type { NicheServicePageConfig } from "@/lib/niche-service-pages";
import { halfPhotoWrap } from "@/lib/photo-layout";
import {
  getServiceHeroDetail,
  getServiceHeroOverlayCaption,
  serviceHeroSubline,
} from "@/lib/service-hero-detail";

type Props = {
  config: NicheServicePageConfig;
};

function nicheMomentKey(path: string): string {
  if (path.includes("australia")) return "services/international-moving";
  return "services/house-moving";
}

function nicheReviewSlug(path: string): string {
  if (path.includes("apartment") || path.includes("retirement")) return "house-moving";
  return "international-moving";
}

export function NicheServicePage({ config }: Props) {
  const crumbs: Crumb[] = config.breadcrumbs.map((c) => ({
    label: c.label,
    href: c.href,
  }));
  const reviewSlug = nicheReviewSlug(config.path);
  const processSteps =
    config.processTitle === houseMovingProcess.title
      ? getServiceProcessSteps("house-moving")
      : houseMovingProcess.steps.map((s) => ({ title: s.title, body: s.body }));

  return (
    <div className="bg-brand-white">
      <FaqPageJsonLd items={config.faqs} />
      <ServiceHeroWithQuote
        googleBadgeLiftCm={
          config.path.includes("retirement-home-movers") ? 2.8 : undefined
        }
        topNav={<Breadcrumbs items={crumbs} light />}
        title={
          <h1 className="font-heading text-3xl leading-[1.12] text-white sm:text-4xl lg:leading-[1.12]">
            {config.h1}
          </h1>
        }
        lead={
          <p className="max-w-2xl text-base leading-relaxed text-white/85">
            {config.lead}
          </p>
        }
        heroDetail={getServiceHeroDetail(reviewSlug)}
        subline={
          <p className="inline-block max-w-xl rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold leading-snug text-white/90">
            {config.subline || serviceHeroSubline}
          </p>
        }
        photo={
          <HeroVisual
            variant="moving"
            className={halfPhotoWrap}
            photoSrc={config.heroPhoto}
            photoAlt={config.heroPhotoAlt}
            overlayCaption={
              config.heroOverlayCaption ??
              getServiceHeroOverlayCaption(reviewSlug)
            }
            priority
          />
        }
        quote={<QuoteForm defaultJobType={config.defaultJobType} />}
      />

      <ServiceTrustindexBand />

      <PagePhotoMomentStrip
        momentKey={nicheMomentKey(config.path)}
        tone="purple"
        useQuoteAnchor={false}
      />

      <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl container-px">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div className="min-w-0">
              <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
                {config.aboutTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
                {config.aboutBody}
              </p>
            </div>
            <HeroVisual
              variant="moving"
              photoSrc={
                config.aboutSidePhoto ??
                getDistinctAboutPhoto("house-moving", config.heroPhoto)
              }
              photoAlt={config.aboutSidePhotoAlt ?? config.heroPhotoAlt}
              className="w-full"
            />
          </div>
          <NumberedInfoGrid
            columns={3}
            className="mt-8"
            items={config.trustHighlights.map((item) => ({
              title: item.title,
              body: item.text,
            }))}
          />
        </div>
      </SectionReveal>

      <ServiceWhyChooseSection title={config.whyTitle} body={config.whyBody} />

      <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl container-px">
          <div className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="font-heading text-xl text-brand-purple">What we handle</h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {config.includedBullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm text-brand-purple/85">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow/90 text-brand-purple">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SectionReveal>

      {config.processTitle ? (
        <ServiceProcessSection
          title={config.processTitle}
          steps={processSteps}
          reviewSlot={`niche-${reviewSlug}-process`}
        />
      ) : null}

      <ServiceRelatedLinksSection>
        {config.relatedLinks.map((link) => (
          <ServiceRelatedLink key={link.href} href={link.href}>
            {link.label}
          </ServiceRelatedLink>
        ))}
      </ServiceRelatedLinksSection>

      <ServiceFaqSection
        heading={config.faqHeading}
        faqs={config.faqs}
        reviewSlot={`niche-${reviewSlug}-faq`}
      />

      <ServiceBottomCta defaultJobType={config.defaultJobType} />
    </div>
  );
}
