type OrganizationInput = {
  name: string;
  url: string;
  logo?: string;
};

export function organizationJsonLd({ name, url, logo }: OrganizationInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    ...(logo ? { logo } : {}),
  };
}

type BreadcrumbInput = {
  baseUrl: string;
  pathname: string;
};

export function breadcrumbJsonLd({ baseUrl, pathname }: BreadcrumbInput) {
  const segments = pathname.split('/').filter(Boolean);
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${baseUrl}/`,
    },
  ];

  let currentPath = '';
  segments.forEach((seg, idx) => {
    currentPath += `/${seg}`;
    const name = seg
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (m) => m.toUpperCase());
    items.push({
      '@type': 'ListItem',
      position: idx + 2,
      name,
      item: `${baseUrl}${currentPath}`,
    });
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

type HotelInput = {
  baseUrl: string;
  destId: string;
  image?: string;
};

export function hotelJsonLd({ baseUrl, destId, image }: HotelInput) {
  const name = destId
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase());
  const url = `${baseUrl}/destinations/${destId}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: `Allergy-Friendly Hotels in ${name}`,
    url,
    ...(image ? { image } : {}),
    amenityFeature: [
      {
        '@type': 'LocationFeatureSpecification',
        name: 'Allergy-friendly options',
        value: true,
      },
    ],
  };
}

type HotelWithReviews = {
  name: string;
  rating?: number;
  quote?: string;
  reviews?: { author?: string; author_name?: string; rating?: number; text?: string; comment?: string }[];
};

// Per-hotel LodgingBusiness + Review/AggregateRating schema, built only from
// review data this site already shows on the page — no invented ratings or
// reviews. Lets search engines and AI answer engines surface the real guest
// feedback directly rather than only the surrounding page text.
export function destinationHotelsJsonLd(hotels: HotelWithReviews[]) {
  return hotels
    .map((hotel) => {
      const reviews = (hotel.reviews && hotel.reviews.length > 0)
        ? hotel.reviews
        : hotel.quote
          ? [{ text: hotel.quote, rating: hotel.rating }]
          : [];
      if (reviews.length === 0 && !hotel.rating) return null;

      return {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name: hotel.name,
        ...(hotel.rating ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: hotel.rating,
            reviewCount: Math.max(reviews.length, 1),
          },
        } : {}),
        ...(reviews.length > 0 ? {
          review: reviews.map((r) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: r.author || r.author_name || 'Verified guest' },
            reviewRating: { '@type': 'Rating', ratingValue: r.rating || hotel.rating || 5 },
            reviewBody: r.text || r.comment || '',
          })),
        } : {}),
      };
    })
    .filter((node): node is NonNullable<typeof node> => node !== null);
}
