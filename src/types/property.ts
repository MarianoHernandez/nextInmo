export enum PropertyStatus{
  ForSale = 'for_sale',
  ForRent = 'for_rent',
  Sold = 'sold',
  Rented = 'rented',
  UnderConstruction = 'under_construction',
  Reserved = 'reserved'
}

export enum PropertyTypes {
  HOUSE = 'house',
  APARTMENT = 'apartment',
  LAND = 'land',
  OFFICE = 'office',
  STORE = 'store',
  OTHER = 'other',
}
export interface Property {
  id: number
  title: string
  shortDescription: string
  price: number
  type: PropertyTypes
  status: PropertyStatus[]
  lotSize: number
  area?: number
  pool: boolean
  rooms?: number
  bathrooms?: number
  address: string
  geoCoordinates: {
    lat: number
    lng: number
  }
  neighborhood: string
  yearBuilt?: number
  imageSrc: string[]
  contribution?: string
  longDescription: string
  garage: boolean
  pinned: boolean
  approved: boolean
  createdAt: string
  createdBy: any
  rents: any[]
}

