import type { Metadata, Viewport } from "next"
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google"
import Script from "next/script"
import { site } from "@/data/site"
import { SmoothScroll } from "@/components/fx/SmoothScroll"
import { PageShell } from "@/components/layout/PageShell"
import { ThemeProvider } from "@/components/theme/ThemeProvider"
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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0B10" },
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
  ],
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
    "Brian Maina Kuria",
    "CTO",
    "Full-Stack Engineer",
    "Product Engineer",
    "Next.js",
    "Flutter",
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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
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
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[var(--bg)] text-[var(--text)] antialiased font-sans">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');document.documentElement.setAttribute('data-theme','light');}}catch(e){}})()`,
          }}
        />
        <ThemeProvider>
          <SmoothScroll>
            <PageShell>{children}</PageShell>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
