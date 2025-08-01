import AuthHeader from "@/components/AuthHeader";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import ServicesSection from "@/components/ServicesSection";
import VisualFeaturesSection from "@/components/VisualFeaturesSection";
import PackagesSection from "@/components/PackagesSection";
import Footer from "@/components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <AuthHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <VisualFeaturesSection />
        <PackagesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;