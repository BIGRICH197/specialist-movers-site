"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING =
  "Kia ora! I'm Aroha from Specialist Movers. I can help you with a quote or answer any questions about our moving services. What can I help with?";

export function ArohaChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

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

  async function sendMessage() {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = (await res.json()) as { content?: string; error?: string };
      if (!res.ok) {
        const fallback =
          data.error === "API key not configured"
            ? "Chat is not set up on this server yet. Call (021) 228 2728 and we will help you straight away."
            : "Sorry, something went wrong. Give us a call on (021) 228 2728!";
        setMessages((prev) => [...prev, { role: "assistant", content: fallback }]);
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
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-brand-purple">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-white">Aroha</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/85">
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span>We&apos;re online now</span>
              </p>
            </div>
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
          <div className="flex items-center gap-1.5 rounded-full border border-brand-purple/10 bg-white px-3 py-1.5 text-xs font-semibold text-brand-purple shadow-[0_8px_24px_-12px_rgba(151,57,176,0.35)]">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span>We&apos;re online now</span>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple text-white shadow-[0_8px_24px_-4px_rgba(151,57,176,0.5)] transition hover:scale-105 hover:shadow-[0_12px_32px_-4px_rgba(151,57,176,0.6)] active:scale-95"
            aria-label="Chat with Aroha"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        </div>
      ) : null}
    </>
  );
}
