import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const Questionnaire = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchQuestionnaire = async () => {
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
          // If data exists, merge it into state.
          // Note: Backend might return null if not found, in which case we do nothing (keep defaults).
          if (data) {
            // Sanitize nulls to empty strings to avoid uncontrolled input warnings
            const sanitized = Object.fromEntries(
              Object.entries(data).map(([k, v]) => [k, v === null ? "" : v])
            );
            // Transform boolean to "yes"/"no" for RadioGroup if needed
            if (typeof sanitized.bartendingCourseCompleted === "boolean") {
              sanitized.bartendingCourseCompleted =
                sanitized.bartendingCourseCompleted ? "yes" : "no";
            }
            setFormData((prev) => ({ ...prev, ...sanitized }));
          }
        }
      } catch (error) {
        console.error("Error fetching questionnaire:", error);
      }
    };
    fetchQuestionnaire();
  }, []);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    fullName: "",
    dob: "",
    age: "",
    gender: "",
    nationality: "",
    primaryContact: "",
    whatsappNumber: "",
    email: "",
    currentAddress: "",
    pinCode: "",
    permanentAddress: "",
    aadhaar: "",
    pan: "",
    passport: "",
    drivingLicense: "",
    otherId: "",
    emergencyContactName: "",
    emergencyContactRelationship: "",
    emergencyContactPhone: "",
    emergencyContactAddress: "",

    // Step 2
    bartendingCourseCompleted: "no",
    courseInstitution: "",
    courseName: "",
    courseDuration: "",
    courseYear: "",
    courseGrade: "",
    courseSpecializations: "",

    responsibleBeverageCertificate: false,
    responsibleBeverageAuthority: "",
    responsibleBeverageValidity: "",
    foodSafetyCertificate: false,
    foodSafetyAuthority: "",
    foodSafetyValidity: "",
    flrCourse: false,
    flrCompletionDate: "",
    sommelierCertificate: false,
    sommelierLevel: "",
    sommelierBody: "",
    otherCertifications: false,
    otherCertificateName: "",
    otherCertificateAuthority: "",
    otherCertificateValidity: "",

    // Step 3
    experienceYears: "",
    experienceMonths: "",
    experienceLevel: "",
    jobTitle1: "",
    company1: "",
    venueType1: "",
    otherVenueType1: "",
    responsibilities1: "",

    // Step 4
    oldFashioned: 0,
    manhattan: 0,
    martini: 0,
    mojito: 0,
    margarita: 0,
    cosmopolitan: 0,
    whiskeySour: 0,
    daiquiri: 0,
    molecularMixology: 0,
    smokedCocktails: 0,
    craftArtisanalCocktails: 0,
    seasonalFreshIngredientCocktails: 0,
    masalaChaiCocktails: 0,
    spicedIndianCocktails: 0,
    regionalFusionDrinks: 0,
    traditionalIndianBeverages: 0,
    flairBartending: false,
    basicFlair: 0,
    intermediateFlair: 0,
    advancedFlair: 0,
    fireFlair: 0,
    formalFlairTraining: false,
    competitionParticipation: false,
    awardsRecognition: "",
    whiskeyScotchBourbon: 0,
    vodka: 0,
    gin: 0,
    rum: 0,
    tequila: 0,
    brandyCognac: 0,
    liqueurs: 0,
    redWine: 0,
    whiteWine: 0,
    sparklingWineChampagne: 0,
    winePairing: 0,
    lager: 0,
    ale: 0,
    craftBeer: 0,
    internationalBeers: 0,

    // Step 5
    professionalKit: false,
    shakerSet: false,
    jigger: false,
    barSpoons: false,
    muddler: false,
    strainer: false,
    fineMeshStrainer: false,
    channelKnife: false,
    citrusJuicer: false,
    bottleOpener: false,
    corkscrew: false,
    cuttingBoard: false,
    paringKnife: false,
    iceBucket: false,
    pourSpouts: false,
    garnishContainers: false,
    smokingGun: false,
    molecularMixologyTools: false,
    immersionBlender: false,
    centrifuge: false,
    liquidNitrogen: false,
    carbonationSystem: false,
    ownVehicle: false,
    vehicleType: "",
    willingToTravel: false,
    maxTravelDistance: "",

    // Step 6
    marathi: 0,
    hindi: 0,
    english: 0,
    otherLanguage: "",
    otherLanguageProficiency: 0,
    privateParties: 0,
    weddingReceptions: 0,
    corporateEvents: 0,
    birthdayParties: 0,
    anniversaryCelebrations: 0,
    cocktailParties: 0,
    bachelorParties: 0,
    festivalCelebrations: 0,

    // Step 7
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    portfolio: "",
    legalRightToWork: false,
    cleanCriminalRecord: false,
    noPendingCases: false,
    backgroundVerification: false,
    alcoholServiceLaws: false,
    ageVerification: false,
    responsibleServiceTraining: false,

    // Step 8
    awards: "",
    mediaCoverage: "",
    notableEvents: "",
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/bartender/questionnaire/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Questionnaire submitted successfully:", responseData);
        setTimeout(() => {
          localStorage.setItem("bartender-profile", JSON.stringify(formData));
          localStorage.setItem("bartender-logged-in", "true");
          toast({
            title: "Waiting for admin approval",
            description: "Your profile has been submitted and is under review.",
            className:
              "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50",
          });
          navigate("/dashboard");
        }, 1000);
      } else {
        console.error("Questionnaire submission failed:", response.statusText);
        // Handle error appropriately, e.g., show a message to the user
      }
    } catch (error) {
      console.error(
        "An error occurred during questionnaire submission:",
        error
      );
      // Handle error appropriately, e.g., show a message to the user
    }
    // Simulate API call
    setTimeout(() => {
      localStorage.setItem("bartender-profile", JSON.stringify(formData));
      localStorage.setItem("bartender-logged-in", "true");
      toast({
        title: "Waiting for admin approval",
        description: "Your profile has been submitted and is under review.",
        className:
          "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50",
      });
      navigate("/dashboard");
    }, 1000);
  };

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const stepTitles = [
    "Personal Information & Identity Verification",
    "PROFESSIONAL QUALIFICATIONS",
    "WORK EXPERIENCE & PROFESSIONAL BACKGROUND",
    "BARTENDING SKILLS & EXPERTISE ASSESSMENT",
    "PROFESSIONAL EQUIPMENT & TOOLS",
    "LANGUAGE & COMMUNICATION SKILLS",
    "SOCIAL MEDIA & ONLINE PRESENCE and LEGAL & COMPLIANCE",
    "ADDITIONAL INFORMATION",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4 flex items-center justify-center">
      <div className="w-full max-w-3xl">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              {stepTitles[currentStep - 1]}
            </CardTitle>
            <CardDescription>
              Step {currentStep} of 8 - Please provide your details
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-center">
                  Basic Personal Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="fullName">Full Legal Name</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          fullName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dob: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          age: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                      value={formData.gender}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, gender: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">
                          Prefer not to say
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="nationality">Nationality</Label>
                    <Input
                      id="nationality"
                      value={formData.nationality}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          nationality: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="primaryContact">
                      Primary Contact Number
                    </Label>
                    <Input
                      id="primaryContact"
                      value={formData.primaryContact}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          primaryContact: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="whatsappNumber">
                      WhatsApp Number (if different)
                    </Label>
                    <Input
                      id="whatsappNumber"
                      value={formData.whatsappNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          whatsappNumber: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="currentAddress">
                    Current Residential Address
                  </Label>
                  <Textarea
                    id="currentAddress"
                    value={formData.currentAddress}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        currentAddress: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="pinCode">PIN Code</Label>
                    <Input
                      id="pinCode"
                      value={formData.pinCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pinCode: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="permanentAddress">
                    Permanent Address (if different)
                  </Label>
                  <Textarea
                    id="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        permanentAddress: e.target.value,
                      }))
                    }
                  />
                </div>

                <h3 className="text-lg font-semibold text-center">
                  Identity Documentation
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="aadhaar">Aadhaar Number</Label>
                    <Input
                      id="aadhaar"
                      value={formData.aadhaar}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          aadhaar: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="pan">PAN Card Number</Label>
                    <Input
                      id="pan"
                      value={formData.pan}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          pan: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="passport">
                      Passport Number (if applicable)
                    </Label>
                    <Input
                      id="passport"
                      value={formData.passport}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          passport: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="drivingLicense">
                      Driving License Number
                    </Label>
                    <Input
                      id="drivingLicense"
                      value={formData.drivingLicense}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          drivingLicense: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="otherId">Other Government ID</Label>
                    <Input
                      id="otherId"
                      value={formData.otherId}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          otherId: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-center">
                  Emergency Contact Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="emergencyContactName">
                      Emergency Contact Name
                    </Label>
                    <Input
                      id="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          emergencyContactName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContactRelationship">
                      Relationship
                    </Label>
                    <Input
                      id="emergencyContactRelationship"
                      value={formData.emergencyContactRelationship}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          emergencyContactRelationship: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="emergencyContactPhone">Phone Number</Label>
                    <Input
                      id="emergencyContactPhone"
                      value={formData.emergencyContactPhone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          emergencyContactPhone: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="emergencyContactAddress">Address</Label>
                  <Textarea
                    id="emergencyContactAddress"
                    value={formData.emergencyContactAddress}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        emergencyContactAddress: e.target.value,
                      }))
                    }
                  />
                </div>

                <Button onClick={nextStep} className="w-full">
                  Next Step
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-center">
                  Hospitality & Bartending Education
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>Formal Bartending Course Completed</Label>
                    <RadioGroup
                      value={formData.bartendingCourseCompleted}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          bartendingCourseCompleted: value,
                        }))
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {formData.bartendingCourseCompleted === "yes" && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="courseInstitution">
                          Institution/School Name
                        </Label>
                        <Input
                          id="courseInstitution"
                          value={formData.courseInstitution}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              courseInstitution: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="courseName">Course Name</Label>
                        <Input
                          id="courseName"
                          value={formData.courseName}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              courseName: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="courseDuration">Duration</Label>
                        <Input
                          id="courseDuration"
                          value={formData.courseDuration}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              courseDuration: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="courseYear">Year of Completion</Label>
                        <Input
                          id="courseYear"
                          value={formData.courseYear}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              courseYear: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="courseGrade">Grade/Certification</Label>
                        <Input
                          id="courseGrade"
                          value={formData.courseGrade}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              courseGrade: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="courseSpecializations">
                          Specializations
                        </Label>
                        <Input
                          id="courseSpecializations"
                          value={formData.courseSpecializations}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              courseSpecializations: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-center">
                  Professional Certifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="responsibleBeverageCertificate"
                      checked={formData.responsibleBeverageCertificate}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          responsibleBeverageCertificate: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="responsibleBeverageCertificate">
                      Responsible Beverage Service Certificate
                    </Label>
                  </div>
                  {formData.responsibleBeverageCertificate && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
                      <div>
                        <Label htmlFor="responsibleBeverageAuthority">
                          Issuing Authority
                        </Label>
                        <Input
                          id="responsibleBeverageAuthority"
                          value={formData.responsibleBeverageAuthority}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              responsibleBeverageAuthority: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="responsibleBeverageValidity">
                          Validity Date
                        </Label>
                        <Input
                          id="responsibleBeverageValidity"
                          type="date"
                          value={formData.responsibleBeverageValidity}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              responsibleBeverageValidity: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="foodSafetyCertificate"
                      checked={formData.foodSafetyCertificate}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          foodSafetyCertificate: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="foodSafetyCertificate">
                      Food Safety & Hygiene Certification
                    </Label>
                  </div>
                  {formData.foodSafetyCertificate && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
                      <div>
                        <Label htmlFor="foodSafetyAuthority">
                          Issuing Authority
                        </Label>
                        <Input
                          id="foodSafetyAuthority"
                          value={formData.foodSafetyAuthority}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              foodSafetyAuthority: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="foodSafetyValidity">
                          Validity Date
                        </Label>
                        <Input
                          id="foodSafetyValidity"
                          type="date"
                          value={formData.foodSafetyValidity}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              foodSafetyValidity: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="flrCourse"
                      checked={formData.flrCourse}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          flrCourse: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="flrCourse">
                      Foreign Liquor Register (FLR) Course
                    </Label>
                  </div>
                  {formData.flrCourse && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
                      <div>
                        <Label htmlFor="flrCompletionDate">
                          Completion Date
                        </Label>
                        <Input
                          id="flrCompletionDate"
                          type="date"
                          value={formData.flrCompletionDate}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              flrCompletionDate: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="sommelierCertificate"
                      checked={formData.sommelierCertificate}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          sommelierCertificate: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="sommelierCertificate">
                      Sommelier Certification
                    </Label>
                  </div>
                  {formData.sommelierCertificate && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
                      <div>
                        <Label htmlFor="sommelierLevel">Level</Label>
                        <Input
                          id="sommelierLevel"
                          value={formData.sommelierLevel}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              sommelierLevel: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="sommelierBody">Issuing Body</Label>
                        <Input
                          id="sommelierBody"
                          value={formData.sommelierBody}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              sommelierBody: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="otherCertifications"
                      checked={formData.otherCertifications}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          otherCertifications: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="otherCertifications">
                      Other Hospitality Certifications
                    </Label>
                  </div>
                  {formData.otherCertifications && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6">
                      <div>
                        <Label htmlFor="otherCertificateName">
                          Certificate Name
                        </Label>
                        <Input
                          id="otherCertificateName"
                          value={formData.otherCertificateName}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              otherCertificateName: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="otherCertificateAuthority">
                          Issuing Authority
                        </Label>
                        <Input
                          id="otherCertificateAuthority"
                          value={formData.otherCertificateAuthority}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              otherCertificateAuthority: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="otherCertificateValidity">
                          Validity
                        </Label>
                        <Input
                          id="otherCertificateValidity"
                          value={formData.otherCertificateValidity}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              otherCertificateValidity: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1"
                  >
                    Previous Step
                  </Button>
                  <Button onClick={nextStep} className="flex-1">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-center">
                  Total Bartending Experience
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="experienceYears">Years of Experience</Label>
                    <Input
                      id="experienceYears"
                      type="number"
                      value={formData.experienceYears}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          experienceYears: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="experienceMonths">
                      Months of Experience
                    </Label>
                    <Input
                      id="experienceMonths"
                      type="number"
                      value={formData.experienceMonths}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          experienceMonths: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Experience Level</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        experienceLevel: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">
                        Beginner (0-1 years)
                      </SelectItem>
                      <SelectItem value="intermediate">
                        Intermediate (1-3 years)
                      </SelectItem>
                      <SelectItem value="experienced">
                        Experienced (3-5 years)
                      </SelectItem>
                      <SelectItem value="expert">Expert (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <h3 className="text-lg font-semibold text-center">
                  Previous Employment History (List last 3 positions)
                </h3>
                <h4 className="text-md font-semibold">
                  Position 1: Most Recent
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="jobTitle1">Job Title</Label>
                    <Input
                      id="jobTitle1"
                      value={formData.jobTitle1}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          jobTitle1: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="company1">Company/Venue Name</Label>
                    <Input
                      id="company1"
                      value={formData.company1}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          company1: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div>
                  <Label>Venue Type</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                    {[
                      "Restaurant",
                      "Bar/Pub",
                      "Hotel",
                      "Club/Lounge",
                      "Event Catering",
                      "Cruise Ship",
                      "Wedding/Event Venue",
                    ].map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`venueType1-${type}`}
                          checked={formData.venueType1 === type}
                          onCheckedChange={() =>
                            setFormData((prev) => ({
                              ...prev,
                              venueType1: type,
                            }))
                          }
                        />
                        <Label htmlFor={`venueType1-${type}`}>{type}</Label>
                      </div>
                    ))}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="venueType1-Other"
                        checked={formData.venueType1 === "Other"}
                        onCheckedChange={() =>
                          setFormData((prev) => ({
                            ...prev,
                            venueType1: "Other",
                          }))
                        }
                      />
                      <Label htmlFor="venueType1-Other">Other</Label>
                      {formData.venueType1 === "Other" && (
                        <Input
                          placeholder="Please specify"
                          value={formData.otherVenueType1}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              otherVenueType1: e.target.value,
                            }))
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <Label htmlFor="responsibilities1">
                    Key Responsibilities
                  </Label>
                  <Textarea
                    id="responsibilities1"
                    value={formData.responsibilities1}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        responsibilities1: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1"
                  >
                    Previous Step
                  </Button>
                  <Button onClick={nextStep} className="flex-1">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-center">
                  Mixology Skills & Knowledge
                </h3>
                <p className="text-sm text-center text-muted-foreground">
                  Rate your proficiency (1-5 scale: 1=Beginner, 5=Expert)
                </p>

                <div className="space-y-4">
                  <h4 className="text-md font-semibold">
                    Classic Cocktails Preparation
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Old Fashioned</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            oldFashioned: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Manhattan</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            manhattan: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Martini (Gin/Vodka)</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            martini: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Mojito</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            mojito: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Margarita</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            margarita: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Cosmopolitan</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            cosmopolitan: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Whiskey Sour</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            whiskeySour: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Daiquiri</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            daiquiri: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-md font-semibold">
                    Contemporary/Craft Cocktails
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Molecular Mixology</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            molecularMixology: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Smoked Cocktails</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            smokedCocktails: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Craft/Artisanal Cocktails</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            craftArtisanalCocktails: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Seasonal/Fresh Ingredient Cocktails</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            seasonalFreshIngredientCocktails: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-md font-semibold">
                    Indian/Regional Specialties
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Masala Chai Cocktails</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            masalaChaiCocktails: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Spiced Indian Cocktails</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            spicedIndianCocktails: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Regional Fusion Drinks</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            regionalFusionDrinks: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Traditional Indian Beverages</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            traditionalIndianBeverages: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your skill" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-center">
                  Flair Bartending & Presentation Skills
                </h3>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="flairBartending"
                    checked={formData.flairBartending}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        flairBartending: !!checked,
                      }))
                    }
                  />
                  <Label htmlFor="flairBartending">
                    Flair Bartending Experience
                  </Label>
                </div>
                {formData.flairBartending && (
                  <div className="space-y-4 pl-6">
                    <h4 className="text-md font-semibold">
                      If Yes, rate your skill level:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label>Basic Flair (Simple Bottle Flips)</Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              basicFlair: parseInt(value),
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Rate your skill" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Intermediate Flair (Working Flair)</Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              intermediateFlair: parseInt(value),
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Rate your skill" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Advanced Flair (Exhibition Flair)</Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              advancedFlair: parseInt(value),
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Rate your skill" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Fire Flair/Flaming Cocktails</Label>
                        <Select
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              fireFlair: parseInt(value),
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Rate your skill" />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5].map((i) => (
                              <SelectItem key={i} value={i.toString()}>
                                {i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="formalFlairTraining"
                        checked={formData.formalFlairTraining}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            formalFlairTraining: !!checked,
                          }))
                        }
                      />
                      <Label htmlFor="formalFlairTraining">
                        Formal Flair Training
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="competitionParticipation"
                        checked={formData.competitionParticipation}
                        onCheckedChange={(checked) =>
                          setFormData((prev) => ({
                            ...prev,
                            competitionParticipation: !!checked,
                          }))
                        }
                      />
                      <Label htmlFor="competitionParticipation">
                        Competition Participation
                      </Label>
                    </div>
                    <div>
                      <Label htmlFor="awardsRecognition">
                        Awards/Recognition
                      </Label>
                      <Input
                        id="awardsRecognition"
                        value={formData.awardsRecognition}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            awardsRecognition: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-center">
                  Beverage Knowledge & Expertise
                </h3>
                <p className="text-sm text-center text-muted-foreground">
                  Rate your knowledge (1-5 scale)
                </p>

                <div className="space-y-4">
                  <h4 className="text-md font-semibold">Spirits Knowledge</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Whiskey/Scotch/Bourbon</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            whiskeyScotchBourbon: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Vodka</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            vodka: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Gin</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            gin: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Rum</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            rum: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Tequila</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            tequila: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Brandy/Cognac</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            brandyCognac: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Liqueurs</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            liqueurs: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-md font-semibold">Wine Knowledge</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Red Wine</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            redWine: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>White Wine</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            whiteWine: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Sparkling Wine/Champagne</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            sparklingWineChampagne: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Wine Pairing</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            winePairing: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-md font-semibold">Beer Knowledge</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label>Lager</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            lager: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Ale</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            ale: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Craft Beer</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            craftBeer: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>International Beers</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            internationalBeers: parseInt(value),
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Rate your knowledge" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <SelectItem key={i} value={i.toString()}>
                              {i}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1"
                  >
                    Previous Step
                  </Button>
                  <Button onClick={nextStep} className="flex-1">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-center">
                  Personal Bartending Kit Available
                </h3>
                <div>
                  <Label>Complete Professional Kit</Label>
                  <RadioGroup
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        professionalKit: value === "true",
                      }))
                    }
                    className="flex items-center space-x-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="kit-yes" />
                      <Label htmlFor="kit-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="kit-no" />
                      <Label htmlFor="kit-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
                {formData.professionalKit && (
                  <div className="space-y-4 pl-6">
                    <h4 className="text-md font-semibold">
                      If Yes, please specify items you own:
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="shakerSet"
                          checked={formData.shakerSet}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              shakerSet: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="shakerSet">Cocktail Shaker Set</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="jigger"
                          checked={formData.jigger}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              jigger: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="jigger">Jigger/Measuring Tools</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="barSpoons"
                          checked={formData.barSpoons}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              barSpoons: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="barSpoons">Bar Spoons</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="muddler"
                          checked={formData.muddler}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              muddler: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="muddler">Muddler</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="strainer"
                          checked={formData.strainer}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              strainer: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="strainer">Strainer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="fineMeshStrainer"
                          checked={formData.fineMeshStrainer}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              fineMeshStrainer: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="fineMeshStrainer">
                          Fine Mesh Strainer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="channelKnife"
                          checked={formData.channelKnife}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              channelKnife: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="channelKnife">
                          Channel Knife/Peeler
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="citrusJuicer"
                          checked={formData.citrusJuicer}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              citrusJuicer: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="citrusJuicer">Citrus Juicer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="bottleOpener"
                          checked={formData.bottleOpener}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              bottleOpener: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="bottleOpener">Bottle Opener</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="corkscrew"
                          checked={formData.corkscrew}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              corkscrew: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="corkscrew">Corkscrew/Wine Opener</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="cuttingBoard"
                          checked={formData.cuttingBoard}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              cuttingBoard: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="cuttingBoard">Cutting Board</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="paringKnife"
                          checked={formData.paringKnife}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              paringKnife: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="paringKnife">Sharp Paring Knife</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="iceBucket"
                          checked={formData.iceBucket}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              iceBucket: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="iceBucket">Ice Bucket/Tongs</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pourSpouts"
                          checked={formData.pourSpouts}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              pourSpouts: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="pourSpouts">Pour Spouts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="garnishContainers"
                          checked={formData.garnishContainers}
                          onCheckedChange={(checked) =>
                            setFormData((prev) => ({
                              ...prev,
                              garnishContainers: !!checked,
                            }))
                          }
                        />
                        <Label htmlFor="garnishContainers">
                          Garnish Containers
                        </Label>
                      </div>
                    </div>
                  </div>
                )}

                <h3 className="text-lg font-semibold text-center">
                  Specialized Equipment
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="smokingGun"
                      checked={formData.smokingGun}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          smokingGun: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="smokingGun">Smoking Gun</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="molecularMixologyTools"
                      checked={formData.molecularMixologyTools}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          molecularMixologyTools: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="molecularMixologyTools">
                      Molecular Mixology Tools
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="immersionBlender"
                      checked={formData.immersionBlender}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          immersionBlender: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="immersionBlender">Immersion Blender</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="centrifuge"
                      checked={formData.centrifuge}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          centrifuge: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="centrifuge">Centrifuge</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="liquidNitrogen"
                      checked={formData.liquidNitrogen}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          liquidNitrogen: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="liquidNitrogen">
                      Liquid Nitrogen Equipment
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="carbonationSystem"
                      checked={formData.carbonationSystem}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          carbonationSystem: !!checked,
                        }))
                      }
                    />
                    <Label htmlFor="carbonationSystem">
                      Carbonation System
                    </Label>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-center">
                  Transportation & Mobility
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>Own Vehicle for Equipment Transport</Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          ownVehicle: value === "true",
                        }))
                      }
                      className="flex items-center space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="vehicle-yes" />
                        <Label htmlFor="vehicle-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="vehicle-no" />
                        <Label htmlFor="vehicle-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {formData.ownVehicle && (
                    <div className="pl-6">
                      <Label>Vehicle Type</Label>
                      <RadioGroup
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            vehicleType: value,
                          }))
                        }
                        className="flex items-center space-x-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="car" id="car" />
                          <Label htmlFor="car">Car</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            value="two-wheeler"
                            id="two-wheeler"
                          />
                          <Label htmlFor="two-wheeler">Two-wheeler</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                  <div>
                    <Label>Willing to Travel with Kit</Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          willingToTravel: value === "true",
                        }))
                      }
                      className="flex items-center space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="travel-yes" />
                        <Label htmlFor="travel-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="travel-no" />
                        <Label htmlFor="travel-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {formData.willingToTravel && (
                    <div className="pl-6">
                      <Label htmlFor="maxTravelDistance">
                        Maximum Travel Distance (km)
                      </Label>
                      <Input
                        id="maxTravelDistance"
                        type="number"
                        value={formData.maxTravelDistance}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            maxTravelDistance: e.target.value,
                          }))
                        }
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1"
                  >
                    Previous Step
                  </Button>
                  <Button onClick={nextStep} className="flex-1">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-center">
                  Language Proficiency
                </h3>
                <p className="text-sm text-center text-muted-foreground">
                  Rate your proficiency (1-5 scale: 1=Basic, 5=Fluent)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Marathi</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          marathi: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Hindi</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          hindi: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>English</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          english: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Other Language"
                      value={formData.otherLanguage}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          otherLanguage: e.target.value,
                        }))
                      }
                    />
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          otherLanguageProficiency: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate proficiency" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-center">
                  Event Type Preferences
                </h3>
                <p className="text-sm text-center text-muted-foreground">
                  Rate your preference (1-5 scale: 1=Not Interested, 5=Highly
                  Preferred)
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label>Private House Parties</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          privateParties: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Wedding Receptions</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          weddingReceptions: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Corporate Events</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          corporateEvents: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Birthday Parties</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          birthdayParties: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Anniversary Celebrations</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          anniversaryCelebrations: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Cocktail Parties</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          cocktailParties: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Bachelor/Bachelorette Parties</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          bachelorParties: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Festival Celebrations</Label>
                    <Select
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          festivalCelebrations: parseInt(value),
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Rate your preference" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1"
                  >
                    Previous Step
                  </Button>
                  <Button onClick={nextStep} className="flex-1">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-center">
                  Social Media & Online Presence
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="instagram">Instagram Handle</Label>
                    <Input
                      id="instagram"
                      value={formData.instagram}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          instagram: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="facebook">Facebook Profile</Label>
                    <Input
                      id="facebook"
                      value={formData.facebook}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          facebook: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input
                      id="linkedin"
                      value={formData.linkedin}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          linkedin: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="youtube">YouTube Channel</Label>
                    <Input
                      id="youtube"
                      value={formData.youtube}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          youtube: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="portfolio">Portfolio Website</Label>
                    <Input
                      id="portfolio"
                      value={formData.portfolio}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          portfolio: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-center">
                  Legal & Compliance
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>Legal Right to Work in India</Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          legalRightToWork: value === "true",
                        }))
                      }
                      className="flex items-center space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="legal-yes" />
                        <Label htmlFor="legal-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="legal-no" />
                        <Label htmlFor="legal-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label>Clean Criminal Record</Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          cleanCriminalRecord: value === "true",
                        }))
                      }
                      className="flex items-center space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="criminal-yes" />
                        <Label htmlFor="criminal-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="criminal-no" />
                        <Label htmlFor="criminal-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label>No Pending Legal Cases</Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          noPendingCases: value === "true",
                        }))
                      }
                      className="flex items-center space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="pending-yes" />
                        <Label htmlFor="pending-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="pending-no" />
                        <Label htmlFor="pending-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label>Willing to Undergo Background Verification</Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          backgroundVerification: value === "true",
                        }))
                      }
                      className="flex items-center space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="background-yes" />
                        <Label htmlFor="background-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="background-no" />
                        <Label htmlFor="background-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-center">
                  Compliance Understanding
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label>Understanding of Alcohol Service Laws</Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          alcoholServiceLaws: value === "true",
                        }))
                      }
                      className="flex items-center space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="laws-yes" />
                        <Label htmlFor="laws-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="laws-no" />
                        <Label htmlFor="laws-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label>Knowledge of Age Verification Requirements</Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          ageVerification: value === "true",
                        }))
                      }
                      className="flex items-center space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="age-yes" />
                        <Label htmlFor="age-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="age-no" />
                        <Label htmlFor="age-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label>Responsible Service Training</Label>
                    <RadioGroup
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          responsibleServiceTraining: value === "true",
                        }))
                      }
                      className="flex items-center space-x-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="training-yes" />
                        <Label htmlFor="training-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="training-no" />
                        <Label htmlFor="training-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1"
                  >
                    Previous Step
                  </Button>
                  <Button onClick={nextStep} className="flex-1">
                    Next Step
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 8 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-center">
                  Special Achievements
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="awards">Awards/Recognition</Label>
                    <Textarea
                      id="awards"
                      value={formData.awards}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          awards: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="mediaCoverage">Media Coverage</Label>
                    <Textarea
                      id="mediaCoverage"
                      value={formData.mediaCoverage}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          mediaCoverage: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="notableEvents">Notable Events Worked</Label>
                    <Textarea
                      id="notableEvents"
                      value={formData.notableEvents}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          notableEvents: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1"
                  >
                    Previous Step
                  </Button>
                  <Button onClick={handleSubmit} className="flex-1">
                    Submit for Review
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
