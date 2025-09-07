import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Clock, Award, MessageCircle, User } from "lucide-react";
import bartendersData from "@/data/bartenders.json";

const BartenderSuggestions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;

  const handleViewProfile = (bartenderId: string) => {
    navigate(`/bartender/${bartenderId}`, { state: { bookingData } });
  };

  const handleStartChat = (bartenderId: string) => {
    navigate(`/chat/${bartenderId}`, { state: { bookingData } });
  };

  return (
    <div className="min-h-screen bg-background">
      
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Perfect Matches for Your Event</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Based on your preferences, here are our top recommended bartenders
            </p>
            
            {bookingData && (
              <div className="inline-flex items-center space-x-4 bg-muted/50 rounded-full px-6 py-3 mb-8">
                <Badge variant="outline">{bookingData.eventType}</Badge>
                <Badge variant="outline">{bookingData.duration}</Badge>
                <Badge variant="outline">{bookingData.guestCount}</Badge>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {bartendersData.map((bartender) => (
              <Card key={bartender.id} className="shadow-card hover:shadow-elegant transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="relative">
                    <img
                      src={bartender.avatar}
                      alt={bartender.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-primary/10"
                    />
                    {bartender.verified && (
                      <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-2">
                        <Badge className="bg-accent text-accent-foreground">
                          <Award className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <h3 className="font-bold text-lg mb-1">{bartender.name}</h3>
                    <div className="flex items-center justify-center space-x-1 mb-2">
                      <Star className="w-4 h-4 text-accent fill-current" />
                      <span className="font-semibold">{bartender.rating}</span>
                      <span className="text-sm text-muted-foreground">({bartender.reviews})</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{bartender.experience} experience</p>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2" />
                      {bartender.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-2" />
                      Available: {bartender.availability.join(", ")}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {bartender.specialties.slice(0, 2).map((specialty, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                      {bartender.specialties.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{bartender.specialties.length - 2} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <span className="text-2xl font-bold text-primary">{bartender.price}</span>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="hero"
                      size="sm"
                      className="w-full"
                      onClick={() => handleViewProfile(bartender.id)}
                    >
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => handleStartChat(bartender.id)}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Start Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/booking")}
            >
              Refine Search Criteria
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BartenderSuggestions;