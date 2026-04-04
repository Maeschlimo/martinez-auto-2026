export const siteConfig = {
  name: "Martinez Auto Repair",
  description: "Family-owned auto repair in East Austin since 2008. ASE-certified mechanics, bilingual service (EN/ES), same-day repairs.",
  url: "https://martinez-auto-2026.vercel.app",
  locale: {
    default: "en" as const,
    available: ["en", "es"] as const,
  },
  contact: {
    email: "info@martinezautorepair.com",
    phone: "(512) 555-0100",
    phoneHref: "tel:+15125550100",
    address: {
      street: "East 7th Street",
      city: "Austin",
      state: "TX",
      zip: "78702",
      country: "US",
    },
  },
  social: {
    facebook: "https://facebook.com/martinezautoatx",
    instagram: "",
    linkedin: "",
    google_business: "",
  },
  business: {
    type: "AutoRepair",
    openingHours: "Mo-Fr 07:30-18:00 Sa 08:00-16:00",
    priceRange: "$$",
    areaServed: "East Austin, TX — 78702, 78721, 78722, 78741, 78723, 78724",
  },
};
