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
  
  const processImageUrl = (imgSrc: string) => {
    if (imgSrc.startsWith('photo-')) {
      const isMobile = window.innerWidth < 768;
      const width = isMobile ? 400 : 800;
      return `https://images.unsplash.com/${imgSrc}?auto=format&fit=crop&w=${width}&q=80`;
    }
    return imgSrc;
  };
  
  const getFallbackImage = () => {
    const fallbacks: Record<string, string> = {
      'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
      'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
      'cyprus': 'https://images.unsplash.com/photo-1518358246973-95637f473611?auto=format&fit=crop&w=800&q=80',
      'barcelona': 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=800&q=80',
      'turkey': '/lovable-uploads/b78bfbbf-c77e-4c04-9a24-7209bdec53e3.png',
      'tokyo': 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?auto=format&fit=crop&w=800&q=80',
      'thailand': 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      'crete': 'https://images.unsplash.com/photo-1533760881669-80db4d7b4c15?auto=format&fit=crop&w=800&q=80',
      'toronto': '/lovable-uploads/e6eaaffe-010b-46ee-859c-aacff4659ad1.png',
      'default': `https://placehold.co/400x225/1e3a8a/ffffff?text=${name}`
    };
    
    return fallbacks[id.toLowerCase()] || fallbacks.default;
  };
  
  useEffect(() => {
    if (image) {
      setImgSrc(processImageUrl(image));
    } else {
      setImgSrc(getFallbackImage());
    }
    
    const preloadImage = new Image();
    preloadImage.src = image ? processImageUrl(image) : getFallbackImage();
    
    preloadImage.onload = () => {
      setImageLoaded(true);
    };
    
    preloadImage.onerror = () => {
      console.error(`Failed to preload image for ${name}`);
      setImgSrc(getFallbackImage());
    };
  }, [image, id, name]);

  return (
    <Link to={path} className="group">
      <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow duration-300">
        <div className="relative h-40 overflow-hidden bg-blue-100">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-blue-700 animate-pulse flex items-center justify-center">
              <span className="text-white font-semibold">{name}</span>
            </div>
          )}
          
          <img
            src={!imageError ? imgSrc : getFallbackImage()}
            alt={name}
            className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            onError={(e) => {
              console.error(`Failed to load image for ${name}: ${imgSrc}`);
              setImageError(true);
              setImageLoaded(true);
              
              (e.target as HTMLImageElement).src = getFallbackImage();
            }}
            loading="eager"
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
