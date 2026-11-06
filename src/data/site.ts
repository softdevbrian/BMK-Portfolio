export const site = {
  name: "Brian Maina Kuria",
  role: "Full-Stack Product Engineer",
  location: "Nairobi, Kenya",
  emailPrimary: "softdevbriankuria@gmail.com",
  emailSecondary: "briankuriamaina@gmail.com",
  phonePrimary: "+254790408143",
  phoneSecondary: "+254716919124",
  github: "https://github.com/softdevbrian",
  cv: "/Brian_Maina_Kuria_CV.pdf",
  recommendation: "/Brian_OAG_Recomendation.pdf",
  /**
   * DOCUMENTATION SWITCH:
   * Set to `false` to hide all buttons, links, and modal triggers pointing to documentation (CV & recommendation letter).
   * Set to `true` to turn them back on.
   */
  showDocumentation: false as boolean,
  emailjs: {
    publicKey: "0hkz3VV1ycjsOVbuD",
    serviceId: "service_h90hjdq",
    templateId: "template_gnt69lf",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ],
} as const

export type SiteConfig = typeof site
