import { PageUpdatedStamp } from "@/components/PageUpdatedStamp";
import { siteContentUpdated } from "@/lib/content-dates";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export function ServiceContentUpdated({ className }: Props) {
  return (
    <PageUpdatedStamp
      date={siteContentUpdated}
      className={cn("text-sm text-brand-purple/55", className)}
    />
  );
}
