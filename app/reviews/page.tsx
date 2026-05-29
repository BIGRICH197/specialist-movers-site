import type { Metadata } from "next";

import Link from "next/link";

import { PageHero } from "@/components/PageHero";

import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";

import { SectionReveal } from "@/components/SectionReveal";

import { TrustindexWidget } from "@/components/TrustindexWidget";

import { googleReviewsUrl } from "@/lib/homepage-copy";



export const metadata: Metadata = {

  title: "Reviews",

  description:

    "Customer satisfaction is our top priority. Read what Auckland and Waikato customers say about Specialist Movers on Google.",

};



export default function ReviewsPage() {

  return (

    <div className="bg-brand-white">

      <PageHero

        variant="purple"

        eyebrow="Customer feedback"

        title="Reviews"

        description="Customer satisfaction is our top priority. Here is what our customers say about our house, piano, and commercial moving services."

        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Reviews" }]}

      />



      <SectionReveal className="relative z-0 mx-auto max-w-7xl overflow-visible py-10 pb-12 container-px sm:py-12 sm:pb-14">
        <TrustindexWidget layout="full" className="w-full" />

        <p className="mt-8 text-center text-sm text-brand-purple/70">

          Reviews are sourced from our{" "}

          <a

            href={googleReviewsUrl}

            target="_blank"

            rel="noopener noreferrer"

            className="font-semibold text-brand-purple underline"

          >

            Google Business Profile

          </a>

          . To leave your own review, use Google after your move.{" "}

          <Link href="/#quote" className="font-semibold text-brand-purple underline">

            Request a free quote

          </Link>

          .

        </p>
      </SectionReveal>

      <PagePhotoMomentStrip
        momentKey="reviews"
        tone="light"
        useQuoteAnchor
        className="border-b border-brand-purple/10"
      />
    </div>

  );

}

