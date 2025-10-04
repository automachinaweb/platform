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
    iceBucketsQuantity: "",
    coolersQuantity: "",
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
    // Step 6 - Serving Accessories & Supplies
    servingTraysAvailable: false,
    servingTraysQuantity: "",
    largeTraysAvailable: false,
    smallCocktailTraysAvailable: false,
    antiSlipTraysAvailable: false,
    cocktailNapkinsAvailable: false,
    coastersAvailable: false,
    iceTongsAvailable: false,
    servingSpoonsAvailable: false,
    freshFruitsAvailable: false,
    lemonsAvailable: false,
    lemonsQuantity: "",
    limesAvailable: false,
    orangesAvailable: false,
    orangesQuantity: "",
    otherFruitsAvailable: false,
    otherFruitsSpecify: "",
    cherriesAvailable: false,
    mintLeavesAvailable: false,
    cucumberAvailable: false,
    olivesAvailable: false,
    softDrinksAvailable: false,
    cokePepsiAvailable: false,
    sprite7upAvailable: false,
    sprite7upQuantity: "",
    otherSodasAvailable: false,
    otherSodasSpecify: "",
    tonicWaterAvailable: false,
    tonicWaterQuantity: "",
    sodaWaterAvailable: false,
    sodaWaterQuantity: "",
    gingerAleAvailable: false,
    gingerAleQuantity: "",
    freshJuicesAvailable: false,
    freshJuicesSpecify: "",
    regularWaterAvailable: false,
    regularWaterQuantity: "",
    sparklingWaterAvailable: false,
    sparklingWaterQuantity: "",
    specificRequirementsAvailable: false,
    specificRequirementsSpecify: "",
    // Step 7 - Alcohol & Beverage Preferences
    signatureCocktailDesired: false,
    preferredCocktails: [] as string[],
    customCocktailRequest: "",
    sugarFreeOptionsRequired: false,
    lowAlcoholMocktailOptions: false,
    religiousCulturalRestrictions: "",
    allergyConsiderations: "",
    // Step 8 - Service Preferences & Special Requests
    preferredAttire: [] as string[],
    themedAttireSpecify: "",
    languagePreferences: [] as string[],
    regionalLanguageSpecify: "",
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
    preferredBarLocation: ["Indoor (Living Room)", "Indoor (Dining Area)", "Outdoor (Garden/Terrace)", "Poolside", "Entrance/Foyer Area", "Specific Location"],
    preferredCocktails: ["Classic (Old Fashioned, Manhattan, Martini)", "Tropical (Mojito, Piña Colada, Daiquiri)", "Contemporary (Cosmopolitan, Moscow Mule)", "Indian Fusion (Masala Margarita, Curry Leaf Cocktail)"],
    preferredAttire: ["Formal (Black Suit/Tie)", "Semi-formal (Black Shirt/Trousers)", "Themed Attire", "Casual Professional", "Traditional Indian Attire"],
    languagePreferences: ["Marathi", "Hindi", "English", "Regional Language"]
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

  const handleNextStep = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (currentStep < 8) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/user/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Booking successful:", responseData);
        navigate("/bartenders", { state: { bookingData: formData } });
      } else {
        console.error("Booking failed:", response.statusText);
        // Handle error appropriately, e.g., show a message to the user
      }
    } catch (error) {
      console.error("An error occurred during booking:", error);
      // Handle error appropriately, e.g., show a message to the user
    }
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
  const isStep6Valid = (
    (formData.servingTraysAvailable || formData.cocktailNapkinsAvailable || formData.coastersAvailable || formData.iceTongsAvailable || formData.servingSpoonsAvailable) &&
    (formData.freshFruitsAvailable || formData.softDrinksAvailable)
  );
  const isStep7Valid = true; // Step 7 is optional, so always valid
  const isStep8Valid = true; // Step 8 is optional, so always valid

  console.log(formData);

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
                {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      currentStep >= step 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {step}
                    </div>
                    {step < 8 && (
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
                {currentStep === 6 && "Serving Accessories & Supplies"}
                {currentStep === 7 && "Alcohol & Beverage Preferences"}
                {currentStep === 8 && "Service Preferences & Special Requests"}
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
                  {currentStep === 6 && "Serving Accessories & Supplies"}
                  {currentStep === 7 && "Alcohol & Beverage Preferences"}
                  {currentStep === 8 && "Service Preferences & Special Requests"}
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
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Glassware Requirements</h3>
                    <div className="space-y-4">
                      <Label>Available at Venue:</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.wineGlassesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, wineGlassesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Wine Glasses</Label>
                          {formData.wineGlassesAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.wineGlassesQuantity} 
                              onChange={(e) => handleInputChange("wineGlassesQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.beerMugsAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, beerMugsAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Beer Mugs/Glasses</Label>
                          {formData.beerMugsAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.beerMugsQuantity} 
                              onChange={(e) => handleInputChange("beerMugsQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.whiskeyGlassesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, whiskeyGlassesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Whiskey Glasses/Tumblers</Label>
                          {formData.whiskeyGlassesAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.whiskeyGlassesQuantity} 
                              onChange={(e) => handleInputChange("whiskeyGlassesQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.shotGlassesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, shotGlassesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Shot Glasses —consult with bartender</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.champagneFlutesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, champagneFlutesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Champagne Flutes</Label>
                          {formData.champagneFlutesAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.champagneFlutesQuantity} 
                              onChange={(e) => handleInputChange("champagneFlutesQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.cocktailGlassesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, cocktailGlassesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Cocktail/Martini Glasses</Label>
                          {formData.cocktailGlassesAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.cocktailGlassesQuantity} 
                              onChange={(e) => handleInputChange("cocktailGlassesQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.highballGlassesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, highballGlassesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Highball Glasses</Label>
                          {formData.highballGlassesAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.highballGlassesQuantity} 
                              onChange={(e) => handleInputChange("highballGlassesQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.margaritaGlassesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, margaritaGlassesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Margarita Glasses</Label>
                          {formData.margaritaGlassesAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.margaritaGlassesQuantity} 
                              onChange={(e) => handleInputChange("margaritaGlassesQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.disposableOptionsAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, disposableOptionsAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Disposable/Plastic Options</Label>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium">Bar Equipment & Tools</h3>
                    <div className="space-y-4">
                      <Label>Available at Venue:</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.cocktailShakerAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, cocktailShakerAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Cocktail Shaker</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.barSpoonsAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, barSpoonsAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Bar Spoons</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.muddlerAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, muddlerAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Muddler</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.jiggerAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, jiggerAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Jigger/Measuring Tools —consult with bartender</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.strainerAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, strainerAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Strainer</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.bottleOpenerAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, bottleOpenerAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Bottle Opener</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.corkscrewAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, corkscrewAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Corkscrew</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.cuttingBoardAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, cuttingBoardAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Cutting Board</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.sharpKnifeAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sharpKnifeAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Sharp Knife</Label>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium">Ice & Cooling Equipment</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Refrigerator Access</Label>
                        <RadioGroup
                          onValueChange={(value) => setFormData(prev => ({ ...prev, refrigeratorAccess: value === "yes" }))}
                          value={formData.refrigeratorAccess ? "yes" : "no"}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="refrigerator-yes" />
                            <Label htmlFor="refrigerator-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="refrigerator-no" />
                            <Label htmlFor="refrigerator-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label>Freezer Access —consult with bartender</Label>
                        <RadioGroup
                          onValueChange={(value) => setFormData(prev => ({ ...prev, freezerAccess: value === "yes" }))}
                          value={formData.freezerAccess ? "yes" : "no"}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="freezer-yes" />
                            <Label htmlFor="freezer-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="freezer-no" />
                            <Label htmlFor="freezer-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-2">
                        <Label>Ice Buckets Available</Label>
                        <RadioGroup
                          onValueChange={(value) => setFormData(prev => ({ ...prev, iceBucketsAvailable: value === "yes" }))}
                          value={formData.iceBucketsAvailable ? "yes" : "no"}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="ice-buckets-yes" />
                            <Label htmlFor="ice-buckets-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="ice-buckets-no" />
                            <Label htmlFor="ice-buckets-no">No</Label>
                          </div>
                        </RadioGroup>
                        {formData.iceBucketsAvailable && (
                          <Input 
                            placeholder="Quantity" 
                            value={formData.iceBucketsQuantity || ""} 
                            onChange={(e) => handleInputChange("iceBucketsQuantity", e.target.value)}
                            className="w-24 mt-2"
                          />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label>Coolers/Ice Boxes</Label>
                        <RadioGroup
                          onValueChange={(value) => setFormData(prev => ({ ...prev, coolersAvailable: value === "yes" }))}
                          value={formData.coolersAvailable ? "yes" : "no"}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="coolers-yes" />
                            <Label htmlFor="coolers-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="coolers-no" />
                            <Label htmlFor="coolers-no">No</Label>
                          </div>
                        </RadioGroup>
                        {formData.coolersAvailable && (
                          <Input 
                            placeholder="Quantity" 
                            value={formData.coolersQuantity || ""} 
                            onChange={(e) => handleInputChange("coolersQuantity", e.target.value)}
                            className="w-24 mt-2"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Serving Equipment</h3>
                    <div className="space-y-4">
                      <Label>Available at Venue:</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.servingTraysAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, servingTraysAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Serving Trays</Label>
                          {formData.servingTraysAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.servingTraysQuantity} 
                              onChange={(e) => handleInputChange("servingTraysQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.largeTraysAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, largeTraysAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Large Trays</Label>
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.smallCocktailTraysAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, smallCocktailTraysAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Small Cocktail Trays</Label>
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.antiSlipTraysAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, antiSlipTraysAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Anti-slip Trays —consult with bartender</Label>
                        </div>
                        <div className="space-y-2">
                          <Label>Cocktail Napkins</Label>
                          <RadioGroup
                            onValueChange={(value) => setFormData(prev => ({ ...prev, cocktailNapkinsAvailable: value === "yes" }))}
                            value={formData.cocktailNapkinsAvailable ? "yes" : "no"}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="cocktail-napkins-yes" />
                              <Label htmlFor="cocktail-napkins-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="cocktail-napkins-no" />
                              <Label htmlFor="cocktail-napkins-no">No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label>Coasters</Label>
                          <RadioGroup
                            onValueChange={(value) => setFormData(prev => ({ ...prev, coastersAvailable: value === "yes" }))}
                            value={formData.coastersAvailable ? "yes" : "no"}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="coasters-yes" />
                              <Label htmlFor="coasters-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="coasters-no" />
                              <Label htmlFor="coasters-no">No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label>Ice Tongs</Label>
                          <RadioGroup
                            onValueChange={(value) => setFormData(prev => ({ ...prev, iceTongsAvailable: value === "yes" }))}
                            value={formData.iceTongsAvailable ? "yes" : "no"}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="ice-tongs-yes" />
                              <Label htmlFor="ice-tongs-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="ice-tongs-no" />
                              <Label htmlFor="ice-tongs-no">No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                        <div className="space-y-2">
                          <Label>Serving Spoons</Label>
                          <RadioGroup
                            onValueChange={(value) => setFormData(prev => ({ ...prev, servingSpoonsAvailable: value === "yes" }))}
                            value={formData.servingSpoonsAvailable ? "yes" : "no"}
                            className="flex space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="yes" id="serving-spoons-yes" />
                              <Label htmlFor="serving-spoons-yes">Yes</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="no" id="serving-spoons-no" />
                              <Label htmlFor="serving-spoons-no">No</Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium">Fresh Ingredients & Garnishes</h3>
                    <div className="space-y-4">
                      <Label>Available at Venue:</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.freshFruitsAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, freshFruitsAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Fresh Fruits:</Label>
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.lemonsAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, lemonsAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Lemons</Label>
                          {formData.lemonsAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.lemonsQuantity} 
                              onChange={(e) => handleInputChange("lemonsQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.limesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, limesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Limes —consult with bartender</Label>
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.orangesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, orangesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Oranges</Label>
                          {formData.orangesAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.orangesQuantity} 
                              onChange={(e) => handleInputChange("orangesQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.otherFruitsAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, otherFruitsAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Other:</Label>
                          {formData.otherFruitsAvailable && (
                            <Input 
                              placeholder="Specify" 
                              value={formData.otherFruitsSpecify} 
                              onChange={(e) => handleInputChange("otherFruitsSpecify", e.target.value)}
                              className="w-32 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.cherriesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, cherriesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Cherries</Label>
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.mintLeavesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, mintLeavesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Mint Leaves</Label>
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.cucumberAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, cucumberAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Cucumber</Label>
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.olivesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, olivesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Olives</Label>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-lg font-medium">Mixers & Non-Alcoholic Beverages</h3>
                    <div className="space-y-4">
                      <Label>Available at Venue:</Label>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.softDrinksAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, softDrinksAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Soft Drinks:</Label>
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.cokePepsiAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, cokePepsiAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Coke/Pepsi —consult with bartender</Label>
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.sprite7upAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sprite7upAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Sprite/7Up</Label>
                          {formData.sprite7upAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.sprite7upQuantity} 
                              onChange={(e) => handleInputChange("sprite7upQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.otherSodasAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, otherSodasAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Other Sodas:</Label>
                          {formData.otherSodasAvailable && (
                            <Input 
                              placeholder="Specify" 
                              value={formData.otherSodasSpecify} 
                              onChange={(e) => handleInputChange("otherSodasSpecify", e.target.value)}
                              className="w-32 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.tonicWaterAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, tonicWaterAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Tonic Water</Label>
                          {formData.tonicWaterAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.tonicWaterQuantity} 
                              onChange={(e) => handleInputChange("tonicWaterQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.sodaWaterAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sodaWaterAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Soda Water</Label>
                          {formData.sodaWaterAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.sodaWaterQuantity} 
                              onChange={(e) => handleInputChange("sodaWaterQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.gingerAleAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, gingerAleAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Ginger Ale</Label>
                          {formData.gingerAleAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.gingerAleQuantity} 
                              onChange={(e) => handleInputChange("gingerAleQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.freshJuicesAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, freshJuicesAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Fresh Juices:</Label>
                          {formData.freshJuicesAvailable && (
                            <Input 
                              placeholder="Specify" 
                              value={formData.freshJuicesSpecify} 
                              onChange={(e) => handleInputChange("freshJuicesSpecify", e.target.value)}
                              className="w-32 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.regularWaterAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, regularWaterAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Regular Water</Label>
                          {formData.regularWaterAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.regularWaterQuantity} 
                              onChange={(e) => handleInputChange("regularWaterQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                        <div className="flex items-center space-x-2 ml-6">
                          <Checkbox
                            checked={formData.sparklingWaterAvailable}
                            onCheckedChange={(checked) => setFormData(prev => ({ ...prev, sparklingWaterAvailable: checked as boolean }))}
                          />
                          <Label className="text-sm font-normal">Sparkling Water</Label>
                          {formData.sparklingWaterAvailable && (
                            <Input 
                              placeholder="Quantity" 
                              value={formData.sparklingWaterQuantity} 
                              onChange={(e) => handleInputChange("sparklingWaterQuantity", e.target.value)}
                              className="w-24 ml-2"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formData.specificRequirementsAvailable}
                          onCheckedChange={(checked) => setFormData(prev => ({ ...prev, specificRequirementsAvailable: checked as boolean }))}
                        />
                        <Label className="text-sm font-normal">Specific Requirements:</Label>
                        {formData.specificRequirementsAvailable && (
                          <Input 
                            placeholder="Specify" 
                            value={formData.specificRequirementsSpecify} 
                            onChange={(e) => handleInputChange("specificRequirementsSpecify", e.target.value)}
                            className="w-32 ml-2"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Alcohol & Beverage Preferences</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <div className="flex items-start space-x-2">
                        <div className="text-blue-600 font-semibold text-sm">Important Notice:</div>
                      </div>
                      <p className="text-sm text-blue-800 mt-1 italic">
                        As per our service model, customers are responsible for purchasing and providing all
                        alcoholic beverages. Our bartenders provide professional service only.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Signature Cocktail Desired</Label>
                        <RadioGroup
                          onValueChange={(value) => setFormData(prev => ({ ...prev, signatureCocktailDesired: value === "yes" }))}
                          value={formData.signatureCocktailDesired ? "yes" : "no"}
                          defaultValue="no"
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="signature-cocktail-yes" />
                            <Label htmlFor="signature-cocktail-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="signature-cocktail-no" />
                            <Label htmlFor="signature-cocktail-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Preferred Cocktails</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {checkboxOptions.preferredCocktails.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <Checkbox
                                checked={formData.preferredCocktails.includes(option)}
                                onCheckedChange={(checked) => handleCheckboxChange("preferredCocktails", option, checked as boolean)}
                              />
                              <Label className="text-sm font-normal">{option}</Label>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            checked={formData.customCocktailRequest !== ""}
                            onCheckedChange={(checked) => {
                              if (!checked) {
                                setFormData(prev => ({ ...prev, customCocktailRequest: "" }));
                              }
                            }}
                          />
                          <Label className="text-sm font-normal">Custom Request:</Label>
                          <Input 
                            placeholder="Specify custom cocktail" 
                            value={formData.customCocktailRequest} 
                            onChange={(e) => handleInputChange("customCocktailRequest", e.target.value)}
                            className="w-48 ml-2"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Sugar-free Options Required</Label>
                        <RadioGroup
                          onValueChange={(value) => setFormData(prev => ({ ...prev, sugarFreeOptionsRequired: value === "yes" }))}
                          value={formData.sugarFreeOptionsRequired ? "yes" : "no"}
                          defaultValue="no"
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="sugar-free-yes" />
                            <Label htmlFor="sugar-free-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="sugar-free-no" />
                            <Label htmlFor="sugar-free-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Low-alcohol/Mocktail Options</Label>
                        <RadioGroup
                          onValueChange={(value) => setFormData(prev => ({ ...prev, lowAlcoholMocktailOptions: value === "yes" }))}
                          value={formData.lowAlcoholMocktailOptions ? "yes" : "no"}
                          defaultValue="no"
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="low-alcohol-yes" />
                            <Label htmlFor="low-alcohol-yes">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="low-alcohol-no" />
                            <Label htmlFor="low-alcohol-no">No</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Religious/Cultural Restrictions</Label>
                        <Input 
                          placeholder="Specify any religious or cultural restrictions" 
                          value={formData.religiousCulturalRestrictions} 
                          onChange={(e) => handleInputChange("religiousCulturalRestrictions", e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Allergy Considerations</Label>
                        <Input 
                          placeholder="Specify any allergy considerations" 
                          value={formData.allergyConsiderations} 
                          onChange={(e) => handleInputChange("allergyConsiderations", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Bartender Presentation</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Preferred Attire</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {checkboxOptions.preferredAttire.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <Checkbox
                                checked={formData.preferredAttire.includes(option)}
                                onCheckedChange={(checked) => handleCheckboxChange("preferredAttire", option, checked as boolean)}
                              />
                              <Label className="text-sm font-normal">{option}</Label>
                            </div>
                          ))}
                        </div>
                        {formData.preferredAttire.includes("Themed Attire") && (
                          <div className="flex items-center space-x-2 ml-6">
                            <Label className="text-sm font-normal">Specify:</Label>
                            <Input 
                              placeholder="Specify themed attire" 
                              value={formData.themedAttireSpecify} 
                              onChange={(e) => handleInputChange("themedAttireSpecify", e.target.value)}
                              className="w-48 ml-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-medium">Special Requirements</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Language Preferences</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {checkboxOptions.languagePreferences.map((option) => (
                            <div key={option} className="flex items-center space-x-2">
                              <Checkbox
                                checked={formData.languagePreferences.includes(option)}
                                onCheckedChange={(checked) => handleCheckboxChange("languagePreferences", option, checked as boolean)}
                              />
                              <Label className="text-sm font-normal">{option}</Label>
                            </div>
                          ))}
                        </div>
                        {formData.languagePreferences.includes("Regional Language") && (
                          <div className="flex items-center space-x-2 ml-6">
                            <Label className="text-sm font-normal">Specify:</Label>
                            <Input 
                              placeholder="Specify regional language" 
                              value={formData.regionalLanguageSpecify} 
                              onChange={(e) => handleInputChange("regionalLanguageSpecify", e.target.value)}
                              className="w-48 ml-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between pt-6">
                  <Button type="button" variant="outline" onClick={handlePrevStep} disabled={currentStep === 1}>Back</Button>
                  <Button
                    type={currentStep === 8 ? "submit" : "button"}
                    variant="hero"
                    onClick={currentStep === 8 ? handleSubmit : (e) => handleNextStep(e)}
                    disabled={(currentStep === 1 && !isStep1Valid) || (currentStep === 2 && !isStep2Valid) || (currentStep === 3 && !isStep3Valid) || (currentStep === 4 && !isStep4Valid) || (currentStep === 5 && !isStep5Valid) || (currentStep === 6 && !isStep6Valid) || (currentStep === 7 && !isStep7Valid) || (currentStep === 8 && !isStep8Valid)}
                  >
                    {currentStep === 8 ? "Find a Bartender" : "Next Step"}
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
