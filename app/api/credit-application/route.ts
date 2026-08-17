import { NextResponse } from "next/server";
import { pingBookings } from "@/lib/quote-notify";

export const runtime = "nodejs";

// Business credit application submissions. Hands off to n8n (which emails the
// office with the full details) and pings Slack as a safety copy, so an
// application is never silently lost if either channel is down.

type Body = { fields?: Record<string, string> };

const REQUIRED = [
  "legalName",
  "tradingName",
  "nzbn",
  "businessType",
  "physicalAddress",
  "accountsName",
  "accountsEmail",
  "accountsPhone",
  "directorName",
  "directorEmail",
  "estimatedMonthlySpend",
  "ref1Name",
  "ref1Contact",
  "signatoryName",
  "signatoryPosition",
];

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }

  const fields = body.fields || {};
  const missing = REQUIRED.filter((k) => !fields[k]?.trim());
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: "missing required fields", missing },
      { status: 400 },
    );
  }

  // Slack safety copy — the email via n8n is the primary record.
  const summary = [
    `:page_facing_up: *Credit application* — ${fields.tradingName} (${fields.legalName})`,
    `NZBN: ${fields.nzbn}${fields.gstNumber ? `  |  GST: ${fields.gstNumber}` : ""}`,
    `Type: ${fields.businessType}${fields.yearsTrading ? `  |  Trading: ${fields.yearsTrading} yrs` : ""}`,
    `Director: ${fields.directorName} (${fields.directorEmail}${fields.directorPhone ? `, ${fields.directorPhone}` : ""})`,
    `Accounts: ${fields.accountsName} (${fields.accountsEmail}, ${fields.accountsPhone})`,
    `Est. monthly spend: ${fields.estimatedMonthlySpend}`,
    `Signed: ${fields.signatoryName}, ${fields.signatoryPosition}`,
    "_Full details emailed via n8n._",
  ].join("\n");
  await pingBookings(summary);

  // Hand off to n8n → email to the office.
  const webhook = process.env.CREDIT_APP_WEBHOOK;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submittedAt: new Date().toISOString(),
          fields,
        }),
      });
    } catch (err) {
      console.error("credit-application webhook failed:", err);
    }
  } else {
    console.warn("credit-application: CREDIT_APP_WEBHOOK not configured");
  }

  return NextResponse.json({ ok: true });
}
