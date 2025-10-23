/**
 * Enhanced structured data generators for improved SEO
 * Following schema.org specifications for rich snippets
 */

interface FAQItem {
  question: string;
  answer: string;
}

interface HowToStep {
  name: string;
  text: string;
  image?: string;
}

export const generateFAQSchema = (faqs: FAQItem[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const generateHowToSchema = (
  name: string,
  description: string,
  steps: HowToStep[],
  totalTime?: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": totalTime || "PT10M",
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image })
    }))
  };
};

export const generateArticleSchema = (
  headline: string,
  description: string,
  image: string,
  datePublished: string,
  dateModified: string,
  authorName: string = "Allergy-Free Travel Team"
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": headline,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": "https://www.allergy-free-travel.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Allergy-Free Travel",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.allergy-free-travel.com/og-image.png"
      }
    }
  };
};

export const generateLocalBusinessSchema = (
  name: string,
  address: string,
  telephone?: string,
  priceRange: string = "$$"
) => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address
    },
    ...(telephone && { "telephone": telephone }),
    "priceRange": priceRange,
    "servesCuisine": "Various (Allergy-Friendly)"
  };
};

export const generateTravelGuideSchema = (
  destination: string,
  description: string,
  image: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "TravelAction",
    "name": `Travel Guide to ${destination}`,
    "description": description,
    "image": image,
    "target": {
      "@type": "Place",
      "name": destination
    }
  };
};

export const generateWebPageSchema = (
  name: string,
  description: string,
  url: string,
  image: string
) => {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": name,
    "description": description,
    "url": url,
    "image": image,
    "inLanguage": "en-US",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Allergy-Free Travel",
      "url": "https://www.allergy-free-travel.com"
    }
  };
};
