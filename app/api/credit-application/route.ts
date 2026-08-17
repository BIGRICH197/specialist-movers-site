import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Business credit application submissions. Hands off to n8n, which emails
// Richard the full details. No Slack, no ShiftMate — email only.

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

  // Hand off to n8n → email to Richard. This is the only delivery channel, so
  // a failure here must reach the customer as an error, not a silent ok.
  const webhook = process.env.CREDIT_APP_WEBHOOK;
  if (!webhook) {
    console.error("credit-application: CREDIT_APP_WEBHOOK not configured");
    return NextResponse.json(
      { ok: false, error: "not configured" },
      { status: 503 },
    );
  }
  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submittedAt: new Date().toISOString(),
        fields,
      }),
    });
    if (!res.ok) throw new Error(`webhook responded ${res.status}`);
  } catch (err) {
    console.error("credit-application webhook failed:", err);
    return NextResponse.json({ ok: false, error: "delivery failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
