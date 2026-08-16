"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Play,
  Smartphone,
  ChevronDown,
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
  const [activeLightboxShot, setActiveLightboxShot] = useState<{
    src: string
    caption: string
    aspect: "phone" | "wide"
  } | null>(null)

  const toggleChallenge = (idx: number) => {
    setOpenChallengeIndex(openChallengeIndex === idx ? null : idx)
  }

  const linkIcons = {
    live: <ExternalLink className="w-4 h-4" />,
    store: <Smartphone className="w-4 h-4" />,
    repo: <GithubIcon className="w-4 h-4" />,
    demo: <Play className="w-4 h-4" />,
  }

  return (
    <article className="py-12 md:py-20 flex flex-col gap-16 md:gap-24">
      {/* Back Link */}
      <div className="wrap">
        <Reveal direction="up" delay={0.05}>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--text-2)] hover:text-[var(--accent-text)] transition-colors mb-6 group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to all projects</span>
          </Link>
        </Reveal>

        {/* Hero Section */}
        <div className="flex flex-col gap-6 max-w-4xl">
          <Reveal direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant={project.accent} size="md">
                {project.ownership} Project
              </Badge>
              <span className="font-mono text-xs text-[var(--text-2)]">
                {project.period}
              </span>
              <span className="text-[var(--text-2)] opacity-30">•</span>
              <span className="font-mono text-xs text-[var(--ok)]">
                {project.status}
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.15}>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-heading text-[var(--text)] tracking-tight leading-[1.1]">
              {project.title}
            </h1>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="text-lg sm:text-xl text-[var(--text-2)] leading-relaxed">
              {project.tagline}
            </p>
          </Reveal>

          {/* Meta Role & Links Row */}
          <Reveal direction="up" delay={0.25}>
            <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-[var(--line)]">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-2)]">
                  My Role
                </span>
                <span className="text-sm font-semibold text-[var(--text)] font-heading">
                  {project.role}
                </span>
              </div>

              {/* Action Link Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {project.links.map((link) => (
                  <Button
                    key={link.label}
                    href={link.href}
                    variant={link.kind === "live" ? "primary" : "outline"}
                    size="sm"
                    external
                    rightIcon={linkIcons[link.kind]}
                  >
                    {link.label}
                  </Button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Cover Image in Glass Container */}
        <Reveal direction="scale" delay={0.2} className="mt-4">
          <div className="rounded-[var(--r-xl)] p-2 sm:p-3 glass border border-[var(--line-strong)] shadow-[var(--sh-1)]">
            <ImagePlaceholder
              src={project.cover}
              alt={`${project.title} Cover`}
              label={`${project.title} Cover`}
              aspect="video"
              priority
            />
          </div>
        </Reveal>
      </div>

      {/* Metrics Band */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="py-6 border-y border-[var(--line)] bg-[rgba(255,255,255,0.015)]">
          <div className="wrap">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {project.metrics.map((metric, mIdx) => (
                <Stat
                  key={mIdx}
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  label={metric.label}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="wrap flex flex-col gap-16 md:gap-24">
        {/* Two-Column Problem & Highlights Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
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

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="p-5 pt-0 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[var(--line)] bg-[rgba(0,0,0,0.15)] text-sm">
                              {/* Problem */}
                              <div className="p-4 rounded-[var(--r)] bg-[rgba(240,118,107,0.06)] border border-[rgba(240,118,107,0.2)] flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[var(--danger)] font-mono text-xs font-semibold uppercase">
                                  <AlertTriangle className="w-4 h-4 shrink-0" />
                                  <span>The Bottleneck</span>
                                </div>
                                <p className="text-[var(--text-2)] leading-relaxed">
                                  {challenge.problem}
                                </p>
                              </div>

                              {/* Solution */}
                              <div className="p-4 rounded-[var(--r)] bg-[rgba(45,212,191,0.06)] border border-[rgba(45,212,191,0.2)] flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-[var(--accent-text)] font-mono text-xs font-semibold uppercase">
                                  <Lightbulb className="w-4 h-4 shrink-0" />
                                  <span>Technical Solution</span>
                                </div>
                                <p className="text-[var(--text)] leading-relaxed">
                                  {challenge.solution}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </section>
        )}

        {/* Tech Stack Grouped Chips */}
        {project.stack && project.stack.length > 0 && (
          <section className="flex flex-col gap-6">
            <Reveal direction="up" delay={0.1}>
              <span className="eyebrow">Technology Breakdown</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[var(--text)]">
                Stack & Dependencies
              </h2>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {project.stack.map((group, gIdx) => (
                <Reveal key={gIdx} direction="up" delay={0.08 * gIdx}>
                  <div className="glass p-5 rounded-[var(--r-lg)] border border-[var(--line)] h-full flex flex-col gap-3">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--teal)] pb-2 border-b border-[var(--line)]">
                      <Layers className="w-3.5 h-3.5" />
                      <span>{group.group}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 rounded bg-[var(--surface-2)] text-xs font-mono text-[var(--text)] border border-[var(--line)]"
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
                    onClick={() => setActiveLightboxShot(shot)}
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

        {/* Lightbox Modal */}
        <AnimatePresence>
          {activeLightboxShot && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxShot(null)}
              className="fixed inset-0 z-50 bg-[var(--bg)]/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
            >
              <button
                onClick={() => setActiveLightboxShot(null)}
                aria-label="Close Lightbox"
                className="absolute top-6 right-6 p-2 rounded-full glass text-[var(--text)] hover:border-[var(--teal)] transition-colors focus:outline-none cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center gap-4 cursor-default"
              >
                <div className="w-full rounded-[var(--r-lg)] overflow-hidden glass p-2 border border-[var(--line-strong)]">
                  <ImagePlaceholder
                    src={activeLightboxShot.src}
                    alt={activeLightboxShot.caption}
                    label={activeLightboxShot.caption}
                    aspect={activeLightboxShot.aspect}
                  />
                </div>
                <p className="font-mono text-sm text-[var(--text)] bg-[var(--surface)] px-4 py-1.5 rounded-full border border-[var(--line)]">
                  {activeLightboxShot.caption}
                </p>
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
