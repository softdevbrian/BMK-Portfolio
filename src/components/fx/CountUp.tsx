"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, animate } from "motion/react"
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

  const hasNumbers = typeof value === "number" || /[0-9]/.test(String(value))
  // Parse numeric value if string passed (e.g. "50", "99.9", "1000")
  const numericValue = typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0
  const isDecimal = Number.isInteger(numericValue) ? 0 : 1
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (isInView && hasNumbers) {
      const controls = animate(0, numericValue, {
        duration,
        ease: EASING,
        onUpdate: (latest) => {
          setDisplayValue(latest)
        },
      })

      return () => controls.stop()
    }
  }, [isInView, numericValue, duration, hasNumbers])

  if (!hasNumbers) {
    return (
      <span ref={ref} className={className} suppressHydrationWarning>
        {prefix}
        {value}
        {suffix}
      </span>
    )
  }

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {prefix}
      {isDecimal ? displayValue.toFixed(1) : Math.floor(displayValue)}
      {suffix}
    </span>
  )
}
