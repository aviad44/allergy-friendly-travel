
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

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
      // Define direct hardcoded paths for ALL problematic destinations
      const directImageMap: Record<string, string> = {
        'hotel-chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
        'hotel_chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
        'cyprus': "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png",
        'crete': "https://images.unsplash.com/photo-1469796466635-455ede028aca?auto=format&fit=crop&w=800&q=80",
        'turkey': "/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png",
        'toronto': "/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png",
        'barcelona': "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80"
      };
      
      // Always check if the ID directly matches our hardcoded map first
      if (id in directImageMap) {
        console.log(`Using direct hardcoded image for ${id} in DestinationCard: ${directImageMap[id]}`);
        return directImageMap[id];
      }
      
      // If we have a direct URL from props, use it
      if (image && (image.startsWith('/') || image.startsWith('http'))) {
        return image;
      }
      
      // For Unsplash photo IDs
      if (image && image.startsWith('photo-')) {
        const isMobile = window.innerWidth < 768;
        const width = isMobile ? 400 : 800;
        return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=${width}&q=80`;
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
            alt={`${name}, ${country} - Allergy-friendly destination`}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => {
              console.log(`DestinationCard: Successfully loaded image for ${name}: ${imgSrc}`);
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={(e) => {
              console.error(`DestinationCard: Failed to load image for ${name}: ${imgSrc}`);
              setImageError(true);
              
              // Dedicated fallback handling using hardcoded values for known problematic destinations
              const errorFallbacks: Record<string, string> = {
                'hotel-chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
                'hotel_chains': "/lovable-uploads/1e92be73-4bcc-4e75-9bb4-b500ed1ecd63.png",
                'cyprus': "/lovable-uploads/8232f9cd-cae4-43ee-a84b-49dc23e86eb1.png", 
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
