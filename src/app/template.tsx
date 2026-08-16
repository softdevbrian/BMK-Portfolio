"use client"

import { type ReactNode } from "react"
import { motion } from "motion/react"
import { EASING } from "@/lib/motion"

export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.45, ease: EASING }}
      className="motion-reduce:transform-none motion-reduce:opacity-100"
    >
      {children}
    </motion.div>
  )
}
