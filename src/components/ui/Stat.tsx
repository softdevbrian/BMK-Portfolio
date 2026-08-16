import { CountUp } from "@/components/fx/CountUp"
import { cn } from "@/lib/cn"

interface StatProps {
  value: string | number
  label: string
  suffix?: string
  prefix?: string
  className?: string
}

export function Stat({
  value,
  label,
  suffix = "",
  prefix = "",
  className = "",
}: StatProps) {
  return (
    <div className={cn("flex flex-col items-center text-center p-4", className)}>
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading grad-text tracking-tight mb-1">
        <CountUp value={value} prefix={prefix} suffix={suffix} />
      </div>
      <span className="text-xs sm:text-sm font-medium text-[var(--text-2)] uppercase tracking-wider font-mono">
        {label}
      </span>
    </div>
  )
}
