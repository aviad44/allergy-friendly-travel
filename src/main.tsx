
import { createRoot } from 'react-dom/client'
import { StrictMode, lazy, Suspense } from 'react'
import './index.css'

// Initial loading indicator with minimal dependencies
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Error boundary for handling app loading failures
const ErrorFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
    <div className="text-red-500 text-xl font-bold mb-4">Failed to load the application</div>
    <p className="text-gray-600 mb-4">There was a problem loading the application. Please try refreshing the page.</p>
    <button 
      onClick={() => window.location.reload()} 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Refresh Page
    </button>
  </div>
);

// Use dynamic import for the App component with error handling
const App = lazy(() => import('./App')
  .catch(error => {
    console.error('Failed to load App component:', error);
    // Return a minimal error component to prevent the app from crashing
    return { default: ErrorFallback };
  })
);

// Mount the app with Suspense for code splitting
const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <Suspense fallback={<LoadingFallback />}>
        <App />
      </Suspense>
    </StrictMode>
  );
} else {
  console.error("Failed to find root element");
}
