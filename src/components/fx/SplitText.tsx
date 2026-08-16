"use client"

import { useRef, type ElementType } from "react"
import { motion, useInView } from "motion/react"
import { EASING } from "@/lib/motion"

interface SplitTextProps {
  text: string
  className?: string
  as?: ElementType
  delay?: number
  staggerMs?: number
}

export function SplitText({
  text,
  className = "",
  as: Component = "h1",
  delay = 0,
  staggerMs = 18,
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })

  const words = text.split(" ")
  let charCount = 0

  return (
    <Component ref={ref} className={className} aria-label={text}>
      <span className="inline" aria-hidden="true">
        {words.map((word, wordIndex) => {
          return (
            <span key={wordIndex} className="inline-block whitespace-nowrap">
              {word.split("").map((char, charIndex) => {
                const index = charCount++
                return (
                  <motion.span
                    key={charIndex}
                    className="inline-block origin-bottom"
                    style={{ perspective: 1000, transformStyle: "preserve-3d" }}
                    initial={{
                      opacity: 0,
                      rotateX: -85,
                      y: 20,
                    }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            rotateX: 0,
                            y: 0,
                          }
                        : {
                            opacity: 0,
                            rotateX: -85,
                            y: 20,
                          }
                    }
                    transition={{
                      duration: 0.6,
                      delay: delay + (index * staggerMs) / 1000,
                      ease: EASING,
                    }}
                  >
                    {char}
                  </motion.span>
                )
              })}
              {wordIndex < words.length - 1 && (
                <span className="inline-block">&nbsp;</span>
              )}
            </span>
          )
        })}
      </span>
    </Component>
  )
}
