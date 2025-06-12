
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

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    { href: '/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png', as: 'image' },
    { href: '/src/index.css', as: 'style' }
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    link.as = resource.as;
    if (resource.as === 'image') {
      link.type = 'image/png';
    }
    document.head.appendChild(link);
  });
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

// Optimize font loading
export const optimizeFontLoading = () => {
  // Add font-display: swap to improve CLS
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @font-face {
      font-family: 'Poppins';
      font-display: swap;
      src: local('Poppins'), url('/fonts/poppins.woff2') format('woff2');
    }
  `;
  document.head.appendChild(styleSheet);
};

// Monitor and report performance metrics
export const trackPerformanceMetrics = () => {
  // Track Core Web Vitals
  if ('PerformanceObserver' in window) {
    // LCP tracking
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log(`LCP: ${lastEntry.startTime.toFixed(1)}ms`);
      
      // Report to analytics if needed
      if (lastEntry.startTime > 2500) {
        console.warn('Poor LCP detected:', lastEntry.startTime);
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // FID tracking
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        const fid = entry.processingStart - entry.startTime;
        console.log(`FID: ${fid.toFixed(1)}ms`);
        
        if (fid > 100) {
          console.warn('Poor FID detected:', fid);
        }
      });
    }).observe({ type: 'first-input', buffered: true });

    // CLS tracking
    let clsValue = 0;
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
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
  // Run immediately
  preloadCriticalResources();
  optimizeFontLoading();
  
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
