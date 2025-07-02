
import { ExternalLink, MapPin, Star, UtensilsCrossed } from "lucide-react";
import { Restaurant } from "@/types/definitions";

interface RestaurantsSectionProps {
  restaurants?: Restaurant[];
}

export const RestaurantsSection = ({ restaurants }: RestaurantsSectionProps) => {
  if (!restaurants || restaurants.length === 0) return null;
  
  return (
    <section className="mt-8 space-y-6">
      <h2 className="text-2xl sm:text-3xl font-semibold flex items-center gap-2">
        <UtensilsCrossed className="h-6 w-6 text-primary/80" aria-hidden="true" />
        Top 10 Gluten-Free Restaurants in Athens
      </h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        {restaurants.map((restaurant, index) => (
          <div 
            key={restaurant.id || index}
            className={`border rounded-lg p-5 shadow-sm transition-all hover:shadow-md ${
              restaurant.isPurelyAllergyFriendly 
                ? "border-l-4 border-l-green-500 bg-green-50" 
                : "border-l-4 border-l-blue-400"
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{restaurant.name}</h3>
              {restaurant.isPurelyAllergyFriendly && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  100% Gluten-Free
                </span>
              )}
            </div>
            
            <p className="text-gray-600 mb-4">{restaurant.description}</p>
            
            {restaurant.location && (
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{restaurant.location}</span>
              </div>
            )}
            
            {restaurant.features && (
              <div className="mb-3">
                {restaurant.features.map((feature, idx) => (
                  <span 
                    key={idx}
                    className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2 mb-2"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
            
            {restaurant.guestReview && (
              <div className="bg-blue-50 p-3 rounded-md mb-3">
                <div className="flex items-center mb-1">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium">Guest Review:</span>
                </div>
                <p className="text-sm italic">"{restaurant.guestReview}"</p>
              </div>
            )}
            
            {(restaurant.website || restaurant.websiteUrl) && (
              <a 
                href={restaurant.website || restaurant.websiteUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Visit website
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
