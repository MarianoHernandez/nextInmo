import { useState } from "react"
import Link from "next/link"
import { Bath, Bed, ChevronLeft, ChevronRight, MapPin, Maximize2 } from 'lucide-react'

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Property, PropertyStatus } from "@/types/property"
import { extractFeatures, formatPrice } from "@/utils/property-utils"

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const features = extractFeatures(property);
  const formattedPrice = formatPrice(property.price, property.status);

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (currentImageIndex < property.imageSrc.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1)
    } else {
      setCurrentImageIndex(0)
    }
  }

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1)
    } else {
      setCurrentImageIndex(property.imageSrc.length - 1)
    }
  }

  return (
    <Link href={`/propiedades/${property.id}`} className="block">
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg">
        <div className="relative">
          <div className="relative h-[270px] w-full overflow-hidden">
            <img
              src={property.imageSrc[currentImageIndex] || "/placeholder.svg?height=300&width=500"}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              className="h-full w-full object-cover"
            />
            
            {property.imageSrc.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-opacity hover:bg-black/70"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-opacity hover:bg-black/70"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                  {property.imageSrc.map((_, index) => (
                    <span 
                      key={index} 
                      className={`h-1.5 w-1.5 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          
          <Badge 
            className="absolute left-3 top-3" 
            variant={property.status.includes(PropertyStatus.ForRent) ? "secondary" : "default"}
          >
            {property.status.includes(PropertyStatus.ForRent) ? "Alquiler" : "Venta"}
          </Badge>
          
          {property.pinned && (
            <Badge className="absolute right-3 top-3" variant="destructive">
              Destacado
            </Badge>
          )}
        </div>
        
        <CardContent className="p-4">
          <div className="mb-2 flex items-center capitalize text-sm text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            <span>{property.address}</span>
          </div>
          
          <h3 className="mb-2 line-clamp-1 text-xl font-semibold">{property.title}</h3>
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{property.shortDescription}</p>
          
          <div className="mb-3 text-xl font-bold text-primary">
            {formattedPrice}
          </div>
          
          <div className="mb-3 flex gap-1 pb-1 scroll-smooth snap-x">
            {features.map((feature, index) => (
              <div key={index} className="snap-start shrink-0">
                <Badge variant="outline" className="bg-primary/5 whitespace-nowrap">
                  {feature}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t p-4">
          <div className="flex items-center gap-4">
            {property.type === "house" && property.rooms !== undefined && (
              <div className="flex items-center text-sm">
                <Bed className="mr-1 h-4 w-4" />
                <span>{property.rooms} {property.rooms === 1 ? 'Dorm' : 'Dorms'}</span>
              </div>
            )}
            
            {property.type === "house" && property.bathrooms !== undefined && (
              <div className="flex items-center text-sm">
                <Bath className="mr-1 h-4 w-4" />
                <span>{property.bathrooms} {property.bathrooms === 1 ? 'Baño' : 'Baños'}</span>
              </div>
            )}
            
            {property.area && (
              <div className="flex items-center text-sm">
                <Maximize2 className="mr-1 h-4 w-4" />
                <span>{property.area} m²</span>
              </div>
            )}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
