
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { DESTINATION_OG_IMAGES, DEFAULT_SOCIAL_IMAGE, getAbsoluteImageUrl } from '@/utils/socialSharing';
import { DestinationId } from '@/types/definitions';

/**
 * This component provides fallback social tags for all pages,
 * especially useful for pages that don't have explicit SocialTags component
 */
export const GlobalSocialTags = () => {
  const location = useLocation();
  const [pageData, setPageData] = useState({
    title: 'Allergy-Free Travel – Hotels for Food Allergies',
    description: 'Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind.',
    image: DEFAULT_SOCIAL_IMAGE,
    url: ''
  });
  
  useEffect(() => {
    // Extract destination ID from path if applicable
    const pathParts = location.pathname.split('/');
    let currentDestinationId: DestinationId | null = null;
    
    if (pathParts.length > 2 && pathParts[1] === 'destinations') {
      const potentialId = pathParts[2].toLowerCase() as DestinationId;
      if (potentialId in DESTINATION_OG_IMAGES) {
        currentDestinationId = potentialId;
      }
    }
    
    // Update page data based on current route
    const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
    const currentUrl = `${baseUrl}${location.pathname}`;
    
    const newData = {
      title: 'Allergy-Free Travel – Hotels for Food Allergies',
      description: 'Discover safe and welcoming hotels for people with food allergies. Travel with peace of mind.',
      image: DEFAULT_SOCIAL_IMAGE,
      url: currentUrl
    };
    
    // For main destinations page
    if (location.pathname === '/destinations') {
      newData.title = 'Allergy-Friendly Travel Destinations | Safe Hotels Worldwide';
      newData.description = 'Browse our comprehensive guide to allergy-friendly travel destinations worldwide. Find safe accommodations for dietary restrictions in top cities and regions.';
      newData.image = 'https://www.allergy-free-travel.com/lovable-uploads/62ccb787-f90d-46b0-9d58-812c55375c22.png';
    }
    
    // For specific destination pages
    if (currentDestinationId) {
      // Get destination-specific image
      newData.image = DESTINATION_OG_IMAGES[currentDestinationId];
      
      // Format destination name for title
      const formattedName = currentDestinationId
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      newData.title = `Allergy-Friendly Hotels in ${formattedName} | Safe Dining Guide`;
      newData.description = `Discover the best allergy-friendly hotels in ${formattedName}. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.`;
    }
    
    setPageData(newData);
    
    console.log(`GlobalSocialTags: Set tags for ${location.pathname}`);
    console.log(`Image: ${newData.image}`);
    
  }, [location.pathname]);
  
  return (
    <Helmet>
      <meta property="og:title" content={pageData.title} />
      <meta property="og:description" content={pageData.description} />
      <meta property="og:image" content={getAbsoluteImageUrl(pageData.image)} />
      <meta property="og:url" content={pageData.url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Allergy-Free Travel" />
      <meta property="og:locale" content="he_IL" />
      <link rel="image_src" href={getAbsoluteImageUrl(pageData.image)} />
    </Helmet>
  );
};
