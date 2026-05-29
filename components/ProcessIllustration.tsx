import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

/**
 * Static cartoons from /public/illustrations , plain img avoids Next image cache issues.
 */
export function ProcessIllustration({ src, alt, className }: Props) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={112}
      height={112}
      loading="lazy"
      decoding="async"
      className={cn("h-full w-full object-contain", className)}
    />
  );
}
