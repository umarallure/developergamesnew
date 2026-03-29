'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowLeft, ArrowRight, Menu, X } from 'lucide-react'

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isSchedule = pathname === '/schedule'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3 sm:py-4">
      <div className="max-w-5xl mx-auto">
        <div
          className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full"
          style={{
            background: 'rgba(20, 20, 20, 0.82)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/">
              <img
                src="/logo-main-2.png"
                alt="INSURVAS"
                className="h-7 sm:h-8 w-auto select-none"
                draggable={false}
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="/#features" className="text-white hover:text-white transition-colors text-sm">
              Features
            </Link>
            <Link href="/#case-studies" className="text-white hover:text-white transition-colors text-sm">
              Case Studies
            </Link>
            <Link href="/#faq" className="text-white hover:text-white transition-colors text-sm">
              FAQ
            </Link>
            <Link href="/#contact" className="text-white hover:text-white transition-colors text-sm">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            {isSchedule ? (
              <Link
                href="/"
                className="flex items-center gap-1.5 sm:gap-2 text-[#FFFFFF] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #074A4F 0%, #042f33 100%)',
                  boxShadow: '0 4px 20px rgba(7, 74, 79, 0.45)',
                }}
              >
                <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                Go back
              </Link>
            ) : (
              <Link
                href="/schedule"
                className="flex items-center gap-1.5 sm:gap-2 text-[#FFFFFF] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #074A4F 0%, #042f33 100%)',
                  boxShadow: '0 4px 20px rgba(7, 74, 79, 0.45)',
                }}
              >
                Get Started
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </Link>
            )}
          </div>

          <button className="md:hidden text-white p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden mt-2 rounded-2xl p-4"
            style={{
              background: 'rgba(20, 20, 20, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="space-y-1">
              <Link
                href="/#features"
                className="block text-white hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all text-sm"
              >
                Features
              </Link>
              <Link
                href="/#case-studies"
                className="block text-white hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all text-sm"
              >
                Results
              </Link>
              <Link
                href="/#faq"
                className="block text-white hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all text-sm"
              >
                FAQ
              </Link>
              <Link
                href="/#contact"
                className="block text-white hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all text-sm"
              >
                Contact
              </Link>
            </div>
            <div className="mt-4 pt-4 space-y-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              {isSchedule ? (
                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 text-[#FFFFFF] px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #074A4F 0%, #042f33 100%)',
                    boxShadow: '0 4px 20px rgba(7, 74, 79, 0.45)',
                  }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go back
                </Link>
              ) : (
                <Link
                  href="/schedule"
                  className="w-full flex items-center justify-center gap-2 text-[#FFFFFF] px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #074A4F 0%, #042f33 100%)',
                    boxShadow: '0 4px 20px rgba(7, 74, 79, 0.45)',
                  }}
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
