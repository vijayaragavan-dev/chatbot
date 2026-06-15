import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/UI/Button";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-12 px-6 animate-fade-in"
      role="alert"
    >
      <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center">
        <AlertTriangle className="w-7 h-7 text-red-400" aria-hidden="true" />
      </div>
      <div className="text-center max-w-md">
        <h3 className="text-lg font-semibold text-gray-200 mb-1">
          Something went wrong
        </h3>
        <p className="text-sm text-gray-400">{message}</p>
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          Try Again
        </Button>
      )}
    </div>
  );
}
