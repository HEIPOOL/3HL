interface FooterProps {
  user: string
  partner: string
}

export default function Footer({ user, partner }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-deep-cocoa text-soft-cream py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-6">
          <span className="text-4xl">♥</span>
        </div>
        
        <p className="font-poppins text-xl font-semibold mb-2">
          {user} + {partner}
        </p>
        
        <p className="text-soft-cream/60 mb-8">
          3 meses e contando...
        </p>

        <div className="flex justify-center gap-6 mb-8 flex-wrap">
          <a
            href="#tracks"
            className="text-soft-cream/60 hover:text-accent-glow transition-colors text-sm"
          >
            Top Musicas
          </a>
          <a
            href="#moments"
            className="text-soft-cream/60 hover:text-accent-glow transition-colors text-sm"
          >
            Momentos
          </a>
          <a
            href="#artist"
            className="text-soft-cream/60 hover:text-accent-glow transition-colors text-sm"
          >
            Artista do Mês
          </a>
          <a
            href="#gallery"
            className="text-soft-cream/60 hover:text-accent-glow transition-colors text-sm"
          >
            Galeria
          </a>
        </div>

        <div className="pt-8 border-t border-soft-cream/10">
          <p className="text-soft-cream/40 text-sm">
            Feito com muito amor - {currentYear}
          </p>
          <p className="text-soft-cream/30 text-xs mt-2">
            Um presente digital especial
          </p>
        </div>
      </div>
    </footer>
  )
}
