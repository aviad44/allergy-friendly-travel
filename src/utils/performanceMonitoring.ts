
/**
 * Web Performance Monitoring Utilities
 * Tracks critical web vitals and other performance metrics
 */

// Helper function to safely check if Performance API is available
const isPerformanceSupported = () => {
  return typeof window !== 'undefined' && 
         typeof window.performance !== 'undefined' && 
         typeof PerformanceObserver !== 'undefined';
};

// Initialize performance monitoring
export const initPerformanceMonitoring = () => {
  if (!isPerformanceSupported()) {
    console.log('Performance API not supported in this environment');
    return;
  }

  try {
    // Monitor LCP (Largest Contentful Paint)
    observeLCP();
    
    // Monitor FID (First Input Delay)
    observeFID();
    
    // Monitor CLS (Cumulative Layout Shift)
    observeCLS();
    
    // Monitor long tasks (for responsiveness)
    observeLongTasks();
    
    // Monitor resource loading
    observeResourceLoading();
    
    // Monitor navigation timing
    captureNavigationTiming();
    
    console.log('Performance monitoring initialized');
  } catch (error) {
    console.error('Error initializing performance monitoring:', error);
  }
};

// Monitor Largest Contentful Paint
const observeLCP = () => {
  try {
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      
      if (lastEntry) {
        // Need to type cast since TS doesn't know about LCP properties
        const lcpEntry = lastEntry as PerformanceEntry & { element?: Element };
        
        const lcpValue = lcpEntry.startTime;
        const lcpElement = lcpEntry.element;
        
        console.log(`LCP: ${lcpValue.toFixed(2)}ms`, lcpElement ? 
          `Element: ${lcpElement.tagName.toLowerCase()}` : 'Unknown element');
        
        // Report to analytics if needed
        if (lcpValue > 2500) {
          console.warn('LCP is above the "good" threshold (2.5s)');
        }
      }
    });
    
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
  } catch (error) {
    console.error('Error observing LCP:', error);
  }
};

// Monitor First Input Delay
const observeFID = () => {
  try {
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        // Need to type cast for FID properties
        const fidEntry = entry as PerformanceEntry & { 
          processingStart?: number;
          startTime: number;
        };
        
        const fidValue = fidEntry.processingStart ? 
          fidEntry.processingStart - fidEntry.startTime : 0;
        
        console.log(`FID: ${fidValue.toFixed(2)}ms`);
        
        // Report to analytics if needed
        if (fidValue > 100) {
          console.warn('FID is above the "good" threshold (100ms)');
        }
      });
    });
    
    fidObserver.observe({ type: 'first-input', buffered: true });
  } catch (error) {
    console.error('Error observing FID:', error);
  }
};

// Monitor Cumulative Layout Shift
const observeCLS = () => {
  try {
    let clsValue = 0;
    let clsEntries = [];
    
    const clsObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach(entry => {
        // Type cast for CLS properties
        const clsEntry = entry as PerformanceEntry & { 
          value: number;
          hadRecentInput?: boolean;
        };
        
        // Ignore if had recent input
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
          clsEntries.push(clsEntry);
          
          console.log(`CLS update: ${clsValue.toFixed(3)}`);
          
          // Report to analytics if needed
          if (clsValue > 0.1) {
            console.warn('CLS is above the "good" threshold (0.1)');
          }
        }
      });
    });
    
    clsObserver.observe({ type: 'layout-shift', buffered: true });
  } catch (error) {
    console.error('Error observing CLS:', error);
  }
};

// Monitor long tasks for responsiveness
const observeLongTasks = () => {
  try {
    const longTaskObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach(entry => {
        console.log(`Long task detected: ${entry.duration.toFixed(2)}ms`);
      });
    });
    
    // For long tasks, we don't need any custom properties
    longTaskObserver.observe({ type: 'longtask', buffered: true });
  } catch (error) {
    console.error('Error observing long tasks:', error);
  }
};

// Monitor resource loading
const observeResourceLoading = () => {
  try {
    const resourceObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      
      entries.forEach(entry => {
        // Type cast for resource timing properties
        const resourceEntry = entry as PerformanceResourceTiming;
        
        // Only log large resources or slow resources
        if (
          (resourceEntry.transferSize && resourceEntry.transferSize > 100000) || 
          entry.duration > 1000
        ) {
          console.log(
            `Resource: ${resourceEntry.name.split('/').pop()}, ` +
            `Size: ${resourceEntry.transferSize ? 
              (resourceEntry.transferSize / 1024).toFixed(1) + 'KB' : 'unknown'}, ` +
            `Duration: ${entry.duration.toFixed(0)}ms`
          );
        }
      });
    });
    
    resourceObserver.observe({ type: 'resource', buffered: true });
  } catch (error) {
    console.error('Error observing resource loading:', error);
  }
};

// Capture navigation timing
const captureNavigationTiming = () => {
  if (typeof window === 'undefined' || !window.performance || !window.performance.timing) {
    return;
  }
  
  // Use setTimeout to ensure timing data is available
  setTimeout(() => {
    try {
      const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navTiming) {
        console.log('Navigation Timing:');
        console.log(`- DNS: ${(navTiming.domainLookupEnd - navTiming.domainLookupStart).toFixed(0)}ms`);
        console.log(`- TCP: ${(navTiming.connectEnd - navTiming.connectStart).toFixed(0)}ms`);
        console.log(`- Request: ${(navTiming.responseStart - navTiming.requestStart).toFixed(0)}ms`);
        console.log(`- Response: ${(navTiming.responseEnd - navTiming.responseStart).toFixed(0)}ms`);
        console.log(`- DOM Processing: ${(navTiming.domComplete - navTiming.domInteractive).toFixed(0)}ms`);
        console.log(`- Load Event: ${(navTiming.loadEventEnd - navTiming.loadEventStart).toFixed(0)}ms`);
        console.log(`- Total Page Load: ${(navTiming.loadEventEnd - navTiming.startTime).toFixed(0)}ms`);
      }
    } catch (error) {
      console.error('Error capturing navigation timing:', error);
    }
  }, 0);
};
