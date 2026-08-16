"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { Reveal } from "@/components/fx/Reveal"
import { MagneticButton } from "@/components/fx/MagneticButton"
import { Button } from "@/components/ui/Button"

export function CTABand() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="wrap">
        <Reveal direction="scale" delay={0.1}>
          {/* ===== CONTENT SLOT: cta-band ===== */}
          <div className="relative rounded-[var(--r-xl)] p-8 sm:p-12 md:p-16 overflow-hidden border border-[var(--line-strong)] bg-gradient-to-r from-[rgba(45,212,191,0.08)] via-[rgba(86,183,240,0.08)] to-[rgba(167,139,250,0.08)] backdrop-blur-xl shadow-[var(--sh-1)] text-center flex flex-col items-center justify-center gap-6">
            {/* Ambient inner glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-[radial-gradient(circle,rgba(45,212,191,0.15)_0%,transparent_70%)] blur-2xl -z-10"
            />

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[var(--r-pill)] glass border border-[var(--line)]">
              <Sparkles className="w-3.5 h-3.5 text-[var(--teal)]" />
              <span className="eyebrow">Ready for Collaboration</span>
            </div>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-heading text-[var(--text)] max-w-2xl leading-tight">
              Have a high-impact project in mind? Let&apos;s build it together.
            </h2>

            <p className="text-sm sm:text-base text-[var(--text-2)] max-w-xl leading-relaxed">
              Available for full-time leadership roles, architecture consulting, or end-to-end product development.
            </p>

            <div className="pt-4">
              <MagneticButton>
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a Conversation
                </Button>
              </MagneticButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
