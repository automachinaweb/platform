const Booking = require('../models/booking.model');

// This function handles the creation of a new booking.
exports.createBooking = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            alternativePhone,
            whatsappNumber,
            onSiteContactPerson,
            contactPhone,
            relationshipToHost,
            eventType,
            eventTypeOther,
            eventDate,
            eventStartTime,
            eventEndTime,
            barServiceDuration,
            totalGuests,
            adultGuests,
            minorGuests,
            peakBarUsageStartTime,
            peakBarUsageEndTime,
            eventTheme,
            preferredAtmosphere,
            fullAddress,
            city,
            state,
            pinCode,
            landmark,
            venueType,
            venueTypeOther,
            parkingAvailable,
            parkingType,
            elevatorAccess,
            floorNumber,
            specialEntryInstructions,
            preferredBarLocation,
            preferredBarLocationOther,
            barTableAvailable,
            arrangeTemporarySetup,
            powerOutletAvailable,
            waterSourceAvailable,
            distanceToWaterPoint,
            sinkAvailable,
            wineGlassesAvailable,
            wineGlassesQuantity,
            beerMugsAvailable,
            beerMugsQuantity,
            whiskeyGlassesAvailable,
            whiskeyGlassesQuantity,
            shotGlassesAvailable,
            champagneFlutesAvailable,
            champagneFlutesQuantity,
            cocktailGlassesAvailable,
            cocktailGlassesQuantity,
            highballGlassesAvailable,
            highballGlassesQuantity,
            margaritaGlassesAvailable,
            margaritaGlassesQuantity,
            disposableOptionsAvailable,
            cocktailShakerAvailable,
            barSpoonsAvailable,
            muddlerAvailable,
            jiggerAvailable,
            strainerAvailable,
            bottleOpenerAvailable,
            corkscrewAvailable,
            cuttingBoardAvailable,
            sharpKnifeAvailable,
            refrigeratorAccess,
            freezerAccess,
            iceBucketsAvailable,
            iceBucketsQuantity,
            coolersAvailable,
            coolersQuantity,
            servingTraysAvailable,
            servingTraysQuantity,
            largeTraysAvailable,
            smallCocktailTraysAvailable,
            antiSlipTraysAvailable,
            cocktailNapkinsAvailable,
            coastersAvailable,
            iceTongsAvailable,
            servingSpoonsAvailable,
            freshFruitsAvailable,
            lemonsAvailable,
            lemonsQuantity,
            limesAvailable,
            orangesAvailable,
            orangesQuantity,
            otherFruitsAvailable,
            otherFruitsSpecify,
            cherriesAvailable,
            mintLeavesAvailable,
            cucumberAvailable,
            olivesAvailable,
            softDrinksAvailable,
            cokePepsiAvailable,
            sprite7upAvailable,
            sprite7upQuantity,
            otherSodasAvailable,
            otherSodasSpecify,
            tonicWaterAvailable,
            tonicWaterQuantity,
            sodaWaterAvailable,
            sodaWaterQuantity,
            gingerAleAvailable,
            gingerAleQuantity,
            freshJuicesAvailable,
            freshJuicesSpecify,
            regularWaterAvailable,
            regularWaterQuantity,
            sparklingWaterAvailable,
            sparklingWaterQuantity,
            specificRequirementsAvailable,
            specificRequirementsSpecify,
            signatureCocktailDesired,
            preferredCocktails,
            customCocktailRequest,
            sugarFreeOptionsRequired,
            lowAlcoholMocktailOptions,
            religiousCulturalRestrictions,
            allergyConsiderations,
            preferredAttire,
            themedAttireSpecify,
            languagePreferences,
            regionalLanguageSpecify,
        } = req.body;

        // A new booking is created with the data from the request body.
        const savedBooking = await Booking.create({
            userId: req.user.userId,
            name,
            email,
            phone,
            alternativePhone,
            whatsappNumber,
            onSiteContactPerson,
            contactPhone,
            relationshipToHost,
            eventType,
            eventTypeOther,
            eventDate,
            eventStartTime,
            eventEndTime,
            barServiceDuration,
            totalGuests,
            adultGuests,
            minorGuests,
            peakBarUsageStartTime,
            peakBarUsageEndTime,
            eventTheme,
            preferredAtmosphere,
            fullAddress,
            city,
            state,
            pinCode,
            landmark,
            venueType,
            venueTypeOther,
            parkingAvailable,
            parkingType,
            elevatorAccess,
            floorNumber,
            specialEntryInstructions,
            preferredBarLocation,
            preferredBarLocationOther,
            barTableAvailable,
            arrangeTemporarySetup,
            powerOutletAvailable,
            waterSourceAvailable,
            distanceToWaterPoint,
            sinkAvailable,
            wineGlassesAvailable,
            wineGlassesQuantity,
            beerMugsAvailable,
            beerMugsQuantity,
            whiskeyGlassesAvailable,
            whiskeyGlassesQuantity,
            shotGlassesAvailable,
            champagneFlutesAvailable,
            champagneFlutesQuantity,
            cocktailGlassesAvailable,
            cocktailGlassesQuantity,
            highballGlassesAvailable,
            highballGlassesQuantity,
            margaritaGlassesAvailable,
            margaritaGlassesQuantity,
            disposableOptionsAvailable,
            cocktailShakerAvailable,
            barSpoonsAvailable,
            muddlerAvailable,
            jiggerAvailable,
            strainerAvailable,
            bottleOpenerAvailable,
            corkscrewAvailable,
            cuttingBoardAvailable,
            sharpKnifeAvailable,
            refrigeratorAccess,
            freezerAccess,
            iceBucketsAvailable,
            iceBucketsQuantity,
            coolersAvailable,
            coolersQuantity,
            servingTraysAvailable,
            servingTraysQuantity,
            largeTraysAvailable,
            smallCocktailTraysAvailable,
            antiSlipTraysAvailable,
            cocktailNapkinsAvailable,
            coastersAvailable,
            iceTongsAvailable,
            servingSpoonsAvailable,
            freshFruitsAvailable,
            lemonsAvailable,
            lemonsQuantity,
            limesAvailable,
            orangesAvailable,
            orangesQuantity,
            otherFruitsAvailable,
            otherFruitsSpecify,
            cherriesAvailable,
            mintLeavesAvailable,
            cucumberAvailable,
            olivesAvailable,
            softDrinksAvailable,
            cokePepsiAvailable,
            sprite7upAvailable,
            sprite7upQuantity,
            otherSodasAvailable,
            otherSodasSpecify,
            tonicWaterAvailable,
            tonicWaterQuantity,
            sodaWaterAvailable,
            sodaWaterQuantity,
            gingerAleAvailable,
            gingerAleQuantity,
            freshJuicesAvailable,
            freshJuicesSpecify,
            regularWaterAvailable,
            regularWaterQuantity,
            sparklingWaterAvailable,
            sparklingWaterQuantity,
            specificRequirementsAvailable,
            specificRequirementsSpecify,
            signatureCocktailDesired,
            preferredCocktails,
            customCocktailRequest,
            sugarFreeOptionsRequired,
            lowAlcoholMocktailOptions,
            religiousCulturalRestrictions,
            allergyConsiderations,
            preferredAttire,
            themedAttireSpecify,
            languagePreferences,
            regionalLanguageSpecify,
        });
        // The saved booking is sent back as a response.
        res.status(201).json(savedBooking);
    } catch (error) {
        // If there is an error, a 500 status code is sent back with an error message.
        res.status(500).json({ message: error.message });
    }
};

