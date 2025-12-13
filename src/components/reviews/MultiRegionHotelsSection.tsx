import { Hotel, Restaurant } from "@/types/definitions";
import { HotelCard } from "@/components/hotels/HotelCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface RegionConfig {
  key: string;
  name: string;
  description: string;
  hotelFilter: (hotel: Hotel) => boolean;
  restaurants?: Restaurant[];
}

interface MultiRegionHotelsSectionProps {
  hotels: Hotel[];
  restaurants?: Restaurant[];
  regionDescriptions?: Record<string, string>;
  destinationName: string;
}

export const MultiRegionHotelsSection = ({ 
  hotels, 
  restaurants, 
  regionDescriptions,
  destinationName 
}: MultiRegionHotelsSectionProps) => {
  const regions: RegionConfig[] = [
    {
      key: 'madeira',
      name: 'Madeira, Portugal',
      description: regionDescriptions?.madeira || '',
      hotelFilter: (hotel) => hotel.location?.includes('Madeira') || hotel.location?.includes('Portugal') || false
    },
    {
      key: 'hurghada',
      name: 'Hurghada, Egypt',
      description: regionDescriptions?.hurghada || '',
      hotelFilter: (hotel) => hotel.location?.includes('Hurghada') || hotel.location?.includes('Egypt') || false
    },
    {
      key: 'canary',
      name: 'Canary Islands, Spain',
      description: regionDescriptions?.canary || '',
      hotelFilter: (hotel) => hotel.location?.includes('Canary') || hotel.location?.includes('Lanzarote') || hotel.location?.includes('Tenerife') || false
    },
    {
      key: 'israel',
      name: 'Israel',
      description: regionDescriptions?.israel || '',
      hotelFilter: (hotel) => hotel.location?.includes('Israel') || hotel.location?.includes('Tel Aviv') || hotel.location?.includes('Eilat') || false
    }
  ];

  // Group hotels and restaurants by region
  const getHotelsForRegion = (region: RegionConfig) => hotels.filter(region.hotelFilter);
  const getRestaurantsForRegion = (region: RegionConfig) => 
    restaurants?.filter(r => 
      r.address?.includes('Israel') || 
      r.address?.includes('Tel Aviv') || 
      r.location?.includes('Israel')
    ) || [];

  return (
    <section className="space-y-8">
      {regions.map((region, index) => {
        const regionHotels = getHotelsForRegion(region);
        const regionRestaurants = region.key === 'israel' ? getRestaurantsForRegion(region) : [];
        
        if (regionHotels.length === 0) return null;

        return (
          <div key={region.key} className="space-y-6">
            {index > 0 && <Separator className="bg-primary/10 h-0.5" />}
            
            {/* Region Description */}
            {region.description && (
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: region.description }}
              />
            )}

            {/* Region Hotels */}
            <div className="space-y-4">
              {regionHotels.map((hotel, hotelIndex) => (
                <Card key={hotel.id || hotelIndex} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-start justify-between gap-2">
                      <span className="text-xl font-semibold text-foreground">{hotel.name}</span>
                      {hotel.stars && (
                        <span className="text-amber-500 text-sm whitespace-nowrap">
                          {'★'.repeat(hotel.stars)}
                        </span>
                      )}
                    </CardTitle>
                    {hotel.address && (
                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <MapPin className="h-4 w-4" />
                        {hotel.address}
                      </a>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">{hotel.description}</p>
                    
                    {hotel.quote && (
                      <blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground">
                        "{hotel.quote}"
                      </blockquote>
                    )}

                    {hotel.allergenFriendly && hotel.allergenFriendly.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {hotel.allergenFriendly.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {hotel.bookingUrl && (
                      <a
                        href={hotel.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                      >
                        Visit Official Website
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Israel Restaurants */}
            {region.key === 'israel' && regionRestaurants.length > 0 && (
              <div className="space-y-4 mt-6">
                <h3 className="text-xl font-semibold text-foreground">Allergy-Friendly Restaurants in Israel</h3>
                {regionRestaurants.map((restaurant, restIndex) => (
                  <Card key={restaurant.name || restIndex} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-start justify-between gap-2">
                        <span className="text-lg font-semibold text-foreground">{restaurant.name}</span>
                        {restaurant.isPurelyAllergyFriendly && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full whitespace-nowrap">
                            100% Allergy-Friendly
                          </span>
                        )}
                      </CardTitle>
                      {restaurant.address && (
                        <a 
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          <MapPin className="h-4 w-4" />
                          {restaurant.address}
                        </a>
                      )}
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-muted-foreground">{restaurant.description}</p>
                      
                      {restaurant.allergyInfo && (
                        <p className="text-sm text-green-700 font-medium">
                          {restaurant.allergyInfo}
                        </p>
                      )}

                      {restaurant.websiteUrl && (
                        <a
                          href={restaurant.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
                        >
                          Visit Website
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};