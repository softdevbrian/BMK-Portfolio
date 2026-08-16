export type Project = {
  slug: string
  title: string
  tagline: string
  ownership: "Solo" | "Partnered"
  role: string
  period: string
  status: string
  featured: boolean
  accent: "teal" | "violet" | "sky" | "amber"
  categories: ("Mobile" | "Web" | "AI" | "Payments")[]
  summary: string
  problem: string
  highlights: string[]
  challenges: { title: string; problem: string; solution: string }[]
  metrics: { label: string; value: string; prefix?: string; suffix?: string }[]
  stack: { group: string; items: string[] }[]
  links: { label: string; href: string; kind: "live" | "store" | "repo" | "demo" }[]
  cover: string
  shots: { src: string; caption: string; aspect: "phone" | "wide" }[]
}

// CONTENT SLOT: project data pasted here
export const projects: Project[] = [
  {
    slug: "cbc-ai",
    title: "CBC AI — AI Infrastructure Platform for Schools",
    tagline: "Production AI platform turning everyday Kenyan school operations into structured context to cut teacher workload and personalize learning.",
    ownership: "Partnered",
    role: "Co-Developer & CTO, Mobile Lead",
    period: "2023 – Present",
    status: "Live in Production (1,000+ Downloads)",
    featured: true,
    accent: "teal",
    categories: ["AI", "Mobile", "Web"],
    summary: "A production AI platform that turns everyday school operations into structured context, then uses that context to cut teacher administrative workload and personalize learning across Kenyan schools.",
    problem: "Schools struggle with fragmented operational data, heavy teacher administrative burdens (lesson plans, schemes of work, report cards), and difficulty personalizing Competency-Based Curriculum (CBC) tracking across large student bodies.",
    highlights: [
      "Co-developed the CBC AI platform and owned cross-platform Flutter mobile delivery for Android and iOS end to end.",
      "Surfaced the platform's intelligence layer on mobile: learner profiles, competency growth, CBC assessment reporting, and teacher dashboards.",
      "Shipped daily school operations: attendance, fee management, financial tracking, timetables, and teacher-parent bulk SMS.",
      "Connected the app to a data collection layer spanning school workflows and hardware/IoT signals (RFID canteen payments, biometric attendance, library RFID).",
      "Positioned mobile as the primary delivery surface for Teacher AI (lesson plans, schemes of work, marking, interventions) and Learner AI (strengths discovery, study plans)."
    ],
    challenges: [
      {
        title: "Translating Competency-Based Curriculum into Mobile Workflows",
        problem: "CBC uses multi-dimensional competency rubrics rather than simple numerical scores, creating complex data entry friction for teachers.",
        solution: "Engineered streamlined assessment reporting and automated administrative workflows that turn quick teacher observations into structured competency records and instant report cards."
      },
      {
        title: "Connecting Multi-Source IoT & School Operations Data",
        problem: "Feeding continuous signals from RFID canteen payments, biometric attendance, and library check-ins into actionable learner and teacher profiles.",
        solution: "Architected a modular four-layer platform model (Data Collection -> Educational Intelligence -> AI Reasoning -> Impact) synchronized via Django REST Framework endpoints."
      }
    ],
    metrics: [
      { label: "Play Store Downloads", value: "1000", suffix: "+" },
      { label: "Platform Layer Model", value: "4", suffix: "-Tier" },
      { label: "School Deployment", value: "Live", suffix: " in Kenya" }
    ],
    stack: [
      { group: "Mobile", items: ["Flutter 3.x", "Dart", "Android", "iOS", "Play Console"] },
      { group: "Backend", items: ["Django REST Framework", "Python", "REST APIs"] },
      { group: "Data & Storage", items: ["PostgreSQL", "School Knowledge Graph"] },
      { group: "Integrations & IoT", items: ["Bulk SMS", "RFID Payments", "Biometric Attendance"] }
    ],
    links: [
      { label: "CBC AI Platform", href: "https://cbcai.co.ke/", kind: "live" },
      { label: "Google Play Store", href: "https://play.google.com/store/apps/details?id=com.cbcai.app1&hl=en", kind: "store" }
    ],
    cover: "/images/projects/cbc-ai/cover.png",
    shots: [
      { src: "/images/projects/cbc-ai/shot-01.jpg", caption: "CBC Competency Tracking & Assessment", aspect: "phone" },
      { src: "/images/projects/cbc-ai/shot-02.jpeg", caption: "Teacher Operations & Administrative Suite", aspect: "phone" },
      { src: "/images/projects/cbc-ai/shot-03.jpeg", caption: "Learner AI & Educational Knowledge Graph", aspect: "phone" }
    ]
  },
  {
    slug: "tuko-kadi",
    title: "Tuko Kadi — Offline-First P2P Multiplayer Card Game",
    tagline: "Console-quality mobile adaptation of Kenyan card game Kadi with zero-infrastructure embedded WebSocket P2P multiplayer.",
    ownership: "Solo",
    role: "Sole Engineer & Game Architect",
    period: "May 2026 – Aug 2026",
    status: "Shipped v1.0.0+12",
    featured: true,
    accent: "violet",
    categories: ["Mobile", "AI"],
    summary: "A console-quality mobile adaptation of the Kenyan card game Kadi, playable with zero internet and zero backend cost across 55,650+ lines of Dart and 294+ commits, 100% solo-owned.",
    problem: "Multiplayer mobile games typically require expensive cloud game servers and constant internet connectivity, excluding low-connectivity environments and incurring ongoing infrastructure bills.",
    highlights: [
      "Built a deterministic game engine and state machine (GameController, ValidationEngine, TurnManager) handling cascading combinations, penalty stacking, Jack deflections, and Super Ace demands.",
      "Engineered zero-infrastructure P2P multiplayer by embedding an HttpServer + WebSocket host directly on-device with QR code pairing at sub-5ms local latency.",
      "Made networking fault-tolerant with persistent clientId session recovery, automated reconnection, and turn-timeout fail-safes.",
      "Built four behavioural AI opponents (The Meta, Simba, Kobe, Fisi) and a headless simulator running 500+ full 4-player matches in seconds.",
      "Hand-built visual layer with 10 dark themes, 14 animated app bars, custom canvas avatar builder, and card-shatter particle physics."
    ],
    challenges: [
      {
        title: "Asynchronous Out-of-Turn Rule Interruptions",
        problem: "Handling out-of-turn card jumps, deflections, and penalty challenges in real-time without desynchronizing distributed peer game states.",
        solution: "Isolated a pure ValidationEngine behind a negotiation state machine that freezes turn flow to dispatch interrupt prompts before resolving flow direction and penalties."
      },
      {
        title: "Zero-Infrastructure Local Multiplayer",
        problem: "Enabling real-time multiplayer without internet access, third-party matchmaking servers, or cloud hosting costs.",
        solution: "Embedded a lightweight dart:io HttpServer directly on the host device, broadcasting room join info over a local QR code containing host IP and room token."
      }
    ],
    metrics: [
      { label: "Lines of Dart (Solo)", value: "55", suffix: "k+" },
      { label: "Local P2P Latency", value: "5", prefix: "<", suffix: "ms" },
      { label: "Cloud Server Cost", value: "0", prefix: "$", suffix: "/mo" },
      { label: "AI Match Simulator", value: "500", suffix: "+/sec" }
    ],
    stack: [
      { group: "Mobile & Core", items: ["Flutter 3.x", "Dart 3.x", "CustomPainter", "flutter_test"] },
      { group: "Networking", items: ["Embedded dart:io HttpServer", "WebSockets", "QR Pairing"] },
      { group: "AI & State Engine", items: ["Deterministic State Machine", "Behavioural Bot AI", "Headless Simulator"] },
      { group: "Monetization", items: ["AdMob", "In-App Purchases / Play Billing", "BillingGuard"] }
    ],
    links: [
      { label: "Google Play Store", href: "https://play.google.com/store/apps/details?id=com.softdevbrian.tukokadi&hl=en", kind: "store" }
    ],
    cover: "/images/projects/tuko-kadi/cover.png",
    shots: [
      { src: "/images/projects/tuko-kadi/shot-01.jpeg", caption: "Gameplay Screen with Custom Canvas Card Physics", aspect: "wide" },
      { src: "/images/projects/tuko-kadi/shot-02.jpeg", caption: "Local P2P QR Code Lobby Pairing", aspect: "phone" },
      { src: "/images/projects/tuko-kadi/shot-03.jpeg", caption: "Selecting the Game Mode Screen", aspect: "phone" }
    ]
  },
  {
    slug: "tfms",
    title: "Tea Farm Management System (TFMS) — Agricultural ERP",
    tagline: "Agricultural ERP with Safaricom Daraja M-Pesa B2C real-money payouts and automated harvest-to-wage reconciliation.",
    ownership: "Solo",
    role: "Lead Full-Stack Engineer & System Architect",
    period: "Sept 2025 – Present",
    status: "Live in Production",
    featured: true,
    accent: "sky",
    categories: ["Web", "Payments"],
    summary: "A full farm ERP replacing paper ledgers, phone coordination, and cash payouts with automated harvest weighing and M-Pesa B2C disbursements across 151,800+ lines of Python and Django, 100% solo-owned.",
    problem: "Tea estate operations relied on manual paper records and risky physical cash payouts, causing payroll calculations to take 2-3 business days with high error rates, manual entry overhead, and scheduling conflicts.",
    highlights: [
      "Cut payroll calculation and wage disbursement from 2–3 business days to under 5 minutes through automated harvest weight -> piece-rate wage -> M-Pesa B2C pipeline.",
      "Integrated Safaricom Daraja M-Pesa B2C for one-click wage, contractor, and supply disbursements with 100% automated reconciliation against internal ledgers.",
      "Solved multi-tenant webhook routing by minting dynamic callback URLs with embedded farm IDs at dispatch and matching OriginatorConversationID in idempotent handlers.",
      "Built 4-tier RBAC (SuperAdmin, Farm Owner, Farm Manager, Field Worker) with conflict-detecting task scheduler preventing double-booked shifts.",
      "Delivered operational suite: harvest weighing logs (gross/tare/net kg with quality deductions), worker clock-in/out, inventory tracking, and dynamic Excel exports."
    ],
    challenges: [
      {
        title: "Multi-Tenant Webhook Routing with Stateless Callbacks",
        problem: "Safaricom B2C callback payloads carry no application context or tenant identification, risking cross-tenant transaction collision.",
        solution: "Minted dynamic callback URLs with embedded farm identifiers during dispatch, paired with idempotent handlers writing immutable ledger entries."
      },
      {
        title: "Production Timezone Data-Loss on Shared Hosting",
        problem: "Django's __date lookups invoked MySQL CONVERT_TZ() against unpopulated shared-hosting timezone tables, returning NULL and blanking dashboards.",
        solution: "Refactored date-boundary math into Python with timezone.make_aware() and exact UTC range filtering, making queries host-independent."
      }
    ],
    metrics: [
      { label: "Payroll Processing", value: "5", prefix: "<", suffix: " min" },
      { label: "Lines of Code (Solo)", value: "151", suffix: "k+" },
      { label: "Reconciliation", value: "100", suffix: "%" },
      { label: "Role Portals", value: "4", suffix: "-Tier RBAC" }
    ],
    stack: [
      { group: "Backend & Core", items: ["Python 3.13", "Django 5.2.6", "Gunicorn", "WhiteNoise"] },
      { group: "Payments & Integration", items: ["Safaricom Daraja M-Pesa B2C", "Brevo Email API", "openpyxl"] },
      { group: "Frontend", items: ["Vanilla JS (ES6+)", "Responsive CSS", "HTML5"] },
      { group: "Database & Infra", items: ["MySQL", "cPanel / Phusion Passenger"] }
    ],
    links: [
      { label: "Live Site", href: "https://masharikiafricafoundation.org/", kind: "live" }
    ],
    cover: "/images/projects/tfms/cover.png",
    shots: [
      { src: "/images/projects/tfms/shot-01.png", caption: "Harvest Weighing & Piece-Rate Wage Dashboard", aspect: "wide" },
      { src: "/images/projects/tfms/shot-02.png", caption: "M-Pesa B2C Instant Disbursement Hub", aspect: "wide" },
      { src: "/images/projects/tfms/shot-03.png", caption: "Conflict-Detecting Shift & Task Scheduler", aspect: "wide" }
    ]
  },
  {
    slug: "finance-tracker",
    title: "Finance Tracker — Multi-Timeframe Financial Intelligence",
    tagline: "Localized (KES) personal finance dashboard built around flexible, overlapping time periods and an 11-scenario heuristic advisory engine.",
    ownership: "Solo",
    role: "Lead Full-Stack Developer & UI/UX",
    period: "Nov 2024",
    status: "Shipped MVP",
    featured: true,
    accent: "amber",
    categories: ["Web", "Payments"],
    summary: "A localized (KES) personal finance dashboard built around flexible, overlapping time periods rather than fixed calendar months, backed by serverless Postgres.",
    problem: "Traditional budgeting apps enforce rigid calendar-month boundaries, failing users with non-standard pay cycles, overlapping budget goals, or multiple concurrent project expenses.",
    highlights: [
      "Designed a normalized 5-table serverless Postgres schema (periods, period_selected, budgets, incomes, expenses) with Drizzle ORM.",
      "Built a persistent TimeFrameProvider Context allowing concurrent weekly, monthly, yearly, and custom period aggregation without stale data.",
      "Wrote dynamic Drizzle queries using inArray filtering and COALESCE aggregate joins for sub-second calculations.",
      "Engineered an 11-scenario heuristic advisory engine evaluating live income/budget/spend ratios for contextual risk alerts.",
      "Created reusable useChartExport hook capturing high-resolution charts via html2canvas and generating formatted A4 PDF reports in under a second."
    ],
    challenges: [
      {
        title: "Multi-Timeframe Overlapping Aggregations",
        problem: "Aggregating budget vs spend across arbitrary overlapping date periods in real-time without stale data or hydration mismatches.",
        solution: "Designed a persistent TimeFrameProvider React Context backed by a period_selected database table with COALESCE join queries."
      },
      {
        title: "Client-Side High-Resolution Chart PDF Export",
        problem: "Chart canvas exports suffered from container clipping, blurry pixelation, and inconsistent pagination on mobile screens.",
        solution: "Built a custom export hook that normalizes container dimensions, captures at 3x resolution via html2canvas, and maps exact A4 landscape scaling in jsPDF."
      }
    ],
    metrics: [
      { label: "Advisory Engine", value: "11", suffix: " Scenarios" },
      { label: "Query Response", value: "150", suffix: "ms" },
      { label: "PDF Export Time", value: "1", prefix: "<", suffix: "s" }
    ],
    stack: [
      { group: "Frontend", items: ["Next.js 15 (App Router)", "React 19", "Tailwind CSS", "Framer Motion", "Recharts"] },
      { group: "Backend & Data", items: ["Neon Serverless PostgreSQL", "Drizzle ORM", "TypeScript"] },
      { group: "Auth & Export", items: ["Clerk Authentication", "jsPDF", "html2canvas"] },
      { group: "Deployment", items: ["Vercel", "Turbopack"] }
    ],
    links: [
      { label: "Live Demo", href: "https://finance-tracker-ukk3.vercel.app/", kind: "live" },
      { label: "GitHub Repository", href: "https://github.com/StaticBuilder/Finance_Tracker.git", kind: "repo" }
    ],
    cover: "/images/projects/finance-tracker/cover.png",
    shots: [
      { src: "/images/projects/finance-tracker/shot-01.png", caption: "Multi-Timeframe Budget Allocation Dashboard", aspect: "wide" },
      { src: "/images/projects/finance-tracker/shot-02.png", caption: "Heuristic Risk Analysis & Financial Insights", aspect: "wide" },
      { src: "/images/projects/finance-tracker/shot-03.png", caption: "One-Click A4 PDF Financial Report Generation", aspect: "wide" }
    ]
  }
]

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug)
