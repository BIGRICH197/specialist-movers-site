import Anthropic from "@anthropic-ai/sdk";
import { JOEY_SYSTEM_PROMPT } from "@/lib/joey-system-prompt";
import {
  calculateHouseMove,
  calculatePianoMove,
  type HouseMoveInput,
  type PianoMoveInput,
} from "@/lib/pricing";
import { createHubSpotDeal, HUBSPOT_OWNERS } from "@/lib/hubspot";
import { isDialable } from "@/lib/phone";
import { isEmailish } from "@/lib/email";
import { postSlackMessage, slackChannel, slackConfigured } from "@/lib/slack";
import {
  appendMessage,
  getConversation,
  newConversation,
  saveConversation,
  storeConfigured,
  type Conversation,
} from "@/lib/conversation-store";

const WEEKDAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

/** Convert a day-of-week (e.g. "tuesday") to the next matching YYYY-MM-DD date. */
function nextDateForDay(day: string): string | undefined {
  const idx = WEEKDAYS.indexOf(day.toLowerCase());
  if (idx === -1) return undefined;
  const today = new Date();
  const diff = ((idx - today.getDay() + 7) % 7) || 7;
  const d = new Date(today);
  d.setDate(today.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

const tools: Anthropic.Tool[] = [
  {
    name: "calculate_house_move",
    description:
      "Calculate an instant quote for a home relocation. Returns pricing breakdown.",
    input_schema: {
      type: "object" as const,
      properties: {
        bedrooms: {
          type: "number",
          enum: [1, 2, 3, 4],
          description:
            "Number of rooms (1-4). Moving uses 2 movers for 1-3 rooms and 3 movers for 4 rooms. Cleaning is a fixed price per room count. Packing is a starting price per room count, confirmed as a fixed price only after a viewing, so present it as a 'from' figure.",
        },
        pickupAddress: { type: "string", description: "Pickup suburb or address" },
        dropoffAddress: { type: "string", description: "Drop-off suburb or address" },
        preferredDate: {
          type: "string",
          description: "Preferred move date in YYYY-MM-DD format (optional)",
        },
        dayOfWeek: {
          type: "string",
          enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
          description:
            "Preferred day of the week for the move (optional). Use this when the customer gives a day rather than a specific date.",
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
      "Save a customer's contact details as a lead in our system. Call this as soon as you have their name plus EITHER a phone number or an email address. Never wait for both.",
    input_schema: {
      type: "object" as const,
      properties: {
        name: { type: "string", description: "Customer's full name" },
        phone: {
          type: "string",
          description: "Phone number (optional if you have an email instead)",
        },
        email: {
          type: "string",
          description: "Email address (optional if you have a phone number instead)",
        },
        serviceType: { type: "string", description: "Type of service they're interested in" },
        pickupAddress: { type: "string", description: "Pickup address if known" },
        dropoffAddress: { type: "string", description: "Drop-off address if known" },
        notes: { type: "string", description: "Any relevant notes about the enquiry" },
      },
      // Only the name is structurally required — a lead with just an email is
      // still a lead, and the team can work either contact route. The tool
      // itself rejects a save with neither a dialable phone nor a valid email,
      // so collect at least one before calling.
      required: ["name", "serviceType"],
    },
  },
];

async function executeTool(
  name: string,
  input: Record<string, unknown>,
  conv?: Conversation,
): Promise<string> {
  if (name === "calculate_house_move") {
    const raw = { ...input } as Record<string, unknown>;
    if (!raw.preferredDate && typeof raw.dayOfWeek === "string") {
      const dt = nextDateForDay(raw.dayOfWeek);
      if (dt) raw.preferredDate = dt;
    }
    const result = calculateHouseMove(raw as unknown as HouseMoveInput);
    return JSON.stringify(result);
  }
  if (name === "calculate_piano_move") {
    const result = calculatePianoMove(input as unknown as PianoMoveInput);
    return JSON.stringify(result);
  }
  if (name === "capture_lead") {
    // A lead the team cannot reach is not a lead. Validate BEFORE the
    // duplicate guard so a bad first attempt doesn't lock out the corrected
    // retry — the error message goes back to Joey, who re-asks the customer.
    const phone = ((input.phone as string) || "").trim();
    const email = ((input.email as string) || "").trim();
    const phoneOk = phone !== "" && isDialable(phone);
    const emailOk = email !== "" && isEmailish(email);
    if (!phoneOk && !emailOk) {
      return JSON.stringify({
        success: false,
        message:
          phone || email
            ? "Those contact details don't look reachable (phone not dialable / email malformed). Double-check them with the customer and call this tool again."
            : "A phone number or email is needed before the lead can be saved. Ask the customer for one, then call this tool again.",
      });
    }
    // One deal per conversation. The chat re-runs each turn with only the text
    // transcript, so Joey can't see it already saved a lead — without this guard
    // it creates a duplicate deal on every later turn.
    if (conv) {
      if (conv.leadCaptured) {
        return JSON.stringify({
          success: true,
          message: "Lead already saved earlier in this conversation",
        });
      }
      // Set before the await so a second call in the same turn is skipped too.
      conv.leadCaptured = true;
    }
    // A phone that failed validation still goes into the note as typed —
    // never discard what the customer said — but not into the phone field.
    const badDetail = [
      phone && !phoneOk ? `Phone as typed (NOT dialable): ${phone}` : "",
      email && !emailOk ? `Email as typed (malformed): ${email}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    await createHubSpotDeal({
      name: input.name as string,
      phone: phoneOk ? phone : undefined,
      email: emailOk ? email : undefined,
      serviceType: (input.serviceType as string) || "Website Chat",
      pickupAddress: (input.pickupAddress as string) || "",
      dropoffAddress: (input.dropoffAddress as string) || "",
      notes: `Joey chatbot lead\n${(input.notes as string) || ""}${badDetail ? `\n${badDetail}` : ""}`,
      source: "Chat Bot",
      ownerId: HUBSPOT_OWNERS.danielle,
    });
    return JSON.stringify({ success: true, message: "Lead saved successfully" });
  }
  return JSON.stringify({ error: "Unknown tool" });
}

const JOEY_ICON = ":robot_face:";
const VISITOR_ICON = ":bust_in_silhouette:";

/**
 * Mirror a chat into Slack. Opens a thread on the first message, then replies
 * inside it. Best-effort: any failure is logged and swallowed so chat keeps working.
 */
async function mirrorToSlack(
  conv: Conversation,
  who: "customer" | "joey",
  text: string,
): Promise<void> {
  if (!slackConfigured()) return;
  const channel = slackChannel();
  if (!channel) return;

  try {
    // Open the thread with a scannable header on the very first message.
    // Include the customer's opening line so each thread is distinguishable
    // at a glance in the channel list.
    if (!conv.slackThreadTs) {
      const snippet = text.length > 90 ? `${text.slice(0, 90)}…` : text;
      const root = await postSlackMessage({
        channel,
        text:
          `🟢 *New website chat*\n💬 “${snippet}”\n_Reply in this thread to take over from Joey. Type_ \`!joey\` _to hand it back._`,
        username: "Joey",
        iconEmoji: JOEY_ICON,
      });
      if (root.ok && root.ts) {
        conv.slackThreadTs = root.ts;
        conv.slackChannel = root.channel || channel;
      }
    }

    if (!conv.slackThreadTs) return; // couldn't open a thread; give up quietly

    await postSlackMessage({
      channel: conv.slackChannel || channel,
      threadTs: conv.slackThreadTs,
      text,
      username: who === "customer" ? "Website visitor" : "Joey",
      iconEmoji: who === "customer" ? VISITOR_ICON : JOEY_ICON,
    });
  } catch (err) {
    console.error("mirrorToSlack failed:", err);
  }
}

async function runJoey(
  messages: Array<{ role: "user" | "assistant"; content: string }>,
  apiKey: string,
  conv?: Conversation,
): Promise<string> {
  const client = new Anthropic({ apiKey });
  let currentMessages: Anthropic.MessageParam[] = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  // Joey needs to know today's date (NZ time) so "tomorrow" / "the 8th" resolve
  // to the right day and year — otherwise it guesses and can quote the wrong day.
  const today = new Date().toLocaleDateString("en-NZ", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Pacific/Auckland",
  });
  const system = `${JOEY_SYSTEM_PROMPT}\n\n## Today's date\nToday is ${today} (New Zealand time). Use this to work out dates like "tomorrow" or "the 8th" correctly, and always assume the current or next upcoming date, never a past one.`;

  const MAX_TOOL_ROUNDS = 5;
  for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system,
      tools,
      messages: currentMessages,
    });

    const toolUseBlocks = response.content.filter(
      (b): b is Anthropic.ToolUseBlock => b.type === "tool_use",
    );

    if (toolUseBlocks.length === 0) {
      return response.content
        .filter((b): b is Anthropic.TextBlock => b.type === "text")
        .map((b) => b.text)
        .join("");
    }

    currentMessages = [
      ...currentMessages,
      { role: "assistant", content: response.content },
      {
        role: "user",
        content: await Promise.all(
          toolUseBlocks.map(async (toolBlock) => ({
            type: "tool_result" as const,
            tool_use_id: toolBlock.id,
            content: await executeTool(
              toolBlock.name,
              toolBlock.input as Record<string, unknown>,
              conv,
            ),
          })),
        ),
      },
    ];
  }

  return "I'm having a bit of trouble with that right now. Give us a call on (021) 228 2728 and the team will sort you out!";
}

