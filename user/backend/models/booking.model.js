const mongoose = require('mongoose');

// The booking schema is defined here.
const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    eventType: { type: String, required: true, enum: ['Birthday Party', 'Wedding Reception', 'Corporate Event', 'Private Celebration'] },
    duration: { type: String, required: true, enum: ['2-3 hours', '4-5 hours', '6-7 hours', '8+ hours'] },
    guestCount: { type: String, required: true, enum: ['10-25 guests', '26-50 guests', '51-100 guests', '100+ guests'] },
    servicePreferences: {
        drinkPreferences: {
            premiumCocktails: { type: Boolean, default: false },
            wineSelection: { type: Boolean, default: false },
            beerAndSpirits: { type: Boolean, default: false },
            nonAlcoholicOptions: { type: Boolean, default: false },
        },
        serviceAddOns: {
            signatureCocktailCreation: { type: Boolean, default: false },
            drinkMenuConsultation: { type: Boolean, default: false },
            garnishAndDecoration: { type: Boolean, default: false },
            glassRental: { type: Boolean, default: false },
        },
        setupRequirements: {
            fullBarSetup: { type: Boolean, default: false },
            mobileBarCart: { type: Boolean, default: false },
            equipmentRental: { type: Boolean, default: false },
            iceAndMixersIncluded: { type: Boolean, default: false },
        },
    },
    ambianceAndExtras: {
        ambiancePreferences: {
            romanticLighting: { type: Boolean, default: false },
            tropicalTheme: { type: Boolean, default: false },
            vintageVibe: { type: Boolean, default: false },
            minimalistLook: { type: Boolean, default: false },
        },
        musicChoices: {
            liveBand: { type: Boolean, default: false },
            dj: { type: Boolean, default: false },
            softJazz: { type: Boolean, default: false },
            acousticGuitar: { type: Boolean, default: false },
        },
        dressCode: {
            formalBlack: { type: Boolean, default: false },
            casualChic: { type: Boolean, default: false },
            tropicalWear: { type: Boolean, default: false },
            bartendersChoice: { type: Boolean, default: false },
        },
    },
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
