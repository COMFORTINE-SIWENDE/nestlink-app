import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Listing } from "../types";

interface ListingsContextType {
  listings: Listing[];
  featuredListings: Listing[];
  isLoading: boolean;
  searchListings: (query: string, filters?: any) => Promise<Listing[]>;
  refreshListings: () => Promise<void>;
}

const ListingsContext = createContext<ListingsContextType | undefined>(
  undefined
);

interface ListingsProviderProps {
  children: ReactNode;
}

export const ListingsProvider: React.FC<ListingsProviderProps> = ({
  children,
}) => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Generate mock listings data
  const generateMockListings = (count: number): Listing[] => {
    const types = ["apartment", "house", "room", "studio", "hostel"];
    const locations = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"];
    const amenities = ["Wi-Fi", "Parking", "Pool", "Gym", "Kitchen", "AC"];

    return Array.from({ length: count }, (_, i) => {
      const randomType = types[Math.floor(Math.random() * types.length)];
      const randomLocation =
        locations[Math.floor(Math.random() * locations.length)];

      return {
        id: `listing-${i + 1}`,
        title: `${
          randomType.charAt(0).toUpperCase() + randomType.slice(1)
        } in ${randomLocation}`,
        description: `Beautiful ${randomType} located in the heart of ${randomLocation}. Perfect for short and long stays.`,
        price: Math.floor(Math.random() * 50000) + 10000,
        location: `${randomLocation}, Kenya`,
        coordinates: {
          latitude: -1.286389 + (Math.random() - 0.5) * 0.1,
          longitude: 36.817223 + (Math.random() - 0.5) * 0.1,
        },
        type: randomType as any,
        bedrooms: Math.floor(Math.random() * 5) + 1,
        bathrooms: Math.floor(Math.random() * 3) + 1,
        area: Math.floor(Math.random() * 200) + 50,
        amenities: amenities.slice(
          0,
          Math.floor(Math.random() * amenities.length) + 1
        ),
        images: [
          `https://picsum.photos/400/300?random=${i + 1}`,
          `https://picsum.photos/400/300?random=${i + 2}`,
          `https://picsum.photos/400/300?random=${i + 3}`,
        ],
        host: {
          id: `user-${i + 1}`,
          name: `Host ${i + 1}`,
          email: `host${i + 1}@example.com`,
          isHost: true,
        },
        rating: Math.random() * 2 + 3, // 3-5 stars
        reviewCount: Math.floor(Math.random() * 100),
        isAvailable: Math.random() > 0.2, // 80% available
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    });
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockListings = generateMockListings(20);
      setListings(mockListings);
      setFeaturedListings(mockListings.filter((_, i) => i < 5)); // First 5 as featured
    } catch (error) {
      console.error("Error loading listings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchListings = async (query: string, filters?: any) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Simple search implementation
      return listings.filter(
        (listing) =>
          listing.title.toLowerCase().includes(query.toLowerCase()) ||
          listing.location.toLowerCase().includes(query.toLowerCase()) ||
          listing.description.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error("Search error:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const refreshListings = async () => {
    setIsLoading(true);
    try {
      await loadInitialData();
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ListingsContext.Provider
      value={{
        listings,
        featuredListings,
        isLoading,
        searchListings,
        refreshListings,
      }}
    >
      {children}
    </ListingsContext.Provider>
  );
};

export const useListings = () => {
  const context = useContext(ListingsContext);
  if (context === undefined) {
    throw new Error("useListings must be used within a ListingsProvider");
  }
  return context;
};
