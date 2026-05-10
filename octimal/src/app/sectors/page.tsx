'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import AnimateInView from '@/components/ui/AnimateInView'
import SplitText from '@/components/ui/SplitText'
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer } from '@/lib/motionVariants'

const ThreeRings = dynamic(() => import('@/components/three/ThreeRings'), { ssr: false })

const SECTOR_RINGS = [
  { position: [4.5, 1.5, -2] as [number,number,number], rotation: [0.5, 0.3, -0.4] as [number,number,number], scale: 1.2, speedX: 0.004, speedY: 0.003, speedZ: 0.005, tubeRadius: 0.08, color1: '#00C9A7', color2: '#7B4FD8', floatAmp: 0.2, floatFreq: 0.55, phase: 1 },
]

const SECTORS = [
  {
    id: 'aviation',
    num: '01',
    icon: '✈',
    name: 'Aviazione & Difesa',
    tag: 'Safety-critical',
    headline: 'Dove un errore di interfaccia può costare vite.',
    body: 'Progettiamo sistemi di controllo, cockpit interfaces e HMI per ambienti ad altissima pressione operativa. Il nostro approccio Human Factors riduce gli errori latenti prima che diventino incidenti.',
    impact: [
      { metric: '−42%', label: 'Riduzione errori operativi' },
      { metric: '3.2×', label: 'Velocità di risposta operatore' },
      { metric: '98%', label: 'Task completion rate' },
    ],
    who: ['Piloti militari e civili', 'Controllori di traffico aereo', 'Operatori sistemi missione', 'Tecnici manutenzione'],
    color: 'var(--teal)',
  },
  {
    id: 'healthcare',
    num: '02',
    icon: '⊕',
    name: 'Healthcare & Medicale',
    tag: 'Alta complessità',
    headline: 'Interfacce che proteggono il paziente.',
    body: 'Dispositivi medici, software clinico, sistemi di monitoraggio. Ogni pixel è una decisione che può influenzare una diagnosi. Lavoriamo con medici, infermieri e ingegneri biomedicali per ridurre l\'errore umano in corsia.',
    impact: [
      { metric: '−61%', label: 'Errori di dosaggio rilevati' },
      { metric: '2.8×', label: 'Efficienza workflow clinico' },
      { metric: 'IEC 62366', label: 'Conformità certificativa' },
    ],
    who: ['Medici specialisti', 'Infermieri di terapia intensiva', 'Radiologi', 'Farmacisti ospedalieri'],
    color: '#E07B9A',
  },
  {
    id: 'energy',
    num: '03',
    icon: '⚡',
    name: 'Energia & Utilities',
    tag: 'Industrial HMI',
    headline: 'Control room che parlano la lingua degli operatori.',
    body: 'SCADA, DCS, sistemi di monitoraggio di impianti critici. Gli operatori in control room gestiscono decine di variabili simultaneamente. Il nostro design riduce il carico cognitivo e migliora la situational awareness.',
    impact: [
      { metric: '−38%', label: 'Tempo di anomaly detection' },
      { metric: '4.1×', label: 'Chiarezza alarming system' },
      { metric: '+67%', label: 'SA score operatori' },
    ],
    who: ['Operatori di centrale', 'Supervisori di impianto', 'Ingegneri di processo', 'Safety managers'],
    color: 'var(--purple)',
  },
  {
    id: 'transport',
    num: '04',
    icon: '◎',
    name: 'Trasporti',
    tag: 'Mobilità avanzata',
    headline: 'HMI per l\'operatore che non può permettersi distrazioni.',
    body: 'Dal controllo ferroviario all\'automotive avanzato. Progettiamo per operatori in contesti ad alta workload dove l\'attenzione è la risorsa più scarsa. Semplicità che non banalizza la complessità.',
    impact: [
      { metric: '−29%', label: 'Cognitive load misurato' },
      { metric: '99.4%', label: 'Critical alarm recognition' },
      { metric: '1.8×', label: 'Training time reduction' },
    ],
    who: ['Macchinisti ferroviari', 'Gestori rete traffico', 'Test driver ADAS', 'Dispatchers logistica'],
    color: '#6BC5E8',
  },
  {
    id: 'industry',
    num: '05',
    icon: '◈',
    name: 'Industria 4.0',
    tag: 'Automazione',
    headline: 'Dove l\'umano e la macchina devono capirsi.',
    body: 'Linee di produzione automatizzate, manutenzione AR/VR, digital twin. L\'automazione aumenta la produttività ma crea nuove sfide cognitive. Progettiamo l\'interfaccia dell\'interazione uomo-robot.',
    impact: [
      { metric: '+44%', label: 'OEE (Overall Equipment Effectiveness)' },
      { metric: '−52%', label: 'Tempo medio di guasto' },
      { metric: '3.6×', label: 'Onboarding operators' },
    ],
    who: ['Operatori di linea', 'Tecnici di manutenzione', 'Responsabili produzione', 'Quality managers'],
    color: 'var(--teal)',
  },
  {
    id: 'security',
    num: '06',
    icon: '◉',
    name: 'Sicurezza & Intelligence',
    tag: 'Mission-critical',
    headline: 'Chiarezza decisionale sotto pressione estrema.',
    body: 'Dashboard di analisi, sistemi di comando e controllo, interfacce per analisti intelligence. In questi contesti, l\'overload informativo è il nemico. Progettiamo per la decisione rapida e affidabile.',
    impact: [
      { metric: '−45%', label: 'Decision latency' },
      { metric: '2.2×', label: 'Pattern recognition speed' },
      { metric: '+88%', label: 'Analyst confidence score' },
    ],
    who: ['Analisti intelligence', 'Operatori sicurezza', 'Command & control', 'Cyber security ops'],
    color: 'var(--purple)',
  },
]

