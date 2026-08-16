"use client"

import { motion, useScroll, useSpring } from "motion/react"

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none motion-reduce:hidden"
    >
      <motion.div
        style={{ scaleX }}
        className="w-full h-full origin-left bg-[var(--grad)] shadow-[0_0_12px_rgba(45,212,191,0.5)]"
      />
    </div>
  )
}
