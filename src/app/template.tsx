"use client"

import { type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"
import { EASING } from "@/lib/motion"

export default function Template({ children }: { children: ReactNode }) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASING }}
    >
      {children}
    </motion.div>
  )
}
