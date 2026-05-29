import { phoneDisplay } from "@/lib/site-data";

const MARQUEE_ITEMS = [
  "SiteWise Gold certified",
  "Moves from $350",
  `Free quote · ${phoneDisplay}`,
  "If you're reading this, it's a sign to book with Specialist Movers",
  "House · office · piano · commercial",
  "The universe is telling me something. It's telling me you need to book with Specialist Movers",
  "Auckland and Hamilton bases",
  "NZ owned. Auckland and Waikato crews.",
  "Pickup and drop-off. Accurate quoting.",
  "Licensed & insured crews",
];

/**
 * Homepage trust ticker , single scrolling row.
 */
export function MovingBanners() {
  return (
    <section
      className="group pointer-events-auto overflow-hidden rounded-2xl border border-brand-purple/[0.12] bg-gradient-to-b from-brand-yellow/95 to-brand-yellow shadow-[0_20px_40px_-24px_rgba(151,57,176,0.35)] sm:rounded-[1.25rem]"
      aria-label="Why customers choose Specialist Movers"
    >
      <div className="relative overflow-hidden">
        <div className="flex w-max py-3 motion-reduce:animate-none animate-marquee-gentle group-hover:[animation-play-state:paused] sm:py-3.5">
          <ul className="flex shrink-0 items-center" role="list">
            {MARQUEE_ITEMS.map((text) => (
              <li
                key={`a-${text}`}
                className="flex shrink-0 items-center whitespace-nowrap px-5 sm:px-8"
              >
                <span className="text-brand-purple/35" aria-hidden>
                  ·
                </span>
                <span className="pl-3 text-sm font-medium tracking-tight text-brand-purple/90">
                  {text}
                </span>
              </li>
            ))}
          </ul>
          <ul className="flex shrink-0 items-center" role="presentation" aria-hidden>
            {MARQUEE_ITEMS.map((text) => (
              <li
                key={`b-${text}`}
                className="flex shrink-0 items-center whitespace-nowrap px-5 sm:px-8"
              >
                <span className="text-brand-purple/35" aria-hidden>
                  ·
                </span>
                <span className="pl-3 text-sm font-medium tracking-tight text-brand-purple/90">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
