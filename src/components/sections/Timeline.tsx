"use client"

import { timeline, type TimelineItem } from "@/data/timeline"
import { Reveal } from "@/components/fx/Reveal"
import { Briefcase, Calendar, CheckCircle2 } from "lucide-react"

const defaultTimelinePlaceholder: TimelineItem[] = [
  {
    period: "2023 — Present",
    title: "Chief Technology Officer / Lead Engineer",
    org: "Tech Startup / Product Studio",
    points: [
      "Led end-to-end architecture and engineering of high-throughput distributed systems.",
      "Spearheaded multi-platform mobile and web product releases with 99.9% uptime.",
      "Mentored engineering talent and established CI/CD and automated testing standards.",
    ],
  },
  {
    period: "2021 — 2023",
    title: "Senior Full-Stack Software Engineer",
    org: "Enterprise Solutions",
    points: [
      "Designed and deployed mission-critical microservices and responsive frontends.",
      "Optimized database query latency by 45% across relational and caching layers.",
    ],
  },
]

export function Timeline() {
  const items = timeline.length > 0 ? timeline : defaultTimelinePlaceholder

  return (
    <div className="relative pl-6 md:pl-10 border-l border-[var(--line-strong)] flex flex-col gap-12 my-8">
      {items.map((item, idx) => (
        <Reveal key={idx} direction="up" delay={0.1 * idx}>
          <div className="relative">
            {/* Glowing timeline node */}
            <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[var(--bg)] border-2 border-[var(--teal)] flex items-center justify-center shadow-[0_0_10px_var(--teal)]">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal)]" />
            </div>

            {/* Content card */}
            <div className="glass rounded-[var(--r-lg)] p-6 border border-[var(--line)] hover:border-[var(--line-strong)] transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[var(--accent-text)] bg-[var(--surface-2)] px-2.5 py-1 rounded-[var(--r-pill)] border border-[var(--line)]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{item.period}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--text-2)] font-mono">
                  <Briefcase className="w-3.5 h-3.5 text-[var(--sky)]" />
                  <span>{item.org}</span>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-heading text-[var(--text)] mb-3">
                {item.title}
              </h3>

              <ul className="flex flex-col gap-2 pt-1">
                {item.points.map((point, pIdx) => (
                  <li key={pIdx} className="flex items-start gap-2.5 text-sm text-[var(--text-2)]">
                    <CheckCircle2 className="w-4 h-4 text-[var(--teal)] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}
