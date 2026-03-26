'use client'

import { MatrixRain } from '@/components/MatrixRain'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { CalendlyEmbed } from '@/components/CalendlyEmbed'

export default function SchedulePage() {
  return (
    <main className="relative bg-black min-h-screen">
      <MatrixRain />
      <Navigation />
      <div className="relative z-10 pt-20 sm:pt-24">
        <CalendlyEmbed />
      </div>
      <Footer />
    </main>
  )
}
