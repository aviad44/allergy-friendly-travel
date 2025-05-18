
/**
 * Image optimization utilities to improve performance and LCP metrics
 */
import React from 'react';

type ImageFormat = 'webp' | 'avif' | 'jpg' | 'png';
type ImageSize = 'small' | 'medium' | 'large' | 'original';

interface OptimizedImageOptions {
  format?: ImageFormat;
  width?: number;
  quality?: number;
  blur?: boolean;
  priority?: boolean;
}

/**
 * Converts image URLs to optimized versions
 */
export const optimizeImageUrl = (imageUrl: string, options: OptimizedImageOptions = {}): string => {
  // Skip optimization for data URLs or relative local paths to uploaded files
  if (!imageUrl || imageUrl.startsWith('data:')) {
    return imageUrl;
  }
  
  // For uploaded images, return as is (they're already optimized during upload)
  if (imageUrl.startsWith('/lovable-uploads/')) {
    return imageUrl;
  }
  
  // Handle Unsplash images which already support optimization params
  if (imageUrl.includes('unsplash.com')) {
    const baseUrl = imageUrl.split('?')[0];
    const width = options.width || (window.innerWidth < 768 ? 800 : 1200);
    // Prefer AVIF for best compression, fallback to WebP
    const format = options.format || 'webp';
    const quality = options.quality || 80;
    
    return `${baseUrl}?fm=${format}&w=${width}&q=${quality}${options.blur ? '&blur=200' : ''}`;
  }
  
  // For placeholder images, add width parameter
  if (imageUrl.includes('placehold.co')) {
    const width = options.width || (window.innerWidth < 768 ? 800 : 1200);
    const height = Math.floor(width * 0.5625); // 16:9 aspect ratio
    return imageUrl.replace(/(\d+)x(\d+)/, `${width}x${height}`);
  }
  
  // For other external images, we can't optimize them directly
  return imageUrl;
}

/**
 * Creates a responsive image srcSet for different screen sizes
 * @param imageUrl Base image URL
 * @returns An object with srcSet and sizes properties
 */
export const createResponsiveSrcSet = (imageUrl: string): { srcSet: string, sizes: string } => {
  if (!imageUrl || imageUrl.startsWith('data:') || !imageUrl.includes('unsplash.com')) {
    return { srcSet: '', sizes: '' };
  }
  
  const baseUrl = imageUrl.split('?')[0];
  
  // Create optimal srcSet with both WebP and AVIF formats for modern browsers
  const srcSet = [
    // WebP format for good compression and wide support
    `${baseUrl}?fm=webp&w=480&q=80 480w`,
    `${baseUrl}?fm=webp&w=800&q=80 800w`,
    `${baseUrl}?fm=webp&w=1200&q=85 1200w`,
    `${baseUrl}?fm=webp&w=1600&q=85 1600w`,
    `${baseUrl}?fm=webp&w=2000&q=85 2000w`,
  ].join(', ');
  
  // Responsive sizes attribute based on viewport
  const sizes = '(max-width: 480px) 480px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, (max-width: 1600px) 1600px, 2000px';
  
  return { srcSet, sizes };
}

/**
 * Creates image props with all required attributes for optimal loading
 */
