
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { initPerformanceOptimizations } from '@/utils/performanceOptimizer'

// Initialize performance optimizations
initPerformanceOptimizations();

// App is needed on every single route, so lazy-loading it here bought no
// bundle-size savings — it just added a sequential chunk fetch before any
// page (including the LCP-critical homepage hero) could start rendering.
const rootEl = document.getElementById("root")!;

// Every real route is served prerendered (scripts/prerender.mjs), so the
// page is already fully visible before this runs. Mounting React is one long
// main-thread task, and the browser can't paint while it runs — PageSpeed's
// LCP breakdown on the homepage showed the hero image downloaded after
// ~0.85s but not painted until ~1.7s later ("Element render delay"), stuck
// behind that task. So let the prerendered high-priority images (the LCP
// hero) finish loading and get painted first, then mount. Capped so a slow
// image can never hold interactivity back for long.
const LCP_IMAGE_WAIT_CAP_MS = 1500;

const waitForPrerenderedLcpImages = (): Promise<void> => {
  const pending = Array.from(
    rootEl.querySelectorAll<HTMLImageElement>('img[fetchpriority="high"]'),
  ).filter((img) => !img.complete);

  const loaded = Promise.all(
    pending.map(
      (img) =>
        new Promise<void>((resolve) => {
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );
  const cap = new Promise<void>((resolve) => setTimeout(resolve, LCP_IMAGE_WAIT_CAP_MS));

  // rAF + setTimeout(0): resume only after the next frame has been painted.
  return Promise.race([loaded, cap]).then(
    () => new Promise<void>((resolve) => requestAnimationFrame(() => setTimeout(resolve, 0))),
  );
};

waitForPrerenderedLcpImages().then(() => {
  createRoot(rootEl).render(<App />);
});
