import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { MessageCircle, DollarSign, Clock, Star } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  // Dialog states removed as they are handled in Layout.tsx

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-6 text-foreground">
            Connect with Clients.
            <br />
            <span className="text-primary">Grow Your Business.</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join PourConnect's network of professional bartenders. Get booked
            for exclusive events, build lasting client relationships, and take
            your bartending career to the next level.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() => navigate("/questionnaire")}
            >
              Start Your Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">
          Why Bartenders Choose PourConnect
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-semibold mb-2">Direct Client Chat</h4>
              <p className="text-muted-foreground">
                Communicate directly with clients, discuss requirements, and
                build relationships.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-semibold mb-2">Premium Rates</h4>
              <p className="text-muted-foreground">
                Set your own rates and earn what you're worth for high-quality
                service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-semibold mb-2">Flexible Schedule</h4>
              <p className="text-muted-foreground">
                Work when you want, where you want. Full control over your
                availability.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h4 className="text-xl font-semibold mb-2">
                Build Your Reputation
              </h4>
              <p className="text-muted-foreground">
                Collect reviews, showcase your skills, and become a top-rated
                bartender.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Pour Your Success?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professional bartenders who trust PourConnect to
            grow their business.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/questionnaire")}
            className="text-lg px-8 py-6"
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>
            &copy; 2024 PourConnect Pro. Connecting exceptional bartenders with
            exclusive events.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
