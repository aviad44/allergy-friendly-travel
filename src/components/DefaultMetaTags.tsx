
import { Helmet } from "react-helmet";

export const DefaultMetaTags = () => {
  // Get the current URL for the og:url tag
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.allergy-free-travel.com';
  
  return (
    <Helmet defaultTitle="Allergy-Free Travel – Hotels for Food Allergies">
      {/* Primary Meta Tags */}
      <meta name="description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
      
      {/* Open Graph tags for social sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Allergy-Free Travel – Hotels for Food Allergies" />
      <meta property="og:description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content="https://www.allergy-free-travel.com/og-image.png" />
      <meta property="og:image:type" content="image/png" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Allergy-Free Travel – Hotels for Food Allergies" />
      <meta name="twitter:description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
      <meta name="twitter:image" content="https://www.allergy-free-travel.com/og-image.png" />
    </Helmet>
  );
};
