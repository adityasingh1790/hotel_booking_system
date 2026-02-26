"use client"

import { useState, useMemo, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { SearchBar } from "@/components/search-bar"
import { FilterSidebar } from "@/components/filter-sidebar"
import { HotelCard } from "@/components/hotel-card"
import { useBooking } from "@/lib/booking-context"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SlidersHorizontal, X, Hotel } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet"

function HotelsContent() {
  const { hotels } = useBooking()
  const searchParams = useSearchParams()
  const cityFromUrl = searchParams.get("city") || ""

  const [searchCity, setSearchCity] = useState(cityFromUrl)
  const [searchGuests, setSearchGuests] = useState(0)
  const [priceRange, setPriceRange] = useState<[number, number]>([1000, 60000])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("recommended")
  const [filterOpen, setFilterOpen] = useState(false)

  const filteredHotels = useMemo(() => {
    let result = hotels.filter((hotel) => {
      if (hotel.pricePerNight < priceRange[0] || hotel.pricePerNight > priceRange[1]) return false
      if (minRating > 0 && hotel.starRating < minRating) return false
      if (selectedPropertyTypes.length > 0 && !selectedPropertyTypes.includes(hotel.propertyType)) return false
      if (selectedAmenities.length > 0 && !selectedAmenities.every((a) => hotel.amenities.includes(a))) return false
      if (searchCity && hotel.city.toLowerCase() !== searchCity.toLowerCase()) return false
      if (searchGuests > 0) {
        const maxGuestsForHotel = Math.max(...hotel.roomCategories.map((rc) => rc.maxGuests))
        if (maxGuestsForHotel < searchGuests) return false
      }
      return true
    })

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.pricePerNight - b.pricePerNight)
        break
      case "price-high":
        result = [...result].sort((a, b) => b.pricePerNight - a.pricePerNight)
        break
      case "rating":
        result = [...result].sort((a, b) => b.userRating - a.userRating)
        break
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [hotels, priceRange, minRating, selectedPropertyTypes, selectedAmenities, searchCity, searchGuests, sortBy])

  const handleSearch = (params: { city: string; guests: number }) => {
    setSearchCity(params.city)
    setSearchGuests(params.guests)
  }

  const activeFilterCount =
    (selectedAmenities.length > 0 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (selectedPropertyTypes.length > 0 ? 1 : 0) +
    (priceRange[0] > 1000 || priceRange[1] < 60000 ? 1 : 0)

  const clearFilters = () => {
    setPriceRange([1000, 60000])
    setSelectedAmenities([])
    setMinRating(0)
    setSelectedPropertyTypes([])
    setSearchCity("")
    setSearchGuests(0)
  }

  return (
    <main className="pt-[60px]">
      {/* Search bar area */}
      <section className="border-b border-border bg-card px-6 py-5">
        <div className="mx-auto max-w-7xl">
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="font-serif text-2xl font-bold text-foreground">
              {searchCity ? `Hotels in ${searchCity}` : "All Hotels"}
            </h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Showing {filteredHotels.length} {filteredHotels.length === 1 ? "property" : "properties"}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-1 text-muted-foreground">
                <X className="h-3.5 w-3.5" />
                Clear
              </Button>
            )}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 hidden sm:flex">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rating</SelectItem>
              </SelectContent>
            </Select>

            <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetTitle className="font-serif text-lg">Filters</SheetTitle>
                <div className="mt-4">
                  <FilterSidebar
                    priceRange={priceRange}
                    onPriceChange={setPriceRange}
                    selectedAmenities={selectedAmenities}
                    onAmenitiesChange={setSelectedAmenities}
                    minRating={minRating}
                    onRatingChange={setMinRating}
                    selectedPropertyTypes={selectedPropertyTypes}
                    onPropertyTypesChange={setSelectedPropertyTypes}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          <div className="hidden w-72 shrink-0 lg:block">
            <FilterSidebar
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              selectedAmenities={selectedAmenities}
              onAmenitiesChange={setSelectedAmenities}
              minRating={minRating}
              onRatingChange={setMinRating}
              selectedPropertyTypes={selectedPropertyTypes}
              onPropertyTypesChange={setSelectedPropertyTypes}
            />
          </div>

          <div className="flex-1">
            {filteredHotels.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Hotel className="h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 font-serif text-xl text-foreground">
                  No hotels match your criteria
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try adjusting your filters or search a different city.
                </p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}

export default function HotelsPage() {
  return (
    <Suspense>
      <HotelsContent />
    </Suspense>
  )
}
