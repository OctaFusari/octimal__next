'use client'
import { useState, useEffect } from 'react'

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return scrollY
}

export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down'>('down')
  const [prevY, setPrevY] = useState(0)

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY
      setDirection(y > prevY ? 'down' : 'up')
      setPrevY(y)
    }
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [prevY])

  return direction
}
