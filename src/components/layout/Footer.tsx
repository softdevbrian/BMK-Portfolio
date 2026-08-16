"use client"

import Link from "next/link"
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react"
import { site } from "@/data/site"
import { Reveal } from "@/components/fx/Reveal"
import { GithubIcon } from "@/components/ui/Icon"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg)] relative overflow-hidden pt-16 pb-12 mt-20">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[radial-gradient(ellipse_at_bottom,rgba(45,212,191,0.06)_0%,transparent_70%)]"
      />

      <div className="wrap relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand & summary */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <Reveal direction="up" delay={0.05}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[var(--r)] bg-gradient-to-tr from-[var(--teal)] to-[var(--violet)] flex items-center justify-center font-mono font-bold text-xs text-[#0B0B10]">
                  BK
                </div>
                <span className="font-heading font-bold text-lg text-[var(--text)]">
                  {site.name}
                </span>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <p className="text-sm text-[var(--text-2)] max-w-md leading-relaxed">
                {site.role} based in {site.location}. Building high-performance,
                scalable products with modern web and mobile architectures.
              </p>
            </Reveal>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-3">
            <Reveal direction="up" delay={0.15}>
              <span className="eyebrow">Navigation</span>
              <ul className="flex flex-col gap-2 mt-3">
                {site.nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-[var(--text-2)] hover:text-[var(--accent-text)] transition-colors inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Contact & Social Links */}
          <div className="flex flex-col gap-3">
            <Reveal direction="up" delay={0.2}>
              <span className="eyebrow">Connect</span>
              <ul className="flex flex-col gap-2.5 mt-3 text-sm text-[var(--text-2)]">
                <li>
                  <a
                    href={`mailto:${site.emailPrimary}`}
                    className="flex items-center gap-2 hover:text-[var(--accent-text)] transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[var(--teal)] shrink-0" />
                    <span className="truncate">{site.emailPrimary}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phonePrimary}`}
                    className="flex items-center gap-2 hover:text-[var(--accent-text)] transition-colors"
                  >
                    <Phone className="w-4 h-4 text-[var(--sky)] shrink-0" />
                    <span>{site.phonePrimary}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-[var(--accent-text)] transition-colors"
                  >
                    <GithubIcon className="w-4 h-4 text-[var(--violet)] shrink-0" />
                    <span>GitHub Profile</span>
                  </a>
                </li>
                <li className="flex items-center gap-2 text-[var(--text-2)] opacity-80">
                  <MapPin className="w-4 h-4 text-[var(--accent-text)] shrink-0" />
                  <span>{site.location}</span>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-2)]">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="flex items-center gap-2 p-2 rounded-[var(--r)] glass hover:border-[var(--line-strong)] hover:text-[var(--text)] transition-all cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--teal)]"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  )
}
