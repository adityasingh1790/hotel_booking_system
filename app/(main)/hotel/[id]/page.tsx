"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useBooking } from "@/lib/booking-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AuthModal } from "@/components/auth-modal"
import {
  Star,
  Users,
  Maximize2,
  MapPin,
  Phone,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Coffee,
  Waves,
  Wind,
  Utensils,
  Dumbbell,
  Sparkles,
  Car,
  Tv,
  Bath,
  ShieldCheck,
  Sailboat,
  GlassWater,
  Flower2,
} from "lucide-react"

const amenityIcons: Record<string, React.ReactNode> = {
  "Free WiFi": <Wifi className="h-5 w-5" />,
  Breakfast: <Coffee className="h-5 w-5" />,
  Pool: <Waves className="h-5 w-5" />,
  AC: <Wind className="h-5 w-5" />,
  Restaurant: <Utensils className="h-5 w-5" />,
  Bar: <GlassWater className="h-5 w-5" />,
  Gym: <Dumbbell className="h-5 w-5" />,
  Spa: <Sparkles className="h-5 w-5" />,
  Parking: <Car className="h-5 w-5" />,
  "Room Service": <Utensils className="h-5 w-5" />,
  "Beach Access": <Sailboat className="h-5 w-5" />,
  "Sea View": <Waves className="h-5 w-5" />,
  "Water Sports": <Sailboat className="h-5 w-5" />,
  "Heritage Tour": <Flower2 className="h-5 w-5" />,
  "Business Center": <Tv className="h-5 w-5" />,
  "Airport Shuttle": <Car className="h-5 w-5" />,
  "Fort View": <Flower2 className="h-5 w-5" />,
  "Rooftop Cafe": <Coffee className="h-5 w-5" />,
  "Boat Transfer": <Sailboat className="h-5 w-5" />,
  "Ayurvedic Treatment": <Sparkles className="h-5 w-5" />,
  "Canoe Rides": <Sailboat className="h-5 w-5" />,
  Yoga: <Sparkles className="h-5 w-5" />,
}

function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN")
}

export default function HotelDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { getHotelById } = useBooking()
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(0)
  const [authOpen, setAuthOpen] = useState(false)

  const hotel = getHotelById(id)

  if (!hotel) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="font-serif text-2xl text-foreground">Hotel not found</h1>
        <Link href="/hotels" className="mt-4 text-sm text-primary underline">
          Back to hotels
        </Link>
      </main>
    )
  }

  const nextImage = () => setCurrentImage((i) => (i + 1) % hotel.images.length)
  const prevImage = () => setCurrentImage((i) => (i - 1 + hotel.images.length) % hotel.images.length)

  const handleBookRoom = (roomCategoryName: string) => {
    if (!isAuthenticated) {
      setAuthOpen(true)
      return
    }
    router.push(`/booking/${hotel.id}?room=${encodeURIComponent(roomCategoryName)}`)
  }

  return (
    <>
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/hotels" className="transition-colors hover:text-foreground">Hotels</Link>
          <span>/</span>
          <Link href={`/hotels?city=${hotel.city}`} className="transition-colors hover:text-foreground">{hotel.city}</Link>
          <span>/</span>
          <span className="text-foreground">{hotel.name}</span>
        </nav>

        {/* Image Gallery */}
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <Image
              src={hotel.images[currentImage]}
              alt={`${hotel.name} - Image ${currentImage + 1}`}
              fill
              className="object-cover"
              priority
            />
            {hotel.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-card/80 p-2 backdrop-blur-sm transition-colors hover:bg-card"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </button>
              </>
            )}
          </div>
          <div className="hidden gap-3 lg:grid lg:grid-cols-2">
            {hotel.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={`relative aspect-[4/3] overflow-hidden rounded-xl transition-all ${
                  i === currentImage ? "ring-2 ring-primary ring-offset-2" : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`${hotel.name} ${i + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Hotel Info */}
        <div className="mt-8 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                    {hotel.propertyType}
                  </Badge>
                  <div className="flex">
                    {Array.from({ length: hotel.starRating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                </div>
                <h1 className="mt-2 font-serif text-3xl font-bold text-foreground text-balance">
                  {hotel.name}
                </h1>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {hotel.address}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2">
                <Star className="h-4 w-4 fill-primary-foreground text-primary-foreground" />
                <span className="font-bold text-primary-foreground">{hotel.userRating}</span>
                <span className="text-xs text-primary-foreground/70">/ 5</span>
              </div>
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              {hotel.reviewCount.toLocaleString()} reviews
            </p>

            <Separator className="my-6" />

            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">About This Hotel</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{hotel.longDescription}</p>
            </div>

            <Separator className="my-6" />

            {/* Amenities */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">Hotel Amenities</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {hotel.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2.5 rounded-lg border border-border p-3">
                    <div className="text-primary">
                      {amenityIcons[amenity] || <ShieldCheck className="h-5 w-5" />}
                    </div>
                    <span className="text-sm text-foreground">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator className="my-6" />

            {/* Room Categories */}
            <div>
              <h2 className="font-serif text-xl font-semibold text-foreground">Room Categories</h2>
              <p className="mt-1 text-sm text-muted-foreground">Select a room to book your stay</p>

              <div className="mt-4 flex flex-col gap-4">
                {hotel.roomCategories.map((room) => (
                  <Card key={room.id} className="overflow-hidden">
                    <CardContent className="p-5">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h3 className="font-serif text-lg font-semibold text-foreground">{room.name}</h3>
                            <Badge
                              variant={room.available > 0 ? "default" : "secondary"}
                              className={
                                room.available > 0
                                  ? "bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600/20"
                                  : "bg-muted text-muted-foreground"
                              }
                            >
                              {room.available > 0 ? `${room.available} left` : "Sold Out"}
                            </Badge>
                          </div>
                          <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Maximize2 className="h-3.5 w-3.5" />
                              {room.size} sq.ft
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3.5 w-3.5" />
                              Up to {room.maxGuests} guests
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {room.amenities.map((a) => (
                              <span key={a} className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                                {a}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-foreground">{"₹"}{formatINR(room.price)}</p>
                            <p className="text-xs text-muted-foreground">per night + GST</p>
                          </div>
                          <Button
                            onClick={() => handleBookRoom(room.name)}
                            disabled={room.available === 0}
                            size="sm"
                          >
                            {room.available > 0 ? "Book This Room" : "Sold Out"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-card p-5">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-foreground">
                  {"₹"}{formatINR(hotel.pricePerNight)}
                </span>
                <span className="text-sm text-muted-foreground">/ night onwards</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                + 18% GST applicable
              </p>

              <Separator className="my-4" />

              <div className="flex flex-col gap-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Check-in</span>
                  <span className="font-medium text-foreground">12:00 PM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Check-out</span>
                  <span className="font-medium text-foreground">11:00 AM</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Rooms available</span>
                  <span className="font-medium text-foreground">{hotel.roomsAvailable}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex items-center gap-2 rounded-lg border border-border p-3 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                +91 1800-123-4567
              </div>

              <Button
                onClick={() => handleBookRoom(hotel.roomCategories[0]?.name || "")}
                disabled={hotel.roomsAvailable === 0}
                size="lg"
                className="mt-4 w-full"
              >
                {hotel.roomsAvailable > 0 ? "Book Now" : "Sold Out"}
              </Button>

              {!isAuthenticated && (
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Sign in required to complete booking
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </>
  )
}
