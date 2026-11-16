// Pure rendering helpers for the weekly newsletter (no Deno/network APIs, so
// they can be unit-tested in plain Node).
//
// CONTENT POLICY (CLAUDE.md): the newsletter is assembled ONLY from fields of
// real published articles — title, meta description, link, hero image. No
// hand-written or generated copy about hotels/restaurants, no quotes. The only
// static text is the generic intro/footer below.
//
// PHOTOS: Google Places Photos are licensed for on-site display with their
// attribution, not for redistribution in off-site marketing, so a hero image
// that is a Google Places photo is simply omitted from the email (see the same
// rule in social-poster/pinterest-poster).

export const SITE_URL = "https://www.allergy-free-travel.com";
export const MAX_ARTICLES_PER_ISSUE = 5;

export interface NewsletterArticle {
  id: string;
  title: string;
  slug: string | null;
  content_type: string | null;
  meta_description: string | null;
  hero_image_url: string | null;
  hero_image_credit: string | null;
}

const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,150}$/;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function isGooglePlacesPhotoUrl(url?: string | null): boolean {
  if (!url) return false;
  return /maps\.googleapis\.com\/maps\/api\/place\/photo/i.test(url);
}

/** https only, and never a Google Places photo. */
export function isUsableImageUrl(url?: string | null): url is string {
  if (!url) return false;
  if (isGooglePlacesPhotoUrl(url)) return false;
  try {
    return new URL(url).protocol === "https:";
  } catch {
    return false;
  }
}

/** An article can go in the newsletter only if it has a safe slug and a title. */
export function isSendableArticle(a: NewsletterArticle): boolean {
  return !!a.slug && SLUG_RE.test(a.slug) && !!a.title && a.title.trim().length > 0;
}

/**
 * Source-tracking query string appended to EVERY link in the email that points
 * at the site (articles, thumbnails, header/footer links), so GA4 attributes
 * the visit to Source "newsletter" / Medium "email" / Campaign "<issue date>".
 * (The tokenized unsubscribe page is the one exception: it's not a visit we
 * want to measure.)
 */
export function trackingParams(campaign: string): string {
  return `utm_source=newsletter&utm_medium=email&utm_campaign=${encodeURIComponent(campaign)}`;
}

/** Homepage link carrying the same tracking parameters as the article links. */
export function siteHomeUrl(campaign: string): string {
  return `${SITE_URL}/?${trackingParams(campaign)}`;
}

/** One-line teaser: whitespace collapsed, cut at a word boundary. */
export function shortDescription(desc: string | null | undefined, max = 140): string {
  const d = (desc ?? "").replace(/\s+/g, " ").trim();
  if (!d || d.length <= max) return d;
  const cut = d.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trimEnd()}\u2026`;
}

/**
 * Live article URL. Trailing slash is mandatory (CLAUDE.md: the host
 * 301-redirects every non-root path to the slashed form). utm_* params are
 * stripped from canonicals by buildCanonical(), so they don't create duplicate
 * pages, and they let GA4 attribute newsletter traffic.
 */
export function articleUrl(a: NewsletterArticle, campaign: string): string {
  const base = a.content_type === "restaurant" ? "restaurants" : "destinations";
  return `${SITE_URL}/${base}/${a.slug}/?${trackingParams(campaign)}`;
}

export function buildSubject(articles: NewsletterArticle[]): string {
  const first = articles[0].title.trim();
  const title = first.length > 70 ? `${first.slice(0, 67).trimEnd()}...` : first;
  return `New allergy-friendly travel guides: ${title}`;
}

export interface RenderOptions {
  articles: NewsletterArticle[];
  /** Per-recipient unsubscribe page URL (with token). */
  unsubscribeUrl: string;
  /** Physical postal address required in the footer of commercial email. */
  postalAddress: string;
  /** e.g. "2026-11-17", used as utm_campaign. */
  campaign: string;
}

/**
 * Deliberately compact: a slim header, then one row per article (small
 * thumbnail on the left, linked title + a one-line teaser on the right), then
 * a small footer. No photo credit line: the thumbnail and title link to the
 * article, where the on-site page shows the photo credit.
 */
export function renderNewsletter(opts: RenderOptions): { html: string; text: string } {
  const { articles, unsubscribeUrl, postalAddress, campaign } = opts;
  const home = escapeHtml(siteHomeUrl(campaign));

  const rows = articles
    .map((a) => {
      const url = escapeHtml(articleUrl(a, campaign));
      const title = escapeHtml(a.title.trim());
      const desc = shortDescription(a.meta_description);
      // Decorative thumbnail (alt="" because the title link sits right next to it).
      const thumb = isUsableImageUrl(a.hero_image_url)
        ? `<td width="88" valign="top" style="width:88px;padding:0 12px 0 0"><a href="${url}"><img src="${escapeHtml(a.hero_image_url)}" alt="" width="88" style="display:block;width:88px;height:auto;border:0;border-radius:6px"></a></td>`
        : "";
      return `<tr><td style="padding:12px 0;border-top:1px solid #eceff1">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>${thumb}
          <td valign="top" style="font-size:13px;line-height:1.45;color:#6b7280">
            <a href="${url}" style="font-size:15px;line-height:1.35;font-weight:bold;color:#115e59;text-decoration:none">${title}</a>${desc ? `<div style="margin-top:3px">${escapeHtml(desc)}</div>` : ""}
          </td>
        </tr></table>
      </td></tr>`;
    })
    .join("\n");

  const unsub = escapeHtml(unsubscribeUrl);
  const address = escapeHtml(postalAddress.trim()).replace(/\r?\n/g, "<br>");

  const html = `<!doctype html>
<html><body style="margin:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#1f2937">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:16px 12px">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px">
      <tr><td style="padding-bottom:10px;font-size:13px;color:#6b7280"><a href="${home}" style="font-size:16px;font-weight:bold;color:#115e59;text-decoration:none">Allergy-Free Travel</a> &middot; new guides</td></tr>
      ${rows}
      <tr><td style="padding-top:14px;border-top:1px solid #eceff1;font-size:11px;line-height:1.6;color:#6b7280">
        You're receiving this because you subscribed at <a href="${home}" style="color:#6b7280">allergy-free-travel.com</a> and confirmed your email address. <a href="${unsub}" style="color:#6b7280">Unsubscribe</a><br>
        ${address}
      </td></tr>
    </table>
  </td></tr></table>
</body></html>`;

  const textBlocks = articles
    .map((a) => {
      const desc = shortDescription(a.meta_description);
      return `${a.title.trim()}${desc ? `\n${desc}` : ""}\n${articleUrl(a, campaign)}`;
    })
    .join("\n\n");
  const text =
    `Allergy-Free Travel - new guides\n\n${textBlocks}\n\n--\n` +
    `You're receiving this because you subscribed at allergy-free-travel.com and confirmed your email address.\n` +
    `Unsubscribe: ${unsubscribeUrl}\n\n${postalAddress.trim()}\n`;

  return { html, text };
}
