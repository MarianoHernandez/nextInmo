'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import PropertyDetail from '@/components/property-detail'
import { useProperties } from '@/context/PropertyContext'

export default function PropertyDetailWrapper() {
  const params = useParams()
  const id = params?.id
  const { allProperties, reloadProperties } = useProperties()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const load = async () => {
        console.log('Loading property detail')
      if (!allProperties || allProperties.length === 0) {

        setIsLoading(true)
        console.log('allProperties is empty, reloading properties')
        await reloadProperties()
        setIsLoading(false)
      }
    }
    console.log('useEffect triggered')

    load()
  }, [])

  const property = allProperties.find((p) => p.id === Number(id))

  if (!property && !isLoading) {
    notFound()
  }

  if (isLoading || !property) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center text-muted-foreground">
        Cargando propiedad...
      </div>
    )
  }

  return <PropertyDetail property={property} />
}
