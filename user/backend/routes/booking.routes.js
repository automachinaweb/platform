const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// This route handles the creation of a new booking.
// A POST request to / will call the createBooking function in the booking controller.
router.post('/', verifyToken, bookingController.createBooking);

// This route handles the retrieval of all bookings.
// A GET request to / will call the getAllBookings function in the booking controller.
router.get('/', bookingController.getAllBookings);

// This route handles the request creation attached to a bartender
router.post('/request', verifyToken, bookingController.initiateRequest);

// This route handles the retrieval of a single booking by its ID.
// A GET request to /:id will call the getBookingById function in the booking controller.
router.get('/:id', bookingController.getBookingById);

// Get Chat Messages for a Booking
router.get('/:id/messages', verifyToken, bookingController.getMessages);

// Seed Test Data
router.post('/seed-test', bookingController.seedTestBooking);

module.exports = router;
