import { NextResponse } from "next/server";
import {
  calculateCleaningQuote,
  type CleaningPropertySize,
} from "@/lib/cleaning-pricing";
import { createHubSpotDeal } from "@/lib/hubspot";
import { detectQuoteBranch } from "@/lib/pricing";
import type { Attribution } from "@/lib/attribution";
import {
  attributionNoteLines,
  classifyTrafficSource,
} from "@/lib/traffic-source";

type CleaningBookingBody = {
  name: string;
  phone: string;
  email?: string;
  propertyAddress: string;
  preferredDate?: string;
  propertySize: CleaningPropertySize;
  bedrooms?: number;
  extraLivingRooms: number;
  cleaningType: string;
  message?: string;
  sourcePage?: string;
  attribution?: Attribution;
};

// service_type_cleaning_options dropdown values in HubSpot.
const cleaningTypeOptions: Record<string, string> = {
  "exit-tenancy": "exit_tenancy_cleaning",
  settlement: "settlement_day_cleaning",
  construction: "construction_cleaning",
};

export async function POST(request: Request) {
  const body = (await request.json()) as CleaningBookingBody;

  if (!body.name?.trim() || !body.phone?.trim() || !body.propertyAddress?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Name, phone, and property address are required" },
      { status: 400 },
    );
  }

  const extraLivingRooms = Math.min(2, Math.max(0, Math.floor(body.extraLivingRooms ?? 0)));

  const quote = calculateCleaningQuote({
    propertySize: body.propertySize,
    extraLivingRooms,
  });

  if (!quote) {
    return NextResponse.json(
      { ok: false, error: "Invalid property size" },
      { status: 400 },
    );
  }

  const cleanTypeLabels: Record<string, string> = {
    "exit-tenancy": "Exit and tenancy clean",
    settlement: "Settlement day clean",
    moving: "House moving clean",
    construction: "Construction clean",
    other: "Other",
  };
  const cleanLabel = cleanTypeLabels[body.cleaningType] ?? body.cleaningType;

  const notes = [
    "Website cleaning quote",
    `Property: ${quote.propertyLabel}`,
    quote.extraLivingRooms > 0 ? `Living rooms: ${quote.extraLivingRooms}` : null,
    `Clean type: ${cleanLabel}`,
    `Fixed price: $${quote.priceExclGst} excl. GST ($${quote.priceIncGst} incl. GST)`,
    body.preferredDate ? `Preferred date: ${body.preferredDate}` : null,
    body.message?.trim() ? `\nNotes:\n${body.message.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await createHubSpotDeal({
    name: body.name.trim(),
    phone: body.phone.trim(),
    email: body.email?.trim(),
    serviceType: "Exit Cleaning",
    pickupAddress: body.propertyAddress.trim(),
    dropoffAddress: "",
    preferredDate: body.preferredDate,
    estimatedValue: quote.priceIncGst,
    bedrooms: body.bedrooms,
    // Blank branch when the address doesn't classify — no wrong tags.
    branch: (() => {
      const b = detectQuoteBranch(body.propertyAddress, body.propertyAddress);
      return b === "manual" ? undefined : b;
    })(),
    sourcePage: body.sourcePage,
    trafficSource: classifyTrafficSource(body.attribution),
    landingPage: body.attribution?.landingPage,
    attributionNote:
      attributionNoteLines(body.attribution).join("\n") || undefined,
    quoteRange: `$${quote.priceIncGst} incl GST (fixed price)`,
    extraProperties: {
      cleaning_address: body.propertyAddress.trim(),
      ...(cleaningTypeOptions[body.cleaningType]
        ? { service_type_cleaning_options: cleaningTypeOptions[body.cleaningType] }
        : {}),
    },
    notes,
  });

  return NextResponse.json({
    ok: true,
    pricing: {
      totalIncGst: quote.priceIncGst,
      priceExclGst: quote.priceExclGst,
      propertyLabel: quote.propertyLabel,
      extraLivingRooms: quote.extraLivingRooms,
    },
  });
}
