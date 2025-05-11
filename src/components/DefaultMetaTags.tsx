
import { Helmet } from "react-helmet";

export const DefaultMetaTags = () => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.allergy-free-travel.com';
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
  const defaultImage = '/lovable-uploads/e8b4dc3d-60a2-4fb7-bc33-77580f4d249c.png';
  const favicon = '/lovable-uploads/9a760c6c-9c78-40fe-bd6f-90c7fbef6663.png';
  
  return (
    <Helmet defaultTitle="Allergy-Free Travel – Hotels for Food Allergies">
      {/* Favicon */}
      <link rel="icon" href={favicon} type="image/png" />
      <link rel="apple-touch-icon" href={favicon} />
      
      {/* Primary Meta Tags */}
      <meta name="description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* These tags will be overridden by page-specific tags */}
      {/* They only serve as fallbacks with lower priority */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Allergy-Free Travel – Hotels for Food Allergies" />
      <meta property="og:description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={`${baseUrl}${defaultImage}`} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Allergy-Free Travel Logo" />
      <meta property="og:site_name" content="Allergy Free Travel" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:secure_url" content={`${baseUrl}${defaultImage}`} />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Allergy-Free Travel – Hotels for Food Allergies" />
      <meta name="twitter:description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." />
      <meta name="twitter:image" content={`${baseUrl}${defaultImage}`} />
      <meta name="twitter:image:alt" content="Allergy-Free Travel Logo" />
      
      {/* WhatsApp specific meta tags */}
      <link itemProp="thumbnailUrl" href={`${baseUrl}${defaultImage}`} />
      <span itemProp="thumbnail" itemScope itemType="http://schema.org/ImageObject">
        <link itemProp="url" href={`${baseUrl}${defaultImage}`} />
      </span>
    </Helmet>
  );
};
