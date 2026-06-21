import { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: {
    default: "Sunrise Travels | Flights, Hajj, Umrah & Travel Services",
    template: "%s | Sunrise Travels",
  },
  description: "Sunrise Travels is your trusted UK-based travel agency offering worldwide flights, Hajj & Umrah packages, and professional assistance for NADRA, Visa, and Passports.",
  openGraph: {
    title: "Sunrise Travels | Flights, Hajj, Umrah & Travel Services",
    description: "Sunrise Travels is your trusted UK-based travel agency offering worldwide flights, Hajj & Umrah packages, and professional assistance for NADRA, Visa, and Passports.",
    url: "https://sunrisetravels.org",
    siteName: "Sunrise Travels",
    images: [
      {
        url: "https://sunrisetravels.org/og-image.jpg", // Placeholder
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_GB",
    type: "website",
  },
};