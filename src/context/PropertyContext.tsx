'use client'

import { BASE_URL } from '@/constants/constants'
import { Home } from '@/types/home'
import { Property } from '@/types/property'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type PropertyContextType = {
  allProperties: Property[]
  homeProperties: Home
  loading: boolean
  reloadProperties: () => void
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined)

export function PropertyProvider({ children }: { children: ReactNode }) {
  const [allProperties, setAllProperties] = useState<Property[]>([])
  const [homeProperties, setHomeProperties] = useState<Home>({} as Home)
  const [loading, setLoading] = useState(true)

  const fetchProperties = async () => {
    try {
      setLoading(true)

      const [allRes, homeRes] = await Promise.all([
        fetch(BASE_URL + '/properties/findAll'),
        fetch(BASE_URL + '/properties/home')
      ])

      const allData = await allRes.json()
      const homeData = await homeRes.json()

      setAllProperties(allData)
      setHomeProperties(homeData)
    } catch (error) {
      console.error('Error al obtener propiedades:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  return (
    <PropertyContext.Provider value={{ allProperties, homeProperties, loading, reloadProperties: fetchProperties }}>
      {children}
    </PropertyContext.Provider>
  )
}

export const useProperties = () => {
  const context = useContext(PropertyContext)
  if (!context) {
    throw new Error('useProperties debe usarse dentro de PropertyProvider')
  }
  return context
}
