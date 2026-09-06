"use client"

import { useState, useEffect, useRef, useCallback, type ElementType } from "react"

interface ScrambleTextProps {
  text: string
  className?: string
  as?: ElementType
  characters?: string
  speed?: number
}

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________0123456789abcdef"

export function ScrambleText({
  text,
  className = "",
  as: Component = "span",
  characters = GLYPHS,
  speed = 30,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const isAnimatingRef = useRef(false)
  const iterationRef = useRef(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const startScramble = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    isAnimatingRef.current = true
    iterationRef.current = 0

    timerRef.current = setInterval(() => {
      setDisplayText(() => {
        return text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iterationRef.current) {
              return text[index]
            }
            return characters[Math.floor(Math.random() * characters.length)]
          })
          .join("")
      })

      if (iterationRef.current >= text.length) {
        if (timerRef.current) {
          clearInterval(timerRef.current)
          timerRef.current = null
        }
        isAnimatingRef.current = false
        setDisplayText(text)
      }

      iterationRef.current += 0.8
    }, speed)
  }, [text, characters, speed])

  useEffect(() => {
    const timeout = setTimeout(() => {
      startScramble()
    }, 250)

    return () => {
      clearTimeout(timeout)
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
      isAnimatingRef.current = false
    }
  }, [startScramble])

  return (
    <Component
      className={className}
      onMouseEnter={startScramble}
      style={{ cursor: "default" }}
    >
      {displayText}
    </Component>
  )
}
