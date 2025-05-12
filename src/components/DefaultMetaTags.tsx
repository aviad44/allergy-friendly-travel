
import { Helmet } from "react-helmet";

export const DefaultMetaTags = () => {
  // Make sure we always use absolute URLs
  const baseUrl = "https://www.allergy-free-travel.com";
  const currentUrl = typeof window !== 'undefined' ? window.location.href : baseUrl;
  const defaultImage = `${baseUrl}/lovable-uploads/e8b4dc3d-60a2-4fb7-bc33-77580f4d249c.png`;
  const favicon = `${baseUrl}/lovable-uploads/9a760c6c-9c78-40fe-bd6f-90c7fbef6663.png`;
  
  return (
    <Helmet defaultTitle="Allergy-Free Travel – Hotels for Food Allergies">
      {/* Favicon */}
      <link rel="icon" href={favicon} type="image/png" />
      <link rel="apple-touch-icon" href={favicon} />
      
      {/* Primary Meta Tags */}
      <meta name="description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* FALLBACK ONLY: These Open Graph tags should be overridden by individual pages */}
      {/* They will only be used if a page doesn't define its own tags */}
      <meta property="og:type" content="website" data-react-helmet="true" />
      <meta property="og:title" content="Allergy-Free Travel – Hotels for Food Allergies" data-react-helmet="true" />
      <meta property="og:description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." data-react-helmet="true" />
      <meta property="og:url" content={currentUrl} data-react-helmet="true" />
      <meta property="og:image" content={defaultImage} data-react-helmet="true" />
      <meta property="og:image:type" content="image/png" data-react-helmet="true" />
      <meta property="og:image:width" content="1200" data-react-helmet="true" />
      <meta property="og:image:height" content="630" data-react-helmet="true" />
      <meta property="og:image:alt" content="Allergy-Free Travel Logo" data-react-helmet="true" />
      <meta property="og:site_name" content="Allergy Free Travel" data-react-helmet="true" />
      <meta property="og:locale" content="en_US" data-react-helmet="true" />
      <meta property="og:image:secure_url" content={defaultImage} data-react-helmet="true" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" data-react-helmet="true" />
      <meta name="twitter:title" content="Allergy-Free Travel – Hotels for Food Allergies" data-react-helmet="true" />
      <meta name="twitter:description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." data-react-helmet="true" />
      <meta name="twitter:image" content={defaultImage} data-react-helmet="true" />
      <meta name="twitter:image:alt" content="Allergy-Free Travel Logo" data-react-helmet="true" />
      
      {/* WhatsApp specific meta tags */}
      <link itemProp="thumbnailUrl" href={defaultImage} />
      <span itemProp="thumbnail" itemScope itemType="http://schema.org/ImageObject">
        <link itemProp="url" href={defaultImage} />
      </span>
    </Helmet>
  );
};
