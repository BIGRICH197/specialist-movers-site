import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionReveal } from "@/components/SectionReveal";
import {
  clusterItemPath,
  type ServiceClusterItem,
} from "@/lib/service-clusters";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  basePath: string;
  items: readonly ServiceClusterItem[];
  icons: readonly LucideIcon[];
  allServicesHref?: string;
  allServicesLabel?: string;
};

export function ServiceClusterHub({
  eyebrow,
  title,
  description,
  basePath,
  items,
  icons,
  allServicesHref = "/services",
  allServicesLabel = "All moving services",
}: Props) {
  return (
    <div className="bg-brand-white">
      <PageHero variant="light" eyebrow={eyebrow} title={title} description={description}>
        <a
          href={`tel:${phoneNumber}`}
          className="mt-6 inline-flex font-heading text-xl font-bold text-brand-purple sm:text-2xl"
        >
          {phoneDisplay}
        </a>
      </PageHero>

      <SectionReveal className="mx-auto max-w-7xl py-12 container-px">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => {
            const Icon = icons[idx] ?? icons[0];
            const href = clusterItemPath(basePath, item);
            return (
              <Link
                key={item.slug}
                href={href}
                className="group flex flex-col rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-purple/30 hover:shadow-lg"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h2 className="font-heading text-xl text-brand-purple group-hover:underline">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-brand-purple/78">
                      {item.excerpt}
                    </p>
                  </div>
                  <div className="shrink-0 rounded-xl bg-brand-purple/10 p-3 text-brand-purple transition group-hover:bg-brand-yellow/40">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-brand-purple/55 group-hover:text-brand-purple">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-brand-purple/70">
          <Link
            href={allServicesHref}
            className="font-semibold text-brand-purple underline hover:text-brand-purple/80"
          >
            {allServicesLabel}
          </Link>
          {" · "}
          <Link
            href="/#whats-included"
            className="font-semibold text-brand-purple underline hover:text-brand-purple/80"
          >
            What&apos;s included in every move
          </Link>
        </p>
      </SectionReveal>
    </div>
  );
}
