'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimateInView from '@/components/ui/AnimateInView'
import SplitText from '@/components/ui/SplitText'
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from '@/lib/motionVariants'

const SERVICES_PREVIEW = [
  { num: '01', name: 'UX Research', desc: 'Field studies, contextual inquiry, usability testing su sistemi reali.' },
  { num: '02', name: 'Human Factors Engineering', desc: 'Cognitive workload, analisi degli errori, SHERPA e metodi formali.' },
  { num: '03', name: 'UX/UI Design', desc: 'Dalla ricerca al pixel. Design system per prodotti complessi.' },
  { num: '04', name: 'UX Audit & Consultancy', desc: 'Audit approfonditi, roadmap UX, accompagnamento certificazioni.' },
]

const MARQUEE_ITEMS = ['Human Factors', 'UX Research', 'Interface Design', 'Sistemi Complessi', 'Africa', 'Cognitive Engineering', 'HMI Design', 'UX Audit', 'Trento']

export default function HomePreview() {
  return (
    <>
      {/* ─── Marquee ─── */}
      <div style={{ background: 'var(--dark2)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', padding: '1.2rem 0' }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: '4rem', whiteSpace: 'nowrap', width: 'max-content' }}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '4rem' }}>
              <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--muted)' }}>{item}</span>
              <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--teal)', flexShrink: 0 }} />
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── Services preview ─── */}
      <section style={{ background: 'var(--dark2)', padding: '10rem 10vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start', marginBottom: '5rem' }}>
            <div>
              <AnimateInView variants={fadeUp}>
                <p className="section-label" style={{ marginBottom: '1.5rem' }}>Cosa facciamo</p>
              </AnimateInView>
              <SplitText
                text="Servizi che trasformano la complessità in chiarezza"
                tag="h2"
                once={false}
                style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 300,
                  fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.18,
                  color: 'var(--light)',
                } as React.CSSProperties}
              />
            </div>
            <AnimateInView variants={fadeRight} className="flex flex-col justify-end">
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: '2rem' }}>
                Non vendiamo deliverable. Costruiamo comprensione. Ogni progetto inizia con una domanda: cosa stanno davvero cercando di fare le persone?
              </p>
              <Link href="/services" className="btn-primary" style={{ alignSelf: 'flex-start' }} data-cursor>
                Tutti i servizi
                <span className="arrow-circle">→</span>
              </Link>
            </AnimateInView>
          </div>

          {/* Services list */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {SERVICES_PREVIEW.map((svc, i) => (
              <motion.div
                key={svc.num}
                variants={fadeUp}
                whileHover={{ paddingLeft: '1.5rem', borderColor: 'rgba(0,201,167,0.15)' }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr 2fr 40px',
                  alignItems: 'center',
                  gap: '2rem',
                  padding: '2rem 0',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'none',
                  transition: 'padding 0.35s ease, border-color 0.35s',
                }}
              >
                <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', letterSpacing: '0.15em', color: 'var(--muted)' }}>{svc.num}</span>
                <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 500, fontSize: '1.15rem', color: 'var(--light)' }}>{svc.name}</h3>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7 }}>{svc.desc}</p>
                <motion.span
                  whileHover={{ x: 4 }}
                  style={{ color: 'var(--teal)', fontSize: '1.1rem', justifySelf: 'end' }}
                >→</motion.span>
              </motion.div>
            ))}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
          </motion.div>
        </div>
      </section>

      {/* ─── Africa callout ─── */}
      <section style={{ background: 'var(--dark)', padding: '8rem 10vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,201,167,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <AnimateInView variants={fadeUp}>
            <p className="section-label" style={{ justifyContent: 'center', marginBottom: '2rem' }}>Focus attuale</p>
          </AnimateInView>
          <SplitText
            text="Un studio trentino con lo sguardo sull'Africa"
            tag="h2"
            once={false}
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: 'var(--light)',
              textAlign: 'center',
            } as React.CSSProperties}
          />
          <AnimateInView variants={fadeUp} delay={0.3} className="mt-8">
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.88, maxWidth: '600px', margin: '0 auto' }}>
              Nati tra le Dolomiti, operiamo su scala globale. Oggi il nostro focus si concentra sull'Africa: mercati emergenti, sistemi sanitari, infrastrutture digitali. Dove il design fa davvero la differenza.
            </p>
          </AnimateInView>
          <AnimateInView variants={fadeUp} delay={0.45} className="mt-10 flex justify-center">
            <Link href="/about" className="btn-primary" data-cursor>
              La nostra storia
              <span className="arrow-circle">→</span>
            </Link>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
