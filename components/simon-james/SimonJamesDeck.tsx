import Image from "next/image";
import { HeroVisual } from "@/components/HeroVisual";
import { SitePhoto } from "@/components/SitePhoto";
import { DeckBrandLogo } from "@/components/simon-james/DeckBrandLogo";
import { DeckSlide } from "@/components/simon-james/DeckSlide";
import {
  DeckEyebrow,
  DeckLead,
  DeckRule,
  DeckTitle,
} from "@/components/simon-james/DeckTypography";
import {
  aboutParagraphs,
  contacts,
  deliveryPricing,
  deliveryPricingFootnote,
  deliveryPricingIncluded,
  deliveryPricingIntro,
  included,
  pillars,
  stats,
  warehouseBulkPricing,
} from "@/lib/simon-james-deck";
import { deckHero } from "@/lib/deck-hero";
import { sitePhotos } from "@/lib/site-photos";

function PricingTable({
  headers,
  rows,
  compact,
}: {
  headers: string[];
  rows: string[][];
  compact?: boolean;
}) {
  return (
    <div className="mt-4 overflow-visible rounded-xl border border-brand-purple/15 bg-white shadow-sm sm:mt-6">
      <table
        className={`deck-pricing-table w-full border-collapse ${compact ? "text-xs sm:text-sm" : "text-sm"}`}
      >
        <thead>
          <tr className="border-b border-brand-purple/10 bg-brand-surface">
            {headers.map((h) => (
              <th
                key={h}
                className={`text-left font-heading font-bold uppercase tracking-wide text-brand-purple ${
                  compact ? "px-2 py-2 text-[10px] sm:px-3 sm:py-2.5 sm:text-xs" : "px-4 py-3 text-xs"
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-b border-brand-purple/8 last:border-0">
              {row.map((cell, j) => (
                <td
                  key={`${row[0]}-${j}`}
                  className={`${compact ? "px-2 py-2 sm:px-3 sm:py-2.5" : "px-4 py-3"} ${
                    j === 0 ? "font-medium text-brand-purple" : "text-brand-purple/80"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SimonJamesDeck() {
  return (
    <div className="deck-root bg-brand-canvas font-sans">
      {/* 1 - Cover */}
      <DeckSlide
        id="cover"
        tone="purple"
        innerClassName="justify-center gap-10 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12"
      >
        <div>
          <DeckBrandLogo onPurple />
          <div className="mt-8">
            <DeckEyebrow tone="purple">Proposal · May 2026</DeckEyebrow>
          </div>
          <DeckTitle tone="purple" as="h1" className="mt-5">
            Bespoke furniture delivery
          </DeckTitle>
          <p className="mt-3 font-heading text-sm font-bold uppercase tracking-[0.2em] text-brand-yellow sm:text-base">
            Prepared for Simon James
          </p>
          <p className="mt-8 text-sm text-white/75 sm:text-base">Richard Boote, Director</p>
        </div>
        <HeroVisual
          photoSrc={sitePhotos.homeHero}
          photoAlt="Careful furniture delivery"
          photoHoverSrc={sitePhotos.homeHeroHover}
          photoHoverAlt="Crew after the move"
          overlayCaption={deckHero.photoTagline}
          priority
          className="hero-photo-ambient w-full"
        />
      </DeckSlide>

      {/* 2 - Who we are */}
      <DeckSlide id="about" tone="light" scrollable>
        <DeckEyebrow>Who we are</DeckEyebrow>
        <DeckTitle className="mt-4">Auckland&apos;s premium moving company</DeckTitle>
        <DeckRule />
        <HeroVisual
          photoSrc={sitePhotos.aboutTeam}
          photoAlt="Specialist Movers team in uniform with company trucks"
          aspectClassName="aspect-[16/9] min-h-[12rem] sm:aspect-[16/9] sm:min-h-[16rem]"
          imageObjectPosition="center 35%"
          className="mt-8 w-full"
        />
        <div className="mt-8 space-y-4">
          {aboutParagraphs.map((para) => (
            <DeckLead key={para.slice(0, 24)}>{para}</DeckLead>
          ))}
        </div>
      </DeckSlide>

      {/* 3 - Pillars */}
      <DeckSlide id="values" tone="purple" scrollable>
        <DeckEyebrow tone="purple">Our promise</DeckEyebrow>
        <DeckTitle tone="purple" className="mt-4">
          Three things every delivery gets
        </DeckTitle>
        <DeckRule tone="purple" />
        <ul className="mt-4 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {pillars.map((p) => (
            <li key={p.title} className="border-t border-white/20 pt-6">
              <h3 className="font-heading text-sm font-bold uppercase tracking-wide text-brand-yellow">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/88 sm:text-base">{p.body}</p>
            </li>
          ))}
        </ul>
      </DeckSlide>

      {/* 4 - Volume */}
      <DeckSlide id="experience" tone="light" scrollable>
        <DeckEyebrow>Experience</DeckEyebrow>
        <DeckTitle className="mt-4">What we move a week</DeckTitle>
        <DeckRule />
        <ul className="mt-2 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <li key={s.label} className="border-t border-brand-purple/15 pt-6">
              <p className="font-heading text-3xl font-bold text-brand-purple sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-brand-purple/65">
                {s.label}
              </p>
            </li>
          ))}
        </ul>
        <SitePhoto src={sitePhotos.houseMove} alt="Careful furniture move" className="mt-10" />
        <DeckLead className="mt-6 sm:mt-8">
          Our team has handled everything from Steinway grand pianos to bespoke dining tables. We know
          how to wrap, lift, walk, and place high-value furniture without damage, and we would like
          to do the same for Simon James.
        </DeckLead>
      </DeckSlide>

      {/* 5 - Zones */}
      <DeckSlide id="zones" tone="light" scrollable innerClassName="!py-10 sm:!py-12">
        <DeckEyebrow>Coverage</DeckEyebrow>
        <DeckTitle className="mt-4">Delivery zones from Eden Terrace</DeckTitle>
        <DeckRule />
        <DeckLead>
          Five zones from your warehouse. Inner Auckland for same-day work; outer rings for further
          drops.
        </DeckLead>
        <div className="mt-6 flex flex-1 items-center justify-center">
          <Image
            src="/clients/simon-james/zone_map.png"
            alt="Delivery zones map"
            width={900}
            height={1200}
            className="h-auto max-h-[min(52vh,28rem)] w-full max-w-2xl object-contain"
          />
        </div>
        <p className="mt-4 text-xs text-brand-purple/60">Full zone definitions on the rate card.</p>
      </DeckSlide>

      {/* 6 - Delivery pricing */}
      <DeckSlide
        id="pricing-delivery"
        tone="purple"
        scrollable
        innerClassName="!py-10 sm:!py-12"
      >
        <DeckEyebrow tone="purple">Pricing</DeckEyebrow>
        <DeckTitle tone="purple" className="mt-3">
          Fixed prices. Everything included.
        </DeckTitle>
        <DeckRule tone="purple" />
        <DeckLead tone="purple" className="!text-sm sm:!text-base">
          {deliveryPricingIncluded} {deliveryPricingIntro}
        </DeckLead>
        <PricingTable
          compact
          headers={["Zone", "Base per delivery", "Above 2 m³"]}
          rows={deliveryPricing.map((r) => [r.zone, r.base, r.extra])}
        />
        <p className="mt-4 text-sm leading-relaxed text-white/70">
          {deliveryPricingFootnote}
        </p>
      </DeckSlide>

      {/* 7 - Warehouse */}
      <DeckSlide id="pricing-warehouse" tone="light" scrollable>
        <DeckEyebrow>Warehouse</DeckEyebrow>
        <DeckTitle className="mt-4">Stock transfers</DeckTitle>
        <DeckRule />
        <DeckLead>
          Stock transfers between sites. Same-day freight, careful movement, no install or rubbish.
        </DeckLead>
        <div className="mt-8 overflow-hidden rounded-xl border border-brand-purple/15 bg-white shadow-sm">
          {warehouseBulkPricing.map((row, i) => (
            <div
              key={row.label}
              className={`flex items-baseline justify-between gap-4 px-5 py-4 ${
                i > 0 ? "border-t border-brand-purple/10" : ""
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-brand-purple/70">
                {row.label}
              </span>
              <span className="font-heading text-base text-brand-purple sm:text-lg">{row.value}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-brand-purple/65">
          Call-out excl. GST · two-mover crew · Auckland local
        </p>
      </DeckSlide>

      {/* 8 - Included */}
      <DeckSlide id="included" tone="light" scrollable>
        <DeckEyebrow>Included</DeckEyebrow>
        <DeckTitle className="mt-4">What fixed price means</DeckTitle>
        <DeckRule />
        <ul className="mt-6 space-y-3">
          {included.map((line) => (
            <li key={line} className="flex gap-3 text-base leading-relaxed text-brand-purple/85">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-purple" aria-hidden />
              {line}
            </li>
          ))}
        </ul>
        <DeckLead className="mt-8">
          Most movers stop at the door. We place the piece, remove packaging, and leave the room
          ready. The last 50 metres matters as much as the 50 kilometres.
        </DeckLead>
        <p className="mt-10 font-heading text-sm font-bold uppercase tracking-[0.15em] text-brand-purple sm:text-base">
          Your craft, delivered properly.
        </p>
      </DeckSlide>

      {/* 9 - Contact */}
      <DeckSlide id="contact" tone="purple" scrollable>
        <DeckEyebrow tone="purple">Contact</DeckEyebrow>
        <DeckTitle tone="purple" className="mt-4">
          Talk to us
        </DeckTitle>
        <DeckRule tone="purple" />
        <div className="mt-8 lg:grid lg:grid-cols-2 lg:gap-12">
          <SitePhoto
            src={sitePhotos.premiumService}
            alt="Specialist Movers service"
            aspect="wide"
            className="border-white/15"
            overlay={false}
          />
          <div className="mt-8 space-y-6 lg:mt-0">
            {contacts.map((c) => (
              <div key={c.role} className="border-t border-white/20 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-brand-yellow">{c.role}</p>
                <p className="mt-2 font-heading text-xl text-white">{c.name}</p>
                {c.phone ? <p className="mt-1 text-sm text-white/80">{c.phone}</p> : null}
                <a
                  href={`mailto:${c.email}`}
                  className="mt-1 block text-sm text-white/80 underline decoration-white/30 underline-offset-4 hover:text-white"
                >
                  {c.email}
                </a>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-10 text-sm text-white/65">
          186 Target Road, Glenfield · specialistmovers.co.nz
        </p>
      </DeckSlide>
    </div>
  );
}
