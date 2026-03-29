'use client'

import { useState } from 'react'
import { MatrixRain } from '@/components/MatrixRain'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import { CalendlyEmbed } from '@/components/CalendlyEmbed'
import SignupForm from './SignupForm'

export default function SchedulePage() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <main className="relative bg-black min-h-screen">
      <MatrixRain />
      <Navigation />
      <div className="relative z-10 pt-20 sm:pt-24 px-4">
        {/* Heading at the top */}
        <div className="text-center mb-6 max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-balance leading-[1.12]">
            <span className="text-white block">Book a 15 minutes meeting with Recruiter</span>
            <span className="text-teal-400 block mt-2 sm:mt-3">See Developer games in action</span>
          </h2>
          <p className="text-white text-sm sm:text-lg mt-4 sm:whitespace-nowrap">
            Pick a time that works for you.
          </p>
        </div>

        {/* Show form first, then Calendly after submission */}
        {!formSubmitted ? (
          <div className="max-w-2xl mx-auto">
            <SignupForm onSubmit={() => setFormSubmitted(true)} />
          </div>
        ) : (
          <CalendlyEmbed />
        )}
      </div>
      <Footer />
    </main>
  )
}
