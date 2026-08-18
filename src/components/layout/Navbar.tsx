"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import dynamic from "next/dynamic"
import { Menu, X, FileText } from "lucide-react"
import { site } from "@/data/site"
import { cn } from "@/lib/cn"
import { Button } from "@/components/ui/Button"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

const CvModal = dynamic(
  () => import("@/components/ui/CvModal").then((mod) => mod.CvModal),
  { ssr: false }
)

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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cvModalOpen, setCvModalOpen] = useState(false)
  const [navbarHeight, setNavbarHeight] = useState(72)
  const headerRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Track scroll position for navbar style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Measure actual rendered navbar height dynamically
  useEffect(() => {
    if (!headerRef.current) return
    const measure = () => {
      if (headerRef.current) {
        setNavbarHeight(headerRef.current.getBoundingClientRect().height)
      }
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(headerRef.current)
    return () => observer.disconnect()
  }, [])

  // Scroll lock with scrollbar compensation when mobile menu opens
  useEffect(() => {
    if (mobileMenuOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
    return () => { unlockScroll() }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "py-3 bg-[var(--surface)] backdrop-blur-xl border-b border-[var(--line)] shadow-[var(--sh-1)]"
            : "py-6 bg-transparent"
        )}
      >
        <div className="wrap flex items-center justify-between">
          {/* Brand / Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-[var(--teal)] rounded-md"
          >
            <div className="w-8 h-8 rounded-[var(--r)] bg-gradient-to-tr from-[var(--teal)] to-[var(--violet)] flex items-center justify-center font-mono font-bold text-xs text-[#061215] shadow-[var(--glow)] group-hover:scale-105 transition-transform duration-200">
              BK
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-sm tracking-tight text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors">
                {site.name}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 p-1 rounded-[var(--r-pill)] glass border border-[var(--line)]">
            {site.nav.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname === item.href || pathname.startsWith(`${item.href}/`)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-1.5 text-xs font-medium rounded-[var(--r-pill)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--teal)]",
                    isActive ? "text-[#061215] font-semibold" : "text-[var(--text-2)] hover:text-[var(--text)]"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-pill"
                      className="absolute inset-0 bg-gradient-to-r from-[var(--teal)] to-[var(--sky)] rounded-[var(--r-pill)] z-0 shadow-[0_0_12px_rgba(45,212,191,0.4)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* CTA & Theme Controls */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />
            <Button
              onClick={() => setCvModalOpen(true)}
              variant="outline"
              size="sm"
              rightIcon={<FileText className="w-3.5 h-3.5 text-[var(--teal)]" />}
            >
              Documentation
            </Button>
            <Button href="/contact" variant="primary" size="sm">
              Let&apos;s Talk
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-[var(--r)] glass text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--teal)]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu — rendered via portal directly in <body> for correct z-index ── */}
      {typeof window !== "undefined" && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ top: navbarHeight }}
              className="fixed left-0 right-0 bottom-0 z-[9998] bg-[var(--bg)] flex flex-col justify-between p-6 md:hidden overflow-y-auto border-t border-[var(--line)]"
            >
              {/* Stagger-in nav links */}
              <div className="flex flex-col gap-2 pt-4">
                <span className="eyebrow mb-2">Navigation</span>
                {site.nav.map((item, idx) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname === item.href || pathname.startsWith(`${item.href}/`)

                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.07, duration: 0.22 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-[var(--r)] text-lg font-medium transition-colors",
                          isActive
                            ? "bg-[var(--surface-2)] text-[var(--teal)] border border-[var(--line-strong)]"
                            : "text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--surface)]"
                        )}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="w-2 h-2 rounded-full bg-[var(--teal)] shadow-[0_0_8px_var(--teal)]" />
                        )}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Bottom CTAs */}
              <div className="flex flex-col gap-3 pt-8 pb-6 border-t border-[var(--line)]">
                <Button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setCvModalOpen(true)
                  }}
                  variant="outline"
                  size="md"
                  rightIcon={<FileText className="w-4 h-4 text-[var(--teal)]" />}
                  className="w-full"
                >
                  View Documentation
                </Button>
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Let&apos;s Talk
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* CV Preview & Download Modal */}
      <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </>
  )
}
