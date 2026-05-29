"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
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
      const data = (await res.json()) as { content?: string };
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

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-[100] flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl border-2 border-brand-purple/15 bg-white shadow-[0_20px_60px_-12px_rgba(151,57,176,0.25)] sm:bottom-28 sm:right-6">
          <div className="flex items-center gap-3 bg-brand-purple px-4 py-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-yellow text-brand-purple">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">Aroha</p>
              <p className="text-xs text-white/70">Specialist Movers</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="flex-1 space-y-3 overflow-y-auto p-4"
            style={{ maxHeight: "400px", minHeight: "200px" }}
          >
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
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md bg-brand-purple/[0.06] px-4 py-2.5">
                  <Loader2 className="h-4 w-4 animate-spin text-brand-purple/50" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-brand-purple/10 p-3">
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
                className="h-10 flex-1 rounded-full border-2 border-brand-purple/15 bg-white px-4 text-sm text-brand-purple placeholder:text-brand-purple/40 outline-none transition focus:border-brand-yellow focus:ring-2 focus:ring-brand-yellow/45"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white transition hover:bg-brand-purple/90 disabled:opacity-40"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-4 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-brand-purple text-white shadow-[0_8px_24px_-4px_rgba(151,57,176,0.5)] transition hover:scale-105 hover:shadow-[0_12px_32px_-4px_rgba(151,57,176,0.6)] active:scale-95 sm:right-6"
        aria-label={isOpen ? "Close chat" : "Chat with Aroha"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>
    </>
  );
}

