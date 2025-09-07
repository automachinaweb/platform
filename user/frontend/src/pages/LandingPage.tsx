
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import ReviewsSection from "@/components/ReviewsSection"; 
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";

interface LandingPageProps {
  onLogin: () => void;
}

const LandingPage = ({ onLogin }: LandingPageProps) => {
  const navigate = useNavigate();
  
  const handleFindBartender = () => {
    navigate('/booking');
  };


  return (
    <div className="min-h-screen bg-background">
      
      <HeroSection 
        onFindBartender={handleFindBartender}
      />
      <StatsSection />
      <HowItWorksSection />
      <WhyChooseUsSection />
      <div id="reviews">
        <ReviewsSection />
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
