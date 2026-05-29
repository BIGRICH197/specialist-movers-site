import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PortalTile } from "@/lib/portal-tiles";

type Props = {
  tile: PortalTile;
  priority?: boolean;
};

export function PortalTile({ tile, priority = false }: Props) {
  return (
    <Link
      href={tile.href}
      className="group relative isolate min-h-[11rem] overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_48px_-28px_rgba(0,0,0,0.65)] transition duration-300 hover:border-brand-yellow/40 hover:shadow-[0_28px_56px_-24px_rgba(243,208,42,0.35)] sm:min-h-[14rem] lg:min-h-full"
    >
      <Image
        src={tile.image}
        alt={tile.imageAlt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-cover transition duration-500 group-hover:scale-[1.03]"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-brand-purple/95 via-brand-purple/55 to-brand-purple/25 transition duration-300 group-hover:via-brand-purple/65"
        aria-hidden
      />
      <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6 lg:p-8">
        <p className="font-heading text-2xl leading-tight text-white sm:text-3xl lg:text-[2rem]">
          {tile.title}
        </p>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/85 sm:text-base">
          {tile.subtitle}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-yellow">
          Explore
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
