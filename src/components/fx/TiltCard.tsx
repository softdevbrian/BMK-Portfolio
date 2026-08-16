"use client"

import { useState, useRef, useSyncExternalStore, type ReactNode, type MouseEvent } from "react"
import { motion, useSpring, useReducedMotion } from "motion/react"
import { cn } from "@/lib/cn"

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  onClick?: () => void
  disabled?: boolean
}

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(hover: none) and (pointer: coarse)")
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

function getSnapshot() {
  return window.matchMedia("(hover: none) and (pointer: coarse)").matches
}

function getServerSnapshot() {
  return false
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 8,
  onClick,
  disabled = false,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isTouchDevice = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 })

  const shouldReduceMotion = useReducedMotion()

  const springConfig = { damping: 20, stiffness: 200, mass: 0.5 }
  const rotateX = useSpring(0, springConfig)
  const rotateY = useSpring(0, springConfig)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (disabled || isTouchDevice || shouldReduceMotion || !cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setSpotlightPos({ x, y })

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -maxTilt
    const tiltY = ((x - centerX) / centerX) * maxTilt

    rotateX.set(tiltX)
    rotateY.set(tiltY)
  }

  const handleMouseEnter = () => {
    if (disabled || isTouchDevice || shouldReduceMotion) return
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
  }

  if (disabled || isTouchDevice || shouldReduceMotion) {
    return (
      <div
        ref={cardRef}
        onClick={onClick}
        className={cn("glass-card rounded-[var(--r-lg)] relative overflow-hidden", className)}
      >
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={cn(
        "glass-card rounded-[var(--r-lg)] relative overflow-hidden transition-colors duration-300",
        isHovered && "border-[var(--line-strong)] shadow-[0_12px_32px_rgba(0,0,0,0.4)]",
        className
      )}
    >
      {/* Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(45, 212, 191, 0.12), transparent 70%)`,
        }}
      />
      {/* Brightening Border Glow Layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[var(--r-lg)] transition-opacity duration-300 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(45, 212, 191, 0.35), transparent 60%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative z-0 h-full">{children}</div>
    </motion.div>
  )
}
