
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { DESTINATION_IMAGES } from '@/constants/destinations';

interface DestinationCardProps {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  path: string;
}

export const DestinationCard = ({
  id,
  name,
  country,
  description,
  image,
  path
}: DestinationCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  
  // Process image URL based on the type of image reference
  useEffect(() => {
    const processImageUrl = () => {
      // CRITICAL: Define direct hardcoded paths for problematic destinations
      // This is our highest priority source of truth for these specific destinations
      const criticalDestinations: Record<string, string> = {
        'hotel-chains': "/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png",
        'cyprus': "/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png", // Updated Cyprus image with beachfront resort
        'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=800&q=80",
        'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
        'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
        'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80"
      };
      
      // ALWAYS check if the ID directly matches our critical destinations first
      if (id in criticalDestinations) {
        console.log(`DestinationCard: Using critical hardcoded image for ${id}: ${criticalDestinations[id]}`);
        return criticalDestinations[id];
      }
      
      // If we have a direct URL from props, use it (second priority)
      if (image && (image.startsWith('/') || image.startsWith('http'))) {
        return image;
      }
      
      // For Unsplash photo IDs (third priority)
      if (image && image.startsWith('photo-')) {
        const isMobile = window.innerWidth < 768;
        const width = isMobile ? 400 : 800;
        return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=80`;
      }
      
      // Look up in our destination constants (fourth priority)
      const destKey = id as keyof typeof DESTINATION_IMAGES;
      if (DESTINATION_IMAGES[destKey]) {
        return DESTINATION_IMAGES[destKey];
      }
      
      // Final fallback - use placeholder with name
      return `https://placehold.co/400x225/1e3a8a/ffffff?text=${name}`;
    };
    
    const url = processImageUrl();
    console.log(`DestinationCard: Final image URL for ${name} (${id}): ${url}`);
    setImgSrc(url);
  }, [image, id, name]);

  return (
    <Link to={path} className="group">
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-40 overflow-hidden bg-blue-100">
          {/* Loading state */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-700 animate-pulse flex items-center justify-center">
              <span className="text-white font-semibold">{name}</span>
            </div>
          )}
          
          {/* Main image */}
          <img
            src={imgSrc}
            alt={id === 'cyprus' 
              ? `Beautiful beachfront resort in Cyprus with crystal clear turquoise waters - Allergy-friendly Mediterranean destination`
              : `${name}, ${country} - Allergy-friendly destination`}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => {
              console.log(`DestinationCard: Successfully loaded image for ${name}: ${imgSrc}`);
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={(e) => {
              console.error(`DestinationCard: Failed to load image for ${name}: ${imgSrc}`);
              setImageError(true);
              
              // Critical fallbacks using hardcoded values for known problematic destinations
              const errorFallbacks: Record<string, string> = {
                'hotel-chains': "/lovable-uploads/0ec03a74-44c3-4178-8f9e-afc0117ce674.png",
                'cyprus': "/lovable-uploads/5a52322f-61d1-4fcb-8449-49f78b0a8bca.png", 
                'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=800&q=80",
                'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
                'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
                'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80"
              };
              
              let fallbackSrc;
              if (id in errorFallbacks) {
                console.log(`DestinationCard: Using fallback for ${id}: ${errorFallbacks[id]}`);
                fallbackSrc = errorFallbacks[id];
              } else {
                fallbackSrc = `https://placehold.co/400x225/1e3a8a/ffffff?text=${name}`;
              }
              
              // Apply the fallback directly
              (e.target as HTMLImageElement).src = fallbackSrc;
              
              // Give the new image a chance to load
              setTimeout(() => {
                setImageLoaded(true);
              }, 100);
            }}
            loading="eager" // Use eager for important above-the-fold images
            width="400"
            height="225"
          />
          
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
          
          {/* Destination title overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-bold text-xl">{name}</h3>
            <p className="text-gray-200 text-sm">{country}</p>
          </div>
        </div>
        <div className="p-4">
          <p className="text-gray-600 mb-3 text-sm">
            {description}
          </p>
          <div className="flex items-center text-teal-600 font-medium text-sm">
            <span>View details</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </Link>
  );
};
