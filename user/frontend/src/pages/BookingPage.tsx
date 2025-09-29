import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
    alternativePhone: "",
    whatsappNumber: "",
    onSiteContactPerson: "",
    contactPhone: "",
    relationshipToHost: "",
    eventType: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    barServiceDuration: "",
    totalGuests: "",
    adultGuests: "",
    minorGuests: "",
    peakBarUsageStartTime: "",
    peakBarUsageEndTime: "",
    eventTheme: "",
    preferredAtmosphere: [] as string[],
    fullAddress: "",
    city: "",
    state: "",
    pinCode: "",
    landmark: "",
    venueType: "",
    venueTypeOther: "",
    parkingAvailable: false,
    parkingType: "",
    elevatorAccess: false,
    floorNumber: "",
    specialEntryInstructions: "",
    preferredBarLocation: [] as string[],
    preferredBarLocationOther: "",
    barTableAvailable: false,
    arrangeTemporarySetup: false,
    powerOutletAvailable: false,
    waterSourceAvailable: false,
    distanceToWaterPoint: "",
    sinkAvailable: false,
    wineGlassesAvailable: false,
    wineGlassesQuantity: "",
    beerMugsAvailable: false,
    beerMugsQuantity: "",
    whiskeyGlassesAvailable: false,
    whiskeyGlassesQuantity: "",
    shotGlassesAvailable: false,
    champagneFlutesAvailable: false,
    champagneFlutesQuantity: "",
    cocktailGlassesAvailable: false,
    cocktailGlassesQuantity: "",
    highballGlassesAvailable: false,
    highballGlassesQuantity: "",
    margaritaGlassesAvailable: false,
    margaritaGlassesQuantity: "",
    disposableOptionsAvailable: false,
    cocktailShakerAvailable: false,
    barSpoonsAvailable: false,
    muddlerAvailable: false,
    jiggerAvailable: false,
    strainerAvailable: false,
    bottleOpenerAvailable: false,
    corkscrewAvailable: false,
    cuttingBoardAvailable: false,
    sharpKnifeAvailable: false,
    refrigeratorAccess: false,
    freezerAccess: false,
    iceBucketsAvailable: false,
    coolersAvailable: false,
    drinkPreferences: [] as string[],
    serviceAddons: [] as string[],
    setupRequirements: [] as string[],
  });
const navigate = useNavigate();

