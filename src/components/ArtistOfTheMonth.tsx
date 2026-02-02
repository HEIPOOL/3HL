import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from './Shared/Card'
import Button from './Shared/Button'

interface ArtistOfTheMonthProps {
  name: string
  user: string
}

export default function ArtistOfTheMonth({ name, user }: ArtistOfTheMonthProps) {
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const defaultMessage = `${name}, você é a artista do mês, do ano e da minha vida! Obrigado por cada momento, cada risada e cada "bom dia amor". Eu Te amo muito, minha ratinha! - ${user}`

  const handleCopy = () => {
    const textToCopy = message || defaultMessage
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-br from-warm-terracotta to-muted-teal p-1">
            <div className="bg-soft-cream rounded-[14px] p-6 md:p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-warm-terracotta/30 to-muted-teal/30 p-1">
                    <img 
                      src="https://i.ibb.co/P2Dnbf2/IMG-20251226-WA0039.jpg"
                      alt={name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-warm-terracotta text-white px-4 py-1 rounded-full text-sm font-medium shadow-lg">
                    #1 do Mês
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <p className="text-muted-teal font-medium mb-2">Artista do Mês</p>
                  <h2 className="font-poppins text-3xl md:text-4xl font-bold text-deep-cocoa mb-4">
                    {name}
                  </h2>
                  <p className="text-deep-cocoa/70 mb-6 max-w-md">
                    A pessoa que transforma dias comuns em momentos especiais. 
                    Dona do sorriso mais lindo e das melhores ideias de programa.
                    Artista favorita em todas as playlists da vida.
                  </p>
                  
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                    <span className="px-3 py-1 bg-accent-glow/30 text-deep-cocoa rounded-full text-sm">
                      Risadas garantidas
                    </span>
                    <span className="px-3 py-1 bg-muted-teal/20 text-deep-cocoa rounded-full text-sm">
                      Carinho infinito
                    </span>
                    <span className="px-3 py-1 bg-warm-terracotta/20 text-deep-cocoa rounded-full text-sm">
                      Melhor companhia
                    </span>
                  </div>

                  <Button 
                    variant="primary"
                    onClick={() => setShowMessage(true)}
                  >
                    Mensagem para {name}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setShowMessage(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-soft-cream rounded-card max-w-lg w-full p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-poppins font-semibold text-xl text-deep-cocoa">
                  Mensagem para {name}
                </h3>
                <button
                  onClick={() => setShowMessage(false)}
                  className="p-2 hover:bg-deep-cocoa/10 rounded-full transition-colors"
                  aria-label="Fechar"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={defaultMessage}
                className="w-full h-40 p-4 rounded-xl border border-deep-cocoa/20 bg-white/50 resize-none focus:outline-none focus:ring-2 focus:ring-warm-terracotta/50 text-deep-cocoa placeholder:text-deep-cocoa/40"
                aria-label="Escreva sua mensagem"
              />

              <div className="flex gap-3 mt-4">
                <Button
                  variant="secondary"
                  onClick={handleCopy}
                  className="flex-1"
                >
                  {copied ? 'Copiado!' : 'Copiar mensagem'}
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    const text = encodeURIComponent(message || defaultMessage)
                    window.open(`https://wa.me/5589981175885?text=${text}`, '_blank')
                  }}
                  className="flex-1"
                >
                  Enviar no WhatsApp
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
