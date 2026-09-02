'use client'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import AnimateInView from '@/components/ui/AnimateInView'
import SplitText from '@/components/ui/SplitText'
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer } from '@/lib/motionVariants'
import heroBgImage from '@/styles/images/1e7b1a97-f84f-46fb-a1c6-b620b484cd0c.png'

const ThreeRings = dynamic(() => import('@/components/three/ThreeRings'), { ssr: false })

const ABOUT_RINGS = [
  { position: [4.5, 0.5, -1.5] as [number,number,number], rotation: [0.3, 0.6, -0.2] as [number,number,number], scale: 1.3, speedX: 0.004, speedY: 0.003, speedZ: 0.005, tubeRadius: 0.08, color1: '#00C9A7', color2: '#7B4FD8', floatAmp: 0.18, floatFreq: 0.6, phase: 0.5 },
  { position: [-3.5, -1.5, -3] as [number,number,number], rotation: [-0.8, 0.4, 0.7] as [number,number,number], scale: 1.1, speedX: -0.003, speedY: 0.005, speedZ: 0.002, tubeRadius: 0.07, color1: '#7B4FD8', color2: '#00C9A7', floatAmp: 0.22, floatFreq: 0.45, phase: 2.2 },
]

const TIMELINE = [
  { year: '2020', title: 'Founded in Trentino', body: 'OCTIMAL was born from a rare intersection: cognitive engineering, design, and the mountains. Non-linear thinking became the founding method.' },
  { year: '2021', title: 'First project', body: 'We started by working on little project for a local clients, using the ux to increase the quality of the interaction between them and the clients' },
  { year: '2023', title: 'Study and research', body: 'We understand the importance of rigorous research and deep study of the human factor in creating effective solutions.' },
  { year: '2025', title: 'Adding complexity', body: 'We had to navigate increasingly complex challenges as our projects grew in scope and impact.' },
  { year: '2026', title: 'World focus', body: 'A strategic choice. We want to work on a global scale to understand and be part of the world that is changing.' },
]

