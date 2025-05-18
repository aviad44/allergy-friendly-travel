
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { getResponsiveImageProps } from '@/utils/image-optimization';

interface HotelImageProps {
  name: string;
  rating?: number;
  imageUrl?: string;
}

export const HotelImage: React.FC<HotelImageProps> = ({ name, rating, imageUrl }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Process image URL for optimal loading
  const getOptimizedUrl = (url: string) => {
    if (!url) return '';
    
    // For Unsplash photo IDs
    if (url.startsWith('photo-')) {
      return `https://images.unsplash.com/${url}?fm=webp&fit=crop&w=1200&h=675&q=80`;
    }
    
    // For direct URLs
    if (url.includes('unsplash.com') && !url.includes('fm=webp')) {
      const baseUrl = url.split('?')[0];
      return `${baseUrl}?fm=webp&fit=crop&w=1200&h=675&q=80`;
    }
    
    return url;
  };
  
  // Get explicit dimensions for the image
  const width = 1200;
  const height = 675;
  
  // Preload image if URL is provided
  useEffect(() => {
    if (!imageUrl) return;
    
    const processedUrl = getOptimizedUrl(imageUrl);
    
    const img = new Image();
    img.src = processedUrl;
    img.width = width;
    img.height = height;
    img.onload = () => {
      setImageLoaded(true);
      setImageError(false);
    };
    img.onerror = () => {
      console.error(`Failed to load image for ${name}: ${processedUrl}`);
      setImageError(true);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [imageUrl, name]);

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
          
          {/* Actual image with proper attributes */}
          <img 
            src={getOptimizedUrl(imageUrl)} 
            alt={`${name} - Hotel view`}
            className={`h-full w-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            loading="lazy"
            width={width}
            height={height}
            decoding="async"
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
