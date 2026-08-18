"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Download, X, FileText } from "lucide-react"
import { site } from "@/data/site"

interface CvModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CvModal({ isOpen, onClose }: CvModalProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = "unset"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[var(--bg)]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 select-none"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl h-[88vh] bg-[var(--surface)] border border-[var(--line-strong)] rounded-[var(--r-xl)] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Modal Header Bar */}
            <div className="px-4 sm:px-6 py-3.5 bg-[var(--surface-2)] border-b border-[var(--line)] flex items-center justify-between gap-4 shrink-0">
              {/* Title & Document Badge */}
              <div className="flex items-center gap-2.5 truncate">
                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#10B981]/15 text-[#10B981] font-mono text-[11px] font-bold border border-[#10B981]/30">
                  <FileText className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </div>
                <span className="font-mono text-xs sm:text-sm text-[var(--text)] font-medium truncate">
                  {site.name} — Curriculum Vitae
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={site.cv}
                  download="Brian_Maina_Kuria_CV.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-[var(--r-pill)] bg-gradient-to-r from-[var(--teal)] to-[var(--violet)] text-[#061215] font-bold font-mono text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(45,212,191,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </a>

                <button
                  onClick={onClose}
                  aria-label="Close CV preview"
                  className="p-1.5 rounded-full hover:bg-[var(--surface)] text-[var(--text-2)] hover:text-[var(--text)] transition-colors cursor-pointer focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="flex-1 w-full bg-[#323639] relative">
              <iframe
                src={`${site.cv}#toolbar=1&navpanes=0`}
                className="w-full h-full border-0 bg-white"
                title={`${site.name} CV Document`}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
