'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import AnimateInView from '@/components/ui/AnimateInView'
import SplitText from '@/components/ui/SplitText'
import { fadeUp, fadeLeft, fadeRight, scaleIn, staggerContainer } from '@/lib/motionVariants'

const ThreeRings = dynamic(() => import('@/components/three/ThreeRings'), { ssr: false })

const SVC_RINGS = [
  { position: [4.2, 0.8, -1.5] as [number,number,number], rotation: [0.4, 0.5, -0.3] as [number,number,number], scale: 1.25, speedX: 0.003, speedY: 0.004, speedZ: 0.005, tubeRadius: 0.082, color1: '#00C9A7', color2: '#7B4FD8', floatAmp: 0.18, floatFreq: 0.6, phase: 0.8 },
  { position: [-3, 2, -3] as [number,number,number], rotation: [-0.6, 0.3, 0.8] as [number,number,number], scale: 1.0, speedX: -0.004, speedY: 0.005, speedZ: 0.003, tubeRadius: 0.07, color1: '#7B4FD8', color2: '#00C9A7', floatAmp: 0.2, floatFreq: 0.45, phase: 2.5 },
]

const SERVICES = [
  {
    id: 'ux-design',
    num: '01',
    name: 'UI / UX Design',
    tagline: 'Dalla ricerca al pixel. Ogni decisione visiva ha una ragione cognitiva.',
    description: `Il design non è decorazione. È la traduzione visiva di una comprensione profonda di chi usa il sistema e perché. Il nostro processo parte sempre dalla ricerca — mai dall'estetica.

Progettiamo interfacce per sistemi complessi dove la chiarezza non è un'opzione: aviazione, medicale, industriale, difesa. Ma anche prodotti digitali consumer dove l'esperienza deve essere memorabile senza essere esibizionista.`,
    what: [
      { title: 'Interaction Design', desc: 'Flussi, micro-interazioni, stati del sistema. Ogni interazione è progettata per essere intuitiva anche in condizioni di stress operativo.' },
      { title: 'Information Architecture', desc: 'Organizzazione dei contenuti e della navigazione basata su modelli mentali reali degli utenti, non su strutture organizzative interne.' },
      { title: 'Design System', desc: 'Sistemi di componenti coerenti, documentati e scalabili. Dal token di colore al comportamento del componente più complesso.' },
      { title: 'Prototyping', desc: 'Prototipi ad alta fedeltà per validare le ipotesi prima dello sviluppo. Figma, prototipi interattivi, simulazioni operative.' },
      { title: 'Visual Design', desc: 'Tipografia, colore, spaziatura. Un\'estetica che serve la funzione e comunica i valori del prodotto senza urlarli.' },
      { title: 'Responsive & Adaptive', desc: 'Design che funziona su ogni dispositivo e contesto d\'uso: desktop, mobile, control room, wearable.' },
    ],
    process: [
      { step: '01', title: 'Discovery', desc: 'Comprendiamo il problema reale, non quello dichiarato.' },
      { step: '02', title: 'Research', desc: 'Studiamo gli utenti nel loro contesto naturale.' },
      { step: '03', title: 'Define', desc: 'Sintetizziamo i finding in opportunità di design.' },
      { step: '04', title: 'Design', desc: 'Progettiamo iterativamente, validando ogni ipotesi.' },
      { step: '05', title: 'Test', desc: 'Testiamo con utenti reali, non con stakeholder.' },
      { step: '06', title: 'Deliver', desc: 'Consegniamo specifiche che gli sviluppatori amano.' },
    ],
    deliverables: ['Wireframe & User Flows', 'Design System completo', 'Prototipi Figma ad alta fedeltà', 'Specifiche per sviluppo', 'Documentazione pattern', 'Handoff annotations'],
    color: 'var(--teal)',
  },
  {
    id: 'ux-audit',
    num: '02',
    name: 'UX Audit & Research',
    tagline: 'Non intuizioni. Dati. Non opinioni. Evidenze.',
    description: `La UX Research non è un lusso — è assicurazione contro il rischio. Ogni ora investita in ricerca vi risparmia settimane di sviluppo errato e mesi di prodotto che non funziona.

Il nostro approccio alla ricerca è radicato nella tradizione accademica dei Human Factors, applicata ai contesti produttivi reali. Utilizziamo metodi qualitativi e quantitativi in combinazione, scegliendo gli strumenti in base alle domande da rispondere — non in base a ciò che è più comodo fare.`,
    what: [
      { title: 'Heuristic Evaluation', desc: 'Analisi sistematica dell\'interfaccia esistente contro principi consolidati di usabilità. Identifica i problemi prima di coinvolgere utenti reali.' },
      { title: 'Usability Testing', desc: 'Test strutturati con utenti reali, think aloud protocol, analisi comportamentale. In laboratorio o sul campo, a seconda del sistema.' },
      { title: 'Cognitive Task Analysis', desc: 'Mappatura dei processi cognitivi degli operatori. Come decidono, cosa percepiscono, dove si perdono. Fondamentale per sistemi complessi.' },
      { title: 'Eye-Tracking', desc: 'Dove guardano davvero gli utenti. Mappe di calore, percorsi visivi, aree ignorate. Dati che sorprendono sempre.' },
      { title: 'Contextual Inquiry', desc: 'Osservazione degli utenti nel loro ambiente naturale. Scopriamo ciò che non riporterebbero mai in un\'intervista.' },
      { title: 'Survey & Analytics', desc: 'SUS, UMUX, questionari validati scientificamente. Metriche quantitative che confrontano stato attuale e post-intervento.' },
    ],
    process: [
      { step: '01', title: 'Kick-off', desc: 'Definiamo le domande di ricerca che valgono davvero.' },
      { step: '02', title: 'Planning', desc: 'Scegliamo i metodi appropriati alle domande.' },
      { step: '03', title: 'Recruit', desc: 'Reclutamento rigoroso dei partecipanti giusti.' },
      { step: '04', title: 'Field', desc: 'Raccolta dati con protocolli standardizzati.' },
      { step: '05', title: 'Analysis', desc: 'Analisi qualitativa e quantitativa dei dati.' },
      { step: '06', title: 'Report', desc: 'Finding azionabili, non solo osservazioni.' },
    ],
    deliverables: ['Audit report dettagliato', 'Heuristic evaluation', 'User research report', 'Usability test recordings', 'Eye-tracking heatmaps', 'Raccomandazioni prioritizzate', 'Executive summary per stakeholder'],
    color: 'var(--purple)',
  },
  {
    id: 'ux-consultancy',
    num: '03',
    name: 'UX Consultancy',
    tagline: 'Un partner strategico, non un fornitore di deliverable.',
    description: `La consulenza UX è diversa dal design service. Non entriamo per produrre un wireframe e uscire. Entriamo per capire dove la vostra organizzazione si blocca e perché il design non sta funzionando come dovrebbe.

Lavoriamo con C-level, product team e sviluppatori per trasformare il modo in cui la UX viene integrata nel processo produttivo. Perché il problema spesso non è nell'interfaccia — è nel processo che la genera.`,
    what: [
      { title: 'UX Strategy', desc: 'Definizione della visione UX a lungo termine, allineata agli obiettivi di business e alle esigenze degli utenti. Dalla roadmap alla governance.' },
      { title: 'Design Maturity Assessment', desc: 'Valutiamo dove si trova la vostra organizzazione nel percorso verso una cultura design-centrica. E tracciamo il percorso per crescere.' },
      { title: 'Team Training & Coaching', desc: 'Workshop, mentoring e formazione per team interni. UX research, Design Thinking, Human Factors. Il sapere che resta quando usciamo.' },
      { title: 'Process Design', desc: 'Progettiamo il processo che genera buoni prodotti: sprint structure, review gates, research cadence, stakeholder management.' },
      { title: 'Certification Support', desc: 'Accompagnamento per IEC 62366 (medicale), DO-178 (aviazione), ISO 9241. Documentazione, evidence collection, audit preparation.' },
      { title: 'Fractional CDO', desc: 'Chief Design Officer a tempo parziale. Leadership creativa senza il costo di un hire senior full-time.' },
    ],
    process: [
      { step: '01', title: 'Diagnosis', desc: 'Ascoltiamo prima di prescrivere.' },
      { step: '02', title: 'Assessment', desc: 'Mappiamo processi, team e prodotti esistenti.' },
      { step: '03', title: 'Strategy', desc: 'Definiamo interventi prioritizzati per impatto.' },
      { step: '04', title: 'Execution', desc: 'Affianchiamo il team nella realizzazione.' },
      { step: '05', title: 'Transfer', desc: 'Trasferiamo competenze, non dipendenza.' },
      { step: '06', title: 'Measure', desc: 'Misuriamo i risultati con metriche concordate.' },
    ],
    deliverables: ['UX Maturity Assessment', 'Strategic roadmap 12 mesi', 'Process documentation', 'Training materials', 'Certification evidence package', 'KPI dashboard UX'],
    color: '#6BC5E8',
  },
]

