import Link from "next/link";

import { Check, MapPin } from "lucide-react";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";

import { ServiceTrustindexBand } from "@/components/ServiceTrustindexBand";

import { HeroVisual } from "@/components/HeroVisual";

import { NumberedInfoGrid } from "@/components/NumberedInfoGrid";

import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";

import { PianoGallerySection } from "@/components/PianoGallerySection";

import { PianoPartnerMarquee } from "@/components/PianoPartnerMarquee";

import { CleaningBookingForm } from "@/components/CleaningBookingForm";

import { QuoteForm } from "@/components/QuoteForm";

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

import type { HamiltonPageConfig } from "@/lib/hamilton-pages";

import { getServiceProcessSteps } from "@/lib/process-steps-with-images";

import {
  getServiceHeroDetail,
  getServiceHeroOverlayCaption,
  serviceHeroSubline,
} from "@/lib/service-hero-detail";
import { getDistinctAboutPhoto } from "@/lib/site-photos";



type Props = {

  config: HamiltonPageConfig;

};



export function HamiltonServicePage({ config }: Props) {

  const breadcrumbItems = [

    { label: "Home", href: "/" },

    { label: config.parentLabel, href: config.parentHref },

    { label: config.h1 },

  ];

  const isPiano = config.baseSlug === "piano-movers";
  const aboutPhoto = getDistinctAboutPhoto(config.baseSlug, config.heroPhoto);

  const processSteps =

    config.processSteps && config.processSteps.length > 0

      ? config.processSteps

      : getServiceProcessSteps(config.baseSlug);

  const reviewSlot = `hamilton-${config.baseSlug}`;



  return (

    <div className="bg-brand-white">

      <BreadcrumbJsonLd items={breadcrumbItems} />

      {config.faqs && config.faqs.length > 0 ? (

        <FaqPageJsonLd items={config.faqs} />

      ) : null}



      <ServiceHeroWithQuote

        heroVariant={isPiano ? "piano" : "moving"}

        googleBadgeLiftCm={
          config.baseSlug === "house-moving"
            ? 4
            : config.baseSlug === "office-moving"
              ? 6
              : config.baseSlug === "commercial-moving"
                ? 3
                : config.baseSlug === "piano-movers"
                  ? 3
                  : config.baseSlug === "storage"
                    ? 4.5
                    : undefined
        }

        topNav={

          <nav className="flex flex-wrap gap-2 text-xs font-semibold text-white/75">

            <Link href="/" className="hover:text-brand-yellow">

              Home

            </Link>

            <span aria-hidden>/</span>

            <Link href={config.parentHref} className="hover:text-brand-yellow">

              {config.parentLabel}

            </Link>

            <span aria-hidden>/</span>

            <span className="text-brand-yellow">Hamilton</span>

          </nav>

        }

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

        heroDetail={getServiceHeroDetail(config.baseSlug)}

        subline={

          <p className="inline-block max-w-xl rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold leading-snug text-white/90">

            {serviceHeroSubline}

          </p>

        }

        meta={

          isPiano ? (

            <div className="flex flex-wrap gap-2">

              <Link

                href="/piano-movers/auckland"

                className="rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-1.5 text-xs font-semibold text-brand-yellow transition hover:bg-brand-yellow/20"

              >

                Auckland piano page →

              </Link>

            </div>

          ) : null

        }

        photo={

          <HeroVisual

            variant={isPiano ? "piano" : "moving"}

            photoSrc={config.heroPhoto}

            photoAlt={config.heroPhotoAlt}

            overlayCaption={getServiceHeroOverlayCaption(config.baseSlug)}

            priority

          />

        }

        quote={

          config.baseSlug === "cleaning-services" ? (

            <CleaningBookingForm />

          ) : (

            <QuoteForm defaultJobType={config.defaultJobType} />

          )

        }

      />



      <ServiceTrustindexBand />



      <PagePhotoMomentStrip

        momentKey={`services/${config.baseSlug}`}

        tone="purple"

        useQuoteAnchor={false}

      />



      {config.showPianoPartners ? (

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



          <NumberedInfoGrid

            className="mt-8"

            columns={2}

            items={config.highlightCards.map((item) => ({

              title: item.title,

              body: item.body,

            }))}

          />

        </div>

      </SectionReveal>



      <ServiceWhyChooseSection

        title="Why choose us in Hamilton"

        body={config.whyChooseCopy}

      />



      <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 sm:py-14">

        <div className="mx-auto max-w-7xl container-px">

          <div className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">

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



      <ServiceProcessSection

        title={config.processTitle ?? "How we run your move"}

        steps={processSteps}

        reviewSlot={`${reviewSlot}-process`}

        piano={isPiano}

      />



      <ServiceRelatedLinksSection title="More on this service">

        {config.extraLinks?.map((link) => (

          <ServiceRelatedLink key={link.href} href={link.href}>

            {link.label}

          </ServiceRelatedLink>

        ))}

        <ServiceRelatedLink href={config.parentHref}>Auckland service page</ServiceRelatedLink>

        <Link

          href={config.locationHref}

          className="inline-flex items-center gap-1.5 rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40 hover:bg-brand-purple/[0.04]"

        >

          <MapPin className="h-3.5 w-3.5" aria-hidden />

          {config.locationLabel}

        </Link>

      </ServiceRelatedLinksSection>



      <ServiceFaqSection

        heading="Common questions"

        faqs={config.faqs ?? []}

        reviewSlot={`${reviewSlot}-faq`}

        piano={isPiano}

      />



      {config.showPianoGallery ? <PianoGallerySection /> : null}



      <ServiceBottomCta

        title="Get your Hamilton quote"

        defaultJobType={config.defaultJobType}

        useCleaningForm={config.baseSlug === "cleaning-services"}

      />

    </div>

  );

}

