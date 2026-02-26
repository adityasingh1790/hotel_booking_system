import Link from "next/link"
import { Hotel, Phone, Mail, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2">
              <Hotel className="h-5 w-5" />
              <h3 className="font-serif text-xl font-bold">StayIndia</h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-primary-foreground/60">
              India's trusted hotel booking platform. Discover the best stays
              across Delhi, Mumbai, Goa, Jaipur, and more.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/40">
              Top Destinations
            </h4>
            <nav className="flex flex-col gap-2.5" aria-label="Destinations">
              {["Delhi", "Mumbai", "Goa", "Jaipur", "Bangalore", "Udaipur"].map((city) => (
                <Link
                  key={city}
                  href={`/hotels?city=${city}`}
                  className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                >
                  Hotels in {city}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/40">
              Company
            </h4>
            <nav className="flex flex-col gap-2.5" aria-label="Company links">
              {["About Us", "Careers", "Partner With Us", "Terms & Conditions", "Privacy Policy"].map(
                (item) => (
                  <Link
                    key={item}
                    href="/"
                    className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                  >
                    {item}
                  </Link>
                )
              )}
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/40">
              Contact
            </h4>
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Phone className="h-4 w-4" />
                +91 1800-123-4567
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <Mail className="h-4 w-4" />
                support@stayindia.in
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/60">
                <MapPin className="h-4 w-4" />
                Sector 44, Gurugram, Haryana
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/40">
          &copy; {new Date().getFullYear()} StayIndia. All rights reserved. | Made in India
        </div>
      </div>
    </footer>
  )
}
