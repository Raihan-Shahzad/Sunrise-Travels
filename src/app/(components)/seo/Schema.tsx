export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Sunrise Travels",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    telephone: process.env.NEXT_PUBLIC_PHONE,
    email: "info@sunrisetravels.co.uk",
    address: {
      "@type": "PostalAddress",
      streetAddress: "211A Dunstable Road",
      addressLocality: "Luton",
      addressRegion: "Bedfordshire",
      postalCode: "LU1 1DD",
      addressCountry: "GB",
    },
    sameAs: [
      "https://www.facebook.com/SunriseTravels",
      "https://www.instagram.com/SunriseTravels",
    ],
  };
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}