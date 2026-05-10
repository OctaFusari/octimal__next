'use client'
import { motion } from 'framer-motion'
import AnimateInView from '@/components/ui/AnimateInView'
import SplitText from '@/components/ui/SplitText'
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from '@/lib/motionVariants'

const TIPS = [
  {
    num: '01',
    title: 'Cognitive Load',
    headline: '4 chunk, non 7.',
    body: 'La working memory ha una capacità di ~4 elementi. In sistemi complessi ogni elemento aggiuntivo ha un costo reale. Raggruppa, gerarchizza, elimina.',
  },
  {
    num: '02',
    title: 'Gestalt & Prossimità',
    headline: 'La distanza è grammatica.',
    body: 'Elementi vicini vengono percepiti come correlati. Raggruppare visivamente riduce il tempo di lettura fino al 35% su dashboard complesse.',
  },
  {
    num: '03',
    title: 'Error Prevention',
    headline: 'Rendi l\'errore impossibile.',
    body: 'La vera eccellenza non è gestire gli errori elegantemente — è prevenirli attraverso vincoli, affordance e feedback proattivo.',
  },
  {
    num: '04',
    title: 'Situational Awareness',
    headline: 'Modello mentale = realtà.',
    body: "Endsley's SA Model: percezione, comprensione, proiezione. Se l'interfaccia rompe anche uno di questi livelli, l'errore è già avvenuto.",
  },
]

export default function HomeTips() {
  return (
    <section
      style={{ background: 'var(--dark)', padding: '10rem 10vw', position: 'relative', overflow: 'hidden' }}
    >
      {/* subtle grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ marginBottom: '5rem', maxWidth: '560px' }}>
          <AnimateInView variants={fadeUp}>
            <p className="section-label" style={{ marginBottom: '1.5rem' }}>UX/UI Tips</p>
          </AnimateInView>
          <SplitText
            text="Principi che fanno la differenza"
            tag="h2"
            once={false}
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              color: 'var(--light)',
            } as React.CSSProperties}
          />
        </div>

        {/* Tips grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.12 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1px', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          {TIPS.map((tip, i) => (
            <motion.div
              key={tip.num}
              variants={fadeUp}
              whileHover={{ background: 'rgba(255,255,255,0.025)' }}
              style={{
                padding: '3rem 2.5rem',
                borderRight: i < TIPS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                cursor: 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--teal), var(--purple))', transformOrigin: 'left' }}
              />
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--teal)', marginBottom: '1.5rem' }}>{tip.num} — {tip.title}</p>
              <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, fontSize: '1.3rem', marginBottom: '1rem', color: 'var(--light)', lineHeight: 1.3 }}>{tip.headline}</h3>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.82 }}>{tip.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
