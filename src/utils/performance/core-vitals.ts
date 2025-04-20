
/**
 * Core Web Vitals monitoring module
 */

import { logPerformanceIssue } from './utils';

// Track Largest Contentful Paint (LCP)
export const trackLCP = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        // Type assertion for LCP-specific properties
        const lcpEntry = lastEntry as PerformanceEntry & { 
          startTime: number 
        };
        
        const lcp = lcpEntry.startTime;
        
        if (lcp > 2500) {
          if (import.meta.env.MODE === 'development') {
            console.warn(`⚠️ Poor LCP detected: ${lcp.toFixed(1)}ms`);
          }
          
          logPerformanceIssue({
            metric: 'LCP',
            value: lcp.toFixed(1),
            status: lcp > 4000 ? 'poor' : 'needs-improvement'
          });
        }
      });
      
      observer.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (e) {
      console.error('Failed to observe LCP:', e);
    }
  }
};

// Track Cumulative Layout Shift (CLS)
export const trackCLS = () => {
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      let clsEntries = [];
      
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        
        entries.forEach(entry => {
          // Type assertion for CLS-specific properties
          const clsEntry = entry as PerformanceEntry & { 
            hadRecentInput: boolean,
            value: number 
          };
          
          if (!clsEntry.hadRecentInput) {
            clsValue += clsEntry.value;
            clsEntries.push(clsEntry);
          }
        });
        
        if (clsValue > 0.1) {
          if (import.meta.env.MODE === 'development') {
            console.warn(`⚠️ Poor CLS detected: ${clsValue.toFixed(3)}`);
          }
          
          logPerformanceIssue({
            metric: 'CLS',
            value: clsValue.toFixed(3),
            status: clsValue > 0.25 ? 'poor' : 'needs-improvement'
          });
        }
      });
      
      observer.observe({ type: 'layout-shift', buffered: true });
    } catch (e) {
      console.error('Failed to observe CLS:', e);
    }
  }
};

// Track First Input Delay (FID)
export const trackFID = () => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          // Type assertion for FID-specific properties
          const fidEntry = entry as PerformanceEntry & { 
            processingStart: number,
            startTime: number 
          };
          
          const fid = fidEntry.processingStart - fidEntry.startTime;
          
          if (fid > 100) {
            if (import.meta.env.MODE === 'development') {
              console.warn(`⚠️ Poor FID detected: ${fid.toFixed(1)}ms`);
            }
            
            logPerformanceIssue({
              metric: 'FID',
              value: fid.toFixed(1),
              status: fid > 300 ? 'poor' : 'needs-improvement'
            });
          }
        });
      });
      
      observer.observe({ type: 'first-input', buffered: true });
    } catch (e) {
      console.error('Failed to observe FID:', e);
    }
  }
};

// Track Navigation Timing API metrics
export const trackNavigationTiming = () => {
  if ('performance' in window && 'timing' in performance) {
    setTimeout(() => {
      if ('getEntriesByType' in performance) {
        const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navEntry) {
          const timeToInteractive = navEntry.domInteractive - navEntry.startTime;
          const domContentLoaded = navEntry.domContentLoadedEventEnd - navEntry.startTime;
          const loadTime = navEntry.loadEventEnd - navEntry.startTime;
          
          if (loadTime > 3000) {
            if (import.meta.env.MODE === 'development') {
              console.warn(`⚠️ Slow page load: ${loadTime.toFixed(0)}ms`);
            }
            
            logPerformanceIssue({
              metric: 'page-load',
              value: loadTime.toFixed(0),
              ttfb: (navEntry.responseStart - navEntry.requestStart).toFixed(0),
              interactive: timeToInteractive.toFixed(0),
              dcl: domContentLoaded.toFixed(0)
            });
          }
        }
      }
    }, 0);
  }
};
