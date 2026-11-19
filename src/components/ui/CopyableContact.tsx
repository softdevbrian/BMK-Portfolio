"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/cn"

export function useCopyFeedback(durationMs = 1800) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const copy = async (text: string) => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
      } else {
        const textarea = document.createElement("textarea")
        textarea.value = text
        textarea.style.position = "fixed"
        textarea.style.opacity = "0"
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand("copy")
        document.body.removeChild(textarea)
      }
      setCopied(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), durationMs)
    } catch {
      // Clipboard blocked; fail silently
    }
  }

  return { copied, copy }
}

interface CopyableInlineProps {
  value: string
  label?: string
  icon: ReactNode
  className?: string
  textClassName?: string
}

export function CopyableInline({
  value,
  label,
  icon,
  className,
  textClassName,
}: CopyableInlineProps) {
  const { copied, copy } = useCopyFeedback()

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      title={`Copy ${label ?? value}`}
      aria-label={`Copy ${label ?? value} to clipboard`}
      className={cn(
        "group relative inline-flex items-center gap-2 text-left cursor-pointer rounded-md transition-colors hover:text-[var(--accent-text)] focus-visible:outline-2 focus-visible:outline-[var(--teal)]",
        className
      )}
    >
      <span className="shrink-0 transition-transform duration-200 group-active:scale-90">
        {icon}
      </span>

      <span className={cn("truncate transition-colors", copied && "text-[var(--ok)]", textClassName)}>
        {value}
      </span>

      <span className="relative inline-flex items-center justify-center shrink-0">
        <AnimatePresence mode="wait" initial={false}>
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0, scale: 0.8, y: 2 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -2 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-[var(--r-pill)] bg-[rgba(124,224,176,0.14)] border border-[var(--ok)]/40 text-[10px] font-mono font-semibold text-[var(--ok)]"
            >
              <Check className="w-2.5 h-2.5" />
              <span>Copied</span>
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="opacity-0 group-hover:opacity-70 transition-opacity text-[var(--text-2)]"
            >
              <Copy className="w-3 h-3" />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  )
}
