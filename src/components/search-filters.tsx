'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion'
import { PropertyTypeLabels } from '@/utils/type-label'
import { locations } from '@/constants/barrios';

export function SearchFilters() {
  const router = useRouter()

  const [searchText, setSearchText] = useState('')
  const [priceRange, setPriceRange] = useState([0, 500000])
  const [areaRange, setAreaRange] = useState([0, 500])
  const [expanded, setExpanded] = useState(false)
  const [location, setLocation] = useState('')
  const [type, setType] = useState('')
  const [rooms, setRooms] = useState('')
  const [baths, setBaths] = useState('')
  const [garage, setGarage] = useState('')
  const [pool, setPool] = useState('')

  const handleSearch = () => {
    const queryParams = new URLSearchParams()

    if (searchText) queryParams.append('q', searchText)
    if (location) queryParams.append('ubicacion', location)
    if (type) queryParams.append('tipo', type)
    if (rooms) queryParams.append('dormitorios', rooms)
    if (baths) queryParams.append('banos', baths)
    if (garage) queryParams.append('garage', garage)
    if (pool) queryParams.append('piscina', pool)

    queryParams.append('precioMin', priceRange[0].toString())
    queryParams.append('precioMax', priceRange[1].toString())
    queryParams.append('areaMin', areaRange[0].toString())
    queryParams.append('areaMax', areaRange[1].toString())

    router.push(`/buscar?${queryParams.toString()}`)
  }

  return (
    <div className="bg-card rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4 mb-4 items-center">
        <div className="relative w-full ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar una propiedad..."
            className="pl-10 w-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <Button onClick={handleSearch} className="md:w-40 w-full bg-nav text-white text-base">
          Buscar
        </Button>
      </div>

      <Accordion
        type="single"
        collapsible
        value={expanded ? 'filters' : ''}
        onValueChange={(value) => setExpanded(value === 'filters')}
      >
        <AccordionItem value="filters" className="border-none">
          <AccordionTrigger className="py-2 text-sm font-medium">
            Filtros avanzados
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Ubicación</label>
                <Select onValueChange={setLocation}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cualquiera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquiera</SelectItem>
                    {locations.map((loc) => (
                      <SelectItem key={loc.value} value={loc.value}>
                        {loc.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de propiedad</label>
                <Select onValueChange={setType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cualquiera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquiera</SelectItem>
                    {Object.entries(PropertyTypeLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Dormitorios</label>
                <Select onValueChange={setRooms}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cualquiera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquiera</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Baños</label>
                <Select onValueChange={setBaths}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cualquiera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquiera</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Garaje</label>
                <Select onValueChange={setGarage}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cualquiera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquiera</SelectItem>
                    <SelectItem value="yes">Con garaje</SelectItem>
                    <SelectItem value="no">Sin garaje</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Piscina</label>
                <Select onValueChange={setPool}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Cualquiera" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Cualquiera</SelectItem>
                    <SelectItem value="yes">Con piscina</SelectItem>
                    <SelectItem value="no">Sin piscina</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 md:col-span-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Rango de precio</label>
                  <span className="text-sm text-muted-foreground">
                    ${priceRange[0].toString()} - ${priceRange[1].toString()}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 500000]}
                  min={0}
                  max={1000000}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="py-4"
                />
              </div>

              <div className="space-y-2 md:col-span-3">
                <div className="flex justify-between">
                  <label className="text-sm font-medium">Área construida (m²)</label>
                  <span className="text-sm text-muted-foreground">
                    {areaRange[0]} - {areaRange[1]} m²
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 500]}
                  min={0}
                  max={1000}
                  step={10}
                  value={areaRange}
                  onValueChange={setAreaRange}
                  className="py-4"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}