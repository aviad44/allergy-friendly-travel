
import React from 'react';
import { Helmet } from 'react-helmet';
import { DestinationReviews } from '@/components/reviews/DestinationReviews';

const Munich = () => {
  return (
    <>
      <Helmet>
        <title>Allergy-Friendly Hotels in Munich | Celiac & Gluten-Free Travel Guide</title>
        <meta name="description" content="Find the best allergy-friendly hotels in Munich, Germany. Safe accommodations for travelers with food allergies, celiac disease, and dietary restrictions." />
        <meta name="keywords" content="allergy-friendly hotels Munich, celiac restaurants Munich, gluten-free Munich, food allergy travel Germany" />
        <meta property="og:title" content="Allergy-Friendly Hotels in Munich | Celiac & Gluten-Free Travel Guide" />
        <meta property="og:description" content="Find the best allergy-friendly hotels in Munich, Germany. Safe accommodations for travelers with food allergies, celiac disease, and dietary restrictions." />
        <meta property="og:image" content="/lovable-uploads/0d8276b6-5aeb-41fa-9498-d91afef68aeb.png" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.allergy-free-travel.com/destinations/munich" />
      </Helmet>
      <DestinationReviews destinationId="munich" />
    </>
  );
};

export default Munich;
