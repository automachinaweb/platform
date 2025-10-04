const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Questionnaire = sequelize.define('Questionnaire', {
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 18
        }
    },
    gender: {
        type: DataTypes.ENUM('male', 'female', 'other', 'prefer-not-to-say'),
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING,
        allowNull: false
    },
    primaryContact: {
        type: DataTypes.STRING,
        allowNull: false
    },
    whatsappNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    currentAddress: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    pinCode: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permanentAddress: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    aadhaar: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    pan: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passport: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    drivingLicense: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    otherId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    emergencyContactName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emergencyContactRelationship: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emergencyContactPhone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emergencyContactAddress: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    bartendingCourseCompleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    courseInstitution: {
        type: DataTypes.STRING,
        allowNull: true
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    courseDuration: {
        type: DataTypes.STRING,
        allowNull: true
    },
    courseYear: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    courseGrade: {
        type: DataTypes.STRING,
        allowNull: true
    },
    courseSpecializations: {
        type: DataTypes.STRING,
        allowNull: true
    },
    responsibleBeverageCertificate: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    responsibleBeverageAuthority: {
        type: DataTypes.STRING,
        allowNull: true
    },
    responsibleBeverageValidity: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    foodSafetyCertificate: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    foodSafetyAuthority: {
        type: DataTypes.STRING,
        allowNull: true
    },
    foodSafetyValidity: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    flrCourse: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    flrCompletionDate: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },
    sommelierCertificate: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    sommelierLevel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sommelierBody: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otherCertifications: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    otherCertificateName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otherCertificateAuthority: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otherCertificateValidity: {
        type: DataTypes.STRING,
        allowNull: true
    },
    experienceYears: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    experienceMonths: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    experienceLevel: {
        type: DataTypes.ENUM('beginner', 'intermediate', 'experienced', 'expert'),
        allowNull: false
    },
    jobTitle1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    company1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    venueType1: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    otherVenueType1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    responsibilities1: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    oldFashioned: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    manhattan: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    martini: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    mojito: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    margarita: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cosmopolitan: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    whiskeySour: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    daiquiri: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    molecularMixology: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    smokedCocktails: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    craftArtisanalCocktails: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    seasonalFreshIngredientCocktails: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    masalaChaiCocktails: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    spicedIndianCocktails: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    regionalFusionDrinks: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    traditionalIndianBeverages: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    flairBartending: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    basicFlair: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    intermediateFlair: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    advancedFlair: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    fireFlair: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    formalFlairTraining: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    competitionParticipation: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    awardsRecognition: {
        type: DataTypes.STRING,
        allowNull: true
    },
    whiskeyScotchBourbon: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    vodka: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    gin: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    rum: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    tequila: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    brandyCognac: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    liqueurs: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    redWine: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    whiteWine: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    sparklingWineChampagne: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    winePairing: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    lager: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    ale: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    craftBeer: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    internationalBeers: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    professionalKit: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    shakerSet: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    jigger: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    barSpoons: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    muddler: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    strainer: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    fineMeshStrainer: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    channelKnife: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    citrusJuicer: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    bottleOpener: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    corkscrew: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    cuttingBoard: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    paringKnife: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    iceBucket: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    pourSpouts: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    garnishContainers: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    smokingGun: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    molecularMixologyTools: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    immersionBlender: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    centrifuge: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    liquidNitrogen: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    carbonationSystem: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    ownVehicle: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    vehicleType: {
        type: DataTypes.ENUM('car', 'two-wheeler', 'other'),
        allowNull: true
    },
    willingToTravel: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    maxTravelDistance: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    marathi: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    hindi: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    english: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    otherLanguage: {
        type: DataTypes.STRING,
        allowNull: true
    },
    otherLanguageProficiency: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    privateParties: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    weddingReceptions: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    corporateEvents: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    birthdayParties: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    anniversaryCelebrations: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    cocktailParties: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    bachelorParties: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    festivalCelebrations: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true
    },
    linkedin: {
        type: DataTypes.STRING,
        allowNull: true
    },
    youtube: {
        type: DataTypes.STRING,
        allowNull: true
    },
    portfolio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    legalRightToWork: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    cleanCriminalRecord: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    noPendingCases: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    backgroundVerification: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    alcoholServiceLaws: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    ageVerification: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    responsibleServiceTraining: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    awards: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    mediaCoverage: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    notableEvents: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'questionnaires',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Questionnaire;
