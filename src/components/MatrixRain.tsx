'use client'

import { useEffect } from 'react'

export function MatrixRain() {
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
          ctx.fillStyle = '#074A4F'
        } else if (random > 0.5) {
          ctx.fillStyle = 'rgba(7, 74, 79, 0.9)'
        } else {
          ctx.fillStyle = 'rgba(7, 74, 79, 0.7)'
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
        style={{ background: 'linear-gradient(180deg, #000000 0%, #050a0b 50%, #020808 100%)' }}
      />
      <div
        className="fixed bottom-0 left-0 right-0 h-[60%] pointer-events-none z-0"
        style={{
          background:
            'linear-gradient(to top, rgba(7, 74, 79, 0.18) 0%, rgba(7, 74, 79, 0.06) 30%, transparent 60%)',
        }}
      />
    </>
  )
}
