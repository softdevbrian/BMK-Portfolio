"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/cn"

export type AspectRatioType = "square" | "video" | "phone" | "wide"

interface ImagePlaceholderProps {
  src?: string
  alt?: string
  label: string
  aspect?: AspectRatioType
  priority?: boolean
  className?: string
  ringGlow?: boolean
  objectPosition?: string
  fitMode?: "cover" | "contain"
}

export function ImagePlaceholder({
  src,
  alt = "",
  label,
  aspect = "video",
  priority = false,
  className = "",
  ringGlow = false,
  objectPosition = "center",
  fitMode = "cover",
}: ImagePlaceholderProps) {
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const aspectClass = {
    square: "aspect-square",
    video: "aspect-video",
    phone: "aspect-[9/16]",
    wide: "aspect-[16/10]",
  }[aspect]

  const showPlaceholder = !src || imageError || !imageLoaded

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[var(--r-lg)] w-full select-none",
        aspectClass,
        ringGlow &&
          "p-1.5 bg-gradient-to-tr from-[var(--teal)] via-[var(--sky)] to-[var(--violet)] shadow-[var(--glow)]",
        className
      )}
    >
      <div
        className={cn(
          "w-full h-full relative rounded-[calc(var(--r-lg)-4px)] overflow-hidden",
          "glass border border-dashed border-[var(--line-strong)] flex flex-col items-center justify-center p-4 text-center"
        )}
      >
        {/* Shimmer effect */}
        {showPlaceholder && (
          <div
            className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.04) 50%, transparent 100%)",
            }}
          />
        )}

        {/* Real Image if available */}
        {src && !imageError && (
          <Image
            src={src}
            alt={alt || label}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectPosition }}
            className={cn(
              "transition-opacity duration-500 z-10",
              fitMode === "contain" ? "object-contain" : "object-cover",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}

        {/* Visual Placeholder Content */}
        {showPlaceholder && (
          <div className="flex flex-col items-center justify-center gap-2.5 z-0 max-w-[85%]">
            <div className="w-10 h-10 rounded-full bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center text-[var(--accent-text)] shadow-sm">
              <ImageIcon className="w-5 h-5 opacity-80" />
            </div>
            <span className="font-medium text-xs md:text-sm text-[var(--text)] tracking-wide">
              {label}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
