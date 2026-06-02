'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/about', label: 'Who is octimal?', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" /><path d="M14 13.12c0 2.38 0 6.38-1 8.88" /><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" /><path d="M2 12a10 10 0 0 1 18-6" /><path d="M2 16h.01" /><path d="M21.8 16c.2-2 .131-5.354 0-6" /><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" /><path d="M8.65 22c.21-.66.45-1.32.57-2" /><path d="M9 6.8a6 6 0 0 1 9 5.2v2" /></svg>) },
  { href: '/sectors', label: 'Sectors', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="m12 8 6-3-6-3v10" /><path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12" /><path d="m6.49 12.85 11.02 6.3" /><path d="M17.51 12.85 6.5 19.15" /></svg>) },
  { href: '/services', label: 'Services', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 3V2" /><path d="m15.4 17.4 3.2-2.8a2 2 0 1 1 2.8 2.9l-3.6 3.3c-.7.8-1.7 1.2-2.8 1.2h-4c-1.1 0-2.1-.4-2.8-1.2l-1.302-1.464A1 1 0 0 0 6.151 19H5" /><path d="M2 14h12a2 2 0 0 1 0 4h-2" /><path d="M4 10h16" /><path d="M5 10a7 7 0 0 1 14 0" /><path d="M5 14v6a1 1 0 0 1-1 1H2" /></svg>) },
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
          <svg width="120" height="18" viewBox="0 0 120 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.69284 18C6.91346 18 5.37079 17.6721 4.06482 17.0164C2.77518 16.3607 1.77122 15.459 1.05294 14.3115C0.350979 13.1475 0 11.8115 0 10.3033C0 8.77869 0.261193 7.39344 0.78358 6.14754C1.32229 4.88525 2.07322 3.79508 3.03637 2.87705C3.99952 1.95902 5.14224 1.2541 6.46453 0.762294C7.78682 0.254098 9.23155 0 10.7987 0C12.5781 0 14.1126 0.327869 15.4022 0.983606C16.7082 1.63934 17.7122 2.54918 18.4141 3.71312C19.1324 4.86066 19.4915 6.18852 19.4915 7.69672C19.4915 9.22131 19.2222 10.6148 18.6835 11.877C18.1611 13.123 17.4183 14.2049 16.4552 15.123C15.492 16.041 14.3493 16.7541 13.027 17.2623C11.7047 17.7541 10.26 18 8.69284 18ZM9.18258 13.3033C9.90086 13.3033 10.5294 13.1639 11.0681 12.8852C11.6231 12.6066 12.0965 12.2213 12.4883 11.7295C12.8801 11.2377 13.1739 10.6803 13.3698 10.0574C13.5657 9.41803 13.6637 8.7459 13.6637 8.04098C13.6637 7.36885 13.5249 6.78689 13.2474 6.29508C12.9862 5.78688 12.6026 5.39344 12.0965 5.11475C11.6068 4.83607 11.0109 4.69672 10.309 4.69672C9.60702 4.69672 8.97852 4.83607 8.42348 5.11475C7.86845 5.39344 7.39503 5.77869 7.00324 6.27049C6.61145 6.76229 6.31761 7.32787 6.12172 7.96721C5.92582 8.59016 5.82787 9.2541 5.82787 9.95902C5.82787 10.6148 5.95847 11.1967 6.21966 11.7049C6.49718 12.2131 6.88081 12.6066 7.37055 12.8852C7.87661 13.1639 8.48062 13.3033 9.18258 13.3033Z" fill="white" />
            <path d="M29.5472 18C27.7842 18 26.2415 17.6803 24.9192 17.041C23.5969 16.3852 22.5685 15.4836 21.8339 14.3361C21.1156 13.1721 20.7564 11.8279 20.7564 10.3033C20.7564 8.79508 21.0176 7.40984 21.54 6.14754C22.0787 4.88525 22.8297 3.79508 23.7928 2.87705C24.756 1.95902 25.8987 1.2541 27.221 0.762294C28.5433 0.254098 29.9962 0 31.5796 0C33.2284 0 34.6895 0.295082 35.9628 0.885246C37.2361 1.47541 38.1829 2.32787 38.8033 3.44262L34.6405 6.71311C34.2814 6.07377 33.8161 5.58197 33.2447 5.2377C32.6734 4.87705 31.9959 4.69672 31.2123 4.69672C30.5267 4.69672 29.8982 4.82787 29.3269 5.09016C28.7718 5.33607 28.2902 5.69672 27.8821 6.17213C27.474 6.63115 27.1557 7.18033 26.9271 7.81967C26.6986 8.45902 26.5843 9.16393 26.5843 9.93443C26.5843 10.6066 26.7312 11.1967 27.0251 11.7049C27.3189 12.2131 27.727 12.6066 28.2494 12.8852C28.7881 13.1639 29.4085 13.3033 30.1104 13.3033C30.7797 13.3033 31.4327 13.1475 32.0694 12.8361C32.7224 12.5246 33.3427 12.0164 33.9304 11.3115L37.3341 14.582C36.2893 15.8607 35.1221 16.7541 33.8324 17.2623C32.5591 17.7541 31.1307 18 29.5472 18Z" fill="white" />
            <path d="M41.6256 17.6066L44.1477 4.89344H39.1279L40.0339 0.393442H55.8524L54.9464 4.89344H49.9266L47.4045 17.6066H41.6256Z" fill="white" />
            <path d="M53.9253 17.6066L57.3534 0.393442H63.1323L59.7041 17.6066H53.9253Z" fill="white" />
            <path d="M62.4861 17.6066L65.9143 0.393442H70.6157L75.1948 11.6311H72.6971L81.5124 0.393442H86.4342L83.0551 17.6066H77.7904L79.5779 8.36066L80.4105 8.31147L74.4847 16.0574H71.938L68.6078 8.28689L69.5873 8.36066L67.7508 17.6066H62.4861Z" fill="white" />
            <path d="M83.988 17.6066L94.9092 0.393442H100.59L104.655 17.6066H98.9005L96.1335 3.07377H98.3863L90.0853 17.6066H83.988ZM89.0323 14.6066L91.3341 10.4262H99.2189L99.8555 14.6066H89.0323Z" fill="white" />
            <path d="M105.577 17.6066L109.005 0.393442H114.784L112.262 13.1066H120L119.094 17.6066H105.577Z" fill="white" />
          </svg>


        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map(({ href, label, icon }) => {
            const active = pathname === href
            return (
              <li
                key={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                {icon}

                <Link
                  href={href}
                  style={{
                    cursor: 'none',
                    fontFamily: 'var(--font-outfit)',
                    fontSize: '0.82rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    position: 'relative',
                    color: active ? '#F0EDE8' : '#6B6B65',
                    transition: 'color 0.3s',
                  }}
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
                      style={{
                        position: 'absolute',
                        bottom: '-5px',
                        left: 0,
                        right: 0,
                        height: '1px',
                        background: 'var(--teal)',
                      }}
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
            Contact us
            
              <span className="arrow-circle">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" 
                  fill="currentColor"><path d="M630-444H227.98q-15.29 0-25.64-10.29Q192-464.58 192-479.79t10.34-25.71q10.35-10.5 25.64-10.5H630L453.79-692.21Q443-703 443-717.5t11-25.98Q465-754 479.5-754t25.31 10.82L742.6-505.09q5.4 5.41 7.9 11.72 2.5 6.31 2.5 13.53 0 7.21-2.5 13.53Q748-460 743-455L505-217q-11 11-25 10.5t-25-11.02q-11-11.48-11-26.15 0-14.66 11-25.33l175-175Z"/></svg>
              </span>
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
