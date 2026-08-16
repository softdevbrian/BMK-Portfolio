import { type ReactNode } from "react"
import { cn } from "@/lib/cn"

export type BadgeVariant = "teal" | "violet" | "sky" | "amber" | "default" | "outline"

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: "sm" | "md"
  className?: string
}

export function Badge({
  children,
  variant = "default",
  size = "sm",
  className = "",
}: BadgeProps) {
  const variants = {
    teal: "bg-[rgba(45,212,191,0.12)] text-[var(--accent-text)] border-[rgba(45,212,191,0.25)]",
    violet: "bg-[rgba(167,139,250,0.12)] text-[var(--violet)] border-[rgba(167,139,250,0.25)]",
    sky: "bg-[rgba(86,183,240,0.12)] text-[var(--sky)] border-[rgba(86,183,240,0.25)]",
    amber: "bg-[rgba(245,158,11,0.12)] text-[#D97706] dark:text-[#FBBF24] border-[rgba(245,158,11,0.25)]",
    default: "bg-[var(--surface-2)] text-[var(--text-2)] border-[var(--line)]",
    outline: "bg-transparent text-[var(--text-2)] border-[var(--line-strong)]",
  }

  const sizes = {
    sm: "text-[11px] px-2.5 py-0.5 font-mono",
    md: "text-xs px-3 py-1 font-mono",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium rounded-[var(--r-pill)] border uppercase tracking-wider",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  )
}
