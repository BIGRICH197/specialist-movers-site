import Link from "next/link";
import { ArrowRight, Globe, MapPin, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import {
  clusterItemPath,
  movingDistanceHub,
  movingDistanceServices,
} from "@/lib/service-clusters";
import { sectionRevealDirection } from "@/lib/motion";

const movingIcons: readonly LucideIcon[] = [MapPin, Truck, Globe];

export function HomeMovingDistanceSection() {
  return (
    <SectionReveal
      direction={sectionRevealDirection(4)}
      className="border-t border-brand-purple/10 bg-brand-purple/[0.03] py-14 sm:py-16"
    >
      <div id="moving-by-distance" className="mx-auto max-w-7xl scroll-mt-24 container-px">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple/50">
          {movingDistanceHub.eyebrow}
        </p>
        <h2 className="mt-2 font-heading text-2xl text-brand-purple sm:text-3xl">
          {movingDistanceHub.title}
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-purple/85">
          {movingDistanceHub.description}
        </p>

        <StaggerChildren className="mt-8 grid gap-4 sm:grid-cols-3">
          {movingDistanceServices.map((item, idx) => {
            const Icon = movingIcons[idx] ?? MapPin;
            return (
              <StaggerItem key={item.slug}>
                <Link
                  href={clusterItemPath(movingDistanceHub.path, item)}
                  className="card-interactive group flex h-full flex-col rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-sm sm:p-6"
                >
                  <div className="inline-flex w-fit rounded-xl bg-brand-purple/10 p-3 text-brand-purple transition group-hover:bg-brand-yellow/40">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg text-brand-purple group-hover:underline sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-purple/78">
                    {item.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand-purple/55 group-hover:text-brand-purple">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </SectionReveal>
  );
}
