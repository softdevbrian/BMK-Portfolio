"use client"

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/cn"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  href?: string
  external?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  isLoading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      href,
      external = false,
      leftIcon,
      rightIcon,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none cursor-pointer rounded-[var(--r)] focus-visible:outline-2 focus-visible:outline-[var(--teal)] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"

    const variants = {
      primary:
        "bg-[var(--teal)] text-white dark:text-[#061215] font-semibold hover:opacity-90 shadow-[var(--glow)] active:scale-[0.98]",
      secondary:
        "glass text-[var(--text)] hover:bg-[var(--surface-2)] hover:border-[var(--line-strong)] active:scale-[0.98]",
      outline:
        "border border-[var(--line-strong)] text-[var(--text)] hover:border-[var(--teal)] hover:text-[var(--accent-text)] active:scale-[0.98]",
      ghost:
        "text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface)] active:scale-[0.98]",
    }

    const sizes = {
      sm: "text-xs px-3.5 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2.5 font-semibold",
    }

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      className
    )

    const content = (
      <>
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </>
    )

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={combinedClassName}
          >
            {content}
          </a>
        )
      }
      return (
        <Link href={href} className={combinedClassName}>
          {content}
        </Link>
      )
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = "Button"
