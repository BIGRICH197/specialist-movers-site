import { SectionReveal } from "@/components/SectionReveal";
import { TrustindexWidget } from "@/components/TrustindexWidget";
import { trustindexHomeWidgetId } from "@/lib/trustindex-config";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** When true, only bottom border (homepage nests more content below). */
  bordered?: boolean;
};

/** Same Trustindex carousel band as the homepage, directly under the hero. */
export function ServiceTrustindexBand({ className, bordered = true }: Props) {
  return (
    <SectionReveal
      className={cn("mx-auto max-w-7xl py-12 container-px sm:py-14", className)}
    >
      <div className={bordered ? "border-b border-brand-purple/10 pb-6 sm:pb-8" : undefined}>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple/50">
          What customers say
        </p>
        <TrustindexWidget
          widgetId={trustindexHomeWidgetId}
          layout="carousel"
          className="mt-4 w-full"
        />
      </div>
    </SectionReveal>
  );
}
