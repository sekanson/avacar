import { cn } from "@/lib/utils/cn";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
        className
      )}
    >
      <div className="text-text-tertiary [&>svg]:w-12 [&>svg]:h-12">{icon}</div>

      <div className="flex flex-col gap-2">
        <h3 className="text-display-sm text-text-primary">{title}</h3>
        {description && (
          <p className="text-body-md text-text-secondary max-w-xs">{description}</p>
        )}
      </div>

      {action && (
        <button
          onClick={action.onClick}
          className="mt-2 px-6 py-2.5 rounded-button border border-surface-border text-body-md text-text-secondary hover:border-cyan hover:text-cyan transition-colors duration-fast"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
