"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Play,
  Smartphone,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Layers,
} from "lucide-react"
import { type Project } from "@/data/projects"
import { Reveal } from "@/components/fx/Reveal"
import { TiltCard } from "@/components/fx/TiltCard"
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Stat } from "@/components/ui/Stat"
import { GithubIcon } from "@/components/ui/Icon"
import { cn } from "@/lib/cn"
import { motion, AnimatePresence } from "motion/react"

interface ProjectDetailClientProps {
  project: Project
  prevProject?: { slug: string; title: string } | null
  nextProject?: { slug: string; title: string } | null
}

export function ProjectDetailClient({
  project,
  prevProject,
  nextProject,
}: ProjectDetailClientProps) {
  const [openChallengeIndex, setOpenChallengeIndex] = useState<number | null>(0)
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null)

  const activeLightboxShot =
    activeLightboxIndex !== null && project.shots && project.shots[activeLightboxIndex]
      ? project.shots[activeLightboxIndex]
      : null

  const totalShots = project.shots ? project.shots.length : 0

  useEffect(() => {
    if (activeLightboxIndex === null || totalShots === 0) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActiveLightboxIndex((prev) =>
          prev !== null && prev > 0 ? prev - 1 : totalShots - 1
        )
      } else if (e.key === "ArrowRight") {
        setActiveLightboxIndex((prev) =>
          prev !== null && prev < totalShots - 1 ? prev + 1 : 0
        )
      } else if (e.key === "Escape") {
        setActiveLightboxIndex(null)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeLightboxIndex, totalShots])

  const toggleChallenge = (index: number) => {
    setOpenChallengeIndex(openChallengeIndex === index ? null : index)
  }

  const handlePrevShot = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (totalShots === 0) return
    setActiveLightboxIndex((prev) =>
      prev !== null && prev > 0 ? prev - 1 : totalShots - 1
    )
  }

  const handleNextShot = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (totalShots === 0) return
    setActiveLightboxIndex((prev) =>
      prev !== null && prev < totalShots - 1 ? prev + 1 : 0
    )
  }

  return (
    <article className="wrap py-8 md:py-12 flex flex-col gap-12 sm:gap-16">
      {/* Header Back Button & Meta Breadcrumb */}
      <div className="flex flex-col gap-4">
        <Reveal direction="down" delay={0.05}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-2)] hover:text-[var(--accent-text)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--teal)] rounded-md w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Projects</span>
          </Link>
        </Reveal>

        {/* Title & Tagline Header */}
        <div className="flex flex-col gap-3">
          <Reveal direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant={project.accent}>{project.ownership}</Badge>
              <span className="font-mono text-xs text-[var(--text-2)]">•</span>
              <span className="font-mono text-xs text-[var(--teal)] font-semibold">
                {project.status}
              </span>
              <span className="font-mono text-xs text-[var(--text-2)]">•</span>
              <span className="font-mono text-xs text-[var(--text-2)]">{project.period}</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-[var(--text)] tracking-tight">
              {project.title}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-base sm:text-lg text-[var(--text-2)] max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          </Reveal>
        </div>

        {/* External Links Bar */}
        {project.links && project.links.length > 0 && (
          <Reveal direction="up" delay={0.25}>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {project.links.map((link) => (
                <Button
                  key={link.href}
                  href={link.href}
                  external
                  variant={link.kind === "live" ? "primary" : "secondary"}
                  size="sm"
                  leftIcon={
                    link.kind === "repo" ? (
                      <GithubIcon className="w-4 h-4" />
                    ) : link.kind === "store" ? (
                      <Smartphone className="w-4 h-4" />
                    ) : link.kind === "demo" ? (
                      <Play className="w-4 h-4" />
                    ) : (
                      <ExternalLink className="w-4 h-4" />
                    )
                  }
                >
                  {link.label}
                </Button>
              ))}
            </div>
          </Reveal>
        )}
      </div>

      {/* Hero Cover Image Banner */}
      <Reveal direction="up" delay={0.3}>
        <div className="w-full rounded-[var(--r-xl)] overflow-hidden glass p-2 border border-[var(--line-strong)] shadow-[var(--glow)]">
          <div className="relative aspect-video w-full overflow-hidden rounded-[calc(var(--r-xl)-4px)]">
            <ImagePlaceholder
              src={project.cover}
              alt={project.title}
              label={`${project.title} Cover Banner`}
              aspect="video"
              fitMode="cover"
              objectPosition="top center"
              priority
            />
          </div>
        </div>
      </Reveal>

      {/* Quantifiable Impact Metrics Bar */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 rounded-[var(--r-xl)] glass border border-[var(--line)]">
          {project.metrics.map((metric, mIdx) => (
            <Reveal key={mIdx} direction="up" delay={0.1 * mIdx}>
              <Stat
                value={metric.value}
                label={metric.label}
                prefix={metric.prefix}
                suffix={metric.suffix}
              />
            </Reveal>
          ))}
        </section>
      )}

      {/* Main Content Grid: Problem vs Solution */}
      <div className="flex flex-col gap-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Problem Statement */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <Reveal direction="up" delay={0.1}>
              <span className="eyebrow">The Challenge</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[var(--text)]">
                Problem & Context
              </h2>
            </Reveal>

            <Reveal direction="up" delay={0.15}>
              <div className="glass p-6 rounded-[var(--r-lg)] border border-[var(--line)] text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
                {project.problem}
              </div>
            </Reveal>

            {project.summary && (
              <Reveal direction="up" delay={0.2}>
                <p className="text-sm text-[var(--text-2)] leading-relaxed">
                  {project.summary}
                </p>
              </Reveal>
            )}
          </div>

          {/* Highlights / What I Built */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <Reveal direction="up" delay={0.1}>
              <span className="eyebrow">Architecture & Delivery</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[var(--text)]">
                Key Architectural Highlights
              </h2>
            </Reveal>

            <div className="flex flex-col gap-3">
              {project.highlights.map((highlight, hIdx) => (
                <Reveal key={hIdx} direction="up" delay={0.1 + hIdx * 0.05}>
                  <div className="flex items-start gap-3 p-4 rounded-[var(--r)] glass border border-[var(--line)] text-sm text-[var(--text)]">
                    <CheckCircle2 className="w-5 h-5 text-[var(--teal)] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{highlight}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Challenges & Solutions Accordion */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="flex flex-col gap-6">
            <Reveal direction="up" delay={0.1}>
              <span className="eyebrow">Deep Dive</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[var(--text)]">
                Engineering Challenges & Solutions
              </h2>
            </Reveal>

            <div className="flex flex-col gap-4">
              {project.challenges.map((challenge, cIdx) => {
                const isOpen = openChallengeIndex === cIdx
                return (
                  <Reveal key={cIdx} direction="up" delay={0.08 * cIdx}>
                    <div className="rounded-[var(--r-lg)] glass border border-[var(--line)] overflow-hidden transition-colors">
                      <button
                        onClick={() => toggleChallenge(cIdx)}
                        aria-expanded={isOpen}
                        className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer hover:bg-[var(--surface-2)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--teal)]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs text-[var(--teal)] bg-[rgba(45,212,191,0.1)] px-2.5 py-1 rounded">
                            0{cIdx + 1}
                          </span>
                          <span className="font-heading font-semibold text-base sm:text-lg text-[var(--text)]">
                            {challenge.title}
                          </span>
                        </div>
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 text-[var(--text-2)] transition-transform duration-200 shrink-0",
                            isOpen && "rotate-180 text-[var(--teal)]"
                          )}
                        />
                      </button>

                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="px-5 pb-5 pt-1 border-t border-[var(--line)] grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                          <div className="flex flex-col gap-2 p-4 rounded-[var(--r)] bg-[rgba(240,118,107,0.05)] border border-[rgba(240,118,107,0.2)]">
                            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--danger)]">
                              <AlertTriangle className="w-4 h-4" />
                              <span>THE HARD PROBLEM</span>
                            </div>
                            <p className="text-xs sm:text-sm text-[var(--text-2)] leading-relaxed">
                              {challenge.problem}
                            </p>
                          </div>

                          <div className="flex flex-col gap-2 p-4 rounded-[var(--r)] bg-[rgba(45,212,191,0.05)] border border-[rgba(45,212,191,0.2)]">
                            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--teal)]">
                              <Lightbulb className="w-4 h-4" />
                              <span>THE ARCHITECTURAL SOLUTION</span>
                            </div>
                            <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                              {challenge.solution}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </section>
        )}

        {/* Tech Stack Matrix */}
        {project.stack && project.stack.length > 0 && (
          <section className="flex flex-col gap-6">
            <Reveal direction="up" delay={0.1}>
              <span className="eyebrow">Technology Stack</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[var(--text)]">
                Tools & Technologies Used
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.stack.map((group, gIdx) => (
                <Reveal key={gIdx} direction="up" delay={0.08 * gIdx}>
                  <div className="glass p-5 rounded-[var(--r-lg)] border border-[var(--line)] flex flex-col gap-3 h-full">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--accent-text)] uppercase tracking-wider">
                      <Layers className="w-4 h-4 text-[var(--teal)]" />
                      <span>{group.group}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="text-xs font-mono text-[var(--text-2)] bg-[var(--surface-2)] px-2.5 py-1 rounded border border-[var(--line)]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Screenshot Gallery with Lightbox */}
        {project.shots && project.shots.length > 0 && (
          <section className="flex flex-col gap-6">
            <Reveal direction="up" delay={0.1}>
              <span className="eyebrow">Interface Gallery</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[var(--text)]">
                Visual Walkthrough & Captures
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.shots.map((shot, sIdx) => (
                <Reveal key={sIdx} direction="up" delay={0.08 * sIdx}>
                  <div
                    onClick={() => setActiveLightboxIndex(sIdx)}
                    className="cursor-pointer group flex flex-col gap-2"
                  >
                    <TiltCard className="p-2 bg-[var(--surface)]">
                      <ImagePlaceholder
                        src={shot.src}
                        alt={shot.caption}
                        label={shot.caption}
                        aspect={shot.aspect}
                        className="group-hover:scale-[1.02] transition-transform duration-300"
                      />
                    </TiltCard>
                    <span className="text-xs text-[var(--text-2)] font-mono px-1">
                      {shot.caption}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Lightbox Modal with Next / Back Navigation */}
        <AnimatePresence>
          {activeLightboxShot && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxIndex(null)}
              className="fixed inset-0 z-50 bg-[var(--bg)]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out select-none"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveLightboxIndex(null)}
                aria-label="Close Lightbox"
                className="absolute top-6 right-6 p-2 rounded-full glass text-[var(--text)] hover:text-[var(--teal)] hover:border-[var(--teal)] transition-colors focus:outline-none cursor-pointer z-50"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Left Arrow (Previous Shot) */}
              {totalShots > 1 && (
                <button
                  onClick={handlePrevShot}
                  aria-label="Previous screenshot"
                  title="Previous (Left Arrow)"
                  className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-[var(--line-strong)] text-[var(--text)] hover:text-[var(--teal)] hover:border-[var(--teal)] hover:scale-110 active:scale-95 transition-all cursor-pointer z-50 shadow-2xl"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Right Arrow (Next Shot) */}
              {totalShots > 1 && (
                <button
                  onClick={handleNextShot}
                  aria-label="Next screenshot"
                  title="Next (Right Arrow)"
                  className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full glass border border-[var(--line-strong)] text-[var(--text)] hover:text-[var(--teal)] hover:border-[var(--teal)] hover:scale-110 active:scale-95 transition-all cursor-pointer z-50 shadow-2xl"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              {/* Main Lightbox Content Container */}
              <div
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "relative flex flex-col items-center gap-3 cursor-default p-2",
                  activeLightboxShot.aspect === "phone"
                    ? "h-[78vh] max-h-[82vh] aspect-[9/16] w-auto max-w-[90vw]"
                    : "w-full max-w-4xl max-h-[80vh]"
                )}
              >
                <div className="w-full h-full rounded-[var(--r-lg)] overflow-hidden glass p-2 border border-[var(--line-strong)] flex items-center justify-center">
                  <ImagePlaceholder
                    src={activeLightboxShot.src}
                    alt={activeLightboxShot.caption}
                    label={activeLightboxShot.caption}
                    aspect={activeLightboxShot.aspect}
                    fitMode="contain"
                    objectPosition="center"
                    className="w-full h-full"
                  />
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <p className="font-mono text-xs sm:text-sm text-[var(--text)] bg-[var(--surface)] px-4 py-1.5 rounded-full border border-[var(--line)]">
                    {activeLightboxShot.caption}
                  </p>
                  {totalShots > 1 && (
                    <span className="font-mono text-xs text-[var(--teal)] bg-[var(--surface-2)] px-3 py-1.5 rounded-full border border-[var(--line)] font-semibold">
                      {(activeLightboxIndex ?? 0) + 1} / {totalShots}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prev / Next Project Navigation Bar */}
        <div className="pt-12 border-t border-[var(--line)] grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="glass p-5 rounded-[var(--r-lg)] border border-[var(--line)] hover:border-[var(--teal)] transition-all flex flex-col gap-1 group"
            >
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-2)] group-hover:text-[var(--teal)]">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Project</span>
              </div>
              <span className="font-heading font-semibold text-base text-[var(--text)]">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextProject && (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="glass p-5 rounded-[var(--r-lg)] border border-[var(--line)] hover:border-[var(--teal)] transition-all flex flex-col gap-1 sm:items-end text-left sm:text-right group sm:col-start-2"
            >
              <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-2)] group-hover:text-[var(--teal)]">
                <span>Next Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="font-heading font-semibold text-base text-[var(--text)]">
                {nextProject.title}
              </span>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
