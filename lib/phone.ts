/**
 * Phone-field validation shared by every form and API route on the site.
 *
 * A phone box must hold a phone number — not a name, not a placeholder. Two
 * live failures on 2026-08-11 drove this, both reported by the ops team on the
 * same day:
 *
 *   1. The hard-to-shift enquiry form had no phone field at all, and
 *      app/api/quote/route.ts filled the gap with the literal string
 *      "Via website". Three leads reached HubSpot that way (deals
 *      340303418057, 340254804717, 339863119592) — the field looked populated,
 *      so nothing flagged it, and every one was a job that needed a phone call
 *      before it could be quoted.
 *
 *   2. Booking-form validation was presence-only, so a surname typed into the
 *      Phone box sailed through. Four ShiftMate contacts ended up carrying a
 *      surname as their phone number (Irene/"Yang", Dermot/"Comar",
 *      Dale/"Daniels", Sukhdev/"000000") — a number the crew cannot ring on
 *      the day. Full name and Phone sit side by side in a two-column grid,
 *      which is how autofill and hurried typing land in the wrong box.
 *
 * The rule is DIGIT COUNT first, not format. NZ numbers arrive as 021 234 5678,
 * +64 21 234 5678, 09-123 4567, (09) 1234567 and every other spacing a human
 * invents; the primary question is whether there are enough digits to dial.
 * Seven is the shortest dialable local landline (NZ mobiles are 9-10).
 *
 * On top of digit count, two NZ-shape rules added 2026-08-21 after leads
 * reached HubSpot with numbers no one could ring:
 *
 *   - "0122658103" (deal 340259320551) — 10 digits, so it passed, but NZ has
 *     no 01x codes. A number starting 0 must continue 2-9.
 *   - "022024000000" (deal 340503799504) — 12 digits. The longest NZ number
 *     is 11 digits (0800 + 7), so 0-prefixed numbers cap at 11. Numbers
 *     without a leading 0 (international, or a local number typed without the
 *     area code) stay permissive up to the ITU max of 15 — overseas customers
 *     booking international moves are real.
 *
 * The mirror of this rule lives in the automation repo at utils.clean_phone,
 * which guards the same field on the Matthew/email and JotForm intake paths.
 * Keep the two in step.
 */

/** Minimum digits for a dialable NZ number — a 7-digit local landline. */
export const MIN_PHONE_DIGITS = 7;

/** True when `value` holds enough digits to actually ring. */
export function isDialable(value: string | undefined | null): boolean {
  let digits = (value ?? "").replace(/\D/g, "");
  // Normalise international NZ forms (+64 / 0064) to the domestic 0-prefix so
  // the NZ shape rules below apply to them too.
  if (digits.startsWith("0064")) digits = `0${digits.slice(4)}`;
  else if (digits.startsWith("64") && digits.length >= 9)
    digits = `0${digits.slice(2)}`;
  if (digits.length < MIN_PHONE_DIGITS) return false;
  // "0000000" / "1111111111" are filler, not numbers.
  if (new Set(digits).size <= 1) return false;
  if (digits.startsWith("0")) {
    // NZ trunk number: no 01x codes exist, and 11 digits is the longest.
    if (digits[1] === "0" || digits[1] === "1") return false;
    if (digits.length > 11) return false;
  } else if (digits.length > 15) {
    // No leading 0: local short form or international — ITU caps at 15.
    return false;
  }
  return true;
}

/** Customer-facing message for a phone box that failed `isDialable`. */
export const PHONE_ERROR = "Please enter a phone number we can reach you on";
