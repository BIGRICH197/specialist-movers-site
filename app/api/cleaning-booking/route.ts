import { NextResponse } from "next/server";
import { createHubSpotDeal } from "@/lib/hubspot";
import type { CleaningPackage, CleaningPropertySize } from "@/lib/cleaning-pricing";
import { getCleaningPropertyOption } from "@/lib/cleaning-pricing";

type CleaningBookingBody = {
  name: string;
  phone: string;
  email?: string;
  propertyAddress: string;
  preferredDate?: string;
  propertySize: CleaningPropertySize;
  propertyLabel?: string;
  cleaningPackage: CleaningPackage;
  extraLivingRooms: number;
  cleaningType: string;
  priceExclGst: number;
  priceIncGst?: number;
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

  if (typeof body.priceExclGst !== "number" || body.priceExclGst <= 0) {
    return NextResponse.json({ ok: false, error: "Invalid price" }, { status: 400 });
  }

  const property =
    body.propertyLabel ?? getCleaningPropertyOption(body.propertySize)?.label ?? body.propertySize;
  const packageLabel = body.cleaningPackage === "option1" ? "Option 1" : "Option 2";
  const extraRooms = Math.max(0, Math.floor(body.extraLivingRooms ?? 0));

  const notes = [
    "Website cleaning booking",
    `Property: ${property}`,
    `Package: ${packageLabel}`,
    extraRooms > 0 ? `Extra living rooms: ${extraRooms}` : null,
    `Clean type: ${body.cleaningType}`,
    `Fixed price: $${body.priceExclGst} excl. GST`,
    body.priceIncGst ? `($${body.priceIncGst} incl. GST)` : null,
    body.preferredDate ? `Preferred date: ${body.preferredDate}` : null,
    body.message?.trim() ? `\nNotes:\n${body.message.trim()}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  createHubSpotDeal({
    name: body.name.trim(),
    phone: body.phone.trim(),
    email: body.email?.trim(),
    serviceType: "Exit Cleaning",
    pickupAddress: body.propertyAddress.trim(),
    dropoffAddress: "",
    preferredDate: body.preferredDate,
    estimatedValue: body.priceIncGst ?? Math.round(body.priceExclGst * 1.15),
    notes,
  }).catch(console.error);

  return NextResponse.json({ ok: true });
}
