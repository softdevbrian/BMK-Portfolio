import { ExternalLink, Play, Smartphone } from "lucide-react"
import { type Project } from "@/data/projects"
import { Button } from "@/components/ui/Button"
import { GithubIcon } from "@/components/ui/Icon"
import { cn } from "@/lib/cn"

export function getProjectLinkIcon(kind: Project["links"][number]["kind"], className = "w-3.5 h-3.5") {
  switch (kind) {
    case "repo":
      return <GithubIcon className={className} />
    case "store":
      return <Smartphone className={className} />
    case "demo":
      return <Play className={className} />
    default:
      return <ExternalLink className={className} />
  }
}

interface ProjectLinksRowProps {
  links: Project["links"]
  variant?: "buttons" | "chips"
  className?: string
}

export function ProjectLinksRow({
  links,
  variant = "buttons",
  className,
}: ProjectLinksRowProps) {
  if (!links || links.length === 0) return null

  if (variant === "chips") {
    return (
      <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--r)] text-[11px] font-mono font-medium border transition-all duration-200",
              link.kind === "live"
                ? "bg-[rgba(45,212,191,0.1)] border-[rgba(45,212,191,0.3)] text-[var(--teal)] hover:bg-[rgba(45,212,191,0.2)] hover:border-[var(--teal)]"
                : "bg-[var(--surface-2)] border-[var(--line-strong)] text-[var(--text)] hover:border-[var(--teal)] hover:text-[var(--accent-text)]"
            )}
          >
            {getProjectLinkIcon(link.kind, "w-3 h-3 shrink-0")}
            <span>{link.label}</span>
          </a>
        ))}
      </div>
    )
  }

  return (
    <>
      {links.map((link) => (
        <Button
          key={link.href}
          href={link.href}
          external
          variant={link.kind === "live" ? "primary" : "secondary"}
          size="sm"
          leftIcon={getProjectLinkIcon(link.kind, "w-3.5 h-3.5")}
        >
          {link.label}
        </Button>
      ))}
    </>
  )
}
