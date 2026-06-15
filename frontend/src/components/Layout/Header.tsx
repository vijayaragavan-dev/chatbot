import { Menu, Sparkles, Trash2 } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
  onClearChat: () => void;
}

export function Header({ onToggleSidebar, onClearChat }: HeaderProps) {
  return (
    <header
      className="sticky top-0 z-10 border-b border-surface-800 bg-surface-950/80 backdrop-blur-xl"
      role="banner"
    >
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl hover:bg-surface-800 text-gray-400 hover:text-gray-200
              transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700
              flex items-center justify-center shadow-lg shadow-primary-500/20">
              <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white">AI Assistant</h1>
              <p className="text-[10px] text-gray-500 -mt-0.5">Powered by Groq</p>
            </div>
          </div>
        </div>

        <button
          onClick={onClearChat}
          className="p-2 rounded-xl hover:bg-surface-800 text-gray-400 hover:text-red-400
            transition-colors focus:outline-none focus:ring-2 focus:ring-red-500/50"
          aria-label="Clear chat"
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
