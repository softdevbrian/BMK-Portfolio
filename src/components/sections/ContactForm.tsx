"use client"

import { useState, useEffect, useRef, type FormEvent, type ChangeEvent, type FocusEvent } from "react"
import emailjs from "@emailjs/browser"
import { Send, AlertCircle, CheckCircle2 } from "lucide-react"
import { site } from "@/data/site"
import { cn } from "@/lib/cn"
import { Button } from "@/components/ui/Button"

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

export function ContactForm() {
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

  const validateField = (name: keyof FormValues, value: string): string | undefined => {
    if (name === "company") return undefined

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Check honeypot: if company filled, silently return
    if (values.company) {
      return
    }

    // Validate all fields
    const nameErr = validateField("name", values.name)
    const emailErr = validateField("email", values.email)
    const subjectErr = validateField("subject", values.subject)
    const messageErr = validateField("message", values.message)

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

  const inputClass = (hasError: boolean) =>
    cn(
      "w-full px-4 py-3 rounded-[var(--r)] glass bg-[rgba(255,255,255,0.02)] text-[var(--text)] text-sm placeholder-[var(--text-2)]/50 border transition-all duration-200 focus:outline-none",
      hasError
        ? "border-[var(--danger)] focus:ring-2 focus:ring-[var(--danger)]/30"
        : "border-[var(--line)] focus:border-[var(--teal)] focus:ring-2 focus:ring-[rgba(45,212,191,0.22)]"
    )

  return (
    <div className="glass-card rounded-[var(--r-xl)] p-6 sm:p-8 md:p-10 border border-[var(--line-strong)] shadow-[var(--sh-1)] relative overflow-hidden">
      {/* Decorative ambient top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[var(--teal)] via-[var(--sky)] to-[var(--violet)]" />

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

        {/* 2-col Name & Email Row (collapsing to 1 col under 820px) */}
        <div className="grid grid-cols-1 min-[820px]:grid-cols-2 gap-6">
          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-mono font-medium text-[var(--text-2)] uppercase">
              Your Name <span className="text-[var(--teal)]">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
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

          {/* Email Field */}
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
        </div>

        {/* Subject Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className="text-xs font-mono font-medium text-[var(--text-2)] uppercase">
            Subject <span className="text-[var(--teal)]">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            placeholder="Project inquiry / CTO role / Technical consultation"
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

        {/* Message Field */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-xs font-mono font-medium text-[var(--text-2)] uppercase">
            Message <span className="text-[var(--teal)]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tell me about your product, timeline, goals, and technical requirements..."
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

        {/* Submit Button */}
        <div>
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
