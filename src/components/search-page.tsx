'use client'

import { useProperties } from '@/context/PropertyContext'
import PropertyCard from '@/components/property-card'
import AsideSearch from '@/components/aside'
import { SimpleTitle } from '@/components/simple-title'
import { useFilters } from '@/context/filters-context'
import { OrderSelect } from './order-filter'

export default function SearchPageContent() {
  const { allProperties } = useProperties()
  const { filters } = useFilters()

  const filteredProperties = allProperties.filter((property) => {
    const matchesText =
      property.title.toLowerCase().includes(filters.searchText.toLowerCase()) ||
      property.shortDescription?.toLowerCase().includes(filters.searchText.toLowerCase())

    const matchesLocation =
      filters.location === 'cualquiera' ||
      filters.location === '' ||
      property.neighborhood.toLowerCase() === filters.location.toLowerCase()

    const matchesType = !filters.type || filters.type === 'any' || property.type === filters.type
    const matchesDormitorios =
      (property.rooms ?? 0) >= filters.dormitoriosMin && (property.rooms ?? 0) <= filters.dormitoriosMax
    const matchesBaths = (property.bathrooms ?? 0) >= filters.bathsMin && (property.rooms ?? 0) <= filters.bathsMax
    const matchesGarage = property.garage === filters.garage
    const matchesPool = property.pool === filters.pool
    const matchesPrice = property.price >= filters.precioMin && property.price <= filters.precioMax
    const matchesArea = (property.area ?? 0) >= filters.areaMin && (property.area ?? 0) <= filters.areaMax

    return (
      matchesText &&
      matchesLocation &&
      matchesType &&
      matchesDormitorios &&
      matchesBaths &&
      matchesGarage &&
      matchesPool &&
      matchesPrice &&
      matchesArea
    )
  })

  switch (filters.orderBy) {
    case 'price-asc':
      filteredProperties.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      filteredProperties.sort((a, b) => b.price - a.price)
      break
    case 'date-asc':
      filteredProperties.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      break
    case 'date-desc':
      filteredProperties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      break
    case 'area-desc':
      filteredProperties.sort((a, b) => (b.area ?? 0) - (a.area ?? 0))
      break
    case 'area-asc':
      filteredProperties.sort((a, b) => (a.area ?? 0) - (b.area ?? 0))
      break

  }

  return (
    <div className="container mx-auto p-4 nav_padding">
      <SimpleTitle title="Ventas" />
      <div className="w-full flex justify-end mb-4">
        <OrderSelect />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mt-6">

        <AsideSearch />
        
        <section className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))
          ) : (
            <p>No se encontraron propiedades con los filtros aplicados.</p>
          )}
        </section>
      </div>
    </div>
  )
}
