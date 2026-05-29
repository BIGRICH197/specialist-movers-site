import Image from "next/image";
import { brandAssets } from "@/lib/brand-assets";

type Props = {
  /** Yellow lockup on purple, matches site header */
  onPurple?: boolean;
};

export function DeckBrandLogo({ onPurple }: Props) {
  if (onPurple) {
    return (
      <Image
        src={brandAssets.primaryLogoYellow2xPng}
        alt="Specialist Movers"
        width={200}
        height={80}
        className="h-9 w-auto max-w-[14rem]"
        unoptimized
        priority
      />
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Image
        src={brandAssets.logomarkPurple}
        alt=""
        width={56}
        height={56}
        className="h-14 w-14 shrink-0"
        unoptimized
        priority
      />
      <p className="font-heading text-lg font-bold uppercase leading-[1.05] tracking-[0.18em] text-brand-purple">
        <span className="block">Specialist</span>
        <span className="block tracking-[0.26em]">Movers</span>
      </p>
    </div>
  );
}
