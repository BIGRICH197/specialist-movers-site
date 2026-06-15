import { verifySlackSignature, postSlackMessage } from "@/lib/slack";
import { kvSetIfAbsent } from "@/lib/kv";
import {
  appendMessage,
  getConversation,
  getConversationIdByThread,
  saveConversation,
} from "@/lib/conversation-store";

// Inbound webhook for Slack Events API. Fires when a team member replies in a
// chat thread (message.channels / message.groups). A reply takes over the chat
// (Joey goes silent) and the text is delivered to the customer via /api/chat/poll.
// Typing "!joey" hands the conversation back to the bot.

const HANDBACK = "!joey";

/** Slack escapes a few characters in message text; undo the common ones. */
function unescapeSlack(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

interface SlackEvent {
  type?: string;
  subtype?: string;
  bot_id?: string;
  user?: string;
  text?: string;
  thread_ts?: string;
  channel?: string;
}

export async function POST(request: Request) {
  const raw = await request.text();
  const timestamp = request.headers.get("x-slack-request-timestamp");
  const signature = request.headers.get("x-slack-signature");

  if (!verifySlackSignature(raw, timestamp, signature)) {
    return new Response("invalid signature", { status: 401 });
  }

  let body: {
    type?: string;
    challenge?: string;
    event?: SlackEvent;
    event_id?: string;
  };
  try {
    body = JSON.parse(raw);
  } catch {
    return new Response("bad json", { status: 400 });
  }

  // URL verification handshake when wiring up Event Subscriptions.
  if (body.type === "url_verification") {
    return new Response(JSON.stringify({ challenge: body.challenge }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Drop duplicate deliveries (Slack retries on any non-200 / slow response).
  if (body.event_id) {
    const firstTime = await kvSetIfAbsent(`joey:evt:${body.event_id}`, 600);
    if (!firstTime) return new Response("ok", { status: 200 });
  }

  const event = body.event;
  // Allow normal replies AND "also sent to channel" replies (thread_broadcast).
  const okSubtype = !event?.subtype || event.subtype === "thread_broadcast";
  console.log(
    "[slack] event:",
    JSON.stringify({
      type: event?.type,
      subtype: event?.subtype,
      bot_id: event?.bot_id,
      thread_ts: event?.thread_ts,
      hasText: !!event?.text,
    }),
  );
  if (
    !event ||
    event.type !== "message" ||
    !okSubtype || // edits, joins, bot_message, etc.
    event.bot_id || // our own posts echo back — ignore
    !event.thread_ts || // only thread replies are takeovers
    !event.text
  ) {
    console.log("[slack] ignored (filter)");
    return new Response("ok", { status: 200 });
  }

  const conversationId = await getConversationIdByThread(event.thread_ts);
  console.log("[slack] thread", event.thread_ts, "-> conv", conversationId);
  if (!conversationId) return new Response("ok", { status: 200 });

  const conv = await getConversation(conversationId);
  if (!conv) {
    console.log("[slack] conv not found in store:", conversationId);
    return new Response("ok", { status: 200 });
  }

  const text = unescapeSlack(event.text.trim());

  if (text.toLowerCase() === HANDBACK) {
    conv.takenOver = false;
    conv.takeoverBy = undefined;
    await saveConversation(conv);
    if (conv.slackThreadTs) {
      await postSlackMessage({
        channel: conv.slackChannel || event.channel || "",
        threadTs: conv.slackThreadTs,
        text: "🤖 Handed back to Joey. The bot will reply to the customer again.",
        username: "Joey",
        iconEmoji: ":robot_face:",
      });
    }
    return new Response("ok", { status: 200 });
  }

  // A human reply: take over (if not already) and deliver the text to the customer.
  const wasFirstTakeover = !conv.takenOver;
  conv.takenOver = true;
  conv.takeoverBy = event.user;
  appendMessage(conv, "human", text);
  await saveConversation(conv);
  console.log("[slack] TAKEOVER saved for", conversationId, "text:", text.slice(0, 40));

  if (wasFirstTakeover && conv.slackThreadTs) {
    await postSlackMessage({
      channel: conv.slackChannel || event.channel || "",
      threadTs: conv.slackThreadTs,
      text: "✋ A team member has taken over this chat. Joey is now paused. Type `!joey` to hand it back.",
      username: "Joey",
      iconEmoji: ":robot_face:",
    });
  }

  return new Response("ok", { status: 200 });
}
