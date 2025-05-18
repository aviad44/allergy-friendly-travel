/**
 * Image optimization utilities to improve performance and LCP metrics
 */

type ImageFormat = 'webp' | 'avif' | 'jpg' | 'png';
type ImageSize = 'small' | 'medium' | 'large' | 'original';

interface OptimizedImageOptions {
  format?: ImageFormat;
  width?: number;
  quality?: number;
  blur?: boolean;
}

/**
 * Converts image URLs to optimized versions
 */
export const optimizeImageUrl = (imageUrl: string, options: OptimizedImageOptions = {}): string => {
  // Skip optimization for data URLs or relative local paths to uploaded files
  if (imageUrl.startsWith('data:') || imageUrl.startsWith('/lovable-uploads/')) {
    return imageUrl;
  }
  
  // Handle Unsplash images which already support optimization params
  if (imageUrl.includes('unsplash.com')) {
    const baseUrl = imageUrl.split('?')[0];
    const width = options.width || (window.innerWidth < 768 ? 800 : 1200);
    const format = options.format || 'webp';
    const quality = options.quality || 80;
    
    return `${baseUrl}?fm=${format}&w=${width}&q=${quality}${options.blur ? '&blur=200' : ''}`;
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
  if (imageUrl.startsWith('data:') || !imageUrl.includes('unsplash.com')) {
    return { srcSet: '', sizes: '' };
  }
  
  const baseUrl = imageUrl.split('?')[0];
  
  const srcSet = [
    `${baseUrl}?fm=webp&w=480&q=80 480w`,
    `${baseUrl}?fm=webp&w=800&q=80 800w`,
    `${baseUrl}?fm=webp&w=1200&q=80 1200w`,
    `${baseUrl}?fm=webp&w=1600&q=85 1600w`,
    `${baseUrl}?fm=webp&w=2000&q=85 2000w`
  ].join(', ');
  
  const sizes = '(max-width: 480px) 480px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, (max-width: 1600px) 1600px, 2000px';
  
  return { srcSet, sizes };
}

/**
 * Creates a responsive picture element with WebP and fallback formats
 */
export const getResponsiveImageProps = (
  imageUrl: string, 
  alt: string, 
  className: string = ''
) => {
  // Handle local uploaded images differently
  if (imageUrl.startsWith('/lovable-uploads/')) {
    return {
      src: imageUrl,
      alt,
      className,
      loading: 'lazy',
      width: window.innerWidth < 768 ? 800 : 1200,
      height: window.innerWidth < 768 ? 450 : 600,
    };
  }
  
  // For external images that support optimization
  if (imageUrl.includes('unsplash.com')) {
    const { srcSet, sizes } = createResponsiveSrcSet(imageUrl);
    const optimizedSrc = optimizeImageUrl(imageUrl, { 
      format: 'webp',
      width: window.innerWidth < 768 ? 800 : 1200,
      quality: 80
    });
    
    return {
      src: optimizedSrc,
      alt,
      className,
      srcSet,
      sizes,
      loading: 'lazy',
      width: window.innerWidth < 768 ? 800 : 1200,
      height: window.innerWidth < 768 ? 450 : 600,
    };
  }
  
  // For other external images
  return {
    src: imageUrl,
    alt,
    className,
    loading: 'lazy',
    width: window.innerWidth < 768 ? 800 : 1200,
    height: window.innerWidth < 768 ? 450 : 600,
  };
}

/**
 * Updates DESTINATION_IMAGES with WebP versions
 */
export const optimizeDestinationImages = (
  destinationImages: Record<string, string>
): Record<string, string> => {
  const optimized: Record<string, string> = {};
  
  Object.entries(destinationImages).forEach(([key, url]) => {
    // Skip already optimized or uploaded images
    if (url.startsWith('/lovable-uploads/') || url.includes('?fm=webp')) {
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

// Image loading state management
export const useProgressiveImage = (src: string): { loaded: boolean, currentSrc: string } => {
  const [loaded, setLoaded] = React.useState(false);
  const [currentSrc, setCurrentSrc] = React.useState('');
  
  React.useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setLoaded(true);
      setCurrentSrc(src);
    };
    return () => {
      img.onload = null;
    };
  }, [src]);
  
  return { loaded, currentSrc };
}
