"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { site } from "@/data/site"
import { cn } from "@/lib/cn"
import { Button } from "@/components/ui/Button"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "py-3 bg-[rgba(11,11,16,0.8)] backdrop-blur-md border-b border-[var(--line)] shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          : "py-6 bg-transparent"
      )}
    >
      <div className="wrap flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus-visible:outline-2 focus-visible:outline-[var(--teal)] rounded-md"
        >
          <div className="w-8 h-8 rounded-[var(--r)] bg-gradient-to-tr from-[var(--teal)] to-[var(--violet)] flex items-center justify-center font-mono font-bold text-xs text-[#0B0B10] shadow-[var(--glow)] group-hover:scale-105 transition-transform duration-200">
            BK
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-tight text-[var(--text)] group-hover:text-[var(--accent-text)] transition-colors">
              {site.name}
            </span>
            <span className="font-mono text-[10px] text-[var(--text-2)] hidden sm:block">
              {site.role.split("&")[0].trim()}
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
                  isActive ? "text-[#0B0B10] font-semibold" : "text-[var(--text-2)] hover:text-[var(--text)]"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-gradient-to-r from-[var(--teal)] to-[var(--sky)] rounded-[var(--r-pill)] -z-10 shadow-[0_0_12px_rgba(45,212,191,0.4)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            href={site.cv}
            variant="outline"
            size="sm"
            external
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
          >
            CV
          </Button>
          <Button href="/contact" variant="primary" size="sm">
            Let&apos;s Talk
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="md:hidden p-2 rounded-[var(--r)] glass text-[var(--text)] focus-visible:outline-2 focus-visible:outline-[var(--teal)]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[60px] z-50 bg-[var(--bg)]/95 backdrop-blur-xl border-t border-[var(--line)] flex flex-col justify-between p-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-2 pt-6">
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
                    transition={{ delay: idx * 0.06 }}
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

            <div className="flex flex-col gap-3 pt-8 pb-6 border-t border-[var(--line)]">
              <Button
                href={site.cv}
                variant="outline"
                size="md"
                external
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
                className="w-full"
              >
                Download CV
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
      </AnimatePresence>
    </header>
  )
}
