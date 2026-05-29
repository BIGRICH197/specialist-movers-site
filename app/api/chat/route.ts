import Anthropic from "@anthropic-ai/sdk";
import { AROHA_SYSTEM_PROMPT } from "@/lib/aroha-system-prompt";
import {
  calculateHouseMove,
  calculatePianoMove,
  type HouseMoveInput,
  type PianoMoveInput,
} from "@/lib/pricing";
import { createHubSpotDeal } from "@/lib/hubspot";

const tools: Anthropic.Tool[] = [
  {
    name: "calculate_house_move",
    description:
      "Calculate an instant quote for a house move. Returns pricing breakdown.",
    input_schema: {
      type: "object" as const,
      properties: {
        bedrooms: {
          type: "number",
          enum: [1, 2, 3, 4],
          description: "Number of bedrooms (1-4)",
        },
        pickupAddress: { type: "string", description: "Pickup suburb or address" },
        dropoffAddress: { type: "string", description: "Drop-off suburb or address" },
        preferredDate: {
          type: "string",
          description: "Preferred move date in YYYY-MM-DD format (optional)",
        },
        pickupAccess: {
          type: "string",
          enum: ["easy", "hard"],
          description:
            "Access difficulty at pickup (easy = ground level, hard = stairs)",
        },
        dropoffAccess: {
          type: "string",
          enum: ["easy", "hard"],
          description: "Access difficulty at drop-off",
        },
        wantsPacking: { type: "boolean", description: "Whether customer wants packing service" },
        wantsCleaning: { type: "boolean", description: "Whether customer wants exit cleaning" },
      },
      required: [
        "bedrooms",
        "pickupAddress",
        "dropoffAddress",
        "pickupAccess",
        "dropoffAccess",
      ],
    },
  },
  {
    name: "calculate_piano_move",
    description:
      "Calculate an instant quote for a piano move. Returns pricing breakdown.",
    input_schema: {
      type: "object" as const,
      properties: {
        pianoType: {
          type: "string",
          enum: ["upright", "grand"],
          description: "Type of piano",
        },
        pickupAddress: { type: "string", description: "Pickup suburb or address" },
        dropoffAddress: { type: "string", description: "Drop-off suburb or address" },
        pickupStairFlights: {
          type: "number",
          description: "Number of flights of stairs at pickup (0 if ground level)",
        },
        dropoffStairFlights: {
          type: "number",
          description: "Number of flights of stairs at drop-off (0 if ground level)",
        },
      },
      required: [
        "pianoType",
        "pickupAddress",
        "dropoffAddress",
        "pickupStairFlights",
        "dropoffStairFlights",
      ],
    },
  },
  {
    name: "capture_lead",
    description:
      "Save a customer's contact details as a lead in our system. Call this once you have at least their name and phone number.",
    input_schema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Customer's full name" },
        phone: { type: "string", description: "Phone number" },
        email: { type: "string", description: "Email address (optional)" },
        serviceType: { type: "string", description: "Type of service they're interested in" },
        pickupAddress: { type: "string", description: "Pickup address if known" },
        dropoffAddress: { type: "string", description: "Drop-off address if known" },
        notes: { type: "string", description: "Any relevant notes about the enquiry" },
      },
      required: ["name", "phone", "serviceType"],
    },
  },
];

function executeTool(name: string, input: Record<string, unknown>): string {
  if (name === "calculate_house_move") {
    const result = calculateHouseMove(input as unknown as HouseMoveInput);
    return JSON.stringify(result);
  }
  if (name === "calculate_piano_move") {
    const result = calculatePianoMove(input as unknown as PianoMoveInput);
    return JSON.stringify(result);
  }
  if (name === "capture_lead") {
    createHubSpotDeal({
      name: input.name as string,
      phone: input.phone as string,
      email: (input.email as string) || undefined,
      serviceType: (input.serviceType as string) || "Website Chat",
      pickupAddress: (input.pickupAddress as string) || "",
      dropoffAddress: (input.dropoffAddress as string) || "",
      notes: `Aroha chatbot lead\n${(input.notes as string) || ""}`,
    }).catch(console.error);
    return JSON.stringify({ success: true, message: "Lead saved successfully" });
  }
  return JSON.stringify({ error: "Unknown tool" });
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages } = (await request.json()) as {
    messages: Array<{ role: "user" | "assistant"; content: string }>;
  };

  const client = new Anthropic({ apiKey });

  let currentMessages: Anthropic.MessageParam[] = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const MAX_TOOL_ROUNDS = 5;
  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: AROHA_SYSTEM_PROMPT,
      tools,
      messages: currentMessages,
    });

    const toolUseBlocks = response.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
    );

    if (toolUseBlocks.length === 0) {
      const text = response.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("");

      return new Response(JSON.stringify({ role: "assistant", content: text }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    currentMessages = [
      ...currentMessages,
      { role: "assistant", content: response.content },
      {
        role: "user",
        content: toolUseBlocks.map((toolBlock) => ({
          type: "tool_result" as const,
          tool_use_id: toolBlock.id,
          content: executeTool(toolBlock.name, toolBlock.input as Record<string, unknown>),
        })),
      },
    ];
  }

  return new Response(
    JSON.stringify({
      role: "assistant",
      content:
        "I'm having a bit of trouble with that right now. Give us a call on (021) 228 2728 and the team will sort you out!",
    }),
    { headers: { "Content-Type": "application/json" } },
  );
}

