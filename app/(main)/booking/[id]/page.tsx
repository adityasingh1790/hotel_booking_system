"use client"

import { use, useState, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useBooking } from "@/lib/booking-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format, differenceInDays } from "date-fns"
import { CalendarIcon, Loader2, Users, MapPin, Minus, Plus } from "lucide-react"
import { toast } from "sonner"

function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN")
}

function BookingContent({ id }: { id: string }) {
  const searchParams = useSearchParams()
  const roomFromUrl = searchParams.get("room") || ""
  const { getHotelById, addBooking } = useBooking()
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const hotel = getHotelById(id)

  const selectedCategory = hotel?.roomCategories.find((rc) => rc.name === roomFromUrl) || hotel?.roomCategories[0]

  const [guestName, setGuestName] = useState(user?.name || "")
  const [guestEmail, setGuestEmail] = useState(user?.email || "")
  const [guestPhone, setGuestPhone] = useState("")
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState(2)
  const [rooms, setRooms] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  if (!isAuthenticated) {
    router.push("/")
    return null
  }

  if (!hotel || !selectedCategory) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="font-serif text-2xl text-foreground">Hotel not found</h1>
        <Link href="/hotels" className="mt-4 text-sm text-primary underline">Back to hotels</Link>
      </main>
    )
  }

  const nights = checkIn && checkOut ? differenceInDays(checkOut, checkIn) : 0
  const roomTotal = nights * selectedCategory.price * rooms
  const gstRate = 0.18
  const taxes = roomTotal * gstRate
  const totalPrice = roomTotal + taxes

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!guestName.trim()) newErrors.name = "Name is required"
    if (!guestEmail.trim()) newErrors.email = "Email is required"
    if (!guestPhone.trim()) newErrors.phone = "Phone is required"
    if (!checkIn) newErrors.checkIn = "Check-in date is required"
    if (!checkOut) newErrors.checkOut = "Check-out date is required"
    if (nights <= 0) newErrors.checkOut = "Check-out must be after check-in"
    if (rooms > selectedCategory.available) newErrors.rooms = `Only ${selectedCategory.available} rooms available`
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleConfirm = async () => {
    if (!validate()) return

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))

    addBooking({
      hotelId: hotel.id,
      hotelName: hotel.name,
      hotelImage: hotel.images[0],
      hotelCity: hotel.city,
      roomCategory: selectedCategory.name,
      guestName,
      guestEmail,
      guestPhone,
      checkIn: checkIn!.toISOString(),
      checkOut: checkOut!.toISOString(),
      guests,
      rooms,
      totalPrice,
      taxes,
    })

    setLoading(false)
    toast.success("Booking confirmed! Redirecting to your dashboard...")
    setTimeout(() => router.push("/dashboard"), 1200)
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/hotels" className="transition-colors hover:text-foreground">Hotels</Link>
        <span>/</span>
        <Link href={`/hotel/${hotel.id}`} className="transition-colors hover:text-foreground">{hotel.name}</Link>
        <span>/</span>
        <span className="text-foreground">Booking</span>
      </nav>

      <h1 className="font-serif text-3xl font-bold text-foreground">Complete Your Booking</h1>
      <p className="mt-1 text-muted-foreground">Fill in your details to reserve your stay.</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        {/* Guest Form */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">Guest Details</h2>

            <div className="mt-6 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="guestName">Full Name</Label>
                <Input
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Rahul Sharma"
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="guestEmail">Email</Label>
                  <Input
                    id="guestEmail"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="guestPhone">Phone</Label>
                  <Input
                    id="guestPhone"
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>
              </div>

              <Separator />

              <h3 className="font-serif text-lg font-semibold text-foreground">Stay Details</h3>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Check-in</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start font-normal text-foreground">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        {checkIn ? format(checkIn, "dd MMM yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={checkIn} onSelect={setCheckIn} disabled={(date) => date < new Date()} />
                    </PopoverContent>
                  </Popover>
                  {errors.checkIn && <p className="text-xs text-destructive">{errors.checkIn}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>Check-out</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="justify-start font-normal text-foreground">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        {checkOut ? format(checkOut, "dd MMM yyyy") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                        disabled={(date) => date < new Date() || (checkIn ? date <= checkIn : false)}
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.checkOut && <p className="text-xs text-destructive">{errors.checkOut}</p>}
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Guests</Label>
                  <div className="flex items-center gap-3 rounded-md border border-input px-3 py-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="flex h-6 w-6 items-center justify-center rounded-full border border-border" aria-label="Decrease guests"><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center text-sm font-medium">{guests}</span>
                    <button onClick={() => setGuests(Math.min(selectedCategory.maxGuests * rooms, guests + 1))} className="flex h-6 w-6 items-center justify-center rounded-full border border-border" aria-label="Increase guests"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>Rooms</Label>
                  <div className="flex items-center gap-3 rounded-md border border-input px-3 py-2">
                    <span className="text-sm text-muted-foreground">Rooms</span>
                    <button onClick={() => setRooms(Math.max(1, rooms - 1))} className="flex h-6 w-6 items-center justify-center rounded-full border border-border" aria-label="Decrease rooms"><Minus className="h-3 w-3" /></button>
                    <span className="w-6 text-center text-sm font-medium">{rooms}</span>
                    <button onClick={() => setRooms(Math.min(selectedCategory.available, rooms + 1))} className="flex h-6 w-6 items-center justify-center rounded-full border border-border" aria-label="Increase rooms"><Plus className="h-3 w-3" /></button>
                  </div>
                  {errors.rooms && <p className="text-xs text-destructive">{errors.rooms}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
            <h2 className="font-serif text-xl font-semibold text-foreground">Booking Summary</h2>

            <div className="mt-4 flex gap-4">
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                <Image src={hotel.images[0]} alt={hotel.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-semibold text-foreground">{hotel.name}</h3>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {hotel.city}
                </p>
                <p className="mt-1 text-xs text-primary font-medium">{selectedCategory.name}</p>
              </div>
            </div>

            <Separator className="my-5" />

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {"₹"}{formatINR(selectedCategory.price)} x {nights > 0 ? nights : "--"} {nights === 1 ? "night" : "nights"} x {rooms} {rooms === 1 ? "room" : "rooms"}
                </span>
                <span className="text-foreground">{nights > 0 ? `₹${formatINR(roomTotal)}` : "--"}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="text-foreground">{nights > 0 ? `₹${formatINR(Math.round(taxes))}` : "--"}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-base font-bold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">{nights > 0 ? `₹${formatINR(Math.round(totalPrice))}` : "--"}</span>
              </div>
            </div>

            <Button
              onClick={handleConfirm}
              disabled={loading || nights <= 0}
              size="lg"
              className="mt-6 w-full"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Booking
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <Suspense>
      <BookingContent id={id} />
    </Suspense>
  )
}
