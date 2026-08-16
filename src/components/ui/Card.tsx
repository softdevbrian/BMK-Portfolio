import { type ReactNode } from "react"
import { cn } from "@/lib/cn"

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  padding?: "none" | "sm" | "md" | "lg"
}

export function Card({
  children,
  className = "",
  hover = true,
  padding = "md",
}: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  }

  return (
    <div
      className={cn(
        "rounded-[var(--r-lg)] glass",
        hover && "transition-all duration-300 hover:border-[var(--line-strong)] hover:bg-[var(--surface-2)]",
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
