'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { 
  Sparkles, Shield, Zap, Clock, Users, ArrowRight,
  BarChart3, MapPin, Brain, FolderLock, Video,
  UserCheck, Building2, Gift, TrendingUp, Cpu,
  Target, RefreshCw, Star, Quote, ChevronDown, HelpCircle,
  Mail, MessageSquare, Phone, Send, ExternalLink,
  Twitter, Instagram, Linkedin, Youtube, Disc
} from 'lucide-react'
import { MatrixRain } from '@/components/MatrixRain'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

function getAvatarUrl(name: string, gender: 'male' | 'female') {
  const seed = name.split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  const avatarId = seed % 100
  const genderPath = gender === 'male' ? 'men' : 'women'
  return `https://randomuser.me/api/portraits/${genderPath}/${avatarId}.jpg`
}

function AnimatedHeading() {
  const [line1, setLine1] = useState('')
  const [line2, setLine2] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isComplete, setIsComplete] = useState(false)

  const textLine1 = 'Your Code is Your Passport.'
  const textLine2 = 'Skip the Resume Pile.'

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
      <span className="text-foreground">
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

  const textLine1 = 'Your Developer Path.'
  const textLine2 = 'Skills. Network. Growth.'

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
      <span className="text-foreground">
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

  const textLine1 = 'Everything You Need to Excel'
  const textLine2 = 'As a Developer.'

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
      <span className="text-foreground">
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

function FeatureCard({ icon: Icon, title, description, index }: { icon: React.ElementType, title: string, description: string, index: number }) {
  const rowBias = index < 4 ? -1 : 1
  return (
    <div 
      className="feature-tilt-card rounded-2xl p-4 sm:p-5 h-[250px] sm:h-[270px] lg:h-[290px] flex flex-col"
      onMouseMove={(e) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width
        const y = (e.clientY - rect.top) / rect.height
        const rotateX = ((0.5 - y) * 12) + rowBias * 1.2
        const rotateY = (x - 0.5) * 16
        card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`)
        card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`)
        card.style.setProperty('--ty', '-8px')
        card.style.setProperty('--sc', '1.02')
      }}
      onMouseLeave={(e) => {
        const card = e.currentTarget
        card.style.setProperty('--rx', '0deg')
        card.style.setProperty('--ry', '0deg')
        card.style.setProperty('--ty', '0px')
        card.style.setProperty('--sc', '1')
      }}
      style={{
        background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.09) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.22)',
        boxShadow: '0 14px 55px rgba(0, 0, 0, 0.40), inset 0 1px 0 rgba(255, 255, 255, 0.22)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)'
      }}
    >
      <div 
        className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center mb-2 sm:mb-3"
        style={{
          background: 'linear-gradient(135deg, rgba(99, 139, 75, 0.16) 0%, rgba(99, 139, 75, 0.08) 100%)',
          border: '1px solid rgba(99, 139, 75, 0.28)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.10)'
        }}
      >
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#638b4b]" />
      </div>
      <h3 className="text-[#638b4b] font-semibold text-base sm:text-lg mb-2">{title}</h3>
      <p className="text-white text-xs sm:text-sm leading-relaxed">{description}</p>
      <p className="text-[#638b4b] text-xs sm:text-sm font-semibold mt-2">
        Learn more
      </p>
    </div>
  )
}

