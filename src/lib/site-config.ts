import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";

export const fontPoppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const fontInter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const siteConfig = {
  name: "Sunrise Travels",
  description:
    "Trusted UK-based travel agency for worldwide flights, Hajj & Umrah packages, and expert travel guidance.",
  url: "https://sunrisetravels.org",
  email: "info@sunrisetravels.co.uk",
  phone: "01582 732007",
  address: {
    street: "211A Dunstable Road",
    city: "Luton",
    county: "Bedfordshire",
    postcode: "LU1 1DD",
    country: "United Kingdom",
  },
  social: {
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    tiktok: "",
    youtube: "",
  },
  businessHours: {
    monday: "09:00 - 17:00",
    tuesday: "09:00 - 17:00",
    wednesday: "09:00 - 17:00",
    thursday: "09:00 - 17:00",
    friday: "09:00 - 17:00",
    saturday: "09:00 - 13:00",
    sunday: "Closed",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Flights", href: "/flights" },
    { label: "Hajj & Umrah", href: "/hajj-umrah" },
    { label: "NADRA Assistance", href: "/nadra-assistance" },
    { label: "Pakistani Visa Assistance", href: "/pakistani-visa-assistance" },
    { label: "Passport Assistance", href: "/passport-assistance" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  services: [
    {
      title: "Worldwide Flights",
      description: "Expert flight booking assistance worldwide",
      href: "/flights",
    },
    {
      title: "Hajj Packages",
      description: "Complete Hajj pilgrimage packages with expert guidance",
      href: "/hajj-umrah",
    },
    {
      title: "Umrah Packages",
      description: "Comfortable Umrah packages with all-inclusive services",
      href: "/hajj-umrah",
    },
    {
      title: "NADRA Guidance",
      description: "Document preparation and application assistance",
      href: "/nadra-assistance",
    },
    {
      title: "Visa Assistance",
      description: "Expert Pakistani visa guidance and support",
      href: "/pakistani-visa-assistance",
    },
    {
      title: "Passport Assistance",
      description: "Passport renewal and new application support",
      href: "/passport-assistance",
    },
  ],
  popularDestinations: [
    {
      name: "Pakistan",
      image: "https://images.unsplash.com/photo-1524479004040-4f5e5e5e5e5e?auto=format&fit=crop&w=800&q=80",
      startingPrice: "£299",
      href: "/flights",
    },
    {
      name: "Saudi Arabia",
      image: "https://images.unsplash.com/photo-1590991403573-7d7a3e5e5e5e?auto=format&fit=crop&w=800&q=80",
      startingPrice: "£899",
      href: "/hajj-umrah",
    },
    {
      name: "Dubai",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f888b3?auto=format&fit=crop&w=800&q=80",
      startingPrice: "£199",
      href: "/flights",
    },
    {
      name: "Turkey",
      image: "https://images.unsplash.com/photo-1524479004040-4f5e5e5e5e5e?auto=format&fit=crop&w=800&q=80",
      startingPrice: "£249",
      href: "/flights",
    },
    {
      name: "Malaysia",
      image: "https://images.unsplash.com/photo-1590991403573-7d7a3e5e5e5e?auto=format&fit=crop&w=800&q=80",
      startingPrice: "£399",
      href: "/flights",
    },
    {
      name: "Thailand",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f888b3?auto=format&fit=crop&w=800&q=80",
      startingPrice: "£299",
      href: "/flights",
    },
    {
      name: "USA",
      image: "https://images.unsplash.com/photo-1524479004040-4f5e5e5e5e5e?auto=format&fit=crop&w=800&q=80",
      startingPrice: "£599",
      href: "/flights",
    },
    {
      name: "Canada",
      image: "https://images.unsplash.com/photo-1590991403573-7d7a3e5e5e5e?auto=format&fit=crop&w=800&q=80",
      startingPrice: "£699",
      href: "/flights",
    },
  ],
  stats: {
    yearsOfExperience: 15,
    happyCustomers: 12500,
    flightsBooked: 8500,
    pilgrimsAssisted: 3500,
  },
  reviews: [
    {
      name: "Sarah Ahmed",
      location: "London",
      rating: 5,
      text: "Sunrise Travels made our Umrah journey absolutely perfect. Their expert guidance and attention to detail were outstanding.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Mohammed Khan",
      location: "Birmingham",
      rating: 5,
      text: "Booked our flights to Pakistan through Sunrise Travels. Professional service and great prices. Highly recommended!",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    {
      name: "Fatima Ali",
      location: "Luton",
      rating: 5,
      text: "The Hajj package was excellent. Everything was organized perfectly, from flights to accommodation. Thank you!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad4b1c?w=150&h=150&fit=crop&crop=face",
    },
  ],
  features: [
    {
      title: "Trusted Experts",
      description:
        "15+ years of experience serving the UK Pakistani and Muslim community.",
      icon: "Award",
    },
    {
      title: "Personal Service",
      description:
        "Dedicated support team with personalized attention to your needs.",
      icon: "Heart",
    },
    {
      title: "Competitive Prices",
      description:
        "Best rates guaranteed with no hidden fees or extra charges.",
      icon: "Tag",
    },
    {
      title: "UK-Based Support",
      description:
        "Local office in Luton with 24/7 customer support available.",
      icon: "Headphones",
    },
    {
      title: "Fast Response",
      description:
        "Quick turnaround times for all your travel and documentation needs.",
      icon: "Clock",
    },
    {
      title: "Community Reputation",
      title: "Community Reputation",
      description:
        "Trusted by thousands of families and pilgrims across the UK.",
      icon: "Users",
    },
  ],
  popularRoutes: [
    { from: "London", to: "Islamabad", price: "£299" },
    { from: "London", to: "Lahore", price: "£299" },
    { from: "London", to: "Karachi", price: "£299" },
    { from: "London", to: "Jeddah", price: "£899" },
    { from: "London", to: "Dubai", price: "£199" },
    { from: "London", to: "Toronto", price: "£599" },
    { from: "London", to: "New York", price: "£599" },
    { from: "Birmingham", to: "Islamabad", price: "£299" },
    { from: "Manchester", to: "Islamabad", price: "£299" },
  ],
  faq: [
    {
      question: "How do I apply for an Umrah visa from the UK?",
      answer:
        "We provide complete visa assistance including document preparation, form submission, and guidance throughout the process. Our experts will help you gather all required documents and ensure your application is complete.",
    },
    {
      question: "What documents do I need for Pakistani visa?",
      answer:
        "Required documents typically include: valid passport, recent photographs, completed visa application form, proof of funds, travel itinerary, and accommodation details. We provide a detailed checklist for your specific case.",
    },
    {
      question: "How much does Umrah cost from the UK?",
      answer:
        "Umrah costs vary based on package type (Economy, Standard, Premium, VIP) and duration. Prices typically range from £850 to £2,000 including flights, accommodation, and visa. Contact us for personalized pricing.",
    },
    {
      question: "Do you provide airport pickup services?",
      answer:
        "Yes, we provide airport pickup and drop-off services in Saudi Arabia at no additional cost for our pilgrimage packages.",
    },
    {
      question: "What is the best time to perform Umrah?",
      answer:
        "The best time is during winter months (November to March) when weather is pleasant. However, Umrah can be performed any time of the year.",
    },
    {
      question: "How do I book a pilgrimage package?",
      answer:
        "You can book online through our website, call us at 01582 732007, or visit our office in Luton. We'll guide you through the entire process and help you choose the best package for your needs.",
    },
  ],
};

export const generateMetadata = (
  title?: string,
  description?: string,
  path?: string,
  image?: string
): Metadata => {
  const metaTitle = title ? `${title} | Sunrise Travels` : "Sunrise Travels";
  const metaDescription = description || siteConfig.description;
  const metaUrl = path ? `${siteConfig.url}${path}` : siteConfig.url;
  const metaImage = image || `${siteConfig.url}/og-image.jpg`;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords:
      "travel agency, flights to Pakistan, Hajj packages, Umrah packages, NADRA assistance, Pakistani visa, passport renewal, UK travel agency",
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: metaUrl,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      site: "@sunrisetravels",
      creator: "@sunrisetravels",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "verification_code",
      yandex: "verification_code",
      yahoo: "verification_code",
    },
  };
};
