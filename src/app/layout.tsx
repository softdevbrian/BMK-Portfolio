import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"
import { site } from "@/data/site"
import { SmoothScroll } from "@/components/fx/SmoothScroll"
import { PageShell } from "@/components/layout/PageShell"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: "#0B0B10",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL("https://briankuria.dev"),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: `${site.name} — ${site.role} based in ${site.location}. Building high-performance, scalable web, mobile, and AI products.`,
  keywords: [
    "Brian Kuria Maina",
    "CTO",
    "Full-Stack Engineer",
    "Product Engineer",
    "Next.js",
    "React Native",
    "TypeScript",
    "Software Architect",
    "Nairobi Kenya",
  ],
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://briankuria.dev",
    title: `${site.name} | ${site.role}`,
    description: `${site.name} — ${site.role} based in ${site.location}. Architectural portfolio & production engineering work.`,
    siteName: site.name,
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: `${site.name} Portfolio OpenGraph`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: `${site.name} — ${site.role} based in ${site.location}. Architectural portfolio & production engineering work.`,
    images: ["/images/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased font-sans">
        <SmoothScroll>
          <PageShell>{children}</PageShell>
        </SmoothScroll>
      </body>
    </html>
  )
}
