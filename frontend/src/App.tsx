import { useState, useCallback } from "react";
import { useChat } from "@/hooks/useChat";
import { Header } from "@/components/Layout/Header";
import { Sidebar } from "@/components/Layout/Sidebar";
import { ChatContainer } from "@/components/Chat/ChatContainer";
import { ChatInput } from "@/components/Chat/ChatInput";

export default function App() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    stopGeneration,
    regenerate,
    clearChat,
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSend = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage],
  );

  const handleRetry = useCallback(() => {
    regenerate();
  }, [regenerate]);

  const handleClearChat = useCallback(() => {
    clearChat();
  }, [clearChat]);

  return (
    <div className="h-screen flex bg-surface-950 text-white overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sessions={[]}
        onNewChat={handleClearChat}
        onSelectSession={() => {}}
        onDeleteSession={() => {}}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          onClearChat={handleClearChat}
        />

        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          error={error}
          onSend={handleSend}
          onRetry={handleRetry}
        />

        <ChatInput
          onSend={handleSend}
          onStop={stopGeneration}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
