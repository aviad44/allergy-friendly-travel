
import { Helmet } from "react-helmet";

export const DefaultMetaTags = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.allergy-free-travel.com';
  const baseUrl = 'https://www.allergy-free-travel.com';
  const defaultImage = '/lovable-uploads/e8b4dc3d-60a2-4fb7-bc33-77580f4d249c.png';
  
  return (
    <Helmet defaultTitle="Allergy-Free Travel – Hotels for Food Allergies">
      {/* Primary Meta Tags */}
      <meta name="description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph tags for social sharing */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Allergy-Free Travel – Hotels for Food Allergies" />
      <meta property="og:description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={`${baseUrl}${defaultImage}`} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="600" />
      <meta property="og:image:height" content="600" />
      <meta property="og:image:alt" content="Allergy-Free Travel Logo - Suitcase and Eating Utensils" />
      <meta property="og:image:secure_url" content={`${baseUrl}${defaultImage}`} />
      <meta property="og:site_name" content="Allergy-Free Travel" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Allergy-Free Travel – Hotels for Food Allergies" />
      <meta name="twitter:description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
      <meta name="twitter:image" content={`${baseUrl}${defaultImage}`} />
      <meta name="twitter:site" content="@allergyfreetvl" />
    </Helmet>
  );
};