export default function ServicesPage() {
  const [openService, setOpenService] = useState<string | null>('ux-design')
  const [openStep, setOpenStep] = useState<number | null>(null)

  return (
    <div style={{ background: 'var(--dark)' }}>

      {/* ─── HERO ─── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden" style={{ paddingTop: '8rem', paddingBottom: '6rem' }}>
        <div className="absolute inset-0">
          <ThreeRings configs={SVC_RINGS} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 85% at 8% 65%, rgba(10,10,10,0.93) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="relative z-10 px-[10vw] w-full">
          <AnimateInView variants={fadeUp}><p className="section-label mb-8">Servizi</p></AnimateInView>
          <SplitText
            text="Cosa facciamo, e come lo facciamo."
            tag="h1"
            once={false}
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.08,
              color: 'var(--light)',
              maxWidth: '850px',
            } as React.CSSProperties}
          />
          <AnimateInView variants={fadeUp} delay={0.35} className="mt-6">
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.85, maxWidth: '500px', fontWeight: 300 }}>
              Tre aree di expertise profondamente integrate. Non vendiamo template. Costruiamo soluzioni su misura per la complessità reale del vostro contesto.
            </p>
          </AnimateInView>
        </div>
      </section>

      {/* ─── SERVICE INTRO CARDS ─── */}
      <section style={{ background: 'var(--dark2)', padding: '6rem 10vw 0' }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5px', background: 'rgba(255,255,255,0.05)' }}
        >
          {SERVICES.map((svc) => (
            <motion.button
              key={svc.id}
              variants={fadeUp}
              onClick={() => setOpenService(svc.id)}
              whileHover={{ background: 'rgba(255,255,255,0.025)' }}
              style={{
                background: openService === svc.id ? 'rgba(0,201,167,0.04)' : 'var(--dark2)',
                padding: '3rem 2.5rem',
                textAlign: 'left',
                border: 'none',
                cursor: 'none',
                transition: 'background 0.3s',
                position: 'relative',
                overflow: 'hidden',
              }}
              data-cursor
            >
              <motion.div
                animate={{ scaleX: openService === svc.id ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${svc.color}, var(--purple))`, transformOrigin: 'left' }}
              />
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.68rem', letterSpacing: '0.2em', color: svc.color, textTransform: 'uppercase', marginBottom: '1.5rem' }}>{svc.num}</p>
              <h2 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, fontSize: '1.3rem', color: openService === svc.id ? 'var(--light)' : 'var(--muted)', marginBottom: '1rem', transition: 'color 0.3s' }}>{svc.name}</h2>
              <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.75 }}>{svc.tagline}</p>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* ─── SERVICE DETAIL ─── */}
      <section style={{ background: 'var(--dark2)', padding: '0 10vw 10rem' }}>
        <AnimatePresence mode="wait">
          {SERVICES.map((svc) => svc.id === openService && (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ paddingTop: '6rem' }}
            >
              {/* Description */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', marginBottom: '6rem' }}>
                <div>
                  <SplitText
                    text={svc.name}
                    tag="h2"
                    once={false}
                    style={{
                      fontFamily: 'var(--font-montserrat)',
                      fontWeight: 300,
                      fontSize: 'clamp(2rem, 4vw, 3rem)',
                      letterSpacing: '-0.025em',
                      lineHeight: 1.1,
                      color: 'var(--light)',
                      marginBottom: '2rem',
                    } as React.CSSProperties}
                  />
                  {svc.description.split('\n\n').map((para, i) => (
                    <p key={i} style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.9, marginBottom: '1.2rem' }}>{para.trim()}</p>
                  ))}
                </div>
                {/* Deliverables */}
                <div>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2rem' }}>Deliverable tipici</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {svc.deliverables.map((d, i) => (
                      <motion.div
                        key={d}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.9rem 1.25rem', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '0.6rem' }}
                      >
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: svc.color, flexShrink: 0 }} />
                        <span style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.88rem', color: 'rgba(240,237,232,0.7)' }}>{d}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* What's included */}
              <div style={{ marginBottom: '6rem' }}>
                <AnimateInView variants={fadeUp}>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '3rem' }}>Cosa è incluso</p>
                </AnimateInView>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)' }}
                >
                  {svc.what.map((item, i) => (
                    <motion.div
                      key={item.title}
                      variants={fadeUp}
                      whileHover={{ background: 'rgba(255,255,255,0.02)' }}
                      style={{ background: 'var(--dark2)', padding: '2.5rem 2rem', transition: 'background 0.3s', cursor: 'none', position: 'relative' }}
                    >
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, ${svc.color}40, transparent)` }} />
                      <h4 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--light)', marginBottom: '0.6rem' }}>{item.title}</h4>
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.8 }}>{item.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Process */}
              <div>
                <AnimateInView variants={fadeUp}>
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '3rem' }}>Il nostro processo</p>
                </AnimateInView>
                <div style={{ display: 'flex', gap: '0', overflowX: 'auto' }}>
                  {svc.process.map((step, i) => (
                    <motion.div
                      key={step.step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false }}
                      transition={{ delay: i * 0.09 }}
                      style={{ flex: '1', minWidth: '130px', padding: '2rem 1.5rem', borderRight: i < svc.process.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none', position: 'relative' }}
                    >
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: false }}
                        transition={{ delay: i * 0.09, duration: 0.6 }}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: svc.color, transformOrigin: 'left' }}
                      />
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.65rem', letterSpacing: '0.18em', color: svc.color, textTransform: 'uppercase', marginBottom: '0.75rem' }}>{step.step}</p>
                      <h4 style={{ fontFamily: 'var(--font-montserrat)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--light)', marginBottom: '0.5rem' }}>{step.title}</h4>
                      <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.7 }}>{step.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </section>

      {/* ─── CTA ─── */}
      <section style={{ background: 'var(--dark)', padding: '10rem 10vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, rgba(0,201,167,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <AnimateInView variants={fadeUp}><p className="section-label" style={{ justifyContent: 'center', marginBottom: '2rem' }}>Iniziamo</p></AnimateInView>
          <SplitText
            text="Parliamo del vostro sistema."
            tag="h2"
            once={false}
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              fontSize: 'clamp(2.2rem, 5vw, 4rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: 'var(--light)',
              textAlign: 'center',
            } as React.CSSProperties}
          />
          <AnimateInView variants={fadeUp} delay={0.3} className="mt-8">
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.88 }}>
              Ogni progetto inizia con una conversazione. Non un preventivo. Una conversazione vera su cosa state cercando di risolvere.
            </p>
          </AnimateInView>
          <AnimateInView variants={fadeUp} delay={0.45} className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link href="mailto:hello@octimal.com" className="btn-primary" data-cursor>
              Scrivici
              <span className="arrow-circle">→</span>
            </Link>
            <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="btn-primary" data-cursor style={{ borderColor: 'rgba(123,79,216,0.3)' }}>
              Prenota una call
              <span className="arrow-circle" style={{ background: 'var(--purple)' }}>→</span>
            </a>
          </AnimateInView>
        </div>
      </section>

    </div>
  )
}
