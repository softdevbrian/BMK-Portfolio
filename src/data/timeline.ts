export type TimelineItem = {
  period: string
  title: string
  org: string
  points: string[]
}

// CONTENT SLOT: timeline data pasted here
export const timeline: TimelineItem[] = [
  {
    period: "2023 — Present",
    title: "Chief Technology Officer",
    org: "Bombay Softwares · Nairobi, Kenya",
    points: [
      "Set technical direction for an EdTech startup building AI infrastructure for schools, designing every workflow to generate context that AI can reason over.",
      "Co-developed the CBC AI Platform (cbcai.co.ke) alongside a partner team, owning the mobile application layer end to end (architecture, UI/UX, state management, API integration, release engineering, and store operations).",
      "Shipped and maintain the CBC AI Android & iOS app to production, now at 1,000+ downloads and in active daily use by Kenyan schools.",
      "Architected the app against a four-layer platform model: data collection (school workflows, hardware/IoT signals like RFID canteen payments and biometric attendance), educational intelligence (learner/teacher profiles, school knowledge graph), AI (Teacher AI, Learner AI), and measurable impact.",
      "Translated the Competency-Based Curriculum into product: competency tracking, assessment reporting, report cards, lesson plans, and schemes of work.",
    ],
  },
  {
    period: "2024 — Present",
    title: "Full-Stack System Architect & Independent Engineer",
    org: "Production Systems Delivery",
    points: [
      "Independently designed and shipped Tea Farm Management System (TFMS) — a real-money M-Pesa B2C payroll and farm ERP across 151,800+ lines of Python/Django cutting payroll processing from 2–3 days to < 5 minutes.",
      "Architected Tuko Kadi (55,650+ lines of Dart) — a console-quality offline-first P2P multiplayer card game with embedded device-hosted WebSockets, QR pairing, and 4 behavioural bot AIs.",
      "Built and deployed Finance Tracker — a multi-timeframe financial intelligence dashboard on Neon serverless Postgres, Drizzle ORM, and an 11-scenario heuristic advisory engine.",
    ],
  },
  {
    period: "Expected July 2026",
    title: "BSc Software Development",
    org: "KCA University · Nairobi, Kenya",
    points: [
      "Undergraduate software development curriculum focusing on software architecture, algorithms, distributed databases, and full-stack engineering.",
      "Combined academic studies with active startup CTO leadership and authoring over 200,000+ lines of solo production code.",
    ],
  },
]
