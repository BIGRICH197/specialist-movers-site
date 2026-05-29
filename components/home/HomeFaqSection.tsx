import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScatteredReviews } from "@/components/ScatteredReviews";
import { SectionReveal } from "@/components/SectionReveal";
import { HomePurplePanel } from "@/components/home/HomePurplePanel";
import { faqs } from "@/lib/homepage-copy";
import { sectionRevealDirection } from "@/lib/motion";

const homeFaqs = faqs.slice(0, 4);

const onPurplePill =
  "inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-brand-yellow transition hover:border-white/35 hover:bg-white/15 hover:text-white";

export function HomeFaqSection() {
  return (
    <SectionReveal
      direction={sectionRevealDirection(7)}
      className="border-t border-brand-purple/10 bg-white py-10 sm:py-12"
    >
      <div className="mx-auto min-w-0 max-w-7xl space-y-6 container-px sm:space-y-8">
        <HomePurplePanel
          eyebrow="Questions before you book"
          title="Frequently asked questions"
          description="Straight answers on pricing, timing, and what to expect. Need more detail? Our full FAQ page goes deeper."
        >
          <Link href="/faq" className={`mt-6 ${onPurplePill}`}>
            View all FAQs
            <ArrowRight className="h-4 w-4" />
          </Link>
        </HomePurplePanel>

        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-stretch lg:gap-8 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-10">
          <dl className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:grid-rows-2 sm:gap-5 lg:h-full lg:auto-rows-fr">
            {homeFaqs.map((item) => (
              <div
                key={item.q}
                className="card-interactive flex h-full min-h-[11rem] flex-col rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm sm:min-h-[12.5rem] sm:p-7"
              >
                <dt className="font-heading text-lg leading-snug text-brand-purple">{item.q}</dt>
                <dd className="mt-3 flex-1 text-sm leading-relaxed text-brand-purple/80 sm:text-[0.9375rem]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>

          <aside className="hidden min-w-0 lg:flex lg:flex-col">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple/50">
              What customers say
            </p>
            <div className="mt-3 flex flex-1 flex-col">
              <ScatteredReviews
                slot="home-faq-sidebar"
                count={3}
                variant="sidebar"
                showFooterLink
                showHeading={false}
                className="flex flex-1 flex-col"
              />
            </div>
          </aside>
        </div>

        <p className="text-center text-sm text-brand-purple/70 lg:hidden">
          <Link
            href="/reviews"
            className="font-semibold text-brand-purple underline underline-offset-2"
          >
            Read hundreds of Google reviews →
          </Link>
        </p>
      </div>
    </SectionReveal>
  );
}
