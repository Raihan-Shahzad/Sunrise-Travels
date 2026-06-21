import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

import Header from "./(components)/layout/Header";
import Footer from "./(components)/layout/Footer";
import { StickyCTA } from "./(components)/layout/StickyCTA";
import { WhatsAppFloat } from "./(components)/layout/WhatsAppFloat";
import LocalBusinessSchema from "./(components)/seo/Schema";
import { defaultMetadata } from "./(components)/seo/Meta";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-body bg-background text-foreground min-h-screen flex flex-col`}>
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <StickyCTA />
        <WhatsAppFloat />
        <LocalBusinessSchema />
      </body>
    </html>
  );
}