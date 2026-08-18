import type { Metadata } from "next"
import { Award, Compass, HeartHandshake, Terminal } from "lucide-react"
import { site } from "@/data/site"
import { Reveal } from "@/components/fx/Reveal"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { AboutProfileCard } from "@/components/sections/AboutProfileCard"
import { Timeline } from "@/components/sections/Timeline"
import { SkillsGrid } from "@/components/sections/SkillsGrid"

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${site.name}, background, engineering philosophy, and career journey.`,
  openGraph: {
    title: `About | ${site.name}`,
    description: `Engineering leadership, architectural philosophy, and career history of ${site.name}.`,
    images: ["/images/og.png"],
  },
}

export default function AboutPage() {
  return (
    <div className="py-12 md:py-16 flex flex-col gap-20">
      <div className="wrap">
        <SectionHeading
          eyebrow="Biography & Philosophy"
          title="Engineering & Leadership"
          description="A look into my technical journey, architecture principles, and track record."
        />

        {/* 2-Column Main Layout: Sticky Left Image / Info + Right Prose */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          {/* Sticky Left Column */}
          <AboutProfileCard />

          {/* Right Column: Prose & Timeline */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            {/* Section 1: Intro */}
            <section className="flex flex-col gap-4">
              {/* ===== CONTENT SLOT: about-intro ===== */}
              <Reveal direction="up" delay={0.15}>
                <div className="flex items-center gap-2 text-[var(--teal)] font-mono text-xs uppercase tracking-wider mb-1">
                  <Terminal className="w-4 h-4" />
                  <span>Introduction</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-[var(--text)]">
                  Building production systems end to end — mobile, backend, data, and deployment.
                </h3>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-base text-[var(--text-2)] leading-relaxed">
                  I am a CTO and full-stack product engineer who ships robust software solutions from concept through production. As Co-architect of CBC AI, an AI infrastructure platform for Kenyan schools live in production with 1,000+ Play Store downloads, I own the mobile application layer end to end. I have independently designed, built, and deployed three additional production systems across mobile, web, real-money M-Pesa payments, and offline P2P networking.
                </p>
              </Reveal>
            </section>

            {/* Section 2: The Story */}
            <section className="flex flex-col gap-4">
              {/* ===== CONTENT SLOT: about-story ===== */}
              <Reveal direction="up" delay={0.15}>
                <div className="flex items-center gap-2 text-[var(--sky)] font-mono text-xs uppercase tracking-wider mb-1">
                  <Award className="w-4 h-4" />
                  <span>Track Record & Systems</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[var(--text)]">
                  Over 200,000+ lines of solo production code authored and shipped.
                </h3>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-col gap-3 text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
                  <p>
                    My portfolio spans complex engineering domains: a real-money M-Pesa B2C payroll and farm ERP (TFMS, 151k+ lines in Python/Django) cutting wage disbursement times from 2–3 days to under 5 minutes; an offline-first P2P multiplayer card game (Tuko Kadi, 55k+ lines in Dart) running an embedded device WebSocket host and 4 behavioural bot AIs; and a multi-timeframe financial analytics dashboard (Finance Tracker) on serverless Postgres.
                  </p>
                  <p>
                    I bring a strong bias toward context-rich AI systems, zero-infrastructure architectures, and products that function reliably in low-connectivity, cost-conscious environments.
                  </p>
                </div>
              </Reveal>
            </section>

            {/* Section 3: Engineering Approach */}
            <section className="flex flex-col gap-4">
              {/* ===== CONTENT SLOT: about-approach ===== */}
              <Reveal direction="up" delay={0.15}>
                <div className="flex items-center gap-2 text-[var(--violet)] font-mono text-xs uppercase tracking-wider mb-1">
                  <Compass className="w-4 h-4" />
                  <span>Engineering Principles</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[var(--text)]">
                  Pragmatic architecture, production resilience, zero fluff.
                </h3>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="glass p-4 rounded-[var(--r)] border border-[var(--line)]">
                    <h4 className="font-heading font-semibold text-sm text-[var(--text)] mb-1">
                      1. Low-Connectivity & Offline First
                    </h4>
                    <p className="text-xs text-[var(--text-2)] leading-relaxed">
                      Designing resilient local-first states, embedded device-hosted protocols, and fault-tolerant sync that thrive with zero cloud dependency.
                    </p>
                  </div>
                  <div className="glass p-4 rounded-[var(--r)] border border-[var(--line)]">
                    <h4 className="font-heading font-semibold text-sm text-[var(--text)] mb-1">
                      2. Context-Rich AI Reasoning
                    </h4>
                    <p className="text-xs text-[var(--text-2)] leading-relaxed">
                      Designing every operational workflow to generate structured domain context that AI models and knowledge graphs can reliably reason over.
                    </p>
                  </div>
                  <div className="glass p-4 rounded-[var(--r)] border border-[var(--line)]">
                    <h4 className="font-heading font-semibold text-sm text-[var(--text)] mb-1">
                      3. Immutable Financial Ledgers
                    </h4>
                    <p className="text-xs text-[var(--text-2)] leading-relaxed">
                      Idempotent webhook handlers, dynamic callback dispatch, and 100% automated reconciliation for real-money transactions (M-Pesa B2C).
                    </p>
                  </div>
                  <div className="glass p-4 rounded-[var(--r)] border border-[var(--line)]">
                    <h4 className="font-heading font-semibold text-sm text-[var(--text)] mb-1">
                      4. Deterministic State & Testing
                    </h4>
                    <p className="text-xs text-[var(--text-2)] leading-relaxed">
                      Rigorous state-machine isolation, headless simulation testing (500+ matches/sec), and zero-defect release pipelines.
                    </p>
                  </div>
                </div>
              </Reveal>
            </section>

            {/* Experience & Career Timeline */}
            <section className="flex flex-col gap-4 pt-4 border-t border-[var(--line)]">
              <Reveal direction="up" delay={0.1}>
                <span className="eyebrow">Experience</span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[var(--text)] mt-1">
                  Career Milestones & Roles
                </h3>
              </Reveal>

              <Timeline />
            </section>

            {/* Section 4: Beyond the Code */}
            <section className="flex flex-col gap-4 pt-4 border-t border-[var(--line)]">
              {/* ===== CONTENT SLOT: about-beyond ===== */}
              <Reveal direction="up" delay={0.15}>
                <div className="flex items-center gap-2 text-[var(--accent-text)] font-mono text-xs uppercase tracking-wider mb-1">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Beyond Engineering</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-[var(--text)]">
                  Leadership, continuous delivery, and tech innovation.
                </h3>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <p className="text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
                  Serving as CTO of an EdTech startup while completing my BSc in Software Development at KCA University has honed my ability to navigate high-stakes production pressures, lead technical architectures, and balance product vision with pragmatic engineering execution.
                </p>
              </Reveal>
            </section>
          </div>
        </div>
      </div>

      {/* Full Skills Matrix Section */}
      <SkillsGrid />
    </div>
  )
}
