
import { Helmet } from "react-helmet-async";

export const DefaultMetaTags = () => {
  // Make sure we always use absolute URLs
  const baseUrl = "https://www.allergy-free-travel.com";
  const favicon = `${baseUrl}/icons/icon-32.png`;
  const appleTouchIcon = `${baseUrl}/icons/icon-180.png`;
  
  return (
    <Helmet defaultTitle="Allergy-Free Travel – Hotels for Food Allergies">
      {/* Favicon */}
      <link rel="icon" href={favicon} type="image/png" />
      <link rel="apple-touch-icon" href={appleTouchIcon} />
      
      {/* Primary Meta Tags - won't override page-specific tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      
      {/* Keep only minimal static defaults; dynamic tags handled by MetaManager */}

    </Helmet>
  );
};
