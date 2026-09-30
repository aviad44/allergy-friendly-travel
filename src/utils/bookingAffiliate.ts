// Single place every outbound Booking.com link on the site passes through,
// so the affiliate tracking is applied consistently — including to URLs
// already stored in the DB (`hotels.booking_url`, written by content-pipeline)
// and returned live by `hotel-search`, without any data migration.
//
// We're joining Booking.com's affiliate program through CJ Affiliate
// (the "Booking.com MEA" program, advertiser 4347392), not Booking's direct `aid=` program —
// Booking moved small publishers onto networks in 2025. CJ wraps the
// destination URL inside its own tracking link, so the tracking format is a
// template: copy a real deep link from CJ's Deep Link Generator, replace the
// encoded destination with {url} and the sub-ID value with {sid}.
//
// Setting BOOKING_DEEPLINK_TEMPLATE to '' switches tracking off site-wide:
// every link then passes through unchanged.
//
// Non-Booking URLs (a hotel's own website, etc.) are never touched.

// Built from a real deep link generated in CJ (Booking.com MEA program,
// advertiser 4347392; our website property PID 101893797; text link
// 11891539 "Booking.com").
export const BOOKING_DEEPLINK_TEMPLATE =
  'https://www.jdoqocy.com/click-101893797-11891539?sid={sid}&url={url}';

export function isBookingUrl(url?: string | null): boolean {
  if (!url) return false;
  try {
    const host = new URL(url.trim()).hostname.toLowerCase();
    return host === 'booking.com' || host.endsWith('.booking.com');
  } catch {
    return false;
  }
}

export function isAffiliateActive(): boolean {
  return BOOKING_DEEPLINK_TEMPLATE.length > 0;
}

// `placement` becomes the network's sub-ID (CJ's `sid`), which shows up as a
// breakdown in its reports — i.e. which part of our site a booking came from
// (article page, live search, hotel chains page, ...).
export function withBookingAffiliate(url: string, placement: string): string {
  if (!isAffiliateActive() || !isBookingUrl(url)) return url;
  try {
    const destination = new URL(url.trim()).toString();
    return BOOKING_DEEPLINK_TEMPLATE
      .replace('{url}', encodeURIComponent(destination))
      .replace('{sid}', encodeURIComponent(`aft-${placement}`));
  } catch {
    return url;
  }
}

// rel for an outbound link: affiliate links must be marked `sponsored` for
// Google (paid links that pass PageRank are a link-scheme violation).
export function outboundRel(url?: string | null): string {
  return isAffiliateActive() && isBookingUrl(url)
    ? 'sponsored noopener noreferrer'
    : 'noopener noreferrer';
}
