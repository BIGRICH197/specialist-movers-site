import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
};

/** Rounded purple band — matches What's included on the homepage. */
export function HomePurplePanel({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  innerClassName,
}: Props) {
  return (
    <div
      id={id}
      className={cn(
        "relative scroll-mt-24 overflow-hidden rounded-3xl border border-brand-purple/20 bg-brand-purple py-10 text-white shadow-lg container-px sm:py-12",
        className,
      )}
    >
      <BrandLogomarkWatermark mark="yellow" position="top-right" size={240} opacity={0.09} />
      <BrandLogomarkWatermark mark="yellow" position="bottom-left" size={180} opacity={0.05} />
      <div className={cn("relative z-[1] max-w-3xl", innerClassName)}>
        {eyebrow ? (
          <p className="inline-flex max-w-full rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-yellow">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 break-words font-heading text-2xl leading-tight sm:text-3xl">{title}</h2>
        {description ? (
          <p className="mt-4 text-base leading-relaxed text-white/88">{description}</p>
        ) : null}
        {children}
      </div>
    </div>
  );
}
