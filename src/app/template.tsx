"use client"

import { type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { EASING } from "@/lib/motion"

export default function Template({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
      transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, ease: EASING }}
      className="motion-reduce:transform-none motion-reduce:opacity-100"
    >
      {children}
    </motion.div>
  )
}