export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages, conversationId } = (await request.json()) as {
    messages: Array<{ role: "user" | "assistant"; content: string }>;
    conversationId?: string;
  };

  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const newUserText = lastUser?.content?.trim() || "";

  // --- Stateful path: Slack mirroring + human takeover (store must be configured) ---
  if (conversationId && storeConfigured()) {
    let conv = await getConversation(conversationId);
    if (!conv) conv = newConversation(conversationId);

    if (newUserText) {
      appendMessage(conv, "customer", newUserText);
      await mirrorToSlack(conv, "customer", newUserText);
    }

    // A human is driving this chat — Joey stays silent. The widget will poll
    // /api/chat/poll for the human's replies coming back from Slack.
    if (conv.takenOver) {
      await saveConversation(conv);
      return new Response(JSON.stringify({ takenOver: true, content: null }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const reply = await runJoey(messages, apiKey, conv);
    appendMessage(conv, "joey", reply);
    await mirrorToSlack(conv, "joey", reply);
    await saveConversation(conv);

    return new Response(JSON.stringify({ role: "assistant", content: reply }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // --- Fallback path: plain stateless bot (store/Slack not configured) ---
  const reply = await runJoey(messages, apiKey);
  return new Response(JSON.stringify({ role: "assistant", content: reply }), {
    headers: { "Content-Type": "application/json" },
  });
}
