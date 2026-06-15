import { useState, useRef, useCallback } from "react";
import type { Message } from "@/types/chat";
import { sendMessageStream } from "@/api/chat";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const STORAGE_KEY = "ai-chat-session-id";

function createMessage(role: "user" | "assistant", content: string): Message {
  return { id: crypto.randomUUID(), role, content, timestamp: new Date() };
}

export function useChat() {
  const [sessionId, setSessionId] = useLocalStorage<string | null>(STORAGE_KEY, null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMsg = createMessage("user", text);
      const assistantMsg = createMessage("assistant", "");

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setIsLoading(true);
      setError(null);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        let accumulated = "";
        const generator = sendMessageStream(
          { session_id: sessionId, message: text },
          controller.signal,
        );

        for await (const data of generator) {
          if (data.error) {
            setError(data.error);
            break;
          }
          if (data.token !== undefined) {
            accumulated += data.token;
            setMessages((prev) => {
              const updated = [...prev];
              const last = updated[updated.length - 1];
              if (last && last.role === "assistant") {
                updated[updated.length - 1] = { ...last, content: accumulated };
              }
              return updated;
            });
          }
          if (data.done && data.session_id) {
            setSessionId(data.session_id);
          }
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          setMessages((prev) => prev.slice(0, -1));
        } else {
          setError((err as Error).message);
          setMessages((prev) => {
            const updated = [...prev];
            const last = updated[updated.length - 1];
            if (last && last.role === "assistant" && !last.content) {
              updated.pop();
            }
            return updated;
          });
        }
      } finally {
        setIsLoading(false);
        abortRef.current = null;
      }
    },
    [sessionId, setSessionId],
  );

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort();
  }, []);

  const regenerate = useCallback(async () => {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUserMsg) return;
    setMessages((prev) => prev.slice(0, -2));
    await sendMessage(lastUserMsg.content);
  }, [messages, sendMessage]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setSessionId(null);
    setError(null);
  }, [setSessionId]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    stopGeneration,
    regenerate,
    clearChat,
    sessionId,
  } as const;
}
