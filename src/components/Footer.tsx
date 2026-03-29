import { Disc, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'

export function Footer() {
  return (
    <footer className="relative z-10 pt-12 sm:pt-20 pb-10 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="mb-10 sm:mb-14"
          style={{
            height: '1px',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(7, 74, 79, 0.45) 25%, rgba(7, 74, 79, 0.65) 50%, rgba(7, 74, 79, 0.45) 75%, transparent 100%)',
            boxShadow: '0 0 12px rgba(7, 74, 79, 0.35)',
          }}
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img
                src="/logo-main-2.png"
                alt="INSURVAS"
                className="h-6 sm:h-7 w-auto select-none"
                draggable={false}
              />
            </div>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
              The complete engine for merit-based engineering—from proof of skill to high-growth placement.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4">
              Platform
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="/#features" className="text-white hover:text-[#5aaeb2] text-xs sm:text-sm transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#case-studies"
                  className="text-white hover:text-[#5aaeb2] text-xs sm:text-sm transition-colors"
                >
                  Results
                </a>
              </li>
              <li>
                <a href="/#faq" className="text-white hover:text-[#5aaeb2] text-xs sm:text-sm transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4">
              Legal
            </h4>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <a href="#" className="text-white hover:text-[#5aaeb2] text-xs sm:text-sm transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-[#5aaeb2] text-xs sm:text-sm transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-semibold text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4">
              Connect
            </h4>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Disc className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-[#5aaeb2]" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-[#5aaeb2]" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-[#5aaeb2]" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-[#5aaeb2]" />
              </a>
              <a
                href="#"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-white hover:text-[#5aaeb2]" />
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-6 sm:pt-8 text-center"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
          }}
        >
          <p className="text-white/80 text-xs sm:text-sm mb-2">Free to apply. Skill is the only currency.</p>
          <p className="text-white/60 text-xs sm:text-sm">© 2026 INSURVAS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
