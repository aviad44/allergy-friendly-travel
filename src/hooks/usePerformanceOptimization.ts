
import { useEffect } from 'react';
import { initPerformanceOptimizations } from '@/utils/performanceOptimizer';
import { initMobileOptimizations, preloadMobileCriticalContent } from '@/utils/mobileOptimization';

export const usePerformanceOptimization = () => {
  useEffect(() => {
    // Initialize performance optimizations
    initPerformanceOptimizations();
    
    // Mobile-specific optimizations
    initMobileOptimizations();
    preloadMobileCriticalContent();

    // Service Worker registration for caching (if available)
    if ('serviceWorker' in navigator && import.meta.env.PROD) {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('SW registered:', registration);
        })
        .catch(error => {
          console.log('SW registration failed:', error);
        });
    }

    // Prefetch important routes on idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        const importantRoutes = [
          '/destinations/paris',
          '/destinations/london',
          '/destinations/rome'
        ];
        
        importantRoutes.forEach(route => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = route;
          document.head.appendChild(link);
        });
      });
    }
  }, []);
};
