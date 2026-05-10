import type { Metadata } from 'next'
import { Montserrat, Outfit } from 'next/font/google'
import '../styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import CustomCursor from '@/components/ui/CustomCursor'
import SmoothScroll from '@/components/ui/SmoothScroll'
import PageTransition from '@/components/ui/PageTransition'
import SiteFooter from '@/components/layout/Footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OCTIMAL — Human Factors & UX/UI Design',
  description:
    'Consulenza UX/UI, Human Factors Engineering e UX Research per sistemi complessi. Studio trentino, impatto globale.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${montserrat.variable} ${outfit.variable}`}>
      <body>
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <PageTransition>
            <main className="page-wrap">{children}</main>
          </PageTransition>
          <SiteFooter />
        </SmoothScroll>
      </body>
    </html>
  )
}
