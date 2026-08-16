"use client"

import Link from "next/link"
import { ArrowUpRight, CheckCircle2 } from "lucide-react"
import { projects } from "@/data/projects"
import { Reveal } from "@/components/fx/Reveal"
import { TiltCard } from "@/components/fx/TiltCard"
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder"
import { Badge } from "@/components/ui/Badge"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Button } from "@/components/ui/Button"

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured)

  return (
    <section className="py-20 md:py-28 relative">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured Engineering Work"
            description="Production-grade systems, high-scale architectures, and cross-platform apps."
            className="mb-0"
          />
          <Reveal direction="left" delay={0.2}>
            <Button
              href="/projects"
              variant="outline"
              size="md"
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
            >
              View All Projects
            </Button>
          </Reveal>
        </div>

        {/* Dynamic List of Featured Projects */}
        {featured.length > 0 ? (
          <div className="flex flex-col gap-20">
            {featured.map((project, index) => {
              const isEven = index % 2 === 0
              return (
                <div
                  key={project.slug}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                    isEven ? "" : "lg:grid-flow-dense"
                  }`}
                >
                  {/* Visual Cover in TiltCard */}
                  <div className={`lg:col-span-7 ${isEven ? "" : "lg:col-start-6"}`}>
                    <Reveal direction={isEven ? "right" : "left"} delay={0.1}>
                      <Link href={`/projects/${project.slug}`} className="block group">
                        <TiltCard className="p-2 bg-[var(--surface)]">
                          <ImagePlaceholder
                            src={project.cover}
                            alt={project.title}
                            label={`${project.title} Cover`}
                            aspect="video"
                            className="group-hover:scale-[1.01] transition-transform duration-500"
                          />
                        </TiltCard>
                      </Link>
                    </Reveal>
                  </div>

                  {/* Info Details */}
                  <div className={`lg:col-span-5 flex flex-col gap-4 ${isEven ? "" : "lg:col-start-1"}`}>
                    <Reveal direction="up" delay={0.15}>
                      <div className="flex items-center gap-2">
                        <Badge variant={project.accent}>{project.ownership}</Badge>
                        <span className="text-xs font-mono text-[var(--text-2)]">{project.period}</span>
                      </div>
                    </Reveal>

                    <Reveal direction="up" delay={0.2}>
                      <Link href={`/projects/${project.slug}`} className="group inline-flex items-center gap-2">
                        <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors">
                          {project.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-[var(--text-2)] group-hover:text-[var(--accent-text)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </Link>
                    </Reveal>

                    <Reveal direction="up" delay={0.25}>
                      <p className="text-sm text-[var(--text-2)] leading-relaxed">
                        {project.tagline}
                      </p>
                    </Reveal>

                    {/* Highlights */}
                    {project.highlights && project.highlights.length > 0 && (
                      <Reveal direction="up" delay={0.3}>
                        <ul className="flex flex-col gap-2 pt-2">
                          {project.highlights.slice(0, 3).map((item, hIdx) => (
                            <li key={hIdx} className="flex items-start gap-2 text-xs text-[var(--text-2)]">
                              <CheckCircle2 className="w-4 h-4 text-[var(--teal)] shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                    )}

                    {/* Metrics Chips */}
                    {project.metrics && project.metrics.length > 0 && (
                      <Reveal direction="up" delay={0.35}>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {project.metrics.slice(0, 3).map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className="px-3 py-1 rounded-[var(--r)] glass border border-[var(--line-strong)] text-xs flex items-center gap-1.5"
                            >
                              <span className="font-bold text-[var(--text)] font-heading">
                                {m.prefix || ""}{m.value}{m.suffix || ""}
                              </span>
                              <span className="text-[var(--text-2)] font-mono text-[10px]">{m.label}</span>
                            </div>
                          ))}
                        </div>
                      </Reveal>
                    )}

                    {/* CTA Link */}
                    <Reveal direction="up" delay={0.4}>
                      <div className="pt-2">
                        <Button href={`/projects/${project.slug}`} variant="outline" size="sm">
                          Case Study & Details
                        </Button>
                      </div>
                    </Reveal>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* When array is empty during scaffold stage */
          <Reveal direction="up" delay={0.1}>
            <div className="glass rounded-[var(--r-xl)] border border-dashed border-[var(--line-strong)] p-12 text-center flex flex-col items-center justify-center gap-4">
              <span className="eyebrow">Projects Array Ready</span>
              <h3 className="text-xl font-bold font-heading text-[var(--text)]">
                Featured Projects Slot
              </h3>
              <p className="text-sm text-[var(--text-2)] max-w-md">
                Project entries added to <code className="text-[var(--teal)] font-mono">src/data/projects.ts</code> with <code className="text-[var(--teal)] font-mono">featured: true</code> will automatically render in this alternating showcase layout with TiltCards, metrics, and case studies.
              </p>
              <div className="w-full max-w-2xl mt-4">
                <ImagePlaceholder
                  label="Sample Featured Project Cover Slot"
                  aspect="video"
                />
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
