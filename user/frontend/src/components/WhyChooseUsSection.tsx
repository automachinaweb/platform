import { Shield, Clock, Award, HeartHandshake } from "lucide-react";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: Shield,
      title: "Vetted Professionals",
      description: "All our bartenders are thoroughly screened, certified, and experienced professionals."
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Round-the-clock customer support to ensure your event goes smoothly."
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "High-quality service with premium cocktail ingredients and professional equipment."
    },
    {
      icon: HeartHandshake,
      title: "Satisfaction Guaranteed",
      description: "We guarantee your satisfaction or provide a full refund - no questions asked."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're committed to making your event memorable with exceptional service and attention to detail
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="mx-auto w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-6 group-hover:bg-warm-brown transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-warm-brown group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;