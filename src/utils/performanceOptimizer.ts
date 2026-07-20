
/**
 * Performance optimization utilities
 * Provides tools for improving Core Web Vitals without affecting UI/UX
 */

// Intersection Observer for better lazy loading
export const createOptimizedObserver = (callback: IntersectionObserverCallback) => {
  const options = {
    root: null,
    rootMargin: '50px', // Start loading 50px before element comes into view
    threshold: 0.1
  };

  return new IntersectionObserver(callback, options);
};

// Optimize image loading with WebP detection
export const getOptimizedImageUrl = (originalUrl: string, width = 1200, quality = 80): string => {
  // Check if browser supports WebP
  const supportsWebP = (() => {
    const elem = document.createElement('canvas');
    return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  })();

  // For Unsplash images, optimize with WebP if supported
  if (originalUrl.includes('unsplash.com')) {
    const baseUrl = originalUrl.split('?')[0];
    const format = supportsWebP ? 'webp' : 'jpg';
    return `${baseUrl}?fm=${format}&w=${width}&q=${quality}&auto=format&fit=crop`;
  }

  return originalUrl;
};

// Defer non-critical JavaScript
export const deferNonCriticalJS = () => {
  // Defer analytics and non-essential scripts
  const scripts = document.querySelectorAll('script[data-defer="true"]');
  scripts.forEach(script => {
    if (script instanceof HTMLScriptElement) {
      script.defer = true;
    }
  });
};

// Monitor and report performance metrics with proper typing
export const trackPerformanceMetrics = () => {
  // Track Core Web Vitals
  if ('PerformanceObserver' in window) {
    // LCP tracking
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log(`LCP: ${lastEntry.startTime.toFixed(1)}ms`);
      
      if (lastEntry.startTime > 2500) {
        console.warn('Poor LCP detected:', lastEntry.startTime);
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // FID tracking - properly typed
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        // Type assertion for first-input entry
        const fidEntry = entry as PerformanceEventTiming;
        if (fidEntry.processingStart && fidEntry.startTime) {
          const fid = fidEntry.processingStart - fidEntry.startTime;
          console.log(`FID: ${fid.toFixed(1)}ms`);
          
          if (fid > 100) {
            console.warn('Poor FID detected:', fid);
          }
        }
      });
    }).observe({ type: 'first-input', buffered: true });

    // CLS tracking - properly typed
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        // Type assertion for layout-shift entry
        const clsEntry = entry as any; // Using 'any' for layout-shift specific properties
        if (clsEntry.hadRecentInput === false || clsEntry.hadRecentInput === undefined) {
          clsValue += clsEntry.value || 0;
        }
      });
      
      if (clsValue > 0.1) {
        console.warn('Poor CLS detected:', clsValue);
      }
    }).observe({ type: 'layout-shift', buffered: true });
  }
};

// Initialize all optimizations
export const initPerformanceOptimizations = () => {
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      deferNonCriticalJS();
      trackPerformanceMetrics();
    });
  } else {
    deferNonCriticalJS();
    trackPerformanceMetrics();
  }
};
