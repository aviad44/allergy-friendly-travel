
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { initPerformanceOptimizations } from '@/utils/performanceOptimizer'

// Initialize performance optimizations
initPerformanceOptimizations();

// App is needed on every single route, so lazy-loading it here bought no
// bundle-size savings — it just added a sequential chunk fetch before any
// page (including the LCP-critical homepage hero) could start rendering.
const root = createRoot(document.getElementById("root")!);
root.render(<App />);
