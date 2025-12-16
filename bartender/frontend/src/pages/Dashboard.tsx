import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Calendar as CalendarIcon,
  Star,
  Award,
  Briefcase,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BookingRequests from "@/components/BookingRequests";

const Dashboard = () => {
  const bartenderName =
    localStorage.getItem("bartender-username") || "John Doe";
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const [profile, setProfile] = useState<any>(null);
  const navigate = useNavigate();

  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    // Fetch History
    const fetchHistory = async () => {
      const token = localStorage.getItem("bartender-auth-token");
      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:3001/bartender/bookings/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setHistory(data);
        }
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };

    // Fetch Profile
    const fetchProfile = async () => {
      const token = localStorage.getItem("bartender-auth-token");
      if (!token) return;

      try {
        const response = await fetch(
          "http://localhost:3001/bartender/questionnaire",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data) setProfile(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchHistory();
    fetchProfile();
  }, []);

  // Check if profile is loaded, otherwise use fallback/loading or keep defaults.
  // We'll merge fetched profile with defaults for safety if fields are missing.
  const displayProfile = {
    name: profile?.fullName || bartenderName,
    email:
      profile?.email ||
      localStorage.getItem("bartender-email") ||
      "john.doe@example.com",
    location: profile?.currentAddress || "New York, NY",
    experience: profile?.experienceYears
      ? `${profile.experienceYears} years`
      : "5+ years",
    rating: "4.9", // Rating is not in questionnaire, keep hardcoded or fetch from review service if exists
    specialties: profile?.courseSpecializations
      ? profile.courseSpecializations.split(",")
      : ["Classic Cocktails", "Wine Service", "Corporate Events"],
    certifications: profile?.bartendingCourseCompleted
      ? ["Certified Bartender"]
      : [
          "Certified Sommelier",
          "Advanced Mixology Certificate",
          "Food Safety Certification",
          "Event Management Training",
        ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="container mx-auto space-y-8">
        {/* Booking Requests Section */}
        <BookingRequests />

        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Profile Image */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage
                    src="/placeholder.svg"
                    alt={displayProfile.name}
                  />
                  <AvatarFallback className="text-2xl">
                    {displayProfile.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mb-2">
                  {displayProfile.name}
                </h2>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">
                    {displayProfile.rating}
                  </span>
                </div>
                <Badge variant="secondary">{displayProfile.experience}</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Basic Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Bartender Details</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/questionnaire")}
                >
                  Edit Profile
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Email
                    </Label>
                    <p className="text-sm">{displayProfile.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Location
                    </Label>
                    <p className="text-sm">{displayProfile.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Experience
                    </Label>
                    <p className="text-sm">{displayProfile.experience}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Rating
                    </Label>
                    <p className="text-sm">{displayProfile.rating}/5.0</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Specialties
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {displayProfile.specialties.map(
                      (specialty: string, index: number) => (
                        <Badge key={index} variant="outline">
                          {specialty.trim()}
                        </Badge>
                      )
                    )}
                  </div>
                </div>

                {/* Available Dates */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm font-medium text-muted-foreground">
                      Available Dates
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" size="sm">
                          <CalendarIcon className="h-4 w-4" />
                          Calendar
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="multiple"
                          selected={selectedDates}
                          onSelect={(dates) => setSelectedDates(dates || [])}
                          className="rounded-md border pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedDates.length > 0
                      ? `${selectedDates.length} dates selected`
                      : "Click calendar to select available dates"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Certifications & Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Certifications & Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {displayProfile.certifications.map(
                  (cert: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                    >
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  )
                )}
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Recent Functions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Recent Functions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {history.length > 0 ? (
                  history.map((func, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          {func.eventType} - {func.location}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {func.eventDate}
                        </p>
                      </div>
                      <Badge
                        variant={
                          func.status === "COMPLETED"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {func.status === "COMPLETED"
                          ? `$${func.offeredAmount}`
                          : func.status}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    No recent history found.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
