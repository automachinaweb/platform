const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const { authenticateToken } = require('../middleware/auth.middleware');

router.use(authenticateToken); // Protect all routes

router.get('/requests', bookingController.getIncomingRequests);
router.get('/schedule', bookingController.getMySchedule);
router.post('/:id/accept', bookingController.acceptBooking);
router.post('/:id/reject', bookingController.rejectBooking);
router.get('/history', bookingController.getBookingHistory);

// Chat History
router.get('/:id/messages', bookingController.getMessages);

// Test Route - REMOVED for Production
// router.post('/test-seed', bookingController.createTestBooking);

module.exports = router;
