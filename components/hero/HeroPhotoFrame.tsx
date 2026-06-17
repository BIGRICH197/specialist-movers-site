import type { ReactNode } from "react";
import { HeroTitleStack } from "@/components/hero/HeroTitleStack";
import { cn } from "@/lib/utils";

type Props = {
  heading: string;
  eyebrowLabel?: string;
  photo: ReactNode;
  headingNowrap?: boolean;
  className?: string;
  /** Element for the visible title. Use "div"/"h2" when the <h1> is elsewhere. */
  headingAs?: "h1" | "h2" | "div";
};

/** Photo with title stack above it in the left column (desktop). */
export function HeroPhotoFrame({
  heading,
  eyebrowLabel,
  photo,
  headingNowrap = true,
  className,
  headingAs = "h1",
}: Props) {
  return (
    <div className={cn("hidden w-full min-w-0 lg:block", className)}>
      <HeroTitleStack
        heading={heading}
        eyebrowLabel={eyebrowLabel}
        nowrap={headingNowrap}
        headingAs={headingAs}
      />
      {photo}
    </div>
  );
}
