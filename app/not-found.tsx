import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

export const metadata: Metadata = buildPageMetadata({
  title: "Page not found",
  description:
    "This page could not be found. Browse our house, piano, and commercial moving services across Auckland and Hamilton.",
  path: "/404",
  robots: { index: false, follow: true },
});

export default function NotFound() {
  return (
    <div className="bg-brand-white">
      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:py-28">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-purple/50">
          404
        </p>
        <h1 className="mt-3 font-heading text-3xl text-brand-purple sm:text-4xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-purple/80">
          The link may be outdated or the page has moved. Try the services hub, get a
          quote, or call us and we will point you in the right direction.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-brand-yellow px-6 py-3 font-heading text-sm font-bold uppercase tracking-wide text-brand-purple transition hover:brightness-[1.05]"
          >
            Home
          </Link>
          <Link
            href="/services"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-brand-purple/20 bg-white px-6 py-3 text-sm font-semibold text-brand-purple transition hover:border-brand-purple/40"
          >
            Services
          </Link>
          <a
            href={`tel:${phoneNumber}`}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-brand-purple/20 bg-white px-6 py-3 text-sm font-semibold text-brand-purple transition hover:border-brand-purple/40"
          >
            {phoneDisplay}
          </a>
        </div>
      </section>
    </div>
  );
}
