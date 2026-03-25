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
          ctx.fillStyle = '#638b4b'
        } else if (random > 0.5) {
          ctx.fillStyle = 'rgba(99, 139, 75, 0.9)'
        } else {
          ctx.fillStyle = 'rgba(99, 139, 75, 0.7)'
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
          background: 'linear-gradient(to top, rgba(99, 139, 75, 0.15) 0%, rgba(99, 139, 75, 0.05) 30%, transparent 60%)'
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

  const textLine1 = 'Close More Policies.'
  const textLine2 = 'Scale Your Insurance Business.'

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
          <span className={`inline-block w-[3px] h-[1em] bg-[#638b4b] ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
      </span>
      <br />
      <span 
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, #638b4b 0%, #75a85e 25%, #5e9a52 50%, #3d6c31 100%)',
        }}
      >
        {line2}
        {line2.length > 0 && line2.length < textLine2.length && (
          <span className={`inline-block w-[3px] h-[1em] bg-[#638b4b] ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
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

  const textLine1 = 'Real Agents. Real Policies.'
  const textLine2 = 'Real Revenue.'

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
          <span className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-[#638b4b] ml-0.5 sm:ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
      </span>
      <span 
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, #638b4b 0%, #75a85e 25%, #5e9a52 50%, #3d6c31 100%)',
        }}
      >
        {line2}
        {shouldAnimate && line2.length > 0 && line2.length < textLine2.length && (
          <span className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-[#638b4b] ml-0.5 sm:ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
        {shouldAnimate && !isComplete && line1.length >= textLine1.length && line2.length === 0 && (
          <span className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-[#638b4b] ml-0.5 sm:ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
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

  const textLine1 = 'Everything You Need to Scale'
  const textLine2 = 'Insurance.'

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
          <span className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-[#638b4b] ml-0.5 sm:ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
      </span>
      <span 
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(135deg, #638b4b 0%, #75a85e 25%, #5e9a52 50%, #3d6c31 100%)',
        }}
      >
        {line2}
        {shouldAnimate && line2.length > 0 && line2.length < textLine2.length && (
          <span className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-[#638b4b] ml-0.5 sm:ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
        )}
        {shouldAnimate && !isComplete && line1.length >= textLine1.length && line2.length === 0 && (
          <span className={`inline-block w-[2px] sm:w-[3px] h-[0.9em] bg-[#638b4b] ml-0.5 sm:ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} align-middle`}></span>
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
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.09) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 14px 55px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)'
      }}
    >
      <div 
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 139, 75, 0.16) 0%, rgba(99, 139, 75, 0.08) 100%)',
          border: '1px solid rgba(99, 139, 75, 0.28)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.10)'
        }}
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#638b4b]" />
      </div>
      <h3 className="text-white font-semibold text-base sm:text-lg mb-2">{title}</h3>
      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function Features() {
  const features = [
    {
      icon: Cpu,
      title: 'Smart Lead Pipeline',
      description: 'Track, manage, and prioritize every lead in one centralized system built for insurance workflows. Never lose an opportunity - move prospects seamlessly from inquiry to closed policy.'
    },
    {
      icon: Target,
      title: 'Targeted Lead Distribution',
      description: 'Route leads based on agent licensing, performance, and availability in real time. Ensure the right agent gets the right opportunity - maximizing conversions and speed.'
    },
    {
      icon: Cpu,
      title: 'AI Lead Qualification',
      description: 'Automatically filter and qualify leads based on intent, eligibility, and data signals. Focus only on high-quality prospects that are ready to convert into policies.'
    },
    {
      icon: Shield,
      title: 'Secure Client Data & Applications',
      description: 'Store and manage sensitive client information with enterprise-grade security and compliance. Access applications, documents, and records anytime - all in one protected environment.'
    },
    {
      icon: Phone,
      title: 'Live Transfer System',
      description: 'Connect agents instantly with high-intent prospects through real-time live calls. Eliminate delays and increase close rates by engaging leads at peak interest.'
    },
    {
      icon: Building2,
      title: 'Agent & Publisher Network',
      description: 'Collaborate across a unified ecosystem of agents, agencies, and publishers. Expand your reach and scale faster with a built-in distribution and partner network.'
    },
    {
      icon: RefreshCw,
      title: 'Real-Time Lead Routing',
      description: 'Automatically distribute incoming leads with intelligent routing logic. Reduce response time and ensure no lead goes unassigned or untouched.'
    },
    {
      icon: BarChart3,
      title: 'Publisher Payout System',
      description: 'Track performance, commissions, and payouts with complete transparency. Give publishers a seamless experience while scaling your lead generation engine.'
    }
  ]

  return (
    <section id="features" className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div 
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 10px 35px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)'
            }}
          >
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#638b4b]" />
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">PLATFORM FEATURES</span>
            <span className="text-[#638b4b]/60 text-[10px] sm:text-xs hidden sm:inline">-</span>
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold">01</span>
          </div>

          <AnimatedFeaturesHeading />

          <p className="text-slate-400 text-sm sm:text-lg">
            One platform. Total control over your leads, agents, and growth.
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
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.09) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 14px 55px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)'
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
            background: 'rgba(0, 0, 0, 0.22)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12)'
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
      badge: 'VOLUME',
      badgeColor: '#638b4b',
      topBorderColor: 'linear-gradient(90deg, #638b4b, #3d6c31)',
      title: 'High-intent leads routed in real time to agents and agencies across the network.',
      description: 'Consistent volume that fuels predictable and scalable growth.',
      stat: '10,000+',
      statLabel: 'Leads Delivered Monthly',
      statColor: '#638b4b'
    },
    {
      badge: 'PERFORMANCE',
      badgeColor: '#638b4b',
      topBorderColor: 'linear-gradient(90deg, #638b4b, #3d6c31)',
      title: 'Connect with prospects instantly through live transfers and smart routing.',
      description: 'Close more policies by engaging leads at peak intent.',
      stat: '2X',
      statLabel: 'Faster Response & Higher Conversions',
      statColor: '#638b4b'
    },
    {
      badge: 'REVENUE',
      badgeColor: '#638b4b',
      topBorderColor: 'linear-gradient(90deg, #638b4b, #3d6c31)',
      title: 'Agents and agencies are scaling revenue with a system built for performance.',
      description: 'Turn lead flow into consistent policy growth and long-term income.',
      stat: 'Millions',
      statLabel: 'Premium Generated Across the Platform',
      statColor: '#638b4b'
    }
  ]

  return (
    <section id="case-studies" className="relative py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div 
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 10px 35px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)'
            }}
          >
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-[#638b4b]" />
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">PROVEN PERFORMANCE</span>
            <span className="text-[#638b4b]/60 text-[10px] sm:text-xs hidden sm:inline">-</span>
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold">02</span>
          </div>

          <AnimatedSuccessHeading />

          <p className="text-slate-400 text-sm sm:text-lg">
            See how agents and agencies are closing faster, scaling smarter, and growing consistently with INSURVAS.
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
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.09) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 14px 55px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)'
      }}
    >
      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#638b4b] mx-auto mb-2 sm:mb-4" />
      <div 
        className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2"
        style={{
          backgroundImage: 'linear-gradient(135deg, #638b4b 0%, #75a85e 25%, #5e9a52 50%, #3d6c31 100%)',
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
        backgroundColor: 'rgba(15, 15, 15, 0.85)',
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.09) 100%), linear-gradient(180deg, rgba(15, 15, 15, 0.85) 0%, rgba(10, 10, 10, 0.90) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 14px 55px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.22)'
      }}
    >
      <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 fill-[#638b4b] text-[#638b4b]" />
        ))}
      </div>

      <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#638b4b]/30 mb-2 sm:mb-3" />

      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 italic">
        "{quote}"
      </p>

      <div className="flex items-center gap-2 sm:gap-3">
        <div 
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-[#638b4b]"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 139, 75, 0.2) 0%, rgba(99, 139, 75, 0.1) 100%)',
            border: '1px solid rgba(99, 139, 75, 0.3)'
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
    { icon: Users, stat: '500+', label: 'Active Agents & Agencies' },
    { icon: Target, stat: '10,000+', label: 'Leads Delivered Monthly' },
    { icon: TrendingUp, stat: '1,000+', label: 'Policies Closed Monthly' },
    { icon: RefreshCw, stat: '95%', label: 'Contact Rate on Live Transfers' }
  ]

  const testimonials = [
    {
      quote: 'I went from inconsistent leads to closing policies daily. The live transfers alone changed how I operate.',
      name: 'Jason Miller',
      role: 'Licensed Insurance Agent',
      initials: 'JM'
    },
    {
            quote: 'Everything is finally in one place. No more juggling tools - just clean lead flow and faster conversions.',
      name: 'Brandon Lewis',
      role: 'Agency Owner',
      initials: 'BL'
    },
    {
      quote: 'Real-time routing is a game changer. We\'re connecting with serious prospects instantly.',
      name: 'Ashley Carter',
      role: 'Senior Insurance Advisor',
      initials: 'AC'
    },
    {
      quote: 'We scaled without hiring more people. The system handles the heavy lifting.',
      name: 'Kevin Brooks',
      role: 'Insurance Sales Manager',
      initials: 'KB'
    },
    {
      quote: 'From lead to policy, everything feels smooth and predictable now. That\'s what we were missing before.',
      name: 'Rachel Thompson',
      role: 'Agency Partner',
      initials: 'RT'
    },
    {
      quote: 'The speed of connection is unreal. By the time we speak to the lead, they\'re already ready to move forward.',
      name: 'Daniel Foster',
      role: 'Licensed Agent',
      initials: 'DF'
    },
    {
      quote: 'Lead quality is consistent, and the system keeps our team organized. It\'s helped us grow without chaos.',
      name: 'Nicole Ramirez',
      role: 'Agency Operations Manager',
      initials: 'NR'
    },
    {
      quote: 'We plugged into INSURVAS and immediately saw better results. More conversations, more policies.',
      name: 'Chris Walker',
      role: 'Independent Insurance Agent',
      initials: 'CW'
    },
    {
      quote: 'The platform made scaling simple. We\'re closing more without increasing our marketing spend.',
      name: 'Andrew Collins',
      role: 'Agency Owner',
      initials: 'AC'
    },
    {
      quote: 'It\'s not just leads - it\'s a full system. Everything from routing to closing just works.',
      name: 'Megan Scott',
      role: 'Insurance Consultant',
      initials: 'MS'
    },
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
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 10px 35px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)'
            }}
          >
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">CUSTOMER STORIES</span>
            <span className="text-[#638b4b]/60 text-[10px] sm:text-xs hidden sm:inline">-</span>
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold">03</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="text-white">Built for Insurance Professionals. </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #638b4b 0%, #75a85e 25%, #5e9a52 50%, #3d6c31 100%)',
              }}
            >
              Backed by Real Results.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto mt-2 sm:mt-4">
            Powering agents, agencies, and publishers with real volume, real speed, and real results.
          </p>
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
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(40px) saturate(120%)',
              WebkitBackdropFilter: 'blur(40px) saturate(120%)',
              zIndex: 1
            }}
          />
          <div className="marquee-track flex gap-4 sm:gap-6 w-max" style={{ position: 'relative', zIndex: 2 }}>
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
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.09) 100%)',
        border: isOpen ? '1px solid rgba(99, 139, 75, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isOpen ? '0 12px 45px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(99, 139, 75, 0.05) inset' : '0 12px 45px rgba(0, 0, 0, 0.35)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)'
      }}
    >
      <button 
        onClick={onClick}
        className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left"
      >
        <span className={`font-semibold text-sm sm:text-base pr-4 ${isOpen ? 'text-[#638b4b]' : 'text-white'}`}>
          {question}
        </span>
        <ChevronDown 
          className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'text-[#638b4b] rotate-180' : 'text-slate-400'}`}
        />
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div 
          className="px-4 sm:px-6 pb-4 sm:pb-5 ml-4 sm:ml-6 mr-4 sm:mr-6"
          style={{ borderLeft: '3px solid #638b4b' }}
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
      question: 'What is INSURVAS?',
      answer: 'INSURVAS is an all-in-one platform designed for insurance agents, agencies, and publishers. It helps you manage lead flow, connect with prospects in real time, and scale your policy production - all from one system.'
    },
    {
      question: 'Do I need to be a licensed agent to use INSURVAS?',
      answer: 'Licensed agents can directly receive and close leads on the platform. If you\'re not licensed, you can still join as a publisher (BPO) and generate leads within the ecosystem.'
    },
    {
      question: 'How are leads distributed?',
      answer: 'Leads are routed in real time based on agent availability, licensing, and performance. This ensures faster response times and higher chances of closing each opportunity.'
    },
    {
      question: 'What is the live transfer system?',
      answer: 'The live transfer system connects agents instantly with high-intent prospects over a call. This allows you to engage leads at peak interest and significantly improve conversion rates.'
    },
    {
      question: 'How do publishers get paid?',
      answer: 'Publishers are paid based on performance and lead quality. All payouts and performance metrics are tracked transparently within the platform.'
    },
    {
      question: 'Can agencies manage multiple agents?',
      answer: 'Yes - agencies can onboard, manage, and track their entire team within INSURVAS. You get full visibility into performance, lead distribution, and policy outcomes.'
    },
    {
      question: 'What states are supported?',
      answer: 'INSURVAS supports agents and agencies operating across multiple states. Lead distribution is aligned with your licensing and compliance requirements.'
    }
  ]

  return (
    <section id="faq" className="relative py-16 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <div 
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 10px 35px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)'
            }}
          >
            <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4 text-[#638b4b]" />
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">FAQ</span>
            <span className="text-[#638b4b]/60 text-[10px] sm:text-xs hidden sm:inline">-</span>
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold">05</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="text-white">Got Questions? </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #638b4b 0%, #75a85e 25%, #5e9a52 50%, #3d6c31 100%)',
              }}
            >
              We've Got Answers.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto mt-4">
            Everything you need to know about how INSURVAS helps you generate, manage, and close more insurance policies.
          </p>
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
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.09) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 14px 55px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)'
      }}
    >
      <div 
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 139, 75, 0.15) 0%, rgba(99, 139, 75, 0.08) 100%)',
          border: '1px solid rgba(99, 139, 75, 0.2)'
        }}
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#638b4b]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-slate-400 text-[10px] sm:text-xs mb-0.5 sm:mb-1">{label}</p>
        <p className="text-white font-semibold text-xs sm:text-sm truncate">{value}</p>
      </div>
      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500 group-hover:text-[#638b4b] transition-colors flex-shrink-0" />
    </a>
  )
}

function Contact() {
  return (
    <section id="contact" className="relative py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <div 
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.08) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              boxShadow: '0 10px 35px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.20)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)'
            }}
          >
            <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-[#638b4b]" />
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">GET IN TOUCH</span>
            <span className="text-[#638b4b]/60 text-[10px] sm:text-xs hidden sm:inline">-</span>
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold">06</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="text-white">Let's </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #638b4b 0%, #75a85e 25%, #5e9a52 50%, #3d6c31 100%)',
              }}
            >
              Build Your Insurance Pipeline.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-lg">
            Have questions or want to get started? Connect with our team and see how INSURVAS can help you scale faster.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
            <ContactCard 
              icon={Mail}
              label="Email Us"
              value="contact@insurvas.com"
              href="mailto:contact@insurvas.com"
            />
            <ContactCard 
              icon={Users}
              label="Join Our Network"
              value="Connect with agents, agencies, and publishers inside the INSURVAS ecosystem."
              href="#"
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
                  background: 'linear-gradient(135deg, rgba(99, 139, 75, 0.15) 0%, rgba(99, 139, 75, 0.08) 100%)',
                  border: '1px solid rgba(99, 139, 75, 0.2)'
                }}
              >
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#638b4b]" />
              </div>
              <div className="flex-1">
                <p className="text-slate-400 text-[10px] sm:text-xs mb-0.5 sm:mb-1">Operating Nationwide</p>
                <p className="text-white font-semibold text-xs sm:text-sm">United States</p>
              </div>
            </div>
          </div>

          <div 
            className="rounded-2xl p-5 sm:p-8 order-1 lg:order-2"
            style={{
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 12px 45px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.16)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)'
            }}
          >
            <form className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-slate-400 text-xs sm:text-sm mb-1.5 sm:mb-2">Name</label>
                <input 
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#638b4b]/50 transition-all text-sm sm:text-base"
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#638b4b]/50 transition-all text-sm sm:text-base"
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
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#638b4b]/50 transition-all resize-none text-sm sm:text-base"
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
                  background: 'linear-gradient(135deg, #638b4b 0%, #3d6c31 100%)',
                  boxShadow: '0 0 30px rgba(99, 139, 75, 0.2)'
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
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.06) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.20)',
            boxShadow: '0 18px 65px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(22px)',
            WebkitBackdropFilter: 'blur(22px)'
          }}
        >
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(99, 139, 75, 0.15) 0%, transparent 70%)'
            }}
          />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-white">Your Next Policy Is </span>
              <span 
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #638b4b 0%, #75a85e 25%, #5e9a52 50%, #3d6c31 100%)',
                }}
              >
                Waiting.
              </span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-lg mb-6 sm:mb-10 max-w-lg mx-auto">
              Join agents, agencies, and publishers already scaling their insurance business with INSURVAS.
            </p>

            <button 
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-black transition-all hover:scale-105 text-sm sm:text-base"
              style={{
                background: 'linear-gradient(135deg, #638b4b 0%, #3d6c31 100%)',
                boxShadow: '0 0 30px rgba(99, 139, 75, 0.3)'
              }}
            >
              Get Started Today
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
              <img
                src="/logo-main-2.png"
                alt="INSURVAS"
                className="h-6 sm:h-7 w-auto select-none"
                draggable={false}
              />
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              The all-in-one operating system for insurance professionals - from lead acquisition to final issuance.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4">Platform</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#features" className="text-slate-400 hover:text-[#638b4b] text-xs sm:text-sm transition-colors">Features</a></li>
              <li><a href="#case-studies" className="text-slate-400 hover:text-[#638b4b] text-xs sm:text-sm transition-colors">Results</a></li>
              <li><a href="#faq" className="text-slate-400 hover:text-[#638b4b] text-xs sm:text-sm transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-[10px] sm:text-xs uppercase tracking-wider mb-3 sm:mb-4">Legal</h4>
            <ul className="space-y-2 sm:space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-[#638b4b] text-xs sm:text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-slate-400 hover:text-[#638b4b] text-xs sm:text-sm transition-colors">Terms of Service</a></li>
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
                <Disc className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-[#638b4b]" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-[#638b4b]" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-[#638b4b]" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-[#638b4b]" />
              </a>
              <a 
                href="#" 
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center transition-all hover:scale-110"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 hover:text-[#638b4b]" />
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
            © 2026 INSURVAS. All rights reserved.
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
            <img
              src="/logo-main-2.png"
              alt="INSURVAS"
              className="h-7 sm:h-8 w-auto select-none"
              draggable={false}
            />
          </div>
          
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors text-sm">Features</a>
            <a href="#case-studies" className="text-slate-300 hover:text-white transition-colors text-sm">Case Studies</a>
            <a href="#faq" className="text-slate-300 hover:text-white transition-colors text-sm">FAQ</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-colors text-sm">Contact</a>
          </div>

          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            <button 
              className="flex items-center gap-1.5 sm:gap-2 text-black px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all"
              style={{
                background: 'linear-gradient(135deg, #638b4b 0%, #3d6c31 100%)',
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
              <a href="#case-studies" className="block text-slate-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all text-sm">Results</a>
              <a href="#faq" className="block text-slate-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all text-sm">FAQ</a>
              <a href="#contact" className="block text-slate-300 hover:text-white py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all text-sm">Contact</a>
            </div>
            <div className="mt-4 pt-4 space-y-2" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <button 
                className="w-full flex items-center justify-center gap-2 text-black px-5 py-3 rounded-xl text-sm font-semibold transition-all"
                style={{
                  background: 'linear-gradient(135deg, #638b4b 0%, #3d6c31 100%)',
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
            background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.09) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            boxShadow: '0 10px 35px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)'
          }}
        >
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-[#638b4b]" />
          <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">
            The #1 Platform for Insurance Agents, Agencies & Publishers
          </span>
        </div>

        <AnimatedHeading />

        <p className="text-sm sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed">
          The all-in-one operating system for insurance professionals - from lead acquisition to final issuance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button 
            className="group flex items-center gap-2 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all hover:scale-105 w-full sm:w-auto justify-center"
            style={{
              background: 'linear-gradient(135deg, #638b4b 0%, #3d6c31 100%)',
              boxShadow: '0 0 30px rgba(99, 139, 75, 0.3)'
            }}
          >
            Get Started Today
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </button>

        </div>

        <p className="text-slate-500 text-xs sm:text-sm mb-8 sm:mb-12"></p>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-slate-400 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-[#638b4b]" />
            <span>Enterprise-Grade Security</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Cpu className="w-3 h-3 sm:w-4 sm:h-4 text-[#638b4b]" />
            <span>AI-Powered Lead Qualification</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#638b4b]" />
            <span>Setup in Minutes</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-[#638b4b]" />
            <span>500+ Active Agents & Agencies</span>
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
