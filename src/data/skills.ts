export type Skill = {
  group: string
  items: string[]
}

// CONTENT SLOT: skills data pasted here
export const skills: Skill[] = [
  {
    group: "Languages",
    items: ["Dart", "Python", "JavaScript (ES6+)", "TypeScript", "SQL"],
  },
  {
    group: "Mobile Engineering",
    items: ["Flutter 3.x", "Cross-Platform (Android & iOS)", "Play Console Release Operations", "AdMob", "In-App Purchases / Play Billing"],
  },
  {
    group: "Backend & Systems",
    items: ["Django 5", "Django REST Framework", "FastAPI", "Node.js", "REST API Design", "Webhook & Callback Architecture"],
  },
  {
    group: "Frontend Architecture",
    items: ["Next.js 15 (App Router)", "React 19", "Tailwind CSS", "Motion / Framer Motion", "Radix UI", "Recharts", "Chart.js"],
  },
  {
    group: "Databases & ORM",
    items: ["PostgreSQL (Neon Serverless)", "MySQL", "SQLite", "Drizzle ORM", "Django ORM", "Schema Design & Aggregations"],
  },
  {
    group: "AI & Intelligence",
    items: ["AI-Assisted Workflows", "RAG Concepts", "Knowledge-Graph Modeling", "Heuristic Decision Engines", "Behavioural Bot AI"],
  },
  {
    group: "Integrations & Protocols",
    items: ["Safaricom Daraja M-Pesa B2C", "Brevo Transactional Email", "Clerk Auth", "Bulk SMS", "QR Pairing", "WebSockets"],
  },
  {
    group: "DevOps & Infrastructure",
    items: ["cPanel / Phusion Passenger", "Railway", "Vercel", "WhiteNoise", "Gunicorn", "Git & GitHub", "Flutter DevTools"],
  },
  {
    group: "Engineering Practices",
    items: ["Systems Architecture", "Deterministic State Machines", "RBAC", "Automated Simulation Testing", "Zero-Infrastructure P2P"],
  },
]