const dropdownOptions = {
    eventType: ["Birthday Party", "Wedding/Reception", "Corporate Event", "Anniversary", "Housewarming", "Festival Celebration", "Bachelor/Bachelorette Party", "Cocktail Party", "Other"],
    venueType: ["Private Residence (Home)", "Banquet Hall", "Hotel", "Outdoor Venue/Garden", "Rooftop", "Farmhouse", "Club/Resort", "Office Space", "Other"]
  };

  const checkboxOptions = {
    drinkPreferences: ["Premium Cocktails", "Wine Selection", "Beer & Spirits", "Non-Alcoholic Options"],
    serviceAddons: ["Signature Cocktail Creation", "Drink Menu Consultation", "Garnish & Decoration", "Glass Rental"],
    setupRequirements: ["Full Bar Setup", "Mobile Bar Cart", "Equipment Rental", "Ice & Mixers Included"],
    preferredAtmosphere: ["Formal/Elegant", "Casual/Relaxed", "Party/Energetic", "Sophisticated/Upscale", "Traditional/Cultural", "Modern/Contemporary"],
    preferredBarLocation: ["Indoor (Living Room)", "Indoor (Dining Area)", "Outdoor (Garden/Terrace)", "Poolside", "Entrance/Foyer Area", "Specific Location"]
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDropdownChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (category: string, option: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category as keyof typeof prev] as string[], option]
        : (prev[category as keyof typeof prev] as string[]).filter(item => item !== option)
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 5) {
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
  const isStep2Valid = formData.eventType && formData.eventDate && formData.eventStartTime && formData.eventEndTime && formData.barServiceDuration && formData.totalGuests && formData.adultGuests;
  const isStep3Valid = formData.fullAddress && formData.city && formData.state && formData.pinCode && formData.venueType;
  const isStep4Valid = formData.preferredBarLocation.length > 0 && (formData.barTableAvailable || formData.arrangeTemporarySetup) && formData.powerOutletAvailable && formData.waterSourceAvailable;
  const isStep5Valid = (
    (formData.wineGlassesAvailable || formData.beerMugsAvailable || formData.whiskeyGlassesAvailable || formData.shotGlassesAvailable || formData.champagneFlutesAvailable || formData.cocktailGlassesAvailable || formData.highballGlassesAvailable || formData.margaritaGlassesAvailable || formData.disposableOptionsAvailable) &&
    (formData.cocktailShakerAvailable || formData.barSpoonsAvailable || formData.muddlerAvailable || formData.jiggerAvailable || formData.strainerAvailable || formData.bottleOpenerAvailable || formData.corkscrewAvailable || formData.cuttingBoardAvailable || formData.sharpKnifeAvailable) &&
    (formData.refrigeratorAccess || formData.freezerAccess || formData.iceBucketsAvailable || formData.coolersAvailable)
  );

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
                {[1, 2, 3, 4, 5].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {step}
                    </div>
                    {step < 5 && (
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
                {currentStep === 3 && "Venue Information"}
                {currentStep === 4 && "Bar Setup & Infrastructure"}
                {currentStep === 5 && "Glassware & Equipment"}
              </span>
            </div>
          </div>

          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>
                  {currentStep === 1 && "Your Information"}
                  {currentStep === 2 && "Event Details"}
                  {currentStep === 3 && "Venue Information"}
                  {currentStep === 4 && "Bar Setup & Infrastructure"}
                  {currentStep === 5 && "Glassware & Equipment"}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Personal Details</h3>
                    <Input placeholder="Full Name" value={formData.name} onChange={(e) => handleInputChange("name", e.target.value)} />
                    <Input placeholder="Email Address" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} />
                    <Input placeholder="Primary Phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
                    <Input placeholder="Alternative Phone" value={formData.alternativePhone} onChange={(e) => handleInputChange("alternativePhone", e.target.value)} />
                    <Input placeholder="WhatsApp Number (if different)" value={formData.whatsappNumber} onChange={(e) => handleInputChange("whatsappNumber", e.target.value)} />
                    <h3 className="text-lg font-medium">Emergency Contact (Day of Event)</h3>
                    <Input placeholder="On-site Contact Person" value={formData.onSiteContactPerson} onChange={(e) => handleInputChange("onSiteContactPerson", e.target.value)} />
                    <Input placeholder="Contact Phone" value={formData.contactPhone} onChange={(e) => handleInputChange("contactPhone", e.target.value)} />
                    <Input placeholder="Relationship to Host" value={formData.relationshipToHost} onChange={(e) => handleInputChange("relationshipToHost", e.target.value)} />
                  </div>
                )}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Basic Event Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Event Type</Label>
                        <Select onValueChange={(value) => handleDropdownChange("eventType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Event Type" />
                          </SelectTrigger>
                          <SelectContent>
                            {dropdownOptions.eventType.map((option) => (
                              <SelectItem key={option} value={option}>{option}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {formData.eventType === "Other" && (
                          <Input placeholder="Please specify" onChange={(e) => handleInputChange("eventTypeOther", e.target.value)} />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Event Date</Label>
                        <Input type="date" placeholder="Event Date" value={formData.eventDate} onChange={(e) => handleInputChange("eventDate", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Event Start Time</Label>
                        <Input type="time" placeholder="Event Start Time" value={formData.eventStartTime} onChange={(e) => handleInputChange("eventStartTime", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Event End Time</Label>
                        <Input type="time" placeholder="Event End Time" value={formData.eventEndTime} onChange={(e) => handleInputChange("eventEndTime", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Expected Duration of Bar Service (hours)</Label>
                        <Input type="number" placeholder="Expected Duration of Bar Service (hours)" value={formData.barServiceDuration} onChange={(e) => handleInputChange("barServiceDuration", e.target.value)} />
                      </div>
                    </div>
                    <h3 className="text-lg font-medium">Guest Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label>Total Number of Guests</Label>
                        <Input type="number" placeholder="Total Number of Guests" value={formData.totalGuests} onChange={(e) => handleInputChange("totalGuests", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Number of Adults</Label>
                        <Input type="number" placeholder="Number of Adults" value={formData.adultGuests} onChange={(e) => handleInputChange("adultGuests", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Number of Minors (if any)</Label>
                        <Input type="number" placeholder="Number of Minors (if any)" value={formData.minorGuests} onChange={(e) => handleInputChange("minorGuests", e.target.value)} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Peak Bar Usage Start Time</Label>
                            <Input type="time" placeholder="Peak Bar Usage Start Time" value={formData.peakBarUsageStartTime} onChange={(e) => handleInputChange("peakBarUsageStartTime", e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Peak Bar Usage End Time</Label>
                            <Input type="time" placeholder="Peak Bar Usage End Time" value={formData.peakBarUsageEndTime} onChange={(e) => handleInputChange("peakBarUsageEndTime", e.target.value)} />
                        </div>
                    </div>
                    <h3 className="text-lg font-medium">Event Theme & Atmosphere</h3>
                    <div className="space-y-2">
                      <Label>Event Theme (if any)</Label>
                      <Input placeholder="e.g., Tropical, 80s, etc." value={formData.eventTheme} onChange={(e) => handleInputChange("eventTheme", e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label>Preferred Atmosphere</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {checkboxOptions.preferredAtmosphere.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              checked={formData.preferredAtmosphere.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange("preferredAtmosphere", option, checked as boolean)}
                            />
                            <Label className="text-sm font-normal">{option}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Event Location</h3>
                    <Input placeholder="Full Address" value={formData.fullAddress} onChange={(e) => handleInputChange("fullAddress", e.target.value)} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input placeholder="City" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
                      <Input placeholder="State" value={formData.state} onChange={(e) => handleInputChange("state", e.target.value)} />
                      <Input placeholder="PIN Code" value={formData.pinCode} onChange={(e) => handleInputChange("pinCode", e.target.value)} />
                      <Input placeholder="Landmark" value={formData.landmark} onChange={(e) => handleInputChange("landmark", e.target.value)} />
                    </div>
                    <h3 className="text-lg font-medium">Venue Type</h3>
                    <div className="space-y-2">
                      <Select onValueChange={(value) => handleDropdownChange("venueType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Venue Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {dropdownOptions.venueType.map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formData.venueType === "Other" && (
                        <Input placeholder="Please specify" onChange={(e) => handleInputChange("venueTypeOther", e.target.value)} />
                      )}
                    </div>
                    <h3 className="text-lg font-medium">Venue Accessibility & Parking</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Parking Available for Bartender</Label>
                        <RadioGroup
                          onValueChange={(value) => setFormData(prev => ({ ...prev, parkingAvailable: value === "yes" }))}
                          value={formData.parkingAvailable ? "yes" : "no"}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="parking-yes" />
                            <Label htmlFor="parking-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="parking-no" />
                            <Label htmlFor="parking-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      {formData.parkingAvailable && (
                        <div className="space-y-2">
                          <Label>Parking Type</Label>
                          <Select onValueChange={(value) => handleInputChange("parkingType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Parking Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2 wheeler">2 wheeler</SelectItem>
                              <SelectItem value="4 wheeler">4 wheeler</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label>Elevator Access</Label>
                        <RadioGroup
                          onValueChange={(value) => setFormData(prev => ({ ...prev, elevatorAccess: value === "yes" }))}
                          value={formData.elevatorAccess ? "yes" : "no"}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="elevator-yes" />
                            <Label htmlFor="elevator-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="elevator-no" />
                            <Label htmlFor="elevator-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <Input type="number" placeholder="Floor Number (if applicable)" value={formData.floorNumber} onChange={(e) => handleInputChange("floorNumber", e.target.value)} />
                    </div>
                    <Input placeholder="Special Entry Instructions" value={formData.specialEntryInstructions} onChange={(e) => handleInputChange("specialEntryInstructions", e.target.value)} />
                  </div>
                )}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Bar Area Setup</h3>
                    <div className="space-y-2">
                      <Label>Preferred Bar Location</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {checkboxOptions.preferredBarLocation.map((option) => (
                          <div key={option} className="flex items-center space-x-2">
                            <Checkbox
                              checked={formData.preferredBarLocation.includes(option)}
                              onCheckedChange={(checked) => handleCheckboxChange("preferredBarLocation", option, checked as boolean)}
                            />
                            <Label className="text-sm font-normal">{option}</Label>
                          </div>
                        ))}
                      </div>
                      {formData.preferredBarLocation.includes("Specific Location") && (
                        <Input placeholder="Please specify" onChange={(e) => handleInputChange("preferredBarLocationOther", e.target.value)} />
                      )}
                    </div>
                    <h3 className="text-lg font-medium">Table & Furniture Setup</h3>
                    <div className="space-y-2">
                      <Label>Bar Table/Counter Available</Label>
                      <RadioGroup
                        onValueChange={(value) => setFormData(prev => ({ ...prev, barTableAvailable: value === "yes" }))}
                        value={formData.barTableAvailable ? "yes" : "no"}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="bar-table-yes" />
                          <Label htmlFor="bar-table-yes">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="bar-table-no" />
                          <Label htmlFor="bar-table-no">No</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    {!formData.barTableAvailable && (
                      <div className="flex items-center space-x-2 ml-6">
                        <Checkbox
                          checked={formData.arrangeTemporarySetup}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, arrangeTemporarySetup: checked as boolean }))}
                        />
                        <Label>Please arrange temporary setup</Label>
                      </div>
                    )}
                    <h3 className="text-lg font-medium">Electrical & Water Access</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Power Outlet Near Bar Area</Label>
                        <RadioGroup
                          onValueChange={(value) => setFormData(prev => ({ ...prev, powerOutletAvailable: value === "yes" }))}
                          value={formData.powerOutletAvailable ? "yes" : "no"}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="power-outlet-yes" />
                            <Label htmlFor="power-outlet-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="power-outlet-no" />
                            <Label htmlFor="power-outlet-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label>Water Source Access</Label>
                        <RadioGroup
                          onValueChange={(value) => setFormData(prev => ({ ...prev, waterSourceAvailable: value === "yes" }))}
                          value={formData.waterSourceAvailable ? "yes" : "no"}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="water-source-yes" />
                            <Label htmlFor="water-source-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="water-source-no" />
                            <Label htmlFor="water-source-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      {formData.waterSourceAvailable && (
                        <Input type="number" placeholder="Distance to Nearest Water Point (meters)" value={formData.distanceToWaterPoint} onChange={(e) => handleInputChange("distanceToWaterPoint", e.target.value)} />
                      )}
                      <div className="space-y-2">
                        <Label>Sink/Wash Area Available</Label>
                        <RadioGroup
                          onValueChange={(value) => setFormData(prev => ({ ...prev, sinkAvailable: value === "yes" }))}
                          value={formData.sinkAvailable ? "yes" : "no"}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="sink-yes" />
                            <Label htmlFor="sink-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="sink-no" />
                            <Label htmlFor="sink-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>
                )}


                <div className="flex justify-between pt-6">
                  <Button type="button" variant="outline" onClick={handlePrevStep} disabled={currentStep === 1}>Back</Button>
                  <Button
                    type={currentStep === 5 ? "submit" : "button"}
                    variant="hero"
                    onClick={currentStep === 5 ? undefined : handleNextStep}
                    disabled={(currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid) || (currentStep === 3 && !isStep3Valid) || (currentStep === 4 && !isStep4Valid) || (currentStep === 5 && !isStep5Valid)}
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
