// Thin wrapper around the Meta Pixel's `fbq` global (loaded in index.html,
// deferred until window 'load' — see the comment there for why). Guards
// every call so pages never throw if the pixel hasn't finished loading yet,
// or if an ad blocker stripped it out entirely.

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaPixelEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq('track', eventName, params);
    }
  } catch {
    // Never let a tracking failure break the actual feature (search, etc.)
  }
}

// Fired when a user actually runs a hotel or restaurant search, our one
// meaningful conversion signal for ad campaign optimization and retargeting.
export function trackSiteSearch(destination: string, mode: 'hotels' | 'restaurants') {
  trackMetaPixelEvent('Search', {
    search_string: destination,
    content_category: mode,
  });
}
