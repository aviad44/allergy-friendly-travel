
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
      <meta name="robots" content="index, follow" />
      
      {/* Keep only minimal static defaults; dynamic tags handled by MetaManager */}

    </Helmet>
  );
};
