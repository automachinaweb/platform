const mongoose = require('mongoose');

const QuestionnaireSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: String,
        required: true,
        enum: ['1-2 years', '3-5 years', '6-10 years', '10+ years']
    },
    specialties: {
        type: [String],
        enum: [
            'Classic Cocktails',
            'Craft Cocktails',
            'Wine Service',
            'Beer Expert',
            'Molecular Mixology',
            'Tiki Cocktails',
            'Corporate Events',
            'Wedding Receptions'
        ]
    },
    certifications: {
        type: String
    },
    hourlyRate: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    availability: {
        type: [String],
        enum: [
            'Weekday Evenings',
            'Weekend Days',
            'Weekend Evenings',
            'Corporate Events',
            'Private Parties',
            'Holiday Events'
        ]
    },
    bio: {
        type: String
    },
    portfolio: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Questionnaire', QuestionnaireSchema);
