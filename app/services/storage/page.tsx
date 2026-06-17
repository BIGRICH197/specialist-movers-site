import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { getServiceHeroH1 } from "@/lib/service-hero-h1";
import { Clock, Moon, Package, Piano, Truck } from "lucide-react";
import { ServiceClusterHub } from "@/components/ServiceClusterHub";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { storageHub, storageServices } from "@/lib/service-clusters";
import { regions } from "@/lib/regions";

export const metadata: Metadata = buildPageMetadata({
  title: getServiceHeroH1("storage-hub", "Auckland"),
  description: `Storage while you move: short-term, long-term, in transit, overnight, and piano storage. ${regions.basesShort}. Free quote and callback in 15 minutes.`,
  path: "/services/storage",
});

const icons = [Clock, Package, Truck, Moon, Piano] as const;

export default function StorageHubPage() {
  return (
    <>
      <ServiceClusterHub
        eyebrow={storageHub.eyebrow}
        title={getServiceHeroH1("storage-hub", "Auckland")}
        description={storageHub.description}
        basePath={storageHub.path}
        items={storageServices}
        icons={[...icons]}
        allServicesHref="/services/moving"
        allServicesLabel="Moving by distance"
        hamiltonBaseSlug="storage"
      />
      <PagePhotoMomentStrip momentKey="services" />
    </>
  );
}
