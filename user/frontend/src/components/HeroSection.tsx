import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-illustration.jpg";

interface HeroSectionProps {
  onFindBartender: () => void;
}

const HeroSection = ({ onFindBartender }: HeroSectionProps) => {
  return (
    <section className="bg-gradient-to-br from-background to-cream py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Where Parties Meet{" "}
              <span className="text-warm-brown">Pourers</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Connect with professional bartenders for your next event. 
              From intimate gatherings to grand celebrations, we make every moment unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero-outline" 
                size="hero"
                onClick={onFindBartender}
                className="flex-1 sm:flex-none"
              >
                Find a Bartender
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src={heroImage} 
              alt="Professional bartender serving cocktails at an elegant party"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;