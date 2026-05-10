'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import SplitText from '@/components/ui/SplitText'
import AnimateInView from '@/components/ui/AnimateInView'
import { fadeUp, fadeRight, staggerContainer } from '@/lib/motionVariants'

const ThreeRings = dynamic(() => import('@/components/three/ThreeRings'), { ssr: false })

const HOME_RINGS = [
  { position: [4, 1.8, -1] as [number,number,number], rotation: [-0.3, 0.2, -0.4] as [number,number,number], scale: 1.5, speedX: 0.003, speedY: 0.005, speedZ: 0.002, tubeRadius: 0.09, color1: '#00C9A7', color2: '#7B4FD8', floatAmp: 0.2, floatFreq: 0.65, phase: 0 },
  { position: [3.2, -1.5, -2.5] as [number,number,number], rotation: [-0.7, 0.9, 0.3] as [number,number,number], scale: 1.15, speedX: -0.004, speedY: 0.003, speedZ: 0.006, tubeRadius: 0.075, color1: '#7B4FD8', color2: '#00C9A7', floatAmp: 0.25, floatFreq: 0.5, phase: 2 },
  { position: [1.2, 3, -4] as [number,number,number], rotation: [1.1, -0.4, 0.6] as [number,number,number], scale: 0.85, speedX: 0.005, speedY: -0.004, speedZ: 0.003, tubeRadius: 0.06, color1: '#00C9A7', color2: '#9B6FE8', floatAmp: 0.16, floatFreq: 0.9, phase: 3.5 },
]

export default function HomeHero() {
  const ref = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: '#0A0A0A' }}
    >
      {/* Three.js rings */}
      <div className="absolute inset-0">
        <ThreeRings configs={HOME_RINGS} scrollY={scrollY} scrollInfluence={0.003} />
      </div>

      {/* Gradient vignette left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(10,10,10,0.85) 0%, transparent 70%)' }}
      />

      {/* Content */}
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="relative z-10 px-[10vw] max-w-[750px]"
      >
        {/* Eyebrow */}
        <AnimateInView variants={fadeUp} delay={0.1}>
          <p className="section-label mb-6">Human Factors & UX Engineering</p>
        </AnimateInView>

        {/* Headline */}
        <div className="mb-6">
          <SplitText
            text="Progettiamo sistemi che funzionano."
            tag="h1"
            once={false}
            delay={0.15}
            className="text-light"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontSize: 'clamp(3rem, 7.5vw, 6rem)',
              fontWeight: 300,
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
            } as React.CSSProperties}
          />
        </div>

        {/* Sub */}
        <AnimateInView variants={fadeUp} delay={0.4} className="mb-10">
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.85, maxWidth: '480px', fontWeight: 300, letterSpacing: '0.03em' }}>
            Consulenza specializzata in UX Research, Human Factors Engineering e progettazione di interfacce per sistemi complessi. Dallo studio trentino, al mondo.
          </p>
        </AnimateInView>

        {/* CTAs */}
        <AnimateInView variants={fadeUp} delay={0.55}>
          <div className="flex items-center gap-6 flex-wrap">
            <Link href="/services" className="btn-primary" data-cursor>
              Esplora i servizi
              <span className="arrow-circle">→</span>
            </Link>
            <Link
              href="/about"
              data-cursor
              style={{ color: 'var(--muted)', fontSize: '0.82rem', letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-outfit)', transition: 'color 0.3s', cursor: 'none' }}
            >
              Chi siamo ↗
            </Link>
          </div>
        </AnimateInView>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-[10vw] z-10 flex items-center gap-4"
      >
        <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
          <motion.div
            animate={{ y: ['−100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '50%', background: 'linear-gradient(to bottom, transparent, var(--teal))' }}
          />
        </div>
        <span style={{ writingMode: 'vertical-rl', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)' }}>Scroll</span>
      </motion.div>

      {/* Bottom counter line */}
      <AnimateInView
        variants={fadeUp}
        delay={0.8}
        className="absolute bottom-10 right-[10vw] z-10 flex gap-10"
      >
        {[['12+', 'Anni'], ['80+', 'Progetti'], ['6', 'Settori']].map(([n, l]) => (
          <div key={l} style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '1.6rem', background: 'linear-gradient(135deg, var(--teal), var(--purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{n}</div>
            <div style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', color: 'var(--muted)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '2px' }}>{l}</div>
          </div>
        ))}
      </AnimateInView>
    </section>
  )
}
