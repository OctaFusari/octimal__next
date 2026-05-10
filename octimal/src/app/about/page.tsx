'use client'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import dynamic from 'next/dynamic'
import AnimateInView from '@/components/ui/AnimateInView'
import SplitText from '@/components/ui/SplitText'
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer } from '@/lib/motionVariants'

const ThreeRings = dynamic(() => import('@/components/three/ThreeRings'), { ssr: false })

const ABOUT_RINGS = [
  { position: [4.5, 0.5, -1.5] as [number,number,number], rotation: [0.3, 0.6, -0.2] as [number,number,number], scale: 1.3, speedX: 0.004, speedY: 0.003, speedZ: 0.005, tubeRadius: 0.08, color1: '#00C9A7', color2: '#7B4FD8', floatAmp: 0.18, floatFreq: 0.6, phase: 0.5 },
  { position: [-3.5, -1.5, -3] as [number,number,number], rotation: [-0.8, 0.4, 0.7] as [number,number,number], scale: 1.1, speedX: -0.003, speedY: 0.005, speedZ: 0.002, tubeRadius: 0.07, color1: '#7B4FD8', color2: '#00C9A7', floatAmp: 0.22, floatFreq: 0.45, phase: 2.2 },
]

const TIMELINE = [
  { year: '2011', title: 'Fondazione a Trento', body: 'Nasce OCTIMAL da un incrocio improbabile: ingegneria cognitiva, design e montagna. Il pensiero non lineare come metodo fondante.' },
  { year: '2014', title: 'Primo progetto HMI critico', body: 'Lavoriamo al redesign di un sistema di controllo per impianti industriali. Scopriamo che la complessità vera è sempre umana.' },
  { year: '2017', title: 'Espansione internazionale', body: 'I nostri metodi attraversano i confini. Progetti in Germania, Svizzera, Scandinavia. Il rigore trentino incontra scale diverse.' },
  { year: '2020', title: 'Human Factors Lab', body: 'Apriamo un laboratorio dedicato: eye-tracking, biometrics, simulazioni operative. La ricerca diventa infrastruttura.' },
  { year: '2023', title: 'Focus Africa', body: 'Una scelta consapevole. L\'Africa è dove il design può ancora ridefinire sistemi interi. Sanità, mobilità, energia. Siamo qui.' },
]

const VALUES = [
  { icon: '◈', title: 'Pensiero non lineare', body: 'Non seguiamo il brief. Seguiamo il problema. Le soluzioni migliori emergono quando si sfidano le premesse iniziali.' },
  { icon: '◎', title: 'Rigore come cura', body: 'La ricerca non è un optional. È il rispetto che dobbiamo alle persone che useranno ciò che progettiamo.' },
  { icon: '◉', title: 'Creatività sistemica', body: 'L\'estetica serve la funzione, non il portfolio. Un\'interfaccia bella che non funziona è solo rumore elegante.' },
  { icon: '◍', title: 'Radicati, aperti', body: 'Trentini nell\'anima, globali nella mente. La nostra identità alpina ci insegna che i confini non limitano — orientano.' },
]

