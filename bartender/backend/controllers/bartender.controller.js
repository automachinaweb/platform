const Bartender = require('../models/bartender.model');
const Questionnaire = require('../models/questionnaire.model');
const mongoose = require('mongoose');

exports.getAllBartenders = async (req, res) => {
    try {
        const bartenders = await Bartender.aggregate([
            {
                $lookup: {
                    from: 'questionnaires', // The name of the questionnaire collection
                    localField: 'email',
                    foreignField: 'email',
                    as: 'questionnaireData'
                }
            },
            {
                $unwind: {
                    path: '$questionnaireData',
                    preserveNullAndEmptyArrays: true // Keep bartenders even if they don't have a questionnaire
                }
            },
            {
                $project: {
                    password: 0 // Exclude the password field
                }
            }
        ]);
        res.status(200).json(bartenders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBartenderById = async (req, res) => {
    try {
        const bartender = await Bartender.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(req.params.id) }
            },
            {
                $lookup: {
                    from: 'questionnaires',
                    localField: 'email',
                    foreignField: 'email',
                    as: 'questionnaireData'
                }
            },
            {
                $unwind: {
                    path: '$questionnaireData',
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    password: 0
                }
            }
        ]);

        if (bartender.length === 0) {
            return res.status(404).json({ message: 'Bartender not found' });
        }

        res.status(200).json(bartender[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
