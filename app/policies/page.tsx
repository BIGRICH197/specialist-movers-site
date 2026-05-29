import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { privacyPolicySections } from "@/lib/privacy-policy-sections";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Specialist Movers collects, uses, and protects your personal information.",
};

export default function PoliciesPage() {
  return (
    <div className="bg-brand-white">
      <PageHero
        variant="light"
        eyebrow="Legal"
        title="Privacy policy"
        description="Imported from our live site. Booking terms, deposits, and liability wording for moves can be added when your solicitor supplies final service terms."
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

        <p className="rounded-xl border border-brand-purple/15 bg-brand-purple/[0.03] p-4 text-xs text-brand-purple/70">
          Service terms and conditions (deposits, cancellations, damage claims,
          weather delays) are not on the old site as a separate page we could
          import. Add them here when ready, or{" "}
          <Link
            href="/contact"
            className="font-semibold text-brand-purple underline"
          >
            contact us
          </Link>{" "}
          for move-specific questions.
        </p>
      </div>
    </div>
  );
}
