import { Check } from "lucide-react";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { ServiceJsonLd } from "@/components/ServiceJsonLd";
import { ServiceTrustindexBand } from "@/components/ServiceTrustindexBand";
import { HardToShiftGallerySection } from "@/components/HardToShiftGallerySection";
import { WhatWeMoveSection } from "@/components/WhatWeMoveSection";
import { HeroVisual } from "@/components/HeroVisual";
import { InsuranceExplainer } from "@/components/InsuranceExplainer";
import { CleaningBookingForm } from "@/components/CleaningBookingForm";
import { HardToShiftEnquiryForm } from "@/components/HardToShiftEnquiryForm";
import { QuoteForm } from "@/components/QuoteForm";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import type { Crumb } from "@/components/Breadcrumbs";
import { HamiltonPageLink } from "@/components/HamiltonPageLink";
import { ServiceContentUpdated } from "@/components/ServiceContentUpdated";
import { SectionReveal } from "@/components/SectionReveal";
import { ServiceHeroWithQuote } from "@/components/ServiceHeroWithQuote";
import {
  ServiceBottomCta,
  ServiceFaqSection,
  ServiceProcessSection,
  ServiceRelatedLink,
  ServiceRelatedLinksSection,
  ServiceWhyChooseSection,
} from "@/components/ServiceLandingSections";
import { getServiceProcessSteps } from "@/lib/process-steps-with-images";
import { resolveServiceLink } from "@/lib/service-links";
import type { FaqItem } from "@/lib/service-faqs";
import { ServiceHeroSublinePrice } from "@/components/ServiceHeroSublinePrice";
import { getServiceHeroDetail, getServiceHeroEyebrow, getServiceHeroOverlayCaption, getServiceHeroSubline } from "@/lib/service-hero-detail";
import { getPianoHeroH1 } from "@/lib/piano-mobile-hero";
import { getServiceHeroH1 } from "@/lib/service-hero-h1";
import { getServiceSeoIntro } from "@/lib/service-seo-intro";
import { getDistinctAboutPhoto, getServicePhoto } from "@/lib/site-photos";
import { services } from "@/lib/site-data";
import type { ProcessStep } from "@/components/ProcessStepsGrid";

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
  /** Defaults to services/{hamiltonBaseSlug}; piano subs use piano-movers/{slug}. */
  momentKey?: string;
  useCleaningQuoteForm?: boolean;
  useHardToShiftForm?: boolean;
  extraRelatedLinks?: readonly { label: string; href: string }[];
  bodyParagraphs?: readonly string[];
  faqs?: readonly FaqItem[];
  processTitle?: string;
  processSteps?: readonly ProcessStep[];
  heroVariant?: "moving" | "piano";
  /** Defaults to hamiltonBaseSlug; use piano sub-slugs for distinct on-photo slogans. */
  overlayCaptionSlug?: string;
  /** Canonical path for Service JSON-LD */
  schemaPath?: string;
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
  momentKey,
  useCleaningQuoteForm = false,
  useHardToShiftForm = false,
  extraRelatedLinks = [],
  bodyParagraphs = [],
  faqs = [],
  processTitle = "How we run your move",
  processSteps = [],
  heroVariant = "moving",
  overlayCaptionSlug,
  schemaPath,
}: ServicePageTemplateProps) {
  const slug = hamiltonBaseSlug ?? "house-moving";
  const heroHeading =
    heroVariant === "piano" && hamiltonBaseSlug
      ? getPianoHeroH1(hamiltonBaseSlug, "Auckland")
      : hamiltonBaseSlug
        ? getServiceHeroH1(hamiltonBaseSlug, "Auckland")
        : title;
  const resolvedSteps =
    processSteps.length > 0 ? processSteps : getServiceProcessSteps(slug);
  const reviewSlot = `service-${slug}`;
  const seoIntroText = hamiltonBaseSlug ? getServiceSeoIntro(hamiltonBaseSlug) : undefined;
  const resolvedMomentKey = momentKey ?? (hamiltonBaseSlug ? `services/${hamiltonBaseSlug}` : undefined);
  const aboutPhoto = hamiltonBaseSlug
    ? getDistinctAboutPhoto(
        hamiltonBaseSlug,
        heroPhoto ?? getServicePhoto(hamiltonBaseSlug) ?? "",
      )
    : undefined;

  return (
    <div className="bg-brand-white">
      {schemaPath ? (
        <ServiceJsonLd
          name={heroHeading}
          description={description}
          path={schemaPath}
        />
      ) : null}
      {faqs.length > 0 ? <FaqPageJsonLd items={faqs} /> : null}
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ServiceHeroWithQuote
        heroVariant={heroVariant}
        heading={heroHeading}
        titleSlug={hamiltonBaseSlug}
        eyebrowLabel={
          hamiltonBaseSlug ? getServiceHeroEyebrow(hamiltonBaseSlug) : undefined
        }
        lead={
          <p className="max-w-2xl text-base leading-relaxed text-white/85">
            {description}
          </p>
        }
        heroDetail={hamiltonBaseSlug ? getServiceHeroDetail(hamiltonBaseSlug) : []}
        subline={
          <ServiceHeroSublinePrice>
            {getServiceHeroSubline(hamiltonBaseSlug ?? "house-moving")}
          </ServiceHeroSublinePrice>
        }
        meta={
          hamiltonBaseSlug ? (
            <HamiltonPageLink serviceSlug={hamiltonBaseSlug} variant="hero" />
          ) : null
        }
        seoIntro={seoIntroText ? <p>{seoIntroText}</p> : undefined}
        photo={
          heroPhoto ? (
            <HeroVisual
              variant={heroVariant}
              photoSrc={heroPhoto}
              photoAlt={heroPhotoAlt ?? `${title} , Specialist Movers`}
              overlayCaption={
                hamiltonBaseSlug
                  ? getServiceHeroOverlayCaption(
                      overlayCaptionSlug ?? hamiltonBaseSlug,
                    )
                  : undefined
              }
              imageObjectPosition={
                hamiltonBaseSlug === "hard-to-shift" ? "center 32%" : undefined
              }
              captionBottomFadeOnly
              priority
            />
          ) : undefined
        }
        quote={
          useCleaningQuoteForm ? (
            <CleaningBookingForm />
          ) : useHardToShiftForm ? (
            <HardToShiftEnquiryForm />
          ) : (
            <QuoteForm defaultJobType={defaultJobType} />
          )
        }
      />

      <ServiceTrustindexBand />

      {resolvedMomentKey ? (
        <PagePhotoMomentStrip
          momentKey={resolvedMomentKey}
          tone="purple"
          useQuoteAnchor={false}
        />
      ) : null}

      {hamiltonBaseSlug !== "hard-to-shift" ? (
        <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 sm:py-14">
          <div className="mx-auto max-w-7xl container-px">
            <ServiceContentUpdated className="mb-6" />
            <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
              {bodyParagraphs.length > 0 ? (
                <div className="space-y-4 text-base leading-relaxed text-brand-purple/85">
                  {bodyParagraphs.map((p) => (
                    <p key={p.slice(0, 48)}>{p}</p>
                  ))}
                </div>
              ) : (
                <div className="min-w-0">
                  <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
                    About this service
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
                    {description}
                  </p>
                </div>
              )}
              {aboutPhoto ? (
                <HeroVisual
                  photoSrc={aboutPhoto}
                  photoAlt={`${title} , Specialist Movers team`}
                  className="w-full"
                />
              ) : null}
            </div>
          </div>
        </SectionReveal>
      ) : null}

      {hamiltonBaseSlug === "hard-to-shift" ? <HardToShiftGallerySection /> : null}

      {hamiltonBaseSlug === "hard-to-shift" ? (
        <WhatWeMoveSection page="hard-to-shift" region="Auckland" />
      ) : null}

      <ServiceWhyChooseSection
        title="Why choose us for this service"
        body={whyChooseCopy}
        statsVariant={heroVariant === "piano" ? "piano" : "default"}
      />

      <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 sm:py-14">
        <div className="mx-auto max-w-7xl container-px">
          <div className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-2xl text-brand-purple">What&apos;s included</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {includedBullets.map((b) => (
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

      <ServiceProcessSection
        title={processTitle}
        steps={resolvedSteps}
        reviewSlot={`${reviewSlot}-process`}
        piano={heroVariant === "piano"}
      />

      <ServiceRelatedLinksSection>
        {extraRelatedLinks.map((link) => (
          <ServiceRelatedLink key={link.href} href={link.href}>
            {link.label}
          </ServiceRelatedLink>
        ))}
        {relatedSlugs.map((relatedSlug) => {
          const link = resolveServiceLink(relatedSlug);
          if (!link) return null;
          return (
            <ServiceRelatedLink key={relatedSlug} href={link.href}>
              {link.label}
            </ServiceRelatedLink>
          );
        })}
      </ServiceRelatedLinksSection>

      <ServiceFaqSection
        heading="Common questions"
        faqs={faqs}
        reviewSlot={`${reviewSlot}-faq`}
        piano={heroVariant === "piano"}
      />

      <InsuranceExplainer piano={heroVariant === "piano"} />

      <ServiceBottomCta
        defaultJobType={defaultJobType}
        useCleaningForm={useCleaningQuoteForm}
        useHardToShiftForm={useHardToShiftForm}
      />
    </div>
  );
}
