import type { Metadata } from "next";
import { Clock, Moon, Package, Piano, Truck } from "lucide-react";
import { ServiceClusterHub } from "@/components/ServiceClusterHub";
import { PagePhotoMomentStrip } from "@/components/PagePhotoMomentStrip";
import { storageHub, storageServices } from "@/lib/service-clusters";
import { regions } from "@/lib/regions";

export const metadata: Metadata = {
  title: "Moving Storage, Short & Long Term",
  description: `Storage while you move: short-term, long-term, in transit, overnight, and piano storage. ${regions.basesShort}.`,
};

const icons = [Clock, Package, Truck, Moon, Piano] as const;

export default function StorageHubPage() {
  return (
    <>
      <ServiceClusterHub
        eyebrow={storageHub.eyebrow}
        title={storageHub.title}
        description={storageHub.description}
        basePath={storageHub.path}
        items={storageServices}
        icons={[...icons]}
        allServicesHref="/services/moving"
        allServicesLabel="Moving by distance"
      />
      <PagePhotoMomentStrip momentKey="services" />
    </>
  );
}
