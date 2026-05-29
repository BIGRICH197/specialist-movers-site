import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { ReviewSidebarColumn } from "@/components/ReviewSidebarColumn";
import { ScatteredReviews } from "@/components/ScatteredReviews";
import { SectionReveal } from "@/components/SectionReveal";
import { faqSidebarPhotos } from "@/lib/faq-page-photos";
import { faqs, googleReviewsUrl } from "@/lib/homepage-copy";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about house moves, piano moves, packing, and commercial work across Auckland and the Waikato.",
};

export default function FaqPage() {
  return (
    <div className="bg-brand-white">
      <PageHero
        variant="light"
        eyebrow="Help"
        title="Frequently asked questions"
        description="Answers to common questions about booking, pricing, packing, and how we run your move."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <div className="border-b border-brand-purple/10 bg-brand-canvas lg:hidden">
        <div className="mx-auto max-w-6xl px-4 py-6 container-px">
          <ScatteredReviews slot="faq-mobile" count={2} variant="compact" />
        </div>
        <div className="mx-auto flex gap-3 overflow-x-auto px-4 pb-6 container-px snap-x snap-mandatory">
          {faqSidebarPhotos.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="relative h-28 w-40 shrink-0 snap-start overflow-hidden rounded-lg border border-brand-purple/10"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <SectionReveal className="mx-auto max-w-6xl py-12 container-px sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_11rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_12.5rem]">
          <div className="min-w-0">
            <dl className="space-y-6">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm"
                >
                  <dt className="font-heading text-lg text-brand-purple">
                    {item.q}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-brand-purple/85">
                    {item.a}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-10 text-center text-sm text-brand-purple/70 lg:text-left">
              Piano-specific questions? See our{" "}
              <Link
                href="/piano-movers"
                className="font-semibold text-brand-purple underline"
              >
                piano movers page
              </Link>
              . Still unsure?{" "}
              <Link
                href="#quote"
                className="font-semibold text-brand-purple underline"
              >
                Get a free quote
              </Link>{" "}
              or read our{" "}
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-brand-purple underline"
              >
                Google reviews
              </a>
              .
            </p>
          </div>

          <ReviewSidebarColumn
            reviewSlot="faq-page-sidebar"
            reviewCount={3}
            showPhotos
          />
        </div>
      </SectionReveal>
    </div>
  );
}
