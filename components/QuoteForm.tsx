"use client";

import { useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Phone,
  Home,
  Music,
  Loader2,
} from "lucide-react";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { RouteBranchHint } from "@/components/RouteBranchHint";
import { regions } from "@/lib/regions";
import type { JobType } from "@/lib/site-data";

type Props = { className?: string; compact?: boolean };

type QuoteFormProps = Props & {
  defaultJobType?: JobType;
  defaultJobTypes?: JobType[];
  /** Open directly on service picker or callback-only panel */
  initialMode?: Extract<Mode, "choose" | "callback">;
};

type Mode = "choose" | "callback" | "house" | "piano" | "office" | "commercial" | "result";
type Access = "easy" | "hard";
type PianoKind = "upright" | "grand";

interface FormState {
  mode: Mode;
  // House
  bedrooms: number;
  pickupAddress: string;
  dropoffAddress: string;
  pickupAccess: Access;
  dropoffAccess: Access;
  preferredDate: string;
  wantsPacking: boolean;
  wantsCleaning: boolean;
  // Office / commercial (no bedrooms)
  officeSize: string;
  // Piano
  pianoType: PianoKind;
  pickupStairs: number;
  dropoffStairs: number;
  // Contact
  name: string;
  phone: string;
  email: string;
  message: string;
  // State
  loading: boolean;
  result: Record<string, unknown> | null;
  error: string;
  callbackSent: boolean;
}

const initial: FormState = {
  mode: "choose",
  bedrooms: 2,
  pickupAddress: "",
  dropoffAddress: "",
  pickupAccess: "easy",
  dropoffAccess: "easy",
  preferredDate: "",
  wantsPacking: false,
  wantsCleaning: false,
  officeSize: "medium",
  pianoType: "upright",
  pickupStairs: 0,
  dropoffStairs: 0,
  name: "",
  phone: "",
  email: "",
  message: "",
  loading: false,
  result: null,
  error: "",
  callbackSent: false,
};

const field =
  "h-12 w-full rounded-xl border-2 border-brand-purple/15 bg-white px-4 text-sm text-brand-purple placeholder:text-brand-purple/40 outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/45";

const selectField =
  "h-12 w-full rounded-xl border-2 border-brand-purple/15 bg-white px-3 text-sm text-brand-purple outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/45 appearance-none";

const label = "text-xs font-semibold text-brand-purple";

function defaultModeFromJob(jt?: JobType, jts?: JobType[]): Mode {
  const types = jts?.length ? jts : jt ? [jt] : [];
  if (types.includes("Piano Move")) return "piano";
  if (types.includes("House Move")) return "house";
  if (types.includes("Commercial Move")) return "commercial";
  if (types.includes("Office Move")) return "office";
  return "choose";
}

function modeLabel(mode: Mode): string {
  if (mode === "commercial") return "Commercial move";
  if (mode === "office") return "Office move";
  if (mode === "house") return "House move";
  if (mode === "piano") return "Piano move";
  return "Move";
}

