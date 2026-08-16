"use client"

import { useRef, type ReactNode, type MouseEvent } from "react"
import { motion, useSpring, useReducedMotion } from "motion/react"
import { cn } from "@/lib/cn"

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  radius?: number
  onClick?: () => void
}

export function MagneticButton({
  children,
  className = "",
  radius = 24,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()

    const centerX = left + width / 2
    const centerY = top + height / 2

    const distanceX = clientX - centerX
    const distanceY = clientY - centerY

    // Map delta to within radius
    const pullX = (distanceX / (width / 2)) * radius
    const pullY = (distanceY / (height / 2)) * radius

    x.set(pullX)
    y.set(pullY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  if (shouldReduceMotion) {
    return (
      <div onClick={onClick} className={cn("inline-block", className)}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  )
}
