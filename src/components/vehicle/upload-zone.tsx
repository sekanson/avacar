"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Camera, Upload, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

interface UploadZoneProps {
  onFileSelected: (file: File) => void;
  previewUrl?: string | null;
  isLoading?: boolean;
  className?: string;
}

export function UploadZone({
  onFileSelected,
  previewUrl,
  isLoading = false,
  className,
}: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validateAndSelect = useCallback(
    (file: File) => {
      setValidationError(null);

      if (!ACCEPTED_TYPES.includes(file.type)) {
        setValidationError("Please upload a JPG, PNG, WebP, or HEIC image.");
        return;
      }

      if (file.size > MAX_SIZE_BYTES) {
        setValidationError("File size must be under 10 MB.");
        return;
      }

      onFileSelected(file);
    },
    [onFileSelected]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateAndSelect(file);
    // Reset input so the same file can be re-selected
    e.target.value = "";
  };

  const openPicker = () => fileInputRef.current?.click();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) validateAndSelect(file);
  };

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center min-h-64 rounded-card border-2 border-dashed bg-surface transition-colors duration-normal cursor-pointer select-none",
        isDragOver
          ? "border-cyan bg-cyan-subtle"
          : "border-surface-border hover:border-surface-hover",
        previewUrl && "border-transparent",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={previewUrl ? undefined : openPicker}
      role={previewUrl ? undefined : "button"}
      tabIndex={previewUrl ? undefined : 0}
      onKeyDown={(e) => {
        if (!previewUrl && (e.key === "Enter" || e.key === " ")) openPicker();
      }}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/heic"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* Preview state */}
      {previewUrl ? (
        <div className="relative w-full h-full min-h-64 rounded-card overflow-hidden">
          <Image
            src={previewUrl}
            alt="Vehicle preview"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 600px"
          />
          {/* Change photo overlay */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              openPicker();
            }}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-background/80 backdrop-blur-nav rounded-button text-body-sm text-text-primary border border-surface-border hover:border-cyan transition-colors"
          >
            <Camera className="w-4 h-4" />
            Change
          </button>
        </div>
      ) : (
        /* Upload prompt */
        <div className="flex flex-col items-center gap-4 p-8 text-center pointer-events-none">
          <Camera className="w-10 h-10 text-text-tertiary" />
          <div className="flex flex-col gap-1">
            <p className="text-display-xs text-text-primary">Upload your car photo</p>
            <p className="text-body-sm text-text-secondary">Drag &amp; drop or</p>
          </div>

          {/* Action buttons — pointer-events-auto so they work inside the non-clickable area */}
          <div className="flex gap-3 pointer-events-auto" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={openPicker}
              className="flex items-center gap-2 px-4 py-2 rounded-button border border-surface-border bg-surface-elevated text-body-sm text-text-secondary hover:border-cyan hover:text-cyan transition-colors duration-fast"
            >
              <Camera className="w-4 h-4" />
              Take Photo
            </button>
            <button
              onClick={openPicker}
              className="flex items-center gap-2 px-4 py-2 rounded-button border border-surface-border bg-surface-elevated text-body-sm text-text-secondary hover:border-cyan hover:text-cyan transition-colors duration-fast"
            >
              <Upload className="w-4 h-4" />
              Choose from Library
            </button>
          </div>

          {validationError && (
            <p className="text-body-sm text-error">{validationError}</p>
          )}
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 rounded-card flex items-center justify-center bg-background/70 backdrop-blur-overlay z-10">
          <Loader2 className="w-8 h-8 text-cyan animate-spin" />
        </div>
      )}
    </div>
  );
}
