export interface Hotel {
  id: string
  name: string
  description: string
  longDescription: string
  city: string
  address: string
  pricePerNight: number
  starRating: number
  userRating: number
  reviewCount: number
  images: string[]
  amenities: string[]
  propertyType: "Hotel" | "Resort" | "Heritage" | "Boutique"
  roomsAvailable: number
  totalRooms: number
  roomCategories: RoomCategory[]
  featured: boolean
}

export interface RoomCategory {
  id: string
  name: string
  price: number
  size: number
  maxGuests: number
  amenities: string[]
  available: number
}

export interface Booking {
  id: string
  hotelId: string
  hotelName: string
  hotelImage: string
  hotelCity: string
  roomCategory: string
  guestName: string
  guestEmail: string
  guestPhone: string
  checkIn: string
  checkOut: string
  guests: number
  rooms: number
  totalPrice: number
  taxes: number
  status: "confirmed" | "cancelled" | "completed"
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
}

export const cities = [
  { name: "Delhi", image: "/images/city-delhi.jpg", hotelCount: 3 },
  { name: "Mumbai", image: "/images/city-mumbai.jpg", hotelCount: 2 },
  { name: "Goa", image: "/images/city-goa.jpg", hotelCount: 2 },
  { name: "Jaipur", image: "/images/city-jaipur.jpg", hotelCount: 2 },
  { name: "Bangalore", image: "/images/city-bangalore.jpg", hotelCount: 2 },
  { name: "Udaipur", image: "/images/city-udaipur.jpg", hotelCount: 1 },
]

