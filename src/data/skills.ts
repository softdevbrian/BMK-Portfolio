export type Skill = {
  group: string
  items: string[]
}

// CONTENT SLOT: skills data pasted here
export const skills: Skill[] = [
  {
    group: "Languages",
    items: ["Dart", "Python", "TypeScript", "JavaScript (ES6+)", "Kotlin (Android)", "SQL"],
  },
  {
    group: "Mobile Engineering",
    items: ["Flutter 3.x", "Cross-Platform (Android & iOS)", "Native Kotlin Services & Overlays", "Play Console Release Ops", "AdMob & Play Billing"],
  },
  {
    group: "Backend & Systems",
    items: ["Django 5 / 5.2", "Django REST Framework", "Daphne ASGI & Channels", "Celery & Django-Q2", "REST & OpenAPI 3.0", "Webhook Idempotency"],
  },
  {
    group: "Frontend Architecture",
    items: ["Next.js 14–16 (App Router)", "React 18 / 19", "Tailwind CSS v4", "Vite PWA & Workbox", "Motion / Framer Motion", "Radix UI"],
  },
  {
    group: "Databases & Caching",
    items: ["PostgreSQL 16", "Redis 7 (SET NX Locking)", "SQLite (sqflite)", "Browser IndexedDB", "Django ORM", "MySQL"],
  },
  {
    group: "AI & Intelligence",
    items: ["AI-Assisted Workflows", "RAG Concepts", "Knowledge-Graph Modeling", "Heuristic Decision Engines", "Behavioural Bot AI"],
  },
  {
    group: "Integrations & Protocols",
    items: ["Safaricom Daraja M-Pesa (STK/C2B/B2C)", "KRA eTIMS OSCU Sim", "Ed25519 Cryptography", "Brevo SMTP", "Bulk SMS", "WebSockets & QR Pairing"],
  },
  {
    group: "DevOps & Infrastructure",
    items: ["Oracle Cloud ARM64", "Nginx SNI Reverse Proxy", "Gunicorn & Systemd", "PM2", "Let's Encrypt Certbot", "Git & GitHub"],
  },
  {
    group: "Engineering Practices",
    items: ["Multi-Tenant SaaS Isolation", "Double-Entry & Maker-Checker", "Offline-First Outbox Sync", "Row-Level Locking", "Automated Simulation & Unit Testing"],
  },
]
