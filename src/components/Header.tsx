import { useState } from 'react'
import { motion } from 'framer-motion'
import MobileNav from './MobileNav'

interface HeaderProps {
  user: string
  partner: string
}

export default function Header({ user, partner }: HeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-soft-cream/80 backdrop-blur-md border-b border-warm-terracotta/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <span className="text-2xl" role="img" aria-label="coração">
            ♥
          </span>
          <span className="font-poppins font-semibold text-deep-cocoa">
            {user} + {partner}
          </span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-6" aria-label="Navegação principal">
          <a 
            href="#tracks" 
            className="text-deep-cocoa/70 hover:text-warm-terracotta transition-colors"
          >
            Top Musicas
          </a>
          <a 
            href="#moments" 
            className="text-deep-cocoa/70 hover:text-warm-terracotta transition-colors"
          >
            Momentos
          </a>
          <a 
            href="#artist" 
            className="text-deep-cocoa/70 hover:text-warm-terracotta transition-colors"
          >
            Artista do Mês
          </a>
          <a 
            href="#gallery" 
            className="text-deep-cocoa/70 hover:text-warm-terracotta transition-colors"
          >
            Galeria
          </a>
        </nav>

        <button
          className="md:hidden p-2 text-deep-cocoa"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Abrir menu"
          aria-expanded={mobileNavOpen}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <MobileNav 
        isOpen={mobileNavOpen} 
        onClose={() => setMobileNavOpen(false)} 
      />
    </header>
  )
}
