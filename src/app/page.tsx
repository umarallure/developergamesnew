'use client'

import { useState, useEffect } from 'react'
import { 
  Sparkles, Shield, Zap, Clock, Users, ArrowRight,
  BarChart3, MapPin, Brain, FolderLock, Video,
  UserCheck, Building2, Gift, TrendingUp, Cpu,
  Target, RefreshCw, Star, Quote, ChevronDown, HelpCircle,
  Mail, MessageSquare, Phone, Send, ExternalLink,
  Twitter, Instagram, Linkedin, Youtube, Disc, Menu, X
} from 'lucide-react'

function MatrixRain() {
  useEffect(() => {
    const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement | null
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}'.split('')
    const fontSize = window.innerWidth < 768 ? 10 : 14
    let columns = Math.floor(canvas.width / fontSize)
    let drops: number[] = Array(columns).fill(0).map(() => Math.random() * -100)

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        const random = Math.random()
        
        if (random > 0.8) {
          ctx.fillStyle = '#FFD700'
        } else if (random > 0.5) {
          ctx.fillStyle = 'rgba(218, 165, 32, 0.9)'
        } else {
          ctx.fillStyle = 'rgba(168, 143, 45, 0.7)'
        }
        
        ctx.fillText(char, i * fontSize, drops[i] * fontSize)
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }, 35)

    window.addEventListener('resize', () => {
      resize()
      columns = Math.floor(canvas.width / fontSize)
      drops = Array(columns).fill(0).map(() => Math.random() * -100)
    })

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <canvas 
        id="matrix-canvas" 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #0d0d00 100%)' }}
      />
      <div className="fixed bottom-0 left-0 right-0 h-[60%] pointer-events-none z-0"
        style={{
          background: 'linear-gradient(to top, rgba(139, 115, 0, 0.15) 0%, rgba(139, 115, 0, 0.05) 30%, transparent 60%)'
        }}
      />
    </>
  )
}

