import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import Button from './Shared/Button'

interface HeroWrappedProps {
  user: string
  partner: string
  months: number
}

export default function HeroWrapped({ user, partner, months }: HeroWrappedProps) {
  const [showVideo, setShowVideo] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  // Pré-carrega o vídeo quando o componente monta
  useEffect(() => {
    if (!videoRef.current) return
    
    const video = videoRef.current
    video.preload = 'auto'
    video.load()
    
    const handleLoaded = () => {
      setVideoLoaded(true)
    }
    
    video.addEventListener('loadeddata', handleLoaded)
    
    return () => {
      video.removeEventListener('loadeddata', handleLoaded)
    }
  }, [])

  // Bloqueia scroll quando modal está aberto
  useEffect(() => {
    if (showVideo) {
      document.body.style.overflow = 'hidden'
      // Tenta iniciar o vídeo quando o modal abre
      setTimeout(() => {
        if (videoRef.current && !videoRef.current.paused) return
        
        const playPromise = videoRef.current?.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
              console.log('Vídeo iniciado automaticamente')
            })
            .catch(error => {
              console.log('Autoplay bloqueado:', error)
              // Mostra o botão de play para interação do usuário
            })
        }
      }, 100)
    } else {
      document.body.style.overflow = 'unset'
      setIsPlaying(false)
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showVideo])

  const handlePlayHighlights = () => {
    setShowVideo(true)
  }

  const handleUserPlay = async () => {
    if (!videoRef.current) return
    
    try {
      if (videoRef.current.paused) {
        await videoRef.current.play()
        setIsPlaying(true)
        console.log('Vídeo iniciado por interação do usuário')
        
        // Se for a primeira interação e o som estava desabilitado, tenta ativar
        if (!soundEnabled) {
          // Tenta habilitar som após interação do usuário
          videoRef.current.muted = false
          const playWithSound = videoRef.current.play()
          if (playWithSound !== undefined) {
            playWithSound
              .then(() => {
                setSoundEnabled(true)
                console.log('Som ativado após interação')
              })
              .catch(() => {
                // Mantém mudo se não conseguir
                videoRef.current!.muted = true
              })
          }
        }
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    } catch (error) {
      console.error('Erro ao controlar vídeo:', error)
    }
  }

  const handleCloseVideo = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(console.error)
    }
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setIsPlaying(false)
    }
    setShowVideo(false)
    setIsFullscreen(false)
  }

  const toggleSound = () => {
    if (!videoRef.current) return
    
    const newSoundState = !soundEnabled
    videoRef.current.muted = !newSoundState
    setSoundEnabled(newSoundState)
    
    // Se estiver ativando o som e o vídeo não está tocando, inicia
    if (newSoundState && videoRef.current.paused) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(console.error)
    }
  }

  const toggleFullscreen = async () => {
    if (!videoContainerRef.current) return

    try {
      if (!document.fullscreenElement) {
        await videoContainerRef.current.requestFullscreen()
        setIsFullscreen(true)
      } else {
        await document.exitFullscreen()
        setIsFullscreen(false)
      }
    } catch (err) {
      console.error('Erro ao alternar tela cheia:', err)
    }
  }

  const handleFullscreenChange = () => {
    const fullscreenElement = document.fullscreenElement
    setIsFullscreen(!!fullscreenElement)
  }

  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && showVideo) {
        handleCloseVideo()
      }
    })

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [showVideo])

  // Fecha modal ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && showVideo) {
        handleCloseVideo()
      }
    }

    if (showVideo) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showVideo])

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-warm-terracotta/20 via-soft-cream to-muted-teal/20"
        aria-hidden="true"
      />
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-warm-terracotta rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-muted-teal rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 text-center px-4 py-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-warm-terracotta to-muted-teal rounded-full animate-pulse" />
            <div className="absolute inset-1 bg-soft-cream rounded-full flex items-center justify-center">
              <span className="text-3xl md:text-4xl">♥</span>
            </div>
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-poppins text-3xl md:text-6xl font-bold text-deep-cocoa mb-3 md:mb-4 px-2"
        >
          {months} meses de nós
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-poppins text-xl md:text-3xl text-warm-terracotta mb-4 md:mb-6"
        >
          {user} ♥ {partner}
        </motion.p>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-deep-cocoa/70 text-base md:text-xl max-w-md mx-auto mb-8 md:mb-10 px-4"
        >
          Top músicas, momentos que marcaram e um destaque especial — tudo em um wrapped só nosso.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4"
        >
          <Button 
            variant="primary"
            onClick={() => document.getElementById('tracks')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full sm:w-auto"
          >
            Ver meu Wrapped
          </Button>
          <Button 
            variant="secondary"
            onClick={handlePlayHighlights}
            className="w-full sm:w-auto"
          >
            Tocar highlights
          </Button>
        </motion.div>

        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 md:p-4"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            <div 
              ref={modalRef}
              className={`
                bg-soft-cream relative
                ${isFullscreen 
                  ? 'w-full h-full rounded-none' 
                  : 'rounded-2xl md:rounded-card w-full max-w-4xl max-h-[90vh]'
                }
                flex flex-col overflow-hidden
              `}
              onClick={e => e.stopPropagation()}
            >
              {/* Header do modal */}
              <div className={`
                flex justify-between items-center p-3 md:p-4 border-b border-deep-cocoa/10
                ${isFullscreen ? 'absolute top-0 left-0 right-0 z-10 bg-black/80 backdrop-blur-sm' : ''}
              `}>
                <h3 className={`font-poppins font-semibold ${
                  isFullscreen ? 'text-white text-sm md:text-base' : 'text-deep-cocoa text-base md:text-lg'
                }`}>
                  {isFullscreen ? 'Tela cheia - Pressione ESC para sair' : 'Highlights'}
                </h3>
                
                <div className="flex items-center gap-1 md:gap-2">
                  {/* Botão tela cheia */}
                  <button
                    onClick={toggleFullscreen}
                    className={`p-2 rounded-full transition-all active:scale-95 ${
                      isFullscreen 
                        ? 'hover:bg-white/20 text-white' 
                        : 'hover:bg-deep-cocoa/10 text-deep-cocoa'
                    }`}
                    aria-label={isFullscreen ? 'Sair da tela cheia' : 'Tela cheia'}
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {isFullscreen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5a.75.75 0 00-1.5 0V9H4.5a.75.75 0 000 1.5H7.5v4.5a.75.75 0 001.5 0V10.5h3a.75.75 0 000-1.5H9zM15 9h3.75a.75.75 0 000-1.5H15v4.5a.75.75 0 001.5 0V9z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
                      )}
                    </svg>
                  </button>
                  
                  {/* Botão fechar */}
                  <button
                    onClick={handleCloseVideo}
                    className={`p-2 rounded-full transition-all active:scale-95 ${
                      isFullscreen 
                        ? 'hover:bg-white/20 text-white' 
                        : 'hover:bg-deep-cocoa/10 text-deep-cocoa'
                    }`}
                    aria-label="Fechar"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Container do vídeo */}
              <div 
                ref={videoContainerRef}
                className={`
                  relative flex-1 flex items-center justify-center bg-black
                  ${!isFullscreen ? 'max-h-[calc(90vh-80px)]' : ''}
                `}
                onClick={handleUserPlay}
              >
                {/* Elemento de vídeo - sempre presente mas oculto até carregar */}
                <video
                  ref={videoRef}
                  className="w-full h-full object-contain"
                  src="/images/videos/hero.mp4"
                  loop
                  muted={!soundEnabled}
                  playsInline
                  controls={false}
                  preload="auto"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onLoadedData={() => setVideoLoaded(true)}
                  onEnded={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = 0
                      videoRef.current.play()
                    }
                  }}
                />
                
                {/* Botão de play overlay - aparece se o vídeo não está tocando */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <button
                      onClick={handleUserPlay}
                      className="p-4 rounded-full transition-transform active:scale-95"
                      aria-label="Tocar vídeo"
                    >
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-warm-terracotta/80 rounded-full flex items-center justify-center animate-pulse">
                        <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        </svg>
                      </div>
                      <p className="text-white text-sm mt-2">Toque para iniciar</p>
                    </button>
                  </div>
                )}
                
                {/* Overlay de controles para tela cheia */}
                {isFullscreen && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 md:gap-4 bg-black/80 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleUserPlay()
                      }}
                      className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all active:scale-95"
                    >
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isPlaying ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        )}
                      </svg>
                      <span className="text-xs md:text-sm">{isPlaying ? 'Pausar' : 'Tocar'}</span>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleSound()
                      }}
                      className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full transition-all active:scale-95 ${
                        soundEnabled ? 'bg-muted-teal text-white' : 'bg-white/20 text-white'
                      }`}
                      aria-pressed={soundEnabled}
                    >
                      <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {soundEnabled ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zm9.414-3l2.828-2.828m0 5.656L15 12" />
                        )}
                      </svg>
                      <span className="text-xs md:text-sm">{soundEnabled ? 'Som ON' : 'Som OFF'}</span>
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        if (videoRef.current) {
                          videoRef.current.currentTime = 0
                          videoRef.current.play()
                        }
                      }}
                      className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all active:scale-95"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="text-sm">Reiniciar</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Controles inferiores (modo normal) */}
              {!isFullscreen && (
                <div className="border-t border-deep-cocoa/10 p-3 md:p-4">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-3">
                    <div className="w-full md:w-auto">
                      <button
                        onClick={toggleSound}
                        className={`
                          flex items-center justify-center gap-2 px-4 py-3 md:py-2 rounded-xl md:rounded-full 
                          transition-all active:scale-95 w-full md:w-auto
                          ${soundEnabled 
                            ? 'bg-muted-teal text-white' 
                            : 'bg-deep-cocoa/10 text-deep-cocoa'
                          }
                        `}
                        aria-pressed={soundEnabled}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {soundEnabled ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zm9.414-3l2.828-2.828m0 5.656L15 12" />
                          )}
                        </svg>
                        <span className="text-sm md:text-base">{soundEnabled ? 'Som ativado' : 'Ativar som'}</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-2 md:gap-4">
                      <div className="flex items-center gap-2 text-sm text-deep-cocoa/60">
                        <span className="text-xs md:text-sm">Toque no vídeo para controlar</span>
                      </div>
                      
                      <button
                        onClick={toggleFullscreen}
                        className="flex items-center justify-center gap-2 px-4 py-3 md:py-2 rounded-xl md:rounded-full bg-deep-cocoa/10 text-deep-cocoa hover:bg-deep-cocoa/20 transition-all active:scale-95"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5h-4m4 0v-4m0 4l-5-5" />
                        </svg>
                        <span className="text-sm md:text-base hidden sm:inline">Tela cheia</span>
                        <span className="text-sm md:text-base sm:hidden">Cheia</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Instrução para fechar no mobile */}
            {!isFullscreen && (
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white/60 text-xs">Toque fora da área do vídeo para fechar</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
