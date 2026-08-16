"use client"

import { skills } from "@/data/skills"
import { Reveal } from "@/components/fx/Reveal"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Badge } from "@/components/ui/Badge"
import { Wrench } from "lucide-react"

export function SkillsGrid() {
  const defaultCategories = [
    { group: "Frontend & Mobile", items: ["React / Next.js", "React Native", "TypeScript", "Tailwind CSS", "Motion"] },
    { group: "Backend & Systems", items: ["Node.js", "Python / FastAPI", "Go", "GraphQL", "REST APIs"] },
    { group: "Data & Storage", items: ["PostgreSQL", "Redis", "Prisma", "Supabase", "MongoDB"] },
    { group: "DevOps & Cloud", items: ["Docker", "AWS", "Vercel", "CI/CD Actions", "Cloudflare"] },
  ]

  const displaySkills = skills.length > 0 ? skills : defaultCategories

  return (
    <section className="py-20 relative">
      <div className="wrap">
        <SectionHeading
          eyebrow="Capabilities"
          title="Technical Skills & Architecture"
          description="Technologies and methodologies used across frontend, backend, infrastructure, and mobile systems."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displaySkills.map((skillGroup, idx) => {
            return (
              <Reveal key={skillGroup.group} direction="up" delay={0.08 * idx}>
                <div className="glass-card rounded-[var(--r-lg)] p-6 h-full flex flex-col justify-between border border-[var(--line)] hover:border-[var(--line-strong)] transition-all">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-[var(--r)] bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center text-[var(--teal)]">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <h3 className="font-heading font-semibold text-base text-[var(--text)]">
                        {skillGroup.group}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {skillGroup.items.map((item) => (
                        <Badge key={item} variant="default" size="sm">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
