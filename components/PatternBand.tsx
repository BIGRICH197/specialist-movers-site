import { cn } from "@/lib/utils";

type Variant = "circles" | "triangles";

const variantClass: Record<Variant, string> = {
  circles: "playground-roadway-circles",
  triangles: "playground-roadway-triangles",
};

/** Playground only , use on /patterns */
export function PatternBand({
  variant = "triangles",
  dissolve = false,
  className,
}: {
  variant?: Variant;
  /** Triangle band straddles purple→white with downward dissolve */
  dissolve?: boolean;
  className?: string;
}) {
  if (variant === "triangles" && dissolve) {
    return (
      <div className={cn("playground-triangle-straddle", className)} aria-hidden>
        <div className="playground-roadway-triangles" />
      </div>
    );
  }

  return (
    <div
      aria-hidden
      className={cn("block w-full min-w-0 shrink-0", variantClass[variant], className)}
    />
  );
}
