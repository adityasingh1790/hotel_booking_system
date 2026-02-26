import Link from "next/link"
import Image from "next/image"

interface CityCardProps {
  name: string
  image: string
  hotelCount: number
}

export function CityCard({ name, image, hotelCount }: CityCardProps) {
  return (
    <Link href={`/hotels?city=${name}`}>
      <div className="group relative aspect-[4/5] overflow-hidden rounded-xl">
        <Image
          src={image}
          alt={`Hotels in ${name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-serif text-xl font-bold text-primary-foreground">{name}</h3>
          <p className="mt-0.5 text-sm text-primary-foreground/70">
            {hotelCount} {hotelCount === 1 ? "property" : "properties"}
          </p>
        </div>
      </div>
    </Link>
  )
}
