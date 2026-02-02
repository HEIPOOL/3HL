import Head from 'next/head'
import { GetStaticProps } from 'next'
import { TracksData, MomentsData, GalleryData } from '@/types'
import Header from '@/components/Header'
import HeroWrapped from '@/components/HeroWrapped'
import TopTracksCard from '@/components/TopTracksCard'
import MomentsTimeline from '@/components/MomentsTimeline'
import ArtistOfTheMonth from '@/components/ArtistOfTheMonth'
import PhotoGallery from '@/components/PhotoGallery'
import GalleryModal from '@/components/GalleryModal'
import Footer from '@/components/Footer'
import { useState } from 'react'

interface HomeProps {
  tracksData: TracksData
  momentsData: MomentsData
  galleryData: GalleryData
}

export default function Home({ tracksData, momentsData, galleryData }: HomeProps) {
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)

  const galleryImages = momentsData.moments
    .filter(m => !m.media.includes('.mp4'))
    .map(m => m.media)

  const openGallery = (index: number) => {
    setGalleryIndex(index)
    setGalleryOpen(true)
  }

  return (
    <>
      <Head>
        <title>Heitor &amp; Livia — Wrapped: 3 meses</title>
        <meta 
          name="description" 
          content="O nosso Wrapped dos 3 meses — músicas, momentos e a artista do mês: Livia. Um presente digital interativo." 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Heitor & Livia — Wrapped: 3 meses" />
        <meta property="og:description" content="O nosso Wrapped dos 3 meses — músicas, momentos e a artista do mês: Livia." />
        <meta property="og:type" content="website" />
      </Head>

      <div className="min-h-screen bg-soft-cream">
        <Header user={tracksData.user} partner={tracksData.partner} />
        
        <main>
          <HeroWrapped 
            user={tracksData.user} 
            partner={tracksData.partner} 
            months={tracksData.months} 
          />
          
          <section id="tracks" className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <TopTracksCard tracks={tracksData.topTracks} />
            </div>
          </section>
          
          <section id="moments" className="py-16 px-4 bg-white/50">
            <div className="max-w-4xl mx-auto">
              <MomentsTimeline 
                moments={momentsData.moments} 
                onImageClick={openGallery}
              />
            </div>
          </section>
          
          <section id="artist" className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <ArtistOfTheMonth 
                name={tracksData.partner}
                user={tracksData.user}
              />
            </div>
          </section>

          <section id="gallery" className="py-16 px-4 bg-white/50">
            <div className="max-w-6xl mx-auto">
              <PhotoGallery items={galleryData.items} />
            </div>
          </section>
        </main>

        <Footer user={tracksData.user} partner={tracksData.partner} />

        <GalleryModal
          images={galleryImages}
          isOpen={galleryOpen}
          currentIndex={galleryIndex}
          onClose={() => setGalleryOpen(false)}
          onNavigate={setGalleryIndex}
        />
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const tracksData = await import('../../public/data/tracks.json').then(m => m.default) as TracksData
  const momentsData = await import('../../public/data/moments.json').then(m => m.default) as MomentsData
  const galleryData = await import('../../public/data/gallery.json').then(m => m.default) as GalleryData
  
  return {
    props: {
      tracksData,
      momentsData,
      galleryData,
    },
  }
}
