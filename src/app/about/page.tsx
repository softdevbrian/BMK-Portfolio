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
                  I am a full-stack product engineer who ships robust software solutions from concept through production. As Mobile Lead for the CBC AI Platform at Bombay Softwares, I own the mobile application layer end to end for a production AI education platform used daily by Kenyan schools — architecture, design system, state management, API integration and Play Store release engineering — co-developed with a partner engineering team (1,000+ installs). Alongside collaborated platforms like Tuko Pamoja, I have independently designed, built, and deployed seven additional production systems across high-concurrency ticketing, offline-first POS, PropTech ledgers, native Android M-Pesa tracking, agricultural ERP, P2P networking, and civic transparency.
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
                  9 live production systems spanning FinTech, Offline-First POS, Concurrency &amp; AI.
                </h3>
              </Reveal>

              <Reveal direction="up" delay={0.2}>
                <div className="flex flex-col gap-3 text-sm sm:text-base text-[var(--text-2)] leading-relaxed">
                  <p>
                    My portfolio spans demanding engineering domains: high-concurrency seat locking and offline Ed25519 QR verification (TikitiPro); offline-first multi-tenant retail POS with UUIDv7 outbox sync and conflict resolution (DukaSync); double-entry fund accounting with 247 automated tests (Tuko Pamoja, partnered); 4-bucket atomic rental ledgers (KejaFlow); native Kotlin SMS interception with floating overlays (Kichele); an enterprise M-Pesa B2C payroll and tea estate ERP (TFMS); an offline P2P multiplayer card engine (Tuko Kadi); and a 47-county civic transparency platform (Uongozi-254).
                  </p>
                  <p>
                    I bring a strong bias toward atomic financial integrity, zero-infrastructure architectures, and resilient systems built for low-connectivity, real-world East African environments.
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
                  Serving as Mobile Lead for the CBC AI Platform at Bombay Softwares while completing my BSc in Software Development at KCA University has honed my ability to navigate production delivery pressures, architect cross-platform mobile systems, and coordinate engineering execution with partner teams.
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
