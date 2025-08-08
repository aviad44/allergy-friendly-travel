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