const TEAM = [
  { initials: 'MS', name: 'Marco S.', role: 'Founder & HF Engineer', bio: 'Dottorato in Ergonomia Cognitiva. 15 anni su sistemi critici.' },
  { initials: 'AL', name: 'Anna L.', role: 'Lead UX Researcher', bio: 'Ex CNR. Specializzata in metodi etnografici e sistemi sanitari.' },
  { initials: 'FK', name: 'Fatima K.', role: 'Africa Partnerships', bio: 'Nairobi — Trento. Bridge tra mercati emergenti e rigore europeo.' },
  { initials: 'DT', name: 'Davide T.', role: 'Interaction Designer', bio: 'Premio ADI. Design di sistemi complessi come pratica artistica.' },
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
        <div className="absolute inset-0">
          <ThreeRings configs={ABOUT_RINGS} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 15% 60%, rgba(10,10,10,0.9) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 px-[10vw] w-full">
          <AnimateInView variants={fadeUp}>
            <p className="section-label mb-8">Chi siamo</p>
          </AnimateInView>
          <SplitText
            text="Un studio che pensa in modo non lineare."
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
              Nati a Trento tra le Dolomiti. Cresciuti su sistemi complessi. Orientati verso l'Africa. OCTIMAL è uno studio di design che non accetta le domande così come vengono.
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
            <AnimateInView variants={fadeUp}><p className="section-label mb-6">Il nostro approccio</p></AnimateInView>
            <SplitText
              text="Il design migliore nasce dove la creatività incontra il rigore scientifico."
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
                Non siamo una tradizionale agenzia di design. Siamo un ibrido: parte laboratorio di ricerca, parte studio creativo, parte consulenza strategica.
              </p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.9 }}>
                Il nostro pensiero non lineare non è un claim: è il metodo con cui affrontiamo ogni problema. Le domande più interessanti non hanno risposte diritte.
              </p>
              <motion.blockquote
                initial={{ opacity: 0, borderLeftColor: 'transparent' }}
                whileInView={{ opacity: 1, borderLeftColor: 'var(--teal)' }}
                viewport={{ once: false }}
                transition={{ duration: 0.8 }}
                style={{ borderLeft: '2px solid var(--teal)', paddingLeft: '1.5rem', margin: '0.5rem 0' }}
              >
                <p style={{ fontFamily: 'var(--font-montserrat)', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--light)', lineHeight: 1.6, fontWeight: 300 }}>
                  "I sistemi complessi richiedono menti che non abbiano paura della complessità."
                </p>
              </motion.blockquote>
            </div>
          </AnimateInView>
        </div>
      </section>

      {/* ─── VALUES ─── */}
      <section style={{ background: 'var(--dark)', padding: '10rem 10vw' }}>
        <AnimateInView variants={fadeUp}><p className="section-label mb-6">I nostri valori</p></AnimateInView>
        <SplitText
          text="Cosa ci muove ogni giorno"
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
        <AnimateInView variants={fadeUp}><p className="section-label mb-4">La nostra storia</p></AnimateInView>
        <SplitText
          text="Vent'anni in cinque momenti"
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

      {/* ─── TEAM ─── */}
      <section style={{ background: 'var(--dark)', padding: '10rem 10vw' }}>
        <AnimateInView variants={fadeUp}><p className="section-label mb-4">Il team</p></AnimateInView>
        <SplitText
          text="Le persone dietro OCTIMAL"
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
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}
        >
          {TEAM.map((member) => (
            <motion.div
              key={member.initials}
              variants={scaleIn}
              whileHover={{ borderColor: 'rgba(0,201,167,0.22)', y: -6 }}
              style={{ background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1.5rem', padding: '2.5rem', cursor: 'none', transition: 'border-color 0.35s, transform 0.35s' }}
            >
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, rgba(0,201,167,0.15), rgba(123,79,216,0.15))', border: '1px solid rgba(0,201,167,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '0.9rem', background: 'linear-gradient(135deg, var(--teal), var(--purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{member.initials}</span>
              </div>
              <h4 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, fontSize: '1rem', color: 'var(--light)', marginBottom: '0.3rem' }}>{member.name}</h4>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.75rem', color: 'var(--teal)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem' }}>{member.role}</p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.75 }}>{member.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── AFRICA FOCUS ─── */}
      <section style={{ background: 'var(--dark2)', padding: '10rem 10vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '50%', height: '100%', background: 'radial-gradient(ellipse at 80% 50%, rgba(0,201,167,0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center', position: 'relative', zIndex: 1 }}>
          <div>
            <AnimateInView variants={fadeUp}><p className="section-label mb-6">Focus attuale</p></AnimateInView>
            <SplitText
              text="Perché l'Africa"
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
                Perché è il continente dove il design può ancora definire sistemi interi dall'inizio. Non ottimizzare l'esistente — immaginare qualcosa di nuovo.
              </p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.9 }}>
                Lavoriamo con organizzazioni locali in Kenya, Ruanda, Ghana su sistemi sanitari, mobile banking e infrastrutture digitali. Il rigore dei metodi europei, l'umiltà di imparare da contesti radicalmente diversi.
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
              { country: 'Kenya', focus: 'Sistemi sanitari rurali', color: 'var(--teal)' },
              { country: 'Ruanda', focus: 'Mobile health & fintech', color: 'var(--purple)' },
              { country: 'Ghana', focus: 'Infrastrutture digitali', color: 'var(--teal)' },
            ].map((item) => (
              <motion.div
                key={item.country}
                variants={fadeLeft}
                whileHover={{ x: 8, borderColor: item.color }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.75rem', cursor: 'none', transition: 'border-color 0.3s, transform 0.3s' }}
              >
                <div>
                  <h4 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, fontSize: '1rem', color: 'var(--light)', marginBottom: '0.25rem' }}>{item.country}</h4>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.8rem', color: 'var(--muted)' }}>{item.focus}</p>
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
