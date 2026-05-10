'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimateInView from '@/components/ui/AnimateInView'
import { fadeUp, staggerContainer } from '@/lib/motionVariants'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'Chi siamo' },
  { href: '/sectors', label: 'Settori' },
  { href: '/services', label: 'Servizi' },
  { href: '/tips', label: 'UX Tips' },
]

const CONTACT_LINKS = [
  { href: 'mailto:hello@octimal.com', label: 'hello@octimal.com' },
  { href: 'https://linkedin.com', label: 'LinkedIn ↗' },
  { href: '#', label: 'Prenota una call ↗' },
]

const SOCIAL = ['LI', 'TW', 'BE']

export default function SiteFooter() {
  return (
    <footer
      id="contact"
      style={{
        background: '#111111',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '6rem 10vw 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* subtle radial glow */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '700px',
          height: '300px',
          background:
            'radial-gradient(ellipse at 50% 100%, rgba(0,201,167,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Top: big tagline */}
        <AnimateInView variants={fadeUp} className="mb-16">
          <p
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 300,
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              color: 'rgba(240,237,232,0.12)',
              marginBottom: '0.5rem',
            }}
          >
            Progettiamo sistemi
          </p>
          <p
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              background: 'linear-gradient(90deg, #00C9A7, #7B4FD8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            che funzionano.
          </p>
        </AnimateInView>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '4rem',
            marginBottom: '4rem',
          }}
        >
          {/* Brand column */}
          <motion.div variants={fadeUp}>
            <motion.span
              whileHover={{ letterSpacing: '0.24em' }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-montserrat)',
                fontWeight: 800,
                fontSize: '1.1rem',
                letterSpacing: '0.16em',
                background: 'linear-gradient(90deg, #00C9A7, #7B4FD8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.2rem',
                cursor: 'none',
              }}
            >
              OCTIMAL
            </motion.span>
            <p
              style={{
                fontFamily: 'var(--font-outfit)',
                fontSize: '0.85rem',
                color: '#6B6B65',
                lineHeight: 1.85,
                maxWidth: '280px',
                marginBottom: '2rem',
              }}
            >
              Human Factors Engineering e UX/UI Design per sistemi complessi ad alto impatto.
              Trento → Mondo → Africa.
            </p>
            {/* Social dots */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {SOCIAL.map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  whileHover={{ scale: 1.1, borderColor: '#00C9A7' }}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-outfit)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.05em',
                    color: '#6B6B65',
                    textDecoration: 'none',
                    cursor: 'none',
                    transition: 'border-color 0.3s, color 0.3s',
                  }}
                  data-cursor
                >
                  {s}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Nav links */}
          <motion.div variants={fadeUp}>
            <h5
              style={{
                fontFamily: 'var(--font-outfit)',
                fontSize: '0.68rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#6B6B65',
                marginBottom: '1.5rem',
              }}
            >
              Pagine
            </h5>
            {NAV_LINKS.map(({ href, label }) => (
              <motion.div key={href} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link
                  href={href}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-outfit)',
                    color: 'rgba(240,237,232,0.45)',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    marginBottom: '0.7rem',
                    transition: 'color 0.3s',
                    cursor: 'none',
                  }}
                  data-cursor
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact links */}
          <motion.div variants={fadeUp}>
            <h5
              style={{
                fontFamily: 'var(--font-outfit)',
                fontSize: '0.68rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#6B6B65',
                marginBottom: '1.5rem',
              }}
            >
              Contatti
            </h5>
            {CONTACT_LINKS.map(({ href, label }) => (
              <motion.div key={href} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <a
                  href={href}
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-outfit)',
                    color: 'rgba(240,237,232,0.45)',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    marginBottom: '0.7rem',
                    transition: 'color 0.3s',
                    cursor: 'none',
                  }}
                  data-cursor
                >
                  {label}
                </a>
              </motion.div>
            ))}
          </motion.div>

          {/* Newsletter / CTA */}
          <motion.div variants={fadeUp}>
            <h5
              style={{
                fontFamily: 'var(--font-outfit)',
                fontSize: '0.68rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: '#6B6B65',
                marginBottom: '1.5rem',
              }}
            >
              Newsletter
            </h5>
            <p
              style={{
                fontFamily: 'var(--font-outfit)',
                fontSize: '0.82rem',
                color: '#6B6B65',
                lineHeight: 1.75,
                marginBottom: '1.2rem',
              }}
            >
              UX Tips, case study e insight su sistemi complessi ogni due settimane.
            </p>
            <div
              style={{
                display: 'flex',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
                overflow: 'hidden',
              }}
            >
              <input
                type="email"
                placeholder="La tua email"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  padding: '0.7rem 1rem',
                  fontFamily: 'var(--font-outfit)',
                  fontSize: '0.8rem',
                  color: '#F0EDE8',
                }}
              />
              <motion.button
                whileHover={{ background: '#00b896' }}
                style={{
                  background: '#00C9A7',
                  border: 'none',
                  padding: '0 1rem',
                  color: '#0A0A0A',
                  fontFamily: 'var(--font-outfit)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'none',
                  transition: 'background 0.3s',
                }}
                data-cursor
              >
                →
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), rgba(255,255,255,0.06), transparent)',
            marginBottom: '2rem',
          }}
        />

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-outfit)',
              fontSize: '0.75rem',
              color: '#6B6B65',
            }}
          >
            © {new Date().getFullYear()} OCTIMAL S.r.l. — P.IVA IT02345678901 — Trento, Italia
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {['Privacy Policy', 'Cookie Policy', 'Termini'].map((item) => (
              <a
                key={item}
                href="#"
                style={{
                  fontFamily: 'var(--font-outfit)',
                  fontSize: '0.75rem',
                  color: '#6B6B65',
                  textDecoration: 'none',
                  cursor: 'none',
                  transition: 'color 0.3s',
                }}
                data-cursor
              >
                {item}
              </a>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-outfit)', fontSize: '0.75rem', color: '#6B6B65' }}>
            Made with{' '}
            <span style={{ color: '#00C9A7' }}>♥</span> and rigor
          </p>
        </div>
      </div>
    </footer>
  )
}
