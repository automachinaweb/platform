const Bartender = require('../models/bartender.model');
const Questionnaire = require('../models/questionnaire.model');

exports.getAllBartenders = async (req, res) => {
    try {
        const bartenders = await Bartender.findAll({
            include: [{
                model: Questionnaire,
                as: 'questionnaireData',
                required: false // This is like a LEFT JOIN
            }],
            attributes: { exclude: ['password_hash'] }
        });
        res.status(200).json(bartenders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBartenderById = async (req, res) => {
    try {
        const bartender = await Bartender.findByPk(req.params.id, {
            include: [{
                model: Questionnaire,
                as: 'questionnaireData',
                required: false // LEFT JOIN
            }],
            attributes: { exclude: ['password_hash'] }
        });

        if (!bartender) {
            return res.status(404).json({ message: 'Bartender not found' });
        }

        res.status(200).json(bartender);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
