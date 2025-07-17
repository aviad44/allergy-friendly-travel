import { Helmet } from "react-helmet";

interface StructuredDataProps {
  type: 'website' | 'article' | 'travelGuide' | 'localBusiness';
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  publishedDate?: string;
  location?: {
    name: string;
    address?: string;
    coordinates?: { lat: number; lng: number };
  };
  reviews?: Array<{
    author: string;
    rating: number;
    text: string;
    date: string;
  }>;
}

export const StructuredData = ({ 
  type, 
  title, 
  description, 
  url, 
  image, 
  author, 
  publishedDate,
  location,
  reviews
}: StructuredDataProps) => {
  const baseData = {
    "@context": "https://schema.org",
    "name": title,
    "description": description,
    "url": url,
    "image": image,
    "publisher": {
      "@type": "Organization",
      "name": "Allergy-Free Travel",
      "url": "https://www.allergy-free-travel.com",
      "logo": "https://www.allergy-free-travel.com/lovable-uploads/9a760c6c-9c78-40fe-bd6f-90c7fbef6663.png"
    }
  };

  let structuredData;

  switch (type) {
    case 'website':
      structuredData = {
        ...baseData,
        "@type": "WebSite",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.allergy-free-travel.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };
      break;

    case 'article':
      structuredData = {
        ...baseData,
        "@type": "Article",
        "author": {
          "@type": "Person",
          "name": author || "Allergy-Free Travel Team"
        },
        "datePublished": publishedDate || new Date().toISOString(),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        },
        "headline": title
      };
      break;

    case 'travelGuide':
      structuredData = {
        ...baseData,
        "@type": "TravelGuide",
        "about": location ? {
          "@type": "Place",
          "name": location.name,
          "address": location.address,
          "geo": location.coordinates ? {
            "@type": "GeoCoordinates",
            "latitude": location.coordinates.lat,
            "longitude": location.coordinates.lng
          } : undefined
        } : undefined,
        "audience": {
          "@type": "Audience",
          "audienceType": "Travelers with food allergies and dietary restrictions"
        },
        "author": {
          "@type": "Person",
          "name": author || "Allergy-Free Travel Team"
        }
      };
      break;

    case 'localBusiness':
      structuredData = {
        ...baseData,
        "@type": "LocalBusiness",
        "address": location?.address,
        "geo": location?.coordinates ? {
          "@type": "GeoCoordinates",
          "latitude": location.coordinates.lat,
          "longitude": location.coordinates.lng
        } : undefined,
        "aggregateRating": reviews && reviews.length > 0 ? {
          "@type": "AggregateRating",
          "ratingValue": reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
          "reviewCount": reviews.length
        } : undefined,
        "review": reviews?.map(review => ({
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": review.author
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": review.rating
          },
          "reviewBody": review.text,
          "datePublished": review.date
        }))
      };
      break;

    default:
      structuredData = baseData;
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};