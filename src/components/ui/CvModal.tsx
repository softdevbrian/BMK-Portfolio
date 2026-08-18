"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "motion/react"
import {
  Download,
  X,
  FileText,
  Award,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink,
  Phone,
  Mail,
  MapPin,
  Printer,
} from "lucide-react"
import { GithubIcon } from "@/components/ui/Icon"
import { site } from "@/data/site"
import { recommendationHtml } from "@/data/recommendationHtml"
import { cn } from "@/lib/cn"

interface CvModalProps {
  isOpen: boolean
  onClose: () => void
  initialTab?: "cv" | "recommendation"
}

/** Lock body scroll with scrollbar-width compensation to prevent layout shift */
function lockScroll() {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = "hidden"
  document.body.style.paddingRight = `${scrollbarWidth}px`
}

function unlockScroll() {
  document.body.style.overflow = ""
  document.body.style.paddingRight = ""
}

function DocumentationModalContent({
  onClose,
  initialTab = "cv",
}: {
  onClose: () => void
  initialTab?: "cv" | "recommendation"
}) {
  const [activeTab, setActiveTab] = useState<"cv" | "recommendation">(initialTab)
  const [zoom, setZoom] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(Number((z + 0.15).toFixed(2)), 2.2))
  const handleZoomOut = () => setZoom((z) => Math.max(Number((z - 0.15).toFixed(2)), 0.75))
  const handleResetZoom = () => setZoom(1)

  // Reset zoom on tab change
  const handleTabSwitch = (tab: "cv" | "recommendation") => {
    setActiveTab(tab)
    setZoom(1)
    if (containerRef.current) {
      containerRef.current.scrollTop = 0
    }
  }

  // Scroll lock + ESC key handler
  useEffect(() => {
    lockScroll()
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "+" || e.key === "=") handleZoomIn()
      if (e.key === "-") handleZoomOut()
      if (e.key === "0") handleResetZoom()
    }
    window.addEventListener("keydown", handleKey)
    return () => {
      unlockScroll()
      window.removeEventListener("keydown", handleKey)
    }
  }, [onClose])

  // Mouse wheel zoom (Ctrl + Wheel)
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        if (e.deltaY < 0) {
          setZoom((z) => Math.min(Number((z + 0.1).toFixed(2)), 2.2))
        } else {
          setZoom((z) => Math.max(Number((z - 0.1).toFixed(2)), 0.75))
        }
      }
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    return () => container.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.96, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.96, opacity: 0, y: 15 }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      onClick={(e) => e.stopPropagation()}
      className="w-full max-w-5xl h-[92vh] sm:h-[90vh] bg-[#0c1214] border border-[var(--line-strong)] rounded-[var(--r-xl)] shadow-2xl flex flex-col overflow-hidden text-[#e6e5e3]"
    >
      {/* ─── Top Control & Tab Navigation Bar ─── */}
      <div className="px-3 sm:px-6 py-3 bg-[var(--surface-2)] border-b border-[var(--line)] flex flex-wrap items-center justify-between gap-3 shrink-0">
        {/* Document Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-[var(--r-pill)] bg-[var(--surface)] border border-[var(--line)]">
          <button
            onClick={() => handleTabSwitch("cv")}
            className={cn(
              "relative px-3 sm:px-4 py-1.5 rounded-[var(--r-pill)] font-mono text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer",
              activeTab === "cv"
                ? "text-[#061215]"
                : "text-[var(--text-2)] hover:text-[var(--text)]"
            )}
          >
            {activeTab === "cv" && (
              <motion.div
                layoutId="doc-active-tab"
                className="absolute inset-0 bg-gradient-to-r from-[var(--teal)] to-[var(--sky)] rounded-[var(--r-pill)] z-0 shadow-[0_0_10px_rgba(45,212,191,0.4)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <FileText className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Curriculum Vitae</span>
          </button>

          <button
            onClick={() => handleTabSwitch("recommendation")}
            className={cn(
              "relative px-3 sm:px-4 py-1.5 rounded-[var(--r-pill)] font-mono text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer",
              activeTab === "recommendation"
                ? "text-[#061215]"
                : "text-[var(--text-2)] hover:text-[var(--text)]"
            )}
          >
            {activeTab === "recommendation" && (
              <motion.div
                layoutId="doc-active-tab"
                className="absolute inset-0 bg-gradient-to-r from-[var(--teal)] to-[var(--sky)] rounded-[var(--r-pill)] z-0 shadow-[0_0_10px_rgba(45,212,191,0.4)]"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Award className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Recommendation Letter</span>
          </button>
        </div>

        {/* Action & Zoom Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          {/* Zoom Toolbar */}
          <div className="hidden xs:flex items-center bg-[var(--surface)] border border-[var(--line)] rounded-[var(--r-pill)] p-0.5 gap-0.5">
            <button
              onClick={handleZoomOut}
              aria-label="Zoom out"
              title="Zoom out (-)"
              className="p-1 sm:p-1.5 rounded-full hover:bg-[var(--surface-2)] text-[var(--text-2)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleResetZoom}
              title="Reset zoom (0)"
              className="px-1.5 py-0.5 font-mono text-[11px] font-medium text-[var(--text-2)] hover:text-[var(--text)] transition-colors cursor-pointer min-w-[42px] text-center"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              aria-label="Zoom in"
              title="Zoom in (+)"
              className="p-1 sm:p-1.5 rounded-full hover:bg-[var(--surface-2)] text-[var(--text-2)] hover:text-[var(--text)] transition-colors cursor-pointer"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            {zoom !== 1 && (
              <button
                onClick={handleResetZoom}
                aria-label="Reset zoom"
                title="Reset zoom"
                className="p-1 sm:p-1.5 rounded-full hover:bg-[var(--surface-2)] text-[var(--teal)] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Action Trigger */}
          {activeTab === "cv" ? (
            <a
              href={site.cv}
              download="Brian_Maina_Kuria_CV.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-[var(--r-pill)] bg-gradient-to-r from-[var(--teal)] to-[var(--violet)] text-[#061215] font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(45,212,191,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          ) : (
            <a
              href={site.recommendation}
              download="Brian_OAG_Recomendation.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-[var(--r-pill)] bg-gradient-to-r from-[var(--teal)] to-[var(--violet)] text-[#061215] font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(45,212,191,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
          )}

          {/* Close Modal Button */}
          <button
            onClick={onClose}
            aria-label="Close documentation viewer"
            className="p-1.5 rounded-full hover:bg-[var(--surface)] text-[var(--text-2)] hover:text-[var(--text)] transition-colors cursor-pointer focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ─── Scrollable & Zoomable Document Viewer Sheet ─── */}
      <div
        ref={containerRef}
        className="flex-1 w-full overflow-auto bg-[#181d20] p-3 sm:p-8 flex justify-center items-start"
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "top center",
            transition: "transform 0.15s ease-out",
          }}
          className="w-full max-w-[860px] shrink-0 my-2"
        >
          {activeTab === "cv" ? (
            /* ═════════════════ TAB 1: CURRICULUM VITAE ═════════════════ */
            <div className="w-full bg-[#ffffff] text-[#2c2c2b] dark:bg-[#1a2024] dark:text-[#f3f4f6] rounded-xl border border-[#e6e5e3] dark:border-[#2d3748] shadow-2xl p-6 sm:p-12 transition-colors duration-200 select-text">
              {/* Masthead */}
              <header className="text-center pb-6 border-b-2 border-[#2783DE] dark:border-[#5E9FE8]">
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1a1a1a] dark:text-[#ffffff] m-0 mb-1.5 font-heading">
                  BRIAN KURIA MAINA
                </h1>
                <p className="text-base sm:text-lg font-bold text-[#1B5E9E] dark:text-[#8FBEF0] m-0 mb-2">
                  CTO &amp; Full-Stack Product Engineer
                </p>
                <p className="text-xs sm:text-sm text-[#7D7A75] dark:text-[#9ca3af] m-0 mb-3 font-medium">
                  AI Platforms <span className="text-[#d1d5db] dark:text-[#4b5563] px-1.5">·</span> Flutter Mobile{" "}
                  <span className="text-[#d1d5db] dark:text-[#4b5563] px-1.5">·</span> Django / Next.js Backends
                </p>
                <div className="flex flex-wrap items-center justify-center gap-y-1 gap-x-2 text-xs sm:text-sm text-[#5c5a56] dark:text-[#d1d5db] mb-3">
                  <a href="tel:+254790408143" className="hover:text-[#2783DE] inline-flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#2783DE]" /> +254 790 408 143
                  </a>
                  <span>/</span>
                  <a href="tel:+254716919124" className="hover:text-[#2783DE]">
                    +254 716 919 124
                  </a>
                  <span className="text-[#d1d5db] dark:text-[#4b5563]">|</span>
                  <a
                    href="mailto:softdevbriankuria@gmail.com"
                    className="hover:text-[#2783DE] inline-flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3 text-[#2783DE]" /> softdevbriankuria@gmail.com
                  </a>
                  <span className="text-[#d1d5db] dark:text-[#4b5563]">|</span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#2783DE]" /> Nairobi, Kenya
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs sm:text-sm font-medium">
                  <a
                    href="https://github.com/softdevbrian"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2783DE] dark:text-[#5E9FE8] hover:underline inline-flex items-center gap-1"
                  >
                    <GithubIcon className="w-3.5 h-3.5" /> GitHub
                  </a>
                  <span className="text-[#d1d5db] dark:text-[#4b5563]">·</span>
                  <a
                    href="https://cbcai.co.ke/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2783DE] dark:text-[#5E9FE8] hover:underline inline-flex items-center gap-1"
                  >
                    CBC AI Platform <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-[#d1d5db] dark:text-[#4b5563]">·</span>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.cbcai.app1&hl=en"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2783DE] dark:text-[#5E9FE8] hover:underline inline-flex items-center gap-1"
                  >
                    CBC AI Play Store <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-[#d1d5db] dark:text-[#4b5563]">·</span>
                  <a
                    href="https://play.google.com/store/apps/details?id=com.softdevbrian.tukokadi&hl=en"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2783DE] dark:text-[#5E9FE8] hover:underline inline-flex items-center gap-1"
                  >
                    Tuko Kadi Play Store <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </header>

              {/* Section: Professional Summary */}
              <section className="mt-8">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B5E9E] dark:text-[#8FBEF0] pb-1.5 border-b-2 border-[#2783DE] dark:border-[#5E9FE8] mb-3">
                  Professional Summary
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-[#5c5a56] dark:text-[#d1d5db] m-0">
                  CTO and full-stack product engineer who ships production systems end to end — mobile, backend, data and
                  deployment. Co-architect of <strong className="text-[#1a1a1a] dark:text-[#ffffff]">CBC AI</strong>, an
                  AI infrastructure platform for Kenyan schools now live in production with{" "}
                  <strong className="text-[#1a1a1a] dark:text-[#ffffff]">1,000+ Play Store downloads</strong>, where I own
                  the mobile application layer. Independently designed, built and deployed three further production systems:
                  a real-money{" "}
                  <strong className="text-[#1a1a1a] dark:text-[#ffffff]">
                    M-Pesa B2C payroll and farm ERP (151k+ lines, live)
                  </strong>
                  , an offline-first{" "}
                  <strong className="text-[#1a1a1a] dark:text-[#ffffff]">
                    peer-to-peer multiplayer card game
                  </strong>{" "}
                  with an embedded WebSocket host and AI opponents (55k+ lines, shipped), and a{" "}
                  <strong className="text-[#1a1a1a] dark:text-[#ffffff]">
                    multi-timeframe financial analytics dashboard
                  </strong>{" "}
                  on serverless Postgres. Strong bias toward context-rich AI systems, zero-infrastructure architectures and
                  products that work in low-connectivity environments.
                </p>
              </section>

              {/* Section: Core Skills */}
              <section className="mt-8">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B5E9E] dark:text-[#8FBEF0] pb-1.5 border-b-2 border-[#2783DE] dark:border-[#5E9FE8] mb-3">
                  Core Skills
                </h2>
                <div className="overflow-hidden border border-[#E6E5E3] dark:border-[#374151] rounded-lg">
                  <table className="w-full text-xs sm:text-sm border-collapse">
                    <tbody className="divide-y divide-[#E6E5E3] dark:divide-[#374151]">
                      <tr>
                        <th className="w-32 sm:w-40 text-left align-top font-bold p-2 sm:p-2.5 bg-[#F9F8F7] dark:bg-[#1f2937] text-[#1a1a1a] dark:text-[#ffffff] border-r border-[#E6E5E3] dark:border-[#374151]">
                          Languages
                        </th>
                        <td className="p-2 sm:p-2.5 text-[#5c5a56] dark:text-[#d1d5db]">
                          Dart, Python, JavaScript (ES6+), TypeScript, SQL
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left align-top font-bold p-2 sm:p-2.5 bg-[#F9F8F7] dark:bg-[#1f2937] text-[#1a1a1a] dark:text-[#ffffff] border-r border-[#E6E5E3] dark:border-[#374151]">
                          Mobile
                        </th>
                        <td className="p-2 sm:p-2.5 text-[#5c5a56] dark:text-[#d1d5db]">
                          Flutter 3.x, cross-platform Android &amp; iOS, Play Console release management, AdMob, In-App
                          Purchase / Play Billing
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left align-top font-bold p-2 sm:p-2.5 bg-[#F9F8F7] dark:bg-[#1f2937] text-[#1a1a1a] dark:text-[#ffffff] border-r border-[#E6E5E3] dark:border-[#374151]">
                          Backend
                        </th>
                        <td className="p-2 sm:p-2.5 text-[#5c5a56] dark:text-[#d1d5db]">
                          Django 5, Django REST Framework, FastAPI, Node.js, REST API design, webhook &amp; callback
                          architecture
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left align-top font-bold p-2 sm:p-2.5 bg-[#F9F8F7] dark:bg-[#1f2937] text-[#1a1a1a] dark:text-[#ffffff] border-r border-[#E6E5E3] dark:border-[#374151]">
                          Frontend
                        </th>
                        <td className="p-2 sm:p-2.5 text-[#5c5a56] dark:text-[#d1d5db]">
                          Next.js 15 (App Router), React 19, Tailwind CSS, Framer Motion, Radix UI, Recharts, Chart.js
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left align-top font-bold p-2 sm:p-2.5 bg-[#F9F8F7] dark:bg-[#1f2937] text-[#1a1a1a] dark:text-[#ffffff] border-r border-[#E6E5E3] dark:border-[#374151]">
                          Data
                        </th>
                        <td className="p-2 sm:p-2.5 text-[#5c5a56] dark:text-[#d1d5db]">
                          PostgreSQL (Neon serverless), MySQL, SQLite, Drizzle ORM, Django ORM, schema design &amp;
                          aggregation queries
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left align-top font-bold p-2 sm:p-2.5 bg-[#F9F8F7] dark:bg-[#1f2937] text-[#1a1a1a] dark:text-[#ffffff] border-r border-[#E6E5E3] dark:border-[#374151]">
                          AI &amp; Intelligence
                        </th>
                        <td className="p-2 sm:p-2.5 text-[#5c5a56] dark:text-[#d1d5db]">
                          AI-assisted product workflows, RAG concepts, knowledge-graph modelling, heuristic decision engines,
                          behavioural bot AI
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left align-top font-bold p-2 sm:p-2.5 bg-[#F9F8F7] dark:bg-[#1f2937] text-[#1a1a1a] dark:text-[#ffffff] border-r border-[#E6E5E3] dark:border-[#374151]">
                          Integrations
                        </th>
                        <td className="p-2 sm:p-2.5 text-[#5c5a56] dark:text-[#d1d5db]">
                          Safaricom Daraja M-Pesa B2C, Brevo transactional email, Clerk Auth, bulk SMS, QR pairing,
                          WebSockets
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left align-top font-bold p-2 sm:p-2.5 bg-[#F9F8F7] dark:bg-[#1f2937] text-[#1a1a1a] dark:text-[#ffffff] border-r border-[#E6E5E3] dark:border-[#374151]">
                          DevOps
                        </th>
                        <td className="p-2 sm:p-2.5 text-[#5c5a56] dark:text-[#d1d5db]">
                          cPanel / Phusion Passenger, Railway, Vercel, WhiteNoise, Gunicorn, Git &amp; GitHub, Postman,
                          Flutter DevTools
                        </td>
                      </tr>
                      <tr>
                        <th className="text-left align-top font-bold p-2 sm:p-2.5 bg-[#F9F8F7] dark:bg-[#1f2937] text-[#1a1a1a] dark:text-[#ffffff] border-r border-[#E6E5E3] dark:border-[#374151]">
                          Practices
                        </th>
                        <td className="p-2 sm:p-2.5 text-[#5c5a56] dark:text-[#d1d5db]">
                          System architecture, state-machine design, RBAC, automated simulation testing, technical
                          documentation
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section: Experience */}
              <section className="mt-8">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B5E9E] dark:text-[#8FBEF0] pb-1.5 border-b-2 border-[#2783DE] dark:border-[#5E9FE8] mb-3">
                  Experience
                </h2>

                {/* Experience Item 1: CTO */}
                <div className="mb-5">
                  <p className="text-sm sm:text-base font-bold text-[#1a1a1a] dark:text-[#ffffff] m-0">
                    Chief Technology Officer{" "}
                    <span className="font-normal text-[#7D7A75] dark:text-[#9ca3af]">
                      — Bombay Softwares · Nairobi, Kenya
                    </span>
                  </p>
                  <p className="text-xs sm:text-sm italic text-[#7D7A75] dark:text-[#9ca3af] m-0 mt-0.5 mb-2.5">
                    2023 – Present
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#5c5a56] dark:text-[#d1d5db] marker:text-[#2783DE]">
                    <li>
                      Set technical direction for an EdTech startup building{" "}
                      <strong className="text-[#1a1a1a] dark:text-[#ffffff]">AI infrastructure for schools</strong>, not
                      point-solution school software — every workflow is designed to generate educational context that AI can
                      reason over.
                    </li>
                    <li>
                      Co-developed the <strong className="text-[#1a1a1a] dark:text-[#ffffff]">CBC AI Platform</strong>{" "}
                      (cbcai.co.ke) alongside a partner team, owning the{" "}
                      <strong className="text-[#1a1a1a] dark:text-[#ffffff]">mobile application layer</strong> end to end —
                      architecture, UI/UX, state management, API integration, release engineering and store operations.
                    </li>
                    <li>
                      Shipped and maintain the <strong className="text-[#1a1a1a] dark:text-[#ffffff]">CBC AI Android &amp; iOS app</strong> to
                      production, now at <strong className="text-[#1a1a1a] dark:text-[#ffffff]">1,000+ downloads</strong> and in
                      active daily use by Kenyan schools.
                    </li>
                    <li>
                      Architected the app against a four-layer platform model — data collection (school workflows,
                      hardware/IoT), educational intelligence (learner &amp; teacher profiles, school knowledge graph), AI
                      (Teacher AI, Learner AI, Parent AI, School AI) and measurable impact.
                    </li>
                    <li>
                      Translated the Competency-Based Curriculum into product: CBC-aligned assessment reporting, competency
                      tracking, learner progress records and teacher administrative automation (lesson plans, schemes of
                      work, records of work, report cards).
                    </li>
                    <li>
                      Drove REST API contracts and performance optimisation with backend engineers; own the full release
                      pipeline from development through QA to Google Play Store deployment.
                    </li>
                  </ul>
                </div>

                {/* Experience Item 2: OAG ICT Attachment */}
                <div className="mb-2">
                  <p className="text-sm sm:text-base font-bold text-[#1a1a1a] dark:text-[#ffffff] m-0">
                    ICT Attachment{" "}
                    <span className="font-normal text-[#7D7A75] dark:text-[#9ca3af]">
                      — Office of the Attorney General &amp; Department of Justice · Nairobi, Kenya
                    </span>
                  </p>
                  <p className="text-xs sm:text-sm italic text-[#7D7A75] dark:text-[#9ca3af] m-0 mt-0.5 mb-2.5">
                    May 2026 – Aug 2026
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#5c5a56] dark:text-[#d1d5db] marker:text-[#2783DE]">
                    <li>
                      Managed the <strong className="text-[#1a1a1a] dark:text-[#ffffff]">ICT helpdesk</strong> for the State Law Office and Department of Justice, resolving user hardware, software and network support requests.
                    </li>
                    <li>
                      Configured and troubleshot <strong className="text-[#1a1a1a] dark:text-[#ffffff]">LAN/Internet devices</strong> to keep departmental network connectivity reliable.
                    </li>
                    <li>
                      Administered <strong className="text-[#1a1a1a] dark:text-[#ffffff]">Active Directory</strong> user accounts on the MS-Windows Server Domain.
                    </li>
                    <li>
                      Installed and configured <strong className="text-[#1a1a1a] dark:text-[#ffffff]">operating systems, antivirus and user programs</strong> across staff workstations.
                    </li>
                    <li>
                      Carried out <strong className="text-[#1a1a1a] dark:text-[#ffffff]">preventive maintenance and minor repairs</strong> of ICT equipment.
                    </li>
                    <li>
                      Configured, managed and maintained office <strong className="text-[#1a1a1a] dark:text-[#ffffff]">printers</strong>.
                    </li>
                    <li>
                      <strong className="text-[#1a1a1a] dark:text-[#ffffff]">Backed up and recovered</strong> departmental data.
                    </li>
                    <li>
                      Supported <strong className="text-[#1a1a1a] dark:text-[#ffffff]">digitisation and data entry</strong> initiatives for departmental records.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section: Selected Projects */}
              <section className="mt-8">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B5E9E] dark:text-[#8FBEF0] pb-1.5 border-b-2 border-[#2783DE] dark:border-[#5E9FE8] mb-4">
                  Selected Projects
                </h2>

                {/* Project 1: CBC AI */}
                <div className="p-4 sm:p-5 rounded-lg border border-[#E6E5E3] dark:border-[#2d3748] border-l-4 border-l-[#2783DE] bg-[#E5F2FC]/40 dark:bg-[#1b2b3a]/30 mb-5">
                  <h3 className="text-sm sm:text-base font-bold text-[#1B5E9E] dark:text-[#8FBEF0] m-0 mb-1">
                    CBC AI — AI Infrastructure Platform for Schools
                  </h3>
                  <p className="text-xs italic text-[#7D7A75] dark:text-[#9ca3af] m-0 mb-1">
                    🏫 Partnered product · Role: Co-developer &amp; CTO, mobile lead · Live in production · 1,000+ downloads
                  </p>
                  <p className="text-xs text-[#5c5a56] dark:text-[#cbd5e1] m-0 mb-1.5">
                    <b className="text-[#1a1a1a] dark:text-[#ffffff]">Stack:</b> Flutter · Dart · Django REST Framework ·
                    PostgreSQL · REST APIs · Bulk SMS · RFID / biometric hardware integrations
                  </p>
                  <div className="flex gap-2 text-xs font-semibold mb-2">
                    <a
                      href="https://cbcai.co.ke/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#1B5E9E] dark:text-[#8FBEF0] hover:underline"
                    >
                      Platform
                    </a>
                    <span className="text-[#b9b7b3]">·</span>
                    <a
                      href="https://play.google.com/store/apps/details?id=com.cbcai.app1&hl=en"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#1B5E9E] dark:text-[#8FBEF0] hover:underline"
                    >
                      Play Store
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1a1a1a] dark:text-[#ffffff] m-0 mb-2 font-medium">
                    A production AI platform that turns everyday school operations into structured context, then uses that
                    context to cut teacher workload and personalise learning.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#5c5a56] dark:text-[#d1d5db] marker:text-[#2783DE]">
                    <li>
                      Own the <strong className="text-[#1a1a1a] dark:text-[#ffffff]">mobile app layer</strong>:
                      cross-platform Flutter delivery for Android and iOS, from architecture and design system through
                      release and post-launch iteration.
                    </li>
                    <li>
                      Surfaced the platform&apos;s intelligence layer on mobile — learner profiles, competency growth,
                      CBC-aligned assessment reporting and teacher dashboards for class and student management.
                    </li>
                    <li>
                      Shipped school operations modules used daily: attendance, fee management and financial tracking,
                      timetables, records of work, and teacher–parent SMS communication.
                    </li>
                  </ul>
                </div>

                {/* Project 2: Tuko Kadi */}
                <div className="p-4 sm:p-5 rounded-lg border border-[#E6E5E3] dark:border-[#2d3748] border-l-4 border-l-[#8E62C4] bg-[#F1EAF9]/40 dark:bg-[#2b1f3a]/30 mb-5">
                  <h3 className="text-sm sm:text-base font-bold text-[#6B3FA0] dark:text-[#D6B4EC] m-0 mb-1">
                    Tuko Kadi — Offline-First P2P Multiplayer Card Game
                  </h3>
                  <p className="text-xs italic text-[#7D7A75] dark:text-[#9ca3af] m-0 mb-1">
                    🃏 Solo project · Role: Sole engineer &amp; game architect · Shipped v1.0.0+12 · May 2026 – Aug 2026
                  </p>
                  <p className="text-xs text-[#5c5a56] dark:text-[#cbd5e1] m-0 mb-1.5">
                    <b className="text-[#1a1a1a] dark:text-[#ffffff]">Stack:</b> Flutter 3.x · Dart 3.x · embedded dart:io
                    HttpServer + WebSockets · CustomPainter · AdMob · In-App Purchase · shared_preferences · flutter_test
                  </p>
                  <div className="flex gap-2 text-xs font-semibold mb-2">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.softdevbrian.tukokadi&hl=en"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#6B3FA0] dark:text-[#D6B4EC] hover:underline"
                    >
                      Play Store
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1a1a1a] dark:text-[#ffffff] m-0 mb-2 font-medium">
                    A console-quality mobile adaptation of the Kenyan card game Kadi, playable with zero internet and zero
                    backend cost. 55,650+ lines of Dart across 86 files and 294+ commits, 100% solo-owned.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#5c5a56] dark:text-[#d1d5db] marker:text-[#8E62C4]">
                    <li>
                      Built a deterministic game engine and state machine handling cascading card combinations, penalty
                      stacking, Jack deflections, and Super Ace demands.
                    </li>
                    <li>
                      Engineered zero-infrastructure P2P multiplayer by embedding an HttpServer + WebSocket host directly
                      on-device with QR pairing, achieving{" "}
                      <strong className="text-[#1a1a1a] dark:text-[#ffffff]">sub-5 ms local latency at zero cloud cost</strong>.
                    </li>
                    <li>
                      Built four behavioural AI opponents and a headless simulator running 500+ full 4-player matches in
                      seconds to verify rule validity and balance.
                    </li>
                  </ul>
                </div>

                {/* Project 3: TFMS */}
                <div className="p-4 sm:p-5 rounded-lg border border-[#E6E5E3] dark:border-[#2d3748] border-l-4 border-l-[#46A171] bg-[#E8F1EC]/40 dark:bg-[#193325]/30 mb-5">
                  <h3 className="text-sm sm:text-base font-bold text-[#2F7A52] dark:text-[#95D2AC] m-0 mb-1">
                    Tea Farm Management System (TFMS) — Agricultural ERP with Real-Money Payouts
                  </h3>
                  <p className="text-xs italic text-[#7D7A75] dark:text-[#9ca3af] m-0 mb-1">
                    🌱 Solo project · Role: Lead full-stack engineer &amp; system architect · Live in production · Sept 2025 –
                    Present
                  </p>
                  <p className="text-xs text-[#5c5a56] dark:text-[#cbd5e1] m-0 mb-1.5">
                    <b className="text-[#1a1a1a] dark:text-[#ffffff]">Stack:</b> Python 3.13 · Django 5.2.6 · MySQL · Vanilla
                    JS (ES6+) · Safaricom Daraja M-Pesa B2C · Brevo · openpyxl · cPanel / Phusion Passenger · WhiteNoise
                  </p>
                  <div className="flex gap-2 text-xs font-semibold mb-2">
                    <a
                      href="https://github.com/softdevbrian/TFMS"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#2F7A52] dark:text-[#95D2AC] hover:underline"
                    >
                      GitHub Repository
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1a1a1a] dark:text-[#ffffff] m-0 mb-2 font-medium">
                    A full farm ERP replacing paper ledgers, phone-call coordination and risky cash payouts across tea
                    estate operations. 151,800+ lines across 290+ files and 320+ commits, 100% solo-owned.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#5c5a56] dark:text-[#d1d5db] marker:text-[#46A171]">
                    <li>
                      Cut payroll calculation and wage disbursement from{" "}
                      <strong className="text-[#1a1a1a] dark:text-[#ffffff]">2–3 business days to under 5 minutes</strong> by
                      automating harvest weight → piece-rate wage → mobile payout pipeline.
                    </li>
                    <li>
                      Integrated Safaricom Daraja M-Pesa B2C for one-click wage disbursements with{" "}
                      <strong className="text-[#1a1a1a] dark:text-[#ffffff]">100% automated reconciliation</strong> against
                      internal ledgers.
                    </li>
                    <li>
                      Solved multi-tenant webhook routing by minting dynamic callback URLs with embedded farm IDs and
                      idempotent handlers.
                    </li>
                  </ul>
                </div>

                {/* Project 4: Finance Tracker */}
                <div className="p-4 sm:p-5 rounded-lg border border-[#E6E5E3] dark:border-[#2d3748] border-l-4 border-l-[#D5803B] bg-[#FBEBDE]/40 dark:bg-[#382618]/30 mb-5">
                  <h3 className="text-sm sm:text-base font-bold text-[#A85F22] dark:text-[#EBB183] m-0 mb-1">
                    Finance Tracker — Multi-Timeframe Financial Intelligence Dashboard
                  </h3>
                  <p className="text-xs italic text-[#7D7A75] dark:text-[#9ca3af] m-0 mb-1">
                    📊 Solo project · Role: Lead full-stack developer &amp; UI/UX · Shipped MVP · Nov 2024
                  </p>
                  <p className="text-xs text-[#5c5a56] dark:text-[#cbd5e1] m-0 mb-1.5">
                    <b className="text-[#1a1a1a] dark:text-[#ffffff]">Stack:</b> Next.js 15 (App Router, Turbopack) · React
                    19 · Neon serverless PostgreSQL · Drizzle ORM · Clerk Auth · Recharts · Tailwind CSS · Framer Motion ·
                    jsPDF / html2canvas · Vercel
                  </p>
                  <div className="flex gap-2 text-xs font-semibold mb-2">
                    <a
                      href="https://finance-tracker-fawn-ten.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#A85F22] dark:text-[#EBB183] hover:underline"
                    >
                      Live Site
                    </a>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1a1a1a] dark:text-[#ffffff] m-0 mb-2 font-medium">
                    A localised (KES) personal finance dashboard built around flexible, overlapping time periods rather than
                    fixed months.
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#5c5a56] dark:text-[#d1d5db] marker:text-[#D5803B]">
                    <li>
                      Designed a normalised 5-table serverless Postgres schema with dynamic Drizzle ORM queries returning{" "}
                      <strong className="text-[#1a1a1a] dark:text-[#ffffff]">sub-second response times</strong>.
                    </li>
                    <li>
                      Engineered an 11-scenario heuristic advisory engine evaluating live spend ratios for risk warnings.
                    </li>
                    <li>
                      Solved cross-device chart export with a custom hook generating publication-ready A4 PDF reports in under a
                      second.
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section: Key Achievements */}
              <section className="mt-8">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B5E9E] dark:text-[#8FBEF0] pb-1.5 border-b-2 border-[#2783DE] dark:border-[#5E9FE8] mb-3">
                  Key Achievements
                </h2>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#5c5a56] dark:text-[#d1d5db] marker:text-[#2783DE]">
                  <li>
                    <strong className="text-[#1a1a1a] dark:text-[#ffffff]">CTO of an EdTech startup</strong> while completing
                    an undergraduate degree, co-owning an AI platform live in Kenyan schools.
                  </li>
                  <li>
                    <strong className="text-[#1a1a1a] dark:text-[#ffffff]">Shipped two apps to the Google Play Store</strong>,
                    one at 1,000+ downloads and in active institutional use.
                  </li>
                  <li>
                    <strong className="text-[#1a1a1a] dark:text-[#ffffff]">Built and deployed four production systems</strong>{" "}
                    across mobile, web, backend, hardware-adjacent and payments domains.
                  </li>
                  <li>
                    <strong className="text-[#1a1a1a] dark:text-[#ffffff]">Handled real money in production</strong> — M-Pesa
                    B2C disbursements with fully automated reconciliation and immutable audit ledgers.
                  </li>
                  <li>
                    <strong className="text-[#1a1a1a] dark:text-[#ffffff]">Authored 200,000+ lines of production code solo</strong>{" "}
                    across the Tuko Kadi and TFMS codebases alone.
                  </li>
                  <li>
                    <strong className="text-[#1a1a1a] dark:text-[#ffffff]">
                      Engineered a zero-backend real-time multiplayer architecture
                    </strong>
                    , eliminating cloud costs while working entirely offline.
                  </li>
                </ul>
              </section>

              {/* Section: Education */}
              <section className="mt-8">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B5E9E] dark:text-[#8FBEF0] pb-1.5 border-b-2 border-[#2783DE] dark:border-[#5E9FE8] mb-3">
                  Education
                </h2>
                <p className="text-xs sm:text-sm text-[#5c5a56] dark:text-[#d1d5db] m-0">
                  <strong className="text-[#1a1a1a] dark:text-[#ffffff]">BSc Software Development</strong>{" "}
                  <span className="text-[#7D7A75] dark:text-[#9ca3af]">— KCA University, Nairobi, Kenya</span> ·{" "}
                  <em className="text-[#7D7A75] dark:text-[#9ca3af]">Expected Nov 2026</em>
                </p>
              </section>

              {/* Section: Strengths */}
              <section className="mt-8">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B5E9E] dark:text-[#8FBEF0] pb-1.5 border-b-2 border-[#2783DE] dark:border-[#5E9FE8] mb-3">
                  Strengths
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-0 list-none text-xs sm:text-sm text-[#5c5a56] dark:text-[#d1d5db] m-0">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2783DE] shrink-0" />
                    <span>Systems architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2783DE] shrink-0" />
                    <span>Product thinking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2783DE] shrink-0" />
                    <span>Solo end-to-end delivery</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2783DE] shrink-0" />
                    <span>Technical leadership</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2783DE] shrink-0" />
                    <span>Debugging under production pressure</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2783DE] shrink-0" />
                    <span>Documentation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2783DE] shrink-0" />
                    <span>Systems design for any scale — offline to high-load</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2783DE] shrink-0" />
                    <span>Adaptive architecture: low-cost to enterprise-scale</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2783DE] shrink-0" />
                    <span>Building for constraints and building for scale</span>
                  </li>
                </ul>
              </section>
            </div>
          ) : (
            /* ═════════════════ TAB 2: RECOMMENDATION LETTER ═════════════════ */
            <div className="w-full h-[75vh] sm:h-[80vh] rounded-xl border border-[#E6E5E3] dark:border-[#2d3748] shadow-2xl overflow-hidden bg-[#FFFDF6]">
              <iframe
                title="OAG Recommendation Letter"
                srcDoc={recommendationHtml}
                sandbox="allow-same-origin allow-popups allow-modals"
                className="w-full h-full border-0 bg-[#FFFDF6]"
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Outer shell — portal on <body> ─── */
export function CvModal({ isOpen, onClose }: CvModalProps) {
  return typeof window !== "undefined"
    ? createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              style={{ position: "fixed", inset: 0, zIndex: 9999 }}
              className="bg-[var(--bg)]/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 select-none"
            >
              <DocumentationModalContent onClose={onClose} />
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )
    : null
}
