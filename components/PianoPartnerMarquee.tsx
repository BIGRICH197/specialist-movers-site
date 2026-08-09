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
          {/* H10: these logos were image alt text with no links anywhere on the
              site, so "trusted by Auckland music retailers" was unverifiable to
              a crawler. Linked where we could confirm the URL loads; the
              duplicate marquee track stays unlinked so nothing is announced
              twice to a screen reader. */}
          {partner.href && !duplicate ? (
            <a
              href={partner.href}
              target="_blank"
              rel="noopener"
              className="ml-3 inline-flex"
              title={`${partner.name} , a retailer we move pianos for`}
            >
              <Image
                src={partner.src}
                alt={`${partner.name} logo`}
                width={partner.width}
                height={partner.height}
                className="h-9 w-auto max-w-[8.5rem] object-contain object-center sm:h-11 sm:max-w-[10rem]"
                sizes={PARTNER_SIZES}
              />
            </a>
          ) : (
            <Image
              src={partner.src}
              alt={duplicate ? "" : `${partner.name} logo`}
              width={partner.width}
              height={partner.height}
              className="ml-3 h-9 w-auto max-w-[8.5rem] object-contain object-center sm:h-11 sm:max-w-[10rem]"
              sizes={PARTNER_SIZES}
            />
          )}
        </li>
      ))}
    </ul>
  );
}

/**
 * Retailer logos in the same moving bar style as homepage MovingBanners.
 */
/**
 * Widest the logo box ever gets: max-w-[10rem] at the sm: breakpoint.
 *
 * These are photographic-weight PNGs (25 KB to 145 KB each, 568 KB across the
 * eight of them) rendering into a 36-44px tall box. They were marked
 * `unoptimized`, so every visitor downloaded the full-resolution originals to
 * show them at thumbnail size.
 */
const PARTNER_SIZES = "160px";

export function PianoPartnerMarquee({
  variant = "default",
}: {
  /** Compact strip above Google badge in purple hero (mobile piano pages). */
  variant?: "default" | "hero";
}) {
  const isHero = variant === "hero";

  return (
    <div className={isHero ? "w-full min-w-0" : "mx-auto max-w-7xl container-px"}>
      <p
        className={
          isHero
            ? "mb-2 text-center font-heading text-[10px] font-bold uppercase tracking-[0.16em] text-white/75 sm:text-xs"
            : "mb-3 text-center font-heading text-xs font-bold uppercase tracking-[0.18em] text-brand-purple/70 sm:mb-4 sm:text-sm"
        }
      >
        Our retailer partners
      </p>
      <section
        className={
          isHero
            ? "pointer-events-auto max-w-full overflow-hidden rounded-xl border border-white/20 bg-gradient-to-b from-brand-yellow/95 to-brand-yellow shadow-[0_12px_28px_-18px_rgba(0,0,0,0.45)] [contain:layout_paint]"
            : "pointer-events-auto max-w-full overflow-hidden rounded-2xl border border-brand-purple/[0.12] bg-gradient-to-b from-brand-yellow/95 to-brand-yellow shadow-[0_20px_40px_-24px_rgba(151,57,176,0.35)] [contain:layout_paint] sm:rounded-[1.25rem]"
        }
        aria-label="Piano retailer partners"
      >
        <div className="group relative w-full overflow-hidden border-0 bg-transparent">
          <div
            className={
              isHero
                ? "flex w-max max-w-none py-2 motion-reduce:animate-none animate-marquee-gentle group-hover:[animation-play-state:paused]"
                : "flex w-max max-w-none py-3 motion-reduce:animate-none animate-marquee-gentle group-hover:[animation-play-state:paused] sm:py-3.5"
            }
          >
            <LogoMarqueeRow />
            <LogoMarqueeRow duplicate />
          </div>
        </div>
      </section>
    </div>
  );
}
