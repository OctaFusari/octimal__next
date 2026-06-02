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
  { position: [4.2, 0.8, -1.5] as [number,number,number], rotation: [0.4, 0.5, -0.3] as [number,number,number], scale: 1.25, speedX: 0.003, speedY: 0.004, speedZ: 0.005, tubeRadius: 0.082, color1: '#00C9A7', color2: '#7B4FD8', floatAmp: 0.18, floatFreq: 0.6, phase: 0.8, bakeRotX: 0, bakeRotY: 0, bakeRotZ: 0, radius: 1.5 },
  { position: [-3, 2, -3] as [number,number,number], rotation: [-0.6, 0.3, 0.8] as [number,number,number], scale: 1.0, speedX: -0.004, speedY: 0.005, speedZ: 0.003, tubeRadius: 0.07, color1: '#7B4FD8', color2: '#00C9A7', floatAmp: 0.2, floatFreq: 0.45, phase: 2.5, bakeRotX: 0, bakeRotY: 0, bakeRotZ: 0, radius: 1.5 },
]

const SERVICES = [
  {
    id: 'ux-design',
    num: '01',
    name: 'UI / UX Design',
    tagline: 'From research to pixels. Every visual decision has a cognitive reason.',
    description: `Design is not decoration. It is the visual translation of a deep understanding of who uses the system and why. Our process always starts from research — never aesthetics.

We design interfaces for complex systems where clarity is not optional: aviation, medical, industrial, defense. And also consumer digital products where the experience must be memorable without being showy.`,
    what: [
      { title: 'Interaction Design', desc: 'Flows, micro-interactions, system states. Every interaction is designed to be intuitive even under operational stress.' },
      { title: 'Information Architecture', desc: 'Organizing content and navigation based on real user mental models, not internal organizational structures.' },
      { title: 'Design System', desc: 'Coherent, documented, scalable component systems. From color tokens to the behavior of the most complex component.' },
      { title: 'Prototyping', desc: 'High-fidelity prototypes to validate hypotheses before development. Figma, interactive prototypes, operational simulations.' },
      { title: 'Visual Design', desc: 'Typography, color, spacing. An aesthetic that serves function and communicates product values without shouting.' },
      { title: 'Responsive & Adaptive', desc: 'Design that works across every device and usage context: desktop, mobile, control room, wearable.' },
    ],
    process: [
      { step: '01', title: 'Discovery', desc: 'We understand the real problem, not the stated one.' },
      { step: '02', title: 'Research', desc: 'We study users in their natural context.' },
      { step: '03', title: 'Define', desc: 'We synthesize findings into design opportunities.' },
      { step: '04', title: 'Design', desc: 'We design iteratively, validating every hypothesis.' },
      { step: '05', title: 'Test', desc: 'We test with real users, not stakeholders.' },
      { step: '06', title: 'Deliver', desc: 'We hand over specifications developers love.' },
    ],
    deliverables: ['Wireframes & user flows', 'Complete design system', 'High-fidelity Figma prototypes', 'Development-ready specs', 'Pattern documentation', 'Handoff annotations'],
    color: 'var(--teal)',
  },
  {
    id: 'ux-audit',
    num: '02',
    name: 'UX Audit & Research',
    tagline: 'Not insights. Data. Not opinions. Evidence.',
    description: `UX research is not a luxury — it is insurance against risk. Every hour invested in research saves weeks of wrong development and months of a product that does not work.

Our research approach is rooted in the academic tradition of Human Factors, applied to real production contexts. We use qualitative and quantitative methods together, choosing tools based on the questions to answer — not on what is easiest to do.`,
    what: [
      { title: 'Heuristic Evaluation', desc: 'A systematic review of the existing interface against established usability principles. It identifies issues before bringing in real users.' },
      { title: 'Usability Testing', desc: 'Structured tests with real users, think-aloud protocol, behavioral analysis. In the lab or in the field, depending on the system.' },
      { title: 'Cognitive Task Analysis', desc: 'Mapping operators’ cognitive processes. How they decide, what they perceive, where they get lost. Essential for complex systems.' },
      { title: 'Eye-Tracking', desc: 'Where users actually look. Heatmaps, gaze paths, ignored areas. Data that always surprises.' },
      { title: 'Contextual Inquiry', desc: 'Observing users in their natural environment. We discover what they would never report in an interview.' },
      { title: 'Survey & Analytics', desc: 'SUS, UMUX, scientifically validated questionnaires. Quantitative metrics that compare current state and post-intervention.' },
    ],
    process: [
      { step: '01', title: 'Kick-off', desc: 'We define the research questions that really matter.' },
      { step: '02', title: 'Planning', desc: 'We choose the methods appropriate to the questions.' },
      { step: '03', title: 'Recruit', desc: 'Rigorous recruitment of the right participants.' },
      { step: '04', title: 'Field', desc: 'Data collection with standardized protocols.' },
      { step: '05', title: 'Analysis', desc: 'Qualitative and quantitative data analysis.' },
      { step: '06', title: 'Report', desc: 'Actionable findings, not just observations.' },
    ],
    deliverables: ['Detailed audit report', 'Heuristic evaluation', 'User research report', 'Usability test recordings', 'Eye-tracking heatmaps', 'Prioritized recommendations', 'Executive summary for stakeholders'],
    color: 'var(--purple)',
  },
  {
    id: 'ux-consultancy',
    num: '03',
    name: 'UX Consultancy',
    tagline: 'A strategic partner, not a deliverables vendor.',
    description: `UX consultancy is different from design service. We do not come in to produce a wireframe and leave. We come in to understand where your organization is stuck and why design is not working as it should.

We work with C-level executives, product teams, and developers to transform how UX is integrated into production. Because the problem is often not in the interface — it is in the process that creates it.`,
    what: [
      { title: 'UX Strategy', desc: 'Defining long-term UX vision aligned with business goals and user needs. From roadmap to governance.' },
      { title: 'Design Maturity Assessment', desc: 'We assess where your organization stands on the path to a design-led culture. Then we map the growth path.' },
      { title: 'Team Training & Coaching', desc: 'Workshops, mentoring, and training for internal teams. UX research, design thinking, human factors. Knowledge that stays after we leave.' },
      { title: 'Process Design', desc: 'We design the process that generates great products: sprint structure, review gates, research cadence, stakeholder management.' },
      { title: 'Certification Support', desc: 'Support for IEC 62366 (medical), DO-178 (aviation), ISO 9241. Documentation, evidence collection, audit preparation.' },
      { title: 'Fractional CDO', desc: 'Chief Design Officer on a part-time basis. Creative leadership without the cost of a senior full-time hire.' },
    ],
    process: [
      { step: '01', title: 'Diagnosis', desc: 'We listen before prescribing.' },
      { step: '02', title: 'Assessment', desc: 'We map existing processes, teams, and products.' },
      { step: '03', title: 'Strategy', desc: 'We define prioritized interventions for impact.' },
      { step: '04', title: 'Execution', desc: 'We support the team during implementation.' },
      { step: '05', title: 'Transfer', desc: 'We transfer skills, not dependency.' },
      { step: '06', title: 'Measure', desc: 'We measure results with agreed-upon metrics.' },
    ],
    deliverables: ['UX maturity assessment', '12-month strategic roadmap', 'Process documentation', 'Training materials', 'Certification evidence package', 'UX KPI dashboard'],
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
       {/* Three.js rings */}
      <div className="absolute inset-0">
        <ThreeRings
          className="opacity-80"
          scrollY={scrollY}
          scrollInfluence={0.003}
        />
      </div>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 85% at 8% 65%, rgba(10,10,10,0.93) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="relative z-10 px-[10vw] w-full">
          <AnimateInView variants={fadeUp}><p className="section-label mb-8">Services</p></AnimateInView>
          <SplitText
            text="What we do, and how we do it."
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
              Three deeply integrated areas of expertise. We don't sell templates. We build bespoke solutions for the real complexity of your context.
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
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '2rem' }}>Typical deliverables</p>
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
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '3rem' }}>What's included</p>
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
                  <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '3rem' }}>Our process</p>
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
          <AnimateInView variants={fadeUp}><p className="section-label" style={{ justifyContent: 'center', marginBottom: '2rem' }}>Let's start</p></AnimateInView>
          <SplitText
            text="Let's talk about your system."
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
              Every project starts with a real conversation, not a quote. A clear talk about what you're trying to solve.
            </p>
          </AnimateInView>
          <AnimateInView variants={fadeUp} delay={0.45} className="mt-10 flex justify-center gap-4 flex-wrap">
            <Link href="mailto:hello@octimal.com" className="btn-primary" data-cursor>
              Email us
                            <span className="arrow-circle">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" 
                  fill="currentColor"><path d="M630-444H227.98q-15.29 0-25.64-10.29Q192-464.58 192-479.79t10.34-25.71q10.35-10.5 25.64-10.5H630L453.79-692.21Q443-703 443-717.5t11-25.98Q465-754 479.5-754t25.31 10.82L742.6-505.09q5.4 5.41 7.9 11.72 2.5 6.31 2.5 13.53 0 7.21-2.5 13.53Q748-460 743-455L505-217q-11 11-25 10.5t-25-11.02q-11-11.48-11-26.15 0-14.66 11-25.33l175-175Z"/></svg>
              </span>
            </Link>
            <a href="https://cal.com" target="_blank" rel="noopener noreferrer" className="btn-primary" data-cursor style={{ borderColor: 'rgba(123,79,216,0.3)' }}>
              Book a call
                            <span className="arrow-circle">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" 
                  fill="currentColor"><path d="M630-444H227.98q-15.29 0-25.64-10.29Q192-464.58 192-479.79t10.34-25.71q10.35-10.5 25.64-10.5H630L453.79-692.21Q443-703 443-717.5t11-25.98Q465-754 479.5-754t25.31 10.82L742.6-505.09q5.4 5.41 7.9 11.72 2.5 6.31 2.5 13.53 0 7.21-2.5 13.53Q748-460 743-455L505-217q-11 11-25 10.5t-25-11.02q-11-11.48-11-26.15 0-14.66 11-25.33l175-175Z"/></svg>
              </span>
            </a>
          </AnimateInView>
        </div>
      </section>

    </div>
  )
}
