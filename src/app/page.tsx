import { Hero } from "@/components/sections/Hero"
import { StatsBar } from "@/components/sections/StatsBar"
import { FeaturedProjects } from "@/components/sections/FeaturedProjects"
import { SkillsGrid } from "@/components/sections/SkillsGrid"
import { CTABand } from "@/components/sections/CTABand"
import { Marquee } from "@/components/fx/Marquee"
import { Reveal } from "@/components/fx/Reveal"

const techStack = [
  "Flutter 3.x",
  "Dart",
  "Python 3.13",
  "Django 5",
  "Next.js 15 (App Router)",
  "React 19",
  "Safaricom M-Pesa B2C",
  "Neon Serverless Postgres",
  "Drizzle ORM",
  "Embedded WebSockets P2P",
  "AI & RAG Workflows",
  "Tailwind CSS",
]

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 md:gap-16">
      {/* Hero Section */}
      <Hero />

      {/* Stats Bar */}
      <StatsBar />

      {/* Marquee Tech Ribbon */}
      <section className="py-8 border-y border-[var(--line)] bg-[rgba(255,255,255,0.015)] overflow-hidden">
        {/* ===== CONTENT SLOT: tech-ribbon ===== */}
        <Reveal direction="up" delay={0.1}>
          <Marquee speed={32} pauseOnHover>
            {techStack.map((tech) => (
              <div
                key={tech}
                className="flex items-center gap-3 px-4 py-2 rounded-[var(--r)] glass border border-[var(--line)] text-xs sm:text-sm font-mono text-[var(--text-2)] hover:text-[var(--accent-text)] hover:border-[var(--line-strong)] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
                <span>{tech}</span>
              </div>
            ))}
          </Marquee>
        </Reveal>
      </section>

      {/* Featured Projects Showcase */}
      <FeaturedProjects />

      {/* Skills Matrix */}
      <SkillsGrid />

      {/* Call to Action Band */}
      <CTABand />
    </div>
  )
}
