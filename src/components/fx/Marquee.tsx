"use client"

import { useState, type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
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
  speed = 28,
  pauseOnHover = true,
  className = "",
}: MarqueeProps) {
  const [isPaused, setIsPaused] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full select-none py-2",
        shouldReduceMotion && "overflow-x-auto",
        className
      )}
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {/* Side gradient fades */}
      {!shouldReduceMotion && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-r from-[var(--bg)] to-transparent z-10" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 md:w-28 bg-gradient-to-l from-[var(--bg)] to-transparent z-10" />
        </>
      )}

      <div className="flex w-max">
        <motion.div
          animate={
            isPaused || shouldReduceMotion
              ? {}
              : {
                  x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }
          }
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: speed,
          }}
          className="flex shrink-0 items-center gap-8 md:gap-12 will-change-transform motion-reduce:transform-none"
        >
          {children}
          {children}
          {children}
          {children}
        </motion.div>
      </div>
    </div>
  )
}
