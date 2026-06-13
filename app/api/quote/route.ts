import { NextResponse } from "next/server";
import {
  calculateHouseMove,
  calculatePianoMove,
  detectQuoteBranch,
  needsManualQuote,
  type HouseMoveInput,
  type PianoMoveInput,
} from "@/lib/pricing";
import { isGooglePlacesConfigured } from "@/lib/google-places-config";
import type { ParsedPlaceAddress } from "@/lib/parse-place-address";
import { quotePriceRange } from "@/lib/quote-display";
import { createHubSpotDeal } from "@/lib/hubspot";
import type { AccessDifficulty, Bedrooms, PianoType } from "@/lib/pricing-data";

function parseRooms(value: number | undefined): Bedrooms {
  const rooms = value ?? 2;
  if (rooms === 1 || rooms === 2 || rooms === 3 || rooms === 4) return rooms;
  return 2;
}

type QuoteBody = {
  mode: "house" | "piano" | "office" | "commercial" | "callback" | "contact";
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
  /** Both addresses selected from Google Places and in service area. */
  addressesVerified?: boolean;
  /** Page path the form was submitted from, e.g. /hamilton/piano-movers. */
  sourcePage?: string;
  /** Google Places parsed components for each address, when verified. */
  pickupParsed?: ParsedPlaceAddress;
  dropoffParsed?: ParsedPlaceAddress;
};

/**
 * Branch for the HubSpot deal. Uses Google Places data when available.
 * Unverified addresses that don't classify get NO branch (blank in HubSpot)
 * rather than a possibly-wrong "out of town" tag.
 */
function resolveDealBranch(
  body: QuoteBody,
): "auckland" | "hamilton" | "manual" | undefined {
  if (!body.pickupAddress || !body.dropoffAddress) return undefined;
  const branch = detectQuoteBranch(body.pickupAddress, body.dropoffAddress, {
    pickupParsed: body.pickupParsed,
    dropoffParsed: body.dropoffParsed,
  });
  if (branch !== "manual") return branch;
  return body.addressesVerified ? "manual" : undefined;
}

function accessLabel(access: AccessDifficulty | undefined): string {
  return access === "hard" ? "Stairs / difficult" : "Easy (ground level)";
}

function stairsLabel(flights: number | undefined): string {
  const n = flights ?? 0;
  if (n === 0) return "No stairs (ground level)";
  return n === 1 ? "1 flight of stairs" : `${n} flights of stairs`;
}

function requiresCustomQuote(
  pickupAddress: string,
  dropoffAddress: string,
  addressesVerified?: boolean,
): boolean {
  if (!isGooglePlacesConfigured() || addressesVerified !== true) {
    return true;
  }
  return needsManualQuote(pickupAddress, dropoffAddress);
}

function withDisplayPricing<T extends { totalIncGst: number }>(pricing: T) {
  const range = quotePriceRange(pricing.totalIncGst);
  return { ...pricing, ...range };
}

