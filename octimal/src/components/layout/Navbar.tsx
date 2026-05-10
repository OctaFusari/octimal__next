'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/about', label: 'Chi siamo' },
  { href: '/sectors', label: 'Settori' },
  { href: '/services', label: 'Servizi' },
  { href: '/#tips', label: 'UX Tips' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-5 flex items-center justify-between"
        style={{
          background: scrolled ? 'rgba(10,10,10,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
          transition: 'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
        }}
      >
        {/* Logo */}
        <Link href="/" className="relative z-10" style={{ cursor: 'none' }}>
          <motion.span
            whileHover={{ letterSpacing: '0.22em' }}
            transition={{ duration: 0.3 }}
            className="gradient-text"
            style={{
              fontFamily: 'var(--font-montserrat)',
              fontWeight: 800,
              fontSize: '1.05rem',
              letterSpacing: '0.16em',
              display: 'block',
            }}
          >
            OCTIMAL
          </motion.span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map(({ href, label }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  style={{ cursor: 'none', fontFamily: 'var(--font-outfit)', fontSize: '0.82rem', letterSpacing: '0.06em', textTransform: 'uppercase', textDecoration: 'none', position: 'relative', color: active ? '#F0EDE8' : '#6B6B65', transition: 'color 0.3s' }}
                  data-cursor
                >
                  <motion.span
                    whileHover={{ color: '#F0EDE8' }}
                    style={{ display: 'block' }}
                  >
                    {label}
                  </motion.span>
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      style={{ position: 'absolute', bottom: '-5px', left: 0, right: 0, height: '1px', background: 'var(--teal)' }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="mailto:hello@octimal.com"
            className="btn-primary"
            style={{ padding: '0.5rem 1.4rem', fontSize: '0.78rem' }}
            data-cursor
          >
            Contattaci
            <span className="arrow-circle" style={{ width: '24px', height: '24px', fontSize: '0.75rem' }}>→</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          style={{ cursor: 'none', background: 'none', border: 'none' }}
          data-cursor
        >
          <motion.span animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }} style={{ display: 'block', width: 22, height: 1, background: '#F0EDE8', transformOrigin: 'center' }} />
          <motion.span animate={{ opacity: menuOpen ? 0 : 1 }} style={{ display: 'block', width: 16, height: 1, background: '#F0EDE8' }} />
          <motion.span animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }} style={{ display: 'block', width: 22, height: 1, background: '#F0EDE8', transformOrigin: 'center' }} />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(30px)' }}
          >
            {links.map(({ href, label }, i) => (
              <motion.div
                key={href}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{ display: 'block', fontFamily: 'var(--font-montserrat)', fontSize: '2.5rem', fontWeight: 700, color: '#6B6B65', textDecoration: 'none', padding: '0.5rem 0', letterSpacing: '-0.02em', cursor: 'none' }}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
