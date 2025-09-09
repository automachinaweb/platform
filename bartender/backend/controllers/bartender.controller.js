const Bartender = require('../models/bartender.model');

exports.getAllBartenders = async (req, res) => {
    try {
        const bartenders = await Bartender.find({}).select('-password');
        res.status(200).json(bartenders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBartenderById = async (req, res) => {
    try {
        const bartender = await Bartender.findById(req.params.id).select('-password');
        if (!bartender) {
            return res.status(404).json({ message: 'Bartender not found' });
        }
        res.status(200).json(bartender);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
