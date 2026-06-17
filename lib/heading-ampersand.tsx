import { Fragment, type ReactNode } from "react";

/** Termina glyphs that read better in Inter inside headings. */
const HEADING_PUNCT_SPLIT = /([&?!])/g;

const PLAIN_PUNCT = new Set(["&", "?", "!"]);

/** Inter Light — matches the only Inter weight we load (see layout.tsx). */
export const HEADING_PUNCT_CLASS = "heading-punct";

/**
 * Render selected punctuation in Inter — Termina's &, ?, and ! are logo-style.
 */
export function formatHeadingText(
  text: string,
  punctClassName = HEADING_PUNCT_CLASS,
): ReactNode {
  const parts = text.split(HEADING_PUNCT_SPLIT);
  if (parts.length === 1) return text;

  return parts.map((part, index) =>
    PLAIN_PUNCT.has(part) ? (
      <span key={index} className={punctClassName}>
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

/** @deprecated Use formatHeadingText */
export const withPlainAmpersand = formatHeadingText;
