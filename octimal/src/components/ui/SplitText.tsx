'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface SplitTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number
  once?: boolean
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span'
}

const wordVariant = {
  hidden: { opacity: 0, y: '105%' },
  visible: (i: number) => ({
    opacity: 1,
    y: '0%',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.045,
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    y: '-80%',
    transition: {
      duration: 0.3,
      ease: [0.55, 0, 1, 0.45],
      delay: i * 0.02,
    },
  }),
}

export default function SplitText({
  text,
  className = '',
  style,
  delay = 0,
  once = false,
  tag = 'h2',
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once, amount: 0.35 })
  const words = text.split(' ')

  const Tag = tag

  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement>}
      className={className}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '0.3em',
        rowGap: '0.05em',
        overflow: 'hidden',
        ...style,
      }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            custom={i + delay / 0.045}
            variants={wordVariant}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
