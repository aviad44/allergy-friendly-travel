
/**
 * Enhanced Performance monitoring utility
 * Tracks and reports web vitals metrics with optimization focus
 */

// Track Core Web Vitals metrics
export const trackWebVitals = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Track navigation timing
    performance.getEntriesByType('navigation').forEach(entry => {
      if (entry instanceof PerformanceNavigationTiming) {
        const navigationStart = entry.startTime;
        const responseStart = entry.responseStart;
        const responseEnd = entry.responseEnd;
        const domComplete = entry.domComplete;
        const loadEventEnd = entry.loadEventEnd;
        
        // Calculate TTFB (Time to First Byte) - critical for server performance
        const ttfb = responseStart - navigationStart;
        // Calculate load time
        const loadTime = domComplete - navigationStart;
        // Calculate total page load time
        const totalLoadTime = loadEventEnd - navigationStart;
        
        // Log more detailed performance metrics in development only
        if (import.meta.env.MODE === 'development') {
          console.log(`📊 Performance Metrics:
          - TTFB: ${ttfb.toFixed(1)}ms
          - DOM Complete: ${loadTime.toFixed(1)}ms
          - Total Load: ${totalLoadTime.toFixed(1)}ms`);
        }
        
        // Send to analytics if above threshold
        if (ttfb > 600 || loadTime > 3000) {
          logPerformanceIssue({
            metric: 'slow-load',
            ttfb: ttfb.toFixed(1),
            load: loadTime.toFixed(1),
            url: window.location.pathname
          });
        }
      }
    });
  }
};

// Track Long Tasks that could affect responsiveness
export const trackLongTasks = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Log any task taking longer than 200ms (causing jank)
          if (entry.duration > 200) {
            // Only log in development to avoid console pollution
            if (import.meta.env.MODE === 'development') {
              console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(1)}ms`, entry);
            }
            
            // Always send to analytics in production
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

// Track Largest Contentful Paint - a Core Web Vital
export const trackLCP = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        // Log in development only to avoid console pollution
        if (import.meta.env.MODE === 'development') {
          console.log(`📊 LCP: ${lastEntry.startTime.toFixed(1)}ms`);
        }
        
        // LCP should be under 2.5s for good UX
        if (lastEntry.startTime > 2500) {
          logPerformanceIssue({
            metric: 'poor-lcp',
            value: lastEntry.startTime.toFixed(1),
            url: window.location.pathname
          });
        }
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      // Silently fail if not supported
    }
  }
};

// Track Cumulative Layout Shift - a Core Web Vital
export const trackCLS = () => {
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      let clsEntries = [];
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Only count layout shifts without recent user input
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            clsEntries.push(entry);
          }
        }
        
        // Log in development only to avoid console pollution
        if (import.meta.env.MODE === 'development') {
          console.log(`📊 Current CLS: ${clsValue.toFixed(3)}`);
        }
        
        // CLS should be under 0.1 for good UX
        if (clsValue > 0.1) {
          logPerformanceIssue({
            metric: 'high-cls',
            value: clsValue.toFixed(3),
            url: window.location.pathname
          });
        }
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      // Silently fail if not supported
    }
  }
};

// Track First Input Delay - a Core Web Vital
export const trackFID = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const delay = entry.processingStart - entry.startTime;
          
          // Log in development only to avoid console pollution
          if (import.meta.env.MODE === 'development') {
            console.log(`📊 FID: ${delay.toFixed(1)}ms`);
          }
          
          // FID should be under 100ms for good UX
          if (delay > 100) {
            logPerformanceIssue({
              metric: 'high-fid',
              value: delay.toFixed(1),
              url: window.location.pathname
            });
          }
        });
      });
      
      observer.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      // Silently fail if not supported
    }
  }
};

// Helper to log performance issues (could send to an analytics service)
const logPerformanceIssue = (data: Record<string, any>) => {
  // In production, this would send to an analytics service
  if (import.meta.env.MODE === 'development') {
    console.warn('Performance issue detected:', data);
  }
  
  // Example of sending to a backend service:
  if (import.meta.env.MODE === 'production') {
    try {
      navigator.sendBeacon('/api/performance-log', JSON.stringify(data));
    } catch (e) {
      // Silently fail if beacon not supported
    }
  }
};

// Detect device and connection info for better performance debugging
export const getDeviceInfo = () => {
  const connection = 'connection' in navigator ? 
    (navigator as any).connection || 
    (navigator as any).mozConnection || 
    (navigator as any).webkitConnection : null;
  
  return {
    deviceMemory: 'deviceMemory' in navigator ? (navigator as any).deviceMemory : 'unknown',
    hardwareConcurrency: navigator.hardwareConcurrency || 'unknown',
    connection: connection ? {
      effectiveType: connection.effectiveType || 'unknown',
      saveData: connection.saveData || false,
      rtt: connection.rtt || 0,
      downlink: connection.downlink || 0
    } : 'unknown'
  };
};

// Track resource load times to identify slow resources
export const trackResourceTiming = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    const resourceEntries = performance.getEntriesByType('resource');
    const slowResources = resourceEntries.filter(entry => entry.duration > 1000);
    
    if (slowResources.length > 0 && import.meta.env.MODE === 'development') {
      console.warn('Slow resources detected:', slowResources.map(r => ({
        name: r.name,
        duration: `${r.duration.toFixed(0)}ms`,
        size: r.transferSize ? `${(r.transferSize / 1024).toFixed(1)}KB` : 'unknown'
      })));
    }
  }
};

// Initialize all performance tracking
export const initPerformanceMonitoring = () => {
  // Run after page load
  window.addEventListener('load', () => {
    // Use requestIdleCallback to avoid competing with critical rendering
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        trackWebVitals();
        trackLongTasks();
        trackLCP();
        trackCLS();
        trackFID();
        trackResourceTiming();
        
        // Log device info in development
        if (import.meta.env.MODE === 'development') {
          console.log('📱 Device info:', getDeviceInfo());
        }
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        trackWebVitals();
        trackLongTasks();
        trackLCP();
        trackCLS();
        trackFID();
        trackResourceTiming();
      }, 3000);
    }
  });
};

// Create a lightweight version we can use in production
export const initLightPerformanceMonitoring = () => {
  // Run after first paint
  window.addEventListener('DOMContentLoaded', () => {
    // Delay to allow important content to load first
    setTimeout(() => {
      trackLCP();
      trackCLS();
    }, 1000);
  });
};
