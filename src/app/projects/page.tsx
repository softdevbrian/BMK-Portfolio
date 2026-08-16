import type { Metadata } from "next"
import { site } from "@/data/site"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Reveal } from "@/components/fx/Reveal"
import { ProjectsClient } from "./ProjectsClient"

export const metadata: Metadata = {
  title: "Projects",
  description: `Explore engineering case studies, systems architecture, and production software built by ${site.name}.`,
  openGraph: {
    title: `Projects | ${site.name}`,
    description: `Engineering case studies, systems architecture, and production applications built by ${site.name}.`,
    images: ["/images/og.png"],
  },
}

export default function ProjectsPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="wrap flex flex-col gap-12">
        <div>
          <SectionHeading
            eyebrow="Case Studies & Work"
            title="Featured Engineering Projects"
            description="Explore selected mobile apps, scalable web systems, and AI workflows."
          />

          {/* ===== CONTENT SLOT: projects-intro ===== */}
          <Reveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-[var(--text-2)] max-w-2xl -mt-6 mb-8 leading-relaxed">
              Filter through projects by domain, architectural focus, or collaboration model.
              Each case study details technical challenges, architectural solutions, and measured outcomes.
            </p>
          </Reveal>
        </div>

        <ProjectsClient />
      </div>
    </div>
  )
}
