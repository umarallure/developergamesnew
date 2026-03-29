'use client'

import { useEffect, useRef } from 'react'

const CALENDLY_URL =
  'https://calendly.com/muhammad-u-unlimitedinsurance/new-meeting?hide_gdpr_banner=1&background_color=0a0a0a&text_color=f4f4f5&primary_color=074a4f'

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void
    }
  }
}

export function CalendlyEmbed() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const src = 'https://assets.calendly.com/assets/external/widget.js'

    function init() {
      if (window.Calendly && containerRef.current) {
        containerRef.current.innerHTML = ''
        window.Calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: containerRef.current,
        })
      }
    }

    const existing = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null
    if (existing && window.Calendly) {
      init()
    } else {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      script.onload = () => init()
      document.head.appendChild(script)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [])

  return (
    <section id="book-demo" className="relative py-8 sm:py-10 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 max-w-4xl mx-auto text-balance leading-[1.12]">
            <span className="text-white block">Book a Demo.</span>
            <span className="text-teal-luminous block mt-2 sm:mt-3">See INSURVAS in Action.</span>
          </h2>
          <p className="text-white text-sm sm:text-lg max-w-4xl mx-auto mt-4 sm:whitespace-nowrap">
            Pick a time that works for you. Our team will walk you through the platform live.
          </p>
        </div>
      </div>

      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 px-0">
        <div className="overflow-hidden rounded-none sm:rounded-lg border-y border-[rgba(7,74,79,0.4)] sm:border sm:border-[rgba(7,74,79,0.45)] bg-transparent">
          <div
            ref={containerRef}
            className="w-full"
            style={{
              minHeight: 'calc(100dvh - 14rem)',
              height: 'calc(100dvh - 14rem)',
            }}
          />
        </div>
      </div>
    </section>
  )
}
