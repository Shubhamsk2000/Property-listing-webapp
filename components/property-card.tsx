"use client"

import type { Property } from "@/types/property"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square } from "lucide-react"
import Image from "next/image"

interface PropertyCardProps {
  property: Property
  onViewDetails: (property: Property) => void
}

export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getTypeColor = (type: Property["type"]) => {
    const colors = {
      apartment: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      house: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      condo: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
      townhouse: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
    }
    return colors[type]
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
          <Badge className={`absolute top-2 right-2 ${getTypeColor(property.type)}`}>
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{property.name}</h3>
          <div className="flex items-center text-muted-foreground text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {property.location}
          </div>
          <p className="text-2xl font-bold text-primary">{formatPrice(property.price)}/month</p>
          <p className="text-sm text-muted-foreground line-clamp-2">{property.description}</p>

          {(property.bedrooms || property.bathrooms || property.area) && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
              {property.bedrooms && (
                <div className="flex items-center">
                  <Bed className="w-4 h-4 mr-1" />
                  {property.bedrooms} bed
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center">
                  <Bath className="w-4 h-4 mr-1" />
                  {property.bathrooms} bath
                </div>
              )}
              {property.area && (
                <div className="flex items-center">
                  <Square className="w-4 h-4 mr-1" />
                  {property.area} sqft
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button onClick={() => onViewDetails(property)} className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
