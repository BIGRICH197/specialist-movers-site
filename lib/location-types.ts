export type LocationGroup = "auckland" | "waikato";

export type LocationKind = "region" | "suburb" | "town";

export type Location = {
  slug: string;
  name: string;
  kind: LocationKind;
  group: LocationGroup;
  /** Parent region slug for suburbs; null for regions and towns */
  parentSlug: string | null;
  /** Extra strings for search (aliases, macrons, abbreviations) */
  searchTerms?: readonly string[];
  metaTitle: string;
  metaDescription: string;
  intro: string;
  paragraphs: readonly string[];
  highlights: readonly string[];
};
