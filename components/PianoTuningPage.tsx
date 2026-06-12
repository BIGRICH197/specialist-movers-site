import Link from "next/link";

import { Check } from "lucide-react";

import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";

import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";

import { HeroVisual } from "@/components/HeroVisual";

import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";

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

import type { PianoTuningContent } from "@/lib/piano-tuning-types";

import { getServiceProcessSteps } from "@/lib/process-steps-with-images";

import {
  getServiceHeroDetail,
  getServiceHeroOverlayCaption,
  serviceHeroSubline,
  serviceHeroSublineClass,
} from "@/lib/service-hero-detail";

import { resolveServiceLink } from "@/lib/service-links";



const heroPhoto = "/photos/piano-gallery/piano-tuning.jpg";



type Props = {

  content: PianoTuningContent;

};



export function PianoTuningPage({ content }: Props) {

  const processSteps = getServiceProcessSteps("piano-movers");



  return (

    <div className="bg-brand-white">

      <FaqPageJsonLd items={content.faqs} />

      <BreadcrumbJsonLd items={[...content.breadcrumbs]} />

      <ServiceHeroWithQuote

        heroVariant="piano"

        heading={content.hero.h1}

        eyebrowLabel={content.hero.eyebrow}

        lead={

          <p className="max-w-2xl text-base leading-relaxed text-white/85">

            {content.hero.lead}

          </p>

        }

        heroDetail={getServiceHeroDetail("piano-movers")}

        subline={

          <p className={serviceHeroSublineClass}>

            {content.hero.subline || serviceHeroSubline}

          </p>

        }

        meta={

          content.crossLink ? (

            <Link

              href={content.crossLink.href}

              className="rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-1.5 text-xs font-semibold text-brand-yellow transition hover:bg-brand-yellow/20"

            >

              {content.crossLink.label} →

            </Link>

          ) : null

        }

        photo={

          <HeroVisual

            variant="piano"

            photoSrc={heroPhoto}

            photoAlt="Piano tuning in progress with the front cover removed for adjustment"

            overlayCaption={getServiceHeroOverlayCaption("piano-tuning")}

            captionBottomFadeOnly

            priority

          />

        }

        quote={<QuoteForm initialMode="callback" />}

      />



      <ServiceTrustindexBand />



      <PagePhotoMomentStrip

        momentKey="services/piano-movers"

        tone="purple"

        useQuoteAnchor={false}

      />



      <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 sm:py-14">

        <div className="mx-auto max-w-7xl container-px">

          <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">

            <div className="space-y-6">

              {content.sections.map((section) => (

                <div key={section.title}>

                  <h2 className="font-heading text-xl text-brand-purple sm:text-2xl">

                    {section.title}

                  </h2>

                  <p className="mt-3 text-base leading-relaxed text-brand-purple/85">

                    {section.body}

                  </p>

                </div>

              ))}

            </div>

            <HeroVisual

              variant="piano"

              photoSrc={heroPhoto}

              photoAlt="Piano tuning in progress"

              className="w-full"

            />

          </div>



          <div className="mt-10 rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">

            <h2 className="font-heading text-2xl text-brand-purple">What we handle</h2>

            <ul className="mt-5 space-y-3">

              {content.included.map((b) => (

                <li key={b} className="flex gap-3 text-brand-purple/85">

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



      <ServiceWhyChooseSection title="Why book through us" body={content.whyChoose} statsVariant="piano" />



      <ServiceProcessSection

        title="How piano tuning works"

        steps={processSteps}

        reviewSlot="piano-tuning-process"

        piano

      />



      <ServiceRelatedLinksSection title="Related piano services">

        {content.relatedSlugs.map((slug) => {

          const link = resolveServiceLink(slug);

          if (!link) return null;

          return (

            <ServiceRelatedLink key={slug} href={link.href}>

              {link.label}

            </ServiceRelatedLink>

          );

        })}

      </ServiceRelatedLinksSection>



      <ServiceFaqSection

        heading="Piano tuning questions"

        faqs={content.faqs}

        reviewSlot="piano-tuning-faq"

        piano

      />



      <ServiceBottomCta
        title={content.ctaTitle}
        defaultJobType="Piano Move"
        quoteForm={<QuoteForm initialMode="callback" />}
      />

    </div>

  );

}

