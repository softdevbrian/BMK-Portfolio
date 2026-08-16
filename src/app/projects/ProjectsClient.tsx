"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { ArrowUpRight, FolderGit2 } from "lucide-react"
import { projects, type Project } from "@/data/projects"
import { TiltCard } from "@/components/fx/TiltCard"
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder"
import { Badge } from "@/components/ui/Badge"
import { Reveal } from "@/components/fx/Reveal"
import { cn } from "@/lib/cn"

const FILTER_OPTIONS = [
  "All",
  "Mobile",
  "Web",
  "AI",
  "Payments",
  "Solo",
  "Partnered",
] as const

type FilterType = (typeof FILTER_OPTIONS)[number]

export function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All")

  const matchesFilter = (project: Project, filter: FilterType): boolean => {
    if (filter === "All") return true
    if (filter === "Solo" || filter === "Partnered") return project.ownership === filter
    if (filter === "Mobile" || filter === "Web" || filter === "AI" || filter === "Payments") {
      return project.categories?.includes(filter) ?? false
    }
    return true
  }

  const filteredProjects = projects.filter((p) => matchesFilter(p, activeFilter))

  return (
    <div className="flex flex-col gap-10">
      {/* Filter Pills with animated layoutId indicator */}
      <Reveal direction="up" delay={0.1}>
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-[var(--r-pill)] glass border border-[var(--line)] w-max max-w-full">
          {FILTER_OPTIONS.map((filter) => {
            const isActive = activeFilter === filter
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "relative px-4 py-1.5 text-xs font-medium rounded-[var(--r-pill)] transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--teal)]",
                  isActive
                    ? "text-[#061215] font-semibold"
                    : "text-[var(--text-2)] hover:text-[var(--text)]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="project-filter-pill"
                    className="absolute inset-0 bg-gradient-to-r from-[var(--teal)] to-[var(--sky)] rounded-[var(--r-pill)] z-0 shadow-[0_0_14px_rgba(45,212,191,0.45)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            )
          })}
        </div>
      </Reveal>

      {/* Grid of Projects */}
      {filteredProjects.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <Link href={`/projects/${project.slug}`} className="block h-full group">
                  <TiltCard className="p-4 bg-[var(--surface)] h-full flex flex-col justify-between">
                    <div>
                      {/* Cover Thumbnail */}
                      <div className="relative rounded-[var(--r)] overflow-hidden mb-4">
                        <ImagePlaceholder
                          src={project.cover}
                          alt={project.title}
                          label={`${project.title} Preview`}
                          aspect="video"
                          className="group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>

                      {/* Meta chips */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <Badge variant={project.accent} size="sm">
                          {project.ownership}
                        </Badge>
                        <span className="text-[11px] font-mono text-[var(--text-2)]">
                          {project.period}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold font-heading text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors flex items-center justify-between">
                        <span>{project.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-[var(--text-2)] group-hover:text-[var(--accent-text)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </h3>

                      {/* Tagline */}
                      <p className="text-xs sm:text-sm text-[var(--text-2)] line-clamp-2 mt-2 leading-relaxed">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Stack preview */}
                    <div className="pt-4 mt-4 border-t border-[var(--line)] flex flex-wrap gap-1.5">
                      {project.stack
                        .flatMap((s) => s.items)
                        .slice(0, 4)
                        .map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-2)] border border-[var(--line)]"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  </TiltCard>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty Slot Showcase during scaffold stage */
        <Reveal direction="up" delay={0.15}>
          <div className="glass rounded-[var(--r-xl)] border border-dashed border-[var(--line-strong)] p-12 text-center flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--surface-2)] border border-[var(--line)] flex items-center justify-center text-[var(--teal)]">
              <FolderGit2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold font-heading text-[var(--text)]">
              Projects Slot Ready
            </h3>
            <p className="text-sm text-[var(--text-2)] max-w-md">
              Add your project records into <code className="text-[var(--teal)] font-mono">src/data/projects.ts</code>. The slug paths, filter categories (All / Mobile / Web / AI / Payments / Solo / Partnered), and dynamic cards with TiltCard 3D effects will automatically bind and render.
            </p>

            {/* Placeholder showcase grid */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 max-w-3xl">
              <TiltCard className="p-4 bg-[var(--surface)] text-left">
                <ImagePlaceholder label="cbc-ai cover placeholder" aspect="video" />
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="teal">Solo</Badge>
                  <span className="text-[10px] font-mono text-[var(--text-2)]">2024</span>
                </div>
                <h4 className="font-bold text-sm text-[var(--text)] mt-2 font-heading">CBC AI Platform</h4>
                <p className="text-xs text-[var(--text-2)] mt-1">AI-assisted educational system</p>
              </TiltCard>

              <TiltCard className="p-4 bg-[var(--surface)] text-left">
                <ImagePlaceholder label="tuko-kadi cover placeholder" aspect="video" />
                <div className="mt-3 flex items-center justify-between">
                  <Badge variant="violet">Partnered</Badge>
                  <span className="text-[10px] font-mono text-[var(--text-2)]">2024</span>
                </div>
                <h4 className="font-bold text-sm text-[var(--text)] mt-2 font-heading">Tuko Kadi</h4>
                <p className="text-xs text-[var(--text-2)] mt-1">Digital payments & card platform</p>
              </TiltCard>
            </div>
          </div>
        </Reveal>
      )}
    </div>
  )
}
