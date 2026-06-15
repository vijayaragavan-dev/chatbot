import { Plus, MessageSquare, Trash2, X } from "lucide-react";

interface SessionItem {
  id: string;
  title: string;
  isActive: boolean;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: SessionItem[];
  onNewChat: () => void;
  onSelectSession: (id: string) => void;
  onDeleteSession: (id: string) => void;
}

export function Sidebar({
  isOpen,
  onClose,
  sessions,
  onNewChat,
  onSelectSession,
  onDeleteSession,
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-surface-950 border-r border-surface-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col`}
        aria-label="Chat history sidebar"
      >
        <div className="p-4 border-b border-surface-800 flex items-center justify-between">
          <button
            onClick={onNewChat}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-700
              text-white text-sm font-medium transition-colors w-full
              focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            New Chat
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-surface-800 text-gray-400 lg:hidden ml-2
              focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-surface-800">
          {sessions.length === 0 ? (
            <p className="text-xs text-gray-600 text-center px-4 py-8">
              No previous conversations
            </p>
          ) : (
            <nav className="space-y-0.5 px-2" role="list">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`group flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer
                    transition-colors ${
                      session.isActive
                        ? "bg-surface-800 text-white"
                        : "text-gray-400 hover:bg-surface-800/50 hover:text-gray-200"
                    }`}
                  onClick={() => onSelectSession(session.id)}
                  role="listitem"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onSelectSession(session.id);
                  }}
                  aria-label={`Chat: ${session.title}`}
                >
                  <MessageSquare className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span className="text-sm truncate flex-1">{session.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteSession(session.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-surface-700
                      text-gray-500 hover:text-red-400 transition-all focus:outline-none
                      focus:opacity-100 focus:ring-2 focus:ring-red-500/50"
                    aria-label={`Delete ${session.title}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </nav>
          )}
        </div>

        <div className="p-4 border-t border-surface-800">
          <p className="text-[10px] text-gray-600 text-center">
            AI Assistant v1.0
          </p>
        </div>
      </aside>
    </>
  );
}
