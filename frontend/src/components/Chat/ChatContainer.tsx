import { useEffect, useRef } from "react";
import type { Message } from "@/types/chat";
import { ChatMessage } from "@/components/Chat/ChatMessage";
import { WelcomeScreen } from "@/components/Chat/WelcomeScreen";
import { ErrorState } from "@/components/UI/ErrorState";

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSend: (message: string) => void;
  onRetry: () => void;
}

export function ChatContainer({
  messages,
  isLoading,
  error,
  onSend,
  onRetry,
}: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  if (messages.length === 0 && !error) {
    return <WelcomeScreen onSelectPrompt={onSend} />;
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-surface-700 scrollbar-track-transparent">
      <div className="max-w-4xl mx-auto py-4">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {error && (
          <ErrorState message={error} onRetry={onRetry} />
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}
