/**
 * Used for canonical URLs, Open Graph, and JSON-LD. Override in production with
 * NEXT_PUBLIC_SITE_URL (e.g. https://www.specialistmovers.co.nz).
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.specialistmovers.co.nz";

export const siteName = "Specialist Movers NZ";
