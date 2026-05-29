import Image from "next/image";
import Link from "next/link";
import { brandAssets } from "@/lib/brand-assets";

type Variant = "header" | "footer";

type Props = { variant: Variant; onNavigate?: () => void };

export function BrandLogo({ variant, onNavigate }: Props) {
  if (variant === "header") {
    return (
      <Link
        href="/"
        onClick={onNavigate}
        className="flex min-w-0 items-center"
        aria-label="Specialist Movers NZ , home"
      >
        {/* Same footprint as purple header: ~36–44px tall row, horizontal lockup; yellow PNG on purple bar */}
        <Image
          src={brandAssets.primaryLogoYellow2xPng}
          alt="Specialist Movers"
          width={200}
          height={80}
          className="h-9 w-auto max-w-[min(58vw,12.5rem)] shrink-0 object-contain object-left sm:h-11 sm:max-w-[14rem]"
          sizes="(max-width: 640px) 200px, 224px"
          unoptimized
          priority
        />
      </Link>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <Image
        src={brandAssets.logomarkYellow}
        alt=""
        width={72}
        height={72}
        className="h-16 w-16 shrink-0 sm:h-[4.5rem] sm:w-[4.5rem]"
        unoptimized
      />
      <div>
        <p className="font-heading text-lg font-bold uppercase leading-tight tracking-[0.15em] text-brand-yellow sm:text-xl">
          <span className="block leading-tight">Specialist</span>
          <span className="block leading-tight">Movers</span>
        </p>
        <p className="mt-1 text-xs text-white/70">Auckland &amp; Waikato</p>
      </div>
    </div>
  );
}
