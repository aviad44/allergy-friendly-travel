
/**
 * Resource monitoring module
 */

import { logPerformanceIssue } from './performance/utils';

// Track Long Tasks that could affect responsiveness
export const trackLongTasks = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 200) {
            if (import.meta.env.MODE === 'development') {
              console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(1)}ms`, entry);
            }
            
            if (import.meta.env.MODE === 'production') {
              logPerformanceIssue({
                metric: 'long-task',
                duration: entry.duration.toFixed(1),
                url: window.location.pathname
              });
            }
          }
        });
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      // Silently fail if not supported
    }
  }
};

// Track resource load times
export const trackResourceTiming = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const resourceEntries = performance.getEntriesByType('resource');
    const slowResources = resourceEntries.filter(entry => entry.duration > 1000);
    
    if (slowResources.length > 0 && import.meta.env.MODE === 'development') {
      console.warn('Slow resources detected:', slowResources.map(r => ({
        name: r.name,
        duration: `${r.duration.toFixed(0)}ms`,
        size: ((r as any).transferSize ? `${((r as any).transferSize / 1024).toFixed(1)}KB` : 'unknown')
      })));
    }
  }
};
