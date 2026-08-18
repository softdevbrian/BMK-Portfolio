"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { FileText } from "lucide-react"
import { site } from "@/data/site"
import { Reveal } from "@/components/fx/Reveal"
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder"
import { Button } from "@/components/ui/Button"

const CvModal = dynamic(
  () => import("@/components/ui/CvModal").then((mod) => mod.CvModal),
  { ssr: false }
)

export function AboutProfileCard() {
  const [docModalOpen, setDocModalOpen] = useState(false)

  return (
    <div className="lg:col-span-4 lg:sticky lg:top-28 flex flex-col gap-6">
      <Reveal direction="scale" delay={0.1}>
        <div className="p-2 rounded-[var(--r-xl)] glass border border-[var(--line-strong)]">
          <ImagePlaceholder
            src="/images/passport.png"
            alt={site.name}
            label="Brian Maina Kuria (800x800)"
            aspect="square"
            objectPosition="center 15%"
            ringGlow
            priority
          />
        </div>
      </Reveal>

      {/* Quick Profile Meta Card */}
      <Reveal direction="up" delay={0.2}>
        <div className="glass rounded-[var(--r-lg)] p-5 border border-[var(--line)] flex flex-col gap-3 text-xs">
          <div className="flex justify-between items-center py-1.5 border-b border-[var(--line)]">
            <span className="font-mono text-[var(--text-2)] uppercase">Role</span>
            <span className="font-medium text-[var(--text)] font-heading">{site.role}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-[var(--line)]">
            <span className="font-mono text-[var(--text-2)] uppercase">Location</span>
            <span className="font-medium text-[var(--text)] font-heading">{site.location}</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-[var(--line)]">
            <span className="font-mono text-[var(--text-2)] uppercase">Education</span>
            <span className="font-medium text-[var(--text)] font-heading">BSc Software Dev (KCA)</span>
          </div>
          <div className="flex justify-between items-center py-1.5 border-b border-[var(--line)]">
            <span className="font-mono text-[var(--text-2)] uppercase">Status</span>
            <span className="text-[var(--ok)] font-mono flex items-center gap-1.5 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ok)] animate-pulse" />
              Available for Roles
            </span>
          </div>
          <div className="pt-2">
            <Button
              onClick={() => setDocModalOpen(true)}
              variant="outline"
              size="sm"
              rightIcon={<FileText className="w-3.5 h-3.5 text-[var(--teal)]" />}
              className="w-full"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </Reveal>

      {/* Documentation Modal */}
      <CvModal isOpen={docModalOpen} onClose={() => setDocModalOpen(false)} />
    </div>
  )
}
