import { Helmet } from "react-helmet";

export const DefaultMetaTags = () => {
  // Get the current URL for the og:url tag
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.allergy-free-travel.com';
  const baseUrl = 'https://www.allergy-free-travel.com';
  const defaultImage = `${baseUrl}/lovable-uploads/c0d4e111-501f-46b3-94ad-23c5b56f9736.png`;
  
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
      <meta property="og:image" content={defaultImage} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Poolside vacation scene with palm trees – Allergy-Free Travel" />
      <meta property="og:image:secure_url" content={defaultImage} />
      <meta property="og:site_name" content="Allergy-Free Travel" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Allergy-Free Travel – Hotels for Food Allergies" />
      <meta name="twitter:description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
      <meta name="twitter:image" content={defaultImage} />
      <meta name="twitter:site" content="@allergyfreetvl" />
    </Helmet>
  );
};
