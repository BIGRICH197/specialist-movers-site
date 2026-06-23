import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Simple shared-password gate for the internal quotes list. Sets an httpOnly
// cookie on success. Proper per-user logins (the Taine portal) come later.

export async function POST(request: Request) {
  const form = await request.formData();
  const pw = String(form.get("password") || "");
  const expected = process.env.ADMIN_PASSWORD;
  const dest = new URL("/admin/quotes", request.url);

  if (!expected || pw !== expected) {
    dest.searchParams.set("e", "1");
    return NextResponse.redirect(dest, { status: 303 });
  }

  const res = NextResponse.redirect(dest, { status: 303 });
  res.cookies.set("sm_admin", pw, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
