"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { useBooking } from "@/lib/booking-context"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { format } from "date-fns"
import { CalendarDays, MapPin, Users, X, Hotel } from "lucide-react"
import { toast } from "sonner"
import type { Booking } from "@/lib/data"

function formatINR(amount: number): string {
  return amount.toLocaleString("en-IN")
}

const statusStyles: Record<string, string> = {
  confirmed: "bg-emerald-600/10 text-emerald-700 hover:bg-emerald-600/20",
  cancelled: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  completed: "bg-muted text-muted-foreground",
}

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth()
  const { bookings, cancelBooking } = useBooking()
  const router = useRouter()

  if (!isAuthenticated) {
    router.push("/")
    return null
  }

  const upcoming = bookings.filter((b) => b.status === "confirmed")
  const past = bookings.filter((b) => b.status !== "confirmed")

  const totalSpent = bookings
    .filter((b) => b.status !== "cancelled")
    .reduce((sum, b) => sum + b.totalPrice, 0)

  const handleCancel = (bookingId: string) => {
    cancelBooking(bookingId)
    toast.success("Booking cancelled. Room availability has been restored.")
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            Welcome back, {user?.name}
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your reservations and upcoming stays.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/hotels">Browse Hotels</Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="py-5">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{bookings.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-sm text-muted-foreground">Upcoming Stays</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{upcoming.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-5">
            <p className="text-sm text-muted-foreground">Total Spent</p>
            <p className="mt-1 text-2xl font-bold text-foreground">
              {"₹"}{formatINR(Math.round(totalSpent))}
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator className="my-8" />

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Hotel className="h-12 w-12 text-muted-foreground/30" />
          <h2 className="mt-4 font-serif text-xl text-foreground">No bookings yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Explore hotels across India and book your perfect stay.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/hotels">Explore Hotels</Link>
          </Button>
        </div>
      ) : (
        <Tabs defaultValue="upcoming">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
            <TabsTrigger value="past">Past & Cancelled ({past.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <div className="flex flex-col gap-4">
              {upcoming.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">No upcoming bookings.</p>
              ) : (
                upcoming.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} onCancel={handleCancel} />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="flex flex-col gap-4">
              {past.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted-foreground">No past bookings.</p>
              ) : (
                past.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </main>
  )
}

function BookingCard({
  booking,
  onCancel,
}: {
  booking: Booking
  onCancel?: (id: string) => void
}) {
  return (
    <Card className="overflow-hidden py-0">
      <div className="flex flex-col sm:flex-row">
        <div className="relative h-48 w-full shrink-0 sm:h-auto sm:w-48">
          <Image src={booking.hotelImage} alt={booking.hotelName} fill className="object-cover" />
        </div>
        <CardContent className="flex flex-1 flex-col justify-between gap-4 p-5">
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {booking.hotelName}
                </h3>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {booking.hotelCity}
                </p>
                <p className="mt-1 text-xs font-medium text-primary">{booking.roomCategory}</p>
              </div>
              <Badge className={statusStyles[booking.status]}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {format(new Date(booking.checkIn), "dd MMM")} -{" "}
                {format(new Date(booking.checkOut), "dd MMM yyyy")}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />
                {booking.guests} {booking.guests === 1 ? "guest" : "guests"}, {booking.rooms} {booking.rooms === 1 ? "room" : "rooms"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border pt-3">
            <div>
              <span className="text-lg font-bold text-foreground">
                {"₹"}{formatINR(Math.round(booking.totalPrice))}
              </span>
              <span className="ml-1 text-xs text-muted-foreground">total (incl. GST)</span>
            </div>

            {booking.status === "confirmed" && onCancel && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 text-destructive hover:text-destructive">
                    <X className="h-3.5 w-3.5" />
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Booking?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will cancel your reservation at {booking.hotelName}. The room will be made available for other guests.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Keep Booking</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => onCancel(booking.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Confirm Cancellation
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}
