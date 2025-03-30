
import React from 'react';
import { HotelInfo } from '@/types/search';
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, Check, MapPin, Shield, Utensils } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HotelDetailsProps {
  hotel: HotelInfo;
}

export const HotelDetails: React.FC<HotelDetailsProps> = ({ hotel }) => {
  // Default image if none provided
  const defaultImage = "/placeholder.svg";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = defaultImage;
    e.currentTarget.classList.add("object-contain", "p-4");
    e.currentTarget.classList.remove("object-cover");
  };

  return (
    <div className="space-y-6">
      {/* Hotel Image */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg bg-gray-50">
        <img 
          src={hotel.imageUrl || defaultImage}
          alt={`${hotel.name}`} 
          className="w-full h-full object-cover"
          onError={handleImageError}
          loading="lazy"
        />
        {hotel.rating && (
          <div className="absolute top-4 right-4 bg-white/90 px-2.5 py-1.5 rounded-full flex items-center shadow-sm">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1.5" />
            <span className="text-sm font-medium">{hotel.rating}/5</span>
          </div>
        )}
      </div>
      
      {/* Hotel Info Header */}
      <div className="flex items-start justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{hotel.name}</h2>
          {hotel.location && (
            <div className="flex items-center mt-1.5 text-gray-600">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>{hotel.location}</span>
            </div>
          )}
        </div>
        {hotel.price && (
          <div className="bg-primary/5 px-3 py-1.5 rounded-md">
            <span className="text-xl font-bold text-primary">{hotel.price}</span>
            <span className="text-sm text-gray-500 ml-1">/night</span>
          </div>
        )}
      </div>
      
      {/* Hotel Description */}
      {hotel.description && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
          <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
        </div>
      )}
      
      {/* Allergy Features */}
      {hotel.allergyAmenities && hotel.allergyAmenities.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
            <Shield className="h-5 w-5 mr-2 text-teal-600" />
            Allergy Accommodations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hotel.allergyAmenities.map((item, index) => (
              <div key={index} className="flex items-center bg-teal-50 p-3 rounded-md">
                <span className="text-teal-600 mr-2">{item.icon}</span>
                <span className="text-gray-700">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Detail Sections */}
      <div className="space-y-6">
        {hotel.accommodations && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-teal-600" />
              Allergy Accommodations
            </h3>
            <p className="text-gray-700 leading-relaxed">{hotel.accommodations}</p>
          </div>
        )}
        
        {hotel.dietary && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <Utensils className="h-5 w-5 mr-2 text-teal-600" />
              Dietary Options
            </h3>
            <p className="text-gray-700 leading-relaxed">{hotel.dietary}</p>
          </div>
        )}
        
        {hotel.safety && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-teal-600" />
              Safety Protocols
            </h3>
            <p className="text-gray-700 leading-relaxed">{hotel.safety}</p>
          </div>
        )}
      </div>
      
      {/* Guest Reviews */}
      {hotel.reviews && hotel.reviews.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Guest Reviews</h3>
          <div className="space-y-4">
            {hotel.reviews.map((review, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-medium mr-3">
                    {review.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Guest Review</span>
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < (hotel.rating || 4) ? "text-amber-400 fill-amber-400" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 text-sm italic">{review}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Call to Action */}
      {hotel.url && (
        <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t">
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white flex-1"
            onClick={() => window.open(hotel.url, "_blank")}
          >
            Book Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline"
            className="border-teal-600 text-teal-700 hover:bg-teal-50 flex-1"
            onClick={() => window.open(`https://maps.google.com/?q=${hotel.name} ${hotel.location}`, "_blank")}
          >
            View on Map
            <MapPin className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
