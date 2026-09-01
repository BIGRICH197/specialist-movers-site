import Link from "next/link";
import type { ReactNode } from "react";
import { CleaningBookingForm } from "@/components/CleaningBookingForm";
import { HardToShiftEnquiryForm } from "@/components/HardToShiftEnquiryForm";
import { HeroVisual } from "@/components/HeroVisual";
import { ProcessStepsGrid, type ProcessStep } from "@/components/ProcessStepsGrid";
import { QuoteForm } from "@/components/QuoteForm";
import { ReviewSidebarColumn } from "@/components/ReviewSidebarColumn";
import { ScatteredReviews } from "@/components/ScatteredReviews";
import { SectionReveal } from "@/components/SectionReveal";
import { contactCta, googleReviewsUrl, hamiltonStatsStrip,
  tradeStatsStrip, pianoStatsStrip, statsStrip } from "@/lib/homepage-copy";
import { sitePhotos } from "@/lib/site-photos";
import type { FaqItem } from "@/lib/service-faqs";
import { formatHeadingText } from "@/lib/heading-ampersand";
import type { JobType } from "@/lib/site-data";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

type WhyChooseProps = {
  title: string;
  body: string;
  showStats?: boolean;
  /** Piano service pages show moves from $300, not $350. */
  statsVariant?: "default" | "piano" | "hamilton" | "trade";
};

/** Full purple band: why choose copy + homepage stats strip. */
export function ServiceWhyChooseSection({
  title,
  body,
  showStats = true,
  statsVariant = "default",
}: WhyChooseProps) {
  const statsItems =
    statsVariant === "trade"
      ? tradeStatsStrip.items
      : statsVariant === "piano"
      ? pianoStatsStrip.items
      : statsVariant === "hamilton"
        ? hamiltonStatsStrip.items
        : statsStrip.items;

  return (
    <SectionReveal className="border-t border-brand-purple/15 bg-brand-purple py-12 text-white sm:py-14">
      <div className="mx-auto max-w-7xl container-px">
        <h2 className="font-heading text-2xl text-white sm:text-3xl">{title}</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/85">{body}</p>
        {showStats ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statsItems.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
              >
                <p className="font-heading text-2xl text-brand-yellow">{item.value}</p>
                <p className="mt-1 text-xs text-white/80">{item.label}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </SectionReveal>
  );
}

type ProcessProps = {
  title: string;
  steps: readonly ProcessStep[];
  reviewSlot: string;
  piano?: boolean;
};

/** Light purple band: process steps with optional scattered review in sidebar. */
export function ServiceProcessSection({ title, steps, reviewSlot, piano = false }: ProcessProps) {
  if (steps.length === 0) return null;

  return (
    <SectionReveal className="border-t border-brand-purple/10 bg-brand-canvas py-12 sm:py-14">
      <div className="mx-auto max-w-7xl container-px">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start lg:gap-12">
          <div className="min-w-0">
            <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">{title}</h2>
            <ProcessStepsGrid steps={steps} className="mt-6" />
          </div>
          <div className="lg:pt-12">
            <ScatteredReviews
              slot={reviewSlot}
              count={1}
              piano={piano}
              variant="sidebar"
            />
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

type RelatedProps = {
  title?: string;
  children: ReactNode;
};

/** White band: related service link pills. */
export function ServiceRelatedLinksSection({
  title = "Related services",
  children,
}: RelatedProps) {
  return (
    <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 container-px">
      <h2 className="font-heading text-xl text-brand-purple">{title}</h2>
      <div className="mt-4 flex flex-wrap gap-2">{children}</div>
    </SectionReveal>
  );
}

type FaqProps = {
  heading: string;
  faqs: readonly FaqItem[];
  reviewSlot: string;
  piano?: boolean;
};

/** Light purple band: FAQs with review sidebar on desktop. */
export function ServiceFaqSection({ heading, faqs, reviewSlot, piano = false }: FaqProps) {
  if (faqs.length === 0) return null;

  return (
    <SectionReveal className="border-t border-brand-purple/10 bg-brand-canvas py-12 sm:py-14">
      <div className="mx-auto max-w-6xl container-px">
        <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">{heading}</h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-12">
          <dl className="min-w-0 space-y-6">
            {faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-brand-purple/12 bg-white p-5 shadow-sm"
              >
                <dt className="font-heading text-base text-brand-purple">
                  {formatHeadingText(item.q)}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-brand-purple/80">{item.a}</dd>
              </div>
            ))}
          </dl>
          <ReviewSidebarColumn reviewSlot={reviewSlot} reviewCount={2} piano={piano} />
        </div>
        <p className="mt-6 text-center text-sm text-brand-purple/70 lg:hidden">
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-purple underline underline-offset-2"
          >
            See hundreds of 5-star Google reviews →
          </a>
        </p>
      </div>
    </SectionReveal>
  );
}

type BottomCtaProps = {
  title?: string;
  body?: ReactNode;
  defaultJobType: JobType;
  useCleaningForm?: boolean;
  useHardToShiftForm?: boolean;
  quoteForm?: ReactNode;
};

const bottomCtaPhotoAlt =
  "Client at home while a Specialist Movers crew member serves champagne after a move";

/** Purple band: final quote form CTA (matches homepage contact slide layout). */
export function ServiceBottomCta({
  title = "Get your free quote today",
  body,
  defaultJobType,
  useCleaningForm = false,
  useHardToShiftForm = false,
  quoteForm,
}: BottomCtaProps) {
  return (
    <section className="border-t border-brand-purple/10 bg-brand-purple py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2 lg:items-center container-px">
        <div className="mx-auto w-full max-w-xl space-y-5 sm:space-y-6 lg:mx-0">
          <div className="space-y-2 sm:space-y-3">
            <h2 className="font-heading text-3xl leading-tight sm:text-4xl">{title}</h2>
            <a
              href={`tel:${phoneNumber}`}
              className="inline-flex font-heading text-xl font-bold leading-none text-brand-yellow transition hover:text-white sm:text-2xl"
            >
              {phoneDisplay}
            </a>
          </div>
          <p className="text-base leading-relaxed text-white/90">
            {body ?? contactCta}
          </p>
          <HeroVisual
            variant="moving"
            photoSrc={sitePhotos.premiumService}
            photoAlt={bottomCtaPhotoAlt}
            aspectClassName="aspect-[16/10] min-h-[12rem] sm:min-h-[14rem] lg:min-h-0 lg:max-h-[20rem]"
            imageObjectPosition="center center"
            className="w-full"
          />
        </div>
        {quoteForm ??
          (useCleaningForm ? (
            <CleaningBookingForm />
          ) : useHardToShiftForm ? (
            <HardToShiftEnquiryForm />
          ) : (
            <QuoteForm compact defaultJobType={defaultJobType} />
          ))}
      </div>
    </section>
  );
}

/** Pill link helper used across service landings. */
export function ServiceRelatedLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40 hover:bg-brand-purple/[0.04]"
    >
      {children}
    </Link>
  );
}
