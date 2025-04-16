
/**
 * Performance monitoring utility
 * Tracks and reports web vitals metrics
 */

// Basic Web Vitals tracking
export const trackWebVitals = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Track navigation timing
    performance.getEntriesByType('navigation').forEach(entry => {
      if (entry instanceof PerformanceNavigationTiming) {
        const navigationStart = entry.startTime;
        const responseStart = entry.responseStart;
        const responseEnd = entry.responseEnd;
        const domComplete = entry.domComplete;
        
        // Calculate TTFB
        const ttfb = responseStart - navigationStart;
        // Calculate load time
        const loadTime = domComplete - navigationStart;
        
        console.log(`🚀 Performance: TTFB ${ttfb.toFixed(1)}ms, Load ${loadTime.toFixed(1)}ms`);
        
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
          // Log any task taking longer than 200ms
          if (entry.duration > 200) {
            console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(1)}ms`, entry);
            
            logPerformanceIssue({
              metric: 'long-task',
              duration: entry.duration.toFixed(1),
              url: window.location.pathname
            });
          }
        });
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    } catch (e) {
      console.error('Long task tracking not supported in this browser');
    }
  }
};

// Track Largest Contentful Paint
export const trackLCP = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        console.log(`📊 LCP: ${lastEntry.startTime.toFixed(1)}ms`);
        
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
      console.error('LCP tracking not supported in this browser');
    }
  }
};

// Helper to log performance issues (could send to an analytics service)
const logPerformanceIssue = (data: Record<string, any>) => {
  // In production, this would send to an analytics service
  console.warn('Performance issue detected:', data);
  
  // Example of sending to a backend service:
  // if (process.env.NODE_ENV === 'production') {
  //   fetch('/api/performance-log', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(data)
  //   }).catch(e => console.error('Failed to log performance data', e));
  // }
};

// Initialize all performance tracking
export const initPerformanceMonitoring = () => {
  // Only run in production to avoid dev tool impact
  if (process.env.NODE_ENV === 'production') {
    // Run after page load
    window.addEventListener('load', () => {
      // Use setTimeout to not compete with critical rendering
      setTimeout(() => {
        trackWebVitals();
        trackLongTasks();
        trackLCP();
      }, 3000);
    });
  }
};