export async function POST(request: Request) {
  const body = (await request.json()) as QuoteBody;

  if (body.mode === "commercial") {
    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Name, email, and description required" },
        { status: 400 },
      );
    }

    await createHubSpotDeal({
      name: body.name,
      phone: body.phone?.trim() || "Via website",
      email: body.email,
      serviceType: "Commercial Move",
      pickupAddress: "",
      dropoffAddress: "",
      sourcePage: body.sourcePage,
      notes: `Website commercial enquiry\n\n${body.message.trim()}`,
    });

    return NextResponse.json({
      ok: true,
      mode: "commercial",
      pricing: { quoteRequested: true },
    });
  }

  if (body.mode === "contact") {
    if (!body.name?.trim() || !body.phone?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Name, phone, and email required" },
        { status: 400 },
      );
    }

    await createHubSpotDeal({
      name: body.name,
      phone: body.phone,
      email: body.email,
      serviceType: "Website Enquiry",
      pickupAddress: "",
      dropoffAddress: "",
      sourcePage: body.sourcePage,
      notes: body.message?.trim()
        ? `Website contact form message:\n\n${body.message.trim()}`
        : "Website contact form submission (no message).",
    });

    return NextResponse.json({ ok: true, mode: "contact" });
  }

  if (!body.name || !body.phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone required" },
      { status: 400 },
    );
  }

  if (body.mode === "callback") {
    await createHubSpotDeal({
      name: body.name,
      phone: body.phone,
      email: body.email,
      serviceType: "Callback Request",
      pickupAddress: "",
      dropoffAddress: "",
      sourcePage: body.sourcePage,
      notes: "Customer requested a callback from the website.",
    });

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
    const customQuote = requiresCustomQuote(
      body.pickupAddress,
      body.dropoffAddress,
      body.addressesVerified,
    );

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

    const manualReason = customQuote
      ? result.outOfAuckland
        ? "Outside service area"
        : "Addresses not verified via Places"
      : null;

    await createHubSpotDeal({
      name: body.name,
      phone: body.phone,
      email: body.email,
      serviceType: "House Move",
      pickupAddress: body.pickupAddress,
      dropoffAddress: body.dropoffAddress,
      preferredDate: body.preferredDate,
      estimatedValue: customQuote ? undefined : result.totalIncGst,
      bedrooms: parseRooms(body.bedrooms),
      branch: resolveDealBranch(body),
      sourcePage: body.sourcePage,
      pickupAccess: accessLabel(body.pickupAccess),
      dropoffAccess: accessLabel(body.dropoffAccess),
      addOns: [
        body.wantsPacking ? "Packing" : "",
        body.wantsCleaning ? "Exit cleaning" : "",
        body.wantsInsurance ? "Insurance" : "",
      ].filter(Boolean),
      notes: customQuote
        ? `Website quote: Custom quote needed (${manualReason})\n${parseRooms(body.bedrooms)} rooms, ${body.pickupAddress} to ${body.dropoffAddress}${notesSuffix}`
        : `Website quote: $${result.totalIncGst} incl GST\nCustomer shown range: $${quotePriceRange(result.totalIncGst).lowIncGst} to $${quotePriceRange(result.totalIncGst).highIncGst} incl GST\n${result.breakdown}${notesSuffix}`,
    });

    if (customQuote) {
      return NextResponse.json({
        ok: true,
        mode: "house",
        pricing: { outOfAuckland: true, branch: result.branch },
      });
    }

    return NextResponse.json({
      ok: true,
      mode: "house",
      pricing: withDisplayPricing(result),
    });
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
    const customQuote = requiresCustomQuote(
      body.pickupAddress,
      body.dropoffAddress,
      body.addressesVerified,
    );

    const extraNotes = body.message?.trim()
      ? `\n\nCustomer notes:\n${body.message.trim()}`
      : "";

    const manualReason = customQuote
      ? result.outOfAuckland
        ? "Outside service area"
        : "Addresses not verified via Places"
      : null;

    await createHubSpotDeal({
      name: body.name,
      phone: body.phone,
      email: body.email,
      serviceType: "Piano Move",
      pickupAddress: body.pickupAddress,
      dropoffAddress: body.dropoffAddress,
      estimatedValue: customQuote ? undefined : result.totalIncGst,
      branch: resolveDealBranch(body),
      sourcePage: body.sourcePage,
      pickupAccess: stairsLabel(body.pickupStairFlights),
      dropoffAccess: stairsLabel(body.dropoffStairFlights),
      notes: customQuote
        ? `Website quote: Custom quote needed (${manualReason})\n${body.pianoType} piano, ${body.pickupAddress} to ${body.dropoffAddress}${extraNotes}`
        : `Website quote: $${result.totalIncGst} incl GST\nCustomer shown range: $${quotePriceRange(result.totalIncGst).lowIncGst} to $${quotePriceRange(result.totalIncGst).highIncGst} incl GST\n${result.breakdown}${extraNotes}`,
    });

    if (customQuote) {
      return NextResponse.json({
        ok: true,
        mode: "piano",
        pricing: { outOfAuckland: true, branch: result.branch },
      });
    }

    return NextResponse.json({
      ok: true,
      mode: "piano",
      pricing: withDisplayPricing(result),
    });
  }

  if (body.mode === "office") {
    const serviceType = body.serviceType ?? "Office Move";
    const sizeLabel =
      body.officeSize === "small"
        ? "Small (up to 10 staff)"
        : body.officeSize === "large"
          ? "Large (30+ staff)"
          : body.officeSize === "floor"
            ? "Whole floor / multi-level"
            : "Medium (10 to 30 staff)";

    await createHubSpotDeal({
      name: body.name,
      phone: body.phone,
      email: body.email,
      serviceType,
      pickupAddress: body.pickupAddress,
      dropoffAddress: body.dropoffAddress,
      preferredDate: body.preferredDate,
      branch: resolveDealBranch(body),
      sourcePage: body.sourcePage,
      pickupAccess: accessLabel(body.pickupAccess),
      dropoffAccess: accessLabel(body.dropoffAccess),
      notes: [
        `Website ${serviceType} quote request`,
        `Office size: ${sizeLabel}`,
        `Pickup access: ${body.pickupAccess ?? "easy"}`,
        `Drop-off access: ${body.dropoffAccess ?? "easy"}`,
        body.message?.trim() ? `Details: ${body.message.trim()}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return NextResponse.json({
      ok: true,
      mode: "office",
      pricing: { quoteRequested: true },
    });
  }

  return NextResponse.json({ ok: false, error: "Invalid mode" }, { status: 400 });
}

