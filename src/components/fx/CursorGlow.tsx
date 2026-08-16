"use client"

import { useState, useEffect, useSyncExternalStore } from "react"
import { motion, useSpring } from "motion/react"

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(hover: hover) and (pointer: fine)")
  mql.addEventListener("change", callback)
  return () => mql.removeEventListener("change", callback)
}

function getSnapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches
}

function getServerSnapshot() {
  return false
}

export function CursorGlow() {
  const isPointerFine = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const [isVisible, setIsVisible] = useState(false)

  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 }
  const cursorX = useSpring(-200, springConfig)
  const cursorY = useSpring(-200, springConfig)

  useEffect(() => {
    if (!isPointerFine) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isPointerFine, cursorX, cursorY, isVisible])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-[5] overflow-hidden select-none motion-reduce:hidden"
    >
      {isPointerFine && isVisible && (
        <motion.div
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        >
          <div className="w-full h-full rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.07)_0%,transparent_70%)] blur-[40px]" />
        </motion.div>
      )}
    </div>
  )
}
