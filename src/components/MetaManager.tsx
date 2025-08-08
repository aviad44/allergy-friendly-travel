import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { DEFAULT_SOCIAL_IMAGE, DESTINATION_OG_IMAGES, getAbsoluteImageUrl } from "@/utils/socialSharing";
import { buildCanonical } from "@/utils/seo";
import { organizationJsonLd, breadcrumbJsonLd, hotelJsonLd } from "@/utils/jsonld";

export type MetaType = "website" | "article" | "profile";

export interface RouteMeta {
  title: string;
  description: string;
  image?: string;
  type?: MetaType;
  canonical?: string;
}

// Legacy compatibility with previous SocialTags API
export interface LegacySocialTagsProps {
  title: string;
  description: string;
  imageUrl?: string;
  url?: string;
  type?: MetaType;
}


export interface MetaManagerProps {
  routeKey?: string; // when omitted or 'auto', uses location.pathname
  dynamicData?: Partial<RouteMeta> & {
    jsonLdExtra?: Record<string, unknown> | Record<string, unknown>[];
    robots?: string;
  };
}

const BASE_URL = "https://www.allergy-free-travel.com";

// Central route metadata registry
const routeMeta: Record<string, RouteMeta> = {
  "/": {
    title: "Allergy-Friendly Travel Guide | Safe Hotels & Tips for Food Allergies",
    description:
      "Find safe hotels and restaurants for food allergies. Expert travel guides for gluten-free, dairy-free, nut-free travelers. Book with confidence worldwide.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    type: "website",
    canonical: `${BASE_URL}/`,
  },
  "/contact": {
    title: "Contact Us | Allergy-Friendly Travel Support",
    description:
      "Get in touch with our team for personalized allergy-friendly travel advice and assistance. We're here to help with your dietary restriction travel needs.",
    image: DEFAULT_SOCIAL_IMAGE,
    type: "website",
  },
  "/reviews": {
    title: "Traveler Reviews | Allergy-Friendly Travel Guide",
    description:
      "Read authentic traveler reviews about allergy-friendly hotels worldwide. Share your own experience to help others find safe accommodations.",
    image: DEFAULT_SOCIAL_IMAGE,
    type: "website",
  },
  "/privacy": {
    title: "Privacy Policy | Allergy-Free Travel",
    description:
      "Our privacy policy outlines how we collect, use, and protect your personal information when using our service.",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/terms": {
    title: "Terms of Use | Allergy-Free Travel",
    description:
      "Terms and conditions for using Allergy-Free Travel and related services.",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/faq": {
    title: "FAQ | Allergy-Friendly Travel",
    description:
      "Answers to common questions about allergy-friendly hotels, dining, and travel planning.",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/categories": {
    title: "Categories | Allergy-Friendly Travel",
    description:
      "Explore tips, guides, and hotel reviews for allergy-friendly travel.",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/direct-chat": {
    title: "AI Travel Assistant | Allergy-Friendly Hotels",
    description:
      "Chat with our AI assistant for personalized allergy-friendly hotel recommendations.",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/about": {
    title: "About Us | Allergy-Free Travel",
    description: "Learn about our mission to make travel safe and accessible for travelers with food allergies.",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/sitemap": {
    title: "Sitemap | Allergy-Free Travel",
    description: "Explore all pages on Allergy-Free Travel.",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/allergy-translation-card": {
    title: "Allergy Translation Card Generator | Travel Safely",
    description:
      "Create multilingual allergy translation cards to communicate dietary needs while traveling.",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/menu-scanner": {
    title: "Menu Allergen Scanner | Allergy-Free Travel",
    description:
      "Scan restaurant menus to identify potential allergens. Upload a photo and get instant allergen detection powered by AI.",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/destinations": {
    title: "Allergy-Friendly Destinations | Safe Hotels & Dining",
    description: "Discover destinations with allergy-friendly hotels and restaurants.",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/destinations/hotel-chains": {
    title: "Top Allergy-Friendly Hotel Chains Worldwide (2025 Guide)",
    description:
      "Discover the top global hotel chains with allergy-friendly and celiac-safe food policies. Learn which hotels accommodate food allergies and offer certified allergy-safe services.",
    image: DEFAULT_SOCIAL_IMAGE,
  },
  "/search-results": {
    title: "Search Results | Allergy-Free Travel",
    description: "Personalized results for your allergy-friendly hotel search.",
    image: DEFAULT_SOCIAL_IMAGE,
  },
};

