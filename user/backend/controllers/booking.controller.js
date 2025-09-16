const Booking = require('../models/booking.model');

// This function handles the creation of a new booking.
exports.createBooking = async (req, res) => {
    try {
        // A new booking is created with the data from the request body.
        const savedBooking = await Booking.create(req.body);
        // The saved booking is sent back as a response.
        res.status(201).json(savedBooking);
    } catch (error) {
        // If there is an error, a 500 status code is sent back with an error message.
        res.status(500).json({ message: error.message });
    }
};
