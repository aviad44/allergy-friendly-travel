
import React, { useState, useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface HotelImageProps {
  name: string;
  rating?: number;
}

export const HotelImage: React.FC<HotelImageProps> = ({ name, rating }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Use intersection observer to only render the gradient when in view
  useEffect(() => {
    if (!imageRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(imageRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Generate a unique gradient based on hotel name for visual variety
  const getHotelGradient = () => {
    // Create a simple hash from the hotel name
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Define gradient pairs for better visuals
    const gradientPairs = [
      ['#93c5fd', '#e0f2fe'], // blue
      ['#6ee7b7', '#d1fae5'], // green
      ['#fcd34d', '#fef3c7'], // yellow
      ['#c4b5fd', '#ede9fe'], // purple
      ['#fb923c', '#ffedd5'], // orange
    ];
    
    // Select a gradient based on the hash
    const index = hash % gradientPairs.length;
    const [from, to] = gradientPairs[index];
    
    return `linear-gradient(135deg, ${from}, ${to})`;
  };

  return (
    <AspectRatio ref={imageRef} ratio={16/9} className="relative w-full mb-4 overflow-hidden rounded-lg">
      <div 
        className="h-full w-full flex items-center justify-center transition-opacity duration-500"
        style={{ 
          background: isVisible ? getHotelGradient() : '#f3f4f6',
          opacity: isVisible ? 1 : 0.7
        }}
      >
        <div className="text-center px-4">
          <h2 className="text-xl font-bold text-teal-700">{name}</h2>
          {rating && (
            <div className="mt-2 inline-flex items-center px-2.5 py-1 bg-white rounded-full shadow-sm">
              <Star className="h-4 w-4 text-amber-500 fill-amber-500 mr-1.5" />
              <span className="text-sm font-medium">{rating}/5</span>
            </div>
          )}
        </div>
      </div>
    </AspectRatio>
  );
};
