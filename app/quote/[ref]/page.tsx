import type { Metadata } from "next";
import { cookies } from "next/headers";
import { getQuote, tokenFromRef } from "@/lib/quote-store";
import { AlreadyBooked } from "@/components/quote-deck/AlreadyBooked";
import { quotePreviewCopy } from "@/lib/quote-preview-meta";
import { siteName, siteUrl } from "@/lib/site-config";
import { HouseMoveDeck } from "@/components/quote-deck/house-move/HouseMoveDeck";

// Public hosted quote page. Reads the stored quote from KV server-side (the
// browser never touches the store, so quotes can't be enumerated) and renders
// the branded deck. Quotes stay live well past 14 days — see hosted-quotes-spec.md.

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { ref: string };
}): Promise<Metadata> {
  const path = `/quote/${params.ref}`;
  const stored = await getQuote(tokenFromRef(params.ref));

  if (!stored) {
    return {
      title: { absolute: "Quote not found | Specialist Movers" },
      description: "This quote link is no longer available. Contact Specialist Movers for a fresh quote.",
      robots: { index: false, follow: false },
      openGraph: {
        type: "website",
        siteName,
        url: `${siteUrl}${path}`,
        title: "Quote not found | Specialist Movers",
        description: "This quote link is no longer available.",
      },
    };
  }

  const { title, description } = quotePreviewCopy(stored, params.ref);

  return {
    title: { absolute: title },
    description,
    robots: { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName,
      url: `${siteUrl}${path}`,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-brand-purple">
      <h1 className="font-heading text-2xl sm:text-3xl">Quote not found</h1>
      <p className="mt-3 max-w-md text-brand-purple/75">
        This quote link is no longer available. Please get in touch and we will
        send you a fresh one.
      </p>
      <a
        href="tel:+6492282728"
        className="mt-6 rounded-full bg-brand-purple px-5 py-2.5 text-sm font-semibold text-white"
      >
        Call (021) 228 2728
      </a>
    </main>
  );
}

export default async function HostedQuotePage({
  params,
}: {
  params: { ref: string };
}) {
  const token = tokenFromRef(params.ref);
  const stored = await getQuote(token);

  if (!stored) {
    return <NotFound />;
  }

  // Signed in to /admin/quotes? Then this is us checking a quote, not a
  // customer. Admins see the deck even once it is booked, because "what did we
  // actually quote them" is the whole reason the admin list links here.
  const expected = process.env.ADMIN_PASSWORD;
  const isAdmin = !!expected && cookies().get("sm_admin")?.value === expected;

  // Direct book-ins store a stub quote (no line items, no addresses) purely so
  // the booking shows up in the admin list. There is no deck to render for one.
  const hasQuote = (stored.quote?.lineItems?.length ?? 0) > 0;

  if (!hasQuote) {
    return isAdmin ? (
      <main className="flex min-h-screen flex-col items-center justify-center bg-brand-canvas px-6 text-center text-brand-purple">
        <h1 className="font-heading text-2xl sm:text-3xl">No quote on this booking</h1>
        <p className="mt-3 max-w-md text-brand-purple/75">
          This came in through the booking link rather than a quote, so there are
          no quoted line items to show. The booking details are in ShiftMate.
        </p>
      </main>
    ) : (
      <AlreadyBooked clientName={stored.quote?.clientName} />
    );
  }

  // Already booked: no live deck, no Accept button. Re-accepting sent the team a
  // fresh Slack ping for a job that had been on the board for weeks.
  if (stored.status === "booked" && !isAdmin) {
    return <AlreadyBooked clientName={stored.quote.clientName} />;
  }

  const booked = stored.status === "booked";

  return (
    <>
      {isAdmin && booked ? (
        <div className="bg-brand-purple px-4 py-2 text-center text-xs font-semibold text-white">
          Admin view — this quote is booked. Customers see &quot;You&apos;re already
          booked in&quot; here, and this view is read only.
        </div>
      ) : null}
      <HouseMoveDeck
        quote={stored.quote}
        {...(booked ? {} : { quoteRef: params.ref })}
        bedrooms={stored.prefill?.bedrooms}
        bathrooms={stored.prefill?.bathrooms}
      />
    </>
  );
}
