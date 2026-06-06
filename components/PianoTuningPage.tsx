import Link from "next/link";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FaqPageJsonLd } from "@/components/FaqPageJsonLd";
import { HeroVisual } from "@/components/HeroVisual";
import { QuoteForm } from "@/components/QuoteForm";
import type { PianoTuningContent } from "@/lib/piano-tuning-types";
import { resolveServiceLink } from "@/lib/service-links";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

const heroPhoto = "/photos/piano-gallery/piano-tuning.jpg";

type Props = {
  content: PianoTuningContent;
};

export function PianoTuningPage({ content }: Props) {
  return (
    <div className="bg-brand-white">
      <FaqPageJsonLd items={content.faqs} />
      <section className="border-b border-white/10 bg-brand-purple py-12 text-white sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center container-px">
          <div>
            <Breadcrumbs items={[...content.breadcrumbs]} light />
            <p className="mt-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-yellow">
              {content.hero.eyebrow}
            </p>
            <h1 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
              {content.hero.h1}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/88 sm:text-lg">
              {content.hero.lead}
            </p>
            <p className="mt-3 inline-block max-w-xl rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white/90">
              {content.hero.subline}
            </p>
            {content.crossLink ? (
              <div className="mt-5">
                <Link
                  href={content.crossLink.href}
                  className="rounded-full border border-brand-yellow/40 bg-brand-yellow/10 px-3 py-1.5 text-xs font-semibold text-brand-yellow transition hover:bg-brand-yellow/20"
                >
                  {content.crossLink.label} →
                </Link>
              </div>
            ) : null}
            <a
              href={`tel:${phoneNumber}`}
              className="mt-6 inline-flex font-heading text-xl font-bold text-brand-yellow transition-colors duration-200 hover:text-white sm:text-2xl"
            >
              {phoneDisplay}
            </a>
          </div>
          <HeroVisual
            photoSrc={heroPhoto}
            photoAlt="Piano tuning in progress with the front cover removed for adjustment"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 py-12 container-px lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:items-start">
        <article className="space-y-10">
          <div className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">
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

          {content.sections.map((section) => (
            <div
              key={section.title}
              className="rounded-2xl border border-brand-purple/15 bg-brand-purple/[0.03] p-6 sm:p-8"
            >
              <h2 className="font-heading text-2xl text-brand-purple">{section.title}</h2>
              <p className="mt-4 text-base leading-relaxed text-brand-purple/85">{section.body}</p>
            </div>
          ))}

          <div className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-heading text-2xl text-brand-purple">Why book through us</h2>
            <p className="mt-4 text-base leading-relaxed text-brand-purple/85">{content.whyChoose}</p>
          </div>

          <div>
            <h2 className="font-heading text-xl text-brand-purple">Related piano services</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {content.relatedSlugs.map((slug) => {
                const link = resolveServiceLink(slug);
                if (!link) return null;
                return (
                  <Link
                    key={slug}
                    href={link.href}
                    className="rounded-full border border-brand-purple/20 bg-white px-4 py-2 text-sm font-semibold text-brand-purple shadow-sm transition hover:border-brand-purple/40 hover:bg-brand-purple/[0.04]"
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </article>

        <div id="quote" className="scroll-mt-28 lg:sticky lg:top-28">
          <p className="mb-3 text-sm font-semibold text-brand-purple">
            Request tuning or a call back
          </p>
          <QuoteForm initialMode="callback" />
        </div>
      </section>

      <section className="border-t border-brand-purple/10 bg-brand-purple/[0.03] py-12 sm:py-14">
        <div className="mx-auto max-w-6xl container-px">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
            Piano tuning questions
          </h2>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {content.faqs.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-brand-purple/12 bg-white p-5 shadow-sm"
              >
                <dt className="font-heading text-base text-brand-purple">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-brand-purple/80">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-brand-purple/10 py-12 container-px">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">{content.ctaTitle}</h2>
          <p className="mt-4 text-brand-purple/85">
            Call{" "}
            <a href={`tel:${phoneNumber}`} className="font-semibold text-brand-purple underline">
              {phoneDisplay}
            </a>{" "}
            or use the form above. We call back within 15 minutes with availability and pricing.
          </p>
        </div>
      </section>
    </div>
  );
}
