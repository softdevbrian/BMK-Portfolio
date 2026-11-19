"use client"

import { motion, AnimatePresence } from "motion/react"
import { Mail, Phone, MapPin, Copy, Check } from "lucide-react"
import { site } from "@/data/site"
import { Reveal } from "@/components/fx/Reveal"
import { GithubIcon, WhatsappIcon } from "@/components/ui/Icon"
import { useCopyFeedback } from "@/components/ui/CopyableContact"

interface ContactItemProps {
  label: string
  value: string
  href?: string
  copyValue?: string
  icon: React.ComponentType<{ className?: string }>
  isExternal?: boolean
  accent?: "default" | "whatsapp"
}

function ContactItemCard({
  label,
  value,
  href,
  copyValue,
  icon: IconComponent,
  isExternal,
  accent = "default",
}: ContactItemProps) {
  const { copied, copy } = useCopyFeedback()
  const isWhatsapp = accent === "whatsapp"
  const isCopyable = Boolean(copyValue)

  const cardContent = (
    <motion.div
      whileTap={isCopyable ? { scale: 0.985 } : undefined}
      transition={{ type: "spring", stiffness: 450, damping: 28 }}
      className={`flex items-center justify-between gap-3 p-4 rounded-[var(--r-lg)] glass border transition-all duration-200 group ${
        copied
          ? "border-[var(--ok)] shadow-[0_0_20px_rgba(124,224,176,0.18)]"
          : isWhatsapp
            ? "border-[var(--line)] hover:border-[#25D366]/70 hover:translate-x-1"
            : "border-[var(--line)] hover:border-[var(--teal)] hover:translate-x-1"
      }`}
    >
      <div className="flex items-center gap-4 min-w-0">
        {/* Icon tile with gradient fill */}
        <div
          className={`w-12 h-12 rounded-[var(--r)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-200 border ${
            copied
              ? "bg-[rgba(124,224,176,0.18)] border-[var(--ok)]/50 text-[var(--ok)] scale-105"
              : isWhatsapp
                ? "bg-gradient-to-br from-[#25D366]/20 to-[rgba(45,212,191,0.18)] border-[#25D366]/35 text-[#25D366]"
                : "bg-gradient-to-br from-[rgba(45,212,191,0.2)] to-[rgba(167,139,250,0.2)] border-[rgba(45,212,191,0.3)] text-[var(--teal)]"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.16 }}
              >
                <Check className="w-5 h-5" />
              </motion.span>
            ) : (
              <motion.span
                key="icon"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.14 }}
              >
                <IconComponent className="w-5 h-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Label and Value */}
        <div className="flex flex-col min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-2)]">
            {label}
          </span>
          <span
            className={`text-sm sm:text-base font-semibold truncate transition-colors ${
              copied
                ? "text-[var(--ok)]"
                : isWhatsapp
                  ? "text-[var(--text)] group-hover:text-[#25D366]"
                  : "text-[var(--text)] group-hover:text-[var(--accent-text)]"
            }`}
          >
            {value}
          </span>
        </div>
      </div>

      {/* Subtle Copy / Copied pill on copyable items */}
      {isCopyable && (
        <div className="shrink-0">
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="copied-pill"
                initial={{ opacity: 0, scale: 0.85, x: 4 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: -4 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[var(--r-pill)] bg-[rgba(124,224,176,0.14)] border border-[var(--ok)]/40 text-[11px] font-mono font-semibold text-[var(--ok)]"
              >
                <Check className="w-3 h-3" />
                <span>Copied!</span>
              </motion.span>
            ) : (
              <motion.span
                key="copy-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.14 }}
                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-[var(--r)] text-[11px] font-mono text-[var(--text-2)] opacity-50 group-hover:opacity-100 group-hover:text-[var(--teal)] transition-all"
              >
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy</span>
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )

  if (copyValue) {
    return (
      <button
        type="button"
        onClick={() => copy(copyValue)}
        title={`Copy ${label}: ${copyValue}`}
        aria-label={`Copy ${label}: ${copyValue}`}
        className="w-full text-left block cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--teal)] rounded-[var(--r-lg)]"
      >
        {cardContent}
      </button>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="block focus-visible:outline-2 focus-visible:outline-[var(--teal)] rounded-[var(--r-lg)]"
      >
        {cardContent}
      </a>
    )
  }

  return <div>{cardContent}</div>
}

export function ContactInfo() {
  const contactItems: ContactItemProps[] = [
    {
      label: "WhatsApp Direct",
      value: `${site.phonePrimary} · Instant Chat`,
      href: `https://wa.me/${site.whatsapp}`,
      icon: WhatsappIcon,
      isExternal: true,
      accent: "whatsapp",
    },
    {
      label: "Primary Email",
      value: site.emailPrimary,
      copyValue: site.emailPrimary,
      icon: Mail,
    },
    {
      label: "Secondary Email",
      value: site.emailSecondary,
      copyValue: site.emailSecondary,
      icon: Mail,
    },
    {
      label: "Primary Phone",
      value: site.phonePrimary,
      copyValue: site.phonePrimary,
      icon: Phone,
    },
    {
      label: "Alternate Phone",
      value: site.phoneSecondary,
      copyValue: site.phoneSecondary,
      icon: Phone,
    },
    {
      label: "GitHub Profile",
      value: "github.com/softdevbrian",
      href: site.github,
      icon: GithubIcon,
      isExternal: true,
    },
    {
      label: "Current Location",
      value: site.location,
      icon: MapPin,
    },
  ]

  return (
    <div className="flex flex-col gap-4">
      {contactItems.map((item, idx) => (
        <Reveal key={item.label} direction="up" delay={0.07 * idx}>
          <ContactItemCard {...item} />
        </Reveal>
      ))}
    </div>
  )
}
