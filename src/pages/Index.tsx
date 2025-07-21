import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import VisualFeaturesSection from "@/components/VisualFeaturesSection";
import PackagesSection from "@/components/PackagesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <VisualFeaturesSection />
        <PackagesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