export const hotels: Hotel[] = [
  {
    id: "1",
    name: "The Imperial Palace",
    description: "A grand heritage hotel in the heart of New Delhi with regal interiors and world-class dining.",
    longDescription: "The Imperial Palace is one of Delhi's most iconic luxury hotels, blending colonial-era grandeur with modern comforts. Located on Janpath, it offers unmatched access to Connaught Place, India Gate, and the city's cultural landmarks. Each room is adorned with original artwork, and the hotel boasts award-winning restaurants, a rejuvenating spa, and lush gardens.",
    city: "Delhi",
    address: "Janpath, Connaught Place, New Delhi",
    pricePerNight: 8500,
    starRating: 5,
    userRating: 4.8,
    reviewCount: 2340,
    images: ["/images/hotel-delhi.jpg", "/images/hero-room.jpg", "/images/room-suite.jpg"],
    amenities: ["Free WiFi", "Breakfast", "Pool", "Spa", "AC", "Restaurant", "Bar", "Gym", "Parking", "Room Service"],
    propertyType: "Heritage",
    roomsAvailable: 12,
    totalRooms: 45,
    featured: true,
    roomCategories: [
      { id: "1a", name: "Deluxe Room", price: 8500, size: 38, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "Mini Bar"], available: 5 },
      { id: "1b", name: "Premium Suite", price: 14500, size: 65, maxGuests: 3, amenities: ["AC", "WiFi", "TV", "Mini Bar", "Balcony", "Bathtub"], available: 3 },
      { id: "1c", name: "Royal Suite", price: 25000, size: 110, maxGuests: 4, amenities: ["AC", "WiFi", "TV", "Mini Bar", "Balcony", "Bathtub", "Living Room", "Butler Service"], available: 2 },
    ],
  },
  {
    id: "2",
    name: "Taj Seaside Mumbai",
    description: "An iconic seafront hotel overlooking the Arabian Sea with timeless elegance.",
    longDescription: "Taj Seaside Mumbai stands as an architectural marvel overlooking the Gateway of India and the Arabian Sea. This legendary hotel has hosted royalty, dignitaries, and celebrities since its opening. Experience world-class hospitality with exquisite dining at multiple award-winning restaurants, a luxurious spa, and the famous Sea Lounge with panoramic ocean views.",
    city: "Mumbai",
    address: "Apollo Bunder, Colaba, Mumbai",
    pricePerNight: 12000,
    starRating: 5,
    userRating: 4.9,
    reviewCount: 3120,
    images: ["/images/hotel-mumbai.jpg", "/images/room-ocean-view.jpg", "/images/room-suite.jpg"],
    amenities: ["Free WiFi", "Breakfast", "Pool", "Spa", "AC", "Restaurant", "Bar", "Gym", "Parking", "Room Service", "Sea View"],
    propertyType: "Hotel",
    roomsAvailable: 8,
    totalRooms: 60,
    featured: true,
    roomCategories: [
      { id: "2a", name: "Superior Sea View", price: 12000, size: 42, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "Sea View", "Mini Bar"], available: 4 },
      { id: "2b", name: "Luxury Suite", price: 22000, size: 80, maxGuests: 3, amenities: ["AC", "WiFi", "TV", "Sea View", "Mini Bar", "Living Room", "Balcony"], available: 2 },
      { id: "2c", name: "Presidential Suite", price: 45000, size: 150, maxGuests: 4, amenities: ["AC", "WiFi", "TV", "Sea View", "Mini Bar", "Living Room", "Balcony", "Private Dining", "Butler Service"], available: 1 },
    ],
  },
  {
    id: "3",
    name: "Goa Beach Paradise Resort",
    description: "A tropical beachfront resort in South Goa with private beach access and infinity pool.",
    longDescription: "Nestled along the pristine shores of South Goa, the Beach Paradise Resort offers the ultimate tropical getaway. With direct beach access, an infinity pool overlooking the Arabian Sea, and Portuguese-inspired architecture, every moment is designed for relaxation. Enjoy fresh seafood at the beachside restaurant, unwind at the open-air spa, or explore the vibrant Goan culture.",
    city: "Goa",
    address: "Colva Beach Road, South Goa",
    pricePerNight: 6500,
    starRating: 4,
    userRating: 4.6,
    reviewCount: 1870,
    images: ["/images/hotel-goa.jpg", "/images/room-garden.jpg", "/images/room-ocean-view.jpg"],
    amenities: ["Free WiFi", "Breakfast", "Pool", "Beach Access", "AC", "Restaurant", "Bar", "Spa", "Water Sports"],
    propertyType: "Resort",
    roomsAvailable: 15,
    totalRooms: 40,
    featured: true,
    roomCategories: [
      { id: "3a", name: "Garden View Room", price: 6500, size: 35, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "Garden View"], available: 8 },
      { id: "3b", name: "Sea Facing Cottage", price: 9500, size: 50, maxGuests: 3, amenities: ["AC", "WiFi", "TV", "Sea View", "Private Patio"], available: 4 },
      { id: "3c", name: "Beach Villa", price: 15000, size: 85, maxGuests: 4, amenities: ["AC", "WiFi", "TV", "Sea View", "Private Pool", "Outdoor Shower"], available: 2 },
    ],
  },
  {
    id: "4",
    name: "Rajputana Heritage Haveli",
    description: "A restored haveli-style palace hotel in the Pink City with authentic Rajasthani charm.",
    longDescription: "Step back in time at the Rajputana Heritage Haveli, a beautifully restored 18th-century haveli in the heart of Jaipur. Every room tells a story through hand-painted frescoes, antique furnishings, and traditional Rajasthani craftsmanship. Enjoy panoramic views of the Nahargarh Fort from the rooftop restaurant, relax in the courtyard pool, and experience traditional folk performances.",
    city: "Jaipur",
    address: "Bani Park, Near Nahargarh Fort, Jaipur",
    pricePerNight: 5200,
    starRating: 4,
    userRating: 4.7,
    reviewCount: 1560,
    images: ["/images/hotel-jaipur.jpg", "/images/hero-room.jpg", "/images/room-garden.jpg"],
    amenities: ["Free WiFi", "Breakfast", "Pool", "AC", "Restaurant", "Heritage Tour", "Parking", "Room Service"],
    propertyType: "Heritage",
    roomsAvailable: 10,
    totalRooms: 28,
    featured: true,
    roomCategories: [
      { id: "4a", name: "Heritage Room", price: 5200, size: 32, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "Heritage Decor"], available: 5 },
      { id: "4b", name: "Maharaja Suite", price: 9800, size: 70, maxGuests: 3, amenities: ["AC", "WiFi", "TV", "Heritage Decor", "Balcony", "Bathtub"], available: 3 },
      { id: "4c", name: "Royal Palace Suite", price: 18000, size: 120, maxGuests: 4, amenities: ["AC", "WiFi", "TV", "Heritage Decor", "Terrace", "Bathtub", "Living Room"], available: 1 },
    ],
  },
  {
    id: "5",
    name: "Silicon Suites Bangalore",
    description: "A sleek modern business hotel in Whitefield, ideal for tech professionals and travelers.",
    longDescription: "Silicon Suites Bangalore is the go-to destination for business travelers visiting India's tech capital. Located in Whitefield near major IT parks, the hotel features state-of-the-art conference facilities, high-speed internet, and modern rooms with ergonomic workspaces. Relax at the rooftop pool or enjoy cuisines from around the world at the multi-cuisine restaurant.",
    city: "Bangalore",
    address: "Whitefield Main Road, Bangalore",
    pricePerNight: 4200,
    starRating: 4,
    userRating: 4.4,
    reviewCount: 980,
    images: ["/images/hotel-bangalore.jpg", "/images/room-suite.jpg", "/images/room-mountain.jpg"],
    amenities: ["Free WiFi", "Breakfast", "Pool", "AC", "Restaurant", "Gym", "Business Center", "Parking", "Room Service"],
    propertyType: "Hotel",
    roomsAvailable: 20,
    totalRooms: 55,
    featured: false,
    roomCategories: [
      { id: "5a", name: "Business Standard", price: 4200, size: 30, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "Work Desk"], available: 12 },
      { id: "5b", name: "Executive Room", price: 6800, size: 45, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "Work Desk", "Lounge Access"], available: 5 },
      { id: "5c", name: "Executive Suite", price: 11000, size: 75, maxGuests: 3, amenities: ["AC", "WiFi", "TV", "Work Desk", "Lounge Access", "Living Room"], available: 2 },
    ],
  },
  {
    id: "6",
    name: "Lake Palace Udaipur",
    description: "A floating palace hotel on Lake Pichola offering an unforgettable royal experience.",
    longDescription: "The Lake Palace Udaipur seems to float like a dream on the serene waters of Lake Pichola. This 18th-century marble palace has been transformed into one of the world's most romantic hotels. Arrive by private boat, dine under the stars with views of the City Palace and Aravalli hills, and immerse yourself in a world where every detail whispers of Mewar royalty.",
    city: "Udaipur",
    address: "Lake Pichola, Udaipur",
    pricePerNight: 18000,
    starRating: 5,
    userRating: 4.9,
    reviewCount: 1890,
    images: ["/images/hotel-udaipur.jpg", "/images/room-ocean-view.jpg", "/images/room-suite.jpg"],
    amenities: ["Free WiFi", "Breakfast", "Pool", "Spa", "AC", "Restaurant", "Bar", "Boat Transfer", "Heritage Tour", "Room Service"],
    propertyType: "Heritage",
    roomsAvailable: 5,
    totalRooms: 18,
    featured: true,
    roomCategories: [
      { id: "6a", name: "Palace Room", price: 18000, size: 45, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "Lake View", "Heritage Decor"], available: 3 },
      { id: "6b", name: "Grand Royal Suite", price: 35000, size: 95, maxGuests: 3, amenities: ["AC", "WiFi", "TV", "Lake View", "Heritage Decor", "Balcony", "Bathtub", "Living Room"], available: 1 },
      { id: "6c", name: "Maharana Suite", price: 55000, size: 160, maxGuests: 4, amenities: ["AC", "WiFi", "TV", "Lake View", "Heritage Decor", "Terrace", "Bathtub", "Living Room", "Butler Service", "Private Dining"], available: 1 },
    ],
  },
  {
    id: "7",
    name: "Gateway Business Inn Delhi",
    description: "An affordable yet comfortable business hotel near Delhi airport with excellent connectivity.",
    longDescription: "Gateway Business Inn offers the best value for business travelers visiting New Delhi. Located just 10 minutes from IGI Airport, the hotel provides clean, modern rooms with all essential amenities. The 24-hour restaurant serves North Indian and continental cuisine, and the business center is equipped for productive meetings.",
    city: "Delhi",
    address: "Aerocity, Near IGI Airport, New Delhi",
    pricePerNight: 3200,
    starRating: 3,
    userRating: 4.2,
    reviewCount: 760,
    images: ["/images/hotel-bangalore.jpg", "/images/hero-room.jpg", "/images/room-mountain.jpg"],
    amenities: ["Free WiFi", "Breakfast", "AC", "Restaurant", "Business Center", "Airport Shuttle", "Parking"],
    propertyType: "Hotel",
    roomsAvailable: 25,
    totalRooms: 50,
    featured: false,
    roomCategories: [
      { id: "7a", name: "Standard Room", price: 3200, size: 24, maxGuests: 2, amenities: ["AC", "WiFi", "TV"], available: 15 },
      { id: "7b", name: "Superior Room", price: 4500, size: 32, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "Work Desk"], available: 8 },
    ],
  },
  {
    id: "8",
    name: "Calangute Surf Hotel",
    description: "A vibrant beachside hotel in North Goa, steps from Calangute's famous beach strip.",
    longDescription: "Calangute Surf Hotel puts you right in the heart of North Goa's beach action. Just a 2-minute walk from Calangute beach, this vibrant property offers comfortable rooms with balconies, a lively poolside bar, and easy access to the best nightlife and water sports. Perfect for travelers who want to experience the energetic side of Goa.",
    city: "Goa",
    address: "Calangute Beach Road, North Goa",
    pricePerNight: 3800,
    starRating: 3,
    userRating: 4.3,
    reviewCount: 1240,
    images: ["/images/hotel-goa.jpg", "/images/room-garden.jpg", "/images/room-ocean-view.jpg"],
    amenities: ["Free WiFi", "Pool", "Beach Access", "AC", "Restaurant", "Bar", "Water Sports"],
    propertyType: "Hotel",
    roomsAvailable: 18,
    totalRooms: 35,
    featured: false,
    roomCategories: [
      { id: "8a", name: "Standard Beach Room", price: 3800, size: 28, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "Balcony"], available: 10 },
      { id: "8b", name: "Premium Pool View", price: 5500, size: 38, maxGuests: 3, amenities: ["AC", "WiFi", "TV", "Balcony", "Pool View"], available: 5 },
    ],
  },
  {
    id: "9",
    name: "Amber Fort View Jaipur",
    description: "A boutique property with stunning views of Amber Fort and the Aravalli hills.",
    longDescription: "Perched on a hillside overlooking the majestic Amber Fort, this boutique hotel offers a perfect blend of traditional Rajasthani aesthetics and modern luxury. Each room features handcrafted furniture, jharokha-style windows, and views of either the fort or the lush Aravalli valley. The rooftop terrace is the perfect spot for evening chai while watching the sunset paint the fort golden.",
    city: "Jaipur",
    address: "Amer Road, Near Amber Fort, Jaipur",
    pricePerNight: 7500,
    starRating: 4,
    userRating: 4.6,
    reviewCount: 820,
    images: ["/images/hotel-jaipur.jpg", "/images/room-mountain.jpg", "/images/room-garden.jpg"],
    amenities: ["Free WiFi", "Breakfast", "Pool", "AC", "Restaurant", "Fort View", "Parking", "Room Service", "Spa"],
    propertyType: "Boutique",
    roomsAvailable: 8,
    totalRooms: 16,
    featured: false,
    roomCategories: [
      { id: "9a", name: "Fort View Room", price: 7500, size: 35, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "Fort View"], available: 4 },
      { id: "9b", name: "Luxury Fort Suite", price: 13500, size: 60, maxGuests: 3, amenities: ["AC", "WiFi", "TV", "Fort View", "Balcony", "Bathtub", "Living Room"], available: 2 },
    ],
  },
  {
    id: "10",
    name: "Indiranagar Boutique Stay",
    description: "A trendy boutique hotel in Bangalore's hippest neighborhood, close to cafes and nightlife.",
    longDescription: "Located in the vibrant Indiranagar neighborhood, this boutique stay is perfect for the modern traveler. The hotel features chic, Instagram-worthy interiors with local art, a rooftop cafe serving artisan coffee and fusion cuisine, and is walking distance from Bangalore's best restaurants, bars, and boutiques.",
    city: "Bangalore",
    address: "100 Feet Road, Indiranagar, Bangalore",
    pricePerNight: 5800,
    starRating: 4,
    userRating: 4.5,
    reviewCount: 640,
    images: ["/images/hotel-bangalore.jpg", "/images/room-suite.jpg", "/images/hero-room.jpg"],
    amenities: ["Free WiFi", "Breakfast", "AC", "Restaurant", "Bar", "Rooftop Cafe", "Room Service"],
    propertyType: "Boutique",
    roomsAvailable: 6,
    totalRooms: 14,
    featured: false,
    roomCategories: [
      { id: "10a", name: "Studio Room", price: 5800, size: 30, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "Mini Bar"], available: 4 },
      { id: "10b", name: "Loft Suite", price: 9200, size: 55, maxGuests: 3, amenities: ["AC", "WiFi", "TV", "Mini Bar", "Balcony", "Living Area"], available: 2 },
    ],
  },
  {
    id: "11",
    name: "Marine Drive Residency Mumbai",
    description: "An elegant mid-range hotel on Marine Drive with stunning views of the Queen's Necklace.",
    longDescription: "Experience the magic of Mumbai's Marine Drive from this elegant residency. Watch the famous Queen's Necklace light up at sunset from your room, take a morning jog along the promenade, and enjoy easy access to South Mumbai's business district, Nariman Point, and cultural hotspots. The hotel offers comfortable rooms with a touch of Art Deco charm.",
    city: "Mumbai",
    address: "Marine Drive, Churchgate, Mumbai",
    pricePerNight: 7200,
    starRating: 4,
    userRating: 4.5,
    reviewCount: 1450,
    images: ["/images/hotel-mumbai.jpg", "/images/room-ocean-view.jpg", "/images/room-suite.jpg"],
    amenities: ["Free WiFi", "Breakfast", "AC", "Restaurant", "Bar", "Sea View", "Gym", "Room Service"],
    propertyType: "Hotel",
    roomsAvailable: 14,
    totalRooms: 38,
    featured: false,
    roomCategories: [
      { id: "11a", name: "City View Room", price: 7200, size: 32, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "City View"], available: 8 },
      { id: "11b", name: "Sea View Deluxe", price: 10500, size: 45, maxGuests: 2, amenities: ["AC", "WiFi", "TV", "Sea View", "Balcony"], available: 4 },
      { id: "11c", name: "Marine Suite", price: 16000, size: 70, maxGuests: 3, amenities: ["AC", "WiFi", "TV", "Sea View", "Balcony", "Living Room", "Bathtub"], available: 2 },
    ],
  },
  {
    id: "12",
    name: "Kerala Backwater Retreat",
    description: "A serene Ayurvedic resort on the backwaters of Alleppey with houseboat-style cottages.",
    longDescription: "Escape to the tranquil backwaters of Kerala at this eco-friendly retreat. Inspired by traditional houseboats, the cottages sit along the peaceful canals of Alleppey, surrounded by coconut palms and lush greenery. Indulge in authentic Ayurvedic treatments, savor Kerala cuisine cooked with fresh local ingredients, and take a sunset canoe ride through the backwaters.",
    city: "Delhi",
    address: "Alleppey Backwaters, Kerala",
    pricePerNight: 5500,
    starRating: 4,
    userRating: 4.7,
    reviewCount: 920,
    images: ["/images/hotel-kerala.jpg", "/images/room-garden.jpg", "/images/room-ocean-view.jpg"],
    amenities: ["Free WiFi", "Breakfast", "Spa", "AC", "Restaurant", "Ayurvedic Treatment", "Canoe Rides", "Yoga"],
    propertyType: "Resort",
    roomsAvailable: 8,
    totalRooms: 16,
    featured: true,
    roomCategories: [
      { id: "12a", name: "Backwater Cottage", price: 5500, size: 35, maxGuests: 2, amenities: ["AC", "WiFi", "Backwater View", "Private Patio"], available: 5 },
      { id: "12b", name: "Premium Houseboat Villa", price: 9000, size: 55, maxGuests: 3, amenities: ["AC", "WiFi", "Backwater View", "Private Deck", "Outdoor Shower"], available: 2 },
    ],
  },
]
