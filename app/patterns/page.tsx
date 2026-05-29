import type { Metadata } from "next";
import "./patterns.css";
import Link from "next/link";
import { Star } from "lucide-react";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { PatternBand } from "@/components/PatternBand";

export const metadata: Metadata = {
  title: "Pattern playground",
  robots: { index: false, follow: false },
};

function ReviewCard({ label, rating }: { label: string; rating: string }) {
  return (
    <div className="rounded-xl border border-brand-purple/10 bg-white px-5 py-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.22)]">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-purple/55">{label}</p>
      <p className="mt-2 font-heading text-3xl font-bold text-brand-purple">{rating}</p>
      <div className="mt-1 flex gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-brand-yellow text-brand-yellow" strokeWidth={0} />
        ))}
      </div>
      <p className="mt-1 text-[11px] text-brand-purple/65">out of 5 stars</p>
    </div>
  );
}

function RoadwayLayoutDemo({
  label,
  bandVariant,
}: {
  label: string;
  bandVariant: "circles" | "triangles";
}) {
  const header = (
    <p className="border-b border-brand-purple/10 bg-brand-canvas px-4 py-2 text-xs font-semibold uppercase tracking-wider text-brand-purple/60">
      {label}
    </p>
  );

  const cardsBlock = (
    <>
      <p className="text-sm text-brand-yellow/85">Purple section , cards overlap the band below</p>
      <div className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-3">
        <ReviewCard label="Google" rating="4.9" />
        <ReviewCard label="Reviews" rating="5.0" />
        <ReviewCard label="Trust" rating="4.9" />
      </div>
    </>
  );

  const whiteBlock = (
    <div className="relative z-10 -mt-7 bg-brand-white px-4 pb-8 pt-2 sm:-mt-8 sm:px-6 sm:pb-10">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple/50">
        White section below
      </p>
      <h2 className="mt-2 font-heading text-xl text-brand-purple">Same layout as Roadway</h2>
    </div>
  );

  if (bandVariant === "triangles") {
    return (
      <section className="overflow-hidden rounded-2xl border border-brand-purple/15 shadow-sm">
        {header}
        <div className="playground-purple-fade-section px-4 pb-14 pt-8 text-center text-brand-yellow sm:px-6 sm:pb-16">
          {cardsBlock}
        </div>
        <PatternBand variant="triangles" dissolve />
        {whiteBlock}
      </section>
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-brand-purple/15 bg-white shadow-sm">
      {header}
      <div className="bg-brand-purple px-4 pb-14 pt-8 text-center sm:px-6 sm:pb-16">
        {cardsBlock}
      </div>
      <PatternBand variant="circles" className="h-[4.5rem] sm:h-20" />
      {whiteBlock}
    </section>
  );
}

export default function PatternsPlaygroundPage() {
  return (
    <div className="min-h-screen bg-brand-canvas">
      <div className="border-b border-brand-purple/10 bg-white px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-purple/50">
              Internal only , not on live pages
            </p>
            <h1 className="font-heading text-xl text-brand-purple">Pattern playground</h1>
          </div>
          <Link href="/" className="text-sm font-semibold text-brand-purple underline">
            Back to site
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-10 px-4 py-10 sm:px-6">
        <p className="text-sm leading-relaxed text-brand-purple/75">
          Triangles are <strong className="text-brand-purple">not</strong> on the main site. Logomark
          watermarks stay on the live site (hero + footer). Compare circle vs triangle bands below ,
          triangles: 3 rows on a 150px band that straddles purple→white (no hard line).
        </p>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple/55">
            Band only (close-up)
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-xs text-brand-purple/65">Roadway-style circles (reference)</p>
              <PatternBand variant="circles" className="h-[4.5rem] sm:h-20 rounded-lg" />
            </div>
            <div className="overflow-hidden rounded-lg border border-brand-purple/10">
              <p className="mb-0 bg-brand-canvas px-2 py-2 text-xs text-brand-purple/65">
                Triangles , dissolve down into white
              </p>
              <div className="h-20 playground-purple-fade-section" aria-hidden />
              <PatternBand variant="triangles" dissolve />
              <div className="h-20 bg-brand-white" aria-hidden />
            </div>
          </div>
        </div>

        <RoadwayLayoutDemo label="Full layout , circles (Roadway match)" bandVariant="circles" />
        <RoadwayLayoutDemo label="Full layout , triangles (your brand)" bandVariant="triangles" />

        <section className="relative overflow-hidden rounded-2xl bg-brand-purple px-6 py-14">
          <BrandLogomarkWatermark mark="yellow" position="bottom-right" size={280} opacity={0.07} />
          <p className="relative z-[1] text-center text-sm text-brand-yellow/85">
            Logomark watermark (live on homepage hero + footer + purple page heroes)
          </p>
        </section>
      </div>
    </div>
  );
}
