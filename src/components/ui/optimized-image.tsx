import React, { useState, useEffect } from 'react';
import { createResponsiveSrcSet, optimizeImageUrl } from '@/utils/image-optimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  displayWidth?: number;
  displayHeight?: number;
  priority?: boolean;
  quality?: number;
}

/**
 * Optimized image component that automatically handles:
 * - WebP format conversion for better compression
 * - Responsive srcSet for different screen sizes
 * - Proper sizing to prevent layout shift
 * - Lazy loading with intersection observer
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  displayWidth,
  displayHeight,
  priority = false,
  quality = 80
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [imgRef, setImgRef] = useState<HTMLDivElement | null>(null);

  // Calculate optimal dimensions
  const finalWidth = width || displayWidth || (window.innerWidth < 768 ? 400 : 800);
  const finalHeight = height || displayHeight || Math.floor(finalWidth * 0.5625); // 16:9 default

  // Get optimized src and srcSet
  const optimizedSrc = optimizeImageUrl(src, { 
    width: finalWidth, 
    quality,
    format: 'webp' 
  });
  
  const { srcSet, sizes } = createResponsiveSrcSet(src, displayWidth);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef || priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    observer.observe(imgRef);

    return () => {
      if (imgRef) observer.unobserve(imgRef);
    };
  }, [imgRef, priority]);

  // Placeholder while loading
  const placeholder = (
    <div 
      className={`bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse ${className}`}
      style={{ 
        width: displayWidth || finalWidth, 
        height: displayHeight || finalHeight,
        minWidth: displayWidth || finalWidth,
        minHeight: displayHeight || finalHeight
      }}
    />
  );

  if (!isInView) {
    return (
      <div
        ref={setImgRef}
        className={className}
        style={{ 
          width: displayWidth || finalWidth, 
          height: displayHeight || finalHeight 
        }}
      >
        {placeholder}
      </div>
    );
  }

  return (
    <div className="relative">
      {!isLoaded && placeholder}
      <img
        src={optimizedSrc}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        width={finalWidth}
        height={finalHeight}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        style={{
          width: displayWidth || 'auto',
          height: displayHeight || 'auto',
          maxWidth: '100%'
        }}
        onLoad={() => setIsLoaded(true)}
        onError={(e) => {
          console.error(`Failed to load optimized image: ${optimizedSrc}`);
          setIsLoaded(true);
        }}
      />
    </div>
  );
};