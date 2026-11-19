"use client"

import { useState, useEffect, useRef, type FormEvent, type ChangeEvent, type FocusEvent } from "react"
import emailjs from "@emailjs/browser"
import { motion } from "motion/react"
import { Send, Mail, AlertCircle, CheckCircle2, ArrowUpRight } from "lucide-react"
import { site } from "@/data/site"
import { cn } from "@/lib/cn"
import { Button } from "@/components/ui/Button"
import { WhatsappIcon } from "@/components/ui/Icon"

type DeliveryChannel = "email" | "whatsapp"

interface FormValues {
  name: string
  email: string
  subject: string
  message: string
  company: string // Honeypot
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const WHATSAPP_TOPICS = [
  "Project Inquiry",
  "Mobile / Full-Stack Role",
  "Technical Consultation",
  "Quick Hello",
] as const

export function ContactForm() {
  const [channel, setChannel] = useState<DeliveryChannel>("email")
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
    company: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<{
    text: string
    type: "ok" | "bad"
  } | null>(null)

  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    try {
      if (site.emailjs.publicKey) {
        emailjs.init(site.emailjs.publicKey)
      }
    } catch (err) {
      console.warn("EmailJS init failed:", err)
    }
  }, [])

  const validateField = (
    name: keyof FormValues,
    value: string,
    activeChannel: DeliveryChannel = channel
  ): string | undefined => {
    if (name === "company") return undefined

    if (activeChannel === "whatsapp") {
      if (name === "message" && !value.trim()) {
        return "Please type a message to send via WhatsApp."
      }
      return undefined
    }

    if (!value.trim()) {
      switch (name) {
        case "name":
          return "Name is required."
        case "email":
          return "Email is required."
        case "subject":
          return "Subject is required."
        case "message":
          return "Message is required."
        default:
          return "This field is required."
      }
    }

    if (name === "email" && !EMAIL_REGEX.test(value.trim())) {
      return "Please enter a valid email address."
    }

    return undefined
  }

  const handleChannelSwitch = (nextChannel: DeliveryChannel) => {
    setChannel(nextChannel)
    setErrors({})
    setStatusMessage(null)
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const fieldName = name as keyof FormValues

    const error = validateField(fieldName, value)
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }))
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const fieldName = name as keyof FormValues

    setValues((prev) => ({ ...prev, [fieldName]: value }))

    // Clear error live on input once shown
    if (errors[fieldName as keyof FormErrors]) {
      const error = validateField(fieldName, value)
      setErrors((prev) => ({
        ...prev,
        [fieldName]: error,
      }))
    }
  }

  const buildWhatsappText = (): string => {
    const lines: string[] = ["Hi Brian,"]
    if (values.name.trim()) {
      lines.push(`Name: ${values.name.trim()}`)
    }
    if (values.subject.trim()) {
      lines.push(`Topic: ${values.subject.trim()}`)
    }
    lines.push("", values.message.trim())
    return lines.join("\n")
  }

  const launchWhatsapp = () => {
    if (values.company) return

    const messageErr = validateField("message", values.message, "whatsapp")
    if (messageErr) {
      setErrors((prev) => ({ ...prev, message: messageErr }))
      return
    }

    const encoded = encodeURIComponent(buildWhatsappText())
    const url = `https://wa.me/${site.whatsapp}?text=${encoded}`
    window.open(url, "_blank", "noopener,noreferrer")

    setStatusMessage({
      text: "Opening WhatsApp with your pre-filled message.",
      type: "ok",
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check honeypot: if company filled, silently return
    if (values.company) {
      return
    }

    if (channel === "whatsapp") {
      launchWhatsapp()
      return
    }

    // Validate all fields for EmailJS
    const nameErr = validateField("name", values.name, "email")
    const emailErr = validateField("email", values.email, "email")
    const subjectErr = validateField("subject", values.subject, "email")
    const messageErr = validateField("message", values.message, "email")

    const newErrors: FormErrors = {
      name: nameErr,
      email: emailErr,
      subject: subjectErr,
      message: messageErr,
    }

    setErrors(newErrors)

    if (nameErr || emailErr || subjectErr || messageErr) {
      return
    }

    setIsSubmitting(true)
    setStatusMessage(null)

    const templateParams = {
      from_name: values.name.trim(),
      from_email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    }

    try {
      await emailjs.send(
        site.emailjs.serviceId,
        site.emailjs.templateId,
        templateParams
      )

      setStatusMessage({
        text: "Message sent. I'll reply within 24 hours.",
        type: "ok",
      })

      // Reset form and errors
      setValues({
        name: "",
        email: "",
        subject: "",
        message: "",
        company: "",
      })
      setErrors({})
    } catch (err) {
      console.error("EmailJS sending error:", err)
      setStatusMessage({
        text: "Couldn't send from here — opening your email app instead.",
        type: "bad",
      })

      // Prefilled mailto fallback
      const mailtoSubject = encodeURIComponent(values.subject.trim())
      const mailtoBody = encodeURIComponent(
        `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`
      )

      setTimeout(() => {
        window.location.href = `mailto:${site.emailPrimary}?subject=${mailtoSubject}&body=${mailtoBody}`
      }, 1500)
    } finally {
      setIsSubmitting(false)
    }
  }

  const isWhatsappMode = channel === "whatsapp"

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full px-4 py-3 rounded-[var(--r)] bg-[var(--surface-2)] text-[var(--text)] text-sm placeholder-[var(--text-2)]/60 border transition-all duration-200 focus:outline-none",
      hasError
        ? "border-[var(--danger)] focus:ring-2 focus:ring-[var(--danger)]/30"
        : isWhatsappMode
          ? "border-[var(--line)] focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20"
          : "border-[var(--line)] focus:border-[var(--teal)] focus:ring-2 focus:ring-[var(--teal)]/20"
    )

  return (
    <div className="glass-card rounded-[var(--r-xl)] p-6 sm:p-8 md:p-10 border border-[var(--line-strong)] shadow-[var(--sh-1)] relative overflow-hidden">
      {/* Decorative ambient top line adapting to selected channel */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[2px] transition-all duration-300",
          isWhatsappMode
            ? "bg-gradient-to-r from-[#25D366] via-[var(--teal)] to-[#128C7E]"
            : "bg-gradient-to-r from-[var(--teal)] via-[var(--sky)] to-[var(--violet)]"
        )}
      />

      {/* Channel Mode Switcher Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--line)]">
        <div
          role="tablist"
          aria-label="Message delivery channel"
          className="inline-flex items-center p-1 rounded-[var(--r-pill)] bg-[var(--surface-2)] border border-[var(--line)] w-full sm:w-auto"
        >
          <button
            type="button"
            role="tab"
            aria-selected={!isWhatsappMode}
            onClick={() => handleChannelSwitch("email")}
            className={cn(
              "relative flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium rounded-[var(--r-pill)] transition-colors duration-200 cursor-pointer",
              !isWhatsappMode
                ? "text-[#061215] font-semibold"
                : "text-[var(--text-2)] hover:text-[var(--text)]"
            )}
          >
            {!isWhatsappMode && (
              <motion.div
                layoutId="contact-channel-pill"
                className="absolute inset-0 bg-gradient-to-r from-[var(--teal)] to-[var(--sky)] rounded-[var(--r-pill)] z-0 shadow-[0_0_14px_rgba(45,212,191,0.4)]"
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
              />
            )}
            <Mail className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">Email Inquiry</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={isWhatsappMode}
            onClick={() => handleChannelSwitch("whatsapp")}
            className={cn(
              "relative flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-medium rounded-[var(--r-pill)] transition-colors duration-200 cursor-pointer",
              isWhatsappMode
                ? "text-[#04140B] font-semibold"
                : "text-[var(--text-2)] hover:text-[var(--text)]"
            )}
          >
            {isWhatsappMode && (
              <motion.div
                layoutId="contact-channel-pill"
                className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[var(--teal)] rounded-[var(--r-pill)] z-0 shadow-[0_0_14px_rgba(37,211,102,0.45)]"
                transition={{ type: "spring", stiffness: 360, damping: 30 }}
              />
            )}
            <WhatsappIcon className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">WhatsApp Chat</span>
          </button>
        </div>

        {/* Live response indicator */}
        <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--text-2)]">
          <span
            className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              isWhatsappMode
                ? "bg-[#25D366] shadow-[0_0_8px_#25D366]"
                : "bg-[var(--teal)] shadow-[0_0_8px_var(--teal)]"
            )}
          />
          <span>{isWhatsappMode ? "Instant via WhatsApp" : "Replies within 24h"}</span>
        </div>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {/* Honeypot field (hidden from real users) */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={values.company}
            onChange={handleChange}
          />
        </div>

        {/* Name & Email Row (Email hidden in WhatsApp mode for zero friction) */}
        <div
          className={cn(
            "grid grid-cols-1 gap-6",
            !isWhatsappMode && "min-[820px]:grid-cols-2"
          )}
        >
          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-mono font-medium text-[var(--text-2)] uppercase">
              Your Name{" "}
              {isWhatsappMode ? (
                <span className="text-[var(--text-2)]/60 normal-case font-sans">(optional)</span>
              ) : (
                <span className="text-[var(--teal)]">*</span>
              )}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required={!isWhatsappMode}
              placeholder="e.g. Alex Morgan"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={inputClass(Boolean(errors.name))}
            />
            {errors.name && (
              <p id="name-error" className="text-xs text-[var(--danger)] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.name}</span>
              </p>
            )}
          </div>

          {/* Email Field (Email Inquiry mode only) */}
          {!isWhatsappMode && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-mono font-medium text-[var(--text-2)] uppercase">
                Email Address <span className="text-[var(--teal)]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="alex@company.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
                className={inputClass(Boolean(errors.email))}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-[var(--danger)] flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>
          )}
        </div>

        {/* Quick Topic Chips (WhatsApp mode) OR Subject Input (Email mode) */}
        {isWhatsappMode ? (
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-medium text-[var(--text-2)] uppercase">
              Quick Topic <span className="text-[var(--text-2)]/60 normal-case font-sans">(optional)</span>
            </span>
            <div className="flex flex-wrap gap-2">
              {WHATSAPP_TOPICS.map((topic) => {
                const selected = values.subject === topic
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() =>
                      setValues((prev) => ({
                        ...prev,
                        subject: prev.subject === topic ? "" : topic,
                      }))
                    }
                    className={cn(
                      "px-3 py-1.5 rounded-[var(--r-pill)] text-xs font-medium border transition-all duration-200 cursor-pointer",
                      selected
                        ? "bg-[#25D366]/15 border-[#25D366] text-[#25D366]"
                        : "bg-[var(--surface-2)] border-[var(--line)] text-[var(--text-2)] hover:border-[#25D366]/50 hover:text-[var(--text)]"
                    )}
                  >
                    {topic}
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-xs font-mono font-medium text-[var(--text-2)] uppercase">
              Subject <span className="text-[var(--teal)]">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              placeholder="Project inquiry / Mobile Lead role / Technical consultation"
              value={values.subject}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "subject-error" : undefined}
              className={inputClass(Boolean(errors.subject))}
            />
            {errors.subject && (
              <p id="subject-error" className="text-xs text-[var(--danger)] flex items-center gap-1 mt-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                <span>{errors.subject}</span>
              </p>
            )}
          </div>
        )}

        {/* Message Field */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="message" className="text-xs font-mono font-medium text-[var(--text-2)] uppercase">
              Message <span className={isWhatsappMode ? "text-[#25D366]" : "text-[var(--teal)]"}>*</span>
            </label>
            <span className="text-[11px] font-mono text-[var(--text-2)]/70">
              {values.message.length} chars
            </span>
          </div>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder={
              isWhatsappMode
                ? "Type your WhatsApp message here — it will open pre-filled in WhatsApp ready to send..."
                : "Tell me about your product, timeline, goals, and technical requirements..."
            }
            value={values.message}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={inputClass(Boolean(errors.message))}
          />
          {errors.message && (
            <p id="message-error" className="text-xs text-[var(--danger)] flex items-center gap-1 mt-1">
              <AlertCircle className="w-3 h-3 shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit / Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {isWhatsappMode ? (
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-[var(--r)] text-sm font-semibold text-[#04140B] bg-gradient-to-r from-[#25D366] to-[var(--teal)] hover:brightness-110 active:scale-[0.98] shadow-[0_4px_20px_rgba(37,211,102,0.3)] transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#25D366]"
            >
              <WhatsappIcon className="w-4 h-4" />
              <span>Open in WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          ) : (
            <>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                rightIcon={!isSubmitting && <Send className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Sending…" : "Send Message"}
              </Button>

              <button
                type="button"
                onClick={launchWhatsapp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-[var(--r)] text-sm font-medium border border-[var(--line-strong)] bg-[var(--surface-2)] text-[var(--text)] hover:border-[#25D366] hover:text-[#25D366] active:scale-[0.98] transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#25D366]"
              >
                <WhatsappIcon className="w-4 h-4 text-[#25D366]" />
                <span>Send via WhatsApp</span>
              </button>
            </>
          )}
        </div>

        {/* Feedback Alert status */}
        <div
          className={cn(
            "overflow-hidden transition-all duration-300",
            statusMessage ? "max-h-24 opacity-100 mt-2" : "max-h-0 opacity-0"
          )}
        >
          {statusMessage && (
            <div
              role="status"
              aria-live="polite"
              className={cn(
                "p-4 rounded-[var(--r)] border flex items-center gap-3 text-sm font-medium",
                statusMessage.type === "ok"
                  ? "bg-[rgba(124,224,176,0.1)] border-[var(--ok)] text-[var(--ok)]"
                  : "bg-[rgba(240,118,107,0.1)] border-[var(--danger)] text-[var(--danger)]"
              )}
            >
              {statusMessage.type === "ok" ? (
                <CheckCircle2 className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}
              <span>{statusMessage.text}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  )
}
