'use client'

import { useProperties } from '@/context/PropertyContext'
import PropertyCard from '@/components/property-card'
import AsideSearch from '@/components/aside'
import { SimpleTitle } from '@/components/simple-title'
import { useFilters } from '@/context/filters-context'

export default function BuscarPageContent() {
  const { allProperties } = useProperties()
  const { filters } = useFilters()

  console.log('Filters:', filters)

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

  return (
    <div className="container mx-auto p-4 nav_padding">
      <SimpleTitle title="Ventas" />

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
