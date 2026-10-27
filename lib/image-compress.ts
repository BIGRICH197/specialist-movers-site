// Copied from ShiftMate (shiftmate-react/src/lib/imageCompress.ts) so customer
// photos are shrunk exactly like the ones staff upload in the quote builder.

// Client-side image compression, run right before any upload so Supabase Storage
// (and our storage bill) doesn't balloon with 5–12 MB phone photos. A raster
// image is decoded, downscaled to fit maxDim, and re-encoded — typically a 10–30×
// size cut with no visible loss at these settings.
//
// Safe by design: anything we can't decode or that wouldn't get smaller is
// returned UNCHANGED, so a file always uploads. EXIF orientation is honoured so
// portrait phone photos aren't rotated after re-encoding.
//
// This runs BEFORE the size cap is applied (ShiftMate: photos.ts photoSizeError), so a
// big photo gets shrunk rather than refused.

export interface CompressOpts {
  /** Longest edge in px after downscaling (aspect ratio kept). */
  maxDim?: number;
  /** Encoder quality 0–1. */
  quality?: number;
}

// Types a canvas can reliably decode + draw. HEIC/HEIF are excluded (most
// browsers can't decode them) — those pass through untouched.
const DECODABLE = ["image/jpeg", "image/png", "image/webp"];

// Encoders to try, smallest-typical first. WebP beats JPEG by ~25%, but Safari
// only gained canvas WebP encoding late — and when a browser doesn't support the
// requested type, toBlob SILENTLY returns PNG, which for a photo is BIGGER than
// the JPEG we started with. That made compression a no-op on those devices
// (photos uploaded at full size, then tripped the 15 MB cap). So we verify the
// encoder actually honoured the type, and fall back to JPEG, which is universal.
const ENCODERS = ["image/webp", "image/jpeg"] as const;

/** Decode to something drawable, preferring createImageBitmap (which applies EXIF
 *  orientation for us) and falling back to an <img>, which older Safari needs. */
async function decode(file: File): Promise<{ src: CanvasImageSource; w: number; h: number; done: () => void } | null> {
  if (typeof createImageBitmap === "function") {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      return { src: bitmap, w: bitmap.width, h: bitmap.height, done: () => bitmap.close?.() };
    } catch {
      /* fall through to the <img> path */
    }
  }
  if (typeof URL?.createObjectURL !== "function" || typeof Image !== "function") return null;
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    // Modern browsers default to image-orientation: from-image, so EXIF is applied.
    img.src = url;
    if (typeof img.decode === "function") {
      await img.decode();
    } else {
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error("decode failed"));
      });
    }
    const w = img.naturalWidth || img.width;
    const h = img.naturalHeight || img.height;
    if (!w || !h) throw new Error("zero-sized image");
    return { src: img, w, h, done: () => URL.revokeObjectURL(url) };
  } catch {
    URL.revokeObjectURL(url);
    return null;
  }
}

function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob | null> {
  return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
}

export async function compressImage(file: File, opts: CompressOpts = {}): Promise<File> {
  const maxDim = opts.maxDim ?? 2000;
  const quality = opts.quality ?? 0.82;

  if (!DECODABLE.includes(file.type)) return file;
  if (typeof document === "undefined") return file;

  try {
    const decoded = await decode(file);
    if (!decoded) return file;

    const { src, w: srcW, h: srcH, done } = decoded;
    try {
      const scale = Math.min(1, maxDim / Math.max(srcW, srcH));
      const w = Math.max(1, Math.round(srcW * scale));
      const h = Math.max(1, Math.round(srcH * scale));

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return file;
      ctx.drawImage(src, 0, 0, w, h);

      let best: { blob: Blob; type: string } | null = null;
      for (const type of ENCODERS) {
        const blob = await toBlob(canvas, type, quality);
        // A browser that can't encode this type quietly hands back PNG — ignore
        // that result rather than shipping something larger than the original.
        if (!blob || blob.type !== type) continue;
        if (!best || blob.size < best.blob.size) best = { blob, type };
      }

      // Keep the original if nothing encoded, or nothing actually saved space
      // (an already-tiny image, or one that re-encodes larger).
      if (!best || best.blob.size >= file.size) return file;

      const ext = best.type === "image/webp" ? "webp" : "jpg";
      const name = file.name.replace(/\.[^.]+$/, "") + "." + ext;
      return new File([best.blob], name, { type: best.type, lastModified: file.lastModified });
    } finally {
      done();
    }
  } catch {
    return file; // undecodable or any canvas error → upload the original
  }
}
