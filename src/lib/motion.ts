import type { Transition, Variants } from "motion/react"

export const EASING = [0.22, 0.61, 0.36, 1] as const
export const EASING_CSS = "cubic-bezier(0.22, 0.61, 0.36, 1)"

export const defaultTransition: Transition = {
  duration: 0.7,
  ease: EASING,
}

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: defaultTransition,
  },
}

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: defaultTransition,
  },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: defaultTransition,
  },
}

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: defaultTransition,
  },
}
