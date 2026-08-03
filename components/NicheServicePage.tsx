import { Check } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/BreadcrumbJsonLd";
import type { Crumb } from "@/components/Breadcrumbs";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { ServiceJsonLd } from "@/components/ServiceJsonLd";
import { ServiceTrustindexBand } from "@/components/ServiceTrustindexBand";
import { HeroVisual } from "@/components/HeroVisual";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { NumberedInfoGrid } from "@/components/NumberedInfoGrid";
import { QuoteForm } from "@/components/QuoteForm";
import { ServiceHeroWithQuote } from "@/components/ServiceHeroWithQuote";
import { ServiceContentUpdated } from "@/components/ServiceContentUpdated";
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
import { ServiceHeroSublinePrice } from "@/components/ServiceHeroSublinePrice";
import {
  getServiceHeroDetail,
  getServiceHeroOverlayCaption,
  getServiceHeroSubline,
} from "@/lib/service-hero-detail";

type Props = {
  config: NicheServicePageConfig;
};

function nicheMomentKey(path: string): string {
  if (path.includes("australia")) return "services/international-moving";
  return "services/house-moving";
}

/**
 * Which service's hero detail, photos and review slots this niche page borrows.
 *
 * This used to fall through to "international-moving" for anything that was
 * not apartment or retirement, which put "Sea freight, sole-use containers,
 * and air freight explained for your load size" and "packing and export wrap"
 * on the furniture pages. Not our service on those pages and not true of them.
 *
 * Now an explicit map, so a new niche page cannot silently inherit the wrong
 * service's copy — an unknown path falls back to house-moving, which is the
 * safe default for a domestic page.
 */
const NICHE_SERVICE_BY_PATH: Record<string, string> = {
  "/apartment-movers-auckland": "house-moving",
  "/retirement-home-movers-auckland": "house-moving",
  "/retirement-home-movers-hamilton": "house-moving",
  "/international-moving/moving-to-australia": "international-moving",
  "/furniture-movers-auckland": "house-moving",
  "/furniture-movers-hamilton": "house-moving",
};

function nicheReviewSlug(path: string): string {
  return NICHE_SERVICE_BY_PATH[path] ?? "house-moving";
}

export function NicheServicePage({ config }: Props) {
  const crumbs: Crumb[] = config.breadcrumbs.map((c) => ({
    label: c.label,
    href: c.href,
  }));
  const reviewSlug = nicheReviewSlug(config.path);
  const branch = config.path.includes("hamilton") ? "hamilton" : "auckland";
  const processSteps =
    config.processTitle === houseMovingProcess.title
      ? getServiceProcessSteps("house-moving")
      : houseMovingProcess.steps.map((s) => ({ title: s.title, body: s.body }));

  return (
    <div className="bg-brand-white">
      <ServiceJsonLd
        name={config.h1}
        description={config.lead}
        path={config.path}
      />
      <FaqPageJsonLd items={config.faqs} />
      <BreadcrumbJsonLd items={crumbs} />
      <ServiceHeroWithQuote
        heading={config.h1}
        eyebrowLabel={config.eyebrow}
        titleSlug={config.path.replace(/^\//, "")}
        lead={
          <p className="max-w-2xl text-base leading-relaxed text-white/85">
            {config.lead}
          </p>
        }
        heroDetail={getServiceHeroDetail(reviewSlug)}
        subline={
          <ServiceHeroSublinePrice>
            {getServiceHeroSubline("house-moving", {
              hamilton: config.path.includes("hamilton"),
            })}
          </ServiceHeroSublinePrice>
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
            captionBottomFadeOnly
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
              <ServiceContentUpdated className="mb-4" />
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

      <ServiceWhyChooseSection
        title={config.whyTitle}
        body={config.whyBody}
        statsVariant={branch === "hamilton" ? "hamilton" : "default"}
      />

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

      {config.itemTable ? (
        <SectionReveal className="border-t border-brand-purple/10 bg-brand-canvas py-12 sm:py-14">
          <div className="mx-auto max-w-7xl container-px">
            <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
              {config.itemTable.title}
            </h2>
            {config.itemTable.intro ? (
              <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-purple/80">
                {config.itemTable.intro}
              </p>
            ) : null}
            {/* Wide content scrolls in its own container so the page body never
                scrolls sideways on mobile. */}
            <div className="mt-6 overflow-x-auto rounded-2xl border border-brand-purple/15 bg-white shadow-sm">
              <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-brand-purple/15 bg-brand-purple/[0.04]">
                    <th scope="col" className="px-4 py-3 font-heading text-brand-purple">Item</th>
                    <th scope="col" className="px-4 py-3 font-heading text-brand-purple">How we move it</th>
                    <th scope="col" className="px-4 py-3 font-heading text-brand-purple">Typical time</th>
                  </tr>
                </thead>
                <tbody>
                  {config.itemTable.rows.map((row) => (
                    <tr key={row.item} className="border-b border-brand-purple/10 last:border-0">
                      <th scope="row" className="px-4 py-3 font-semibold text-brand-purple">
                        {row.item}
                      </th>
                      <td className="px-4 py-3 text-brand-purple/85">{row.method}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-brand-purple/85">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {config.itemTable.footnote ? (
              <p className="mt-4 max-w-3xl text-sm text-brand-purple/70">
                {config.itemTable.footnote}
              </p>
            ) : null}
          </div>
        </SectionReveal>
      ) : null}

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
