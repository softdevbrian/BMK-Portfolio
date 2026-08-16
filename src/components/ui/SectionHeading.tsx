import { Reveal } from "@/components/fx/Reveal"
import { cn } from "@/lib/cn"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center"

  return (
    <div
      className={cn(
        "flex flex-col gap-3 mb-12",
        isCenter ? "items-center text-center max-w-2xl mx-auto" : "items-start text-left max-w-3xl",
        className
      )}
    >
      {eyebrow && (
        <Reveal direction="up" delay={0.05}>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}

      <Reveal direction="up" delay={0.1}>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[var(--text)]">
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal direction="up" delay={0.15}>
          <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}
