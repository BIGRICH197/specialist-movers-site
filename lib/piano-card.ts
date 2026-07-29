// Create a Trello job card for a piano / large-item book-in. Mirrors the proven
// n8n "B-Piano" card logic (same list, custom fields, HERE-geocoded suburbs) so
// piano bookings land on the board exactly like the JotForm ones did.
//
// Trello + HERE creds come from env (TRELLO_KEY, TRELLO_TOKEN, HERE_KEY).

const LIST = "64db0757d82a3d39af98b850";
const CF = {
  name: "660f4c5acd51c73f58fa41b5",
  email: "660f963e2604972308375651",
  date: "656ab0c30354dfccd303fbac",
  pickup: "67a03291fe80053a01ed4c5d",
  dropoff: "695b2d115ca4436684820902",
  movers: "69df421bac122b18b1aefe79",
  movetype: "65e16210fc9a7770350ce4af",
  billto: "69dc837dc84357b52a699f22",
  stairs: "69c47ec065c30310512346a3",
};
const PIANO_OPT = "65e16210fc9a7770350ce4b1";
const CASH = "69df33c4ce4e7d7490337d22";

const firstNameOf = (full: string) => (full || "").trim().split(" ")[0] || "";

function isoOf(s: string): string {
  const t = String(s).trim();
  const pad = (n: number) => String(n).padStart(2, "0");
  let m = t.match(/(\d{4})-(\d{1,2})-(\d{1,2})/); // YYYY-MM-DD
  if (m) return `${m[1]}-${pad(+m[2])}-${pad(+m[3])}T00:00:00.000Z`;
  m = t.match(/^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})$/); // DD/MM/YYYY (NZ)
  if (m) return `${m[3]}-${pad(+m[2])}-${pad(+m[1])}T00:00:00.000Z`;
  return "";
}

async function geocodeSuburb(street: string, hereKey: string): Promise<string> {
  if (!street || !hereKey) return "";
  try {
    const url = `https://geocode.search.hereapi.com/v1/geocode?apiKey=${hereKey}&in=countryCode:NZL&q=${encodeURIComponent(street)}`;
    const res = await fetch(url);
    const d = (await res.json()) as { items?: { address?: { district?: string } }[] };
    return d.items?.[0]?.address?.district || "";
  } catch {
    return "";
  }
}

export type PianoBooking = {
  fullName?: string;
  email?: string;
  phone?: string;
  dropoffPhone?: string;
  moveDate?: string;
  pianoType?: string;
  pickupAddress?: string;
  dropoffAddress?: string;
  stairs?: string;
  anythingElse?: string;
};

export async function createPianoCard(
  b: PianoBooking,
): Promise<{ cardId: string; cardUrl: string } | { error: string }> {
  const KEY = process.env.TRELLO_KEY;
  const TOKEN = process.env.TRELLO_TOKEN;
  const HERE = process.env.HERE_KEY || "";
  if (!KEY || !TOKEN) return { error: "Trello creds not configured" };

  const tq = `key=${KEY}&token=${TOKEN}`;
  const stairs = b.stairs || "";
  const fullName = b.fullName || "";
  const iso = isoOf(b.moveDate || "");
  const ddmmyyyy = iso
    ? `${iso.slice(8, 10)}-${iso.slice(5, 7)}-${iso.slice(0, 4)}`
    : b.moveDate || "";
  const pSub = await geocodeSuburb(b.pickupAddress || "", HERE);
  const dSub = await geocodeSuburb(b.dropoffAddress || "", HERE);

  const cardName = `${b.pianoType || "Piano"} Stairs?${stairs}`;
  const desc = [
    "### Date",
    ddmmyyyy,
    "### Name",
    firstNameOf(fullName),
    "### Pick up phone number",
    b.phone || "",
    "### Pick up address?",
    b.pickupAddress || "",
    "### Drop off address?",
    b.dropoffAddress || "",
    "",
    "###Drop off contact number",
    b.dropoffPhone || "",
    "###Are there any stairs?",
    stairs,
    "##Anything else we should know",
    b.anythingElse || "",
  ].join("\n");

  const cardBody: Record<string, string> = { idList: LIST, name: cardName, desc };
  if (iso) cardBody.due = iso;
  const cardRes = await fetch(`https://api.trello.com/1/cards?${tq}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cardBody),
  });
  const card = (await cardRes.json()) as { id?: string; shortUrl?: string };
  if (!card.id) return { error: "Trello card create failed" };
  const cid = card.id;

  const put = (fid: string, value: unknown) =>
    fetch(`https://api.trello.com/1/card/${cid}/customField/${fid}/item?${tq}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    }).catch(() => undefined);

  const fn = firstNameOf(fullName);
  if (fn) await put(CF.name, { value: { text: fn } });
  if (b.email) await put(CF.email, { value: { text: b.email } });
  if (iso) await put(CF.date, { value: { date: iso } });
  if (pSub) await put(CF.pickup, { value: { text: pSub } });
  if (dSub) await put(CF.dropoff, { value: { text: dSub } });
  await put(CF.movers, { value: { number: "3" } });
  await put(CF.movetype, { idValue: PIANO_OPT });
  await put(CF.billto, { idValue: CASH });
  if (/\byes\b/i.test(stairs)) await put(CF.stairs, { value: { checked: "true" } });

  return { cardId: cid, cardUrl: card.shortUrl || `https://trello.com/c/${cid}` };
}
