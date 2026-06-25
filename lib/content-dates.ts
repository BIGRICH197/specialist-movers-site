/** Visible “Updated” line on key pages (refresh when copy or SEO changes). */
export const siteContentUpdated = "13 June 2026";

export function formatContentUpdatedDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-NZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
