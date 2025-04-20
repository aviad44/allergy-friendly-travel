
/**
 * Core Web Vitals monitoring module
 */

import { logPerformanceIssue } from './utils';

// Track Largest Contentful Paint
export const trackLCP = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        if (import.meta.env.MODE === 'development') {
          console.log(`📊 LCP: ${lastEntry.startTime.toFixed(1)}ms`);
        }
        
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

// Track Cumulative Layout Shift
export const trackCLS = () => {
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      let clsEntries = [];
      
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
            clsEntries.push(entry);
          }
        }
        
        if (import.meta.env.MODE === 'development') {
          console.log(`📊 Current CLS: ${clsValue.toFixed(3)}`);
        }
        
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

// Track First Input Delay
export const trackFID = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          const delay = (entry as any).processingStart - entry.startTime;
          
          if (import.meta.env.MODE === 'development') {
            console.log(`📊 FID: ${delay.toFixed(1)}ms`);
          }
          
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

// Track navigation timing metrics
export const trackNavigationTiming = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    performance.getEntriesByType('navigation').forEach(entry => {
      if (entry instanceof PerformanceNavigationTiming) {
        const navigationStart = entry.startTime;
        const responseStart = entry.responseStart;
        const responseEnd = entry.responseEnd;
        const domComplete = entry.domComplete;
        const loadEventEnd = entry.loadEventEnd;
        
        const ttfb = responseStart - navigationStart;
        const loadTime = domComplete - navigationStart;
        const totalLoadTime = loadEventEnd - navigationStart;
        
        if (import.meta.env.MODE === 'development') {
          console.log(`📊 Performance Metrics:
          - TTFB: ${ttfb.toFixed(1)}ms
          - DOM Complete: ${loadTime.toFixed(1)}ms
          - Total Load: ${totalLoadTime.toFixed(1)}ms`);
        }
        
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
