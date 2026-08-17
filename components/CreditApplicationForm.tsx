"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

// Business credit application — clients invoiced on account, payment due the
// 20th of the month following invoice. Submissions post to
// /api/credit-application which hands off to n8n (email to the office).

type Fields = Record<string, string>;

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

const inputCls =
  "mt-1 w-full rounded-lg border-2 border-brand-purple/15 bg-white px-3 py-2.5 text-sm text-brand-purple placeholder:text-brand-purple/35 outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/45";
const labelCls = "block text-sm font-semibold text-brand-purple";
const sectionCls = "rounded-2xl border border-brand-purple/10 bg-white p-5 shadow-sm sm:p-6";

function Field({
  name,
  label,
  fields,
  set,
  required = true,
  type = "text",
  placeholder,
}: {
  name: string;
  label: string;
  fields: Fields;
  set: (k: string, v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className={labelCls}>
      {label}
      {!required ? <span className="font-normal text-brand-purple/50"> (optional)</span> : null}
      <input
        type={type}
        value={fields[name] || ""}
        onChange={(e) => set(name, e.target.value)}
        placeholder={placeholder}
        className={inputCls}
      />
    </label>
  );
}

export function CreditApplicationForm() {
  const [fields, setFields] = useState<Fields>({});
  const [agree, setAgree] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [missing, setMissing] = useState<string[]>([]);

  const set = (k: string, v: string) => setFields((p) => ({ ...p, [k]: v }));

  async function submit() {
    if (state === "sending") return;
    const miss = REQUIRED.filter((k) => !fields[k]?.trim());
    setMissing(miss);
    if (miss.length || !agree) return;
    setState("sending");
    try {
      const res = await fetch("/api/credit-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className={`${sectionCls} text-center`}>
        <h2 className="font-heading text-xl text-brand-purple">Application received</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-purple/75">
          Thanks — we have your credit application. We will review it and come back to you within two
          business days. If anything needs clarifying we will call your accounts contact.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
      className="space-y-6"
    >
      <section className={sectionCls}>
        <h2 className="font-heading text-lg text-brand-purple">Business details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field name="legalName" label="Legal / registered company name" fields={fields} set={set} />
          <Field name="tradingName" label="Trading name" fields={fields} set={set} />
          <Field name="nzbn" label="NZBN or company number" fields={fields} set={set} />
          <Field name="gstNumber" label="GST number" fields={fields} set={set} required={false} />
          <Field
            name="businessType"
            label="Type of business"
            fields={fields}
            set={set}
            placeholder="e.g. Property management, law firm, retailer"
          />
          <Field name="yearsTrading" label="Years trading" fields={fields} set={set} required={false} />
          <Field name="website" label="Website" fields={fields} set={set} required={false} />
        </div>
        <div className="mt-4 grid gap-4">
          <Field name="physicalAddress" label="Physical / registered address" fields={fields} set={set} />
          <Field
            name="postalAddress"
            label="Postal address (if different)"
            fields={fields}
            set={set}
            required={false}
          />
        </div>
      </section>

      <section className={sectionCls}>
        <h2 className="font-heading text-lg text-brand-purple">Contacts</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field name="directorName" label="Director / owner name" fields={fields} set={set} />
          <Field name="directorEmail" label="Director / owner email" fields={fields} set={set} type="email" />
          <Field name="directorPhone" label="Director / owner phone" fields={fields} set={set} required={false} type="tel" />
          <Field name="accountsName" label="Accounts payable contact" fields={fields} set={set} />
          <Field name="accountsEmail" label="Accounts payable email" fields={fields} set={set} type="email" />
          <Field name="accountsPhone" label="Accounts payable phone" fields={fields} set={set} type="tel" />
        </div>
      </section>

      <section className={sectionCls}>
        <h2 className="font-heading text-lg text-brand-purple">Account details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field
            name="estimatedMonthlySpend"
            label="Estimated monthly spend"
            fields={fields}
            set={set}
            placeholder="e.g. $2,000 - $5,000"
          />
          <Field
            name="servicesNeeded"
            label="Services you expect to use"
            fields={fields}
            set={set}
            required={false}
            placeholder="e.g. Office moves, storage, deliveries"
          />
        </div>
      </section>

      <section className={sectionCls}>
        <h2 className="font-heading text-lg text-brand-purple">Trade references</h2>
        <p className="mt-1 text-sm text-brand-purple/70">
          Two suppliers who currently give you credit. One is fine if you only have one.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field name="ref1Name" label="Reference 1 — business name" fields={fields} set={set} />
          <Field name="ref1Contact" label="Reference 1 — contact phone or email" fields={fields} set={set} />
          <Field name="ref2Name" label="Reference 2 — business name" fields={fields} set={set} required={false} />
          <Field
            name="ref2Contact"
            label="Reference 2 — contact phone or email"
            fields={fields}
            set={set}
            required={false}
          />
        </div>
      </section>

      <section className={sectionCls}>
        <h2 className="font-heading text-lg text-brand-purple">Terms of trade</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-brand-purple/80">
          <li>
            Invoices are payable in full by the <strong>20th of the month following the date of
            invoice</strong>, without deduction or set-off.
          </li>
          <li>
            Work is charged at the rates quoted or agreed in writing for each job. GST is added to all
            amounts unless stated otherwise.
          </li>
          <li>
            If the account falls overdue, Specialist Movers may charge interest on the overdue balance
            at 2% per month and recover all costs of collection, and may suspend further work on
            account until the balance is cleared.
          </li>
          <li>
            You authorise Specialist Movers to contact the trade references given here and to carry
            out credit checks on the business in connection with this application.
          </li>
          <li>
            The signatory confirms they are authorised to open a credit account on behalf of the
            business, and that the information given here is true and complete.
          </li>
          <li>
            Credit limits and continued account terms are at Specialist Movers&apos; discretion and may
            be reviewed or withdrawn on written notice. Our standard{" "}
            <a href="/policies" target="_blank" rel="noreferrer" className="font-semibold underline">
              terms and conditions
            </a>{" "}
            apply to all work.
          </li>
        </ul>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Field name="signatoryName" label="Full name (signatory)" fields={fields} set={set} />
          <Field name="signatoryPosition" label="Position" fields={fields} set={set} placeholder="e.g. Director" />
        </div>
        <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-3 text-sm text-brand-purple">
          <input type="checkbox" className="mt-1" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
          <span>
            I have read and agree to the terms of trade above, and I am authorised to sign this
            application on behalf of the business. Typing my name above acts as my signature.
          </span>
        </label>
      </section>

      {missing.length > 0 ? (
        <p className="text-sm font-medium text-red-600">
          Please fill in every required field ({missing.length} missing).
        </p>
      ) : null}
      {!agree && missing.length === 0 && state !== "idle" ? (
        <p className="text-sm font-medium text-red-600">Please tick the agreement to submit.</p>
      ) : null}
      {state === "error" ? (
        <p className="text-sm font-medium text-red-600">
          Something went wrong sending your application. Please try again, or email it to
          richard@specialistmovers.co.nz.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={state === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-purple px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-brand-purple/90 disabled:opacity-50 sm:w-auto sm:px-10"
      >
        {state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
        {state === "sending" ? "Sending…" : "Submit application"}
      </button>
    </form>
  );
}
