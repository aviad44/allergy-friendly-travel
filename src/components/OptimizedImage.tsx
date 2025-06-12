
import React, { useState, useRef, useEffect } from 'react';
import { createOptimizedObserver, getOptimizedImageUrl } from '@/utils/performanceOptimizer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width = 1200,
  height = 675,
  priority = false,
  sizes = '100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imageSrc, setImageSrc] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate responsive srcSet for better performance
  const generateSrcSet = (originalSrc: string) => {
    if (!originalSrc.includes('unsplash.com')) return '';
    
    const widths = [640, 750, 828, 1080, 1200, 1920];
    return widths
      .map(w => `${getOptimizedImageUrl(originalSrc, w, 75)} ${w}w`)
      .join(', ');
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return;

    const observer = createOptimizedObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Load optimized image when in view
  useEffect(() => {
    if (isInView && src) {
      const optimizedSrc = getOptimizedImageUrl(src, width, 80);
      setImageSrc(optimizedSrc);
    }
  }, [isInView, src, width]);

  const srcSet = generateSrcSet(src);

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* Low quality placeholder while loading */}
      {!isLoaded && isInView && (
        <div 
          className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {/* Main optimized image */}
      {isInView && imageSrc && (
        <img
          src={imageSrc}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            console.error(`Failed to load optimized image: ${imageSrc}`);
            setIsLoaded(true); // Show something even if failed
          }}
        />
      )}
    </div>
  );
};
