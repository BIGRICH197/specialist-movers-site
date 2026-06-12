import { NextResponse } from "next/server";
import {
  calculateCleaningQuote,
  type CleaningPropertySize,
} from "@/lib/cleaning-pricing";
import { createHubSpotDeal } from "@/lib/hubspot";

type CleaningBookingBody = {
  name: string;
  phone: string;
  email?: string;
  propertyAddress: string;
  preferredDate?: string;
  propertySize: CleaningPropertySize;
  extraLivingRooms: number;
  cleaningType: string;
  message?: string;
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
