import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Star, Award, Briefcase, CheckCircle } from "lucide-react";
import { useState } from "react";

const Dashboard = () => {
  const bartenderName = localStorage.getItem('bartender-username') || 'John Doe';
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const bartenderDetails = {
    name: bartenderName,
    email: localStorage.getItem('bartender-email') || 'john.doe@example.com',
    location: 'New York, NY',
    experience: '5+ years',
    rating: '4.9',
    specialties: ['Classic Cocktails', 'Wine Service', 'Corporate Events']
  };

  const certifications = [
    'Certified Sommelier',
    'Advanced Mixology Certificate', 
    'Food Safety Certification',
    'Event Management Training'
  ];

  const recentFunctions = [
    { title: 'Corporate Event - Tech Company', date: '2024-01-15', earnings: '$450' },
    { title: 'Wedding Reception - Brooklyn', date: '2024-01-12', earnings: '$650' },
    { title: 'Private Party - Manhattan', date: '2024-01-08', earnings: '$380' },
    { title: 'Birthday Celebration', date: '2024-01-05', earnings: '$300' },
    { title: 'Anniversary Dinner', date: '2024-01-02', earnings: '$250' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-6">
      <div className="container mx-auto space-y-8">
        {/* Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Profile Image */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-32 h-32 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg" alt={bartenderName} />
                  <AvatarFallback className="text-2xl">{bartenderName.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold mb-2">{bartenderDetails.name}</h2>
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium">{bartenderDetails.rating}</span>
                </div>
                <Badge variant="secondary">{bartenderDetails.experience}</Badge>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Basic Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Bartender Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                    <p className="text-sm">{bartenderDetails.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                    <p className="text-sm">{bartenderDetails.location}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Experience</Label>
                    <p className="text-sm">{bartenderDetails.experience}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">Rating</Label>
                    <p className="text-sm">{bartenderDetails.rating}/5.0</p>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Specialties</Label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {bartenderDetails.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline">{specialty}</Badge>
                    ))}
                  </div>
                </div>
                
                {/* Available Dates */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-sm font-medium text-muted-foreground">Available Dates</Label>
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
                      : 'Click calendar to select available dates'
                    }
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
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{cert}</span>
                  </div>
                ))}
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
                {recentFunctions.map((func, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="text-sm font-medium">{func.title}</p>
                      <p className="text-xs text-muted-foreground">{func.date}</p>
                    </div>
                    <Badge variant="secondary">{func.earnings}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;