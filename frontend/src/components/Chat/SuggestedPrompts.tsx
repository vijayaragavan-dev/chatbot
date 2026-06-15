import { Lightbulb, Code, PenLine, Globe } from "lucide-react";
import type { ReactNode } from "react";

interface Prompt {
  icon: ReactNode;
  label: string;
  text: string;
}

const prompts: Prompt[] = [
  {
    icon: <Lightbulb className="w-4 h-4 text-yellow-400" aria-hidden="true" />,
    label: "Explain a concept",
    text: "Explain how neural networks work in simple terms",
  },
  {
    icon: <Code className="w-4 h-4 text-blue-400" aria-hidden="true" />,
    label: "Write code",
    text: "Write a Python function to sort a list of dictionaries by a key",
  },
  {
    icon: <PenLine className="w-4 h-4 text-green-400" aria-hidden="true" />,
    label: "Creative writing",
    text: "Write a short story about a robot learning to paint",
  },
  {
    icon: <Globe className="w-4 h-4 text-purple-400" aria-hidden="true" />,
    label: "Research help",
    text: "What are the key differences between REST and GraphQL?",
  },
];

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {prompts.map((prompt) => (
        <button
          key={prompt.text}
          onClick={() => onSelect(prompt.text)}
          className="flex items-start gap-3 p-4 rounded-2xl border border-surface-700/50
            bg-surface-900/50 hover:bg-surface-800/80 hover:border-surface-600
            transition-all duration-200 text-left group cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          aria-label={`Ask: ${prompt.label}`}
        >
          <div className="shrink-0 w-8 h-8 rounded-lg bg-surface-800 flex items-center justify-center group-hover:scale-110 transition-transform">
            {prompt.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
              {prompt.label}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
              {prompt.text}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}
