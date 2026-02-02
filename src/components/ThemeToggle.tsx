import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme, Theme } from '@/hooks/useTheme'

interface ThemeToggleProps {
  showAsteroidToggle?: boolean
}

export default function ThemeToggle({ showAsteroidToggle = true }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, asteroidsEnabled, setAsteroidsEnabled } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const isDark = resolvedTheme === 'dark'

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme)
    setMenuOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 rounded-full bg-surface/50 hover:bg-surface/80 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
        aria-label={`Tema atual: ${isDark ? 'escuro' : 'claro'}. Clique para alterar.`}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDark ? (
            <svg className="w-5 h-5 text-accent-glow" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-warm-terracotta" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 mt-2 w-48 py-2 bg-surface dark:bg-[#1A1D1E] rounded-xl shadow-lg border border-black/10 dark:border-white/10 z-50"
              role="menu"
            >
              <p className="px-4 py-1 text-xs font-medium text-muted uppercase tracking-wide">
                Tema
              </p>
              
              {(['light', 'dark', 'system'] as Theme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => handleThemeChange(t)}
                  className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors ${
                    theme === t ? 'text-warm-terracotta font-medium' : 'text-text'
                  }`}
                  role="menuitem"
                  aria-pressed={theme === t}
                >
                  {t === 'light' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
                    </svg>
                  )}
                  {t === 'dark' && (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                    </svg>
                  )}
                  {t === 'system' && (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {t === 'light' && 'Claro'}
                  {t === 'dark' && 'Escuro'}
                  {t === 'system' && 'Sistema'}
                  {theme === t && (
                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}

              {showAsteroidToggle && (
                <>
                  <div className="my-2 border-t border-black/10 dark:border-white/10" />
                  <p className="px-4 py-1 text-xs font-medium text-muted uppercase tracking-wide">
                    Efeitos
                  </p>
                  <button
                    onClick={() => setAsteroidsEnabled(!asteroidsEnabled)}
                    className="w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-text"
                    role="menuitemcheckbox"
                    aria-checked={asteroidsEnabled}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Asteroides
                    <div className={`ml-auto w-8 h-5 rounded-full transition-colors ${
                      asteroidsEnabled ? 'bg-warm-terracotta' : 'bg-black/20 dark:bg-white/20'
                    }`}>
                      <motion.div
                        className="w-4 h-4 bg-white rounded-full shadow mt-0.5"
                        animate={{ x: asteroidsEnabled ? 14 : 2 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </button>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
