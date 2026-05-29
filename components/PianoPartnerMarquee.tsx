import Image from "next/image";
import { pianoRetailerPartners } from "@/lib/piano-partners";

function LogoMarqueeRow({ duplicate }: { duplicate?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      role={duplicate ? "presentation" : "list"}
      aria-hidden={duplicate}
    >
      {pianoRetailerPartners.map((partner) => (
        <li
          key={`${duplicate ? "b" : "a"}-${partner.name}`}
          className="flex shrink-0 items-center whitespace-nowrap px-5 sm:px-8"
        >
          <span className="text-brand-purple/35" aria-hidden>
            ·
          </span>
          <Image
            src={partner.src}
            alt={duplicate ? "" : `${partner.name} logo`}
            width={partner.width}
            height={partner.height}
            className="ml-3 h-9 w-auto max-w-[8.5rem] object-contain object-center sm:h-11 sm:max-w-[10rem]"
            unoptimized
          />
        </li>
      ))}
    </ul>
  );
}

/**
 * Retailer logos in the same moving bar style as homepage MovingBanners.
 */
export function PianoPartnerMarquee() {
  return (
    <div className="mx-auto max-w-7xl container-px">
      <p className="mb-3 text-center font-heading text-xs font-bold uppercase tracking-[0.18em] text-brand-purple/70 sm:mb-4 sm:text-sm">
        Our retailer partners
      </p>
      <section
        className="pointer-events-auto overflow-hidden rounded-2xl border border-brand-purple/[0.12] bg-gradient-to-b from-brand-yellow/95 to-brand-yellow shadow-[0_20px_40px_-24px_rgba(151,57,176,0.35)] sm:rounded-[1.25rem]"
        aria-label="Piano retailer partners"
      >
        <div className="group relative overflow-hidden border-0 bg-transparent">
          <div className="flex w-max py-3 motion-reduce:animate-none animate-marquee-gentle group-hover:[animation-play-state:paused] sm:py-3.5">
            <LogoMarqueeRow />
            <LogoMarqueeRow duplicate />
          </div>
        </div>
      </section>
    </div>
  );
}
