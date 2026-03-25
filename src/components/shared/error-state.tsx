import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "An unexpected error occurred. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
        className
      )}
    >
      <div className="text-error">
        <AlertCircle className="w-12 h-12" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-display-sm text-text-primary">{title}</h3>
        {description && (
          <p className="text-body-md text-text-secondary max-w-xs">{description}</p>
        )}
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 px-6 py-2.5 rounded-button border border-error/50 text-body-md text-error hover:bg-error/10 transition-colors duration-fast"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
