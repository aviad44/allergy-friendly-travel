
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface HotelImageProps {
  name: string;
  rating?: number;
  imageUrl?: string;
}

export const HotelImage: React.FC<HotelImageProps> = ({ name, rating, imageUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  // Process image URL for optimal loading
  const getOptimizedUrl = (url: string) => {
    if (!url) return '';
    
    // For Unsplash photo IDs
    if (url.startsWith('photo-')) {
      return `https://images.unsplash.com/${url}?auto=format&fit=crop&w=1200&h=675&q=80`;
    }
    
    // For direct URLs
    return url;
  };
  
  // Preload image if URL is provided
  useEffect(() => {
    if (!imageUrl) return;
    
    const processedUrl = getOptimizedUrl(imageUrl);
    
    const img = new Image();
    img.src = processedUrl;
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      console.error(`Failed to load image for ${name}: ${processedUrl}`);
      setImageError(true);
      
      // Try one more time with a different query parameter for cache busting
      if (retryCount < 1) {
        setRetryCount(prev => prev + 1);
      }
    };
  }, [imageUrl, name, retryCount]);

  // Generate fallback gradient colors based on hotel name
  const getFallbackColor = () => {
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 360;
    return `from-[hsl(${hue},85%,25%)] to-[hsl(${(hue + 40) % 360},90%,45%)]`;
  };

  return (
    <AspectRatio ratio={16/9} className="relative w-full mb-4 overflow-hidden rounded-lg">
      {imageUrl && !imageError ? (
        <>
          {/* Placeholder while image loads */}
          {!imageLoaded && (
            <div className={`h-full w-full bg-gradient-to-b ${getFallbackColor()} flex items-center justify-center`}>
              <div className="text-center px-4">
                <h2 className="text-xl font-bold text-white">{name}</h2>
                {rating && (
                  <div className="mt-2 inline-flex items-center px-2.5 py-1 bg-white rounded-full shadow-sm">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1.5" />
                    <span className="text-sm font-medium">{rating}/5</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Actual image */}
          <img 
            src={getOptimizedUrl(imageUrl)} 
            alt={`${name} - Hotel view`}
            className={`h-full w-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="eager"
          />
        </>
      ) : (
        // Fallback gradient background
        <div className={`h-full w-full bg-gradient-to-b ${getFallbackColor()} flex items-center justify-center`}>
          <div className="text-center px-4">
            <h2 className="text-xl font-bold text-white">{name}</h2>
            {rating && (
              <div className="mt-2 inline-flex items-center px-2.5 py-1 bg-white rounded-full shadow-sm">
                <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1.5" />
                <span className="text-sm font-medium">{rating}/5</span>
              </div>
            )}
          </div>
        </div>
      )}
    </AspectRatio>
  );
};
