"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, Send, Loader2, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING = "Hey! How can I help you today?";

const ONLINE_PILL_KEY = "joey-online-dismissed";

// Avatar shown on the launcher bubble and in the chat header. A real face reads
// as "a real person is here now", which lifts engagement over a generic icon.
const AVATAR_SRC = "/richard-online.png";
const AVATAR_ALT = "Richard from Specialist Movers, online now";

// Office line — same number the site uses everywhere as the call-to-action.
const CALL_TEL = "+64212282728";
const CALL_DISPLAY = "(021) 228 2728";

export function JoeyChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [onlinePillVisible, setOnlinePillVisible] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Stable id so the website chat and the Slack thread refer to the same chat.
  const conversationIdRef = useRef<string>("");
  // Cursor: ts of the last human (Slack takeover) message we've already shown.
  const pollCursorRef = useRef<number>(0);
  // Only start polling once the visitor has sent a message (avoids idle traffic
  // from people who open the widget but never type).
  const hasInteractedRef = useRef<boolean>(false);

  if (!conversationIdRef.current && typeof window !== "undefined") {
    // Fresh conversation per page load. JoeyChat lives in the root layout, so it
    // stays mounted across in-app navigation (the chat continues) and only resets
    // on a full page reload — which the visitor experiences as a new chat.
    // We deliberately do NOT persist this in sessionStorage: a reused id would
    // resurface a previous (possibly taken-over) conversation and replay its
    // messages into the new chat.
    conversationIdRef.current =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `c-${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
    // Only show human (takeover) replies that arrive after load — never replay
    // history.
    pollCursorRef.current = Date.now();
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (sessionStorage.getItem(ONLINE_PILL_KEY) === "1") {
      setOnlinePillVisible(false);
    }
  }, []);

  function dismissOnlinePill() {
    setOnlinePillVisible(false);
    sessionStorage.setItem(ONLINE_PILL_KEY, "1");
  }

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || typeof window === "undefined") return;
    const viewport = window.visualViewport;
    if (!viewport) return;

    const syncKeyboardOffset = () => {
      const offset = Math.max(
        0,
        window.innerHeight - viewport.height - viewport.offsetTop,
      );
      setKeyboardOffset(offset);
    };

    viewport.addEventListener("resize", syncKeyboardOffset);
    viewport.addEventListener("scroll", syncKeyboardOffset);
    syncKeyboardOffset();

    return () => {
      viewport.removeEventListener("resize", syncKeyboardOffset);
      viewport.removeEventListener("scroll", syncKeyboardOffset);
      setKeyboardOffset(0);
    };
  }, [isOpen]);

  // While the panel is open, poll for replies a team member typed in Slack
  // after taking over the chat. They arrive as normal assistant bubbles.
  useEffect(() => {
    if (!isOpen) return;
    const conversationId = conversationIdRef.current;
    if (!conversationId) return;

    let cancelled = false;
    const tick = async () => {
      // Keep the request volume low so Vercel's DDoS protection doesn't flag the
      // site: only poll once the visitor has actually sent a message, and never
      // while the tab is hidden.
      if (!hasInteractedRef.current) return;
      if (typeof document !== "undefined" && document.hidden) return;
      try {
        const res = await fetch(
          `/api/chat/poll?conversationId=${encodeURIComponent(conversationId)}&since=${pollCursorRef.current}`,
          { cache: "no-store" },
        );
        if (!res.ok) return;
        const data = (await res.json()) as {
          messages?: { content: string; ts: number }[];
        };
        if (cancelled || !data.messages?.length) return;
        for (const m of data.messages) {
          if (m.ts > pollCursorRef.current) pollCursorRef.current = m.ts;
        }
        setMessages((prev) => [
          ...prev,
          ...data.messages!.map((m) => ({
            role: "assistant" as const,
            content: m.content,
          })),
        ]);
      } catch {
        /* network blip — try again next tick */
      }
    };

    const interval = setInterval(tick, 6000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [isOpen]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    hasInteractedRef.current = true;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          conversationId: conversationIdRef.current,
        }),
      });
      const data = (await res.json()) as {
        content?: string;
        error?: string;
        takenOver?: boolean;
      };
      if (!res.ok) {
        const fallback =
          data.error === "API key not configured"
            ? "Chat is not set up on this server yet. Call (021) 228 2728 and we will help you straight away."
            : "Sorry, something went wrong. Give us a call on (021) 228 2728!";
        setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
        return;
      }
      // A team member is handling this chat — stay quiet; their reply will
      // arrive via the poll above.
      if (data.takenOver && !data.content) {
        return;
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.content ||
            "Sorry, something went wrong. Give us a call on (021) 228 2728!",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm having trouble connecting right now. Give us a call on (021) 228 2728 and the team will help you out!",
        },
      ]);
    }
    setIsLoading(false);
  }

  const fabBottom = "calc(1.5rem + env(safe-area-inset-bottom, 0px))";

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-[240] bg-brand-purple/20 sm:hidden"
          aria-label="Close chat"
          onClick={() => setIsOpen(false)}
        />
      ) : null}

      {isOpen ? (
        <div
          className={cn(
            "fixed z-[250] flex flex-col overflow-hidden border-brand-purple/15 bg-white shadow-[0_20px_60px_-12px_rgba(151,57,176,0.25)]",
            "inset-x-0 bottom-0 max-h-[min(88dvh,40rem)] rounded-t-2xl border-t-2",
            "sm:inset-x-auto sm:bottom-28 sm:right-6 sm:max-h-[min(60dvh,28rem)] sm:w-[min(380px,calc(100%-3rem))] sm:max-w-[380px] sm:rounded-2xl sm:border-2",
          )}
          style={{
            bottom: keyboardOffset > 0 ? `${keyboardOffset}px` : undefined,
          }}
        >
          <div className="flex shrink-0 items-center gap-3 bg-brand-purple px-4 py-3">
            <div className="relative shrink-0">
              <span className="block h-10 w-10 overflow-hidden rounded-full border-2 border-white/70">
                <Image
                  src={AVATAR_SRC}
                  alt={AVATAR_ALT}
                  width={88}
                  height={88}
                  unoptimized
                  loading="eager"
                  className="h-full w-full object-cover"
                />
              </span>
              <span
                className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5"
                aria-hidden
              >
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 ring-2 ring-brand-purple" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white">Joey</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/85">
                <span>We&apos;re online now</span>
              </p>
            </div>
            <a
              href={`tel:${CALL_TEL}`}
              className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-emerald-500 pl-2.5 pr-3 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-600"
              aria-label={`Call us now on ${CALL_DISPLAY}`}
            >
              <Phone className="h-3.5 w-3.5" />
              Call now
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="scrollbar-brand min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "rounded-br-md bg-brand-yellow text-brand-purple"
                      : "rounded-bl-md bg-brand-purple/[0.06] text-brand-purple"
                  }`}
                >
                  {msg.content.split("\n").map((line, j) => (
                    <p key={j} className={j > 0 ? "mt-1.5" : ""}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading ? (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-brand-purple/[0.06] px-4 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin text-brand-purple/50" />
                </div>
              </div>
            ) : null}
            <div ref={messagesEndRef} />
          </div>

          <div className="shrink-0 border-t border-brand-purple/10 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                className="h-11 min-w-0 flex-1 rounded-full border-2 border-brand-purple/15 bg-white px-4 text-base text-brand-purple placeholder:text-brand-purple/40 outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/45"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white transition hover:bg-brand-purple/90 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {!isOpen ? (
        <div
          className="fixed right-4 z-[250] flex flex-col items-end gap-2 sm:right-6"
          style={{ bottom: fabBottom }}
        >
          {onlinePillVisible ? (
            <div className="flex items-center gap-1.5 rounded-full border border-brand-purple/10 bg-white py-1.5 pl-3 pr-1.5 text-xs font-semibold text-brand-purple shadow-[0_8px_24px_-12px_rgba(151,57,176,0.35)]">
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span>We&apos;re online now</span>
              <button
                type="button"
                onClick={dismissOnlinePill}
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-brand-purple/45 transition hover:bg-brand-purple/5 hover:text-brand-purple"
                aria-label="Dismiss online notice"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : null}
          <button
            onClick={() => setIsOpen(true)}
            className="relative h-16 w-16 rounded-full shadow-[0_8px_24px_-4px_rgba(151,57,176,0.5)] transition hover:scale-105 hover:shadow-[0_12px_32px_-4px_rgba(151,57,176,0.6)] active:scale-95"
            aria-label="Chat with us, we're online now"
          >
            <span className="block h-16 w-16 overflow-hidden rounded-full border-2 border-brand-purple">
              <Image
                src={AVATAR_SRC}
                alt={AVATAR_ALT}
                width={88}
                height={88}
                unoptimized
                priority
                className="h-full w-full object-cover"
              />
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-5 w-5 rounded-full bg-emerald-500 ring-2 ring-white" />
            </span>
          </button>
        </div>
      ) : null}
    </>
  );
}