function Features() {
  const features = [
    {
      icon: Cpu,
      title: 'Fullstack Development',
      description: 'End-to-end application development across modern frameworks and cloud platforms.'
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Building intelligent systems with cutting-edge ML models and AI pipelines.'
    },
    {
      icon: Zap,
      title: 'DevOps & Automation',
      description: 'Infrastructure as code, CI/CD pipelines, and scalable system architecture.'
    },
    {
      icon: Target,
      title: 'Algorithmic Logic',
      description: 'Complex problem-solving and optimization for high-performance systems.'
    },
    {
      icon: Users,
      title: '100% Remote-First Culture',
      description: 'Work from wherever you\'re most productive. We believe talent has no borders and your office should have no limits.'
    },
    {
      icon: RefreshCw,
      title: 'Agile Project Management',
      description: 'No more scope creep. We use streamlined, dev-centric workflows that prioritize shipping code over attending meetings.'
    },
    {
      icon: Clock,
      title: 'True Flexible Timing',
      description: 'Own your schedule. We measure success by the quality of your output and the milestones you hit, not the hours you clock.'
    },
    {
      icon: Star,
      title: 'Elite Mentorship & Tools',
      description: 'Gain access to senior architects and proprietary internal tools designed to help you build faster and smarter.'
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
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">TECHNICAL & CULTURE</span>
          </div>

          <AnimatedFeaturesHeading />

          <p className="text-foreground text-sm sm:text-lg font-medium">
            Technical specializations and work culture designed for elite developers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
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
            background: 'linear-gradient(135deg, #638b4b 0%, #3d6c31 100%)',
            border: '1px solid rgba(99, 139, 75, 0.95)',
            boxShadow: '0 4px 16px rgba(99, 139, 75, 0.35)'
          }}
        >
          <span className="text-[10px] sm:text-xs font-semibold uppercase text-white">{badge}</span>
        </div>

        <h3 className="text-white font-bold text-lg sm:text-xl mb-2 sm:mb-3 leading-tight">{title}</h3>
        <p className="text-white text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6">{description}</p>

        <div 
          className="rounded-xl p-3 sm:p-4"
          style={{
            background:
              'linear-gradient(135deg, rgba(99, 139, 75, 0.48) 0%, rgba(61, 108, 49, 0.34) 55%, rgba(99, 139, 75, 0.24) 100%)',
            border: '1px solid rgba(99, 139, 75, 0.62)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.16)'
          }}
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-2xl sm:text-3xl font-bold text-white">{stat}</span>
            <span className="text-white text-xs sm:text-sm">{statLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SuccessStories() {
  const stories = [
    {
      badge: 'SKILLS',
      badgeColor: '#638b4b',
      topBorderColor: 'linear-gradient(90deg, #638b4b, #3d6c31)',
      title: '100% Talent-First Evaluation',
      description: 'We ignore the alma mater and the prestige logos. We evaluate your actual codebase and engineering logic in real-time. If you can build it, you\'re in.',
      stat: '100%',
      statLabel: 'Code Over Credentials',
      statColor: '#638b4b'
    },
    {
      badge: 'NETWORK',
      badgeColor: '#638b4b',
      topBorderColor: 'linear-gradient(90deg, #638b4b, #3d6c31)',
      title: 'Global Reach Across 24+ Timezones',
      description: 'Your talent isn\'t geo-fenced. Connect with elite engineering teams from San Francisco to Singapore. Work from anywhere, for the best in the world.',
      stat: 'Unlimited',
      statLabel: 'Global Reach',
      statColor: '#638b4b'
    },
    {
      badge: 'GROWTH',
      badgeColor: '#638b4b',
      topBorderColor: 'linear-gradient(90deg, #638b4b, #3d6c31)',
      title: 'Direct Path to Senior Architecture Roles',
      description: 'Skip the junior-level grind. Our challenges place you directly into high-growth teams with mentorship from senior architects and access to proprietary stacks.',
      stat: 'Direct',
      statLabel: 'Hiring Pipeline',
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
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">DEVELOPER SUCCESS</span>
          </div>

          <AnimatedSuccessHeading />

          <p className="text-foreground text-sm sm:text-lg">
            Build your skills, expand your network, and accelerate your growth with elite engineering teams.
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
      <p className="text-white text-xs sm:text-sm">{label}</p>
    </div>
  )
}

function TestimonialCard({
  quote, 
  name, 
  role,
  gender
}: { 
  quote: string
  name: string
  role: string
  gender: 'male' | 'female'
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

      <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-white/40 mb-2 sm:mb-3" />

      <p className="text-white text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 italic">
        "{quote}"
      </p>

      <div className="flex items-center gap-2 sm:gap-3">
        <div
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0"
          style={{ border: '1px solid rgba(99, 139, 75, 0.45)' }}
        >
          <img
            src={getAvatarUrl(name, gender)}
            alt={`${name} avatar`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-white font-semibold text-xs sm:text-sm">{name}</p>
          <p className="text-white text-[10px] sm:text-xs">{role}</p>
        </div>
      </div>
    </div>
  )
}

function Testimonials() {
  const stats = [
    { icon: Users, stat: '5', label: 'Active Global Engineering Teams' },
    { icon: TrendingUp, stat: '10,000+', label: 'Production Commits Shipped Monthly' },
    { icon: Clock, stat: '48 Hours', label: 'Average Time from Challenge to Offer' },
    { icon: Target, stat: '98%', label: 'Retention Rate for Placed Developers' }
  ]

  const testimonials = [
    {
      quote: 'The challenge wasn\'t just about coding—it was about solving real problems. I got my offer within 48 hours of completing it.',
      name: 'Alex Chen',
      role: 'Fullstack Developer',
      gender: 'male' as const
    },
    {
      quote: 'Finally, a hiring process that values actual skills over pedigree. The feedback loop was incredibly valuable.',
      name: 'Sarah Johnson',
      role: 'ML Engineer',
      gender: 'female' as const
    },
    {
      quote: 'From challenge to offer in three days. The team was transparent, the work was exciting, and I felt respected throughout.',
      name: 'Marcus Williams',
      role: 'Backend Developer',
      gender: 'male' as const
    },
    {
      quote: 'I was skeptical about \'skill-based hiring\' until I experienced it. The challenges mirrored actual production work, and now I\'m building features that impact millions.',
      name: 'Priya Patel',
      role: 'Senior Frontend Engineer',
      gender: 'female' as const
    },
    {
      quote: 'The mentorship during the trial period was unmatched. They didn\'t just evaluate my code—they helped me grow as an engineer.',
      name: 'James Rodriguez',
      role: 'DevOps Engineer',
      gender: 'male' as const
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
            <span className="text-[#638b4b] text-[10px] sm:text-xs font-semibold tracking-wider uppercase">PERFORMANCE METRICS</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="text-foreground">Built for Modern Builders. </span>
            <span 
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #638b4b 0%, #75a85e 25%, #5e9a52 50%, #3d6c31 100%)',
              }}
            >
              Backed by High-Performance Metrics.
            </span>
          </h2>

          <p className="text-foreground text-sm sm:text-lg max-w-2xl mx-auto mt-2 sm:mt-4 font-medium">
            Powering top-tier developers, rapid-growth startups, and global tech giants with real code, real feedback, and real hires.
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

        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden">
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
                gender={testimonial.gender}
              />
            ))}
            {testimonials.map((testimonial, index) => (
              <TestimonialCard 
                key={`second-${index}`}
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                gender={testimonial.gender}
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
        borderTop: isOpen ? '1px solid rgba(99, 139, 75, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
        borderRight: isOpen ? '1px solid rgba(99, 139, 75, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: isOpen ? '1px solid rgba(99, 139, 75, 0.3)' : '1px solid rgba(255, 255, 255, 0.08)',
        borderLeft: isOpen ? '3px solid #638b4b' : '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: isOpen ? '0 12px 45px rgba(0, 0, 0, 0.35), 0 0 18px rgba(99, 139, 75, 0.22)' : '0 12px 45px rgba(0, 0, 0, 0.35)',
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
          className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'text-[#638b4b] rotate-180' : 'text-white'}`}
        />
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div 
          className="px-4 sm:px-6 pb-4 sm:pb-5"
        >
          <p className="text-white text-xs sm:text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'Is This Just Another Job Posting?',
      answer: 'No. This is a skill-based competition. Winners move directly to a paid task review and immediate hiring consideration.'
    },
    {
      question: 'What Do I Need To Bring To The Fight?',
      answer: 'Your laptop, your brain, and your GitHub. No resume spam—just your skills and your willingness to compete.'
    },
    {
      question: 'What Happens After I Sign Up?',
      answer: 'Our team reviews your submission. Top candidates are invited to the Developer Games challenge. Win the challenge, pass the workflow task, and receive your offer letter.'
    },
    {
      question: 'What Kind Of Roles Are Available?',
      answer: 'We place developers in high-growth international teams with mentorship from senior architects and access to elite proprietary tools.'
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
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold mb-3 sm:mb-4">
            <span className="text-foreground block">Got Questions?</span>
            <span 
              className="bg-clip-text text-transparent block mt-1 sm:mt-2"
              style={{
                backgroundImage: 'linear-gradient(135deg, #638b4b 0%, #75a85e 25%, #5e9a52 50%, #3d6c31 100%)',
              }}
            >
              We've Got Answers.
            </span>
          </h2>

          <p className="text-foreground text-sm sm:text-lg max-w-2xl mx-auto mt-4 font-medium">
            Everything you need to know about the Developer Games challenge and the hiring process.
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
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-[10px] sm:text-xs mb-0.5 sm:mb-1">{label}</p>
        <p className="text-white font-semibold text-xs sm:text-sm truncate">{value}</p>
      </div>
      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:text-white transition-colors flex-shrink-0" />
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
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-6xl font-extrabold mb-3 sm:mb-4">
            <span className="text-foreground block">Let’s Build</span>
            <span 
              className="bg-clip-text text-transparent block mt-1 sm:mt-2"
              style={{
                backgroundImage: 'linear-gradient(135deg, #638b4b 0%, #75a85e 25%, #5e9a52 50%, #3d6c31 100%)',
              }}
            >
              Your Future, Not Your Resume.
            </span>
          </h2>

          <p className="text-foreground text-sm sm:text-lg font-medium">
            Still have questions before entering the arena? Connect with our team and see how we help the world's best builders bypass the noise and get hired.
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
              value="Connect with IMOs, agencies, and agents inside the INSURVAS ecosystem."
              href="#"
            />
            <ContactCard 
              icon={Phone}
              label="Schedule a Call"
              value="Book a 15-min demo"
              href="#"
            />
            <ContactCard 
              icon={MapPin}
              label="Operating Nationwide"
              value="United States - All 50 States & U.S. Territories"
              href="#"
            />
            <ContactCard
              icon={MessageSquare}
              label="24/7 Support"
              value="Round-the-clock assistance for IMOs, agencies, and agents."
              href="#"
            />
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
                <label className="block text-white text-xs sm:text-sm mb-1.5 sm:mb-2">Name</label>
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
                <label className="block text-white text-xs sm:text-sm mb-1.5 sm:mb-2">Email</label>
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
                <label className="block text-white text-xs sm:text-sm mb-1.5 sm:mb-2">Message</label>
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
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-4 sm:mb-6">
              <span className="text-foreground">Ready To Prove You're a Builder, Not Just A Resume?</span>
            </h2>

            <p className="text-foreground text-sm sm:text-lg mb-6 sm:mb-10 max-w-lg mx-auto font-medium">
              The next challenge wave starts soon. Spots are limited. Only the builders who show up, code up, and stand out get the offer.
            </p>

            <Link
              href="/schedule"
              className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-black transition-all hover:scale-105 text-sm sm:text-base"
              style={{
                background: 'linear-gradient(135deg, #638b4b 0%, #3d6c31 100%)',
                boxShadow: '0 0 30px rgba(99, 139, 75, 0.3)',
              }}
            >
            PROVE YOUR SKILLS
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
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
          <span className="text-[#638b4b] text-xs sm:text-sm font-semibold tracking-wider uppercase">
            The #1 Platform for Insurance IMOs, Agencies & Agents
          </span>
        </div>

        <AnimatedHeading />

        <p className="text-sm sm:text-lg lg:text-xl text-foreground max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed font-medium">
          Stop waiting weeks for a callback. Compete in real-world engineering challenges, outcode the best, and grab a seat at the table with the world's most ambitious engineering teams.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <Link
            href="/schedule"
            className="group flex items-center gap-2 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold transition-all hover:scale-105 w-full sm:w-auto justify-center"
            style={{
              background: 'linear-gradient(135deg, #638b4b 0%, #3d6c31 100%)',
              boxShadow: '0 0 30px rgba(99, 139, 75, 0.3)',
            }}
          >
            ENTER THE ARENA
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-white text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            <span>Asynchronous-First Culture</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            <span>Rapid Hiring Cycles</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Target className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            <span>Performance-Linked Rewards</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            <span>High-Growth International Teams</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main className="relative bg-background min-h-screen">
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
