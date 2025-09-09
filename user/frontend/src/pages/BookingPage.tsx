import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface BookingPageProps {
  onBack: () => void;
}

const BookingPage = ({ onBack }: BookingPageProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showBlockingAlert, setShowBlockingAlert] = useState(false);
  const [formData, setFormData] = useState({
   name: "",
    email: "",
    phone: "",
    eventType: "",
    duration: "",
    guestCount: "",
    drinkPreferences: [] as string[],
    serviceAddons: [] as string[],
    setupRequirements: [] as string[],
    ambiancePreferences: [] as string[],
    musicChoices: [] as string[],
    dressCode: [] as string[]
  });
const navigate = useNavigate();

const dropdownOptions = {
    eventType: ["Birthday Party", "Wedding Reception", "Corporate Event", "Private Celebration"],
    duration: ["2-3 hours", "4-5 hours", "6-7 hours", "8+ hours"],
    guestCount: ["10-25 guests", "26-50 guests", "51-100 guests", "100+ guests"]
  };

  const checkboxOptions = {
    drinkPreferences: ["Premium Cocktails", "Wine Selection", "Beer & Spirits", "Non-Alcoholic Options"],
    serviceAddons: ["Signature Cocktail Creation", "Drink Menu Consultation", "Garnish & Decoration", "Glass Rental"],
    setupRequirements: ["Full Bar Setup", "Mobile Bar Cart", "Equipment Rental", "Ice & Mixers Included"],
    ambiancePreferences: ["Romantic Lighting", "Tropical Theme", "Vintage Vibe", "Minimalist Look"],
    musicChoices: ["Live Band", "DJ", "Soft Jazz", "Acoustic Guitar"],
    dressCode: ["Formal Black", "Casual Chic", "Tropical Wear", "Bartender’s Choice"]
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDropdownChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (category: string, option: string, checked: boolean) => {
    // Check if this is the 4th option (index 3) in step 3 preferences
    if (currentStep === 3 && checkboxOptions[category as keyof typeof checkboxOptions].indexOf(option) === 3 && checked) {
      setShowBlockingAlert(true);
      return; // Don't update form data, block the action
    }
    
    setFormData(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category as keyof typeof prev] as string[], option]
        : (prev[category as keyof typeof prev] as string[]).filter(item => item !== option)
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleGoBackFromAlert = () => {
    setShowBlockingAlert(false);
    handlePrevStep();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/bartenders", { state: { bookingData: formData } });
  };

  const isStep1Valid = formData.name && formData.email && formData.phone;
  const isStep2Valid = formData.eventType && formData.duration && formData.guestCount;

  return (
    <div className="min-h-screen bg-background">
       
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Book Your Perfect Bartender</h1>
            <p className="text-lg text-muted-foreground">
              Tell us about your event and we'll match you with the perfect bartending professional
            </p>
            <div className="flex justify-center mt-6">
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`w-8 h-0.5 mx-2 ${
                        currentStep > step ? "bg-primary" : "bg-muted"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-2 text-sm text-muted-foreground">
              <span>
                {currentStep === 1 && "Basic Information"}
                {currentStep === 2 && "Event Details"}
                {currentStep === 3 && "Your Preferences"}
                {currentStep === 4 && "Ambience & Extras"}
              </span>
            </div>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>
                  {currentStep === 1 && "Your Information"}
                  {currentStep === 2 && "Event Details"}
                  {currentStep === 3 && "Service Preferences"}
                  {currentStep === 4 && "Ambience & Extras"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <Input placeholder="Full Name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                    <Input placeholder="Email Address" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                    <Input placeholder="Phone Number" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {["eventType", "duration", "guestCount"].map((key) => (
                      <div key={key} className="space-y-2">
                        <Label>{key.replace(/([A-Z])/g, ' $1')}</Label>
                        <Select onValueChange={(value) => handleDropdownChange(key, value)}>
                          <SelectTrigger>
                            <SelectValue placeholder={`Select ${key}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {dropdownOptions[key as keyof typeof dropdownOptions].map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {["drinkPreferences", "serviceAddons", "setupRequirements"].map((category) => (
                      <div key={category} className="space-y-4">
                        <Label className="text-base font-semibold">{category.replace(/([A-Z])/g, ' $1')}</Label>
                        <div className="space-y-3">
                          {checkboxOptions[category as keyof typeof checkboxOptions].map((option) => (
                            <div key={option} className="flex items-center space-x-3">
                              <Checkbox
                                checked={formData[category as keyof typeof formData].includes(option)}
                                onCheckedChange={(checked) => handleCheckboxChange(category, option, checked as boolean)}
                              />
                              <Label className="text-sm">{option}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {["ambiancePreferences", "musicChoices", "dressCode"].map((category) => (
                      <div key={category} className="space-y-4">
                        <Label className="text-base font-semibold">{category.replace(/([A-Z])/g, ' $1')}</Label>
                        <div className="space-y-3">
                          {checkboxOptions[category as keyof typeof checkboxOptions].map((option) => (
                            <div key={option} className="flex items-center space-x-3">
                              <Checkbox
                                checked={formData[category as keyof typeof formData].includes(option)}
                                onCheckedChange={(checked) => handleCheckboxChange(category, option, checked as boolean)}
                              />
                              <Label className="text-sm">{option}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <Button type="button" variant="outline" onClick={handlePrevStep} disabled={currentStep === 1}>Back</Button>
                  <Button
                    type={currentStep === 4 ? "submit" : "button"}
                    variant="hero"
                    onClick={currentStep === 4 ? undefined : handleNextStep}
                    disabled={(currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid)}
                  >
                    {currentStep === 4 ? "Find a Bartender" : "Next Step"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Blocking Alert Dialog */}
      <Dialog open={showBlockingAlert} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="text-destructive">Option Cannot Be Canceled</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground mb-6">
              This option cannot be canceled once selected. You must go back to the previous step to continue.
            </p>
            <Button 
              variant="destructive" 
              onClick={handleGoBackFromAlert}
              className="w-full"
            >
              Go Back to Previous Step
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookingPage;
