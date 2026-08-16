"use client"

export function AuroraBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none select-none transition-opacity duration-500"
    >
      {/* Conic subtle gradient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vh] opacity-20 dark:mix-blend-screen animate-conic-slow will-change-transform"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, rgba(45, 212, 191, 0.08) 0deg, rgba(86, 183, 240, 0.05) 120deg, rgba(167, 139, 250, 0.08) 240deg, rgba(45, 212, 191, 0.08) 360deg)",
          filter: "blur(80px)",
        }}
      />

      {/* Blob 1: Teal */}
      <div
        className="absolute top-[10%] left-[15%] w-[550px] h-[550px] rounded-full bg-[var(--teal)] opacity-[0.08] dark:opacity-[0.14] filter blur-[110px] animate-aurora-1 will-change-transform"
      />

      {/* Blob 2: Sky */}
      <div
        className="absolute top-[40%] right-[10%] w-[650px] h-[650px] rounded-full bg-[var(--sky)] opacity-[0.06] dark:opacity-[0.12] filter blur-[130px] animate-aurora-2 will-change-transform"
      />

      {/* Blob 3: Violet */}
      <div
        className="absolute bottom-[5%] left-[30%] w-[600px] h-[600px] rounded-full bg-[var(--violet)] opacity-[0.06] dark:opacity-[0.12] filter blur-[120px] animate-aurora-3 will-change-transform"
      />
    </div>
  )
}
