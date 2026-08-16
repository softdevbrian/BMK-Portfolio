"use client"

import { useTheme } from "@/components/theme/ThemeProvider"
import { Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/cn"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()

  const isLight = theme === "light"

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      title={`Switch to ${isLight ? "dark" : "light"} mode`}
      className={cn(
        "relative w-9 h-9 rounded-[var(--r)] glass flex items-center justify-center text-[var(--text-2)] hover:text-[var(--accent-text)] hover:border-[var(--line-strong)] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--teal)] overflow-hidden",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isLight ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center text-[var(--teal)]"
          >
            <Sun className="w-4 h-4" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center text-[var(--sky)]"
          >
            <Moon className="w-4 h-4" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )
}
