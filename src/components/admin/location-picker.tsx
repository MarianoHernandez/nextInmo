"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface LocationPickerProps {
  value: { lat: number; lng: number }
  onChange: (value: { lat: number; lng: number }) => void
}

// Import dinámico del mapa, desactivando el SSR
const DynamicMap = dynamic(() => import("./map"), { ssr: false })

export function LocationPicker({ value, onChange }: LocationPickerProps) {
  const [position, setPosition] = useState<[number, number]>([value.lat, value.lng])
  const [searchAddress, setSearchAddress] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  useEffect(() => {
    setPosition([value.lat, value.lng])
  }, [value])

  const handleLocationChange = (lat: number, lng: number) => {
    setPosition([lat, lng])
    onChange({ lat, lng })
  }

  const handleSearch = async () => {
    if (!searchAddress.trim()) return
    setIsSearching(true)
    try {
      await new Promise((r) => setTimeout(r, 1000))
      const lat = -34.9 + (Math.random() - 0.5) * 0.1
      const lng = -56.2 + (Math.random() - 0.5) * 0.1
      handleLocationChange(lat, lng)
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
        <DynamicMap position={position} onLocationChange={handleLocationChange} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Latitud</label>
          <Input
            type="number"
            step="0.000001"
            value={position[0]}
            onChange={(e) => {
              const lat = parseFloat(e.target.value)
              if (!isNaN(lat)) handleLocationChange(lat, position[1])
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
              const lng = parseFloat(e.target.value)
              if (!isNaN(lng)) handleLocationChange(position[0], lng)
            }}
          />
        </div>
      </div>
    </div>
  )
}
