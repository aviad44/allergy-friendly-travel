
/**
 * Utility for optimizing image loading
 */

import { useEffect, useState } from 'react';

/**
 * Get responsive image properties based on screen size
 * @param imagePath Base image path
 * @param sizes Array of image sizes to generate
 * @returns Object with srcSet and sizes attributes
 */
export const getResponsiveImageProps = (
  imagePath: string, 
  sizes = [400, 800, 1200, 1600]
) => {
  // If image is already a URL, return as is
  if (imagePath.startsWith('http')) {
    // For Unsplash images, add WebP format
    if (imagePath.includes('unsplash.com') && !imagePath.includes('fm=webp')) {
      const baseUrl = imagePath.split('?')[0];
      const srcSet = sizes.map(size => 
        `${baseUrl}?fm=webp&w=${size}&q=${size >= 1200 ? 80 : 75} ${size}w`
      ).join(', ');
      
      return {
        srcSet,
        sizes: '(max-width: 768px) 100vw, 50vw',
        src: `${baseUrl}?fm=webp&w=800&q=80`,
        type: 'image/webp'
      };
    }
    
    return { 
      src: imagePath,
      srcSet: '',
      sizes: ''
    };
  }
  
  // For local images, assume WebP format and generate srcSet
  try {
    const srcSet = sizes.map(size => `${imagePath}?w=${size} ${size}w`).join(', ');
    
    return {
      srcSet,
      sizes: '(max-width: 768px) 100vw, 50vw',
      src: `${imagePath}?w=800`,
      type: 'image/webp'
    };
  } catch (error) {
    console.error('Error generating responsive image props:', error);
    return { 
      src: imagePath,
      srcSet: '',
      sizes: ''
    };
  }
};

/**
 * Hook for tracking image loading state
 * @param src Image source URL
 * @returns Loading state and error state
 */
export const useImageLoader = (src: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }
    
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
    };
    
    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      console.error(`Failed to load image: ${src}`);
    };
    
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);
  
  return { isLoading, hasError };
};

/**
 * Generate a placeholder background color based on a string
 * @param input String to generate color from
 * @returns CSS gradient string
 */
export const generatePlaceholderColor = (input: string) => {
  const hash = input.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
  const hue = hash % 360;
  return `linear-gradient(135deg, hsl(${hue}, 80%, 40%) 0%, hsl(${(hue + 60) % 360}, 80%, 60%) 100%)`;
};

/**
 * Basic function to preload critical images without any hooks
 * @param imagePaths Array of image paths to preload
 */
export const preloadCriticalImages = (imagePaths: string[]) => {
  if (typeof window === 'undefined') return;
  
  imagePaths.forEach(path => {
    if (!path) return;
    
    try {
      const img = new Image();
      img.src = path;
      img.fetchPriority = 'high';
      img.loading = 'eager';
      img.onload = () => console.debug(`Preloaded: ${path}`);
      img.onerror = () => console.error(`Failed to preload: ${path}`);
    } catch (error) {
      console.error(`Error preloading image ${path}:`, error);
    }
  });
};
