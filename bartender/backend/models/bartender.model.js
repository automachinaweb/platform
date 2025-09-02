const mongoose = require('mongoose');

const bartenderSchema = new mongoose.Schema({
    // Basic Info (from auth)
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true },
    phone_number: { type: String, required: true },
    role: { type: String, default: 'BARTENDER' },

    // Experience & Expertise
    yearsOfExperience: { 
        type: String, 
        required: true,
        enum: ['0-2 years', '2-5 years', '5-10 years', '10+ years']
    },
    specialties: [{
        type: String,
        enum: [
            'Classic Cocktails',
            'Craft Cocktails',
            'Wine Service',
            'Beer Expert',
            'Molecular Mixology',
            'Tiki Cocktails',
            'Corporate Events',
            'Wedding Events',
            'Private Events'
        ]
    }],
    certifications: { type: String },

    // Rates & Availability
    hourlyRate: { type: Number, required: true },
    serviceLocation: { type: String, required: true },
    availability: [{
        type: String,
        enum: [
            'Weekday Evenings',
            'Weekend Evenings',
            'Weekend Days',
            'Corporate Events',
            'Private Events',
            'Wedding Events',
            'Holiday Events'
        ]
    }],

    // Professional Details
    professionalBio: { type: String, required: true },
    portfolioUrl: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model('Bartender', bartenderSchema);
