"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Wifi, Coffee, Waves, Wind } from "lucide-react"
import type { Hotel } from "@/lib/data"

const amenityIcons: Record<string, React.ReactNode> = {
  "Free WiFi": <Wifi className="h-3.5 w-3.5" />,
  Breakfast: <Coffee className="h-3.5 w-3.5" />,
  Pool: <Waves className="h-3.5 w-3.5" />,
  AC: <Wind className="h-3.5 w-3.5" />,
}

function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN")
}

export function HotelCard({ hotel }: { hotel: Hotel }) {
  const isAvailable = hotel.roomsAvailable > 0

  return (
    <Link href={`/hotel/${hotel.id}`}>
      <Card className="group overflow-hidden border-border transition-all duration-300 hover:shadow-lg py-0 gap-0">
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={hotel.images[0]}
            alt={hotel.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-foreground/70 text-primary-foreground hover:bg-foreground/80 text-xs">
              {hotel.propertyType}
            </Badge>
          </div>
          <div className="absolute top-3 right-3">
            <Badge
              className={
                isAvailable
                  ? "bg-emerald-600/90 text-primary-foreground hover:bg-emerald-600"
                  : "bg-muted text-muted-foreground"
              }
            >
              {isAvailable ? `${hotel.roomsAvailable} rooms left` : "Sold Out"}
            </Badge>
          </div>
        </div>

        <CardContent className="flex flex-col gap-2.5 p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate font-serif text-base font-semibold text-foreground">
                {hotel.name}
              </h3>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 shrink-0" />
                {hotel.city}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-1 rounded-md bg-primary px-2 py-1">
              <Star className="h-3 w-3 fill-primary-foreground text-primary-foreground" />
              <span className="text-xs font-bold text-primary-foreground">{hotel.userRating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < hotel.starRating ? "fill-accent text-accent" : "fill-none text-border"
                }`}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">
              ({hotel.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 4).map((amenity) => (
              <span
                key={amenity}
                className="flex items-center gap-1 text-xs text-muted-foreground"
              >
                {amenityIcons[amenity] || null}
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{hotel.amenities.length - 4} more
              </span>
            )}
          </div>

          <div className="flex items-baseline gap-1 border-t border-border pt-2.5">
            <span className="text-lg font-bold text-foreground">
              {"₹"}{formatINR(hotel.pricePerNight)}
            </span>
            <span className="text-xs text-muted-foreground">/ night</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
