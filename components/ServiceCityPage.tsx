import Link from "next/link";

import { Check, MapPin } from "lucide-react";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

import { HeroVisual } from "@/components/HeroVisual";

import { NumberedInfoGrid } from "@/components/NumberedInfoGrid";

import { PianoGallerySection } from "@/components/PianoGallerySection";

import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";

import { PianoPartnerMarquee } from "@/components/PianoPartnerMarquee";

import { ServiceTrustindexBand } from "@/components/ServiceTrustindexBand";

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

import {
  getServiceHeroDetail,
  getServiceHeroEyebrow,
  getServiceHeroOverlayCaption,
  serviceHeroSubline,
  serviceHeroSublineClass,
} from "@/lib/service-hero-detail";

import type { ServiceCityPageConfig } from "@/lib/service-cities";

import { getDistinctAboutPhoto, getServicePhoto } from "@/lib/site-photos";



type Props = {

  config: ServiceCityPageConfig;

};



export function ServiceCityPage({ config }: Props) {

  const heroPhoto =

    getServicePhoto(config.serviceSlug) ?? "/photos/source/batch-p125/P1250366.jpg";
  const aboutPhoto = getDistinctAboutPhoto(config.serviceSlug, heroPhoto);

  const isPiano = config.serviceSlug === "piano-movers";

  const reviewSlot = `city-${config.serviceSlug}-${config.cityName.toLowerCase()}`;

  const processSteps = getServiceProcessSteps(config.serviceSlug);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: config.parentLabel, href: config.parentHref },
    { label: config.cityName },
  ];

  return (

    <div className="bg-brand-white">

      <BreadcrumbJsonLd items={breadcrumbItems} />

      <ServiceHeroWithQuote

        heroVariant={isPiano ? "piano" : "moving"}

        heading={config.h1}

        eyebrowLabel={getServiceHeroEyebrow(config.serviceSlug, {
          city: config.cityName,
        })}

        lead={

          <p className="max-w-2xl text-base leading-relaxed text-white/85">

            {config.lead}

          </p>

        }

        heroDetail={getServiceHeroDetail(config.serviceSlug)}

        subline={

          <p className={serviceHeroSublineClass}>

            {serviceHeroSubline}

          </p>

        }

        photo={

          <HeroVisual

            variant={isPiano ? "piano" : "moving"}

            photoSrc={heroPhoto}

            photoAlt={`${config.h1} , Specialist Movers`}

            overlayCaption={getServiceHeroOverlayCaption(config.serviceSlug)}

            captionBottomFadeOnly

            priority

          />

        }

        quote={<QuoteForm defaultJobType={config.defaultJobType} />}

      />



      <ServiceTrustindexBand />



      <PagePhotoMomentStrip

        momentKey={`services/${config.serviceSlug}`}

        tone="purple"

        useQuoteAnchor={false}

      />



      {isPiano ? (

        <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 sm:pt-12 lg:px-8">

          <PianoPartnerMarquee />

        </div>

      ) : null}



      <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 sm:py-14">

        <div className="mx-auto max-w-7xl container-px">

          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">

            <div className="space-y-4 text-base leading-relaxed text-brand-purple/85">

              {config.paragraphs.map((p, i) => (

                <p key={i}>{p}</p>

              ))}

            </div>

            <HeroVisual

              variant="moving"

              photoSrc={aboutPhoto}

              photoAlt={`${config.h1} , Specialist Movers team`}

              className="w-full"

            />

          </div>

          {config.highlightCards && config.highlightCards.length > 0 ? (

            <NumberedInfoGrid

              className="mt-8"

              columns={2}

              items={config.highlightCards.map((item) => ({

                title: item.title,

                body: item.body,

              }))}

            />

          ) : config.highlights.length > 0 ? (

            <NumberedInfoGrid

              className="mt-8"

              columns={2}

              items={config.highlights.map((body) => ({ body }))}

            />

          ) : null}



          <div className="mt-10 rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="font-heading text-xl text-brand-purple">What we handle</h2>

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



      <ServiceWhyChooseSection

        title={`Why choose us in ${config.cityName}`}

        body={config.whyChooseCopy}

      />



      <ServiceProcessSection

        title="How we run your move"

        steps={processSteps}

        reviewSlot={`${reviewSlot}-process`}

        piano={isPiano}

      />



      <ServiceRelatedLinksSection title="More on this service">

        <ServiceRelatedLink href={config.parentHref}>{config.parentLabel}</ServiceRelatedLink>

        <ServiceRelatedLink href={config.alternateCity.href}>

          {config.alternateCity.label}

        </ServiceRelatedLink>

        <Link

          href={config.locationHref}

          className="inline-flex items-center gap-1.5 rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40 hover:bg-brand-purple/[0.04]"

        >

          <MapPin className="h-3.5 w-3.5" aria-hidden />

          {config.locationLabel}

        </Link>

      </ServiceRelatedLinksSection>



      <ServiceFaqSection

        heading={isPiano ? "Piano moving questions" : "Common questions"}

        faqs={config.faqs ?? []}

        reviewSlot={`${reviewSlot}-faq`}

        piano={isPiano}

      />



      {config.showPianoGallery ? <PianoGallerySection /> : null}



      <ServiceBottomCta

        title={`Get your ${config.cityName} quote`}

        defaultJobType={config.defaultJobType}

      />

    </div>

  );

}

