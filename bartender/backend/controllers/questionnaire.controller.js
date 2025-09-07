const Questionnaire = require('../models/questionnaire.model');
const Bartender = require('../models/bartender.model'); // To fetch name and email

const submitQuestionnaire = async (req, res) => {
    try {
        const { yearsOfExperience, specialties, certifications, hourlyRate, location, availability, bio, portfolio } = req.body;
        const bartenderId = req.userId; // From authentication middleware
        console.log('Questionnaire Controller: received bartenderId:', bartenderId); // Debugging line

        if (!yearsOfExperience) {
            return res.status(400).json({ message: 'Years of experience is required.' });
        }
        // Specialties is an array, so check if it's an array and not empty
        if (!specialties || !Array.isArray(specialties) || specialties.length === 0) {
            return res.status(400).json({ message: 'At least one specialty is required.' });
        }
        // Certifications is optional, so no required check here, but it should be a string if provided
        if (certifications && typeof certifications !== 'string') {
            return res.status(400).json({ message: 'Certifications must be a string.' });
        }
        // Hourly Rate is required and must be a number
        if (typeof hourlyRate !== 'number' || hourlyRate <= 0) {
            return res.status(400).json({ message: 'Valid hourly rate is required.' });
        }
        // Location is required and must be a string
        if (!location || typeof location !== 'string' || location.trim().length === 0) {
            return res.status(400).json({ message: 'Service location is required.' });
        }
        // Availability is an array, so check if it's an array and not empty
        if (!availability || !Array.isArray(availability) || availability.length === 0) {
            return res.status(400).json({ message: 'At least one availability option is required.' });
        }
        // Bio is optional, so no required check here, but it should be a string if provided
        if (bio && typeof bio !== 'string') {
            return res.status(400).json({ message: 'Bio must be a string.' });
        }
        // Portfolio is optional, so no required check here, but it should be a string if provided
        if (portfolio && typeof portfolio !== 'string') {
            return res.status(400).json({ message: 'Portfolio must be a string.' });
        }


        // Fetch bartender's name and email
        const bartender = await Bartender.findById(bartenderId);
        console.log('Questionnaire Controller: Bartender found:', !!bartender); // Debugging line
        if (!bartender) {
            return res.status(404).json({ message: 'Bartender not found.' });
        }

        const questionnaire = new Questionnaire({
            name: bartender.name,
            email: bartender.email,
            yearsOfExperience: yearsOfExperience,
            specialties: specialties,
            certifications: certifications,
            hourlyRate: hourlyRate,
            location: location,
            availability: availability,
            bio: bio,
            portfolio: portfolio
        });

        await questionnaire.save();

        res.status(201).json({ message: 'Questionnaire submitted successfully!', questionnaireId: questionnaire._id });

    } catch (error) {
        console.error('Error submitting questionnaire:', error);
        res.status(500).json({ message: 'Error submitting questionnaire', error: error.message });
    }
};

module.exports = { submitQuestionnaire };
