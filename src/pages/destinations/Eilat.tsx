
import React, { useEffect } from 'react';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';
import { SocialTags } from '@/components/SocialTags';
import { DESTINATION_OG_IMAGES } from '@/utils/socialSharing';
import { useLocation } from 'react-router-dom';

const Eilat = () => {
  const location = useLocation();
  const baseUrl = import.meta.env.VITE_PUBLIC_URL || 'https://www.allergy-free-travel.com';
  const pagePath = location.pathname;
  const ogImageUrl = DESTINATION_OG_IMAGES['eilat'];
  
  // Log OG image for debugging social sharing
  useEffect(() => {
    console.log('Eilat page loaded');
    console.log(`OG Image URL: ${ogImageUrl}`);
    console.log(`Page Path: ${pagePath}`);
  }, [ogImageUrl, pagePath]);
  
  return (
    <>
      <SocialTags
        title="A Stress-Free Vacation: U Coral Beach Hotel in Eilat Offers a Unique Allergy-Friendly Experience"
        description="Discover how U Coral Beach Hotel in Eilat by Fattal offers a unique allergy-friendly experience for families traveling with food allergies."
        imageUrl={ogImageUrl}
        url={`${baseUrl}${pagePath}`}
      />
      <DestinationReviews destinationId="eilat" />
    </>
  );
};

export default Eilat;
