import type { Metadata } from "next"
import { site } from "@/data/site"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Reveal } from "@/components/fx/Reveal"
import { ContactInfo } from "@/components/sections/ContactInfo"
import { ContactForm } from "@/components/sections/ContactForm"

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name} for engineering leadership, technical consultation, or project collaborations.`,
  openGraph: {
    title: `Contact | ${site.name}`,
    description: `Connect directly with ${site.name} via email, phone, or direct inquiry form.`,
    images: ["/images/og.png"],
  },
}

export default function ContactPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="wrap flex flex-col gap-12">
        <div>
          <SectionHeading
            eyebrow="Get in Touch"
            title="Let's Build Something High Impact"
            description="Whether you have an upcoming project, are looking for engineering leadership, or just want to connect."
          />

          {/* ===== CONTENT SLOT: contact-intro ===== */}
          <Reveal direction="up" delay={0.15}>
            <p className="text-sm sm:text-base text-[var(--text-2)] max-w-2xl -mt-6 mb-8 leading-relaxed">
              I am currently open to CTO and Full-Stack Engineering roles, architectural consultations,
              and select contract product builds. Send a message using the form below or reach out directly.
            </p>
          </Reveal>
        </div>

        {/* Two-Column Grid: ContactInfo Left, ContactForm Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Reveal direction="up" delay={0.1}>
              <h3 className="font-heading font-semibold text-lg text-[var(--text)] mb-2">
                Direct Channels
              </h3>
            </Reveal>
            <ContactInfo />
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <Reveal direction="up" delay={0.2}>
              <h3 className="font-heading font-semibold text-lg text-[var(--text)] mb-4">
                Send a Direct Inquiry
              </h3>
            </Reveal>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
