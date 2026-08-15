// Thin wrapper around GA4's `gtag` global (loaded in index.html, deferred
// until window 'load' — see the comment there). Mirrors utils/metaPixel.ts:
// guards every call so a page never throws if gtag hasn't finished loading
// yet, or if an ad blocker stripped it out entirely.

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGAEvent(eventName: string, params?: Record<string, unknown>) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch {
    // Never let a tracking failure break the actual feature (booking links, etc.)
  }
}

// Fired whenever someone clicks through to a hotel's own booking/website
// link — the clearest "this visitor found a specific hotel worth acting on"
// signal the site has. Mark this event as a GA4 Key event (Admin > Events >
// find "hotel_booking_click" > toggle the star) to use it as a real
// conversion metric for ad campaigns, instead of judging by reach/clicks alone.
export function trackHotelBookingClick(hotelName: string, url?: string) {
  trackGAEvent('hotel_booking_click', {
    hotel_name: hotelName,
    link_url: url,
  });
}
