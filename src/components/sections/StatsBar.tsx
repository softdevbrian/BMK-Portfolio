"use client"

import { Reveal } from "@/components/fx/Reveal"
import { Stat } from "@/components/ui/Stat"

export function StatsBar() {
  return (
    <section className="py-8">
      <div className="wrap">
        <Reveal direction="up" delay={0.1}>
          {/* ===== CONTENT SLOT: home-stats ===== */}
          <div className="glass rounded-[var(--r-xl)] border border-[var(--line-strong)] p-2 sm:p-4 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--line)] shadow-[var(--sh-1)]">
            <Stat value="1000" suffix="+" label="Play Store Downloads" />
            <Stat value="200" suffix="k+" label="Lines of Solo Code" />
            <Stat value="4" label="Production Systems Shipped" />
            <Stat value="5" prefix="< " suffix=" min" label="M-Pesa Payroll Payouts" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
