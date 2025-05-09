
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
  const [imgSrc, setImgSrc] = useState('');
  
  // Process image URL based on the type of image reference
  useEffect(() => {
    const processImageUrl = () => {
      // First, check if the ID is directly in our constants
      const destKey = id as keyof typeof DESTINATION_IMAGES;
      if (destKey in DESTINATION_IMAGES) {
        console.log(`DestinationCard: Using constant image for ${id}: ${DESTINATION_IMAGES[destKey]}`);
        return DESTINATION_IMAGES[destKey];
      }
      
      // If we have a direct URL from props, use it
      if (image && (image.startsWith('/') || image.startsWith('http'))) {
        return image;
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
            }}
            onError={(e) => {
              console.error(`DestinationCard: Failed to load image for ${name}: ${imgSrc}`);
              
              // Fall back to a placeholder
              const fallbackSrc = `https://placehold.co/400x225/1e3a8a/ffffff?text=${name}`;
              (e.target as HTMLImageElement).src = fallbackSrc;
              
              // Give the new image a chance to load
              setTimeout(() => {
                setImageLoaded(true);
              }, 100);
            }}
            loading="eager" 
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
