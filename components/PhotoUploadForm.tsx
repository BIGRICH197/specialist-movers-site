"use client";

// /photos: the customer sends photos of their place so we can quote from them.
// Name, email, bedrooms, then photos. Each photo is shrunk in the browser the
// same way ShiftMate shrinks staff uploads (1600px, q0.82), then PUT straight
// into storage with a URL the website signs. See app/api/photos/route.ts.

import { useEffect, useRef, useState } from "react";
import { compressImage } from "@/lib/image-compress";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

const labelCls = "block text-sm font-semibold text-brand-purple";
const inputCls =
  "mt-1.5 w-full rounded-lg border border-brand-purple/20 bg-white px-3 py-2.5 text-sm text-brand-purple outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple";
const buttonCls =
  "w-full rounded-full px-6 py-3.5 text-base font-bold text-white shadow-lg transition bg-brand-purple hover:bg-brand-purple/90 disabled:bg-brand-purple/50";

const SESSION_KEY = "sm-photos-session";
const PARALLEL = 3;
const MAX_BYTES = 15 * 1024 * 1024; // the bucket's limit

type Session = { id: string; secret: string; name: string; seq: number; done: number };

async function api<T>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch("/api/photos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const j = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string } & T;
  if (!res.ok || !j.ok) throw new Error(j.error || "Something went wrong. Please try again.");
  return j;
}

function extOf(file: File): string {
  if (file.type === "image/webp") return "webp";
  if (file.type === "image/png") return "png";
  if (/heic|heif/i.test(file.type)) return "heic";
  const e = (file.name.split(".").pop() || "").toLowerCase();
  if (["jpg", "jpeg", "png", "webp", "heic", "heif"].includes(e)) return e === "jpeg" ? "jpg" : e;
  return "jpg";
}

function contentType(ext: string): string {
  return ext === "png" ? "image/png" : ext === "webp" ? "image/webp" : ext === "heic" || ext === "heif" ? "image/heic" : "image/jpeg";
}

function isPhoto(f: File): boolean {
  return /^image\//.test(f.type) || /\.(jpe?g|png|webp|heic|heif)$/i.test(f.name);
}

function save(s: Session | null) {
  try {
    if (s) sessionStorage.setItem(SESSION_KEY, JSON.stringify(s));
    else sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* private mode: the page still works, it just can't resume after a reload */
  }
}

