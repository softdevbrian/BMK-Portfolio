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
    role: "Co-Developer & Mobile Lead",
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
      { label: "School Deployment", value: "1", suffix: " in Kenya" }
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
    slug: "tikitipro",
    title: "TikitiPro — High-Concurrency Transit & Cryptographic Event Ticketing Engine",
    tagline: "Multi-operator SACCO transit & event ticketing engine eliminating flash-sale double-bookings with Redis/PostgreSQL locking, M-Pesa escrow, and <50ms offline Ed25519 QR verification.",
    ownership: "Solo",
    role: "Lead Full-Stack Engineer & System Architect",
    period: "2026 – Present",
    status: "Live in Production",
    featured: true,
    accent: "violet",
    categories: ["Web", "Mobile", "Payments"],
    summary: "A full-stack, multi-operator transit SACCO and reserved-seat event ticketing platform built for high-concurrency African mobility and live venues—100% solo-architected across Django 5.1 (Daphne ASGI), Next.js 15, Redis 7, PostgreSQL 16, and Flutter 3.",
    problem: "Flash sales on shuttles and live events frequently suffer from race-condition double-bookings when multiple passengers purchase the last seats simultaneously, while rural transit corridors lack reliable 4G connectivity for boarding ticket verification.",
    highlights: [
      "Prevented flash-sale double-bookings by combining Redis SET NX EX 180 atomic seat holds with PostgreSQL SELECT FOR UPDATE row locks and partial unique constraints (0 double-bookings across 50 concurrent competing threads).",
      "Built an interactive 50-Buyer Concurrency Arena and real-time SVG cabin maps (14-seater RHD matatus, 33-seater coaches, 24-seat VIP grids) powered by Django Channels WebSockets.",
      "Engineered <50ms pure-Dart offline ticket verification in Flutter using asymmetric Ed25519 signatures (cached 32-byte public key) and a local append-only scan ledger blocking screenshot replay attacks.",
      "Solved M-Pesa Daraja 3.0 late-callback races via LATE_ESCROW_CREDIT quarantine so expired holds bought by another passenger are never overwritten and resolve cleanly via Next-Shuttle Vouchers or B2C reversals.",
      "Delivered a multi-SACCO marketplace with a 5-tab Platform Superadmin Console, Operator Dispatch Console, Brevo SMTP 6-digit OTP recovery, and passwordless passenger ticket lookup."
    ],
    challenges: [
      {
        title: "Zero Double-Bookings Under Flash-Sale Concurrency",
        problem: "When 50+ buyers request the last 2 seats on a Nairobi-Nakuru shuttle at the exact same millisecond, naive check-then-insert queries allow multiple buyers to pay for the same seat.",
        solution: "Layered a 180-second Redis SET NX distributed lock ahead of PostgreSQL SELECT FOR UPDATE transactional row locking and a partial unique index (uniq_active_or_confirmed_seat_per_trip), returning HTTP 409 Conflict to losing threads."
      },
      {
        title: "Offline Conductor Verification Without Forgery Risk",
        problem: "Highway transit conductors lose 4G coverage mid-route, yet storing symmetric HMAC secrets on a mobile app allows ticket forgery if a device is stolen.",
        solution: "Signed ticket payloads on the backend with a private Ed25519 key (v1|ticket|trip|seat|phone4|unix|key_id.sig) and embedded only the 32-byte public key in the Flutter app for <50ms offline verification and idempotent outbox sync."
      }
    ],
    metrics: [
      { label: "Double-Bookings (50 Threads)", value: "0", suffix: " Races" },
      { label: "Offline QR Verification", value: "50", prefix: "<", suffix: " ms" },
      { label: "Seat Hold Window", value: "180", suffix: " sec" },
      { label: "Platform Architecture", value: "3", suffix: "-Stack" }
    ],
    stack: [
      { group: "Backend & Real-Time", items: ["Django 5.1", "DRF", "Daphne ASGI", "Django Channels", "Ed25519 Cryptography"] },
      { group: "Data & Locking", items: ["PostgreSQL 16", "Redis 7 (SET NX)", "SELECT FOR UPDATE"] },
      { group: "Frontend Web", items: ["Next.js 15 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4"] },
      { group: "Mobile & Infra", items: ["Flutter 3", "Brevo SMTP", "Nginx Reverse Proxy", "Oracle Cloud ARM64"] }
    ],
    links: [
      { label: "Live Production Site", href: "https://tikitipro.duckdns.org", kind: "live" },
      { label: "API Docs (Swagger)", href: "https://tikitipro.duckdns.org/api/docs/", kind: "demo" }
    ],
    cover: "/images/projects/tikitipro/cover.png",
    shots: [
      { src: "/images/projects/tikitipro/shot-01.png", caption: "Interactive SVG Cabin Map & M-Pesa Checkout Stub", aspect: "wide" },
      { src: "/images/projects/tikitipro/shot-02.png", caption: "50-Buyer Concurrency Arena (0 Double-Bookings, 48 Conflicts Blocked)", aspect: "wide" },
      { src: "/images/projects/tikitipro/shot-03.png", caption: "M-Pesa Late Callback Escrow & USSD *384*77# Simulator", aspect: "wide" }
    ]
  },
  {
    slug: "dukasync",
    title: "DukaSync — Offline-First Multi-Tenant Retail POS, Van-Sales & KRA eTIMS Platform",
    tagline: "Offline-first retail POS and van-sales platform with RFC 9562 UUIDv7 sync queues, deadlock-free stock locking, and simulated KRA eTIMS 4-tier VAT compliance.",
    ownership: "Solo",
    role: "Lead Full-Stack Engineer & System Architect",
    period: "2026 – Present",
    status: "Live in Production",
    featured: true,
    accent: "amber",
    categories: ["Web", "Mobile", "Payments"],
    summary: "A full-stack, multi-tenant offline-first Point of Sale (POS), inventory ledger, and fiscal compliance platform built for Kenyan hardware depots, wholesale distributors, and rural delivery vans across Django 5, Next.js 15, and Flutter 3.",
    problem: "Cloud-only POS tools freeze during Safaricom 4G or fiber blackouts, forcing cashiers onto paper books, while naive offline sync replays cause duplicate stock deductions or overwrite concurrent branch inventory.",
    highlights: [
      "Built local-first checkout across Next.js IndexedDB and Flutter sqflite using time-ordered RFC 9562 UUIDv7 idempotency keys to commit sales offline and print provisional 80mm thermal receipts immediately.",
      "Engineered deadlock-free batch synchronization in Django using deterministic SKU sorting inside transaction.atomic() before acquiring select_for_update() row locks on BranchInventory.",
      "Designed zero-revenue-loss conflict handling: competing offline oversells commit both paid receipts and raise an auditable StockConflictIncident workflow for Store Managers to reconcile.",
      "Implemented simulated KRA eTIMS OSCU fiscalization across 4 Kenyan VAT tiers (16%, 8%, 0%, Exempt) with HMAC-SHA256 signatures, deterministic QR payloads, and M-Pesa till reconciliation.",
      "Enforced strict multi-tenant SaaS isolation across 5 RBAC roles (OWNER, STORE_MANAGER, CASHIER, VAN_SALES, ACCOUNTANT) with Brevo SMTP OTP verification and an ENABLE_DEMO_LOGIN sandbox toggle."
    ],
    challenges: [
      {
        title: "Deadlock-Free Batch Sync & Idempotent Retries",
        problem: "Retrying flaky HTTP batch syncs can deduct stock twice, while concurrent multi-item baskets updating overlapping SKUs risk PostgreSQL row-lock deadlocks.",
        solution: "Assigned client-generated UUIDv7 client_tx_id keys checked for idempotency prior to mutation, and sorted all line-item SKUs deterministically before acquiring select_for_update() locks."
      },
      {
        title: "Competing Offline Oversells Without Dropping Paid Sales",
        problem: "Two disconnected tablets may sell the final unit of a SKU concurrently during an internet blackout; rejecting the second receipt after cash or M-Pesa changed hands creates ledger discrepancies.",
        solution: "Committed both valid financial sales to the immutable StockMovement ledger and automatically spawned a StockConflictIncident for manager resolution via recount, backorder, or credit note."
      }
    ],
    metrics: [
      { label: "Offline Continuity", value: "100", suffix: "%" },
      { label: "Kenyan VAT Tiers", value: "4", suffix: " Rates" },
      { label: "Tenant RBAC Roles", value: "5", suffix: " Roles" },
      { label: "Receipt Format", value: "80", suffix: "mm eTIMS" }
    ],
    stack: [
      { group: "Backend & Sync", items: ["Django 5.1", "DRF", "PostgreSQL 16", "select_for_update()", "RFC 9562 UUIDv7"] },
      { group: "Web POS", items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4", "IndexedDB"] },
      { group: "Mobile & Van", items: ["Flutter 3", "Dart", "sqflite", "CustomPainter Thermal Receipts"] },
      { group: "Fiscal & Ops", items: ["KRA eTIMS Sim", "M-Pesa Daraja 3.0 Sim", "Brevo SMTP", "Oracle Cloud ARM64"] }
    ],
    links: [
      { label: "Live Production Site", href: "https://dukasync.duckdns.org", kind: "live" },
      { label: "API Docs (Swagger)", href: "https://dukasync.duckdns.org/api/docs/", kind: "demo" }
    ],
    cover: "/images/projects/dukasync/cover.png",
    shots: [
      { src: "/images/projects/dukasync/shot-01.png", caption: "Offline-First POS Register & Provisional eTIMS Receipt", aspect: "wide" },
      { src: "/images/projects/dukasync/shot-02.png", caption: "Inventory Balances, Split-Pane GRN Builder & Stock Ledger", aspect: "wide" },
      { src: "/images/projects/dukasync/shot-03.png", caption: "Multi-Device Offline Stock Conflict Resolution Workbench", aspect: "wide" }
    ]
  },
  {
    slug: "tuko-pamoja",
    title: "Tuko Pamoja — Multi-Tenant Double-Entry Fund Accounting & Membership Platform",
    tagline: "Audit-grade multi-tenant community finance platform with ring-fenced funds, maker-checker workflows, and 247 automated tests.",
    ownership: "Partnered",
    role: "Co-Architect & Full-Stack Engineer",
    period: "2026 – Present",
    status: "Live in Production (247 Tests Passing)",
    featured: true,
    accent: "sky",
    categories: ["Web", "Payments"],
    summary: "An enterprise-grade, multi-tenant community financial management and double-entry fund accounting Progressive Web App (PWA) engineered for chamas, welfare associations, and cooperative groups.",
    problem: "Savings groups and welfare associations often commingle funds in informal spreadsheets with zero separation of duties, lost audit trails, and insecure handling of sensitive member claim records.",
    highlights: [
      "Built an audit-compliant double-entry ledger ring-fencing designated funds (Welfare, Emergency, Sinking) with automatic member obligation allocation and available credit tracking.",
      "Enforced Maker-Checker separation of duties at the API layer so officers recording receipts or drafting expense payouts cannot independently verify or finalize their own entries.",
      "Engineered a two-phase bulk CSV roster importer executing complete relational validation and duplicate checks with zero database writes on preview, followed by an atomic commit.",
      "Created a high-precision ReportLab PDF engine (two-pass NumberedCanvas 'Page X of Y', repeated headers) and OpenPyXL Excel exporter with spreadsheet formula injection defense.",
      "Maintained a 100% pass rate across 247 automated tests (178 Django backend tests + 69 Vitest frontend tests) with immutable audit logging and memory-stored JWT + HttpOnly cookie auth."
    ],
    challenges: [
      {
        title: "Preventing Single-Officer Financial Manipulation",
        problem: "In small savings groups, allowing one treasurer to both record cash/M-Pesa receipts and mark them as verified creates a major fraud and audit vulnerability.",
        solution: "Implemented API-enforced Maker-Checker state machines requiring a second independent officer to verify inflows against bank/M-Pesa statements and confirm expense disbursements before ledger posting."
      },
      {
        title: "Safe Bulk Member Onboarding & Formula-Safe Exports",
        problem: "Uploading large community CSV rosters risks partial dirty writes on invalid rows, while exporting user-entered strings to Excel exposes accountants to CSV formula injection.",
        solution: "Separated roster import into a zero-mutation validation preview and an @transaction.atomic commit phase, and dynamically escaped leading =, +, -, and @ characters in all XLSX/CSV exports."
      }
    ],
    metrics: [
      { label: "Automated Tests", value: "247", suffix: " Passed" },
      { label: "Test Pass Rate", value: "100", suffix: "%" },
      { label: "Financial Integrity", value: "2", suffix: "-Entry Ledger" },
      { label: "Control Standard", value: "2", suffix: "-Person Rule" }
    ],
    stack: [
      { group: "Backend & Ledger", items: ["Django 5", "DRF 3.15", "Python 3.13", "PostgreSQL", "Django-Q2"] },
      { group: "Frontend PWA", items: ["React 18/19", "TypeScript", "Vite 5", "Workbox PWA", "Vitest"] },
      { group: "Reporting & Security", items: ["ReportLab 5.1", "OpenPyXL", "HttpOnly Refresh JWT", "Immutable Audit Log"] },
      { group: "Deployment", items: ["Oracle Cloud ARM64", "Nginx", "Gunicorn", "PM2", "Brevo SMTP"] }
    ],
    links: [
      { label: "Live Production Site", href: "https://tukopamoja.duckdns.org", kind: "live" },
      { label: "1-Click Interactive Demo", href: "https://tukopamoja.duckdns.org/login/", kind: "demo" }
    ],
    cover: "/images/projects/tuko-pamoja/cover.png",
    shots: [
      { src: "/images/projects/tuko-pamoja/shot-01.png", caption: "Pamoja QA Welfare Admin Workspace & Contribution Plans", aspect: "wide" },
      { src: "/images/projects/tuko-pamoja/shot-02.png", caption: "Maker-Checker Expenses & Disbursements Workflow", aspect: "wide" },
      { src: "/images/projects/tuko-pamoja/shot-03.png", caption: "Community Financial Reports & Excel Export Engine", aspect: "wide" }
    ]
  },
  {
    slug: "kejaflow",
    title: "KejaFlow — Automated Kenyan PropTech, Water Billing & M-Pesa Rental Ledger",
    tagline: "End-to-end rental property ledger with a 4-bucket atomic M-Pesa waterfall, KRA 7.5% MRI tax separation, and offline basement water meter capture.",
    ownership: "Solo",
    role: "Lead Full-Stack Engineer & System Architect",
    period: "2026 – Present",
    status: "Live in Production",
    featured: false,
    accent: "teal",
    categories: ["Web", "Mobile", "Payments"],
    summary: "An automated property management, utility sub-metering, and rental reconciliation platform built for Kenyan apartment blocks ('plots') across Django 5.1, Next.js 15, and Flutter 3.",
    problem: "Kenyan landlords struggle with ambiguous partial M-Pesa Paybill payments, caretakers losing paper water meter logs in zero-signal basements, and overpaying KRA's 7.5% Monthly Rental Income tax on pass-through utility reimbursements.",
    highlights: [
      "Engineered a 4-bucket atomic M-Pesa waterfall (Prior Arrears -> Water & Garbage -> Current Base Rent -> Prepaid Credit) protected by select_for_update() row locks and unique mpesa_receipt constraints.",
      "Built a KRA 7.5% MRI tax engine automatically separating tax-exempt utility reimbursements from taxable rent, paired with zero-dependency @media print A4 eTIMS tenant statements.",
      "Delivered a visual floor-by-floor Plot Matrix (A1-D6) with live standing indicators (Paid, Partial, Overdue, Vacant), slide-over unit drawers, and dynamic plot/floor/unit builders.",
      "Shipped a Flutter 3 companion app with an idempotent SharedPreferences outbox queue (clientSyncId) for Caretaker basement water meter walks and a Tenant Passbook with STK Express checkout.",
      "Enforced strict RBAC isolation across LANDLORD, CARETAKER, and TENANT workspaces alongside an opt-in 1-click sandbox demo and Brevo SMTP password recovery."
    ],
    challenges: [
      {
        title: "Ambiguous Partial M-Pesa Payments & Concurrent Callbacks",
        problem: "Tenants frequently pay irregular amounts via Paybill, and duplicate or concurrent Safaricom webhooks can double-credit unit balances.",
        solution: "Locked unit rows with select_for_update() inside transaction.atomic() to drain obligations deterministically across 4 waterfall buckets while enforcing UNIQUE constraints on mpesa_receipt."
      },
      {
        title: "Zero-Signal Basement Water Metering",
        problem: "Caretakers reading sub-meters in concrete basements lose mobile connectivity, causing lost logs and billing disputes.",
        solution: "Built an offline-first Flutter Plot Walk outbox persisting readings locally with deterministic KF-SYNC keys and flushing idempotently via /api/v1/water-readings/bulk-sync/."
      }
    ],
    metrics: [
      { label: "Waterfall Priority", value: "4", suffix: "-Bucket" },
      { label: "KRA Tax Engine", value: "7.5", suffix: "% MRI" },
      { label: "Role Portals", value: "3", suffix: " Workspaces" },
      { label: "Client Surfaces", value: "2", suffix: " (Web+App)" }
    ],
    stack: [
      { group: "Backend & Tasks", items: ["Django 5.1", "DRF", "Celery", "Redis", "PostgreSQL", "drf-spectacular"] },
      { group: "Web Portal", items: ["Next.js 15 (App Router)", "React 19", "TypeScript", "Tailwind CSS v4", "PWA"] },
      { group: "Mobile Companion", items: ["Flutter 3", "Dart 3", "Material 3", "SharedPreferences Outbox"] },
      { group: "FinTech & Infra", items: ["Daraja 3.0 Sim", "KRA eTIMS Stamps", "Brevo SMTP", "Oracle Cloud ARM64"] }
    ],
    links: [
      { label: "Live Production Site", href: "https://kejaflow.duckdns.org", kind: "live" },
      { label: "1-Click Demo Sandbox", href: "https://kejaflow.duckdns.org/login", kind: "demo" },
      { label: "API Docs (Swagger)", href: "https://kejaflow.duckdns.org/api/docs/", kind: "live" }
    ],
    cover: "/images/projects/kejaflow/cover.png",
    shots: [
      { src: "/images/projects/kejaflow/shot-01.png", caption: "Unit Slide-Over Drawer: 4-Bucket Balance & Water Meter Proof", aspect: "wide" },
      { src: "/images/projects/kejaflow/shot-02.png", caption: "Atomic Reconciliation Ledger & KRA 7.5% MRI Tax Engine", aspect: "wide" },
      { src: "/images/projects/kejaflow/shot-03.png", caption: "Caretaker Water Meter Studio & Audit Log", aspect: "wide" }
    ]
  },
  {
    slug: "kichele",
    title: "Kichele (Pesa Mirror) — Offline-First M-Pesa Personal Finance Tracker for Android",
    tagline: "Privacy-preserving Android finance tracker intercepting M-Pesa SMS in real time via native Kotlin, featuring a 1-tap floating categorization overlay and 100% on-device SQLite.",
    ownership: "Solo",
    role: "Sole Mobile, Native Android & Full-Stack Engineer",
    period: "2026 – Present",
    status: "Live Showcase & APK Release (v1.0.2+3)",
    featured: false,
    accent: "sky",
    categories: ["Mobile", "Web", "Payments"],
    summary: "An offline-first, privacy-preserving M-Pesa personal finance ledger for Android (Flutter 3 + Native Kotlin + SQLite) paired with a Next.js 15 product showcase and Django 5 release API.",
    problem: "Kenyan M-Pesa users accumulate hundreds of unstructured SMS receipts with buried transaction fees, multi-SIM confusion, and sensitive account balances exposed on lock screens—while refusing to upload financial data to third-party clouds.",
    highlights: [
      "Engineered a native Android Kotlin BroadcastReceiver and foreground SmsListenerService with an offline PendingSmsStore queue to intercept M-Pesa SMS in real time even when the Flutter engine is closed.",
      "Built a system-wide FloatingOverlayService (WindowManager) card that pops up immediately upon transaction arrival with a recency-sorted, flow-aware 1-tap category pill strip writing straight to native SQLite.",
      "Implemented privacy-first balance protection: masked balances (Ksh••••••) by default, tap-to-reveal with auto-hide on app switch, and a 14px BackdropFilter frosted-glass SMS inspector.",
      "Added Dual-SIM subscription auto-discovery and internal self-transfer isolation (neither flow bucket) plus Fuliza overdraft separation and Money Lost to Fees analytics.",
      "Shipped a matching Next.js 15 showcase website with an interactive simulated phone demo and a Django 5 release metadata API serving signed APK updates via Nginx zero-copy streaming."
    ],
    challenges: [
      {
        title: "Real-Time SMS Categorization When App Process Is Killed",
        problem: "Standard Flutter Dart listeners stop executing when Android kills the background engine, dropping incoming M-Pesa notifications and preventing instant categorization.",
        solution: "Dropped down into native Kotlin to build a BroadcastReceiver, foreground service, PendingSmsStore disk queue, and WindowManager floating overlay that commits categories directly to sqflite."
      },
      {
        title: "Accurate Cash Flow Across Dual-SIM & Fuliza Transactions",
        problem: "Moving money between a user's personal and business SIMs—or drawing Fuliza overdrafts—falsely inflates monthly income and expense totals in standard trackers.",
        solution: "Auto-discovered SIM subscription IDs to classify self-transfers and Fuliza loan drawdowns under a dedicated 'neither' cash-flow bucket while isolating transaction tariffs into a Fees audit."
      }
    ],
    metrics: [
      { label: "Cloud Data Uploads", value: "0", suffix: " (100% Local)" },
      { label: "APK Release", value: "1.0.2", prefix: "v", suffix: "+3" },
      { label: "Balance Protection", value: "14", suffix: "px Blur + Mask" },
      { label: "Categorization UX", value: "1", suffix: "-Tap Overlay" }
    ],
    stack: [
      { group: "Android & Mobile", items: ["Flutter 3", "Dart", "Native Kotlin", "WindowManager Overlay", "sqflite"] },
      { group: "Showcase Web", items: ["Next.js 15", "React 19", "TypeScript", "Interactive Phone Demo"] },
      { group: "Release Backend", items: ["Django 5", "DRF", "PostgreSQL 16", "SHA-256 Checksum API"] },
      { group: "Cloud Hosting", items: ["Oracle Cloud ARM64", "Nginx sendfile (2 MB/s limit)", "PM2", "Systemd"] }
    ],
    links: [
      { label: "Live Showcase Site", href: "https://kichele.duckdns.org", kind: "live" },
      { label: "Download Android APK", href: "https://kichele.duckdns.org/downloads/Kichele.apk", kind: "store" }
    ],
    cover: "/images/projects/kichele/cover.png",
    shots: [
      { src: "/images/projects/kichele/shot-01.png", caption: "M-Pesa SMS-to-SQLite Pipeline Inspector (Fuliza & Fee Extraction)", aspect: "wide" },
      { src: "/images/projects/kichele/shot-02.png", caption: "Privacy-First Features: Floating Overlay, Masked Balances & Dual-SIM", aspect: "wide" },
      { src: "/images/projects/kichele/shot-03.png", caption: "Direct Android APK v1.0.2+3 Release, SHA-256 & Permissions", aspect: "wide" }
    ]
  },
  {
    slug: "tfms",
    title: "Tea Farm Management System (TFMS) — Enterprise Agricultural ERP",
    tagline: "Commercial tea estate operations, agronomic intelligence, 7-logic payroll engine, and Safaricom Daraja M-Pesa B2C wage disbursements across 59 Next.js routes.",
    ownership: "Solo",
    role: "Lead Full-Stack Engineer & System Architect",
    period: "Sept 2025 – Present",
    status: "Live in Production",
    featured: false,
    accent: "teal",
    categories: ["Web", "Payments"],
    summary: "An enterprise agricultural operations and financial management platform rebuilt on Next.js 16 (React 19, Turbopack), Django 5.1 REST Framework, and PostgreSQL 16—automating estate agronomy, weighbridge integrity, 7-model payroll, and direct M-Pesa B2C worker payouts.",
    problem: "Commercial tea estates historically relied on paper tally books, physical weighbridge chits, and risky cash-in-transit wage payouts—causing leaf weight disputes, payroll errors, and 2–3 day disbursement delays.",
    highlights: [
      "Re-architected into a decoupled Next.js 16 (59 App Router routes, glassmorphic UI) + Django 5.1 DRF Service-Selector backend secured by HttpOnly SameSite JWT cookies.",
      "Built an agronomic sectioning engine categorizing estate blocks by tea clone (TRFK 306, Clone 31/8), slope, bush density, and digital weighbridge receipt slips with moisture/tare deductions.",
      "Engineered a dynamic 7-logic payroll engine (fixed, per-kg, threshold commissions, task bonuses, and blended models) with immutable historical rate snapshots and OpenPyXL styled Excel reports.",
      "Integrated Safaricom Daraja M-Pesa B2C SalaryPayment disbursements with idempotent asynchronous webhook handlers, cutting estate payroll turnaround to under 5 minutes.",
      "Created a Virtual Time Manipulation Engine for testing 14-day plucking intervals and payroll cycle closures, alongside an ENABLE_DEMO_MODE 1-click switcher for Owner, Manager, and Worker portals."
    ],
    challenges: [
      {
        title: "Immutable Compensation Across Changing Seasonal Rates",
        problem: "Adjusting per-kg plucking rates or daily threshold quotas mid-season can retroactively corrupt historical worker earnings in active pay cycles.",
        solution: "Built DecimalField payroll calculation services in apps.finance that freeze point-in-time rate snapshots onto each WorkerPaymentPeriod before M-Pesa B2C dispatch."
      },
      {
        title: "Multi-Tenant Daraja B2C Webhooks & Dual-Server Orchestration",
        problem: "Safaricom B2C asynchronous callbacks require unambiguous origin matching without risking cross-estate ledger collisions or duplicate payouts.",
        solution: "Decoupled thin views from pure business services (apps.mpesa), validating OriginatorConversationID idempotently before transitioning balances and auditing 30+ backend test cases."
      }
    ],
    metrics: [
      { label: "Payroll Turnaround", value: "5", prefix: "<", suffix: " min" },
      { label: "App Router Pages", value: "59", suffix: " Routes" },
      { label: "Payroll Models", value: "7", suffix: " Logics" },
      { label: "Role Portals", value: "4", suffix: "-Tier RBAC" }
    ],
    stack: [
      { group: "Frontend Web", items: ["Next.js 16.4 (Turbopack)", "React 19", "TypeScript 5", "Tailwind CSS", "Lucide"] },
      { group: "Backend API", items: ["Python 3.13", "Django 5.1.7", "DRF 3.15", "SimpleJWT (HttpOnly)", "OpenPyXL"] },
      { group: "Payments & Comms", items: ["Safaricom Daraja M-Pesa B2C", "Brevo Email API", "Virtual Time Engine"] },
      { group: "Database & Cloud", items: ["PostgreSQL 16", "Nginx SNI + Certbot", "Gunicorn", "PM2", "Oracle Cloud ARM64"] }
    ],
    links: [
      { label: "Live Production Site", href: "https://tfms.duckdns.org", kind: "live" },
      { label: "1-Click Demo Login", href: "https://tfms.duckdns.org/login", kind: "demo" },
      { label: "GitHub Repository", href: "https://github.com/softdevbrian/TFMS", kind: "repo" }
    ],
    cover: "/images/projects/tfms/cover.png",
    shots: [
      { src: "/images/projects/tfms/shot-01.png", caption: "Estate Intelligence, Recharts Yield Trend & OpenPyXL Exports", aspect: "wide" },
      { src: "/images/projects/tfms/shot-02.png", caption: "Agronomic Sectioning & Clone/Block Profiles (TRFK 306)", aspect: "wide" },
      { src: "/images/projects/tfms/shot-03.png", caption: "Estate Finance Engine & Safaricom Daraja M-Pesa B2C Integration", aspect: "wide" }
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
    featured: false,
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
    slug: "uongozi-254",
    title: "Uongozi-254 — Kenyan Civic Information & Leadership Transparency Platform",
    tagline: "Nonpartisan Kenyan civic transparency PWA covering 1,788 IEBC jurisdictions and 1,885 elective seats with privacy-preserving GPS lookup and audited editorial publishing.",
    ownership: "Partnered",
    role: "Co-Architect & Full-Stack Engineer",
    period: "2026 – Present",
    status: "Live in Production (47 Counties Covered)",
    featured: false,
    accent: "amber",
    categories: ["Web"],
    summary: "A nonpartisan Kenyan civic-transparency platform and installable Progressive Web App (Next.js 14 + Django 5.2 + PostgreSQL 16) connecting citizens with verified public records on elected leaders and constitutional mandates.",
    problem: "Determining which elected officials represent a specific Kenyan Ward, Constituency, or County—and verifying their official statutory mandates—typically requires piecing together scattered IEBC gazettes and county portals.",
    highlights: [
      "Engineered a hierarchical civic data engine covering 100% of Kenya's 47 Counties, 290 Constituencies, and 1,450 Wards (1,788 IEBC jurisdictions and 1,885 elective seats).",
      "Implemented privacy-preserving 1-tap GPS reverse-geocoding via OpenStreetMap/Nominatim to match user coordinates to IEBC boundaries without storing or logging user location.",
      "Built an audited editorial staging pipeline (ChangeProposal diffs, transactional approve/reject publishing, historical term archiving) preventing unverified scrapers from altering live records.",
      "Created a Dual-Approval Portrait Pipeline enforcing MIME/size checks, EXIF metadata stripping, SHA-256 deduplication, and independent Identity + Reuse-License approvals.",
      "Delivered ranked search across aliases and offices (/search), a live 47-county coverage dashboard (/coverage), citizen correction reporting with SSRF validation, and an installable PWA."
    ],
    challenges: [
      {
        title: "Preventing Automated Misinformation & Concurrent Incumbent Collisions",
        problem: "Unattended data scrapers or CSV ingestion scripts can overwrite verified officeholder terms or assign two concurrent leaders to a single-seat constituency.",
        solution: "Isolated all automated ingestion behind idempotent ChangeProposal staging records and transactional approve_proposal services that archive predecessor terms atomically."
      },
      {
        title: "Privacy-Preserving Electoral GPS Matching",
        problem: "Citizens want instant 'Use My Location' leader lookup without surrendering sensitive location telemetry to a public civic database.",
        solution: "Processed reverse-geocoding ephemerally against hierarchical fuzzy jurisdiction matching while guaranteeing raw GPS coordinates are never logged or persisted."
      }
    ],
    metrics: [
      { label: "IEBC Jurisdictions", value: "1788", suffix: " Verified" },
      { label: "Elective Seats", value: "1885", suffix: " Seeded" },
      { label: "Counties Covered", value: "47", suffix: "/47 (100%)" },
      { label: "Automated Tests", value: "33", suffix: "+ UI & API" }
    ],
    stack: [
      { group: "Backend & Data", items: ["Django 5.2", "DRF", "PostgreSQL 16", "drf-spectacular", "Pytest & Ruff"] },
      { group: "Frontend & PWA", items: ["Next.js 14 (App Router)", "React 18", "TypeScript", "Tailwind CSS", "Jest & RTL"] },
      { group: "Civic & Media Ops", items: ["Nominatim Reverse-Geocoding", "EXIF Stripping", "SHA-256 Portrait Pipeline"] },
      { group: "Infrastructure", items: ["Oracle Cloud ARM64", "Nginx SNI + TLS", "Gunicorn", "PM2"] }
    ],
    links: [
      { label: "Live Production Site", href: "https://uongozi254.duckdns.org", kind: "live" },
      { label: "API Docs (Swagger)", href: "https://uongozi254.duckdns.org/api/docs/", kind: "demo" }
    ],
    cover: "/images/projects/uongozi-254/cover.png",
    shots: [
      { src: "/images/projects/uongozi-254/shot-01.png", caption: "Ward-to-National Constitutional Leadership & Mandate Cards", aspect: "wide" },
      { src: "/images/projects/uongozi-254/shot-02.png", caption: "Nationwide 47-County Seat Coverage & Source Freshness Audit", aspect: "wide" },
      { src: "/images/projects/uongozi-254/shot-03.png", caption: "Ranked Civic Search Across Jurisdictions, Leaders & Offices", aspect: "wide" }
    ]
  }
]

export const getProject = (slug: string) =>
  projects.find((p) => p.slug === slug)
