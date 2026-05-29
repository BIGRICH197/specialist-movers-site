import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  scrollable?: boolean;
  tone?: "purple" | "light";
};

export function DeckSlide({
  id,
  children,
  className,
  innerClassName,
  scrollable,
  tone = "light",
}: Props) {
  const isPurple = tone === "purple";

  return (
    <section
      id={id}
      className={cn(
        "deck-slide scroll-snap-align-start border-b",
        isPurple
          ? "hero-ambient border-white/10 text-white"
          : "border-brand-purple/10 bg-hero-modern text-brand-purple",
        scrollable && "deck-slide--scroll",
        className,
      )}
    >
      <BrandLogomarkWatermark
        mark={isPurple ? "yellow" : "purple"}
        position={isPurple ? "bottom-right" : "top-right"}
        size={isPurple ? 260 : 200}
        opacity={isPurple ? 0.065 : 0.05}
      />
      <div
        className={cn(
          "deck-slide-inner relative z-[1] mx-auto flex w-full max-w-7xl flex-col container-px py-12 sm:py-16 lg:py-20",
          innerClassName,
        )}
      >
        {children}
      </div>
    </section>
  );
}
