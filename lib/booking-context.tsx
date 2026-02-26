"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import type { Booking, Hotel } from "@/lib/data"
import { hotels as initialHotels } from "@/lib/data"

interface BookingContextType {
  bookings: Booking[]
  hotels: Hotel[]
  addBooking: (booking: Omit<Booking, "id" | "createdAt" | "status">) => void
  cancelBooking: (bookingId: string) => void
  getHotelById: (id: string) => Hotel | undefined
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [hotels, setHotels] = useState<Hotel[]>(initialHotels)

  const addBooking = useCallback((booking: Omit<Booking, "id" | "createdAt" | "status">) => {
    const newBooking: Booking = {
      ...booking,
      id: `b${Date.now()}`,
      status: "confirmed",
      createdAt: new Date().toISOString(),
    }
    setBookings((prev) => [...prev, newBooking])
    setHotels((prev) =>
      prev.map((h) => {
        if (h.id === booking.hotelId) {
          const updatedCategories = h.roomCategories.map((rc) =>
            rc.name === booking.roomCategory
              ? { ...rc, available: Math.max(0, rc.available - booking.rooms) }
              : rc
          )
          const newAvailable = updatedCategories.reduce((sum, rc) => sum + rc.available, 0)
          return { ...h, roomCategories: updatedCategories, roomsAvailable: newAvailable }
        }
        return h
      })
    )
  }, [])

  const cancelBooking = useCallback((bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId && b.status === "confirmed") {
          setHotels((prevHotels) =>
            prevHotels.map((h) => {
              if (h.id === b.hotelId) {
                const updatedCategories = h.roomCategories.map((rc) =>
                  rc.name === b.roomCategory
                    ? { ...rc, available: rc.available + b.rooms }
                    : rc
                )
                const newAvailable = updatedCategories.reduce((sum, rc) => sum + rc.available, 0)
                return { ...h, roomCategories: updatedCategories, roomsAvailable: newAvailable }
              }
              return h
            })
          )
          return { ...b, status: "cancelled" as const }
        }
        return b
      })
    )
  }, [])

  const getHotelById = useCallback(
    (id: string) => hotels.find((h) => h.id === id),
    [hotels]
  )

  return (
    <BookingContext.Provider value={{ bookings, hotels, addBooking, cancelBooking, getHotelById }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error("useBooking must be used within BookingProvider")
  return ctx
}
