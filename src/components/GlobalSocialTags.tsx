
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { DEFAULT_SOCIAL_IMAGE, DESTINATION_OG_IMAGES } from "@/utils/socialSharing";

export const GlobalSocialTags = () => {
  const location = useLocation();
  
  // Default values for all pages
  let title = "Allergy-Friendly Travel Guide | Safe Hotels & Tips for Dietary Restrictions";
  let description = "Your #1 resource for allergy-friendly hotels, restaurants and travel guides. Find accommodations that cater to food allergies, gluten-free, dairy-free and more.";
  let imageUrl = DEFAULT_SOCIAL_IMAGE;
  let url = `https://www.allergy-free-travel.com${location.pathname}`;
  
  // Check if we're on a destination page and customize accordingly
  const pathParts = location.pathname.split('/');
  if (pathParts.length > 2 && pathParts[1] === 'destinations') {
    const destId = pathParts[2] as keyof typeof DESTINATION_OG_IMAGES;
    if (DESTINATION_OG_IMAGES[destId]) {
      imageUrl = DESTINATION_OG_IMAGES[destId];
      // Customize title and description for destination pages
      const destName = destId.charAt(0).toUpperCase() + destId.slice(1).replace('-', ' ');
      title = `Allergy-Friendly Hotels in ${destName} | Safe Dining Guide`;
      description = `Discover the best allergy-friendly hotels in ${destName}. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.`;
    }
  }
  
  return (
    <Helmet>
      {/* Essential Open Graph tags for social sharing */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Allergy-Free Travel" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${title} - Allergy-Free Travel`} />
      
      {/* WhatsApp specific tags */}
      <link rel="image_src" href={imageUrl} />
      <link itemProp="thumbnailUrl" href={imageUrl} />
      <meta itemProp="image" content={imageUrl} />
      
      {/* Facebook specific */}
      <meta property="fb:app_id" content="allergy.free.travel" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};
