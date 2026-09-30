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

// Location words for a Booking.com search, from a free-form address: drop the
// street (first segment) and the country (last) when there are 3+ segments,
// drop postcode/number tokens, and drop words already in the hotel name
// ("116 Piccadilly, London W1J 7BJ, UK" + "The Ritz London" → "";
// "Nesplein, Amsterdam Center" + "Hotel V Nesplein" → "Amsterdam Center").
function locationWords(name: string, address?: string): string {
  if (!address) return '';
  const parts = address.split(',').map(p => p.trim()).filter(Boolean);
  const kept = parts.length >= 3 ? parts.slice(1, -1) : parts;
  const nameWords = new Set(name.toLowerCase().split(/\s+/));
  return kept
    .join(' ')
    .split(/\s+/)
    .filter(token => token && !/\d/.test(token) && !nameWords.has(token.toLowerCase()))
    .join(' ');
}

// Every hotel exit on the site goes to Booking.com (not the hotel's own
// website), so it can earn commission: an existing Booking.com URL is kept
// as-is, anything else (a hotel's official site, or nothing) becomes a
// Booking.com search for the hotel — the same `searchresults.html?ss=` shape
// content-pipeline and hotel-search already use. Pass the result through
// withBookingAffiliate() when rendering.
export function bookingUrlForHotel(name: string, address?: string, existingUrl?: string | null): string {
  if (existingUrl && isBookingUrl(existingUrl)) return existingUrl.trim();
  const query = [name, locationWords(name, address)].filter(Boolean).join(' ');
  return `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(query)}`;
}

// rel for an outbound link: affiliate links must be marked `sponsored` for
// Google (paid links that pass PageRank are a link-scheme violation).
export function outboundRel(url?: string | null): string {
  return isAffiliateActive() && isBookingUrl(url)
    ? 'sponsored noopener noreferrer'
    : 'noopener noreferrer';
}
