import { useState, useEffect, useCallback } from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type ResolvedTheme = 'light' | 'dark'

const THEME_KEY = 'wrapped_theme'
const ASTEROIDS_KEY = 'wrapped_asteroids'

interface UseThemeReturn {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
  isSystem: boolean
  asteroidsEnabled: boolean
  setAsteroidsEnabled: (enabled: boolean) => void
}

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getStoredTheme(): Theme | null {
  if (typeof window === 'undefined') return null
  const stored = localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark' || stored === 'system') {
    return stored
  }
  return null
}

function getStoredAsteroids(): boolean {
  if (typeof window === 'undefined') return true
  const stored = localStorage.getItem(ASTEROIDS_KEY)
  return stored !== 'off'
}

export function useTheme(): UseThemeReturn {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')
  const [asteroidsEnabled, setAsteroidsState] = useState(true)
  const [mounted, setMounted] = useState(false)

  const applyTheme = useCallback((resolved: ResolvedTheme) => {
    const root = document.documentElement
    if (resolved === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    setResolvedTheme(resolved)
  }, [])

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme)
    if (newTheme === 'system') {
      localStorage.removeItem(THEME_KEY)
      applyTheme(getSystemTheme())
    } else {
      localStorage.setItem(THEME_KEY, newTheme)
      applyTheme(newTheme)
    }
  }, [applyTheme])

  const setAsteroidsEnabled = useCallback((enabled: boolean) => {
    setAsteroidsState(enabled)
    localStorage.setItem(ASTEROIDS_KEY, enabled ? 'on' : 'off')
  }, [])

  useEffect(() => {
    const storedTheme = getStoredTheme()
    const storedAsteroids = getStoredAsteroids()
    
    setAsteroidsState(storedAsteroids)

    if (storedTheme) {
      setThemeState(storedTheme)
      if (storedTheme === 'system') {
        applyTheme(getSystemTheme())
      } else {
        applyTheme(storedTheme)
      }
    } else {
      setThemeState('system')
      applyTheme(getSystemTheme())
    }

    setMounted(true)

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      const currentTheme = getStoredTheme()
      if (!currentTheme || currentTheme === 'system') {
        applyTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [applyTheme])

  return {
    theme,
    resolvedTheme: mounted ? resolvedTheme : 'light',
    setTheme,
    isSystem: theme === 'system',
    asteroidsEnabled: mounted ? asteroidsEnabled : false,
    setAsteroidsEnabled,
  }
}

export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return reducedMotion
}

export function useSaveData(): boolean {
  const [saveData, setSaveData] = useState(false)

  useEffect(() => {
    const connection = (navigator as any).connection
    if (connection) {
      setSaveData(connection.saveData === true)
    }
  }, [])

  return saveData
}
