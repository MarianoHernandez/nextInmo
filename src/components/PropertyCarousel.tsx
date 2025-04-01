"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import PropertyCard from "./PropertyCard"
import { Property } from "@/types/property"

interface PropertyCarouselProps {
  properties: Property[]
}

export function PropertyCarousel({ properties }: PropertyCarouselProps) {
  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {properties.map((property) => (
            <CarouselItem key={property.id} className="pl-1 basis-full md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <PropertyCard property={property} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm border-2 border-primary/20 hover:bg-background hover:border-primary/50 hidden sm:flex" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-background/80 backdrop-blur-sm border-2 border-primary/20 hover:bg-background hover:border-primary/50 hidden sm:flex" />
      </Carousel>

      {/* Botones de navegación más grandes para móviles */}
      <div className="flex justify-between mt-4 sm:hidden">
        <button
          onClick={() => document.querySelector("[data-carousel-prev]")}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground"
          aria-label="Anterior"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={() => document.querySelector("[data-carousel-next]")}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground"
          aria-label="Siguiente"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  )
}

