"use client"

import { ArrowDown, ArrowUpRight, Mail, MapPin, Sparkles, Terminal, Layers } from "lucide-react"
import { site } from "@/data/site"
import { SplitText } from "@/components/fx/SplitText"
import { ScrambleText } from "@/components/fx/ScrambleText"
import { MagneticButton } from "@/components/fx/MagneticButton"
import { Reveal } from "@/components/fx/Reveal"
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder"
import { Button } from "@/components/ui/Button"
import { GithubIcon } from "@/components/ui/Icon"
import { motion } from "motion/react"

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-6rem)] flex flex-col justify-center items-center py-12 md:py-20">
      <div className="wrap w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Bio & Intro */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* Eyebrow */}
          <div>
            {/* ===== CONTENT SLOT: hero-eyebrow ===== */}
            <Reveal direction="up" delay={0.05}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[var(--r-pill)] glass border border-[var(--line-strong)] mb-2">
                <span className="w-2 h-2 rounded-full bg-[var(--teal)] animate-pulse shadow-[0_0_8px_var(--teal)]" />
                <span className="eyebrow">CTO & Full-Stack Product Engineer</span>
              </div>
            </Reveal>
          </div>

          {/* Main Headline */}
          <div className="flex flex-col gap-2">
            {/* ===== CONTENT SLOT: hero-headline ===== */}
            <SplitText
              text="Shipping production systems end to end — mobile, backend, data & AI"
              as="h1"
              className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] text-[var(--text)] font-heading"
              delay={0.1}
            />
          </div>

          {/* Role line with ScrambleText */}
          <div className="flex items-center gap-3">
            {/* ===== CONTENT SLOT: hero-roles ===== */}
            <Reveal direction="up" delay={0.2}>
              <div className="flex items-center gap-2 font-mono text-sm sm:text-base text-[var(--accent-text)] bg-[var(--surface-2)] px-3.5 py-1.5 rounded-[var(--r)] border border-[var(--line)]">
                <Terminal className="w-4 h-4 shrink-0 text-[var(--teal)]" />
                <ScrambleText text="AI Platforms · Flutter Mobile · Django / Next.js Backends" className="font-semibold" />
              </div>
            </Reveal>
          </div>

          {/* Paragraph */}
          <div>
            {/* ===== CONTENT SLOT: hero-paragraph ===== */}
            <Reveal direction="up" delay={0.3}>
              <p className="text-base sm:text-lg text-[var(--text-2)] max-w-xl leading-relaxed">
                Co-architect of CBC AI (live in Kenyan schools with 1,000+ Play Store downloads).
                Independently designed, built and deployed three further production systems: TFMS (M-Pesa B2C payroll ERP),
                Tuko Kadi (offline P2P multiplayer card game), and Finance Tracker. Strong bias toward context-rich AI systems and zero-infrastructure architectures.
              </p>
            </Reveal>
          </div>

          {/* Action Buttons with Magnetic fx */}
          <Reveal direction="up" delay={0.4}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <MagneticButton>
                <Button href="/projects" variant="primary" size="lg">
                  Explore Projects
                </Button>
              </MagneticButton>

              <MagneticButton>
                <Button
                  href={site.cv}
                  variant="secondary"
                  size="lg"
                  external
                  rightIcon={<ArrowUpRight className="w-4 h-4" />}
                >
                  Download CV
                </Button>
              </MagneticButton>
            </div>
          </Reveal>

          {/* Social / Info Badges */}
          <Reveal direction="up" delay={0.5}>
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-[var(--line)] text-xs text-[var(--text-2)]">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[var(--accent-text)] transition-colors"
              >
                <GithubIcon className="w-4 h-4 text-[var(--teal)]" />
                <span className="font-mono">github.com/softdevbrian</span>
              </a>

              <a
                href={`mailto:${site.emailPrimary}`}
                className="flex items-center gap-2 hover:text-[var(--accent-text)] transition-colors"
              >
                <Mail className="w-4 h-4 text-[var(--sky)]" />
                <span className="font-mono">{site.emailPrimary}</span>
              </a>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[var(--violet)]" />
                <span className="font-mono">{site.location}</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right Column: Passport in Animated Ring + Floating Glass Chips */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <Reveal direction="scale" delay={0.2} className="relative w-full max-w-[360px] sm:max-w-[420px]">
            {/* Outer Rotating Gradient Ring */}
            <div className="relative p-3">
              <div
                aria-hidden="true"
                className="absolute inset-0 rounded-[var(--r-xl)] bg-gradient-to-tr from-[var(--teal)] via-[var(--sky)] to-[var(--violet)] opacity-70 blur-md animate-conic-slow -z-10"
              />

              {/* Passport Image Placeholder with Square Aspect */}
              <div className="relative rounded-[var(--r-xl)] overflow-hidden p-1 bg-[var(--bg)] border border-[var(--line-strong)]">
                <ImagePlaceholder
                  src="/images/passport.png"
                  alt={site.name}
                  label="Brian Maina Kuria (800x800)"
                  aspect="square"
                  objectPosition="center 15%"
                  priority
                />
              </div>

              {/* Floating Glass Badge 1: Top Left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 glass px-3.5 py-2 rounded-[var(--r-lg)] border border-[var(--line-strong)] shadow-[var(--sh-1)] flex items-center gap-2.5 z-20"
              >
                <div className="w-6 h-6 rounded-full bg-[rgba(45,212,191,0.2)] flex items-center justify-center text-[var(--teal)]">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[var(--text-2)] uppercase">Startup Leadership</span>
                  <span className="text-xs font-semibold text-[var(--text)]">CTO @ Bombay Softwares</span>
                </div>
              </motion.div>

              {/* Floating Glass Badge 2: Bottom Right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 glass px-3.5 py-2 rounded-[var(--r-lg)] border border-[var(--line-strong)] shadow-[var(--sh-1)] flex items-center gap-2.5 z-20"
              >
                <div className="w-6 h-6 rounded-full bg-[rgba(167,139,250,0.2)] flex items-center justify-center text-[var(--violet)]">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-[var(--text-2)] uppercase">Production Systems</span>
                  <span className="text-xs font-semibold text-[var(--text)]">200k+ Lines Solo</span>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="pt-12 flex flex-col items-center gap-2 text-[var(--text-2)]">
        <span className="text-[11px] font-mono uppercase tracking-widest opacity-60">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 text-[var(--teal)]" />
        </motion.div>
      </div>
    </section>
  )
}
