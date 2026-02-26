"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SearchBar } from "@/components/search-bar"
import { CityCard } from "@/components/city-card"
import { HotelCard } from "@/components/hotel-card"
import { useBooking } from "@/lib/booking-context"
import { cities } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Shield, Clock, Tag, Headphones, ArrowRight, Star } from "lucide-react"

const features = [
  {
    icon: <Tag className="h-6 w-6" />,
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it and give you an extra 10% off.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Verified Properties",
    description: "Every hotel is personally verified for quality and hygiene standards.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Free Cancellation",
    description: "Plans changed? Cancel for free up to 24 hours before check-in.",
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "24/7 Support",
    description: "Our travel experts are available round the clock to assist you.",
  },
]

export default function LandingPage() {
  const router = useRouter()
  const { hotels } = useBooking()
  const featuredHotels = hotels.filter((h) => h.featured)

  const handleSearch = (params: { city: string }) => {
    const query = params.city ? `?city=${params.city}` : ""
    router.push(`/hotels${query}`)
  }

  return (
    <>
      <Navbar />

      <main>
        {/* Hero */}
        <section className="relative flex min-h-[540px] items-center overflow-hidden md:min-h-[600px]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-india.jpg"
              alt="Discover hotels across India"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/30" />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 pt-28">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              Explore India
            </p>
            <h1 className="mt-3 max-w-2xl font-serif text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl text-balance">
              Book Hotels Across India at Best Prices
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-primary-foreground/70 md:text-lg">
              From heritage palaces in Rajasthan to beachfront resorts in Goa.
              Discover 12+ handpicked hotels in 6 cities.
            </p>

            <div className="mt-8 max-w-4xl">
              <SearchBar onSearch={handleSearch} variant="landing" />
            </div>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Top Destinations
              </p>
              <h2 className="mt-1 font-serif text-3xl font-bold text-foreground text-balance">
                Popular Cities in India
              </h2>
            </div>
            <Link
              href="/hotels"
              className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {cities.map((city) => (
              <CityCard key={city.name} {...city} />
            ))}
          </div>
        </section>

        {/* Featured Hotels */}
        <section className="bg-secondary py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                  Handpicked For You
                </p>
                <h2 className="mt-1 font-serif text-3xl font-bold text-foreground text-balance">
                  Featured Hotels
                </h2>
              </div>
              <Link
                href="/hotels"
                className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredHotels.slice(0, 6).map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button variant="outline" asChild>
                <Link href="/hotels">View All Hotels</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Why StayIndia */}
        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why Choose Us
            </p>
            <h2 className="mt-1 font-serif text-3xl font-bold text-foreground text-balance">
              The StayIndia Promise
            </h2>
          </div>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center rounded-xl border border-border bg-card p-6"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mt-4 font-serif text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust bar */}
        <section className="border-t border-border bg-secondary py-10">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-8 text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">12+</p>
                <p className="text-xs text-muted-foreground">Premium Hotels</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">6</p>
                <p className="text-xs text-muted-foreground">Indian Cities</p>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex items-center gap-1">
                <p className="text-2xl font-bold text-foreground">4.7</p>
                <Star className="h-5 w-5 fill-accent text-accent" />
              </div>
              <p className="text-xs text-muted-foreground -ml-6">Avg. Rating</p>
              <div className="h-8 w-px bg-border" />
              <div>
                <p className="text-2xl font-bold text-foreground">10K+</p>
                <p className="text-xs text-muted-foreground">Happy Guests</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
