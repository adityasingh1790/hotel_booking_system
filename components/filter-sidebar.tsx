"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Star } from "lucide-react"

const amenityOptions = [
  "Free WiFi",
  "Breakfast",
  "Pool",
  "Spa",
  "AC",
  "Restaurant",
  "Bar",
  "Gym",
  "Beach Access",
  "Room Service",
]

const propertyTypes = ["Hotel", "Resort", "Heritage", "Boutique"]

function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN")
}

interface FilterSidebarProps {
  priceRange: [number, number]
  onPriceChange: (range: [number, number]) => void
  selectedAmenities: string[]
  onAmenitiesChange: (amenities: string[]) => void
  minRating: number
  onRatingChange: (rating: number) => void
  selectedPropertyTypes: string[]
  onPropertyTypesChange: (types: string[]) => void
}

export function FilterSidebar({
  priceRange,
  onPriceChange,
  selectedAmenities,
  onAmenitiesChange,
  minRating,
  onRatingChange,
  selectedPropertyTypes,
  onPropertyTypesChange,
}: FilterSidebarProps) {
  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      onAmenitiesChange(selectedAmenities.filter((a) => a !== amenity))
    } else {
      onAmenitiesChange([...selectedAmenities, amenity])
    }
  }

  const togglePropertyType = (type: string) => {
    if (selectedPropertyTypes.includes(type)) {
      onPropertyTypesChange(selectedPropertyTypes.filter((t) => t !== type))
    } else {
      onPropertyTypesChange([...selectedPropertyTypes, type])
    }
  }

  return (
    <aside className="rounded-xl border border-border bg-card p-5" aria-label="Filters">
      <h3 className="font-serif text-lg font-semibold text-foreground">Filters</h3>

      <Separator className="my-4" />

      {/* Price Range */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">Price Range (per night)</Label>
        <Slider
          min={1000}
          max={60000}
          step={500}
          value={priceRange}
          onValueChange={(val) => onPriceChange(val as [number, number])}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{"₹"}{formatINR(priceRange[0])}</span>
          <span>{"₹"}{formatINR(priceRange[1])}</span>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Star Rating */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">Star Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => onRatingChange(star === minRating ? 0 : star)}
              className="transition-colors"
              aria-label={`Minimum ${star} stars`}
            >
              <Star
                className={`h-5 w-5 ${
                  star <= minRating ? "fill-accent text-accent" : "fill-none text-border"
                }`}
              />
            </button>
          ))}
        </div>
        {minRating > 0 && (
          <p className="text-xs text-muted-foreground">{minRating}+ stars</p>
        )}
      </div>

      <Separator className="my-4" />

      {/* Property Type */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">Property Type</Label>
        <div className="flex flex-col gap-2.5">
          {propertyTypes.map((type) => (
            <label key={type} className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={selectedPropertyTypes.includes(type)}
                onCheckedChange={() => togglePropertyType(type)}
              />
              <span className="text-sm text-foreground">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <Separator className="my-4" />

      {/* Amenities */}
      <div className="flex flex-col gap-3">
        <Label className="text-sm font-medium text-foreground">Amenities</Label>
        <div className="flex flex-col gap-2.5">
          {amenityOptions.map((amenity) => (
            <label key={amenity} className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={() => toggleAmenity(amenity)}
              />
              <span className="text-sm text-foreground">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  )
}
