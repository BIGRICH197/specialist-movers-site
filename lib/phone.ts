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
 * The rule is DIGIT COUNT, not format. NZ numbers arrive as 021 234 5678,
 * +64 21 234 5678, 09-123 4567, (09) 1234567 and every other spacing a human
 * invents; the only useful question is whether there are enough digits to
 * dial. Seven is the shortest dialable local landline (NZ mobiles are 9-10).
 *
 * The mirror of this rule lives in the automation repo at utils.clean_phone,
 * which guards the same field on the Matthew/email and JotForm intake paths.
 * Keep the two in step.
 */

/** Minimum digits for a dialable NZ number — a 7-digit local landline. */
export const MIN_PHONE_DIGITS = 7;

/** True when `value` holds enough digits to actually ring. */
export function isDialable(value: string | undefined | null): boolean {
  const digits = (value ?? "").replace(/\D/g, "");
  if (digits.length < MIN_PHONE_DIGITS) return false;
  // "0000000" / "1111111111" are filler, not numbers.
  return new Set(digits).size > 1;
}

/** Customer-facing message for a phone box that failed `isDialable`. */
export const PHONE_ERROR = "Please enter a phone number we can reach you on";
