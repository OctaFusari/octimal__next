import { Variants } from 'framer-motion'

// Fade up — triggers both on enter and re-enter (always active)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 52, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: -24, filter: 'blur(4px)', transition: { duration: 0.4, ease: [0.55, 0, 1, 0.45] } },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -40, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: 24, transition: { duration: 0.35 } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 60, filter: 'blur(4px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, x: -30, transition: { duration: 0.4 } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -60, filter: 'blur(4px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, x: 30, transition: { duration: 0.4 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
  exit: {
    transition: { staggerChildren: 0.06, staggerDirection: -1 },
  },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0 },
  },
  exit: {
    transition: { staggerChildren: 0.04, staggerDirection: -1 },
  },
}

export const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { scaleX: 0, originX: 1, transition: { duration: 0.4 } },
}

export const charReveal: Variants = {
  hidden: { opacity: 0, y: '110%' },
  visible: {
    opacity: 1, y: '0%',
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, y: '-80%', transition: { duration: 0.3 } },
}

export const cardHover = {
  rest: { scale: 1, borderColor: 'rgba(255,255,255,0.06)' },
  hover: {
    scale: 1.02,
    borderColor: 'rgba(0,201,167,0.22)',
    transition: { duration: 0.3, ease: [0.25, 1, 0.5, 1] },
  },
}

export const EASE_SPRING = { type: 'spring', stiffness: 100, damping: 20 } as const
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const
