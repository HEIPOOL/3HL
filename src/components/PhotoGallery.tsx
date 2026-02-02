import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './Shared/Card'

interface GalleryItem {
  id: string
  media: string
  type: 'image' | 'video'
  caption: string
}

interface PhotoGalleryProps {
  items: GalleryItem[]
}

export default function PhotoGallery({ items }: PhotoGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedIndex(null)
    document.body.style.overflow = ''
  }

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % items.length)
    }
  }

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + items.length) % items.length)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal()
    if (e.key === 'ArrowRight') goNext()
    if (e.key === 'ArrowLeft') goPrev()
  }

  return (
    <>
      <Card>
        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-7 h-7 text-warm-terracotta" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="font-poppins text-2xl md:text-3xl font-bold text-deep-cocoa">
              Galeria de Momentos
            </h2>
          </div>
          
          <p className="text-deep-cocoa/70 mb-6">
            Nossa colecao de memorias especiais
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => openModal(index)}
                className="relative aspect-square rounded-xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-warm-terracotta focus:ring-offset-2"
                aria-label={item.caption}
              >
                <img
                  src={item.media}
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {item.type === 'video' && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <span className="text-white text-2xl">▶</span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </Card>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col"
            onClick={closeModal}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="dialog"
            aria-modal="true"
            aria-label="Visualizador de fotos"
          >
            <div className="flex items-center justify-between p-4 text-white">
              <span className="text-sm font-medium">
                {selectedIndex + 1} / {items.length}
              </span>
              
              <div className="flex items-center gap-2">
                <a
                  href={items[selectedIndex].media}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Download"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
                
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Fechar"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-center relative px-4 md:px-16">
              <motion.img
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                src={items[selectedIndex].media}
                alt={items[selectedIndex].caption}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                onClick={(e) => e.stopPropagation()}
              />

              <button
                onClick={(e) => { e.stopPropagation(); goPrev() }}
                className="absolute left-2 md:left-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Foto anterior"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={(e) => { e.stopPropagation(); goNext() }}
                className="absolute right-2 md:right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Proxima foto"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="p-4">
              <p className="text-white/80 text-center text-sm">
                {items[selectedIndex].caption}
              </p>
              
              <div className="flex justify-center gap-1.5 mt-4 overflow-x-auto py-2">
                {items.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => { e.stopPropagation(); setSelectedIndex(index) }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === selectedIndex 
                        ? 'bg-white w-4' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Ir para foto ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
