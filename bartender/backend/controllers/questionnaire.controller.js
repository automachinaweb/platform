const Questionnaire = require('../models/questionnaire.model');
const Bartender = require('../models/bartender.model'); // To fetch name and email

const submitQuestionnaire = async (req, res) => {
    try {
        const { yearsOfExperience, specialties, certifications, hourlyRate, location, availability, bio, portfolio } = req.body;
        const bartenderId = req.userId; // From authentication middleware

        // Validation can be improved with a library like Joi, but keeping it simple for now.
        // The database model will also perform some validation.

        // Fetch bartender's name and email
        const bartender = await Bartender.findByPk(bartenderId);
        if (!bartender) {
            return res.status(404).json({ message: 'Bartender not found.' });
        }

        // Check if a questionnaire for this email already exists
        const existingQuestionnaire = await Questionnaire.findOne({ where: { email: bartender.email } });
        if (existingQuestionnaire) {
            // Update existing questionnaire
            await existingQuestionnaire.update({
                name: bartender.name,
                yearsOfExperience,
                specialties,
                certifications,
                hourlyRate,
                location,
                availability,
                bio,
                portfolio
            });
            return res.status(200).json({ message: 'Questionnaire updated successfully!', questionnaireId: existingQuestionnaire.id });
        }

        // Create new questionnaire
        const questionnaire = await Questionnaire.create({
            name: bartender.name,
            email: bartender.email,
            yearsOfExperience,
            specialties,
            certifications,
            hourlyRate,
            location,
            availability,
            bio,
            portfolio
        });

        res.status(201).json({ message: 'Questionnaire submitted successfully!', questionnaireId: questionnaire.id });

    } catch (error) {
        console.error('Error submitting questionnaire:', error);
        res.status(500).json({ message: 'Error submitting questionnaire', error: error.message });
    }
};

module.exports = { submitQuestionnaire };