export const MetaManager: React.FC<MetaManagerProps> = ({ routeKey = "auto", dynamicData }) => {
  const location = useLocation();

  const path = location.pathname;
  const isDestination = path.startsWith("/destinations/");
  const destId = isDestination ? path.split("/")[2] : undefined;

const computed: RouteMeta = useMemo(() => {
  const key = routeKey === "auto" || !routeKey ? path : routeKey;
  // Prefer exact match, then fallback to base path (e.g., /destinations)
  const base = routeMeta[key] || routeMeta[key.split("/").slice(0, 2).join("/")] || routeMeta["/"];

  // Destination-specific overrides
  if (isDestination && destId) {
    const prettyName = destId
      .replace(/-/g, " ")
      .replace(/\b\w/g, (m) => m.toUpperCase());
    const destImage = DESTINATION_OG_IMAGES[destId as keyof typeof DESTINATION_OG_IMAGES] || DEFAULT_SOCIAL_IMAGE;
    return {
      title: `Allergy-Friendly Hotels in ${prettyName} | Safe Dining Guide`,
      description: `Discover the best allergy-friendly hotels in ${prettyName}. Expert reviews of accommodations catering to gluten-free, dairy-free, and other dietary needs.`,
      image: destImage,
      type: "website",
      canonical: `${BASE_URL}${path}`,
    };
  }

  // Dynamic search results page
  if (key.startsWith("/search-results")) {
    const params = new URLSearchParams(location.search);
    const dest = params.get("destination") || "your destination";
    const allergiesParam = params.get("allergies") || "allergies";
    const allergiesDisplay = allergiesParam.includes(',') ? allergiesParam.replace(/,/g, ', ') : allergiesParam;
    return {
      title: `Allergy-Friendly Hotels in ${dest} | Safe Dining for ${allergiesDisplay} Allergies`,
      description: `Discover the best allergy-friendly hotels in ${dest} for travelers with ${allergiesDisplay} allergies. Expert recommendations for safe accommodations.`,
      image: DEFAULT_SOCIAL_IMAGE,
      type: "article",
      canonical: `${BASE_URL}/search-results?destination=${encodeURIComponent(dest)}&allergies=${encodeURIComponent(allergiesParam)}`,
    };
  }

  return {
    ...base,
    ...(dynamicData || {}),
  } as RouteMeta;
}, [routeKey, dynamicData, path, isDestination, destId, location.search]);

  const absoluteImage = getAbsoluteImageUrl(computed.image || DEFAULT_SOCIAL_IMAGE);
  const canonicalUrl = buildCanonical(
    computed.canonical || `${BASE_URL}${path}`
  );

  const orgJson = organizationJsonLd({
    name: "Allergy-Free Travel",
    url: BASE_URL,
    logo: `${BASE_URL}/og-image.png`,
  });
  const breadcrumbsJson = breadcrumbJsonLd({ baseUrl: BASE_URL, pathname: path });
  const hotelJson = isDestination && destId ? hotelJsonLd({ baseUrl: BASE_URL, destId, image: absoluteImage }) : null;

  return (
    <Helmet>
      <title>{computed.title}</title>
      <meta name="description" content={computed.description} />
      <link rel="canonical" href={canonicalUrl} />
      {dynamicData?.robots && <meta name="robots" content={dynamicData.robots} />}

      {/* Open Graph */}
      <meta property="og:type" content={computed.type || "website"} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={computed.title} />
      <meta property="og:description" content={computed.description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:secure_url" content={absoluteImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Allergy-Free Travel" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={computed.title} />
      <meta name="twitter:description" content={computed.description} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* Direct image link for crawlers */}
      <link rel="image_src" href={absoluteImage} />

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(orgJson)}</script>
      {breadcrumbsJson && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbsJson)}</script>
      )}
      {hotelJson && (
        <script type="application/ld+json">{JSON.stringify(hotelJson)}</script>
      )}

      {/* Additional JSON-LD from pages if provided */}
      {dynamicData?.jsonLdExtra && Array.isArray(dynamicData.jsonLdExtra)
        ? dynamicData.jsonLdExtra.map((node, idx) => (
            <script key={idx} type="application/ld+json">{JSON.stringify(node)}</script>
          ))
        : dynamicData?.jsonLdExtra && (
            <script type="application/ld+json">{JSON.stringify(dynamicData.jsonLdExtra)}</script>
          )}
    </Helmet>
  );
};

export default MetaManager;
