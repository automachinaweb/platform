import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  MapPin,
  Clock,
  Award,
  MessageCircle,
  Calendar,
  Users,
  Wine,
  Loader2,
} from "lucide-react";
// import bartendersData from "@/data/bartenders.json"; // Removed local data
import reviewsData from "@/data/reviews.json";

interface Bartender {
  id: string | number;
  name: string;
  avatar: string;
  rating: number;
  reviews: number;
  verified: boolean;
  experience: string;
  location: string;
  availability: string[];
  specialties: string[];
  price: string;
  bio?: string;
  about?: string;
  languages?: string[];
}

const BartenderProfile = () => {
  const { bartenderId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData;

  const [bartender, setBartender] = useState<Bartender | null>(null);
  const [loading, setLoading] = useState(true);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const fetchBartender = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/user/bartenders/${bartenderId}`
        );
        if (response.ok) {
          const data = await response.json();
          // Map backend 'about' to 'bio' if needed for frontend consistency
          if (data.about && !data.bio) data.bio = data.about;
          setBartender(data);
        } else {
          console.error("Failed to fetch bartender details");
        }
      } catch (error) {
        console.error("Error fetching bartender details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (bartenderId) {
      fetchBartender();
    }
  }, [bartenderId]);

  const bartenderReviews = reviewsData.filter(
    (r) => r.bartenderName === bartender?.name
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!bartender) {
    return <div>Bartender not found</div>;
  }

  const handleStartChat = () => {
    navigate(`/chat/${bartender.id}`, { state: { bookingData } });
  };

  const handleBookNow = async () => {
    if (!bookingData || !bookingData.id) {
      alert("No active booking found. Please create an event first.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/user/bookings/request",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Authenticated request
          },
          body: JSON.stringify({
            bookingId: bookingData.id,
            bartenderId: bartender.id,
            offeredAmount: 150, // TODO: Allow user to input offer
          }),
        }
      );

      if (response.ok) {
        setRequestSent(true);
      } else {
        const err = await response.json();
        alert(`Failed to send request: ${err.message}`);
      }
    } catch (error) {
      console.error("Booking request error", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (requestSent) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="bg-green-100 text-green-600 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
            <Calendar className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold">Request Sent!</h2>
          <p className="text-muted-foreground">
            Your booking request has been sent to {bartender.name}. They will
            review your event details and respond shortly.
          </p>
          <Button onClick={() => navigate("/")} className="w-full">
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
            ← Back to Results
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Profile */}
            <div className="lg:col-span-2">
              <Card className="shadow-elegant">
                <CardHeader>
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="relative">
                      <img
                        src={bartender.avatar}
                        alt={bartender.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary/10"
                      />
                      {bartender.verified && (
                        <div className="absolute -top-2 -right-2">
                          <Badge className="bg-accent text-accent-foreground">
                            <Award className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h1 className="text-3xl font-bold mb-2">
                        {bartender.name}
                      </h1>
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-5 h-5 text-accent fill-current" />
                          <span className="font-semibold text-lg">
                            {bartender.rating}
                          </span>
                          <span className="text-muted-foreground">
                            ({bartender.reviews} reviews)
                          </span>
                        </div>
                        <div className="text-muted-foreground">•</div>
                        <div className="text-muted-foreground">
                          {bartender.experience} experience
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="w-4 h-4 mr-2" />
                          {bartender.location}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="w-4 h-4 mr-2" />
                          Available: {bartender.availability.join(", ")}
                        </div>
                      </div>

                      <div className="text-3xl font-bold text-primary">
                        {bartender.price}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="space-y-6">
                    {/* Bio */}
                    <div>
                      <h3 className="text-lg font-semibold mb-2">About</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {bartender.bio}
                      </p>
                    </div>

                    {/* Specialties */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        Specialties
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {bartender.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="px-3 py-1"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <Button
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        onClick={handleBookNow}
                      >
                        <Calendar className="w-5 h-5 mr-2" />
                        Book Now
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="flex-1"
                        onClick={handleStartChat}
                      >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Start Chat
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card className="shadow-card mt-8">
                <CardHeader>
                  <CardTitle>Customer Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {bartenderReviews.slice(0, 3).map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-border pb-6 last:border-b-0"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-accent fill-current"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-2">
                          "{review.comment}"
                        </p>
                        <div className="text-sm">
                          <span className="font-semibold">
                            {review.customerName}
                          </span>
                          <span className="text-muted-foreground">
                            {" "}
                            • {review.event}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {bookingData && (
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Your Event Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{bookingData.eventType}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{bookingData.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">
                          {bookingData.guestCount}
                        </span>
                      </div>
                      {bookingData.drinkPreferences.length > 0 && (
                        <div className="pt-2">
                          <p className="text-sm font-medium mb-2">
                            Drink Preferences:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {bookingData.drinkPreferences.map(
                              (pref: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {pref}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Response Time
                      </span>
                      <span className="font-semibold">Within 1 hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Booking Rate
                      </span>
                      <span className="font-semibold">95%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Repeat Clients
                      </span>
                      <span className="font-semibold">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BartenderProfile;
