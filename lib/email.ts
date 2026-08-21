/**
 * Email-field validation shared by forms and API routes, the sibling of
 * lib/phone.ts. Same philosophy: keep obvious non-emails out without
 * rejecting anything a real customer might type. Full RFC validation is a
 * losing game — the check is "does this have a mailbox, an @, and a dotted
 * domain", nothing stricter.
 */

/** True when `value` is shaped like a sendable email address. */
export function isEmailish(value: string | undefined | null): boolean {
  const s = (value ?? "").trim();
  // One @, something before it, and a domain with at least one dot whose
  // last label is 2+ letters.
  return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(s);
}

/** Customer-facing message for an email box that failed `isEmailish`. */
export const EMAIL_ERROR = "Please enter a valid email address";