// This function handles the retrieval of all bookings.
exports.getAllBookings = async (req, res) => {
    try {
        // All bookings are retrieved from the database.
        const bookings = await Booking.findAll();
        // The bookings are sent back as a response.
        res.status(200).json(bookings);
    } catch (error) {
        // If there is an error, a 500 status code is sent back with an error message.
        res.status(500).json({ message: error.message });
    }
};

// This function handles the retrieval of a single booking by its ID.
exports.getBookingById = async (req, res) => {
    try {
        // The booking is retrieved from the database by its ID.
        const booking = await Booking.findByPk(req.params.id);
        // If the booking is not found, a 404 status code is sent back with an error message.
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        // The booking is sent back as a response.
        res.status(200).json(booking);
    } catch (error) {
        // If there is an error, a 500 status code is sent back with an error message.
        res.status(500).json({ message: error.message });
    }
};

// NEW: Initiate a Booking Request to a specific Bartender
exports.initiateRequest = async (req, res) => {
    try {
        const { bookingId, bartenderId, offeredAmount } = req.body;
        
        // 1. Fetch the original Booking details
        const originalBooking = await Booking.findByPk(bookingId);
        if (!originalBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // 2. Create the Request
        // Note: Using the shared `booking_requests` table
        const BookingRequest = require('../models/bookingRequest.model');
        
        const newRequest = await BookingRequest.create({
            userId: req.user.userId,
            bartenderId,
            originalBookingId: bookingId,
            eventType: originalBooking.eventType,
            eventDate: originalBooking.eventDate,
            startTime: originalBooking.eventStartTime,
            endTime: originalBooking.eventEndTime,
            location: `${originalBooking.city}, ${originalBooking.state}`, // Construct location
            guestCount: originalBooking.totalGuests,
            offeredAmount: offeredAmount || 150.00, // Default or mock reasoning
            status: 'PENDING'
        });

        res.status(201).json({ message: "Request sent successfully", request: newRequest });

    } catch (error) {
        console.error("Error initiating request:", error);
        res.status(500).json({ message: error.message });
    }
};

// NEW: Get Messages for a Booking (Chat History)
exports.getMessages = async (req, res) => {
    try {
        const { id } = req.params; // Booking ID
        
        const Message = require('../models/message.model');
        const messages = await Message.findAll({
            where: { bookingId: id },
            order: [['createdAt', 'ASC']]
        });
        
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: error.message });
    }
};

// NEW: Seed Test Data (For Development Use Only)
exports.seedTestBooking = async (req, res) => {
    try {
        const BookingRequest = require('../models/bookingRequest.model');
        const Bartender = require('../models/bartender.model');

        // 1. Ensure Bartender 1 exists
        let bartender = await Bartender.findByPk(1);
        if (!bartender) {
            bartender = await Bartender.create({
                email: 'bartender@test.com',
                password: 'password', // weak hash
                name: 'Test Bartender',
                phone: '1234567890'
            });
        }

        // 2. Ensure Booking Request 1 exists
        let request = await BookingRequest.findByPk(1);
        if (!request) {
            request = await BookingRequest.create({
                userId: 1, // Assumes user 1 exists
                bartenderId: bartender.id,
                eventType: 'Birthday',
                eventDate: new Date(),
                startTime: '18:00',
                endTime: '22:00',
                location: 'Test City',
                guestCount: 50,
                status: 'PENDING'
            });
        }

        res.json({ message: 'Seeded successfully', bookingId: request.id, bartenderId: bartender.id });
    } catch (error) {
        console.error("Seeding error:", error);
        res.status(500).json({ message: error.message });
    }
};
