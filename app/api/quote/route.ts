import { NextResponse } from "next/server";
import {
  calculateHouseMove,
  calculatePianoMove,
  type HouseMoveInput,
  type PianoMoveInput,
} from "@/lib/pricing";
import { createHubSpotDeal } from "@/lib/hubspot";
import type { AccessDifficulty, Bedrooms, PianoType } from "@/lib/pricing-data";

function parseRooms(value: number | undefined): Bedrooms {
  const rooms = value ?? 2;
  if (rooms === 1 || rooms === 2 || rooms === 3 || rooms === 4) return rooms;
  return 2;
}

type QuoteBody = {
  mode: "house" | "piano" | "office" | "commercial" | "callback";
  serviceType?: string;
  // House
  bedrooms?: Bedrooms;
  pickupAddress?: string;
  dropoffAddress?: string;
  pickupAccess?: AccessDifficulty;
  dropoffAccess?: AccessDifficulty;
  preferredDate?: string;
  wantsPacking?: boolean;
  wantsCleaning?: boolean;
  wantsInsurance?: boolean;
  // Office / commercial
  officeSize?: string;
  // Piano
  pianoType?: PianoType;
  pickupStairFlights?: number;
  dropoffStairFlights?: number;
  // Contact
  name: string;
  phone: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as QuoteBody;

  if (body.mode === "commercial") {
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and description required" },
        { status: 400 },
      );
    }

    createHubSpotDeal({
      name: body.name,
      phone: body.phone?.trim() || "Via website",
      email: body.email,
      serviceType: "Commercial Move",
      pickupAddress: "",
      dropoffAddress: "",
      notes: `Website commercial enquiry\n\n${body.message.trim()}`,
    }).catch(console.error);

    return NextResponse.json({
      ok: true,
      mode: "commercial",
      pricing: { quoteRequested: true },
    });
  }

  if (!body.name || !body.phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone required" },
      { status: 400 },
    );
  }

  if (body.mode === "callback") {
    createHubSpotDeal({
      name: body.name,
      phone: body.phone,
      email: body.email,
      serviceType: "Callback Request",
      pickupAddress: "",
      dropoffAddress: "",
      notes: "Customer requested a callback from the website.",
    }).catch(console.error);

    return NextResponse.json({ ok: true, callback: true });
  }

  if (!body.pickupAddress || !body.dropoffAddress) {
    return NextResponse.json(
      { ok: false, error: "Addresses required" },
      { status: 400 },
    );
  }

  if (body.mode === "house") {
    const input: HouseMoveInput = {
      bedrooms: parseRooms(body.bedrooms),
      pickupAddress: body.pickupAddress,
      dropoffAddress: body.dropoffAddress,
      preferredDate: body.preferredDate,
      pickupAccess: body.pickupAccess ?? "easy",
      dropoffAccess: body.dropoffAccess ?? "easy",
      wantsPacking: body.wantsPacking ?? false,
      wantsCleaning: body.wantsCleaning ?? false,
    };

    const result = calculateHouseMove(input);

    const addOnNotes = [
      body.wantsPacking ? "Packing add-on requested" : "",
      body.wantsCleaning ? "Exit cleaning add-on requested" : "",
      body.wantsInsurance ? "Full moving insurance add-on requested" : "",
    ]
      .filter(Boolean)
      .join("\n");

    const extraNotes = [
      addOnNotes ? `Add-ons:\n${addOnNotes}` : "",
      body.message?.trim() ? `Customer notes:\n${body.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    const notesSuffix = extraNotes ? `\n\n${extraNotes}` : "";

    createHubSpotDeal({
      name: body.name,
      phone: body.phone,
      email: body.email,
      serviceType: "House Move",
      pickupAddress: body.pickupAddress,
      dropoffAddress: body.dropoffAddress,
      preferredDate: body.preferredDate,
      estimatedValue: result.outOfAuckland ? undefined : result.totalIncGst,
      notes: result.outOfAuckland
        ? `Website quote: Out of Auckland - custom quote needed\n${parseRooms(body.bedrooms)} rooms, ${body.pickupAddress} → ${body.dropoffAddress}${notesSuffix}`
        : `Website quote: $${result.totalIncGst} incl GST\n${result.breakdown}${notesSuffix}`,
    }).catch(console.error);

    return NextResponse.json({ ok: true, mode: "house", pricing: result });
  }

  if (body.mode === "piano") {
    const input: PianoMoveInput = {
      pianoType: body.pianoType ?? "upright",
      pickupAddress: body.pickupAddress,
      dropoffAddress: body.dropoffAddress,
      pickupStairFlights: body.pickupStairFlights ?? 0,
      dropoffStairFlights: body.dropoffStairFlights ?? 0,
    };

    const result = calculatePianoMove(input);

    const extraNotes = body.message?.trim()
      ? `\n\nCustomer notes:\n${body.message.trim()}`
      : "";

    createHubSpotDeal({
      name: body.name,
      phone: body.phone,
      email: body.email,
      serviceType: "Piano Move",
      pickupAddress: body.pickupAddress,
      dropoffAddress: body.dropoffAddress,
      estimatedValue: result.outOfAuckland ? undefined : result.totalIncGst,
      notes: result.outOfAuckland
        ? `Website quote: Out of Auckland - custom quote needed\n${body.pianoType} piano, ${body.pickupAddress} → ${body.dropoffAddress}${extraNotes}`
        : `Website quote: $${result.totalIncGst} incl GST\n${result.breakdown}${extraNotes}`,
    }).catch(console.error);

    return NextResponse.json({ ok: true, mode: "piano", pricing: result });
  }

  if (body.mode === "office") {
    const serviceType = body.serviceType ?? "Office Move";
    const sizeLabel =
      body.officeSize === "small"
        ? "Small (up to ~10 staff)"
        : body.officeSize === "large"
          ? "Large (30+ staff)"
          : body.officeSize === "floor"
            ? "Whole floor / multi-level"
            : "Medium (~10–30 staff)";

    createHubSpotDeal({
      name: body.name,
      phone: body.phone,
      email: body.email,
      serviceType,
      pickupAddress: body.pickupAddress,
      dropoffAddress: body.dropoffAddress,
      preferredDate: body.preferredDate,
      notes: [
        `Website ${serviceType} quote request`,
        `Office size: ${sizeLabel}`,
        `Pickup access: ${body.pickupAccess ?? "easy"}`,
        `Drop-off access: ${body.dropoffAccess ?? "easy"}`,
        body.message?.trim() ? `Details: ${body.message.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    }).catch(console.error);

    return NextResponse.json({
      ok: true,
      mode: "office",
      pricing: { quoteRequested: true },
    });
  }

  return NextResponse.json({ ok: false, error: "Invalid mode" }, { status: 400 });
}

