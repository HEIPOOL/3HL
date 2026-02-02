import { motion, AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleNavClick = (href: string) => {
    onClose()
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={onClose}
          />
          
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-64 bg-soft-cream z-50 md:hidden shadow-xl"
            aria-label="Menu de navegação mobile"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <span className="font-poppins font-semibold text-deep-cocoa">Menu</span>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-deep-cocoa/10 rounded-full transition-colors"
                  aria-label="Fechar menu"
                >
                  <svg className="w-6 h-6 text-deep-cocoa" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => handleNavClick('#tracks')}
                  className="block w-full text-left px-4 py-3 rounded-xl text-deep-cocoa hover:bg-warm-terracotta/10 transition-colors"
                >
                  Top Musicas
                </button>
                <button
                  onClick={() => handleNavClick('#moments')}
                  className="block w-full text-left px-4 py-3 rounded-xl text-deep-cocoa hover:bg-warm-terracotta/10 transition-colors"
                >
                  Momentos
                </button>
                <button
                  onClick={() => handleNavClick('#artist')}
                  className="block w-full text-left px-4 py-3 rounded-xl text-deep-cocoa hover:bg-warm-terracotta/10 transition-colors"
                >
                  Artista do Mês
                </button>
                <button
                  onClick={() => handleNavClick('#gallery')}
                  className="block w-full text-left px-4 py-3 rounded-xl text-deep-cocoa hover:bg-warm-terracotta/10 transition-colors"
                >
                  Galeria
                </button>
              </div>

              <div className="absolute bottom-8 left-6 right-6">
                <div className="text-center text-sm text-deep-cocoa/50">
                  <span className="text-lg">♥</span>
                  <p className="mt-2">Feito com amor</p>
                </div>
              </div>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
