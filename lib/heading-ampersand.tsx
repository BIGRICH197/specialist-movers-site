import { Fragment, type CSSProperties, type ReactNode } from "react";

/** Termina glyphs that read better in a neutral sans inside headings. */
const HEADING_PUNCT_SPLIT = /([&?!])/g;

const PLAIN_PUNCT = new Set(["&", "?", "!"]);

/** Must beat next/font Termina inheritance on nested spans. */
export const HEADING_PUNCT_STYLE: CSSProperties = {
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontWeight: 700,
  fontStyle: "normal",
  lineHeight: 1,
  verticalAlign: "baseline",
};

export const HEADING_PUNCT_CLASS = "heading-punct";

/**
 * Render selected punctuation in system sans — Termina's &, ?, and ! are logo-style.
 */
export function formatHeadingText(
  text: string,
  punctClassName = HEADING_PUNCT_CLASS,
): ReactNode {
  const parts = text.split(HEADING_PUNCT_SPLIT);
  if (parts.length === 1) return text;

  return parts.map((part, index) =>
    PLAIN_PUNCT.has(part) ? (
      <span
        key={index}
        className={punctClassName}
        data-heading-punct={part}
        style={HEADING_PUNCT_STYLE}
      >
        {part}
      </span>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}
/** @deprecated Use formatHeadingText */
export const withPlainAmpersand = formatHeadingText;
