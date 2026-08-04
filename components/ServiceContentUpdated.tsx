import { PageUpdatedStamp } from "@/components/PageUpdatedStamp";
import { siteContentUpdated } from "@/lib/content-dates";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  /** Pre-formatted date override. Omit to show the site-wide baseline. */
  date?: string;
};

export function ServiceContentUpdated({ className, date }: Props) {
  return (
    <PageUpdatedStamp
      date={date ?? siteContentUpdated}
      className={cn("text-sm text-brand-purple/55", className)}
    />
  );
}
