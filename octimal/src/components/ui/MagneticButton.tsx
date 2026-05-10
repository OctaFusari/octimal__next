'use client'
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  strength?: number
  onClick?: () => void
  href?: string
}

export default function MagneticButton({
  children,
  className = '',
  style,
  strength = 0.35,
  onClick,
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    setPos({
      x: (e.clientX - cx) * strength,
      y: (e.clientY - cy) * strength,
    })
  }

  const handleMouseLeave = () => setPos({ x: 0, y: 0 })

  const inner = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 18, mass: 0.5 }}
      className={className}
      style={{ display: 'inline-block', cursor: 'none', ...style }}
      data-cursor
    >
      {children}
    </motion.div>
  )

  if (href) {
    return <a href={href} style={{ textDecoration: 'none' }}>{inner}</a>
  }
  return inner
}
