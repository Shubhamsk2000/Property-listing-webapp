"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import type { Property, PropertyFilters } from "@/types/property"

interface PropertyState {
  properties: Property[]
  filteredProperties: Property[]
  filters: PropertyFilters
  loading: boolean
  selectedProperty: Property | null
}

type PropertyAction =
  | { type: "SET_PROPERTIES"; payload: Property[] }
  | { type: "ADD_PROPERTY"; payload: Property }
  | { type: "SET_FILTERS"; payload: PropertyFilters }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SELECTED_PROPERTY"; payload: Property | null }
  | { type: "FILTER_PROPERTIES" }

const initialState: PropertyState = {
  properties: [],
  filteredProperties: [],
  filters: { type: "all", search: "" },
  loading: false,
  selectedProperty: null,
}

const PropertyContext = createContext<{
  state: PropertyState
  dispatch: React.Dispatch<PropertyAction>
} | null>(null)

function propertyReducer(state: PropertyState, action: PropertyAction): PropertyState {
  switch (action.type) {
    case "SET_PROPERTIES":
      return { ...state, properties: action.payload }
    case "ADD_PROPERTY":
      const newProperties = [...state.properties, action.payload]
      return { ...state, properties: newProperties }
    case "SET_FILTERS":
      return { ...state, filters: action.payload }
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_SELECTED_PROPERTY":
      return { ...state, selectedProperty: action.payload }
    case "FILTER_PROPERTIES":
      let filtered = state.properties

      if (state.filters.type !== "all") {
        filtered = filtered.filter((property) => property.type === state.filters.type)
      }

      if (state.filters.search) {
        const searchLower = state.filters.search.toLowerCase()
        filtered = filtered.filter(
          (property) =>
            property.name.toLowerCase().includes(searchLower) ||
            property.location.toLowerCase().includes(searchLower) ||
            property.description.toLowerCase().includes(searchLower),
        )
      }

      return { ...state, filteredProperties: filtered }
    default:
      return state
  }
}

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(propertyReducer, initialState)

  // Mock API call
  useEffect(() => {
    const fetchProperties = async () => {
      dispatch({ type: "SET_LOADING", payload: true })

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockProperties: Property[] = [
        {
          id: "1",
          name: "Modern Downtown Apartment",
          type: "apartment",
          price: 2500,
          location: "Downtown, New York",
          description: "Beautiful modern apartment in the heart of downtown with stunning city views.",
          image: "/placeholder.svg?height=300&width=400",
          coordinates: { lat: 40.7128, lng: -74.006 },
          bedrooms: 2,
          bathrooms: 2,
          area: 1200,
          createdAt: new Date("2024-01-15"),
        },
        {
          id: "2",
          name: "Cozy Suburban House",
          type: "house",
          price: 3200,
          location: "Suburbia, California",
          description: "Spacious family home with a large backyard and modern amenities.",
          image: "/placeholder.svg?height=300&width=400",
          coordinates: { lat: 34.0522, lng: -118.2437 },
          bedrooms: 4,
          bathrooms: 3,
          area: 2400,
          createdAt: new Date("2024-01-10"),
        },
        {
          id: "3",
          name: "Luxury Condo with Ocean View",
          type: "condo",
          price: 4500,
          location: "Miami Beach, Florida",
          description: "Stunning oceanfront condo with panoramic views and premium finishes.",
          image: "/placeholder.svg?height=300&width=400",
          coordinates: { lat: 25.7617, lng: -80.1918 },
          bedrooms: 3,
          bathrooms: 2,
          area: 1800,
          createdAt: new Date("2024-01-20"),
        },
        {
          id: "4",
          name: "Historic Townhouse",
          type: "townhouse",
          price: 2800,
          location: "Boston, Massachusetts",
          description: "Charming historic townhouse with original features and modern updates.",
          image: "/placeholder.svg?height=300&width=400",
          coordinates: { lat: 42.3601, lng: -71.0589 },
          bedrooms: 3,
          bathrooms: 2,
          area: 1600,
          createdAt: new Date("2024-01-05"),
        },
      ]

      dispatch({ type: "SET_PROPERTIES", payload: mockProperties })
      dispatch({ type: "SET_LOADING", payload: false })
    }

    fetchProperties()
  }, [])

  // Filter properties when filters or properties change
  useEffect(() => {
    dispatch({ type: "FILTER_PROPERTIES" })
  }, [state.properties, state.filters])

  return <PropertyContext.Provider value={{ state, dispatch }}>{children}</PropertyContext.Provider>
}

export function useProperty() {
  const context = useContext(PropertyContext)
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider")
  }
  return context
}
