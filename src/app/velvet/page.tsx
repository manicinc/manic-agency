export const metadata = {
    title: "Home - Simple",
    description: "Page description",
  };
  
  import Hero from "@/components/Hero";
  import BusinessCategories from "@/components/BusinessCategories";
  import FeaturesPlanet from "@/components/FeaturesPlanet";
  import LargeTestimonial from "@/components/LargeTestimonial";
  import Cta from "@/components/Cta";
  
  export default function Home() {
    return (
      <>
        <Hero />
        <BusinessCategories />
        <FeaturesPlanet />
        <LargeTestimonial />
        <Cta />
      </>
    );
  }
  