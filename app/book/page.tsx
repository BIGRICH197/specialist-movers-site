import Link from "next/link";

export const metadata = {
  title: "Book your move — Specialist Movers",
  robots: { index: false, follow: false },
};

// One booking link the team can send. The customer picks what they're booking,
// then fills the matching form which books the job straight in.
export default function BookPage() {
  return (
    <main className="min-h-screen bg-brand-canvas px-4 py-12 text-brand-purple sm:px-6">
      <div className="mx-auto max-w-xl">
        <h1 className="font-heading text-2xl sm:text-3xl">Book your move</h1>
        <p className="mt-2 text-brand-purple/70">What are you booking in?</p>

        <div className="mt-6 space-y-4">
          <Link
            href="/book/house"
            className="block rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <span className="font-heading text-lg text-brand-purple">House move</span>
            <span className="mt-1 block text-sm text-brand-purple/70">
              Homes, apartments, and townhouses.
            </span>
          </Link>

          <Link
            href="/book/piano"
            className="block rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <span className="font-heading text-lg text-brand-purple">Piano or large item</span>
            <span className="mt-1 block text-sm text-brand-purple/70">
              Pianos, spa pools, and other specialist items.
            </span>
          </Link>

          <Link
            href="/book/office"
            className="block rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <span className="font-heading text-lg text-brand-purple">Office move</span>
            <span className="mt-1 block text-sm text-brand-purple/70">
              Offices, commercial and business relocations.
            </span>
          </Link>
        </div>

        <p className="mt-8 text-center text-sm text-brand-purple/60">
          Prefer to talk? Call us on{" "}
          <a href="tel:+6492282728" className="font-semibold underline underline-offset-2">
            (021) 228 2728
          </a>
          .
        </p>
      </div>
    </main>
  );
}
