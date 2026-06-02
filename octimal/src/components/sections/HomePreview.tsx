'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import AnimateInView from '@/components/ui/AnimateInView'
import SplitText from '@/components/ui/SplitText'
import { fadeUp, fadeLeft, fadeRight, staggerContainer } from '@/lib/motionVariants'

const SERVICES_PREVIEW = [
  { num: '01', name: 'UX Research', desc: 'Field studies, contextual inquiry, usability testing on real systems.' },
  { num: '02', name: 'Human Factors Engineering', desc: 'Cognitive workload, error analysis, SHERPA, and formal methods.' },
  { num: '03', name: 'UX/UI Design', desc: 'From research to the pixel. Design systems for complex products.' },
  { num: '04', name: 'UX Audit & Consultancy', desc: 'In-depth audits, UX roadmaps, and certification support.' },
]

const INDUSTRIES = [
  { short: 'Banking & Fintech',   full: 'Banking, Insurance & Fintech',    focus: false },
  { short: 'Retail & e-commerce', full: 'Retail & e-commerce',             focus: false },
  { short: 'Energy & Utilities',  full: 'Energy & Utilities',              focus: false },
  { short: 'Travel & Mobility',   full: 'Travel, Mobility & Hospitality',  focus: false },
  { short: 'Edtech & Cultura',    full: 'Edtech & Cultura',                focus: false },
  { short: 'Manufacturing',         full: 'Manufacturing industry',        focus: true  },
  { short: 'Agri & Environment',     full: 'Agricolture and Environment',          focus: true  },
]

const MARQUEE_ITEMS = ['Ergonomics', 'UX Research', 'Interface Design', 'Complex Systems', 'Accessibility', 'Cognitive Engineering', 'Testing', 'Prototyping', 'Think different', 'Design for good']

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
                <p className="section-label" style={{ marginBottom: '1.5rem' }}>What we do</p>
              </AnimateInView>
              <SplitText
                text="Services that transform complexity into clarity"
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
                We don't sell deliverables. We build understanding. Every project begins with a question: what are people really trying to do?
              </p>
              <Link href="/services" className="btn-primary" style={{ alignSelf: 'flex-start' }} data-cursor>
                Our services
              <span className="arrow-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
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
                >
              <span className="arrow-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span></motion.span>
              </motion.div>
            ))}
            <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
          </motion.div>
        </div>
      </section>
      
            {/* ─── Industries flower ─── */}
      <section style={{ background: 'var(--dark)', padding: '10rem 10vw', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,201,167,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
 
        <div style={{ position: 'relative', zIndex: 1 }}>
 
          {/* Flower — fixed-size container, centred */}
          <div style={{ position: 'relative', width: '580px', height: '580px', margin: '0 auto' }}>
 
            {/* Faint orbit ring */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '450px', height: '450px', borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.04)',
              pointerEvents: 'none',
            }} />
 
            {/* ── Center circle: positioning via div, animation via motion.div ── */}
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '216px', height: '216px', borderRadius: '50%',
                  border: '1px solid rgba(0,201,167,0.22)',
                  background: 'radial-gradient(circle, rgba(0,201,167,0.08) 0%, transparent 75%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: '1.2rem',
                }}
              >
                <h2 style={{
                  fontFamily: 'var(--font-montserrat)',
                  fontWeight: 300,
                  fontSize: '1.25rem',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.35,
                  color: 'var(--light)',
                  textAlign: 'center',
                }}>
                  Where you can find us
                </h2>
              </motion.div>
            </div>
 
            {/* ── Petal circles: outer div positions, inner motion.div animates ── */}
            {INDUSTRIES.map((ind, i) => {
              const angle  = (i / INDUSTRIES.length) * 2 * Math.PI - Math.PI / 2
              const radius = 212
              const cx     = Math.cos(angle) * radius
              const cy     = Math.sin(angle) * radius
 
              return (
                // Outer div: handles ONLY position — Framer Motion never touches this transform
                <div
                  key={ind.full}
                  style={{
                    position: 'absolute',
                    top:  `calc(50% + ${cy}px)`,
                    left: `calc(50% + ${cx}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* Inner motion.div: handles ONLY opacity + scale animation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.1 }}
                    style={{
                      width: '124px', height: '124px', borderRadius: '50%',
                      border: ind.focus
                        ? '1px solid rgba(0,201,167,0.35)'
                        : '1px solid rgba(255,255,255,0.07)',
                      background: ind.focus
                        ? 'radial-gradient(circle, rgba(0,201,167,0.08) 0%, transparent 75%)'
                        : 'rgba(255,255,255,0.015)',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      padding: '1rem',
                      cursor: 'default',
                    }}
                  >
                    {ind.focus && (
                      <span style={{
                        fontFamily: 'var(--font-outfit)',
                        fontSize: '0.48rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--teal)',
                        marginBottom: '0.3rem',
                      }}>
                        focus
                      </span>
                    )}
                    <span style={{
                      fontFamily: 'var(--font-outfit)',
                      fontSize: '0.65rem',
                      fontWeight: ind.focus ? 400 : 300,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: ind.focus ? 'var(--light)' : 'var(--muted)',
                      lineHeight: 1.45,
                      textAlign: 'center',
                    }}>
                      {ind.short}
                    </span>
                  </motion.div>
                </div>
              )
            })}
          </div>
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
            <p className="section-label" style={{ justifyContent: 'center', marginBottom: '2rem' }}>Current focus</p>
          </AnimateInView>
          <SplitText
            text="A Trentino studio with a view on the world"
            tag="h2"
            once={false}
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: 'var(--light)',
              justifyContent: 'center'
            } as React.CSSProperties}
          />
          <AnimateInView variants={fadeUp} delay={0.3} className="mt-8">
            <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '1rem', color: 'var(--muted)', lineHeight: 1.88, maxWidth: '600px', margin: '0 auto' }}>
              Born in the Dolomites, we operate on a global scale. Today, our focus is you! We want to make a difference in industry, efficiency, healthcare, and digital infrastructure. Where design truly makes a difference.
            </p>
          </AnimateInView>
          <AnimateInView variants={fadeUp} delay={0.45} className="mt-10 flex justify-center">
            <Link href="/about" className="btn-primary" data-cursor>
              Our story
              
              <span className="arrow-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </Link>
          </AnimateInView>
        </div>
      </section>
    </>
  )
}
