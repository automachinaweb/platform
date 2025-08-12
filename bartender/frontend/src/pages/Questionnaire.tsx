import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const Questionnaire = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    experience: "",
    specialties: [] as string[],
    hourlyRate: "",
    bio: "",
    location: "",
    availability: [] as string[],
    certifications: "",
    portfolio: ""
  });

  const specialtyOptions = [
    "Classic Cocktails",
    "Craft Cocktails",
    "Wine Service",
    "Beer Expert",
    "Molecular Mixology",
    "Tiki Cocktails",
    "Corporate Events",
    "Wedding Receptions"
  ];

  const availabilityOptions = [
    "Weekday Evenings",
    "Weekend Days",
    "Weekend Evenings",
    "Corporate Events",
    "Private Parties",
    "Holiday Events"
  ];

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        specialties: prev.specialties.filter(s => s !== specialty)
      }));
    }
  };

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        availability: [...prev.availability, availability]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        availability: prev.availability.filter(a => a !== availability)
      }));
    }
  };

  const handleSubmit = () => {
    localStorage.setItem('bartender-profile', JSON.stringify(formData));
    localStorage.setItem('bartender-logged-in', 'true');
    toast({
      title: "Waiting for admin approval",
      description: "Your profile has been submitted and is under review.",
      className: "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
    });
    navigate('/dashboard');
  };

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">Complete Your Profile</CardTitle>
            <CardDescription>Step {currentStep} of 3 - Help us showcase your bartending expertise</CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Experience & Expertise</h3>
                
                <div>
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({...prev, experience: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-2">1-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="6-10">6-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Specialties (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {specialtyOptions.map((specialty) => (
                      <div key={specialty} className="flex items-center space-x-2">
                        <Checkbox
                          id={specialty}
                          checked={formData.specialties.includes(specialty)}
                          onCheckedChange={(checked) => handleSpecialtyChange(specialty, !!checked)}
                        />
                        <Label htmlFor={specialty} className="text-sm">{specialty}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="certifications">Certifications & Training</Label>
                  <Textarea
                    id="certifications"
                    placeholder="List any bartending certifications, courses, or special training..."
                    value={formData.certifications}
                    onChange={(e) => setFormData(prev => ({...prev, certifications: e.target.value}))}
                  />
                </div>

                <Button onClick={nextStep} className="w-full" disabled={!formData.experience || formData.specialties.length === 0}>
                  Continue
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Rates & Availability</h3>
                
                <div>
                  <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                  <Input
                    id="hourlyRate"
                    type="number"
                    placeholder="e.g., 50"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData(prev => ({...prev, hourlyRate: e.target.value}))}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Service Location</Label>
                  <Input
                    id="location"
                    placeholder="e.g., New York, NY or willing to travel within 50 miles"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({...prev, location: e.target.value}))}
                  />
                </div>

                <div>
                  <Label>Availability (Select all that apply)</Label>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    {availabilityOptions.map((availability) => (
                      <div key={availability} className="flex items-center space-x-2">
                        <Checkbox
                          id={availability}
                          checked={formData.availability.includes(availability)}
                          onCheckedChange={(checked) => handleAvailabilityChange(availability, !!checked)}
                        />
                        <Label htmlFor={availability} className="text-sm">{availability}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={prevStep} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={nextStep} className="flex-1" disabled={!formData.hourlyRate || !formData.location}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Tell Your Story</h3>
                
                <div>
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell potential clients about your passion for bartending, your style, and what makes you unique..."
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({...prev, bio: e.target.value}))}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="portfolio">Portfolio/Website (Optional)</Label>
                  <Input
                    id="portfolio"
                    placeholder="Link to your portfolio, Instagram, or professional website"
                    value={formData.portfolio}
                    onChange={(e) => setFormData(prev => ({...prev, portfolio: e.target.value}))}
                  />
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={prevStep} className="flex-1">
                    Back
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1" disabled={!formData.bio}>
                    Complete Profile
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Questionnaire;