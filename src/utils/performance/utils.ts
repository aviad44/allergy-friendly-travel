
/**
 * Shared utilities for performance monitoring
 */

export const logPerformanceIssue = (data: Record<string, any>) => {
  if (import.meta.env.MODE === 'development') {
    console.warn('Performance issue detected:', data);
  }
  
  if (import.meta.env.MODE === 'production') {
    try {
      navigator.sendBeacon('/api/performance-log', JSON.stringify(data));
    } catch (e) {
      // Silently fail if beacon not supported
    }
  }
};
