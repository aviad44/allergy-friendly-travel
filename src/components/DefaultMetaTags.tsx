
import { Helmet } from "react-helmet";

export const DefaultMetaTags = () => {
  // Get the current URL for the og:url tag
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.allergy-free-travel.com';
  
  return (
    <Helmet defaultTitle="Allergy-Free Travel – Safe Hotels for People with Food Allergies">
      {/* Default Open Graph tags for social sharing */}
      <meta property="og:title" content="Allergy-Free Travel – Safe Hotels for People with Food Allergies" />
      <meta property="og:description" content="Discover allergy-friendly hotels and travel tips for Portugal and beyond." />
      <meta property="og:image" content="https://www.allergy-free-travel.com/lovable-uploads/ea490ba9-d771-4073-8a50-d7f7a7a27a7c.webp" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Allergy-Free Travel – Safe Hotels for People with Food Allergies" />
      <meta name="twitter:description" content="Discover allergy-friendly hotels and travel tips for Portugal and beyond." />
      <meta name="twitter:image" content="https://www.allergy-free-travel.com/lovable-uploads/ea490ba9-d771-4073-8a50-d7f7a7a27a7c.webp" />
    </Helmet>
  );
};