export function PhotoUploadForm() {
  const [step, setStep] = useState<"details" | "photos" | "sent">("details");
  const [f, setF] = useState({ name: "", email: "", bedrooms: "", website: "" });
  const [session, setSession] = useState<Session | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [queue, setQueue] = useState({ total: 0, done: 0 });
  const [failed, setFailed] = useState<string[]>([]);
  const [sentCount, setSentCount] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const sessionRef = useRef<Session | null>(null);

  // A phone can reload the tab while the photo picker is open (low memory).
  // Pick up where they left off rather than making them start again.
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const s = JSON.parse(raw) as Session;
        sessionRef.current = s;
        setSession(s);
        setStep("photos");
      }
    } catch {
      /* ignore */
    }
  }, []);

  function update(s: Session) {
    sessionRef.current = s;
    setSession(s);
    save(s);
  }

  async function start(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      const r = await api<{ id: string; secret: string }>({
        action: "start",
        name: f.name,
        email: f.email,
        bedrooms: Number(f.bedrooms),
        website: f.website,
      });
      update({ id: r.id, secret: r.secret, name: f.name.trim().split(/\s+/)[0], seq: 0, done: 0 });
      setStep("photos");
    } catch (e2) {
      setErr((e2 as Error).message);
    } finally {
      setBusy(false);
    }
  }

  async function uploadOne(file: File): Promise<void> {
    const small = await compressImage(file, { maxDim: 1600, quality: 0.82 });
    if (small.size > MAX_BYTES) throw new Error("too large");
    const ext = extOf(small);
    // Read the session fresh and claim the next number with no await in
    // between, so parallel uploads never share one.
    const s = sessionRef.current;
    if (!s) throw new Error("no session");
    const seq = s.seq + 1;
    update({ ...s, seq });
    const { url } = await api<{ url: string }>({ action: "sign", id: s.id, secret: s.secret, seq, ext });
    const put = await fetch(url, { method: "PUT", headers: { "Content-Type": contentType(ext) }, body: small });
    if (!put.ok) throw new Error(`upload ${put.status}`);
    const cur = sessionRef.current!;
    update({ ...cur, done: cur.done + 1 });
  }

  async function addFiles(list: File[]) {
    const files = list.filter(isPhoto);
    if (!files.length) {
      setErr("Those didn't look like photos.");
      return;
    }
    setErr(null);
    setFailed([]);
    setBusy(true);
    setQueue({ total: files.length, done: 0 });
    const bad: string[] = [];
    let next = 0;
    async function worker() {
      while (next < files.length) {
        const file = files[next++];
        try {
          await uploadOne(file);
        } catch (e) {
          // One retry covers a dropped connection on a phone.
          try {
            await uploadOne(file);
          } catch (e2) {
            const msg = (e2 as Error).message || (e as Error).message;
            if (/limit|expired/i.test(msg)) setErr(msg);
            bad.push(file.name);
          }
        }
        setQueue((q) => ({ ...q, done: q.done + 1 }));
      }
    }
    await Promise.all(Array.from({ length: Math.min(PARALLEL, files.length) }, worker));
    const s = sessionRef.current;
    if (s) void api({ action: "sync", id: s.id, secret: s.secret }).catch(() => {});
    setFailed(bad);
    setBusy(false);
  }

  async function send() {
    const s = sessionRef.current;
    if (!s) return;
    setErr(null);
    setBusy(true);
    try {
      const r = await api<{ count: number }>({ action: "finish", id: s.id, secret: s.secret });
      setSentCount(r.count);
      save(null);
      setStep("sent");
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(false);
    }
  }

  function startOver() {
    save(null);
    sessionRef.current = null;
    setSession(null);
    setStep("details");
  }

  if (step === "sent") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-brand-canvas px-6 text-center text-brand-purple">
        <h1 className="font-heading text-2xl sm:text-3xl">Thanks, we&apos;ve got them</h1>
        <p className="mt-3 max-w-md text-brand-purple/75">
          {sentCount} photo{sentCount === 1 ? "" : "s"} received. We&apos;ll go through them and email your quote soon.
        </p>
        <p className="mt-6 text-sm text-brand-purple/60">
          Questions? Call us on{" "}
          <a href={`tel:${phoneNumber}`} className="font-semibold underline underline-offset-2">
            {phoneDisplay}
          </a>
          .
        </p>
      </main>
    );
  }

  const uploading = busy && queue.total > 0 && queue.done < queue.total;

  return (
    <main className="min-h-screen bg-brand-canvas px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        {step === "details" ? (
          <form onSubmit={start}>
            <h1 className="font-heading text-2xl text-brand-purple sm:text-3xl">Send us your photos</h1>
            <p className="mt-2 text-sm text-brand-purple/70">
              A few photos of your place and we can put together an accurate quote, no visit needed. Takes about ten
              minutes.
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <label className={labelCls} htmlFor="ph-name">Your name</label>
                <input id="ph-name" className={inputCls} required autoComplete="name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
              </div>
              <div>
                <label className={labelCls} htmlFor="ph-email">Email</label>
                <input id="ph-email" className={inputCls} type="email" required autoComplete="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
              </div>
              <div>
                <label className={labelCls} htmlFor="ph-beds">Bedrooms</label>
                <select id="ph-beds" className={inputCls} required value={f.bedrooms} onChange={(e) => setF({ ...f, bedrooms: e.target.value })}>
                  <option value="" disabled>Choose…</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                  <option value={6}>6 or more</option>
                </select>
              </div>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
                value={f.website}
                onChange={(e) => setF({ ...f, website: e.target.value })}
              />
            </div>
            {err && <p className="mt-4 text-sm font-semibold text-red-600">{err}</p>}
            <button type="submit" disabled={busy} className={`mt-6 ${buttonCls}`}>
              {busy ? "One moment…" : "Next: add photos"}
            </button>
          </form>
        ) : (
          <div>
            <h1 className="font-heading text-2xl text-brand-purple sm:text-3xl">
              {session?.name ? `Over to you, ${session.name}` : "Add your photos"}
            </h1>
            <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-brand-purple/80">
              <li>Go room by room. Stand in the doorway and get each wall.</li>
              <li>
                <b>Open the wardrobes, kitchen cupboards, pantry and linen cupboard</b> and take a photo inside. We can only
                count what we can see.
              </li>
              <li>Don&apos;t forget the garage, shed, deck and anything outside that&apos;s coming.</li>
              <li>A 3-bedroom house is usually 30 to 60 photos. You can add them in a few goes.</li>
            </ul>

            <button
              type="button"
              disabled={uploading}
              onClick={() => fileRef.current?.click()}
              className="mt-6 block w-full rounded-2xl border-2 border-dashed border-brand-purple/30 px-4 py-8 text-center text-brand-purple transition hover:border-brand-purple hover:bg-brand-canvas disabled:opacity-60"
            >
              <span className="font-heading text-lg">{session?.done ? "Add more photos" : "Choose photos"}</span>
              <span className="mt-1 block text-sm text-brand-purple/60">From your camera roll or computer</span>
            </button>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*,.heic,.heif"
              className="hidden"
              onChange={(e) => {
                void addFiles(Array.from(e.target.files ?? []));
                e.target.value = "";
              }}
            />

            {uploading && (
              <div className="mt-4">
                <div className="h-2 overflow-hidden rounded-full bg-brand-purple/10">
                  <div className="h-full bg-brand-purple transition-all" style={{ width: `${Math.round((queue.done / queue.total) * 100)}%` }} />
                </div>
                <p className="mt-1.5 text-sm text-brand-purple/70">
                  Uploading {queue.done} of {queue.total}… keep this page open.
                </p>
              </div>
            )}
            {!uploading && !!session?.done && (
              <p className="mt-4 text-sm font-semibold text-brand-purple">
                {session.done} photo{session.done === 1 ? "" : "s"} uploaded.
              </p>
            )}
            {failed.length > 0 && (
              <p className="mt-2 text-sm text-red-600">
                {failed.length} didn&apos;t upload. Try adding {failed.length === 1 ? "it" : "them"} again.
              </p>
            )}
            {err && <p className="mt-2 text-sm font-semibold text-red-600">{err}</p>}

            <button type="button" disabled={busy || !session?.done} onClick={() => void send()} className={`mt-6 ${buttonCls}`}>
              {busy && !uploading ? "Sending…" : "I'm done, send my photos"}
            </button>
            <button type="button" onClick={startOver} className="mt-3 block w-full text-center text-xs text-brand-purple/50 underline">
              Not you? Start again
            </button>
          </div>
        )}
        <p className="mt-8 text-center text-sm text-brand-purple/60">
          Rather talk? Call us on{" "}
          <a href={`tel:${phoneNumber}`} className="font-semibold underline underline-offset-2">
            {phoneDisplay}
          </a>
          .
        </p>
      </div>
    </main>
  );
}
