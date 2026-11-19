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
    title: "Mobile Lead",
    org: "CBC AI Platform, Bombay Softwares · Nairobi, Kenya",
    points: [
      "Owns the mobile application layer end to end for a production AI education platform used daily by Kenyan schools — architecture, design system, state management, API integration and Play Store release engineering — co-developed with a partner engineering team (1,000+ installs).",
      "Co-developed the CBC AI Platform (cbcai.co.ke) alongside a partner team, owning the mobile application layer end to end (architecture, UI/UX, state management, API integration, release engineering, and store operations).",
      "Shipped and maintain the CBC AI Android & iOS app to production, now at 1,000+ downloads and in active daily use by Kenyan schools.",
      "Architected the app against a four-layer platform model: data collection (school workflows, hardware/IoT signals like RFID canteen payments and biometric attendance), educational intelligence (learner/teacher profiles, school knowledge graph), AI (Teacher AI, Learner AI), and measurable impact.",
      "Translated the Competency-Based Curriculum into product: competency tracking, assessment reporting, report cards, lesson plans, and schemes of work.",
    ],
  },
  {
    period: "May 2026 — Aug 2026",
    title: "ICT Attachment",
    org: "Office of the Attorney General & Department of Justice · Nairobi, Kenya",
    points: [
      "Managed the institutional ICT helpdesk for the State Law Office and Department of Justice, resolving user hardware, software, and network support requests.",
      "Configured and troubleshot local area network (LAN) and Internet infrastructure devices to maintain high departmental uptime.",
      "Administered Active Directory user accounts, group policies, and permissions on MS-Windows Server Domain.",
      "Installed and configured operating systems, endpoint antivirus protections, and user programs across staff workstations.",
      "Carried out preventive maintenance and minor repairs of ICT equipment and managed network printers.",
      "Executed institutional data backup, recovery routines, and supported digitization and data entry initiatives for public records.",
    ],
  },
  {
    period: "2024 — Present",
    title: "Full-Stack System Architect & Independent Engineer",
    org: "Production Systems Delivery (Oracle Cloud & Play Store)",
    points: [
      "Engineered TikitiPro — a high-concurrency transit & event ticketing engine using Redis SET NX + PostgreSQL SELECT FOR UPDATE locking, M-Pesa escrow handling, and <50ms offline Ed25519 QR verification.",
      "Built DukaSync — an offline-first multi-tenant retail POS & van-sales platform with RFC 9562 UUIDv7 outbox sync, deadlock-free stock locking, and simulated KRA eTIMS 4-tier VAT compliance.",
      "Co-architected Tuko Pamoja (partnered) — a multi-tenant double-entry fund accounting PWA with maker-checker workflows, ReportLab PDFs, and 247 automated tests (100% pass rate).",
      "Shipped KejaFlow (PropTech 4-bucket M-Pesa waterfall & KRA 7.5% MRI engine), Kichele (native Kotlin real-time M-Pesa SMS overlay tracker), TFMS (Next.js 16 + Django 5.1 agricultural ERP with Daraja B2C payroll), Tuko Kadi (55k+ lines Dart P2P multiplayer game), and Uongozi-254 (47-county civic transparency platform).",
    ],
  },
  {
    period: "Expected Nov 2026",
    title: "BSc Software Development",
    org: "KCA University · Nairobi, Kenya",
    points: [
      "Undergraduate software development curriculum focusing on software architecture, algorithms, distributed databases, and full-stack engineering.",
      "Combined academic studies with active Mobile Lead engineering delivery and authoring over 200,000+ lines of solo production code.",
    ],
  },
]
