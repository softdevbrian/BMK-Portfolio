"use client"

import { type ReactNode } from "react"
import { cn } from "@/lib/cn"

interface MarqueeProps {
  children: ReactNode
  direction?: "left" | "right"
  speed?: number // in seconds
  pauseOnHover?: boolean
  className?: string
}

export function Marquee({
  children,
  direction = "left",
  speed = 32,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden w-full select-none py-2 flex",
        className
      )}
      style={
        {
          "--marquee-duration": `${speed}s`,
        } as React.CSSProperties
      }
    >
      {/* Side gradient fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-[var(--bg)] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-[var(--bg)] to-transparent z-10" />

      {/* Primary Track */}
      <div
        className={cn(
          "flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6 will-change-transform",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>

      {/* Seamless Mirror Track */}
      <div
        className={cn(
          "flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6 will-change-transform",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}
