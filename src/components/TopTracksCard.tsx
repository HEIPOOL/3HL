import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Track } from '@/types'
import Card from './Shared/Card'
import FakeChart from './FakeChart'

interface TopTracksCardProps {
  tracks: Track[]
}

export default function TopTracksCard({ tracks }: TopTracksCardProps) {
  const [playingTrack, setPlayingTrack] = useState<number | null>(null)
  const [audioError, setAudioError] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handlePlay = (rank: number, preview: string) => {
    // Verifica se é um placeholder ou URL inválida
    if (!preview || preview.includes('placeholder') || preview.trim() === '') {
      setAudioError(rank)
      return
    }

    if (playingTrack === rank) {
      audioRef.current?.pause()
      setPlayingTrack(null)
      return
    }

    if (audioRef.current) {
      audioRef.current.pause()
    }

    // Tenta criar o áudio
    try {
      const audio = new Audio(preview)
      audio.volume = 0.5
      audioRef.current = audio

      audio.play().then(() => {
        setPlayingTrack(rank)
        setAudioError(null)
      }).catch((error) => {
        console.error('Erro ao reproduzir áudio:', error)
        setAudioError(rank)
        setPlayingTrack(null)
      })

      audio.onended = () => setPlayingTrack(null)
      audio.onerror = () => {
        setAudioError(rank)
        setPlayingTrack(null)
      }
    } catch (error) {
      console.error('Erro ao criar áudio:', error)
      setAudioError(rank)
      setPlayingTrack(null)
    }
  }

  // Verifica se a URL do preview é válida
  const isValidAudioUrl = (url: string) => {
    if (!url || url.trim() === '') return false
    if (url.includes('placeholder')) return false
    if (!url.startsWith('http') && !url.startsWith('/audio/')) return false
    return true
  }

  const maxPlays = Math.max(...tracks.map(t => t.plays))

  return (
    <Card>
      <div className="p-6 md:p-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-poppins text-2xl md:text-3xl font-bold text-deep-cocoa mb-2"
        >
          Top Músicas
        </motion.h2>
        <p className="text-deep-cocoa/60 mb-8">As trilhas sonoras dos nossos momentos</p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="order-2 md:order-1">
            <FakeChart tracks={tracks} />
          </div>

          <div className="order-1 md:order-2 space-y-3">
            {tracks.map((track, index) => {
              const hasValidAudio = isValidAudioUrl(track.preview)
              const isPlaying = playingTrack === track.rank
              
              return (
                <motion.div
                  key={track.rank}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-3 rounded-xl transition-colors ${
                    isPlaying 
                      ? 'bg-warm-terracotta/10 border border-warm-terracotta/20' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                >
                  <span className="font-poppins font-bold text-2xl text-warm-terracotta w-8">
                    {track.rank}
                  </span>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-deep-cocoa truncate">{track.title}</h3>
                    <p className="text-sm text-deep-cocoa/60 truncate">{track.artist}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="hidden sm:block">
                      <div className="h-2 w-20 bg-deep-cocoa/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(track.plays / maxPlays) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-warm-terracotta to-muted-teal"
                        />
                      </div>
                      <p className="text-xs text-deep-cocoa/50 mt-1">{track.plays} plays</p>
                    </div>

                    {hasValidAudio ? (
                      <button
                        onClick={() => handlePlay(track.rank, track.preview)}
                        disabled={audioError === track.rank}
                        className={`p-2 rounded-full transition-colors ${
                          isPlaying 
                            ? 'bg-warm-terracotta text-white animate-pulse' 
                            : audioError === track.rank
                              ? 'bg-deep-cocoa/5 text-deep-cocoa/30 cursor-not-allowed'
                              : 'bg-deep-cocoa/10 text-deep-cocoa hover:bg-warm-terracotta/20'
                        }`}
                        aria-label={isPlaying ? `Pausar ${track.title}` : `Tocar ${track.title}`}
                      >
                        {isPlaying ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                          </svg>
                        ) : audioError === track.rank ? (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 5-5v10zm2 0V7l5 5-5 5z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="p-2 rounded-full bg-deep-cocoa/5 text-deep-cocoa/30 cursor-not-allowed"
                        aria-label="Prévia indisponível"
                        title="Prévia indisponível - Adicione um arquivo de áudio em /public/audio/"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 5-5v10zm2 0V7l5 5-5 5z" />
                        </svg>
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}

            {audioError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-warm-terracotta text-center mt-4 p-3 bg-warm-terracotta/10 rounded-lg"
              >
                <p>⚠️ Algumas prévias podem não estar disponíveis.</p>
                <p className="text-xs mt-1 text-deep-cocoa/60">
                  Para ouvir as músicas, adicione arquivos de áudio em /public/audio/ e atualize as URLs nas músicas.
                </p>
              </motion.div>
            )}

            <div className="text-xs text-deep-cocoa/40 text-center mt-4 p-2 bg-deep-cocoa/5 rounded">
              <p>🎵 <strong>Para adicionar músicas reais:</strong></p>
              <p className="mt-1">1. Coloque arquivos .mp3 em /public/audio/</p>
              <p>2. Atualize as URLs no arquivo de dados das músicas</p>
              <p>Exemplo: preview: "/audio/nome-da-musica.mp3"</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
