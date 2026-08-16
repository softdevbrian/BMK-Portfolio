import { type ReactNode } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { ScrollProgress } from "./ScrollProgress"
import { AuroraBackground } from "@/components/fx/AuroraBackground"
import { CursorGlow } from "@/components/fx/CursorGlow"
import { NoiseOverlay } from "@/components/fx/NoiseOverlay"

interface PageShellProps {
  children: ReactNode
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-[rgba(45,212,191,0.3)]">
      {/* Skip to main content accessibility link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[var(--teal)] focus:text-[#0B0B10] focus:font-semibold focus:rounded-[var(--r)] focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Global Background Elements */}
      <AuroraBackground />
      <NoiseOverlay />
      <CursorGlow />
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 w-full pt-24 md:pt-28">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
