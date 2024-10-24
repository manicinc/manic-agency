export const metadata = {
  title: "Velvet Web - AI-Powered Crypto Community",
  description: "Join the ultimate hub for crypto founders, creators, and developers. Get AI-powered insights, project management, and code analysis.",
};

import VelvetHero from "@/components/VelvetHero";
import VelvetFeatures from "@/components/VelvetFeatures";
import VelvetPricing from "@/components/VelvetPricing";
import DefaultLayout from "@/app/velvet/layout";

export default function Home() {
  return (
    <DefaultLayout>
      <VelvetHero />
      <VelvetFeatures />
      <VelvetPricing />
    </DefaultLayout>
  );
}
  
