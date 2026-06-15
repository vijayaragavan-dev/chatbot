import { Sparkles } from "lucide-react";
import { SuggestedPrompts } from "@/components/Chat/SuggestedPrompts";

interface WelcomeScreenProps {
  onSelectPrompt: (prompt: string) => void;
}

export function WelcomeScreen({ onSelectPrompt }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-16 animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-6 shadow-2xl shadow-primary-500/20">
        <Sparkles className="w-10 h-10 text-white" aria-hidden="true" />
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 text-center">
        AI Assistant
      </h1>
      <p className="text-gray-400 text-center max-w-md mb-10 text-sm sm:text-base">
        I'm powered by Groq's ultra-fast inference. Ask me anything — coding,
        writing, research, or creative ideas.
      </p>

      <div className="w-full max-w-lg">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4 text-center">
          Suggested questions
        </h2>
        <SuggestedPrompts onSelect={onSelectPrompt} />
      </div>
    </div>
  );
}
