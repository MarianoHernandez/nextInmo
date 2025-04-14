"use client"

import { useEffect, useRef } from "react"
import L from "leaflet"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

interface PropertyMapProps {
  lat: number
  lng: number
  address: string
}

export default function PropertyMap({ lat, lng, address }: PropertyMapProps) {
  const mapRef = useRef<L.Map | null>(null)

  // Solucionar el problema de los iconos de Leaflet en Next.js
  useEffect(() => {
    // Asegurarse de que el código solo se ejecute en el cliente
    const L = require("leaflet")
    
    delete L.Icon.Default.prototype._getIconUrl
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/marker-icon-2x.png",
      iconUrl: "/marker-icon.png",
      shadowUrl: "/marker-shadow.png",
    })
  }, [])

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      style={{ height: "100%", width: "100%" }}
      ref={mapRef}
      scrollWheelZoom={false}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]}>
        <Popup>
          <div className="p-1">
            <p className="font-semibold">{address}</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  )
}
