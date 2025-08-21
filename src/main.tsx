
import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'
import './index.css'
import { initPerformanceOptimizations } from '@/utils/performanceOptimizer'

// Dynamic import for App component (aggressive code splitting)
const App = lazy(() => import('./App'));

// Optimized loading indicator with minimal CSS
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#fff'
  }}>
    <div style={{
      width: '48px',
      height: '48px',
      border: '4px solid #00b397',
      borderTop: '4px solid transparent',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Early preload of critical hero image for optimal LCP
const heroImageUrl = "/lovable-uploads/91b0eae8-ef34-4d1d-9d6e-6e4a4a62fb86.png";
const heroPreloadLink = document.createElement('link');
heroPreloadLink.rel = 'preload';
heroPreloadLink.as = 'image';
heroPreloadLink.href = heroImageUrl;
heroPreloadLink.fetchPriority = 'high';
document.head.appendChild(heroPreloadLink);

// Initialize performance optimizations
initPerformanceOptimizations();

// Mount the app with Suspense for optimal code splitting
const root = createRoot(document.getElementById("root")!);
root.render(
  <Suspense fallback={<LoadingFallback />}>
    <App />
  </Suspense>
);
