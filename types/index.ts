export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  isHost: boolean;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: "apartment" | "house" | "room" | "studio" | "hostel" | "other";
  bedrooms: number;
  bathrooms: number;
  area: number;
  amenities: string[];
  images: string[];
  host: User;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  listingId: string;
  userId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: string;
  updatedAt: string;
}
