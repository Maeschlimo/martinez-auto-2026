export const siteConfig = {
  name: "Business Name",
  description: "Your business description here",
  url: "https://example.com",
  locale: {
    default: "en" as const,
    available: ["en", "es"] as const,
  },
  contact: {
    email: "info@example.com",
    phone: "+1 (555) 000-0000",
    address: {
      street: "123 Main Street",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "US",
    },
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    google_business: "",
  },
  business: {
    type: "LocalBusiness", // Schema.org type
    openingHours: "Mo-Fr 08:00-18:00",
    priceRange: "$$",
    areaServed: "Austin, TX metro area",
  },
};
