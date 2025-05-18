/**
 * Performance monitoring utility
 * Tracks and reports web vitals metrics
 */

import React from 'react';

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
        const loadEventEnd = entry.loadEventEnd;
        
        // Calculate TTFB (Time to First Byte)
        const ttfb = responseStart - navigationStart;
        // Calculate load time
        const loadTime = domComplete - navigationStart;
        // Calculate total time
        const totalTime = loadEventEnd - navigationStart;
        
        console.log(`🚀 Performance: TTFB ${ttfb.toFixed(1)}ms, Load ${loadTime.toFixed(1)}ms, Total ${totalTime.toFixed(1)}ms`);
        
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

// Track Largest Contentful Paint (LCP)
export const trackLCP = () => {
  if (!('PerformanceObserver' in window)) return;
  
  try {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        // Type assertion to access LCP-specific properties
        const lcpEntry = entry as PerformanceEntry & {
          element?: Element;
          startTime: number;
        };
        
        console.log(`📊 LCP: ${lcpEntry.startTime.toFixed(1)}ms`, lcpEntry);
        
        // LCP should be under 2.5s for good UX
        if (lcpEntry.startTime > 2500) {
          logPerformanceIssue({
            metric: 'poor-lcp',
            value: lcpEntry.startTime.toFixed(1),
            element: lcpEntry.element?.tagName || 'unknown',
            url: window.location.pathname
          });
        }
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (e) {
    console.error('LCP tracking not supported', e);
  }
};

// Track First Input Delay (FID) and Interaction to Next Paint (INP)
export const trackInteractions = () => {
  if (!('PerformanceObserver' in window)) return;
  
  try {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        // Type assertion for FirstInput entry
        const interactionEntry = entry as PerformanceEntry & {
          processingStart?: number;
          startTime: number;
          duration: number;
          entryType: string;
        };
        
        // This entry is FID if it's the first interaction
        const isFirstInteraction = interactionEntry.entryType === 'first-input';
        const delay = isFirstInteraction && interactionEntry.processingStart 
          ? interactionEntry.processingStart - interactionEntry.startTime 
          : interactionEntry.duration;
        
        console.log(
          `👆 ${isFirstInteraction ? 'FID' : 'Interaction'}: ${delay.toFixed(1)}ms`,
          interactionEntry
        );
        
        // Log if over thresholds
        if ((isFirstInteraction && delay > 100) || (!isFirstInteraction && delay > 200)) {
          logPerformanceIssue({
            metric: isFirstInteraction ? 'poor-fid' : 'poor-interaction',
            value: delay.toFixed(1),
            url: window.location.pathname
          });
        }
      }
    }).observe({ 
      type: 'first-input', 
      buffered: true 
    });
    
    // Also observe all interactions for INP
    if ('event' in PerformanceObserver.supportedEntryTypes) {
      new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.duration > 200) {
            console.log(`⚠️ Slow interaction: ${entry.duration.toFixed(1)}ms`, entry);
          }
        }
      }).observe({ 
        type: 'event', 
        buffered: true
      });
    }
  } catch (e) {
    console.error('Interaction tracking not supported', e);
  }
};

// Track Cumulative Layout Shift (CLS)
export const trackCLS = () => {
  if (!('PerformanceObserver' in window)) return;
  
  try {
    // Keep track of the current CLS value
    let clsValue = 0;
    let clsEntries: any[] = [];
    
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        // Type assertion for LayoutShift entry
        const layoutShiftEntry = entry as PerformanceEntry & {
          hadRecentInput?: boolean;
          value: number;
        };
        
        // Only count if not caused by user input
        if (!layoutShiftEntry.hadRecentInput) {
          const impact = layoutShiftEntry.value;
          clsValue += impact;
          clsEntries.push(layoutShiftEntry);
          
          if (impact > 0.1) {
            console.log(`📏 Layout shift: ${impact.toFixed(3)}, accumulated CLS: ${clsValue.toFixed(3)}`, layoutShiftEntry);
          }
        }
      }
      
      // CLS should be under 0.1 for good UX
      if (clsValue > 0.1) {
        logPerformanceIssue({
          metric: 'poor-cls',
          value: clsValue.toFixed(3),
          url: window.location.pathname
        });
      }
    }).observe({ type: 'layout-shift', buffered: true });
  } catch (e) {
    console.error('CLS tracking not supported', e);
  }
};

// Track Long Tasks
export const trackLongTasks = () => {
  if (!('PerformanceObserver' in window)) return;
  
  try {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        console.log(`⏱️ Long task: ${entry.duration.toFixed(1)}ms`, entry);
        
        if (entry.duration > 50) {
          logPerformanceIssue({
            metric: 'long-task',
            duration: entry.duration.toFixed(1),
            url: window.location.pathname
          });
        }
      }
    }).observe({ type: 'longtask', buffered: true });
  } catch (e) {
    console.error('Long task tracking not supported', e);
  }
};

// Track resource loading
export const trackResourceLoading = () => {
  if (!('PerformanceObserver' in window)) return;
  
  try {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        // Type assertion for Resource entry
        const resourceEntry = entry as PerformanceResourceTiming;
        
        if (entry.duration > 1000) {
          console.log(`🐌 Slow resource: ${entry.name} (${entry.duration.toFixed(1)}ms)`);
          
          // Check for large resources
          if (resourceEntry.transferSize && resourceEntry.transferSize > 500000) { // 500KB
            logPerformanceIssue({
              metric: 'large-resource',
              resource: entry.name,
              size: Math.round(resourceEntry.transferSize / 1024) + 'KB',
              url: window.location.pathname
            });
          }
        }
      }
    }).observe({ type: 'resource', buffered: true });
  } catch (e) {
    console.error('Resource tracking not supported', e);
  }
};

// Helper to log performance issues
const logPerformanceIssue = (data: Record<string, any>) => {
  // In production, this would send to an analytics service
  console.warn('Performance issue detected:', data);
};

// Initialize all performance monitoring
export const initPerformanceMonitoring = () => {
  // Only run in production to avoid dev tool impact
  if (import.meta.env.MODE === 'production') {
    // Run after page load to not interfere with initial rendering
    if (document.readyState === 'complete') {
      setTimeout(initTracking, 100);
    } else {
      window.addEventListener('load', () => setTimeout(initTracking, 100));
    }
  }
};

function initTracking() {
  trackWebVitals();
  trackLCP();
  trackInteractions();
  trackCLS();
  trackLongTasks();
  trackResourceLoading();
  
  console.log('🔍 Performance monitoring initialized');
}
