import type { Metadata } from "next";
import Link from "next/link";
import { MessageSquare, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { ScatteredReviews } from "@/components/ScatteredReviews";
import { contactCta } from "@/lib/homepage-copy";
import { regions } from "@/lib/regions";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Specialist Movers NZ for quotes, bookings and questions , phone, email, or message.",
};

export default function ContactPage() {
  return (
    <div className="bg-brand-white">
      <PageHero
        variant="light"
        eyebrow="We reply fast"
        title="Contact us"
        description={contactCta}
      />

      <div className="mx-auto grid max-w-7xl gap-10 py-12 container-px lg:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] lg:items-start">
        <div className="space-y-10">
          <div className="rounded-2xl border border-brand-purple/15 bg-brand-purple/[0.04] p-6 sm:p-8">
            <h2 className="font-heading text-xl text-brand-purple">Direct lines</h2>
            <ul className="mt-5 space-y-4 text-brand-purple/85">
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-brand-purple" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-purple/60">
                    Phone
                  </p>
                  <a
                    href={`tel:${phoneNumber}`}
                    className="font-heading text-xl font-bold text-brand-purple hover:underline"
                  >
                    {phoneDisplay}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <MessageSquare className="mt-0.5 h-5 w-5 shrink-0 text-brand-purple" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-purple/60">
                    Email
                  </p>
                  <a
                    href="mailto:info@specialistmovers.co.nz"
                    className="font-semibold text-brand-purple hover:underline"
                  >
                    info@specialistmovers.co.nz
                  </a>
                </div>
              </li>
            </ul>
            <p className="mt-6 text-sm text-brand-purple/75">
              <strong className="text-brand-purple">Hours:</strong> Mon–Sun, 9am–7pm
            </p>
          </div>

          <div>
            <h2 className="font-heading text-xl text-brand-purple">Service areas</h2>
            <ul className="mt-4 space-y-2 text-sm text-brand-purple/85">
              <li>
                <strong className="text-brand-purple">Auckland base</strong> , North Shore,
                metro, and wider Auckland
              </li>
              <li>
                <strong className="text-brand-purple">Hamilton base</strong> , Waikato and
                surrounding regions
              </li>
              <li>{regions.widerNorthIsland}</li>
              <li>International moves , quoted to your destination</li>
            </ul>
          </div>

          <ContactForm />
        </div>

        <aside className="space-y-8 lg:sticky lg:top-28">
          <div>
          <p className="mb-2 text-sm font-semibold text-brand-purple">
            Prefer a call-back?
          </p>
          <QuoteForm defaultJobType="House Move" />
          <p className="mt-6 text-center text-sm text-brand-purple/65">
            Or{" "}
            <Link href="#quote" className="font-semibold text-brand-purple underline">
              use the quote form above
            </Link>
            .
          </p>
          </div>
          <ScatteredReviews slot="contact-aside" count={2} variant="compact" />
        </aside>
      </div>
    </div>
  );
}
