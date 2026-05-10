'use client'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

interface CountUpProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  style?: React.CSSProperties
  className?: string
  once?: boolean
}

export default function CountUp({
  end,
  duration = 1.8,
  prefix = '',
  suffix = '',
  style,
  className = '',
  once = false,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once, amount: 0.5 })
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!isInView) { setValue(0); return }
    const start = performance.now()
    const animate = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      // ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setValue(Math.round(eased * end))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isInView, end, duration])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{value}{suffix}
    </span>
  )
}
