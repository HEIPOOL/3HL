import { useEffect, useRef, useCallback } from 'react'
import { useReducedMotion, useSaveData } from '@/hooks/useTheme'

interface AsteroidLayerProps {
  enabled?: boolean
  countDesktop?: number
  countMobile?: number
  opacity?: number
}

interface Asteroid {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  wobble: number
  wobbleSpeed: number
  wobbleOffset: number
}

export default function AsteroidLayer({
  enabled = true,
  countDesktop = 10,
  countMobile = 5,
  opacity = 1,
}: AsteroidLayerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const asteroidsRef = useRef<Asteroid[]>([])
  const animationRef = useRef<number>(0)
  const isVisibleRef = useRef(true)
  
  const reducedMotion = useReducedMotion()
  const saveData = useSaveData()

  const shouldAnimate = enabled && !reducedMotion && !saveData

  const getCount = useCallback(() => {
    if (typeof window === 'undefined') return countDesktop
    return window.innerWidth < 768 ? countMobile : countDesktop
  }, [countDesktop, countMobile])

  const createAsteroid = useCallback((canvas: HTMLCanvasElement, startFromTop = true): Asteroid => {
    const size = 6 + Math.random() * 22
    return {
      x: Math.random() * canvas.width,
      y: startFromTop ? -size : Math.random() * canvas.height,
      size,
      speed: 30 + Math.random() * 90,
      opacity: 0.08 + Math.random() * 0.10,
      wobble: 0,
      wobbleSpeed: 0.5 + Math.random() * 1.5,
      wobbleOffset: Math.random() * Math.PI * 2,
    }
  }, [])

  const initAsteroids = useCallback((canvas: HTMLCanvasElement) => {
    const count = getCount()
    asteroidsRef.current = []
    for (let i = 0; i < count; i++) {
      asteroidsRef.current.push(createAsteroid(canvas, false))
    }
  }, [getCount, createAsteroid])

  useEffect(() => {
    if (!shouldAnimate) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr)
      initAsteroids(canvas)
    }

    resize()
    window.addEventListener('resize', resize)

    const handleVisibility = () => {
      isVisibleRef.current = document.visibilityState === 'visible'
    }
    document.addEventListener('visibilitychange', handleVisibility)

    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const deltaTime = (currentTime - lastTime) / 1000
      lastTime = currentTime

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const isDark = document.documentElement.classList.contains('dark')
      const baseColor = isDark ? '255, 214, 165' : '199, 123, 91'
      const glowColor = isDark ? '199, 123, 91' : '255, 214, 165'

      asteroidsRef.current.forEach((asteroid, index) => {
        asteroid.y += asteroid.speed * deltaTime
        asteroid.wobble += asteroid.wobbleSpeed * deltaTime
        const wobbleX = Math.sin(asteroid.wobble + asteroid.wobbleOffset) * 20

        if (asteroid.y > window.innerHeight + asteroid.size) {
          asteroidsRef.current[index] = createAsteroid(canvas, true)
          return
        }

        const x = asteroid.x + wobbleX
        const finalOpacity = asteroid.opacity * opacity

        ctx.save()

        const gradient = ctx.createRadialGradient(
          x, asteroid.y, 0,
          x, asteroid.y, asteroid.size
        )
        gradient.addColorStop(0, `rgba(${baseColor}, ${finalOpacity * 1.5})`)
        gradient.addColorStop(0.5, `rgba(${baseColor}, ${finalOpacity})`)
        gradient.addColorStop(1, `rgba(${glowColor}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, asteroid.y, asteroid.size, 0, Math.PI * 2)
        ctx.fill()

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', handleVisibility)
      cancelAnimationFrame(animationRef.current)
    }
  }, [shouldAnimate, opacity, createAsteroid, initAsteroids])

  if (!shouldAnimate) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
      role="presentation"
    />
  )
}
