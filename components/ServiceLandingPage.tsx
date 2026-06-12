import Link from "next/link";
import { Check } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { ServiceJsonLd } from "@/components/ServiceJsonLd";
import { NumberedInfoGrid } from "@/components/NumberedInfoGrid";
import { HeroVisual } from "@/components/HeroVisual";
import { MovingBanners } from "@/components/MovingBanners";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { PianoPartnerMarquee } from "@/components/PianoPartnerMarquee";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceHeroWithQuote } from "@/components/ServiceHeroWithQuote";
import { SectionReveal } from "@/components/SectionReveal";
import { ServiceTrustindexBand } from "@/components/ServiceTrustindexBand";
import {
  ServiceBottomCta,
  ServiceFaqSection,
  ServiceProcessSection,
  ServiceRelatedLink,
  ServiceRelatedLinksSection,
  ServiceWhyChooseSection,
} from "@/components/ServiceLandingSections";
import { faqsForService } from "@/lib/service-faqs";
import { pianoFaqs } from "@/lib/piano-faqs";
import { getServiceProcessSteps } from "@/lib/process-steps-with-images";
import { getDistinctAboutPhoto } from "@/lib/site-photos";
import { PianoExpertiseSection } from "@/components/PianoExpertiseSection";
import { PianoGallerySection } from "@/components/PianoGallerySection";
import { regions } from "@/lib/regions";
import { resolveServiceLink } from "@/lib/service-links";
import { HamiltonPageLink } from "@/components/HamiltonPageLink";
import type { ServiceLandingConfig } from "@/lib/service-landings";
import { halfPhotoWrap } from "@/lib/photo-layout";
import { getServiceHeroDetail, serviceHeroSubline, serviceHeroSublineClass } from "@/lib/service-hero-detail";
import { pianoServices } from "@/lib/site-data";

type Props = {
  config: ServiceLandingConfig;
};

/**
 * Lead-focused landing layout (booking page flow), hero + quote form, trust bar,
 * about, why us, process, related links, FAQ, final CTA.
 */
export function ServiceLandingPage({ config }: Props) {
  const landingFaqs =
    config.slug === "piano-movers" ? [...pianoFaqs] : faqsForService(config.slug);
  const processTitle = config.processTitle ?? "How we run your move";
  const processSteps = getServiceProcessSteps(config.slug);

  const breadcrumbItems =
    config.slug === "piano-movers"
      ? [
          { label: "Home", href: "/" },
          { label: "Piano moving", href: "/piano-movers" },
          { label: "Auckland" },
        ]
      : [
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: config.h1 },
        ];

  return (
    <div className="bg-brand-white">
      <ServiceJsonLd
        name={config.h1}
        description={config.lead}
        path={config.path}
      />
      <FaqPageJsonLd items={landingFaqs} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ServiceHeroWithQuote
        heroVariant={config.slug === "piano-movers" ? "piano" : "moving"}
        heading={config.h1}
        eyebrowLabel={config.eyebrow}
        lead={
          <p className="max-w-2xl text-base leading-relaxed text-white/85">
            {config.lead}
          </p>
        }
        heroDetail={getServiceHeroDetail(config.slug)}
        subline={
          <p className={serviceHeroSublineClass}>
            {config.subline || serviceHeroSubline}
          </p>
        }
        meta={<HamiltonPageLink serviceSlug={config.slug} variant="hero" />}
        photo={
          <HeroVisual
            variant="moving"
            className={config.wrapHeroPhoto ? halfPhotoWrap : ""}
            photoSrc={config.heroGagPhoto}
            photoAlt={config.heroGagAlt}
            overlayCaption={config.heroOverlayCaption}
            captionBottomFadeOnly
            priority
          />
        }
        quote={<QuoteForm defaultJobType={config.defaultJobType} />}
        trustPills={[
          "Licensed & insured",
          "7 days a week",
          regions.serviceAreaBadge,
          "Callback in 15 min",
        ]}
        phoneBlockClassName={
          config.slug === "house-moving"
            ? "mt-[calc(1.5rem+1cm)]"
            : undefined
        }
      />

      <ServiceTrustindexBand />

      <PagePhotoMomentStrip
        momentKey={`services/${config.slug}`}
        tone="purple"
        useQuoteAnchor={false}
      />

      {/* Trust ticker */}
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">
        {config.showPianoPartners ? <PianoPartnerMarquee /> : null}
        {config.showMovingBanner ? <MovingBanners /> : null}
      </div>

      {/* About + highlights */}
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
            {config.showAboutSideImage !== false ? (
              <HeroVisual
                variant="moving"
                photoSrc={
                  config.aboutSidePhoto ??
                  getDistinctAboutPhoto(config.slug, config.heroGagPhoto ?? config.heroPhoto)
                }
                photoAlt={config.aboutSidePhotoAlt ?? config.heroPhotoAlt}
                className="w-full"
              />
            ) : null}
          </div>
          <NumberedInfoGrid
            columns={3}
            className="mt-8"
            items={config.trustHighlights.map((item) => ({
              title: item.title,
              body: item.text,
            }))}
          />

          <div className="mt-10 rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">
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

      {config.slug === "piano-movers" ? (
        <>
          <PianoExpertiseSection />
          <PianoGallerySection />
        </>
      ) : null}

      <ServiceWhyChooseSection
        title={config.whyTitle}
        body={config.whyBody}
        statsVariant={config.slug === "piano-movers" ? "piano" : "default"}
      />

      <ServiceProcessSection
        title={processTitle}
        steps={processSteps}
        reviewSlot={`service-${config.slug}-process`}
        piano={config.slug === "piano-movers"}
      />

      {/* Piano sub-services or related */}
      {config.showPianoSubServices ? (
        <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 container-px">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            Piano services
          </h2>
          <p className="mt-3 max-w-2xl text-brand-purple/80">
            Upright, grand, tuning, international shipping, or storage. Pick the option that fits
            your piano.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {pianoServices.map((p) => (
              <Link
                key={p.slug}
                href={`/piano-movers/${p.slug}`}
                className="group rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm transition hover:border-brand-purple/30 hover:shadow-md"
              >
                <h3 className="font-heading text-lg text-brand-purple group-hover:underline">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-brand-purple/78">{p.whyChooseCopy}</p>
              </Link>
            ))}
          </div>
        </SectionReveal>
      ) : (
        <ServiceRelatedLinksSection>
          {config.slug === "house-moving" ? (
            <ServiceRelatedLink href="/apartment-movers-auckland">
              Apartment movers Auckland
            </ServiceRelatedLink>
          ) : null}
          {config.relatedSlugs.map((slug) => {
            const link = resolveServiceLink(slug);
            if (!link) return null;
            return (
              <ServiceRelatedLink key={slug} href={link.href}>
                {link.label}
              </ServiceRelatedLink>
            );
          })}
        </ServiceRelatedLinksSection>
      )}

      <ServiceFaqSection
        heading={config.faqHeading}
        faqs={landingFaqs}
        reviewSlot={`service-${config.slug}-faq`}
        piano={config.slug === "piano-movers"}
      />

      <ServiceBottomCta defaultJobType={config.defaultJobType} />
    </div>
  );
}
