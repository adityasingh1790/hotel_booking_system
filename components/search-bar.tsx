"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, Users, Search, MapPin, Minus, Plus } from "lucide-react"
import { useState } from "react"
import { cities } from "@/lib/data"

interface SearchBarProps {
  onSearch: (params: {
    city: string
    checkIn: Date | undefined
    checkOut: Date | undefined
    guests: number
  }) => void
  variant?: "landing" | "inline"
}

export function SearchBar({ onSearch, variant = "inline" }: SearchBarProps) {
  const [city, setCity] = useState("")
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState(2)
  const [guestOpen, setGuestOpen] = useState(false)

  const handleSearch = () => {
    onSearch({ city, checkIn, checkOut, guests })
  }

  const isLanding = variant === "landing"

  return (
    <div
      className={`rounded-xl border border-border bg-card p-4 shadow-lg ${
        isLanding ? "md:p-6" : ""
      }`}
    >
      <div className={`grid gap-4 ${isLanding ? "md:grid-cols-5" : "md:grid-cols-5"}`}>
        {/* City */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            City
          </Label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="h-10">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Where to?" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {cities.map((c) => (
                <SelectItem key={c.name} value={c.name}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Check-in */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Check-in
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-10 justify-start font-normal text-foreground"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{checkIn ? format(checkIn, "dd MMM yyyy") : "Select date"}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Check-out
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-10 justify-start font-normal text-foreground"
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{checkOut ? format(checkOut, "dd MMM yyyy") : "Select date"}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) =>
                  date < new Date() || (checkIn ? date <= checkIn : false)
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Guests
          </Label>
          <Popover open={guestOpen} onOpenChange={setGuestOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-10 justify-start font-normal text-foreground"
              >
                <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{guests} {guests === 1 ? "Guest" : "Guests"}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-52 p-4" align="start">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Guests</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-secondary"
                    aria-label="Decrease guests"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-medium text-foreground">{guests}</span>
                  <button
                    onClick={() => setGuests(Math.min(8, guests + 1))}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-secondary"
                    aria-label="Increase guests"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search button */}
        <div className="flex items-end">
          <Button onClick={handleSearch} size="lg" className="h-10 w-full gap-2">
            <Search className="h-4 w-4" />
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}
