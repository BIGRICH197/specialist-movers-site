import type { Metadata } from "next";
import { CreditApplicationForm } from "@/components/CreditApplicationForm";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Business credit application — Specialist Movers",
  description:
    "Apply for a business credit account with Specialist Movers. Approved accounts are invoiced monthly, payable by the 20th of the month following invoice.",
  path: "/credit-application",
  robots: { index: false, follow: false },
});

export default function CreditApplicationPage() {
  return (
    <main className="min-h-screen bg-brand-canvas px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <p className="inline-flex rounded-full border border-brand-purple/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-purple">
          Business accounts
        </p>
        <h1 className="mt-3 font-heading text-3xl text-brand-purple sm:text-4xl">
          Credit account application
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-purple/75 sm:text-base">
          For businesses that move with us regularly. Approved accounts are invoiced on account and
          payable by the <strong className="text-brand-purple">20th of the month following invoice</strong>.
          We review applications within two business days.
        </p>
        <div className="mt-8">
          <CreditApplicationForm />
        </div>
      </div>
    </main>
  );
}
