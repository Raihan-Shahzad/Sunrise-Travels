import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import DestinationGrid from "@/components/DestinationGrid";
import WhyChooseUs from "@/components/WhyChooseUs";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import CTAFooter from "@/components/CTAFooter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeatureSection />
      <DestinationGrid />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <FAQSection />
      <CTAFooter />
    </>
  );
}