const VALUES = [
  { icon: '◈', title: 'Non-linear thinking', body: 'We do not follow the brief. We follow the problem. The best solutions emerge when initial assumptions are challenged.' },
  { icon: '◎', title: 'Rigor as care', body: 'Research is not optional. It is the respect we owe the people who will use what we design.' },
  { icon: '◉', title: 'Systemic creativity', body: 'Aesthetics serves function, not the portfolio. A beautiful interface that does not work is just elegant noise.' },
  { icon: '◍', title: 'Rooted, open', body: 'Rooted in Trentino, global in mindset. Our alpine identity teaches us that borders do not limit — they orient.' },
]
export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div style={{ background: 'var(--dark)' }}>

      {/* ─── HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex items-end pb-24 overflow-hidden" style={{ paddingTop: '8rem' }}>
      {/* Three.js rings */}
      <div className="absolute inset-0">
        <ThreeRings
          className="opacity-80"
          scrollY={scrollY}
          scrollInfluence={0.003}
        />
      </div>
        {/* <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 15% 60%, rgba(10,10,10,0.9) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%', backgroundImage: `url(${heroBgImage.src})`, backgroundSize: 'cover', backgroundPosition: 'right', opacity: 0.25, pointerEvents: 'none' }} />
 */}        <div style={{ position: 'absolute', inset: 0, width: '50%', background: 'linear-gradient(90deg, transparent 0%, rgba(32, 31, 31, 0.7) 100%)', pointerEvents: 'none' }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 px-[10vw] w-full">
          <AnimateInView variants={fadeUp}>
            <p className="section-label mb-8">About us</p>
          </AnimateInView>
          <SplitText
            text="A studio that thinks non-linearly."
            tag="h1"
            once={false}
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              color: 'var(--light)',
              maxWidth: '900px',
            } as React.CSSProperties}
          />
          <AnimateInView variants={fadeUp} delay={0.4} className="mt-8">
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.85, maxWidth: '520px', fontWeight: 300 }}>
              Born in Trento amidst the Dolomites. Raised on complex systems. Focused on the world. OCTIMAL is a design studio that does not accept questions as they are asked.
            </p>
          </AnimateInView>
        </motion.div>
      </section>

      {/* ─── MANIFESTO ─── */}
      <section style={{ background: 'var(--dark2)', padding: '10rem 10vw', position: 'relative', overflow: 'hidden' }}>
        <AnimateInView variants={scaleIn}>
          <div style={{ position: 'absolute', top: '50%', right: '-10vw', transform: 'translateY(-50%)', fontFamily: 'var(--font-montserrat)', fontWeight: 900, fontSize: 'clamp(8rem, 18vw, 18rem)', color: 'rgba(255,255,255,0.015)', letterSpacing: '-0.05em', pointerEvents: 'none', userSelect: 'none', lineHeight: 1 }}>
            OCT
          </div>
        </AnimateInView>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <AnimateInView variants={fadeUp}><p className="section-label mb-6">Our approach</p></AnimateInView>
            <SplitText
              text="The best design is born where creativity meets scientific rigor."
              tag="h2"
              once={false}
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 300,
                fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                color: 'var(--light)',
              } as React.CSSProperties}
            />
          </div>
          <AnimateInView variants={fadeRight}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.9 }}>
                We are not a traditional design agency. We are a hybrid: part research lab, part creative studio, part strategic consultancy.
              </p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.9 }}>
                Our non-linear thinking is not a claim: it is the method we use to tackle every problem. The most interesting questions rarely have straight answers.
              </p>
              <motion.blockquote
                initial={{ opacity: 0, borderLeftColor: 'transparent' }}
                whileInView={{ opacity: 1, borderLeftColor: 'var(--teal)' }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                style={{ borderLeft: '2px solid var(--teal)', paddingLeft: '1.5rem', margin: '0.5rem 0' }}
              >
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--light)', lineHeight: 1.6, fontWeight: 300 }}>
                  "Complex systems require minds that are not afraid of complexity."
                </p>
              </motion.blockquote>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section style={{ background: 'var(--dark)', padding: '10rem 10vw' }}>
        <AnimateInView variants={fadeUp}><p className="section-label mb-6">Our values</p></AnimateInView>
        <SplitText
          text="What drives us every day"
          tag="h2"
          once={false}
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: 'var(--light)',
            marginBottom: '5rem',
          } as React.CSSProperties}
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5px', background: 'rgba(255,255,255,0.05)' }}
        >
          {VALUES.map((v, i) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              whileHover={{ background: 'rgba(0,201,167,0.03)' }}
              style={{ background: 'var(--dark)', padding: '3.5rem 3rem', cursor: 'none', transition: 'background 0.3s' }}
            >
              <div style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.8rem', marginBottom: '1.5rem', background: 'linear-gradient(135deg, var(--teal), var(--purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{v.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--light)' }}>{v.title}</h3>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.82 }}>{v.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── TIMELINE ─── */}
      <section style={{ background: 'var(--dark2)', padding: '10rem 10vw', position: 'relative', overflow: 'hidden' }}>
        <AnimateInView variants={fadeUp}><p className="section-label mb-4">Our story</p></AnimateInView>
        <SplitText
          text="Years of expertise and experience"
          tag="h2"
          once={false}
          style={{
            fontFamily: 'var(--font-montserrat)',
            fontWeight: 300,
            fontSize: 'clamp(2rem, 4vw, 3.2rem)',
            letterSpacing: '-0.02em',
            color: 'var(--light)',
            marginBottom: '5rem',
          } as React.CSSProperties}
        />

        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'absolute', left: '100px', top: 0, bottom: 0, width: '1px', background: 'linear-gradient(to bottom, var(--teal), var(--purple))', transformOrigin: 'top' }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {TIMELINE.map((item, i) => (
              <AnimateInView key={item.year} variants={i % 2 === 0 ? fadeRight : fadeLeft} delay={0.1}>
                <motion.div
                  whileHover={{ x: 8 }}
                  transition={{ duration: 0.3 }}
                  style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '3rem', padding: '3rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)', cursor: 'none', alignItems: 'start' }}
                >
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === TIMELINE.length - 1 ? 'var(--teal)' : 'rgba(255,255,255,0.2)', position: 'absolute', right: '-5px', top: '6px', boxShadow: i === TIMELINE.length - 1 ? '0 0 16px rgba(0,201,167,0.5)' : 'none' }} />
                    <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.9rem', color: i === TIMELINE.length - 1 ? 'var(--teal)' : 'var(--muted)', letterSpacing: '0.05em' }}>{item.year}</span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, fontSize: '1.15rem', color: 'var(--light)', marginBottom: '0.6rem' }}>{item.title}</h3>
                    <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>{item.body}</p>
                  </div>
                </motion.div>
              </AnimateInView>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY WE CREATED IT ─── */}
      <section style={{ background: 'var(--dark2)', padding: '10rem 10vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'radial-gradient(ellipse at 80% 50%, rgba(0,201,167,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <AnimateInView variants={fadeUp}><p className="section-label mb-6">Why we created it</p></AnimateInView>
            <SplitText
              text="A studio built for deep creativity and complexity"
              tag="h2"
              once={false}
              style={{
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 300,
                fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                color: 'var(--light)',
                marginBottom: '2rem',
              } as React.CSSProperties}
            />
            <AnimateInView variants={fadeUp} delay={0.2}>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.9, marginBottom: '1.5rem' }}>
                There was no real studio in Trentino that combined creative curiosity, deep systems complexity, and UX/UI & factor engineering with a global outlook.
              </p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.9 }}>
                We chose to sit down and build it ourselves, so that if you want to truly embrace your product and your activity, we are the number one choice.
              </p>
            </AnimateInView>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {[
              { title: 'Creative depth', description: 'We bring a rare design eye to every system problem.', color: 'var(--teal)' },
              { title: 'Systemic rigor', description: 'We handle complexity without losing clarity.', color: 'var(--purple)' },
              { title: 'UX & Factor engineering', description: 'We build products that are useful, usable, and meaningful.', color: 'var(--teal)' },
            ].map((item) => (
              <motion.div
                key={item.title}
                variants={fadeLeft}
                whileHover={{ x: 8, borderColor: item.color }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.75rem', cursor: 'none', transition: 'border-color 0.3s, transform 0.3s' }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, fontSize: '1rem', color: 'var(--light)', marginBottom: '0.25rem' }}>{item.title}</h4>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.8rem', color: 'var(--muted)' }}>{item.description}</p>
                </div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color, flexShrink: 0, boxShadow: `0 0 12px ${item.color}` }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </div>
  )
}