export function QuoteForm({
  className = "",
  compact = false,
  defaultJobType,
  defaultJobTypes,
  initialMode,
}: QuoteFormProps) {
  const startMode = initialMode ?? defaultModeFromJob(defaultJobType, defaultJobTypes);
  const [f, setF] = useState<FormState>({ ...initial, mode: startMode });
  const [step, setStep] = useState(
    startMode === "choose" || startMode === "callback" ? 0 : 1,
  );

  const set = <K extends keyof FormState>(key: K, val: FormState[K]) =>
    setF((prev) => ({ ...prev, [key]: val, error: "" }));

  const goStep = (n: number) => setStep(n);

  async function submitCallback() {
    if (!f.name.trim() || !f.phone.trim()) {
      set("error", "Please enter your name and phone number.");
      return;
    }
    set("loading", true);
    try {
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "callback",
          name: f.name,
          phone: f.phone,
          email: f.email,
        }),
      });
      set("callbackSent", true);
    } catch {
      set("error", "Something went wrong. Please try again.");
    }
    set("loading", false);
  }

  async function submitCommercial() {
    if (!f.name.trim()) {
      set("error", "Please enter your name.");
      return;
    }
    if (!f.email.trim()) {
      set("error", "Please enter your email.");
      return;
    }
    if (!f.message.trim()) {
      set("error", "Please tell us about your job.");
      return;
    }
    set("loading", true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "commercial",
          name: f.name,
          email: f.email,
          message: f.message,
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        pricing?: Record<string, unknown>;
      };
      if (data.ok) {
        set("result", data.pricing ?? null);
        setF((prev) => ({ ...prev, mode: "result" }));
        goStep(3);
      } else {
        set("error", data.error || "Something went wrong.");
      }
    } catch {
      set("error", "Something went wrong. Please try again.");
    }
    set("loading", false);
  }

  async function submitQuote() {
    if (!f.name.trim() || !f.phone.trim()) {
      set("error", "Please enter your name and phone number.");
      return;
    }
    if (!f.pickupAddress.trim() || !f.dropoffAddress.trim()) {
      set("error", "Please enter both pickup and drop-off addresses.");
      return;
    }
    set("loading", true);
    try {
      const payload: Record<string, unknown> = {
        mode: f.mode,
        name: f.name,
        phone: f.phone,
        email: f.email,
        pickupAddress: f.pickupAddress,
        dropoffAddress: f.dropoffAddress,
        message: f.message,
      };
      payload.serviceType = defaultJobType ?? (f.mode === "house" ? "House Move" : f.mode === "piano" ? "Piano Move" : "Office Move");

      if (f.mode === "house") {
        payload.bedrooms = f.bedrooms;
        payload.pickupAccess = f.pickupAccess;
        payload.dropoffAccess = f.dropoffAccess;
        payload.preferredDate = f.preferredDate;
        payload.wantsPacking = f.wantsPacking;
        payload.wantsCleaning = f.wantsCleaning;
      } else if (f.mode === "office") {
        payload.officeSize = f.officeSize;
        payload.pickupAccess = f.pickupAccess;
        payload.dropoffAccess = f.dropoffAccess;
        payload.preferredDate = f.preferredDate;
      } else {
        payload.pianoType = f.pianoType;
        payload.pickupStairFlights = f.pickupStairs;
        payload.dropoffStairFlights = f.dropoffStairs;
      }

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        error?: string;
        pricing?: Record<string, unknown>;
      };
      if (data.ok) {
        set("result", data.pricing ?? null);
        setF((prev) => ({ ...prev, mode: "result" }));
        goStep(3);
      } else {
        set("error", data.error || "Something went wrong.");
      }
    } catch {
      set("error", "Something went wrong. Please try again.");
    }
    set("loading", false);
  }

  // Callback-only (e.g. brand-moment "Request a call back")
  if (f.mode === "callback") {
    return (
      <Wrapper className={className} compact={compact}>
        <Header
          tag="Call back"
          title="Request a call back"
          subtitle="Leave your details and we will call you within 15 minutes, seven days a week."
        />
        {f.callbackSent ? (
          <p className="rounded-xl border-2 border-brand-yellow/60 bg-brand-yellow/20 p-4 text-sm font-semibold text-brand-purple">
            Thanks{f.name ? ` ${f.name.split(" ")[0]}` : ""}! We&apos;ll call you within 15
            minutes.
          </p>
        ) : (
          <div className="space-y-3">
            <input
              placeholder="Your name"
              value={f.name}
              onChange={(e) => set("name", e.target.value)}
              className={field}
            />
            <input
              placeholder="Phone number"
              type="tel"
              inputMode="tel"
              value={f.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={field}
            />
            {f.error && <p className="text-xs font-medium text-red-600">{f.error}</p>}
            <button
              type="button"
              onClick={submitCallback}
              disabled={f.loading}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-sm font-bold text-brand-purple shadow-sm transition hover:brightness-[1.05]"
            >
              {f.loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Phone className="h-4 w-4" />
              )}
              Call me back
            </button>
          </div>
        )}
        <TrustPoints />
      </Wrapper>
    );
  }

  // Step 0 , Choose (only shown when no defaultJobType provided)
  if (step === 0) {
    return (
      <Wrapper className={className} compact={compact}>
        <Header
          tag="Instant quote"
          title="Get your price now"
          subtitle="Choose your service to see pricing instantly, or just leave your number and we'll call you right back."
        />

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => {
              set("mode", "house");
              goStep(1);
            }}
            className="flex w-full items-center gap-3 rounded-xl border-2 border-brand-purple/15 bg-white p-4 text-left transition hover:border-brand-yellow hover:bg-brand-yellow/10"
          >
            <Home className="h-6 w-6 shrink-0 text-brand-purple" />
            <div>
              <p className="font-heading text-sm font-bold uppercase tracking-wide text-brand-purple">
                House Move
              </p>
              <p className="text-xs text-brand-purple/60">
                Get an instant estimate for your home move
              </p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-brand-purple/40" />
          </button>

          <button
            type="button"
            onClick={() => {
              set("mode", "piano");
              goStep(1);
            }}
            className="flex w-full items-center gap-3 rounded-xl border-2 border-brand-purple/15 bg-white p-4 text-left transition hover:border-brand-yellow hover:bg-brand-yellow/10"
          >
            <Music className="h-6 w-6 shrink-0 text-brand-purple" />
            <div>
              <p className="font-heading text-sm font-bold uppercase tracking-wide text-brand-purple">
                Piano Move
              </p>
              <p className="text-xs text-brand-purple/60">
                Fixed pricing for upright and grand pianos
              </p>
            </div>
            <ArrowRight className="ml-auto h-5 w-5 shrink-0 text-brand-purple/40" />
          </button>
        </div>

        <div className="mt-5 border-t border-brand-purple/10 pt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-purple/60">
            In a rush?
          </p>
          {f.callbackSent ? (
            <p className="rounded-xl border-2 border-brand-yellow/60 bg-brand-yellow/20 p-4 text-sm font-semibold text-brand-purple">
              Thanks{f.name ? ` ${f.name.split(" ")[0]}` : ""}! We&apos;ll call you
              within 15 minutes.
            </p>
          ) : (
            <div className="space-y-3">
              <input
                placeholder="Your name"
                value={f.name}
                onChange={(e) => set("name", e.target.value)}
                className={field}
              />
              <input
                placeholder="Phone number"
                type="tel"
                inputMode="tel"
                value={f.phone}
                onChange={(e) => set("phone", e.target.value)}
                className={field}
              />
              {f.error && (
                <p className="text-xs font-medium text-red-600">{f.error}</p>
              )}
              <button
                type="button"
                onClick={submitCallback}
                disabled={f.loading}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-brand-purple bg-white px-6 text-sm font-bold text-brand-purple transition hover:bg-brand-purple hover:text-white"
              >
                {f.loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Phone className="h-4 w-4" />
                )}
                Call me back
              </button>
            </div>
          )}
        </div>

        <TrustPoints />
      </Wrapper>
    );
  }

  // Step 1 , Commercial lead (name, email, description only)
  if (step === 1 && f.mode === "commercial") {
    const canSend = Boolean(
      f.name.trim() && f.email.trim() && f.message.trim(),
    );
    return (
      <Wrapper className={className} compact={compact}>
        <Header
          tag="Commercial enquiry"
          title="Tell us about your job"
          subtitle="We will get back to you within 15 minutes with a tailored quote."
        />

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className={label}>Name *</label>
            <input
              placeholder="Your name"
              value={f.name}
              onChange={(e) => set("name", e.target.value)}
              className={field}
            />
          </div>
          <div className="space-y-1.5">
            <label className={label}>Email *</label>
            <input
              type="email"
              placeholder="you@company.com"
              value={f.email}
              onChange={(e) => set("email", e.target.value)}
              className={field}
            />
          </div>
          <div className="space-y-1.5">
            <label className={label}>Job description *</label>
            <textarea
              rows={5}
              placeholder="What are you moving? Sites, dates, access, anything we should know."
              value={f.message}
              onChange={(e) => set("message", e.target.value)}
              className={`${field} h-auto py-3`}
            />
          </div>
        </div>

        {f.error && (
          <p className="mt-3 text-xs font-medium text-red-600">{f.error}</p>
        )}

        <button
          type="button"
          onClick={submitCommercial}
          disabled={f.loading || !canSend}
          className="group mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-base font-bold text-brand-purple shadow-[0_8px_24px_-4px_rgba(243,208,42,0.65)] ring-2 ring-brand-yellow ring-offset-2 ring-offset-white transition hover:brightness-[1.03] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
        >
          {f.loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              Send enquiry
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        {!canSend && (
          <p className="mt-2 text-xs text-brand-purple/60">
            Name, email, and a short description are required.
          </p>
        )}

        <TrustPoints />
      </Wrapper>
    );
  }

  // Step 1 , Details
  if (step === 1) {
    const canProceed = Boolean(f.pickupAddress.trim() && f.dropoffAddress.trim());
    return (
      <Wrapper className={className} compact={compact}>
        <Header
          tag={modeLabel(f.mode)}
          title="Your move details"
          subtitle={
            f.mode === "house"
              ? "Tell us about your home and where you're moving."
              : f.mode === "office"
                ? "Tell us about your workplace and both sites. No bedroom count needed."
                : "Tell us about your piano and the move."
          }
        />

        {startMode === "choose" ? (
          <BackButton
            onClick={() => {
              set("mode", "choose");
              goStep(0);
            }}
          />
        ) : null}

        <div className="space-y-4">
          {f.mode === "office" && (
            <>
              <div className="space-y-1.5">
                <label className={label}>Office size</label>
                <select
                  value={f.officeSize}
                  onChange={(e) => set("officeSize", e.target.value)}
                  className={selectField}
                >
                  <option value="small">Small (up to ~10 staff)</option>
                  <option value="medium">Medium (~10–30 staff)</option>
                  <option value="large">Large (30+ staff)</option>
                  <option value="floor">Whole floor / multi-level</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="office-pickup" className={label}>
                  Current office address
                </label>
                <AddressAutocomplete
                  id="office-pickup"
                  value={f.pickupAddress}
                  onChange={(v) => set("pickupAddress", v)}
                  placeholder="Start typing street address…"
                  className={field}
                  aria-label="Current office address"
                />
              </div>
              <div className="space-y-1.5">
                <label className={label}>Access at current site</label>
                <div className="flex gap-2">
                  <ToggleBtn
                    active={f.pickupAccess === "easy"}
                    onClick={() => set("pickupAccess", "easy")}
                  >
                    Lift / easy access
                  </ToggleBtn>
                  <ToggleBtn
                    active={f.pickupAccess === "hard"}
                    onClick={() => set("pickupAccess", "hard")}
                  >
                    Stairs / tight
                  </ToggleBtn>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="office-dropoff" className={label}>
                  New office address
                </label>
                <AddressAutocomplete
                  id="office-dropoff"
                  value={f.dropoffAddress}
                  onChange={(v) => set("dropoffAddress", v)}
                  placeholder="Start typing street address…"
                  className={field}
                  aria-label="New office address"
                />
              </div>
              <RouteBranchHint
                pickupAddress={f.pickupAddress}
                dropoffAddress={f.dropoffAddress}
              />
              <div className="space-y-1.5">
                <label className={label}>Access at new site</label>
                <div className="flex gap-2">
                  <ToggleBtn
                    active={f.dropoffAccess === "easy"}
                    onClick={() => set("dropoffAccess", "easy")}
                  >
                    Lift / easy access
                  </ToggleBtn>
                  <ToggleBtn
                    active={f.dropoffAccess === "hard"}
                    onClick={() => set("dropoffAccess", "hard")}
                  >
                    Stairs / tight
                  </ToggleBtn>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={label}>Preferred move date</label>
                <input
                  type="date"
                  value={f.preferredDate}
                  onChange={(e) => set("preferredDate", e.target.value)}
                  className={field}
                />
              </div>

              <div className="space-y-1.5">
                <label className={label}>What are we moving? (optional)</label>
                <textarea
                  rows={2}
                  placeholder="Desks, IT, meeting room, filing, after-hours, etc."
                  value={f.message}
                  onChange={(e) => set("message", e.target.value)}
                  className={`${field} h-auto py-3`}
                />
              </div>
            </>
          )}

          {f.mode === "house" && (
            <>
              <div className="space-y-1.5">
                <label className={label}>Bedrooms</label>
                <select
                  value={f.bedrooms}
                  onChange={(e) => set("bedrooms", Number(e.target.value))}
                  className={selectField}
                >
                  <option value={1}>1 bedroom</option>
                  <option value={2}>2 bedrooms</option>
                  <option value={3}>3 bedrooms</option>
                  <option value={4}>4+ bedrooms</option>
                </select>
                {f.bedrooms === 3 ? (
                  <p className="text-xs text-brand-purple/65">
                    3-bedroom moves often qualify for a more accurate total
                    estimate or fixed price quote after we view your home.
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="house-pickup" className={label}>
                  Pickup address
                </label>
                <AddressAutocomplete
                  id="house-pickup"
                  value={f.pickupAddress}
                  onChange={(v) => set("pickupAddress", v)}
                  className={field}
                  aria-label="Pickup address"
                />
              </div>
              <div className="space-y-1.5">
                <label className={label}>Pickup access</label>
                <div className="flex gap-2">
                  <ToggleBtn
                    active={f.pickupAccess === "easy"}
                    onClick={() => set("pickupAccess", "easy")}
                  >
                    Easy (ground level)
                  </ToggleBtn>
                  <ToggleBtn
                    active={f.pickupAccess === "hard"}
                    onClick={() => set("pickupAccess", "hard")}
                  >
                    Stairs / difficult
                  </ToggleBtn>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="house-dropoff" className={label}>
                  Drop-off address
                </label>
                <AddressAutocomplete
                  id="house-dropoff"
                  value={f.dropoffAddress}
                  onChange={(v) => set("dropoffAddress", v)}
                  className={field}
                  aria-label="Drop-off address"
                />
              </div>
              <RouteBranchHint
                pickupAddress={f.pickupAddress}
                dropoffAddress={f.dropoffAddress}
              />
              <div className="space-y-1.5">
                <label className={label}>Drop-off access</label>
                <div className="flex gap-2">
                  <ToggleBtn
                    active={f.dropoffAccess === "easy"}
                    onClick={() => set("dropoffAccess", "easy")}
                  >
                    Easy (ground level)
                  </ToggleBtn>
                  <ToggleBtn
                    active={f.dropoffAccess === "hard"}
                    onClick={() => set("dropoffAccess", "hard")}
                  >
                    Stairs / difficult
                  </ToggleBtn>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={label}>Preferred move date</label>
                <input
                  type="date"
                  value={f.preferredDate}
                  onChange={(e) => set("preferredDate", e.target.value)}
                  className={field}
                />
              </div>
            </>
          )}

          {f.mode === "piano" && (
            <>
              <div className="space-y-1.5">
                <label className={label}>Piano type</label>
                <div className="flex gap-2">
                  <ToggleBtn
                    active={f.pianoType === "upright"}
                    onClick={() => set("pianoType", "upright")}
                  >
                    Upright
                  </ToggleBtn>
                  <ToggleBtn
                    active={f.pianoType === "grand"}
                    onClick={() => set("pianoType", "grand")}
                  >
                    Grand
                  </ToggleBtn>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="piano-pickup" className={label}>
                  Pickup address
                </label>
                <AddressAutocomplete
                  id="piano-pickup"
                  value={f.pickupAddress}
                  onChange={(v) => set("pickupAddress", v)}
                  className={field}
                  aria-label="Pickup address"
                />
              </div>
              <div className="space-y-1.5">
                <label className={label}>Stairs at pickup</label>
                <select
                  value={f.pickupStairs}
                  onChange={(e) => set("pickupStairs", Number(e.target.value))}
                  className={selectField}
                >
                  <option value={0}>No stairs (ground level)</option>
                  <option value={1}>1 flight of stairs</option>
                  <option value={2}>2 flights of stairs</option>
                  <option value={3}>3+ flights of stairs</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="piano-dropoff" className={label}>
                  Drop-off address
                </label>
                <AddressAutocomplete
                  id="piano-dropoff"
                  value={f.dropoffAddress}
                  onChange={(v) => set("dropoffAddress", v)}
                  className={field}
                  aria-label="Drop-off address"
                />
              </div>
              <RouteBranchHint
                pickupAddress={f.pickupAddress}
                dropoffAddress={f.dropoffAddress}
              />
              <div className="space-y-1.5">
                <label className={label}>Stairs at drop-off</label>
                <select
                  value={f.dropoffStairs}
                  onChange={(e) => set("dropoffStairs", Number(e.target.value))}
                  className={selectField}
                >
                  <option value={0}>No stairs (ground level)</option>
                  <option value={1}>1 flight of stairs</option>
                  <option value={2}>2 flights of stairs</option>
                  <option value={3}>3+ flights of stairs</option>
                </select>
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => goStep(2)}
          disabled={!canProceed}
          className="group mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-base font-bold text-brand-purple shadow-[0_8px_24px_-4px_rgba(243,208,42,0.65)] ring-2 ring-brand-yellow ring-offset-2 ring-offset-white transition hover:brightness-[1.03] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
        >
          Next
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
        </button>

        {!canProceed && (
          <p className="mt-2 text-xs text-brand-purple/60">
            Pick both addresses from the dropdown (or type full street and suburb)
            to continue.
          </p>
        )}

        {f.error && (
          <p className="mt-3 text-xs font-medium text-red-600">{f.error}</p>
        )}
      </Wrapper>
    );
  }

  // Step 2 , Contact + add-ons
  if (step === 2) {
    const canCalculate = Boolean(f.name.trim() && f.phone.trim());
    const isOffice = f.mode === "office";
    return (
      <Wrapper className={className} compact={compact}>
        <Header
          tag="Almost done"
          title="Your details"
          subtitle={
            isOffice
              ? "We will call you within 15 minutes with a tailored quote."
              : "Enter your contact info and we'll calculate your price."
          }
        />

        <BackButton onClick={() => goStep(1)} />

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className={label}>Full name *</label>
            <input
              placeholder="Your name"
              value={f.name}
              onChange={(e) => set("name", e.target.value)}
              className={field}
            />
          </div>
          <div className="space-y-1.5">
            <label className={label}>Phone number *</label>
            <input
              type="tel"
              inputMode="tel"
              placeholder="021..."
              value={f.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={field}
            />
          </div>
          <div className="space-y-1.5">
            <label className={label}>Email (optional)</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={f.email}
              onChange={(e) => set("email", e.target.value)}
              className={field}
            />
          </div>

          {f.mode === "house" && (
            <div className="space-y-3 rounded-xl border-2 border-brand-purple/10 bg-brand-yellow/[0.06] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple">
                Add-ons
              </p>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={f.wantsPacking}
                  onChange={(e) => set("wantsPacking", e.target.checked)}
                  className="h-5 w-5 rounded border-brand-purple/30 text-brand-yellow accent-brand-yellow"
                />
                <span className="text-sm text-brand-purple">
                  Professional packing{" "}
                  <span className="text-brand-purple/50">
                    (team of 3 packers, day before)
                  </span>
                </span>
              </label>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={f.wantsCleaning}
                  onChange={(e) => set("wantsCleaning", e.target.checked)}
                  className="h-5 w-5 rounded border-brand-purple/30 text-brand-yellow accent-brand-yellow"
                />
                <span className="text-sm text-brand-purple">
                  Exit cleaning{" "}
                  <span className="text-brand-purple/50">(fixed price)</span>
                </span>
              </label>
            </div>
          )}
        </div>

        {f.error && (
          <p className="mt-3 text-xs font-medium text-red-600">{f.error}</p>
        )}

        <button
          type="button"
          onClick={submitQuote}
          disabled={f.loading || !canCalculate}
          className="group mt-6 flex h-14 w-full items-center justify-center gap-2 rounded-full bg-brand-yellow px-6 text-base font-bold text-brand-purple shadow-[0_8px_24px_-4px_rgba(243,208,42,0.65)] ring-2 ring-brand-yellow ring-offset-2 ring-offset-white transition hover:brightness-[1.03] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:brightness-100"
        >
          {f.loading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              {isOffice ? "Request my quote" : "Calculate my price"}
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        {!canCalculate && (
          <p className="mt-2 text-xs text-brand-purple/60">
            Name and phone are required{isOffice ? "" : " to calculate your price"}.
          </p>
        )}

        <TrustPoints />
      </Wrapper>
    );
  }

  // Step 3 , Result
  if (step === 3 && f.mode === "result") {
    const pricing = f.result;
    const quoteRequested = pricing?.quoteRequested === true;

    if (quoteRequested) {
      return (
        <Wrapper className={className} compact={compact}>
          <Header tag="Quote requested" title="We&apos;ll call you soon" />
          <div className="rounded-xl border-2 border-brand-yellow/60 bg-brand-yellow/20 p-5">
            <p className="text-sm leading-relaxed text-brand-purple">
              Thanks{f.name ? ` ${f.name.split(" ")[0]}` : ""}! Your{" "}
              {modeLabel(
                defaultJobType === "Commercial Move" ? "commercial" : "office",
              ).toLowerCase()}{" "}
              details are saved. We will call
              you within <strong>15 minutes</strong> with a tailored quote.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setF({ ...initial, mode: startMode });
              setStep(startMode === "choose" ? 0 : 1);
            }}
            className="mt-4 text-sm font-semibold text-brand-purple underline decoration-brand-yellow decoration-2 underline-offset-2"
          >
            Submit another request
          </button>
          <TrustPoints />
        </Wrapper>
      );
    }

    const isOutOfAuckland = pricing?.outOfAuckland === true;

    if (isOutOfAuckland) {
      return (
        <Wrapper className={className} compact={compact}>
          <Header tag="Custom quote" title="We'll be in touch" />
          <div className="rounded-xl border-2 border-brand-yellow/60 bg-brand-yellow/20 p-5">
            <p className="text-sm leading-relaxed text-brand-purple">
              Your route is outside our online quote area (for example Auckland to
              Waikato, or beyond our service zones). We&apos;ll call you within{" "}
              <strong>15 minutes</strong> with a custom quote tailored to your move.
            </p>
          </div>
          <p className="mt-4 text-sm text-brand-purple/60">
            We&apos;ve saved your details and one of our team will be in touch shortly.
          </p>
          <button
            type="button"
            onClick={() => {
              setF({ ...initial, mode: startMode });
              setStep(startMode === "choose" ? 0 : 1);
            }}
            className="mt-4 text-sm font-semibold text-brand-purple underline decoration-brand-yellow decoration-2 underline-offset-2"
          >
            Start a new quote
          </button>
        </Wrapper>
      );
    }

    const totalIncGst = pricing?.totalIncGst as number;
    const breakdown = pricing?.breakdown as string;
    const moveCostIncGst = pricing?.moveCostIncGst as number | undefined;
    const packingCostIncGst = pricing?.packingCostIncGst as number | null | undefined;
    const cleaningCostIncGst = pricing?.cleaningCostIncGst as number | null | undefined;

    return (
      <Wrapper className={className} compact={compact}>
        <Header tag="Your quote" title="Here's your price" />

        <div className="rounded-xl border-2 border-brand-yellow/60 bg-brand-yellow/15 p-5 text-center">
          <p className="font-heading text-4xl text-brand-purple">
            $
            {totalIncGst?.toLocaleString("en-NZ", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </p>
          <p className="mt-1 text-xs font-medium text-brand-purple/60">
            incl. GST (estimated)
          </p>
        </div>

        <div className="mt-4 space-y-2 rounded-xl border border-brand-purple/10 bg-white p-4">
          {moveCostIncGst != null && (
            <div className="flex justify-between text-sm">
              <span className="text-brand-purple/70">Moving</span>
              <span className="font-semibold text-brand-purple">
                ${moveCostIncGst.toLocaleString("en-NZ")}
              </span>
            </div>
          )}
          {packingCostIncGst != null && (
            <div className="flex justify-between text-sm">
              <span className="text-brand-purple/70">Packing</span>
              <span className="font-semibold text-brand-purple">
                ${packingCostIncGst.toLocaleString("en-NZ")}
              </span>
            </div>
          )}
          {cleaningCostIncGst != null && (
            <div className="flex justify-between text-sm">
              <span className="text-brand-purple/70">Cleaning</span>
              <span className="font-semibold text-brand-purple">
                ${cleaningCostIncGst.toLocaleString("en-NZ")}
              </span>
            </div>
          )}

          {pricing?.baseCostExGst != null && (
            <>
              <div className="flex justify-between text-sm">
                <span className="text-brand-purple/70">
                  {pricing.pianoType === "grand" ? "Grand piano" : "Upright piano"}
                </span>
                <span className="font-semibold text-brand-purple">
                  ${(pricing.baseCostExGst as number)} + GST
                </span>
              </div>
              {(pricing.locationSurchargeExGst as number) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-brand-purple/70">Travel surcharge</span>
                  <span className="font-semibold text-brand-purple">
                    ${(pricing.locationSurchargeExGst as number)} + GST
                  </span>
                </div>
              )}
              {(pricing.stairsSurchargeExGst as number) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-brand-purple/70">Stairs</span>
                  <span className="font-semibold text-brand-purple">
                    ${(pricing.stairsSurchargeExGst as number)} + GST
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {breakdown && (
          <pre className="mt-3 whitespace-pre-wrap text-xs leading-relaxed text-brand-purple/50">
            {breakdown}
          </pre>
        )}

        <p className="mt-4 text-sm leading-relaxed text-brand-purple/70">
          This is an estimate based on the details you provided. We&apos;ve saved your
          info and one of our team will follow up to confirm everything.
        </p>

        <div className="mt-4 space-y-2">
          <a
            href="tel:0212282728"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-purple px-6 text-sm font-bold text-white transition hover:bg-brand-purple/90"
          >
            <Phone className="h-4 w-4" />
            Call us now
          </a>
          <button
            type="button"
            onClick={() => {
              setF({ ...initial, mode: startMode });
              setStep(startMode === "choose" ? 0 : 1);
            }}
            className="flex h-12 w-full items-center justify-center text-sm font-semibold text-brand-purple underline decoration-brand-yellow decoration-2 underline-offset-2"
          >
            Start a new quote
          </button>
        </div>
      </Wrapper>
    );
  }

  return null;
}

function Wrapper({
  children,
  className,
  compact,
}: {
  children: React.ReactNode;
  className: string;
  compact: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.25rem] border-2 border-brand-purple/10 border-t-brand-yellow bg-white shadow-[0_20px_60px_-12px_rgba(151,57,176,0.2),0_0_0_1px_rgba(243,208,42,0.25)] ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-yellow via-brand-yellow to-brand-purple/30" />
      <div className={`relative p-5 sm:p-7 ${compact ? "sm:p-6" : ""}`}>
        {children}
      </div>
    </div>
  );
}

function Header({
  tag,
  title,
  subtitle,
}: {
  tag: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-5 border-b border-brand-purple/10 pb-5">
      <p className="inline-block rounded-md bg-brand-yellow/90 px-2 py-0.5 font-heading text-[10px] font-bold uppercase tracking-widest text-brand-purple">
        {tag}
      </p>
      <p className="mt-2 font-heading text-xl uppercase tracking-wide text-brand-purple sm:text-2xl">
        {title}
      </p>
      {subtitle && (
        <p className="mt-1.5 text-sm leading-relaxed text-brand-purple/75">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-4 flex items-center gap-1 text-xs font-semibold text-brand-purple/60 transition hover:text-brand-purple"
    >
      <ArrowLeft className="h-3 w-3" />
      Back
    </button>
  );
}

function ToggleBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 rounded-xl border-2 px-3 py-2.5 text-xs font-bold transition ${
        active
          ? "border-brand-purple bg-brand-yellow text-brand-purple shadow-md"
          : "border-brand-purple/15 bg-white text-brand-purple/70 hover:border-brand-yellow"
      }`}
    >
      {children}
    </button>
  );
}

function TrustPoints() {
  const points = [
    "Hundreds of 5-star reviews",
    "No obligation, competitive pricing",
    regions.quoteTrustLine,
  ];
  return (
    <ul className="mt-4 space-y-2">
      {points.map((line) => (
        <li
          key={line}
          className="flex items-center gap-2 text-xs font-medium text-brand-purple/80"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0 text-brand-yellow drop-shadow-sm" />
          {line}
        </li>
      ))}
    </ul>
  );
}
