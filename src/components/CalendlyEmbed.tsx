'use client'

import { useEffect, useRef } from 'react'

const CALENDLY_URL =
  'https://calendly.com/muhammad-u-unlimitedinsurance/new-meeting?hide_gdpr_banner=1&background_color=0a0a0a&text_color=f4f4f5&primary_color=638b4b'

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
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            <span className="text-white block">Book a Demo.</span>
            <span
              className="bg-clip-text text-transparent block mt-1 sm:mt-2"
              style={{
                backgroundImage:
                  'linear-gradient(135deg, #638b4b 0%, #75a85e 25%, #5e9a52 50%, #3d6c31 100%)',
              }}
            >
              See INSURVAS in Action.
            </span>
          </h2>
          <p className="text-white text-sm sm:text-lg max-w-4xl mx-auto mt-4 sm:whitespace-nowrap">
            Pick a time that works for you. Our team will walk you through the platform live.
          </p>
        </div>
      </div>

      <div className="relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 px-0">
        <div className="overflow-hidden rounded-none sm:rounded-lg border-y border-[rgba(99,139,75,0.35)] sm:border sm:border-[rgba(99,139,75,0.4)] bg-transparent">
          <div
            ref={containerRef}
            className="calendly-inline-widget w-full"
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
