
import React, { useState } from 'react';
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
  
  // Process image URL for optimal loading
  const processImageUrl = (imgSrc: string) => {
    if (imgSrc.startsWith('photo-')) {
      // For Unsplash URLs, optimize for device
      const isMobile = window.innerWidth < 768;
      const width = isMobile ? 400 : 800;
      return `https://images.unsplash.com/${imgSrc}?auto=format&fit=crop&w=${width}&q=80`;
    }
    return imgSrc;
  };
  
  // Get fallback image in case of error
  const getFallbackImage = () => {
    // Map specific destinations to reliable images
    const fallbacks: Record<string, string> = {
      'cyprus': 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80',
      'crete': 'https://images.unsplash.com/photo-1533760881669-80db4d7b4c15?auto=format&fit=crop&w=800&q=80',
      'barcelona': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=800&q=80',
      'default': 'https://images.unsplash.com/photo-1505578183806-3d2c2001570e?auto=format&fit=crop&w=800&q=80'
    };
    
    return fallbacks[id] || fallbacks.default;
  };

  return (
    <Link to={path} className="group">
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-40 overflow-hidden bg-blue-100">
          {/* Placeholder while image loads */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-b from-blue-200 to-blue-100 animate-pulse"></div>
          )}
          
          <img
            src={!imageError ? processImageUrl(image) : getFallbackImage()}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error(`Failed to load image for ${name}: ${image}`);
              setImageError(true);
              setImageLoaded(true); // Treat error as "loaded" to show fallback
              
              // Try fallback image
              (e.target as HTMLImageElement).src = getFallbackImage();
            }}
            loading="lazy"
            width="400"
            height="225"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
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
