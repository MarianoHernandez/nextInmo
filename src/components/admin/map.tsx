"use client"

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

const customIcon = L.divIcon({
  html: `<svg width="36" height="54" viewBox="0 0 36 54" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 0C8.064 0 0 8.064 0 18C0 31.5 18 54 18 54C18 54 36 31.5 36 18C36 8.064 27.936 0 18 0Z" fill="#1D3557"/>
    <path d="M18 9L27 16.5V28.5H24V18L18 14.25L12 18V28.5H9V16.5L18 9Z" fill="white"/>
    <path d="M13.5 19.5H22.5V28.5H13.5V19.5Z" stroke="white" strokeWidth="1.5" fill="#1D3557"/>
    <path d="M16.5 22.5H19.5V28.5H16.5V22.5Z" fill="white"/>
  </svg>`,
  iconSize: [36, 54],
  iconAnchor: [18, 54],
})

function MapEvents({ onLocationChange }: { onLocationChange: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onLocationChange(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

export default function DynamicMap({
  position,
  onLocationChange,
}: {
  position: [number, number]
  onLocationChange: (lat: number, lng: number) => void
}) {
  return (
    <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon} />
      <MapEvents onLocationChange={onLocationChange} />
    </MapContainer>
  )
}
