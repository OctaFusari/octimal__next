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
            'radial-gradient(ellipse at 50% 100%, #007e6d1e 0%, transparent 70%)',
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
              background: 'linear-gradient(90deg, #007E6D, #FF00E5)',
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
              transition={{ duration: 0.3 }}
              style={{
                display: 'inline-block',
                marginBottom: '1.2rem',
                cursor: 'none',
              }}
            >
              <svg width="120" height="18" viewBox="0 0 120 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.69284 18C6.91346 18 5.37079 17.6721 4.06482 17.0164C2.77518 16.3607 1.77122 15.459 1.05294 14.3115C0.350979 13.1475 0 11.8115 0 10.3033C0 8.77869 0.261193 7.39344 0.78358 6.14754C1.32229 4.88525 2.07322 3.79508 3.03637 2.87705C3.99952 1.95902 5.14224 1.2541 6.46453 0.762294C7.78682 0.254098 9.23155 0 10.7987 0C12.5781 0 14.1126 0.327869 15.4022 0.983606C16.7082 1.63934 17.7122 2.54918 18.4141 3.71312C19.1324 4.86066 19.4915 6.18852 19.4915 7.69672C19.4915 9.22131 19.2222 10.6148 18.6835 11.877C18.1611 13.123 17.4183 14.2049 16.4552 15.123C15.492 16.041 14.3493 16.7541 13.027 17.2623C11.7047 17.7541 10.26 18 8.69284 18ZM9.18258 13.3033C9.90086 13.3033 10.5294 13.1639 11.0681 12.8852C11.6231 12.6066 12.0965 12.2213 12.4883 11.7295C12.8801 11.2377 13.1739 10.6803 13.3698 10.0574C13.5657 9.41803 13.6637 8.7459 13.6637 8.04098C13.6637 7.36885 13.5249 6.78689 13.2474 6.29508C12.9862 5.78688 12.6026 5.39344 12.0965 5.11475C11.6068 4.83607 11.0109 4.69672 10.309 4.69672C9.60702 4.69672 8.97852 4.83607 8.42348 5.11475C7.86845 5.39344 7.39503 5.77869 7.00324 6.27049C6.61145 6.76229 6.31761 7.32787 6.12172 7.96721C5.92582 8.59016 5.82787 9.2541 5.82787 9.95902C5.82787 10.6148 5.95847 11.1967 6.21966 11.7049C6.49718 12.2131 6.88081 12.6066 7.37055 12.8852C7.87661 13.1639 8.48062 13.3033 9.18258 13.3033Z" fill="white"/>
<path d="M29.5472 18C27.7842 18 26.2415 17.6803 24.9192 17.041C23.5969 16.3852 22.5685 15.4836 21.8339 14.3361C21.1156 13.1721 20.7564 11.8279 20.7564 10.3033C20.7564 8.79508 21.0176 7.40984 21.54 6.14754C22.0787 4.88525 22.8297 3.79508 23.7928 2.87705C24.756 1.95902 25.8987 1.2541 27.221 0.762294C28.5433 0.254098 29.9962 0 31.5796 0C33.2284 0 34.6895 0.295082 35.9628 0.885246C37.2361 1.47541 38.1829 2.32787 38.8033 3.44262L34.6405 6.71311C34.2814 6.07377 33.8161 5.58197 33.2447 5.2377C32.6734 4.87705 31.9959 4.69672 31.2123 4.69672C30.5267 4.69672 29.8982 4.82787 29.3269 5.09016C28.7718 5.33607 28.2902 5.69672 27.8821 6.17213C27.474 6.63115 27.1557 7.18033 26.9271 7.81967C26.6986 8.45902 26.5843 9.16393 26.5843 9.93443C26.5843 10.6066 26.7312 11.1967 27.0251 11.7049C27.3189 12.2131 27.727 12.6066 28.2494 12.8852C28.7881 13.1639 29.4085 13.3033 30.1104 13.3033C30.7797 13.3033 31.4327 13.1475 32.0694 12.8361C32.7224 12.5246 33.3427 12.0164 33.9304 11.3115L37.3341 14.582C36.2893 15.8607 35.1221 16.7541 33.8324 17.2623C32.5591 17.7541 31.1307 18 29.5472 18Z" fill="white"/>
<path d="M41.6256 17.6066L44.1477 4.89344H39.1279L40.0339 0.393442H55.8524L54.9464 4.89344H49.9266L47.4045 17.6066H41.6256Z" fill="white"/>
<path d="M53.9253 17.6066L57.3534 0.393442H63.1323L59.7041 17.6066H53.9253Z" fill="white"/>
<path d="M62.4861 17.6066L65.9143 0.393442H70.6157L75.1948 11.6311H72.6971L81.5124 0.393442H86.4342L83.0551 17.6066H77.7904L79.5779 8.36066L80.4105 8.31147L74.4847 16.0574H71.938L68.6078 8.28689L69.5873 8.36066L67.7508 17.6066H62.4861Z" fill="white"/>
<path d="M83.988 17.6066L94.9092 0.393442H100.59L104.655 17.6066H98.9005L96.1335 3.07377H98.3863L90.0853 17.6066H83.988ZM89.0323 14.6066L91.3341 10.4262H99.2189L99.8555 14.6066H89.0323Z" fill="white"/>
<path d="M105.577 17.6066L109.005 0.393442H114.784L112.262 13.1066H120L119.094 17.6066H105.577Z" fill="white"/>
</svg>
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
                  whileHover={{ scale: 1.1, borderColor: '#007E6D' }}
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
                whileHover={{ background: '#007E6D' }}
                style={{
                  background: '#007E6D',
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
              'linear-gradient(90deg, transparent, #007E6D, #007E6D, transparent)',
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
            If you reading this we will offer you a coffee on our first meeting{' '}
            <span style={{ color: '#007E6D' }}>♥</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
