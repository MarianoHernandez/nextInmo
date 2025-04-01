// app/buscar/page.tsx
'use client'

import { useSearchParams } from 'next/navigation'

export default function BuscarPage() {
  const params = useSearchParams()

  const searchText = params.get('q')
  const location = params.get('ubicacion')
  const type = params.get('tipo')
  const rooms = params.get('dormitorios')
  const baths = params.get('banos')
  const garage = params.get('garage')
  const pool = params.get('piscina')
  const precioMin = params.get('precioMin')
  const precioMax = params.get('precioMax')
  const areaMin = params.get('areaMin')
  const areaMax = params.get('areaMax')

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resultados de búsqueda</h1>

      <div className="text-sm text-muted-foreground mb-4">
        <p><strong>Texto:</strong> {searchText || '---'}</p>
        <p><strong>Ubicación:</strong> {location || '---'}</p>
        <p><strong>Tipo:</strong> {type || '---'}</p>
        <p><strong>Dormitorios:</strong> {rooms || '---'}</p>
        <p><strong>Baños:</strong> {baths || '---'}</p>
        <p><strong>Garaje:</strong> {garage || '---'}</p>
        <p><strong>Piscina:</strong> {pool || '---'}</p>
        <p><strong>Precio:</strong> ${precioMin} - ${precioMax}</p>
        <p><strong>Área:</strong> {areaMin} - {areaMax} m²</p>
      </div>

      {/* Aquí podrías hacer fetch de propiedades filtradas y mostrarlas */}
    </div>
  )
}
