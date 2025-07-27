export interface Property {
  id: string
  name: string
  type: "apartment" | "house" | "condo" | "townhouse"
  price: number
  location: string
  description: string
  image: string
  coordinates?: {
    lat: number
    lng: number
  }
  bedrooms?: number
  bathrooms?: number
  area?: number
  createdAt: Date
}

export interface PropertyFilters {
  type: string
  search: string
}
