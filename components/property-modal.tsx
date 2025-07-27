import type { Property } from "@/types/property"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { MapPin, Bed, Bath, Square, Calendar } from "lucide-react"
import Image from "next/image"

interface PropertyModalProps {
  property: Property | null
  isOpen: boolean
  onClose: () => void
}

export function PropertyModal({ property, isOpen, onClose }: PropertyModalProps) {
  if (!property) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{property.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image src={property.image || "/placeholder.svg"} alt={property.name} fill className="object-cover" />
            <Badge className={`absolute top-4 right-4 ${getTypeColor(property.type)}`}>
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </Badge>
          </div>

          {/* Price and Location */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">{formatPrice(property.price)}/month</div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-5 h-5 mr-2" />
              {property.location}
            </div>
          </div>

          {/* Property Details */}
          {(property.bedrooms || property.bathrooms || property.area) && (
            <div className="flex items-center gap-6 text-muted-foreground">
              {property.bedrooms && (
                <div className="flex items-center">
                  <Bed className="w-5 h-5 mr-2" />
                  <span>{property.bedrooms} Bedrooms</span>
                </div>
              )}
              {property.bathrooms && (
                <div className="flex items-center">
                  <Bath className="w-5 h-5 mr-2" />
                  <span>{property.bathrooms} Bathrooms</span>
                </div>
              )}
              {property.area && (
                <div className="flex items-center">
                  <Square className="w-5 h-5 mr-2" />
                  <span>{property.area} sqft</span>
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{property.description}</p>
          </div>

          {/* Map placeholder */}
          {property.coordinates && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Location</h3>
              <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <p>Map would be embedded here</p>
                  <p className="text-sm">
                    Coordinates: {property.coordinates.lat}, {property.coordinates.lng}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Created Date */}
          <div className="flex items-center text-sm text-muted-foreground pt-4 border-t">
            <Calendar className="w-4 h-4 mr-2" />
            Listed on {formatDate(property.createdAt)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
