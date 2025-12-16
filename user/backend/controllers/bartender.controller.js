const Bartender = require('../models/bartender.model');
const Questionnaire = require('../models/questionnaire.model');

exports.getBartenders = async (req, res) => {
    try {
        const bartenders = await Bartender.findAll({
            include: [{
                model: Questionnaire,
                required: false // Left join
            }]
        });

        // Transform data to match frontend expectations
        const formattedBartenders = bartenders.map(b => {
            const q = b.Questionnaire || {};
            return {
                id: b.id,
                name: b.name,
                avatar: b.profileUrl || "https://images.unsplash.com/photo-1542178243-bc2cd20880eb", // Default avatar
                rating: 4.8, // Mock rating as we don't have reviews yet
                reviews: 124, // Mock reviews
                verified: true,
                experience: `${q.experienceYears || 0} years`,
                location: q.currentAddress || "Unknown", // Simplification
                availability: ["Mon", "Fri", "Sat"], // Mock availability
                specialties: q.courseSpecializations ? q.courseSpecializations.split(',') : ["Cocktails", "Flair"],
                price: "$100/hr" // Mock price logic
            };
        });

        res.json(formattedBartenders);
    } catch (error) {
        console.error("Error fetching bartenders:", error);
        res.status(500).json({ message: error.message });
    }
};

exports.getBartenderById = async (req, res) => {
    try {
        const bartender = await Bartender.findByPk(req.params.id, {
            include: [{ model: Questionnaire }]
        });

        if (!bartender) {
            return res.status(404).json({ message: 'Bartender not found' });
        }

        const q = bartender.Questionnaire || {};
        
        const formattedBartender = {
            id: bartender.id,
            name: bartender.name,
            avatar: bartender.profileUrl || "https://images.unsplash.com/photo-1542178243-bc2cd20880eb",
            rating: 4.9,
            reviews: 56,
            verified: true,
            experience: `${q.experienceYears || 0} years`,
            location: q.currentAddress || "Unknown",
            about: q.responsibilities1 || "Passionate bartender...", 
            specialties: q.courseSpecializations ? q.courseSpecializations.split(',') : ["Mixology", "Flair"],
            availability: ["Fri", "Sat", "Sun"],
            price: "$120/hr",
            languages: ["English", "Spanish"] // Mock
        };

        res.json(formattedBartender);
    } catch (error) {
        console.error("Error fetching bartender:", error);
        res.status(500).json({ message: error.message });
    }
};
