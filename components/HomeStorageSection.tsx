import Link from "next/link";
import { ArrowRight, Clock, Moon, Package, Piano, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { SectionReveal } from "@/components/SectionReveal";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import {
  clusterItemPath,
  storageHub,
  storageServices,
  type ServiceClusterItem,
} from "@/lib/service-clusters";
import { sectionRevealDirection } from "@/lib/motion";
import { cn } from "@/lib/utils";

const storageIcons: Record<string, LucideIcon> = {
  "short-term-storage": Clock,
  "long-term-storage": Package,
  "storage-in-transit": Truck,
  "overnight-storage": Moon,
  "piano-storage": Piano,
};

function StorageOptionCard({ item, icon: Icon }: { item: ServiceClusterItem; icon: LucideIcon }) {
  const href = clusterItemPath(storageHub.path, item);

  return (
    <Link
      href={href}
      className="card-interactive group flex h-full flex-col rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="inline-flex w-fit rounded-xl bg-brand-purple/10 p-3 text-brand-purple transition group-hover:bg-brand-yellow/40">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="mt-4 font-heading text-lg text-brand-purple group-hover:underline sm:text-xl">
        {item.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-purple/78">{item.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand-purple/55 group-hover:text-brand-purple">
        Learn more
        <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/** Flexible storage — directly after local / regional / international moves. */
export function HomeStorageSection() {
  return (
    <SectionReveal
      direction={sectionRevealDirection(5)}
      className="relative overflow-hidden border-t border-brand-purple/10 bg-brand-surface py-14 sm:py-16"
    >
      <BrandLogomarkWatermark
        mark="purple"
        position="top-right"
        size={220}
        opacity={0.05}
      />

      <div className="relative z-[1] mx-auto max-w-7xl container-px">
        <div className="max-w-3xl">
          <p className="inline-block rounded-md bg-brand-yellow/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-purple">
            {storageHub.eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-2xl text-brand-purple sm:text-3xl">
            {storageHub.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-purple/85">
            {storageHub.description}
          </p>
        </div>

        <StaggerChildren className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {storageServices.map((item, index) => {
            const Icon = storageIcons[item.slug] ?? Package;
            const centeredSecondRow =
              index === 3 ? "lg:col-start-2" : index === 4 ? "lg:col-start-4" : "";
            return (
              <StaggerItem key={item.slug} className={cn("lg:col-span-2", centeredSecondRow)}>
                <StorageOptionCard item={item} icon={Icon} />
              </StaggerItem>
            );
          })}
        </StaggerChildren>

        <p className="mt-8">
          <Link
            href={storageHub.path}
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand-purple hover:underline"
          >
            View all storage options
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </SectionReveal>
  );
}
