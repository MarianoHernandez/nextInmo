// app/propiedad/[id]/page.tsx
'use client'

import PropertyDetail from '@/components/property-detail'
import { useProperties } from '@/context/PropertyContext'
import { useParams } from 'next/navigation'
import { notFound } from "next/navigation"

export default function PdpPage() {
  const params = useParams()
  const id = params?.id
  const { allProperties } = useProperties()
  const property = allProperties.find((property) => property.id === Number(id))
  
  if (!property) {
    notFound()
  }
  return (
    <PropertyDetail property={property}/>
  )
}
