// "Who have you been dealing with?" on the booking forms (Richard, 2026-08-21).
// Most bookings arrive because a salesperson sent the customer the form or has
// been talking with them — this records whose sale it is. The answer becomes
// the HubSpot deal owner (per-salesperson revenue) and rides the n8n payload
// into ShiftMate as crm_jobs.booked_by.
//
// Client-safe on purpose: no env access, ids duplicated from lib/hubspot.ts's
// HUBSPOT_OWNERS so this can be imported by the form component. Matthew has had
// a HubSpot seat since 2026-09-22, so his bookings are owned by him too.

export const BOOKED_BY_NONE = "none";

export const BOOKED_BY_OPTIONS: { value: string; label: string }[] = [
  { value: BOOKED_BY_NONE, label: "No one yet — booking direct" },
  { value: "richard", label: "Richard" },
  { value: "matthew", label: "Matthew" },
  { value: "taine", label: "Taine" },
  { value: "danielle", label: "Danielle" },
];

const OWNER_IDS: Record<string, string> = {
  richard: "78086361",
  taine: "78086404",
  danielle: "159727645",
  matthew: "168528041",
};

/** Normalise a form answer to a team-member key, or undefined ("none"/junk). */
export function normalizeBookedBy(v: string | undefined): string | undefined {
  const key = (v || "").trim().toLowerCase();
  return key && key !== BOOKED_BY_NONE && BOOKED_BY_OPTIONS.some((o) => o.value === key)
    ? key
    : undefined;
}

/** HubSpot owner id for a booked-by answer, if that person has a seat. */
export function bookedByOwnerId(v: string | undefined): string | undefined {
  const key = normalizeBookedBy(v);
  return key ? OWNER_IDS[key] : undefined;
}
