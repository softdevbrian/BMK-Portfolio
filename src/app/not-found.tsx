import { ArrowLeft, Home } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Reveal } from "@/components/fx/Reveal"

export default function NotFound() {
  return (
    <div className="min-h-[65vh] flex items-center justify-center py-16">
      <div className="wrap flex flex-col items-center text-center max-w-lg">
        <Reveal direction="scale" delay={0.1}>
          <div className="text-7xl sm:text-9xl font-bold font-heading grad-text tracking-tighter mb-4">
            404
          </div>
        </Reveal>

        <Reveal direction="up" delay={0.2}>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[var(--text)] mb-3">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed mb-8">
            The page or project route you are trying to access does not exist or has been moved.
          </p>
        </Reveal>

        <Reveal direction="up" delay={0.3}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              href="/"
              variant="primary"
              size="md"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Back to Home
            </Button>
            <Button
              href="/projects"
              variant="outline"
              size="md"
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Explore Projects
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
