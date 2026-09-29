// Single place every outbound Booking.com link on the site passes through,
// so the affiliate tag is applied consistently — including to URLs already
// stored in the DB (`hotels.booking_url`, written by content-pipeline) and
// returned live by `hotel-search`, without any data migration.
//
// Until a real Booking.com Affiliate Partner ID exists, BOOKING_AFFILIATE_ID
// stays empty and every link passes through unchanged (no fake/placeholder
// `aid` is ever sent). Activating the program is then a one-line change here.
//
// Non-Booking URLs (a hotel's own website, etc.) are never touched.

export const BOOKING_AFFILIATE_ID = '';

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
  return BOOKING_AFFILIATE_ID.length > 0;
}

// `placement` becomes Booking's `label` param, which shows up as a breakdown
// in the affiliate dashboard — i.e. which part of our site a booking came
// from (article page, live search, hotel chains page, ...).
export function withBookingAffiliate(url: string, placement: string): string {
  if (!isAffiliateActive() || !isBookingUrl(url)) return url;
  try {
    const u = new URL(url.trim());
    u.searchParams.set('aid', BOOKING_AFFILIATE_ID);
    u.searchParams.set('label', `aft-${placement}`);
    return u.toString();
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
