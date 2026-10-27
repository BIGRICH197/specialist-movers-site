// Customer photo uploads (our own Lexos). Server-only: uses the service role.
//
// The customer's browser never holds a Supabase key. The website creates a
// crm_photo_submissions row, then signs ONE upload URL per photo for a path it
// chooses (customer/<submission id>/...), and the browser PUTs the photo
// straight into the private quote-photos bucket with that URL. On "done" the
// website lists the folder, so the row records only photos that really arrived.
// ShiftMate picks the row up on Quotes -> Customer photos.

import { sb } from "@/lib/supabase";

export const BUCKET = "quote-photos";
/** Plenty for a big house walked room by room, cupboards open. */
export const MAX_PHOTOS = 150;
/** An upload session stays open this long after the customer starts. */
const SESSION_HOURS = 12;
export const PHOTO_EXTS = ["jpg", "jpeg", "png", "webp", "heic", "heif"];

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type Submission = {
  id: string;
  name: string;
  email: string;
  bedrooms: number | null;
  status: string;
  upload_secret: string;
  created_at: string;
};

function storage(): { url: string; key: string } {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error("Supabase not configured");
  return { url: url.replace(/\/$/, ""), key };
}

export function folderOf(id: string): string {
  return `customer/${id}`;
}

export async function createSubmission(v: { name: string; email: string; bedrooms: number }) {
  const secret = `${crypto.randomUUID()}${crypto.randomUUID()}`.replace(/-/g, "");
  const rows = await sb<Submission[]>("crm_photo_submissions", {
    method: "POST",
    body: { name: v.name, email: v.email, bedrooms: v.bedrooms, upload_secret: secret },
  });
  return { id: rows[0].id, secret };
}

/** The row, if the id and secret match and the session is still open. */
export async function openSubmission(id: unknown, secret: unknown): Promise<Submission | null> {
  if (typeof id !== "string" || !UUID.test(id) || typeof secret !== "string" || !secret) return null;
  const rows = await sb<Submission[]>(
    `crm_photo_submissions?id=eq.${id}&select=id,name,email,bedrooms,status,upload_secret,created_at`,
  );
  const row = rows[0];
  if (!row || row.upload_secret !== secret) return null;
  // "new" stays open too: a customer can come back and add photos they missed.
  if (row.status !== "uploading" && row.status !== "new") return null;
  if (Date.now() - new Date(row.created_at).getTime() > SESSION_HOURS * 3600_000) return null;
  return row;
}

/** Objects already in the submission's folder, oldest name first. */
export async function listPhotos(id: string): Promise<{ name: string; size: number }[]> {
  const { url, key } = storage();
  const res = await fetch(`${url}/storage/v1/object/list/${BUCKET}`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prefix: folderOf(id), limit: 1000, sortBy: { column: "name", order: "asc" } }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Storage list ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const items = (await res.json()) as { name: string; id: string | null; metadata?: { size?: number } }[];
  // Folders come back with a null id; only files count.
  return items.filter((o) => o.id).map((o) => ({ name: o.name, size: o.metadata?.size ?? 0 }));
}

/** A one-off URL the browser PUTs one photo to. Valid for two hours. */
export async function signUpload(path: string): Promise<string> {
  const { url, key } = storage();
  const res = await fetch(`${url}/storage/v1/object/upload/sign/${BUCKET}/${path}`, {
    method: "POST",
    headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: "{}",
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Storage sign ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const j = (await res.json()) as { url: string };
  return `${url}/storage/v1${j.url}`;
}

/** Record what arrived. With `final` the row is handed to the team ("new");
 *  without, it is a progress save after each batch, so photos from a customer
 *  who never presses Send still show up in ShiftMate. Returns the count. */
export async function recordPhotos(id: string, final: boolean): Promise<number> {
  const files = await listPhotos(id);
  const photos = files.map((f, i) => ({ path: `${folderOf(id)}/${f.name}`, name: f.name, seq: i + 1 }));
  if (final && !photos.length) return 0;
  await sb(`crm_photo_submissions?id=eq.${id}`, {
    method: "PATCH",
    body: final ? { photos, status: "new", submitted_at: new Date().toISOString() } : { photos },
  });
  return photos.length;
}
