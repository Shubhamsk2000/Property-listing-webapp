"use client"

import { useState } from "react"
import { useProperty } from "@/contexts/property-context"
import type { Property } from "@/types/property"
import { Header } from "@/components/header"
import { PropertyFilters } from "@/components/property-filters"
import { PropertyCard } from "@/components/property-card"
import { PropertyModal } from "@/components/property-modal"
import { Skeleton } from "@/components/ui/skeleton"
import { Home } from "lucide-react" 

function PropertySkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-48 w-full" />
      <div className="space-y-2 p-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  )
}

export default function HomePage() {
  const { state, dispatch } = useProperty()
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

  const handleViewDetails = (property: Property) => {
    setSelectedProperty(property)
    dispatch({ type: "SET_SELECTED_PROPERTY", payload: property })
  }

  const handleCloseModal = () => {
    setSelectedProperty(null)
    dispatch({ type: "SET_SELECTED_PROPERTY", payload: null })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Find Your Perfect Property</h2>
          <p className="text-muted-foreground">Discover amazing properties in your desired location</p>
        </div>

        <PropertyFilters />

        {state.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <PropertySkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-muted-foreground">
              Showing {state.filteredProperties.length} of {state.properties.length} properties
            </div>

            {state.filteredProperties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  <Home className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No properties found</p>
                  <p className="text-sm">Try adjusting your search criteria</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {state.filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} onViewDetails={handleViewDetails} />
                ))}
              </div>
            )}
          </>
        )}

        <PropertyModal property={selectedProperty} isOpen={!!selectedProperty} onClose={handleCloseModal} />
      </main>
    </div>
  )
}
