import { NextResponse } from "next/server";
import { isEmailish, EMAIL_ERROR } from "@/lib/email";
import { postSlackMessage } from "@/lib/slack";
import { quotesChannel } from "@/lib/quote-notify";
import {
  MAX_PHOTOS,
  PHOTO_EXTS,
  createSubmission,
  folderOf,
  listPhotos,
  openSubmission,
  recordPhotos,
  signUpload,
} from "@/lib/photo-submissions";

export const runtime = "nodejs";

// /photos, the customer photo upload (replaces the Lexos link). Three steps:
//   start  {name, email, bedrooms}        -> {id, secret}
//   sign   {id, secret, seq, ext}         -> {url}  (browser PUTs the photo there)
//   sync   {id, secret}                   -> {count}  (progress save after a batch)
//   finish {id, secret}                   -> {count} and a Slack ping
// See lib/photo-submissions.ts.

function bad(error: string, status = 400) {
  return NextResponse.json({ ok: false, error }, { status });
}

async function ping(name: string, email: string, bedrooms: number | null, count: number) {
  const channel = (process.env.SLACK_PHOTOS_CHANNEL || "").trim() || quotesChannel();
  if (!channel) return;
  const beds = bedrooms ? `${bedrooms}-bedroom` : "house";
  const text =
    `:camera_with_flash: *${name}* (${email}) sent ${count} photo${count === 1 ? "" : "s"} for a ${beds} move.\n` +
    "Open ShiftMate, Quotes, Customer photos, and press Start quote.";
  const r = await postSlackMessage({ channel, text, username: "Customer photos", iconEmoji: ":camera:" });
  if (!r.ok) console.warn(`photos ping failed (${r.error}) to ${channel}`);
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return bad("invalid JSON");
  }

  try {
    if (body.action === "start") {
      // Bots fill every field; people never see this one.
      if (typeof body.website === "string" && body.website.trim()) {
        return NextResponse.json({ ok: true, id: "00000000-0000-0000-0000-000000000000", secret: "x" });
      }
      const name = String(body.name ?? "").trim().slice(0, 120);
      const email = String(body.email ?? "").trim().slice(0, 200);
      const bedrooms = Number(body.bedrooms);
      if (!name) return bad("Please tell us your name");
      if (!isEmailish(email)) return bad(EMAIL_ERROR);
      if (!Number.isInteger(bedrooms) || bedrooms < 1 || bedrooms > 10) return bad("How many bedrooms?");
      const s = await createSubmission({ name, email, bedrooms });
      return NextResponse.json({ ok: true, ...s });
    }

    const sub = await openSubmission(body.id, body.secret);
    if (!sub) return bad("This upload has expired. Please refresh the page and start again.", 403);

    if (body.action === "sign") {
      const seq = Number(body.seq);
      const ext = String(body.ext ?? "").toLowerCase();
      if (!Number.isInteger(seq) || seq < 1 || seq > 999) return bad("bad seq");
      if (!PHOTO_EXTS.includes(ext)) return bad("That file isn't a photo");
      // A cheap guard against a runaway loop; the folder count is the truth.
      if (seq > MAX_PHOTOS * 2 || (seq > MAX_PHOTOS && (await listPhotos(sub.id)).length >= MAX_PHOTOS)) {
        return bad(`That's the limit of ${MAX_PHOTOS} photos. Press Send and we'll take it from there.`);
      }
      const path = `${folderOf(sub.id)}/${String(seq).padStart(3, "0")}_${crypto.randomUUID().slice(0, 8)}.${ext}`;
      return NextResponse.json({ ok: true, url: await signUpload(path) });
    }

    if (body.action === "sync") {
      return NextResponse.json({ ok: true, count: await recordPhotos(sub.id, false) });
    }

    if (body.action === "finish") {
      const first = sub.status === "uploading";
      const count = await recordPhotos(sub.id, true);
      if (!count) return bad("No photos arrived yet. Add some and try again.");
      if (first) await ping(sub.name, sub.email, sub.bedrooms, count);
      return NextResponse.json({ ok: true, count });
    }

    return bad("unknown action");
  } catch (e) {
    console.error("photos api:", e);
    return bad("Something went wrong on our side. Please try again in a minute.", 500);
  }
}
