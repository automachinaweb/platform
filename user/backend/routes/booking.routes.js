const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');

// This route handles the creation of a new booking.
// A POST request to / will call the createBooking function in the booking controller.
router.post('/', bookingController.createBooking);

module.exports = router;
