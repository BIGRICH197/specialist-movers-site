import { getConversation, storeConfigured } from "@/lib/conversation-store";

// The widget polls this while the chat panel is open to pick up messages a human
// typed in Slack after taking over. Returns only "human" messages newer than the
// cursor (the ts of the last human message the widget has already shown), plus the
// current takeover state.

export async function GET(request: Request) {
  if (!storeConfigured()) {
    return new Response(JSON.stringify({ takenOver: false, messages: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const url = new URL(request.url);
  const conversationId = url.searchParams.get("conversationId");
  const since = Number(url.searchParams.get("since") || "0");

  if (!conversationId) {
    return new Response(JSON.stringify({ takenOver: false, messages: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const conv = await getConversation(conversationId);
  if (!conv) {
    return new Response(JSON.stringify({ takenOver: false, messages: [] }), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const fresh = conv.messages
    .filter((m) => m.source === "human" && m.ts > since)
    .map((m) => ({ content: m.content, ts: m.ts }));

  return new Response(
    JSON.stringify({ takenOver: conv.takenOver, messages: fresh }),
    { headers: { "Content-Type": "application/json" } },
  );
}