export const getResponsiveImageProps = (
  imageUrl: string, 
  alt: string, 
  className: string = '',
  options: OptimizedImageOptions = {}
) => {
  if (!imageUrl) {
    return {
      alt,
      className,
      width: 1200,
      height: 675,
      loading: 'lazy',
    };
  }
  
  const isMobile = window.innerWidth < 768;
  const defaultWidth = isMobile ? 800 : 1200;
  const defaultHeight = Math.floor(defaultWidth * 0.5625); // 16:9 aspect ratio
  
  // Handle local uploaded images
  if (imageUrl.startsWith('/lovable-uploads/')) {
    return {
      src: imageUrl,
      alt,
      className,
      loading: options.priority ? 'eager' : 'lazy',
      fetchPriority: options.priority ? 'high' : 'auto',
      width: options.width || defaultWidth,
      height: options.width ? Math.floor(options.width * 0.5625) : defaultHeight,
      decoding: 'async',
    };
  }
  
  // For external images that support optimization
  if (imageUrl.includes('unsplash.com')) {
    const { srcSet, sizes } = createResponsiveSrcSet(imageUrl);
    const optimizedSrc = optimizeImageUrl(imageUrl, { 
      format: 'webp',
      width: options.width || defaultWidth,
      quality: 80
    });
    
    return {
      src: optimizedSrc,
      alt,
      className,
      srcSet,
      sizes,
      loading: options.priority ? 'eager' : 'lazy',
      fetchPriority: options.priority ? 'high' : 'auto',
      width: options.width || defaultWidth,
      height: options.width ? Math.floor(options.width * 0.5625) : defaultHeight,
      decoding: 'async',
    };
  }
  
  // For other external images
  return {
    src: imageUrl,
    alt,
    className,
    loading: options.priority ? 'eager' : 'lazy',
    fetchPriority: options.priority ? 'high' : 'auto',
    width: options.width || defaultWidth,
    height: options.width ? Math.floor(options.width * 0.5625) : defaultHeight,
    decoding: 'async',
  };
}

/**
 * Updates image records with WebP versions
 */
export const optimizeDestinationImages = (
  destinationImages: Record<string, string>
): Record<string, string> => {
  const optimized: Record<string, string> = {};
  
  Object.entries(destinationImages).forEach(([key, url]) => {
    // Skip already optimized or uploaded images
    if (!url || url.startsWith('/lovable-uploads/') || url.includes('?fm=webp')) {
      optimized[key] = url;
      return;
    }
    
    // Optimize Unsplash images
    if (url.includes('unsplash.com')) {
      const baseUrl = url.split('?')[0];
      optimized[key] = `${baseUrl}?fm=webp&w=1200&q=80`;
      return;
    }
    
    // Keep other URLs as is
    optimized[key] = url;
  });
  
  return optimized;
}

// Progressive image loading with low quality placeholder
export const useProgressiveImage = (src: string, options: OptimizedImageOptions = {}): { 
  loaded: boolean, 
  currentSrc: string,
  blurredSrc: string
} => {
  const [loaded, setLoaded] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState('');
  // Create a blurred low-quality placeholder
  const blurredSrc = src && src.includes('unsplash.com') 
    ? `${src.split('?')[0]}?fm=webp&w=20&q=30&blur=800` 
    : '';
  
  React.useEffect(() => {
    if (!src) return;
    
    const img = new Image();
    
    // Use priority loading for LCP elements
    if (options.priority) {
      img.fetchPriority = 'high';
      img.loading = 'eager';
    }
    
    img.src = src;
    img.onload = () => {
      setLoaded(true);
      setCurrentSrc(src);
    };
    
    return () => {
      img.onload = null;
    };
  }, [src, options.priority]);
  
  return { loaded, currentSrc, blurredSrc };
}

// Preload critical images for better LCP
export const preloadCriticalImages = (imagePaths: string[]) => {
  React.useEffect(() => {
    const preloadLinks = imagePaths.map(path => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = path;
      link.type = path.includes('webp') ? 'image/webp' : 'image/jpeg';
      return link;
    });
    
    // Add preload links to head
    preloadLinks.forEach(link => document.head.appendChild(link));
    
    // Cleanup
    return () => {
      preloadLinks.forEach(link => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      });
    };
  }, [imagePaths]);
}

// Performance monitoring for LCP and other metrics
export const trackImagePerformance = (elementId: string) => {
  React.useEffect(() => {
    if (!('PerformanceObserver' in window)) return;
    
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lcpEntry = entries[entries.length - 1];
        
        // Log LCP information
        console.log(`[Performance] LCP: ${lcpEntry.startTime.toFixed(1)}ms for element:`, lcpEntry);
        
        // If LCP is too high, log warning
        if (lcpEntry.startTime > 2500) {
          console.warn(`[Performance Warning] High LCP (${lcpEntry.startTime.toFixed(1)}ms) detected for element:`, lcpEntry);
        }
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      
      return () => {
        observer.disconnect();
      };
    } catch (e) {
      console.error('Performance observer error:', e);
    }
  }, [elementId]);
}