export default function SectorsPage() {
  const [activeTab, setActiveTab] = useState(0)
  const activeSector = SECTORS[activeTab]

  return (
    <div style={{ background: 'var(--dark)' }}>

      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '6rem', background: 'var(--dark)' }}>
        <div className="absolute inset-0">
          <ThreeRings configs={SECTOR_RINGS} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 85% at 10% 60%, rgba(10,10,10,0.92) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="relative z-10 px-[10vw] w-full">
          <AnimateInView variants={fadeUp}><p className="section-label mb-8">Settori</p></AnimateInView>
          <SplitText
            text="Dove opera OCTIMAL"
            tag="h1"
            once={false}
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              color: 'var(--light)',
              maxWidth: '800px',
            } as React.CSSProperties}
          />
          <AnimateInView variants={fadeUp} delay={0.35} className="mt-6">
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.85, maxWidth: '500px', fontWeight: 300 }}>
              Specializziamo la nostra metodologia per ogni dominio critico. La complessità varia, il rigore resta invariato.
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* ─── SECTOR TABS ─── */}
      <section style={{ background: 'var(--dark2)', padding: '8rem 10vw' }}>

        {/* Tab buttons */}
        <AnimateInView variants={fadeUp}>
          <div style={{ display: 'flex', gap: '0', overflowX: 'auto', borderBottom: '1px solid rgba(255,255,255,0.07)', marginBottom: '5rem', paddingBottom: '0' }}>
            {SECTORS.map((s, i) => (
              <motion.button
                key={s.id}
                onClick={() => setActiveTab(i)}
                whileHover={{ color: '#F0EDE8' }}
                style={{
                  fontFamily: 'var(--font-outfit)', fontSize: '0.82rem', letterSpacing: '0.06em',
                  textTransform: 'uppercase', background: 'none', border: 'none',
                  color: i === activeTab ? 'var(--light)' : 'var(--muted)',
                  padding: '1rem 1.5rem', cursor: 'none', whiteSpace: 'nowrap',
                  position: 'relative', transition: 'color 0.3s',
                }}
                data-cursor
              >
                {s.name}
                {i === activeTab && (
                  <motion.div
                    layoutId="sector-tab-indicator"
                    style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, var(--teal), var(--purple))' }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </AnimateInView>

        {/* Active sector content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSector.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem' }}
          >
            {/* Left */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `rgba(0,201,167,0.08)`, border: `1px solid rgba(0,201,167,0.15)`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>{activeSector.icon}</div>
                <div>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--teal)', textTransform: 'uppercase' }}>{activeSector.tag}</p>
                  <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, fontSize: '1.2rem', color: 'var(--light)' }}>{activeSector.name}</h2>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 300, fontSize: '1.5rem', color: 'var(--light)', lineHeight: 1.35, letterSpacing: '-0.015em', marginBottom: '2rem' }}>{activeSector.headline}</p>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.88 }}>{activeSector.body}</p>

              {/* Who we work with */}
              <div style={{ marginTop: '3rem' }}>
                <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }}>Con chi lavoriamo</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {activeSector.who.map((w) => (
                    <span key={w} style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.8rem', padding: '0.35rem 0.9rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2rem', color: 'rgba(240,237,232,0.6)' }}>{w}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — impact metrics */}
            <div>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2rem' }}>Impatto misurato</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {activeSector.impact.map((imp, i) => (
                  <motion.div
                    key={imp.label}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ padding: '2rem', background: 'var(--dark3)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '1rem', position: 'relative', overflow: 'hidden' }}
                  >
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100%', background: 'linear-gradient(to bottom, var(--teal), var(--purple))' }} />
                    <div style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 700, fontSize: '2.5rem', background: 'linear-gradient(135deg, var(--teal), var(--purple))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1, marginBottom: '0.4rem' }}>{imp.metric}</div>
                    <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', color: 'var(--muted)' }}>{imp.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ─── ALL SECTORS GRID ─── */}
      <section style={{ background: 'var(--dark)', padding: '10rem 10vw' }}>
        <AnimateInView variants={fadeUp}><p className="section-label mb-4">Panoramica</p></AnimateInView>
        <SplitText
          text="Sei settori critici, un metodo"
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
          viewport={{ once: false, amount: 0.08 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)' }}
        >
          {SECTORS.map((sector, i) => (
            <motion.div
              key={sector.id}
              variants={fadeUp}
              whileHover={{ background: 'rgba(255,255,255,0.02)' }}
              onClick={() => { setActiveTab(i); window.scrollTo({ top: 500, behavior: 'smooth' }) }}
              style={{ background: 'var(--dark)', padding: '3rem 2.5rem', cursor: 'none', position: 'relative', overflow: 'hidden', transition: 'background 0.3s' }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${sector.color}, var(--purple))`, transformOrigin: 'left' }}
              />
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.68rem', letterSpacing: '0.2em', color: 'var(--teal)', textTransform: 'uppercase', marginBottom: '1.5rem' }}>{sector.num}</p>
              <div style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>{sector.icon}</div>
              <h3 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, fontSize: '1.05rem', color: 'var(--light)', marginBottom: '0.75rem' }}>{sector.name}</h3>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.75 }}>{sector.body.substring(0, 120)}…</p>
              <span style={{ display: 'inline-block', marginTop: '1.5rem', fontFamily: 'var(--font-outfit)', fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: sector.color, padding: '0.28rem 0.8rem', border: `1px solid ${sector.color}40`, borderRadius: '2rem' }}>{sector.tag}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

    </div>
  )
}
