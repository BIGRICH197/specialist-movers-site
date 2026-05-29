import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";

type Variant = "light" | "purple";

type Props = {
  variant?: Variant;
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Crumb[];
  children?: React.ReactNode;
};

export function PageHero({
  variant = "light",
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: Props) {
  const isPurple = variant === "purple";

  return (
    <section
      className={
        isPurple
          ? "relative overflow-hidden border-b border-white/10 bg-brand-purple py-12 text-white sm:py-16"
          : "relative overflow-hidden border-b border-brand-purple/10 bg-hero-modern py-12 sm:py-16"
      }
    >
      <BrandLogomarkWatermark
        mark={isPurple ? "yellow" : "purple"}
        position={isPurple ? "bottom-right" : "top-right"}
        size={isPurple ? 280 : 220}
        opacity={isPurple ? 0.07 : 0.05}
      />
      <div className="relative z-[1] mx-auto max-w-7xl container-px">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs items={breadcrumbs} light={isPurple} />
        )}
        {eyebrow && (
          <p
            className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
              isPurple
                ? "border-white/20 bg-white/10 text-brand-yellow"
                : "border-brand-purple/15 bg-white/90 text-brand-purple"
            }`}
          >
            {eyebrow}
          </p>
        )}
        <h1
          className={`font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl ${
            isPurple ? "text-white" : "text-brand-purple"
          }`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
              isPurple ? "text-white/88" : "text-brand-purple/85"
            }`}
          >
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
