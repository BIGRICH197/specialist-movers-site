// Conversation state for the Joey website chat, backed by Redis (lib/kv.ts).
//
// The chat is otherwise stateless (the widget posts the whole transcript each turn).
// For live Slack takeover we need shared, durable state: a record per conversation
// that both the website and Slack read/write, plus a flag that says "a human is
// driving this chat now, so Joey must stay quiet".

import { kvGetJson, kvSetJson, kvConfigured } from "@/lib/kv";

/** Who produced a message — drives bubble styling and Slack posting. */
export type MsgSource = "customer" | "joey" | "human";

export interface StoredMessage {
  source: MsgSource;
  content: string;
  /** Millisecond timestamp; also the cursor the widget polls against. */
  ts: number;
}

export interface Conversation {
  id: string;
  messages: StoredMessage[];
  /** Slack thread root timestamp ("ts") once the thread has been opened. */
  slackThreadTs?: string;
  /** Slack channel id the thread lives in (returned by chat.postMessage). */
  slackChannel?: string;
  /** When true, Joey (the AI) does not reply — a human in Slack is handling it. */
  takenOver: boolean;
  /** Slack user id of whoever took over (for the log). */
  takeoverBy?: string;
  /** True once a HubSpot lead has been created for this chat — stops Joey
   *  creating duplicate deals on later turns (it can't see prior tool calls). */
  leadCaptured?: boolean;
  createdAt: number;
  updatedAt: number;
}

const convKey = (id: string) => `joey:conv:${id}`;
const threadKey = (threadTs: string) => `joey:thread:${threadTs}`;

const TTL_SECONDS = 86_400; // keep conversations for 24h

export function storeConfigured(): boolean {
  return kvConfigured();
}

export async function getConversation(id: string): Promise<Conversation | null> {
  return kvGetJson<Conversation>(convKey(id));
}

export async function saveConversation(conv: Conversation): Promise<void> {
  conv.updatedAt = Date.now();
  await kvSetJson(convKey(conv.id), conv, TTL_SECONDS);
  // Reverse lookup so a Slack reply can find its conversation by thread ts.
  if (conv.slackThreadTs) {
    await kvSetJson(threadKey(conv.slackThreadTs), conv.id, TTL_SECONDS);
  }
}

export async function getConversationIdByThread(
  threadTs: string,
): Promise<string | null> {
  return kvGetJson<string>(threadKey(threadTs));
}

/** Create a fresh conversation record (not yet persisted). */
export function newConversation(id: string): Conversation {
  const now = Date.now();
  return {
    id,
    messages: [],
    takenOver: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function appendMessage(
  conv: Conversation,
  source: MsgSource,
  content: string,
): StoredMessage {
  const msg: StoredMessage = { source, content, ts: Date.now() };
  conv.messages.push(msg);
  return msg;
}
