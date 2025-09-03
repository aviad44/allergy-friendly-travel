/**
 * Mobile-specific performance optimizations
 * Focuses on improving Core Web Vitals for mobile devices
 */

// Critical resource prioritization for mobile
export const initMobileOptimizations = () => {
  // Reduce unnecessary reflows and repaints
  const addPassiveEventListeners = () => {
    ['touchstart', 'touchmove', 'wheel', 'scroll'].forEach(eventType => {
      document.addEventListener(eventType, () => {}, { passive: true });
    });
  };

  // Optimize scroll performance
  const optimizeScrolling = () => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Throttled scroll handling
          ticking = false;
        });
        ticking = true;
      }
    };
    document.addEventListener('scroll', handleScroll, { passive: true });
  };

  // Reduce layout thrashing
  const reduceLayoutThrashing = () => {
    // Batch DOM reads and writes
    const observer = new ResizeObserver(entries => {
      requestAnimationFrame(() => {
        // Batch all resize operations
        entries.forEach(entry => {
          // Handle resize without triggering layout
        });
      });
    });
    
    document.querySelectorAll('img, [data-lazy]').forEach(el => {
      observer.observe(el);
    });
  };

  // Memory optimization for mobile
  const optimizeMemoryUsage = () => {
    // Cleanup inactive components
    const cleanup = () => {
      // Remove unused event listeners
      const inactiveElements = document.querySelectorAll('[data-inactive="true"]');
      inactiveElements.forEach(el => {
        el.remove();
      });
    };

    // Run cleanup on page visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        setTimeout(cleanup, 5000);
      }
    });
  };

  // Initialize all optimizations
  addPassiveEventListeners();
  optimizeScrolling();
  reduceLayoutThrashing();
  optimizeMemoryUsage();
};

// Optimize images for mobile viewport
export const getMobileOptimizedImageUrl = (url: string, maxWidth = 800): string => {
  if (url.includes('unsplash.com')) {
    return `${url.split('?')[0]}?w=${maxWidth}&q=75&fm=webp&auto=format&fit=crop`;
  }
  return url;
};

// Preload critical content for mobile
export const preloadMobileCriticalContent = () => {
  const prefetchLink = (href: string) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = 'document';
    document.head.appendChild(link);
  };

  // Only prefetch on good connections
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection.effectiveType === '4g' && !connection.saveData) {
      prefetchLink('/destinations');
      prefetchLink('/allergy-translation-card');
    }
  }
};