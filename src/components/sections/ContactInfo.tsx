"use client"

import { Mail, Phone, MapPin } from "lucide-react"
import { site } from "@/data/site"
import { Reveal } from "@/components/fx/Reveal"
import { GithubIcon } from "@/components/ui/Icon"

interface ContactItemProps {
  label: string
  value: string
  href?: string
  icon: React.ComponentType<{ className?: string }>
  isExternal?: boolean
}

function ContactItemCard({ label, value, href, icon: IconComponent, isExternal }: ContactItemProps) {
  const cardContent = (
    <div className="flex items-center gap-4 p-4 rounded-[var(--r-lg)] glass border border-[var(--line)] hover:border-[var(--teal)] hover:translate-x-1 transition-all duration-200 group">
      {/* Icon tile with gradient fill */}
      <div className="w-12 h-12 rounded-[var(--r)] bg-gradient-to-br from-[rgba(45,212,191,0.2)] to-[rgba(167,139,250,0.2)] border border-[rgba(45,212,191,0.3)] flex items-center justify-center text-[var(--teal)] shrink-0 group-hover:scale-105 transition-transform">
        <IconComponent className="w-5 h-5" />
      </div>

      {/* Label and Value */}
      <div className="flex flex-col min-w-0">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-2)]">
          {label}
        </span>
        <span className="text-sm sm:text-base font-semibold text-[var(--text)] truncate group-hover:text-[var(--accent-text)] transition-colors">
          {value}
        </span>
      </div>
    </div>
  )

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
      label: "Primary Email",
      value: site.emailPrimary,
      href: `mailto:${site.emailPrimary}`,
      icon: Mail,
    },
    {
      label: "Secondary Email",
      value: site.emailSecondary,
      href: `mailto:${site.emailSecondary}`,
      icon: Mail,
    },
    {
      label: "Primary Phone",
      value: site.phonePrimary,
      href: `tel:${site.phonePrimary}`,
      icon: Phone,
    },
    {
      label: "Alternate Phone",
      value: site.phoneSecondary,
      href: `tel:${site.phoneSecondary}`,
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
