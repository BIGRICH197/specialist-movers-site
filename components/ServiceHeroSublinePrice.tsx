import type { ReactNode } from "react";
import {
  serviceHeroSublineClass,
  serviceHeroSublineWrapClass,
} from "@/lib/service-hero-detail";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Price pill — stops 0.5cm before the Google badge column on xl+. */
export function ServiceHeroSublinePrice({ children, className }: Props) {
  return (
    <div className={cn(serviceHeroSublineWrapClass, className)}>
      <p className={serviceHeroSublineClass}>{children}</p>
    </div>
  );
}
