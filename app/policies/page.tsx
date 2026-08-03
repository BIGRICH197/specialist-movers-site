import type { Metadata } from "next";
import { legacyMetaDescription } from "@/lib/legacy-meta-descriptions";
import { buildPageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { privacyPolicySections } from "@/lib/privacy-policy-sections";
import {
  bookingTerms,
  cleaningTerms,
  type BookingTermsSection,
} from "@/lib/quote-deck/booking-terms";
import { AuthorityCitations } from "@/components/AuthorityCitations";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy & Terms",
  description: legacyMetaDescription("policies"),
  path: "/policies",
});

function TermsGroup({
  title,
  sections,
}: {
  title: string;
  sections: BookingTermsSection[];
}) {
  return (
    <section>
      <h2 className="font-heading text-2xl text-brand-purple">{title}</h2>
      <div className="mt-4 space-y-6">
        {sections.map((s) => (
          <div key={s.heading}>
            <h3 className="font-heading text-lg text-brand-purple">{s.heading}</h3>
            <div className="mt-2 space-y-2 text-sm leading-relaxed text-brand-purple/85">
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              {s.bullets ? (
                <ul className="list-disc space-y-1 pl-5">
                  {s.bullets.map((b) => (
                    <li key={b.slice(0, 40)}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {s.tail ? s.tail.map((p) => <p key={p.slice(0, 40)}>{p}</p>) : null}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function PoliciesPage() {
  return (
    <div className="bg-brand-white">
      <PageHero
        variant="light"
        eyebrow="Legal"
        title="Privacy & terms"
        description="Our privacy policy and the terms and conditions for your move and cleaning service."
      />

      <PagePhotoMomentStrip momentKey="policies" />

      <div className="mx-auto max-w-4xl space-y-10 py-12 container-px">
        {privacyPolicySections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-heading text-xl text-brand-purple">
              {section.heading}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-brand-purple/85">
              {section.paragraphs.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
              {"bullets" in section && section.bullets ? (
                <ul className="list-disc space-y-2 pl-5">
                  {section.bullets.map((b) => (
                    <li key={b.slice(0, 40)}>{b}</li>
                  ))}
                </ul>
              ) : null}
              {"tail" in section && section.tail
                ? section.tail.map((p) => <p key={p.slice(0, 40)}>{p}</p>)
                : null}
            </div>
          </section>
        ))}

        <TermsGroup title="Moving terms and conditions" sections={bookingTerms} />
        <TermsGroup title="Cleaning terms and conditions" sections={cleaningTerms} />

        <p className="rounded-xl border border-brand-purple/15 bg-brand-purple/[0.03] p-4 text-xs text-brand-purple/70">
          Questions about your move or clean?{" "}
          <Link
            href="/contact"
            className="font-semibold text-brand-purple underline"
          >
            Contact us
          </Link>{" "}
          and we will be happy to help.
        </p>
      </div>
      <AuthorityCitations />
    </div>
  );
}
