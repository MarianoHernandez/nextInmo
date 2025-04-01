'use client'

import HomeVideo from '@/components/HomeVideo'
import HomeCarousel from '@/components/HomeCarousel'
import VideoCarousel from '@/components/video-carousel'
import SimplePropertyMap from '@/components/map-home'
import AgentHome from '@/components/nosotros'
import { SearchFilters } from '@/components/search-filters'
import { useProperties } from '@/context/PropertyContext'

export default function Home() {
  const { homeProperties, allProperties, loading } = useProperties()

  return (
    <div>
      <HomeVideo />
      <div className="container mx-auto py-10 px-4">
        <SearchFilters />

        {!loading && (
          <>
            <HomeCarousel properties={homeProperties.properties} title="Propiedades" />
            <HomeCarousel
              properties={homeProperties.land}
              title="Terrenos"
            />

            <VideoCarousel
              videos={[
                {
                  id: '1',
                  title: 'Ven a conocer nuestra fauna',
                  url: '/videos/pajaros.mp4',
                  thumbnail: '/images/thumbnail1.jpg',
                },
                {
                  id: '2',
                  title: 'Lo simplemente hermoso de nuestro país',
                  url: '/videos/barcofaro.mp4',
                  thumbnail: '/images/thumbnail1.jpg',
                },
                {
                  id: '3',
                  title: 'Conoce nuestros deportes',
                  url: '/videos/surf.mp4',
                  thumbnail: '/images/thumbnail1.jpg',
                },
                {
                  id: '4',
                  title: 'Ven a conocer nuestra fauna',
                  url: '/videos/volando.mp4',
                  thumbnail: '/images/thumbnail1.jpg',
                },
              ]}
            />
            
            <HomeCarousel
              properties={homeProperties.pinned}
              title="Nuestras destacadas"
            />

            <SimplePropertyMap properties={allProperties} />
          </>
        )}

        <AgentHome />
      </div>
    </div>
  )
}
