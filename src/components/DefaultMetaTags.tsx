
import { Helmet } from "react-helmet";

export const DefaultMetaTags = () => {
  // Make sure we always use absolute URLs
  const baseUrl = "https://www.allergy-free-travel.com";
  const favicon = `${baseUrl}/lovable-uploads/9a760c6c-9c78-40fe-bd6f-90c7fbef6663.png`;
  
  return (
    <Helmet defaultTitle="Allergy-Free Travel – Hotels for Food Allergies">
      {/* Favicon */}
      <link rel="icon" href={favicon} type="image/png" />
      <link rel="apple-touch-icon" href={favicon} />
      
      {/* Primary Meta Tags - won't override page-specific tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      
      {/* These tags will only be used if individual pages don't specify their own */}
      <meta name="description" content="Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind." data-react-helmet="true" />
      
      {/* We're removing default OG tags from here since they'll be set by SocialTags on each page */}
    </Helmet>
  );
};
