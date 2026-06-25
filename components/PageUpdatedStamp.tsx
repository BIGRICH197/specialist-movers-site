type Props = {
  date: string;
  className?: string;
};

/** Visible last-updated line for SEO / AI freshness signals. */
export function PageUpdatedStamp({ date, className }: Props) {
  return (
    <p className={className ?? "text-sm text-brand-purple/60"}>
      Updated: {date}
    </p>
  );
}
