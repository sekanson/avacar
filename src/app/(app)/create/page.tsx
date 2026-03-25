"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Camera, ImagePlus, ChevronLeft, Sparkles } from "lucide-react";
import { useBuildStore } from "@/lib/stores/build-store";
import { cn } from "@/lib/utils/cn";

export default function CreatePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { setVehicleImage, clearBuild } = useBuildStore();

  function handleFile(file: File) {
    const url = URL.createObjectURL(file);
    clearBuild();
    setVehicleImage(url);
    router.push("/create/detect");
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top glow */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 400,
          height: 300,
          background:
            "radial-gradient(ellipse at center top, rgba(68,204,255,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* TopBar */}
      <header
        className="flex items-center gap-3 px-4 pt-safe"
        style={{ height: "3.5rem", borderBottom: "1px solid #2A2A36" }}
      >
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-button text-text-secondary hover:text-text-primary transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
        <span className="text-display-xs font-display text-text-primary flex-1">
          New Build
        </span>
        <Sparkles size={18} className="text-cyan" />
      </header>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 gap-8 relative z-10">
        {/* Heading */}
        <div className="text-center space-y-2">
          <h1 className="text-display-md font-display text-text-primary">
            Upload Your Car Photo
          </h1>
          <p className="text-body-md text-text-secondary max-w-xs mx-auto">
            Our AI will detect your vehicle and help you build the perfect
            customization.
          </p>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            "w-full max-w-sm aspect-[4/3] rounded-card border-2 border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200",
            isDragging
              ? "border-cyan bg-cyan-muted scale-[1.02]"
              : "border-surface-border bg-surface hover:border-cyan/50 hover:bg-surface-elevated"
          )}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "rgba(68,204,255,0.1)" }}
          >
            <ImagePlus size={28} className="text-cyan" />
          </div>
          <p className="text-body-md text-text-secondary text-center px-4">
            Drop a photo here<br />
            <span className="text-cyan font-medium">or tap to browse</span>
          </p>
          <p className="text-body-xs text-text-tertiary">
            JPG, PNG, WEBP — up to 20 MB
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full max-w-sm">
          <div className="flex-1 h-px bg-surface-border" />
          <span className="text-body-xs text-text-tertiary">or choose</span>
          <div className="flex-1 h-px bg-surface-border" />
        </div>

        {/* CTA cards */}
        <div className="w-full max-w-sm grid grid-cols-2 gap-3">
          {/* Camera */}
          <button
            onClick={() => cameraInputRef.current?.click()}
            className="flex flex-col items-center gap-3 p-5 rounded-card bg-surface border border-surface-border hover:border-cyan/40 hover:bg-surface-elevated transition-all duration-200 active:scale-95"
          >
            <div
              className="w-12 h-12 rounded-button flex items-center justify-center"
              style={{ background: "rgba(68,204,255,0.12)" }}
            >
              <Camera size={22} className="text-cyan" />
            </div>
            <div className="text-center">
              <p className="text-body-md font-medium text-text-primary">
                Take Photo
              </p>
              <p className="text-body-xs text-text-tertiary mt-0.5">
                Use camera
              </p>
            </div>
          </button>

          {/* Library */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center gap-3 p-5 rounded-card bg-surface border border-surface-border hover:border-cyan/40 hover:bg-surface-elevated transition-all duration-200 active:scale-95"
          >
            <div
              className="w-12 h-12 rounded-button flex items-center justify-center"
              style={{ background: "rgba(167,139,250,0.12)" }}
            >
              <ImagePlus size={22} style={{ color: "#A78BFA" }} />
            </div>
            <div className="text-center">
              <p className="text-body-md font-medium text-text-primary">
                Library
              </p>
              <p className="text-body-xs text-text-tertiary mt-0.5">
                From device
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}
