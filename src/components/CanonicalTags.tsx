
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

interface CanonicalTagsProps {
  canonicalUrl?: string;
}

export const CanonicalTags = ({ canonicalUrl }: CanonicalTagsProps) => {
  const location = useLocation();
  const baseUrl = "https://www.allergy-free-travel.com";
  
  // Generate canonical URL based on current path if not provided
  const finalCanonicalUrl = canonicalUrl || `${baseUrl}${location.pathname}`;
  
  return (
    <Helmet>
      <link rel="canonical" href={finalCanonicalUrl} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};
