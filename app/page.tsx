import Link from "next/link";
import type { Metadata } from "next";
import {
  Building2,
  Home,
  Package,
  Piano,
  Sparkles,
  Truck,
} from "lucide-react";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { HomeSeoSection } from "@/components/home/HomeSeoSection";
import { TrustindexWidget } from "@/components/TrustindexWidget";
import { trustindexHomeWidgetId } from "@/lib/trustindex-config";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { SitePhoto } from "@/components/SitePhoto";
import { getServicePhoto, sitePhotos } from "@/lib/site-photos";
import { MovingBanners } from "@/components/MovingBanners";
import { ExperienceMilestonesBand } from "@/components/ExperienceMilestonesBand";
import { HomeMovingDistanceSection } from "@/components/HomeMovingDistanceSection";
import { HomeStorageSection } from "@/components/HomeStorageSection";
import { HomeWhatsIncludedSection } from "@/components/HomeWhatsIncludedSection";
import { HeroVisual } from "@/components/HeroVisual";
import { HomeHero } from "@/components/HomeHero";
import { NumberedInfoGrid } from "@/components/NumberedInfoGrid";
import { MovingProcessVisual } from "@/components/MovingProcessVisual";
import { QuoteForm } from "@/components/QuoteForm";
import { SectionReveal } from "@/components/SectionReveal";
import { sectionRevealDirection } from "@/lib/motion";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import {
  contactCta,
  hero,
  homeMeta,
  experienceMilestones,
  homeProcessVisual,
  serviceBlurbs,
  servicesIntro,
  siteWideBullets,
  siteWiseHomeSection,
  statsStrip,
  trustPillars,
} from "@/lib/homepage-copy";
import { serviceHref } from "@/lib/service-links";
import { phoneDisplay, phoneNumber, services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: { absolute: homeMeta.title },
  description: homeMeta.description,
};

export default function HomePage() {
  const homeServices = services.slice(0, 6);
  const icons = [Home, Building2, Piano, Package, Truck, Sparkles];

  return (
    <div className="bg-brand-canvas">
      <HomeHero
        hero={{
          eyebrow: hero.eyebrow,
          h1: hero.h1,
          lead: hero.lead,
          subline: hero.subline,
          photoTagline: hero.photoTagline,
        }}
        photoSrc={sitePhotos.homeHero}
        photoAlt="Specialist Movers carrying a sofa while the client relaxes and reads a magazine"
        photoHoverSrc={sitePhotos.homeHeroHover}
        photoHoverAlt="Specialist Movers crew member serving champagne after a move"
      />

      <div className="mx-auto max-w-7xl container-px pb-2 pt-8 sm:pb-4 sm:pt-10">
        <MovingBanners />
      </div>

      <SectionReveal direction={sectionRevealDirection(0)} className="mx-auto max-w-7xl py-12 container-px sm:py-14">
        <div className="border-b border-brand-purple/10 pb-6 sm:pb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple/50">
            What customers say
          </p>
          <TrustindexWidget
            widgetId={trustindexHomeWidgetId}
            layout="carousel"
            className="mt-4 w-full"
          />
        </div>
        <h2 className="mt-8 font-heading text-3xl text-brand-purple sm:mt-10">
          {servicesIntro.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-purple/85">
          {servicesIntro.body}
        </p>
        <StaggerChildren className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeServices.map((service, idx) => {
            const Icon = icons[idx];
            const blurb = serviceBlurbs[service.slug];
            return (
              <StaggerItem key={service.slug}>
                <Link
                  href={serviceHref(service.slug)}
                  className="card-interactive group flex h-full flex-col overflow-hidden rounded-2xl border border-brand-purple/15 bg-white shadow-sm"
                >
                  {getServicePhoto(service.slug) && (
                    <SitePhoto
                      src={getServicePhoto(service.slug)!}
                      alt={blurb?.title ?? service.title}
                      aspect="card"
                      overlay={false}
                      hoverSwap={false}
                      className="rounded-none border-0 shadow-none"
                    />
                  )}
                  <div className="p-5">
                    <Icon className="h-5 w-5 text-brand-purple" />
                    <h3 className="mt-3 font-heading text-lg text-brand-purple group-hover:underline">
                      {blurb?.title ?? service.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-purple/80">
                      {blurb?.excerpt ?? service.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </SectionReveal>

      <PagePhotoMomentStrip momentKey="home" />

      <SectionReveal direction={sectionRevealDirection(1)} className="border-t border-brand-purple/10 bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-7xl container-px">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            The Specialist Movers difference
          </h2>
          <p className="mt-3 max-w-2xl text-brand-purple/80">
            Clear communication, careful crews, and quoting that respects your time.
          </p>
          <NumberedInfoGrid
            columns={3}
            className="mt-8"
            items={trustPillars.map((pillar) => ({
              title: pillar.title,
              body: pillar.body,
            }))}
          />
        </div>
      </SectionReveal>

      <SectionReveal direction={sectionRevealDirection(2)} className="border-t border-brand-purple/10 bg-brand-purple/[0.03] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl container-px">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            {siteWiseHomeSection.title}
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statsStrip.items.map((item) => (
              <div
                key={item.label}
                className="card-interactive rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm"
              >
                <p className="font-heading text-3xl text-brand-purple">{item.value}</p>
                <p className="mt-1 text-sm text-brand-purple/75">{item.label}</p>
              </div>
            ))}
          </div>
          <NumberedInfoGrid
            className="mt-8"
            columns={2}
            items={siteWideBullets.map((line) => ({ body: line }))}
          />
        </div>
      </SectionReveal>

      <SectionReveal direction={sectionRevealDirection(3)} className="mx-auto max-w-7xl py-14 container-px sm:py-16">
        <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
          {homeProcessVisual.title}
        </h2>
        <MovingProcessVisual steps={homeProcessVisual.steps} className="mt-8" />
      </SectionReveal>

      <HomeWhatsIncludedSection />

      <HomeMovingDistanceSection />

      <HomeStorageSection />

      <ExperienceMilestonesBand data={experienceMilestones} />

      <HomeFaqSection />

      <HomeSeoSection />

      <SectionReveal direction="up" className="border-t border-brand-purple/10 bg-brand-purple py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center container-px">
          <div className="mx-auto w-full max-w-xl space-y-5 sm:space-y-6 lg:mx-0">
            <div className="space-y-2 sm:space-y-3">
              <h2 className="font-heading text-3xl leading-tight sm:text-4xl">Contact us</h2>
              <a
                href={`tel:${phoneNumber}`}
                className="inline-flex font-heading text-xl font-bold leading-none text-brand-yellow transition hover:text-white sm:text-2xl"
              >
                {phoneDisplay}
              </a>
            </div>
            <p className="text-base leading-relaxed text-white/90">{contactCta}</p>
            <HeroVisual
              variant="moving"
              photoSrc={sitePhotos.premiumService}
              photoAlt="Client at home while a Specialist Movers crew member serves champagne after a move"
              aspectClassName="aspect-[16/10] min-h-[12rem] sm:min-h-[14rem] lg:min-h-0 lg:max-h-[20rem]"
              imageObjectPosition="center center"
              className="w-full"
            />
          </div>
          <QuoteForm compact />
        </div>
      </SectionReveal>
    </div>
  );
}
