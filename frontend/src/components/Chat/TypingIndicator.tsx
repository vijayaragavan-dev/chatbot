export function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 animate-fade-in"
      role="status"
      aria-label="AI is typing"
    >
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
        AI
      </div>
      <div className="flex items-center gap-1 px-4 py-3 rounded-2xl bg-surface-800">
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce-dot" style={{ animationDelay: "0s" }} />
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce-dot" style={{ animationDelay: "0.16s" }} />
        <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce-dot" style={{ animationDelay: "0.32s" }} />
      </div>
    </div>
  );
}
