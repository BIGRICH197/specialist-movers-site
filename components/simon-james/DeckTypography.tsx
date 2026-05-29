import { cn } from "@/lib/utils";

type Tone = "purple" | "light";

function useTone(tone: Tone) {
  return tone === "purple";
}

export function DeckEyebrow({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const onPurple = useTone(tone);
  return (
    <p
      className={cn(
        "inline-flex max-w-full rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider",
        onPurple
          ? "border-white/20 bg-white/10 text-brand-yellow"
          : "border-brand-purple/15 bg-white/90 text-brand-purple",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function DeckTitle({
  children,
  tone = "light",
  as: Tag = "h2",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  as?: "h1" | "h2";
  className?: string;
}) {
  const onPurple = useTone(tone);
  return (
    <Tag
      className={cn(
        "deck-title font-heading leading-tight",
        Tag === "h1" ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-3xl lg:text-4xl",
        onPurple ? "text-brand-yellow" : "text-brand-purple",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function DeckLead({
  children,
  tone = "light",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const onPurple = useTone(tone);
  return (
    <p
      className={cn(
        "deck-lead text-base leading-relaxed sm:text-lg",
        onPurple ? "text-white/88" : "text-brand-purple/85",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function DeckRule({ tone = "light" }: { tone?: Tone }) {
  return (
    <div
      className={cn(
        "deck-rule my-5 h-px w-12 sm:my-6",
        tone === "purple" ? "bg-brand-yellow" : "bg-brand-purple",
      )}
      aria-hidden
    />
  );
}