function AnimatedHeading() {
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  const textLine1 = 'Close More Deals. Build'
  const textLine2 = 'Generational Wealth.'

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    let currentIndex = 0
    const delay = 80

    const typeLine1 = () => {
      if (currentIndex < textLine1.length) {
        setLine1(textLine1.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeLine1, delay)
      } else {
        setTimeout(() => typeLine2(), 200)
      }
    }

    const typeLine2 = () => {
      let line2Index = 0
      const typeChar = () => {
        if (line2Index < textLine2.length) {
          setLine2(textLine2.slice(0, line2Index + 1))
          line2Index++
          setTimeout(typeChar, delay)
        } else {
          setTimeout(() => setIsComplete(true), 500)
        }
      }
      typeChar()
    }

    setTimeout(typeLine1, 500)
  }, [])

  return (
    <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
      <span className="text-white">
        {line1}
        {!isComplete && line1.length < textLine1.length && (
          <span className={`inline-block w-[3px] h-[1em] bg-amber-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
      </span>
      <br />
      <span 
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 25%, #f59e0b 50%, #d97706 100%)',
        }}
      >
        {line2}
        {line2.length > 0 && line2.length < textLine2.length && (
          <span className={`inline-block w-[3px] h-[1em] bg-amber-400 ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
      </span>
    </h1>
  )
}

function useInViewAnimation() {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const ref = useState<{ current: HTMLElement | null }>({ current: null })[0]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shouldAnimate) {
          setShouldAnimate(true)
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [shouldAnimate])

  return { ref, shouldAnimate }
}

function AnimatedSuccessHeading() {
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const { ref, shouldAnimate } = useInViewAnimation()

  const textLine1 = 'Real Members. '
  const textLine2 = 'Real Results.'

  useEffect(() => {
    if (!shouldAnimate) return

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [shouldAnimate])

  useEffect(() => {
    if (!shouldAnimate) return

    let currentIndex = 0
    const delay = 60

    const typeLine1 = () => {
      if (currentIndex < textLine1.length) {
        setLine1(textLine1.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeLine1, delay)
      } else {
        setTimeout(() => typeLine2(), 150)
      }
    }

    const typeLine2 = () => {
      let line2Index = 0
      const typeChar = () => {
        if (line2Index < textLine2.length) {
          setLine2(textLine2.slice(0, line2Index + 1))
          line2Index++
          setTimeout(typeChar, delay)
        } else {
          setTimeout(() => setIsComplete(true), 400)
        }
      }
      typeChar()
    }

    typeLine1()
  }, [shouldAnimate])

  return (
    <h2 ref={ref as any} className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
      <span className="text-white">
        {line1}
        {shouldAnimate && line1.length > 0 && line1.length < textLine1.length && (
          <span className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-amber-400 ml-0.5 sm:ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
      </span>
      <span 
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 25%, #f59e0b 50%, #d97706 100%)',
        }}
      >
        {line2}
        {shouldAnimate && line2.length > 0 && line2.length < textLine2.length && (
          <span className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-amber-400 ml-0.5 sm:ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
        {shouldAnimate && !isComplete && line1.length >= textLine1.length && line2.length === 0 && (
          <span className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-amber-400 ml-0.5 sm:ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
      </span>
    </h2>
  )
}

function AnimatedFeaturesHeading() {
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)
  const { ref, shouldAnimate } = useInViewAnimation()

  const textLine1 = 'Everything You Need to '
  const textLine2 = 'Dominate CRE'

  useEffect(() => {
    if (!shouldAnimate) return

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [shouldAnimate])

  useEffect(() => {
    if (!shouldAnimate) return

    let currentIndex = 0
    const delay = 60

    const typeLine1 = () => {
      if (currentIndex < textLine1.length) {
        setLine1(textLine1.slice(0, currentIndex + 1))
        currentIndex++
        setTimeout(typeLine1, delay)
      } else {
        setTimeout(() => typeLine2(), 150)
      }
    }

    const typeLine2 = () => {
      let line2Index = 0
      const typeChar = () => {
        if (line2Index < textLine2.length) {
          setLine2(textLine2.slice(0, line2Index + 1))
          line2Index++
          setTimeout(typeChar, delay)
        } else {
          setTimeout(() => setIsComplete(true), 400)
        }
      }
      typeChar()
    }

    typeLine1()
  }, [shouldAnimate])

  return (
    <h2 ref={ref as any} className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
      <span className="text-white">
        {line1}
        {shouldAnimate && line1.length > 0 && line1.length < textLine1.length && (
          <span className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-amber-400 ml-0.5 sm:ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
      </span>
      <span 
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 25%, #f59e0b 50%, #d97706 100%)',
        }}
      >
        {line2}
        {shouldAnimate && line2.length > 0 && line2.length < textLine2.length && (
          <span className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-amber-400 ml-0.5 sm:ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
        {shouldAnimate && !isComplete && line1.length >= textLine1.length && line2.length === 0 && (
          <span className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-amber-400 ml-0.5 sm:ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
      </span>
    </h2>
  )
}

function FeatureCard({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div 
      className="rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%)',
        border: '1px solid rgba(251, 191, 36, 0.15)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      }}
    >
      <div 
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)',
          border: '1px solid rgba(251, 191, 36, 0.2)'
        }}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
      </div>
      <h3 className="text-white font-semibold text-base sm:text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function Features() {
  const features = [
    {
      icon: BarChart3,
      title: 'Smart Deal Pipeline',
      description: 'Track every opportunity from first contact to closing table. Stage-based workflow built for how real deals actually move.'
    },
    {
      icon: MapPin,
      title: 'Property Prospecting',
      description: 'Search any market on an interactive map. Get enriched owner contact data — up to 800 verified contacts every month.'
    },
    {
      icon: Brain,
      title: 'AI-Powered Underwriting',
      description: 'Upload rent rolls, P&Ls, and financials. Our AI parses the numbers so you can underwrite deals in minutes, not days.'
    },
    {
      icon: FolderLock,
      title: 'Secure Document Vault',
      description: 'Store, organize, and share deal documents with bank-level security. Cloud-synced and accessible from anywhere.'
    },
    {
      icon: Video,
      title: 'Daily Live Coaching',
      description: 'Join the 11AM call — live deal reviews, market analysis, and strategy sessions with top-producing dealmakers.'
    },
    {
      icon: UserCheck,
      title: 'Private Dealmaker Community',
      description: 'Network with 500+ active CRE investors, brokers, and capital partners in an exclusive members-only community.'
    },
    {
      icon: Building2,
      title: 'Investor & Lender Portals',
      description: 'Give your capital partners their own login. Share deals, documents, and updates through branded portals.'
    },
    {
      icon: Gift,
      title: 'Referral Rewards Program',
      description: 'Earn 15% recurring commission for every member you bring in. Build passive income while you build your network.'
    }
  ]

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div 
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
            <span className="text-amber-400 text-[10px] sm:text-xs font-semibold tracking-wider uppercase">Platform Features</span>
            <span className="text-amber-400/60 text-[10px] sm:text-xs hidden sm:inline">—</span>
            <span className="text-amber-400 text-[10px] sm:text-xs font-semibold">01</span>
          </div>

          <AnimatedFeaturesHeading />

          <p className="text-slate-400 text-sm sm:text-lg">
            One platform. Every tool. Zero excuses.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function SuccessCard({ 
  badge, 
  badgeColor, 
  title, 
  description, 
  stat, 
  statLabel, 
  statColor,
  topBorderColor
}: { 
  badge: string
  badgeColor: string
  title: string
  description: string
  stat: string
  statLabel: string
  statColor: string
  topBorderColor: string
}) {
  return (
    <div 
      className="rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div 
        className="h-1 w-full"
        style={{ background: topBorderColor }}
      />
      
      <div className="p-4 sm:p-6">
        <div 
          className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4"
          style={{
            background: `${badgeColor}15`,
            border: `1px solid ${badgeColor}40`
          }}
        >
          <span className="text-[10px] sm:text-xs font-semibold uppercase" style={{ color: badgeColor }}>{badge}</span>
        </div>

        <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3 leading-tight">{title}</h3>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">{description}</p>

        <div 
          className="rounded-xl p-3 sm:p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl font-bold" style={{ color: statColor }}>{stat}</span>
            <span className="text-slate-400 text-xs sm:text-sm">{statLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SuccessStories() {
  const stories = [
    {
      badge: 'DEAL PIPELINE',
      badgeColor: '#fbbf24',
      topBorderColor: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
      title: 'From 0 to 12 Closed Deals in 6 Months',
      description: 'A first-time CRE investor used Rainmakers OS to build a structured pipeline, track 47 leads, and close 12 deals totaling $8.4M in his first two quarters on the platform.',
      stat: '$8.4M',
      statLabel: 'Total Deal Volume',
      statColor: '#fbbf24'
    },
    {
      badge: 'AI UNDERWRITING',
      badgeColor: '#22d3ee',
      topBorderColor: 'linear-gradient(90deg, #22d3ee, #06b6d4)',
      title: 'Underwriting Time Cut by 80%',
      description: 'A multifamily acquisition team uploaded 200+ rent rolls in their first month. The AI parser reduced underwriting from 4 hours to 45 minutes per deal — freeing the team to focus on negotiations.',
      stat: '80%',
      statLabel: 'Time Saved Per Deal',
      statColor: '#22d3ee'
    },
    {
      badge: 'COMMUNITY',
      badgeColor: '#fbbf24',
      topBorderColor: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
      title: '$22M Joint Venture Born on the 11AM Call',
      description: 'Two Rainmaker Pro members connected during a daily coaching session, identified a 96-unit value-add opportunity, and closed a $22M JV deal — all within 90 days of meeting on the platform.',
      stat: '$22M',
      statLabel: 'JV Deal Closed',
      statColor: '#fbbf24'
    }
  ]

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div 
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}
          >
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
            <span className="text-amber-400 text-[10px] sm:text-xs font-semibold tracking-wider uppercase">Success Stories</span>
            <span className="text-amber-400/60 text-[10px] sm:text-xs hidden sm:inline">—</span>
            <span className="text-amber-400 text-[10px] sm:text-xs font-semibold">02</span>
          </div>

          <AnimatedSuccessHeading />

          <p className="text-slate-400 text-sm sm:text-lg">
            See how Rainmakers OS is helping CRE professionals close bigger deals, faster.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {stories.map((story, index) => (
            <SuccessCard 
              key={index}
              badge={story.badge}
              badgeColor={story.badgeColor}
              title={story.title}
              description={story.description}
              stat={story.stat}
              statLabel={story.statLabel}
              statColor={story.statColor}
              topBorderColor={story.topBorderColor}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatCard({ icon: Icon, stat, label }: { icon: React.ElementType, stat: string, label: string }) {
  return (
    <div 
      className="rounded-2xl p-4 sm:p-6 text-center transition-all duration-300 hover:scale-105"
      style={{
        background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%)',
        border: '1px solid rgba(251, 191, 36, 0.15)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
      }}
    >
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 mx-auto mb-2 sm:mb-4" />
      <div 
        className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2"
        style={{
          backgroundImage: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 25%, #f59e0b 50%, #d97706 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {stat}
      </div>
      <p className="text-slate-400 text-xs sm:text-sm">{label}</p>
    </div>
  )
}

function TestimonialCard({ 
  quote, 
  name, 
  role, 
  initials 
}: { 
  quote: string
  name: string
  role: string
  initials: string
}) {
  return (
    <div 
      className="rounded-2xl p-4 sm:p-6 min-w-[280px] sm:min-w-[350px] max-w-[280px] sm:max-w-[350px] flex-shrink-0 transition-all duration-300 hover:scale-[1.02]"
      style={{
        background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>

      <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400/30 mb-2 sm:mb-3" />

      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 italic">
        "{quote}"
      </p>

      <div className="flex items-center gap-2 sm:gap-3">
        <div 
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-amber-400"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%)',
            border: '1px solid rgba(251, 191, 36, 0.3)'
          }}
        >
          {initials}
        </div>
        <div>
          <p className="text-white font-semibold text-xs sm:text-sm">{name}</p>
          <p className="text-slate-500 text-[10px] sm:text-xs">{role}</p>
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  const stats = [
    { icon: Users, stat: '500+', label: 'Active Dealmakers' },
    { icon: TrendingUp, stat: '$2B+', label: 'Deal Volume Tracked' },
    { icon: Target, stat: '1,000+', label: 'Deals Managed' },
    { icon: RefreshCw, stat: '98%', label: 'Member Retention' }
  ]

  const testimonials = [
    {
      quote: 'I referred four people and the passive income from commissions already covers my subscription. No-brainer.',
      name: 'David K.',
      role: 'Investment Sales Broker',
      initials: 'DK'
    },
    {
      quote: 'The AI underwriting tool alone has saved me hundreds of hours. I can analyze a 50-unit apartment complex in under an hour now.',
      name: 'Sarah M.',
      role: 'Multifamily Syndicator',
      initials: 'SM'
    },
    {
      quote: 'Best CRE community I\'ve ever been part of. The deal flow from networking alone has paid for my membership 10x over.',
      name: 'Anthony L.',
      role: 'Commercial Broker',
      initials: 'AL'
    },
    {
      quote: 'The property prospecting tool found me an off-market warehouse deal that turned into a $1.2M flip. Game changer.',
      name: 'Rachel W.',
      role: 'Industrial Investor',
      initials: 'RW'
    },
    {
      quote: 'Rainmakers OS is the best investment I\'ve made in my CRE career. The ROI is undeniable.',
      name: 'Brian C.',
      role: 'Multifamily Investor',
      initials: 'BC'
    }
  ]

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div 
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}
          >
            <span className="text-amber-400 text-[10px] sm:text-xs font-semibold">03</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="text-white">Built for Closers. </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 25%, #f59e0b 50%, #d97706 100%)',
              }}
            >
              Backed by Results.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-10 sm:mb-16">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              icon={stat.icon}
              stat={stat.stat}
              label={stat.label}
            />
          ))}
        </div>

        <div 
          className="relative overflow-hidden"
          style={{ 
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        >
          <div className="marquee-track flex gap-4 sm:gap-6 w-max">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={`first-${index}`}
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                initials={testimonial.initials}
              />
            ))}
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={`second-${index}`}
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                initials={testimonial.initials}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQItem({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) {
  return (
    <div 
      className="rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%)',
        border: isOpen ? '1px solid rgba(251, 191, 36, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isOpen ? '0 4px 30px rgba(251, 191, 36, 0.1)' : '0 4px 30px rgba(0, 0, 0, 0.2)'
      }}
    >
      <button 
        onClick={onClick}
        className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left"
      >
        <span className={`font-semibold text-sm sm:text-base pr-4 ${isOpen ? 'text-amber-400' : 'text-white'}`}>
          {question}
        </span>
        <ChevronDown 
          className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'text-amber-400 rotate-180' : 'text-slate-400'}`}
        />
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div 
          className="px-4 sm:px-6 pb-4 sm:pb-5 ml-4 sm:ml-6 mr-4 sm:mr-6"
          style={{ borderLeft: '3px solid #f59e0b' }}
        >
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'What is Rainmakers OS?',
      answer: 'The all-in-one deal management platform built for commercial real estate professionals. Track deals, prospect properties, underwrite opportunities, and connect with capital — all from a single dashboard.'
    },
    {
      question: 'Is there really a free plan?',
      answer: 'Yes! Our Starter plan is completely free forever. It includes up to 10 active deals, basic prospecting tools, and access to the community. No credit card required to sign up.'
    },
    {
      question: 'How does property prospecting work?',
      answer: 'Our AI-powered prospecting engine scans multiple data sources to identify off-market and on-market deals in your target areas. You can filter by property type, size, price range, and more.'
    },
    {
      question: 'What are Rain Credits?',
      answer: 'Rain Credits are our usage-based credits for premium features like AI underwriting, advanced prospecting searches, and investor matching. Pro members get 500 credits monthly.'
    },
    {
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. There are no long-term contracts or cancellation fees. You can upgrade, downgrade, or cancel your subscription at any time from your account settings.'
    },
    {
      question: 'What happens on the daily coaching calls?',
      answer: 'Our daily 11AM EST coaching calls feature live deal reviews, market analysis, strategy sessions, and Q&A with experienced CRE professionals.'
    },
    {
      question: 'How does the referral program work?',
      answer: 'When you refer a new member who signs up for a paid plan, you earn 15% recurring commission for as long as they remain a subscriber. There\'s no limit to how many people you can refer.'
    },
    {
      question: 'How do I upgrade my plan?',
      answer: 'You can upgrade your plan at any time from your account settings. Upgrades take effect immediately, and you\'ll be charged a prorated amount for the remainder of your billing cycle.'
    }
  ]

  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div 
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}
          >
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
            <span className="text-amber-400 text-[10px] sm:text-xs font-semibold tracking-wider uppercase">FAQ</span>
            <span className="text-amber-400/60 text-[10px] sm:text-xs hidden sm:inline">—</span>
            <span className="text-amber-400 text-[10px] sm:text-xs font-semibold">05</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="text-white">Got Questions? </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 25%, #f59e0b 50%, #d97706 100%)',
              }}
            >
              We've Got Answers.
            </span>
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactCard({ icon: Icon, label, value, href }: { icon: React.ElementType, label: string, value: string, href?: string }) {
  return (
    <a 
      href={href || '#'}
      className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] group"
      style={{
        background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div 
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)',
          border: '1px solid rgba(251, 191, 36, 0.2)'
        }}
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-slate-400 text-[10px] sm:text-xs mb-0.5 sm:mb-1">{label}</p>
        <p className="text-white font-semibold text-xs sm:text-sm truncate">{value}</p>
      </div>
      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 group-hover:text-amber-400 transition-colors flex-shrink-0" />
    </a>
  )
}

function Contact() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div 
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)'
            }}
          >
            <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
            <span className="text-amber-400 text-[10px] sm:text-xs font-semibold tracking-wider uppercase">Get In Touch</span>
            <span className="text-amber-400/60 text-[10px] sm:text-xs hidden sm:inline">—</span>
            <span className="text-amber-400 text-[10px] sm:text-xs font-semibold">06</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="text-white">Let's </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 25%, #f59e0b 50%, #d97706 100%)',
              }}
            >
              Talk Deals.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-lg">
            Have a question or want a demo? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
            <ContactCard 
              icon={Mail}
              label="Email Us"
              value="support@rain.club"
              href="mailto:support@rain.club"
            />
            <ContactCard 
              icon={MessageSquare}
              label="Join Discord"
              value="discord.gg/rainmakers"
              href="https://discord.gg/rainmakers"
            />
            <ContactCard 
              icon={Phone}
              label="Schedule a Call"
              value="Book a 15-min demo"
              href="#"
            />
            <div 
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl"
              style={{
                background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div 
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.15) 0%, rgba(245, 158, 11, 0.08) 100%)',
                  border: '1px solid rgba(251, 191, 36, 0.2)'
                }}
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              </div>
              <div className="flex-1">
                <p className="text-slate-400 text-[10px] sm:text-xs mb-0.5 sm:mb-1">Based In</p>
                <p className="text-white font-semibold text-xs sm:text-sm">United States</p>
              </div>
            </div>
          </div>

          <div 
            className="rounded-2xl p-5 sm:p-8 order-1 lg:order-2"
            style={{
              background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-slate-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Name</label>
                <input 
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-sm sm:text-base"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Email</label>
                <input 
                  type="email"
                  placeholder="you@company.com"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all text-sm sm:text-base"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
              </div>
              <div>
                <label className="block text-slate-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Message</label>
                <textarea 
                  placeholder="Tell us about your deals..."
                  rows={4}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-none text-sm sm:text-base"
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                />
              </div>
              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 rounded-xl font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-lg text-sm sm:text-base"
                style={{
                  background: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)',
                  boxShadow: '0 0 30px rgba(251, 191, 36, 0.2)'
                }}
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(20, 20, 20, 0.9) 0%, rgba(15, 15, 15, 0.95) 100%)',
            border: '1px solid rgba(251, 191, 36, 0.2)',
            boxShadow: '0 0 60px rgba(251, 191, 36, 0.1)'
          }}
        >
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(251, 191, 36, 0.15) 0%, transparent 70%)'
            }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-white">Your Next Deal Is </span>
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 25%, #f59e0b 50%, #d97706 100%)',
                }}
              >
                Waiting.
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-lg mb-6 sm:mb-10 max-w-lg mx-auto">
              Join 500+ real estate professionals already closing more deals with Rainmakers OS.
            </p>

            <button 
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-black transition-all hover:scale-105 text-sm sm:text-base"
              style={{
                background: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)',
                boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
              }}
            >
              Start Free Today
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer 
      className="relative py-10 sm:py-16"
      style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.06)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="flex items-end gap-0.5 h-5 sm:h-6">
                <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-amber-500 rounded-full"></div>
                <div className="w-0.5 sm:w-1 h-4 sm:h-5 bg-amber-500 rounded-full"></div>
                <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-amber-500 rounded-full"></div>
                <div className="w-0.5 sm:w-1 h-5 sm:h-6 bg-amber-500 rounded-full"></div>
                <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-amber-500 rounded-full"></div>
                <div className="w-0.5 sm:w-1 h-4 sm:h-5 bg-amber-500 rounded-full"></div>
              </div>
              <span className="text-white font-semibold text-base sm:text-lg">Rainmakers</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              The all-in-one operating system for commercial real estate professionals.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4">Platform</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#features" className="text-slate-400 hover:text-amber-400 text-xs sm:text-sm transition-colors">Features</a></li>
              <li><a href="#case-studies" className="text-slate-400 hover:text-amber-400 text-xs sm:text-sm transition-colors">Case Studies</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-amber-400 text-xs sm:text-sm transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-amber-400 text-xs sm:text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-amber-400 text-xs sm:text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-semibold text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4">Connect</h4>
            <div className="flex gap-2 sm:gap-3">
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Disc className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-amber-400" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-amber-400" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-amber-400" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-amber-400" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-amber-400" />
              </a>
            </div>
          </div>
        </div>

        <div 
          className="pt-6 sm:pt-8 text-center"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          <p className="text-slate-500 text-xs sm:text-sm">
            © 2026 Rainmakers. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto">
        <div 
          className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full"
          style={{
            background: 'rgba(20, 20, 20, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-end gap-0.5 h-5 sm:h-6">
              <div className="w-0.5 sm:w-1 h-2 sm:h-3 bg-amber-500 rounded-full"></div>
              <div className="w-0.5 sm:w-1 h-4 sm:h-5 bg-amber-500 rounded-full"></div>
              <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-amber-500 rounded-full"></div>
              <div className="w-0.5 sm:w-1 h-5 sm:h-6 bg-amber-500 rounded-full"></div>
              <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-amber-500 rounded-full"></div>
              <div className="w-0.5 sm:w-1 h-4 sm:h-5 bg-amber-500 rounded-full"></div>
            </div>
            <span className="text-white font-semibold text-sm sm:text-lg">Rainmakers</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors text-sm">Features</a>
            <a href="#case-studies" className="text-slate-300 hover:text-white transition-colors text-sm">Case Studies</a>
            <a href="#faq" className="text-slate-300 hover:text-white transition-colors text-sm">FAQ</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-colors text-sm">Contact</a>
          </div>

          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            <button className="text-slate-300 hover:text-white transition-colors text-sm font-medium">
              Log In
            </button>
            <button 
              className="flex items-center gap-1.5 sm:gap-2 text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
              }}
            >
              Get Started
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          <button 
            className="md:hidden text-white p-1"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div 
            className="md:hidden mt-2 rounded-2xl p-4"
            style={{
              background: 'rgba(20, 20, 20, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="space-y-1">
              <a href="#features" className="block text-slate-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all text-sm">Features</a>
              <a href="#case-studies" className="block text-slate-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all text-sm">Case Studies</a>
              <a href="#faq" className="block text-slate-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all text-sm">FAQ</a>
              <a href="#contact" className="block text-slate-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all text-sm">Contact</a>
            </div>
            <div className="mt-4 pt-4 space-y-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <button className="w-full text-left text-slate-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all text-sm">
                Log In
              </button>
              <button 
                className="w-full flex items-center justify-center gap-2 text-black px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                }}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 sm:pt-24 pb-12 sm:pb-16">
      <MatrixRain />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div 
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 sm:mb-8"
          style={{
            background: 'rgba(251, 191, 36, 0.1)',
            border: '1px solid rgba(251, 191, 36, 0.3)',
          }}
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400" />
          <span className="text-amber-400 text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
            The #1 CRE Deal Management Platform
          </span>
        </div>

        <AnimatedHeading />

        <p className="text-sm sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed">
          The all-in-one operating system for commercial real estate
          <br className="hidden sm:block" />
          professionals — from prospecting to close.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button 
            className="group flex items-center gap-2 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all hover:scale-105 w-full sm:w-auto justify-center"
            style={{
              background: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)',
              boxShadow: '0 0 30px rgba(251, 191, 36, 0.3)'
            }}
          >
            Start Free Today
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>

        <p className="text-slate-500 text-xs sm:text-sm mb-8 sm:mb-12">
          No credit card required - Cancel anytime - Trusted by 500+ dealmakers
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-400 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
            <span>Bank-Level Security</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
            <span>AI-Powered Tools</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
            <span>Setup in 2 Minutes</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500" />
            <span>500+ Members</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="relative bg-black min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <SuccessStories />
      <Testimonials />
      <FAQ />
      <Contact />
      <CTA />
      <Footer />
    </main>
  )
}
