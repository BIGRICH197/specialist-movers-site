import Image from "next/image";
import { googleMapsDepotsUrl } from "@/lib/coverage-map-url";

const coverageMapImage = "/illustrations/coverage-map.png";

export function CoverageMap() {
  return (
    <figure
      className="mt-8 overflow-hidden rounded-2xl border border-brand-purple/15 bg-brand-surface"
      aria-label="Road map showing Specialist Movers bases in Auckland and Hamilton"
    >
      <div className="relative aspect-[5/2] w-full min-h-[240px] overflow-hidden sm:min-h-[300px]">
        <Image
          src={coverageMapImage}
          alt="Road map of the North Island with Auckland and Hamilton depot locations marked"
          fill
          className="object-cover object-center"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />
      </div>

      <figcaption className="flex flex-wrap items-center justify-between gap-3 border-t border-brand-purple/10 bg-white/80 px-4 py-3 text-xs text-brand-purple/75">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-brand-purple ring-2 ring-white" aria-hidden />
            Auckland (Wairau Valley)
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-brand-yellow ring-2 ring-white" aria-hidden />
            Hamilton (Waikato)
          </span>
        </div>
        <a
          href={googleMapsDepotsUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-heading text-[11px] font-bold uppercase tracking-wide text-brand-purple underline-offset-2 hover:underline"
        >
          Open in Google Maps
        </a>
      </figcaption>
    </figure>
  );
}
