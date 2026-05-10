'use client'
import { useRef } from 'react'
import { motion, useInView, Variants } from 'framer-motion'
import { fadeUp } from '@/lib/motionVariants'

interface AnimateInViewProps {
  children: React.ReactNode
  variants?: Variants
  className?: string
  delay?: number
  threshold?: number
  /**
   * once = false → re-triggers every time the element enters the viewport,
   * both when scrolling DOWN and when scrolling UP.
   */
  once?: boolean
  as?: 'div' | 'section' | 'article' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'li' | 'ul'
}

export default function AnimateInView({
  children,
  variants = fadeUp,
  className = '',
  delay = 0,
  threshold = 0.14,
  once = false,
  as = 'div',
}: AnimateInViewProps) {
  const ref = useRef<HTMLDivElement>(null)

  // once = false means the animation resets when the element leaves the viewport
  // and re-plays when it enters again — in either scroll direction.
  const isInView = useInView(ref, { once, amount: threshold })

  const MotionTag = motion[as] as typeof motion.div

  return (
    <MotionTag
      ref={ref as React.RefObject<HTMLDivElement>}
      className={className}
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  )
}
