"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "motion/react"
import { EASING } from "@/lib/motion"

type RevealDirection = "up" | "down" | "left" | "right" | "scale"

interface RevealProps {
  children: ReactNode
  delay?: number
  direction?: RevealDirection
  once?: boolean
  className?: string
  as?: "div" | "section" | "article" | "span" | "header" | "footer" | "nav"
}

export function Reveal({
  children,
  delay = 0,
  direction = "up",
  once = true,
  className = "",
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once,
    margin: "-10% 0px",
  })

  const getHiddenTransform = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 28 }
      case "down":
        return { opacity: 0, y: -28 }
      case "left":
        return { opacity: 0, x: 28 }
      case "right":
        return { opacity: 0, x: -28 }
      case "scale":
        return { opacity: 0, scale: 0.95 }
      default:
        return { opacity: 0, y: 28 }
    }
  }

  const getVisibleTransform = () => {
    switch (direction) {
      case "scale":
        return { opacity: 1, scale: 1 }
      case "up":
      case "down":
        return { opacity: 1, y: 0 }
      case "left":
      case "right":
        return { opacity: 1, x: 0 }
      default:
        return { opacity: 1, y: 0 }
    }
  }

  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      ref={ref}
      initial={getHiddenTransform()}
      animate={isInView ? getVisibleTransform() : getHiddenTransform()}
      transition={{
        duration: 0.7,
        delay,
        ease: EASING,
      }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
