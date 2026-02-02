import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Moment } from '@/types'
import { formatDate } from '@/utils/format'
import Card from './Shared/Card'

interface MomentsTimelineProps {
  moments: Moment[]
  onImageClick: (index: number) => void
}

export default function MomentsTimeline({ moments, onImageClick }: MomentsTimelineProps) {
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null)

  const isVideo = (media: string) => media.includes('.mp4')

  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-poppins text-2xl md:text-3xl font-bold text-deep-cocoa mb-2 text-center"
      >
        Momentos Especiais
      </motion.h2>
      <p className="text-deep-cocoa/60 mb-12 text-center">Nossa historia em capitulos</p>

      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-warm-terracotta/20 transform md:-translate-x-1/2" />

        <div className="space-y-8 md:space-y-12">
          {moments.map((moment, index) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative flex items-start gap-4 md:gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-warm-terracotta rounded-full transform -translate-x-1/2 mt-6 z-10 ring-4 ring-soft-cream" />

              <div className={`flex-1 ml-10 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <Card className="inline-block text-left w-full max-w-md overflow-hidden">
                  <button
                    onClick={() => setSelectedMoment(moment)}
                    className="w-full text-left focus:outline-none focus:ring-2 focus:ring-warm-terracotta focus:ring-inset rounded-card"
                    aria-label={`Ver detalhes: ${moment.title}`}
                  >
                    {!isVideo(moment.media) && (
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={moment.media}
                          alt={moment.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                    )}
                    {isVideo(moment.media) && (
                      <div className="relative h-48 bg-deep-cocoa/10 flex items-center justify-center">
                        <div className="w-16 h-16 bg-warm-terracotta/80 rounded-full flex items-center justify-center">
                          <span className="text-white text-2xl ml-1">▶</span>
                        </div>
                      </div>
                    )}
                    <div className="p-5">
                      <time className="text-sm text-muted-teal font-medium">
                        {formatDate(moment.date)}
                      </time>
                      <h3 className="font-poppins font-semibold text-lg text-deep-cocoa mt-1">
                        {moment.title}
                      </h3>
                      <p className="text-deep-cocoa/70 mt-2 text-sm">
                        {moment.desc}
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-warm-terracotta text-sm">
                        <span>Ver mais</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </button>
                </Card>
              </div>

              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setSelectedMoment(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-soft-cream rounded-card max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="relative">
                {isVideo(selectedMoment.media) ? (
                  <div className="aspect-video bg-deep-cocoa/10 flex items-center justify-center">
                    <video
                      controls
                      className="w-full h-full object-cover rounded-t-card"
                    >
                      <source src={selectedMoment.media} type="video/mp4" />
                      <p className="text-deep-cocoa/50 p-8">Video nao disponivel</p>
                    </video>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={selectedMoment.media}
                      alt={selectedMoment.title}
                      className="w-full max-h-[60vh] object-contain bg-deep-cocoa/5 rounded-t-card"
                    />
                  </div>
                )}

                <button
                  onClick={() => setSelectedMoment(null)}
                  className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
                  aria-label="Fechar"
                >
                  <svg className="w-5 h-5 text-deep-cocoa" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <time className="text-sm text-muted-teal font-medium">
                  {formatDate(selectedMoment.date)}
                </time>
                <h3 className="font-poppins font-bold text-2xl text-deep-cocoa mt-2">
                  {selectedMoment.title}
                </h3>
                <p className="text-deep-cocoa/80 mt-4 leading-relaxed">
                  {selectedMoment.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
