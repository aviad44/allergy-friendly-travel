
/**
 * Performance monitoring entry point
 */

import { trackLCP, trackCLS, trackFID, trackNavigationTiming } from './core-vitals';
import { trackLongTasks, trackResourceTiming } from './resource-monitoring';
import { getDeviceInfo } from './device-info';

// Initialize all performance tracking
export const initPerformanceMonitoring = () => {
  window.addEventListener('load', () => {
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => {
        trackNavigationTiming();
        trackLongTasks();
        trackLCP();
        trackCLS();
        trackFID();
        trackResourceTiming();
        
        if (import.meta.env.MODE === 'development') {
          console.log('📱 Device info:', getDeviceInfo());
        }
      });
    } else {
      setTimeout(() => {
        trackNavigationTiming();
        trackLongTasks();
        trackLCP();
        trackCLS();
        trackFID();
        trackResourceTiming();
      }, 3000);
    }
  });
};

// Lightweight version for production
export const initLightPerformanceMonitoring = () => {
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      trackLCP();
      trackCLS();
    }, 1000);
  });
};

// Export everything for individual usage
export * from './core-vitals';
export * from './resource-monitoring';
export * from './device-info';
export * from './utils';
