"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface LocationPickerProps {
  value: { lat: number; lng: number }
  onChange: (value: { lat: number; lng: number }) => void
}

// Componente para manejar eventos del mapa
function MapEvents({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [position, setPosition] = useState<[number, number]>([value.lat, value.lng])
  const [searchAddress, setSearchAddress] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  // Crear un icono personalizado para el marcador
  const createCustomIcon = () => {
    return L.divIcon({
      html: `
        <svg width="36" height="54" viewBox="0 0 36 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 0C8.064 0 0 8.064 0 18C0 31.5 18 54 18 54C18 54 36 31.5 36 18C36 8.064 27.936 0 18 0Z" fill="#1D3557"/>
          <path d="M18 9L27 16.5V28.5H24V18L18 14.25L12 18V28.5H9V16.5L18 9Z" fill="white"/>
          <path d="M13.5 19.5H22.5V28.5H13.5V19.5Z" stroke="white" strokeWidth="1.5" fill="#1D3557"/>
          <path d="M16.5 22.5H19.5V28.5H16.5V22.5Z" fill="white"/>
        </svg>
      `,
      className: "",
      iconSize: [36, 54],
      iconAnchor: [18, 54],
      popupAnchor: [0, -48],
    })
  }

  // Actualizar la posición cuando cambia el valor
  useEffect(() => {
    setPosition([value.lat, value.lng])
  }, [value])

  // Manejar cambios de ubicación
  const handleLocationChange = (lat: number, lng: number) => {
    setPosition([lat, lng])
    onChange({ lat, lng })
  }

  // Buscar dirección (simulado)
  const handleSearch = async () => {
    if (!searchAddress.trim()) return

    setIsSearching(true)

    try {
      // Aquí iría la lógica real para geocodificar la dirección
      // Por ahora, simularemos con un timeout y coordenadas aleatorias cercanas a Montevideo
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Coordenadas aleatorias cercanas a Montevideo
      const lat = -34.9 + (Math.random() - 0.5) * 0.1
      const lng = -56.2 + (Math.random() - 0.5) * 0.1

      handleLocationChange(lat, lng)
    } catch (error) {
      console.error("Error al buscar dirección:", error)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Buscar dirección..."
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button type="button" onClick={handleSearch} disabled={isSearching}>
          {isSearching ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="h-[400px] w-full overflow-hidden rounded-md border">
        <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={createCustomIcon()} />
          <MapEvents onLocationChange={handleLocationChange} />
        </MapContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Latitud</label>
          <Input
            type="number"
            step="0.000001"
            value={position[0]}
            onChange={(e) => {
              const lat = Number.parseFloat(e.target.value)
              if (!isNaN(lat)) {
                handleLocationChange(lat, position[1])
              }
            }}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Longitud</label>
          <Input
            type="number"
            step="0.000001"
            value={position[1]}
            onChange={(e) => {
              const lng = Number.parseFloat(e.target.value)
              if (!isNaN(lng)) {
                handleLocationChange(position[0], lng)
              }
            }}
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Haga clic en el mapa para seleccionar la ubicación exacta de la propiedad o ingrese las coordenadas manualmente.
      </p>
    </div>
  )
}
