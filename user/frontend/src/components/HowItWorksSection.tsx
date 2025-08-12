import { Search, Calendar, Star } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      title: "Find Your Bartender",
      description: "Browse through our vetted professional bartenders and view their profiles, ratings, and specialties."
    },
    {
      icon: Calendar,
      title: "Book Your Event",
      description: "Select your preferred bartender, choose your date, and customize your service package."
    },
    {
      icon: Star,
      title: "Enjoy the Experience",
      description: "Sit back and enjoy perfectly crafted cocktails while your bartender takes care of everything."
    }
  ];

  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            How It Works?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Getting the perfect bartender for your event is simple and straightforward
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="mx-auto w-16 h-16 bg-warm-brown rounded-full flex items-center justify-center mb-6">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;