import { cookies } from "next/headers";
import { listQuotes, type QuoteStatus } from "@/lib/quote-store";
import { supabaseConfigured } from "@/lib/supabase";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Quotes — Admin",
  robots: { index: false, follow: false },
};

const STATUS_STYLE: Record<QuoteStatus, string> = {
  sent: "bg-brand-purple/10 text-brand-purple",
  accepted: "bg-blue-100 text-blue-700",
  callback: "bg-amber-100 text-amber-700",
  booked: "bg-green-100 text-green-700",
};

function siteBase(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.specialistmovers.co.nz").replace(/\/$/, "");
}

function LoginForm({ error }: { error: boolean }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-brand-canvas px-6">
      <form
        action="/api/admin/login"
        method="post"
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm"
      >
        <h1 className="font-heading text-xl text-brand-purple">Quotes admin</h1>
        <p className="mt-1 text-sm text-brand-purple/70">Enter the admin password.</p>
        <input
          type="password"
          name="password"
          autoFocus
          className="mt-4 w-full rounded-lg border border-brand-purple/20 px-3 py-2.5 text-sm outline-none focus:border-brand-purple"
          placeholder="Password"
        />
        {error ? (
          <p className="mt-2 text-sm font-medium text-red-600">Incorrect password.</p>
        ) : null}
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-brand-purple px-6 py-3 text-sm font-bold text-white"
        >
          Sign in
        </button>
      </form>
    </main>
  );
}

export default async function AdminQuotesPage({
  searchParams,
}: {
  searchParams: { e?: string };
}) {
  const expected = process.env.ADMIN_PASSWORD;
  const authed = !!expected && cookies().get("sm_admin")?.value === expected;
  if (!authed) return <LoginForm error={searchParams?.e === "1"} />;

  const quotes = await listQuotes(300);
  const base = siteBase();

  return (
    <main className="min-h-screen bg-brand-canvas px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <div className="flex items-end justify-between">
          <h1 className="font-heading text-2xl text-brand-purple">Quotes</h1>
          <span className="text-sm text-brand-purple/60">{quotes.length} shown</span>
        </div>

        {!supabaseConfigured() ? (
          <p className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-800">
            Supabase is not configured yet, so there is nothing to list. Set
            SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (and run supabase/schema.sql)
            to start tracking quotes here.
          </p>
        ) : quotes.length === 0 ? (
          <p className="mt-4 text-sm text-brand-purple/70">No quotes yet.</p>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-2xl bg-white shadow-sm">
            <table className="w-full min-w-[40rem] text-sm">
              <thead>
                <tr className="border-b border-brand-purple/10 text-left text-brand-purple/60">
                  <th className="px-4 py-3 font-semibold">Client</th>
                  <th className="px-4 py-3 font-semibold">Type</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Created</th>
                  <th className="px-4 py-3 font-semibold">Link</th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => (
                  <tr key={q.token} className="border-b border-brand-purple/8 text-brand-purple">
                    <td className="px-4 py-3">
                      <div className="font-semibold">{q.clientName || "—"}</div>
                      {q.email ? <div className="text-xs text-brand-purple/55">{q.email}</div> : null}
                    </td>
                    <td className="px-4 py-3 capitalize">{q.quoteType || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${STATUS_STYLE[q.status]}`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-brand-purple/70">
                      {new Date(q.createdAt).toLocaleDateString("en-NZ", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`${base}/quote/${q.slug}-${q.token}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-brand-purple underline-offset-2 hover:underline"
                      >
                        Open
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
