"use client";

import Image from "next/image";
import { BrandLogomark } from "@/components/BrandLogomark";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { brandAssets } from "@/lib/brand-assets";

/** Blank canvas for logo work, no site chrome. */
export function LogoLabCanvas() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-brand-purple">
      <BrandLogomark
        mark="yellow"
        size={180}
        priority
        className="pointer-events-none absolute left-0 top-0 h-40 w-40 shrink-0 -translate-x-[calc(10%+0.5cm)] -translate-y-[calc(10%+0.5cm)] select-none sm:h-[11rem] sm:w-[11rem] lg:h-[13rem] lg:w-[13rem]"
      />
      <Image
        src={brandAssets.wordmarkYellow2xPng}
        alt="Specialist Movers"
        width={502}
        height={102}
        priority
        unoptimized
        className="pointer-events-none absolute left-[calc(clamp(8rem,14vw,13rem)*0.9-0.2cm)] top-[0.3cm] z-[1] h-14 w-auto shrink-0 select-none sm:h-16 lg:h-20"
      />

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <BrandLogomarkWatermark mark="yellow" position="bottom-right" size={320} opacity={0.065} />
        <BrandLogomarkWatermark mark="yellow" position="top-right" size={220} opacity={0.04} />
      </div>
    </div>
  );
}
