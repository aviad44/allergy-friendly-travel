import { Helmet } from "react-helmet-async";

/**
 * SEO tags that aren't already covered by the static index.html head.
 * Preconnect/dns-prefetch, charset, viewport, and theme-color used to be
 * duplicated here — index.html already declares them statically (so the
 * browser sees them before any JS runs), making the copies here pure
 * dead weight. PageSpeed Insights specifically flags ">4 preconnect
 * connections" as wasteful, and this was pushing 4 real origins to 7
 * (with 3 of them duplicated).
 */
export const SEOHead = () => {
  return (
    <Helmet>
      {/* Language */}
      <meta httpEquiv="content-language" content="en" />
      <link rel="alternate" hrefLang="en" href="https://www.allergy-free-travel.com" />
      
      {/* Format Detection */}
      <meta name="format-detection" content="telephone=no" />
      {/* X-Content-Type-Options and X-Frame-Options are set as real HTTP
          headers in netlify.toml — browsers don't honor either one via
          <meta>, and Chrome logs a console error for X-Frame-Options
          specifically, so setting them here was pure dead weight. */}
    </Helmet>
  );
};
