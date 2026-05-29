import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PortalTile } from "@/components/PortalTile";
import { brandAssets } from "@/lib/brand-assets";
import { portalTiles } from "@/lib/portal-tiles";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Choose your move",
  description:
    "House moves, piano moves, commercial relocations, packing, cleaning, and more, Specialist Movers Auckland and Waikato.",
  robots: { index: false, follow: true },
};

export default function PortalPage() {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col overflow-y-auto bg-brand-purple">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={brandAssets.logomarkYellow}
            alt=""
            width={44}
            height={44}
            className="h-10 w-10 sm:h-11 sm:w-11"
            aria-hidden
          />
          <span className="font-heading text-lg text-white sm:text-xl">Specialist Movers</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={`tel:${phoneNumber}`}
            className="hidden text-sm font-semibold text-brand-yellow sm:inline"
          >
            {phoneDisplay}
          </a>
          <Link
            href="/"
            className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/15 sm:text-sm"
          >
            Full website
          </Link>
          <Link
            href="/#quote"
            className="rounded-full bg-brand-yellow px-4 py-2 text-xs font-bold uppercase tracking-wide text-brand-purple transition hover:brightness-105 sm:text-sm"
          >
            Free quote
          </Link>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-brand-yellow">
          Trial portal
        </p>
        <h1 className="mt-3 text-center font-heading text-2xl text-white sm:text-3xl lg:text-4xl">
          What do you need help with?
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-white/80 sm:text-base">
          Pick a path below. Each tile opens the right part of our site with photos, pricing, and
          quote forms.
        </p>

        <div className="mt-8 grid flex-1 grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:min-h-[min(52rem,calc(100dvh-14rem))] lg:gap-6">
          {portalTiles.map((tile, index) => (
            <PortalTile key={tile.href} tile={tile} priority={index < 2} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-white/60">
          <Link href="/contact" className="underline underline-offset-2 hover:text-white">
            Contact us
          </Link>
          {" · "}
          <Link href="/about" className="underline underline-offset-2 hover:text-white">
            About
          </Link>
          {" · "}
          <Link href="/faq" className="underline underline-offset-2 hover:text-white">
            FAQ
          </Link>
        </p>
      </div>
    </div>
  );
}
