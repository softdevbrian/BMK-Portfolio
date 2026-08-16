"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, animate, useReducedMotion } from "motion/react"
import { EASING } from "@/lib/motion"

interface CountUpProps {
  value: number | string
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
}

export function CountUp({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })
  const shouldReduceMotion = useReducedMotion()

  // Parse numeric value if string passed (e.g. "50", "99.9")
  const numericValue = typeof value === "number" ? value : parseFloat(value.replace(/[^0-9.]/g, "")) || 0
  const isDecimal = Number.isInteger(numericValue) ? 0 : 1
  const [displayValue, setDisplayValue] = useState(() => (shouldReduceMotion ? numericValue : 0))

  useEffect(() => {
    if (shouldReduceMotion) return

    if (isInView) {
      const controls = animate(0, numericValue, {
        duration,
        ease: EASING,
        onUpdate: (latest) => {
          setDisplayValue(latest)
        },
      })

      return () => controls.stop()
    }
  }, [isInView, numericValue, duration, shouldReduceMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {isDecimal ? displayValue.toFixed(1) : Math.floor(displayValue)}
      {suffix}
    </span>
  )
}
