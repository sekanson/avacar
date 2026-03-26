"use client";
import { useState } from "react";
import Image, { ImageProps } from "next/image";

const FALLBACK =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&q=80&fm=webp";

type SafeImageProps = Omit<ImageProps, "onError"> & { fallback?: string };

export function SafeImage({ fallback = FALLBACK, src, alt, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
    />
  );
}
