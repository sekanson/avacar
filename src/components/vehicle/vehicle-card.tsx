import Image from "next/image";
import { Clock, Layers } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface VehicleCardProps {
  vehicle: {
    id: string;
    make: string;
    model: string;
    year: number;
    photoUrl?: string;
    nickname?: string;
    buildCount: number;
    lastModified: string;
  };
  onPress: () => void;
  className?: string;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function VehicleCard({ vehicle, onPress, className }: VehicleCardProps) {
  const displayName =
    vehicle.nickname ?? `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

  return (
    <button
      onClick={onPress}
      className={cn(
        "w-full flex items-center gap-4 p-4 bg-surface rounded-card border border-surface-border",
        "hover:border-surface-hover hover:bg-surface-hover active:scale-[0.98]",
        "transition-all duration-fast text-left",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-20 rounded-image overflow-hidden flex-shrink-0 bg-surface-elevated">
        {vehicle.photoUrl ? (
          <Image
            src={vehicle.photoUrl}
            alt={displayName}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-tertiary text-display-sm">
            {vehicle.make[0]}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <p className="text-body-md font-medium text-text-primary truncate">{displayName}</p>
        {vehicle.nickname && (
          <p className="text-body-sm text-text-secondary truncate">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </p>
        )}
        <div className="flex items-center gap-3 text-body-xs text-text-tertiary">
          <span className="flex items-center gap-1">
            <Layers className="w-3 h-3" />
            {vehicle.buildCount} {vehicle.buildCount === 1 ? "build" : "builds"}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(vehicle.lastModified)}
          </span>
        </div>
      </div>

      {/* Chevron */}
      <svg
        className="w-4 h-4 text-text-tertiary flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  );
}
