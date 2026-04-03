interface StructuredDataProps {
  data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Helper: LocalBusiness schema
export function localBusinessSchema(config: {
  name: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  address: { street: string; city: string; state: string; zip: string; country: string };
  openingHours?: string;
  priceRange?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.name,
    description: config.description,
    url: config.url,
    telephone: config.phone,
    email: config.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: config.address.street,
      addressLocality: config.address.city,
      addressRegion: config.address.state,
      postalCode: config.address.zip,
      addressCountry: config.address.country,
    },
    ...(config.openingHours && { openingHours: config.openingHours }),
    ...(config.priceRange && { priceRange: config.priceRange }),
    ...(config.image && { image: config.image }),
  };
}
