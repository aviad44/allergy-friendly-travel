
/**
 * Image optimization utility functions
 * Helps optimize and lazy load images site-wide
 */

// Get device pixel ratio for proper image sizing
const getDevicePixelRatio = (): number => {
  return window.devicePixelRatio || 1;
};

// Get viewport width considering device pixel ratio
export const getViewportWidth = (): number => {
  return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
};

// Get optimal image size based on container width and pixel ratio
export const getOptimalImageSize = (containerWidth: number): number => {
  const pixelRatio = getDevicePixelRatio();
  // Round up to nearest 100px for better CDN caching
  return Math.ceil((containerWidth * pixelRatio) / 100) * 100;
};

// Optimize Unsplash image URL with proper sizing and format
export const optimizeUnsplashImage = (url: string, width?: number): string => {
  if (!url.includes('unsplash.com')) return url;
  
  // Parse URL to remove any existing query parameters
  const baseUrl = url.split('?')[0];
  
  // Use provided width or determine based on viewport
  const imgWidth = width || getOptimalImageSize(getViewportWidth() < 768 ? 600 : 1200);
  
  // Use WebP format if available (better compression)
  return `${baseUrl}?auto=format&fm=webp&fit=crop&w=${imgWidth}&q=75`;
};

// Check if WebP format is supported by the browser
export const isWebPSupported = (): boolean => {
  const canvas = document.createElement('canvas');
  if (canvas.getContext && canvas.getContext('2d')) {
    // Check if toDataURL with WebP returns the expected prefix
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  }
  return false;
};

// Get appropriate image format based on browser support
export const getOptimalImageFormat = (): string => {
  if (isWebPSupported()) {
    return 'webp';
  }
  return 'auto'; // Let the CDN decide
};

// Create an image srcset for responsive images
export const createSrcSet = (baseUrl: string, sizes: number[] = [400, 800, 1200, 1600]): string => {
  if (!baseUrl.includes('unsplash.com')) return baseUrl;
  
  const baseImageUrl = baseUrl.split('?')[0];
  const format = getOptimalImageFormat();
  
  return sizes
    .map(size => {
      const optimizedUrl = `${baseImageUrl}?auto=format&fm=${format}&fit=crop&w=${size}&q=${size < 800 ? 75 : 80}`;
      return `${optimizedUrl} ${size}w`;
    })
    .join(', ');
};

// Create appropriate sizes attribute for responsive images
export const createSizesAttribute = (): string => {
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
};

// Lazy load images with Intersection Observer API
export const lazyLoadImage = (
  imageElement: HTMLImageElement, 
  src: string, 
  srcset?: string,
  sizes?: string
): void => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for browsers without IntersectionObserver
    imageElement.src = src;
    if (srcset) imageElement.srcset = srcset;
    if (sizes) imageElement.sizes = sizes;
    return;
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = src;
        if (srcset) img.srcset = srcset;
        if (sizes) img.sizes = sizes;
        observer.disconnect();
      }
    });
  }, {
    rootMargin: '200px 0px', // Load images 200px before they appear in viewport
    threshold: 0.01
  });
  
  observer.observe(imageElement);
};

// Preload critical images (should be called sparingly only for important above-fold images)
export const preloadCriticalImage = (imageUrl: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = imageUrl;
  document.head.appendChild(link);
};

// Initialize lazy loading for all images with data-src attribute
export const initLazyLoading = (): void => {
  document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(img => {
        const image = img as HTMLImageElement;
        image.src = image.dataset.src || '';
        image.srcset = image.dataset.srcset || '';
        image.sizes = image.dataset.sizes || '';
      });
      return;
    }
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.srcset = img.dataset.srcset || '';
          img.sizes = img.dataset.sizes || '';
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '200px 0px',
      threshold: 0.01
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  });
};
