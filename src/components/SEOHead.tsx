import { Helmet } from "react-helmet-async";

/**
 * SEO-optimized head component with preconnect hints and performance optimizations
 * This component should be loaded in the root of the app for optimal performance
 */
export const SEOHead = () => {
  return (
    <Helmet>
      {/* DNS Prefetch & Preconnect for external domains */}
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Charset and Viewport */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#005566" />
      
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
