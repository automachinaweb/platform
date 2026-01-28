const BookingRequest = require('../models/bookingRequest.model');

// Get all pending requests targeting this bartender (or open pool requests in future)
const getIncomingRequests = async (req, res) => {
    try {
        console.log('getIncomingRequests called'); // DEBUG
        console.log('User from token:', req.user); // DEBUG

        if (!req.user || !req.user.userId) {
            console.error('User ID missing in request object', req.user);
            return res.status(401).json({ message: 'User not authenticated properly' });
        }

        const bartenderId = req.user.userId;
        console.log('Fetching requests for bartenderId:', bartenderId); // DEBUG

        const requests = await BookingRequest.findAll({
            where: { 
                bartenderId: bartenderId,
                status: 'PENDING' 
            },
            order: [['createdAt', 'DESC']]
        });
        
        console.log(`Found ${requests.length} requests`); // DEBUG
        res.json(requests);
    } catch (error) {
        console.error('Error in getIncomingRequests:', error); // DEBUG
        res.status(500).json({ message: 'Error fetching requests', error: error.message });
    }
};

// Accept a booking
const acceptBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const bartenderId = req.user.userId;

        const booking = await BookingRequest.findOne({ 
            where: { id, bartenderId, status: 'PENDING' } 
        });

        if (!booking) {
            return res.status(404).json({ message: 'Booking request not found or no longer active' });
        }

        booking.status = 'ACCEPTED';
        await booking.save();

        // TODO: Notify User Backend that booking is accepted
        
        res.json({ message: 'Booking accepted successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Error accepting booking', error: error.message });
    }
};

// Reject a booking
const rejectBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const bartenderId = req.user.userId;

        const booking = await BookingRequest.findOne({ 
            where: { id, bartenderId, status: 'PENDING' } 
        });

        if (!booking) {
            return res.status(404).json({ message: 'Booking request not found' });
        }

        booking.status = 'REJECTED';
        await booking.save();

        res.json({ message: 'Booking rejected' });
    } catch (error) {
        res.status(500).json({ message: 'Error rejecting booking', error: error.message });
    }
};

// Get Confirmed Schedule
const getMySchedule = async (req, res) => {
    try {
        const bartenderId = req.user.userId;
        const schedule = await BookingRequest.findAll({
            where: { 
                bartenderId: bartenderId,
                status: ['ACCEPTED', 'COMPLETED']
            },
            order: [['eventDate', 'ASC']]
        });
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching schedule', error: error.message });
    }
};

// FOR TESTING ONLY: Simulate an incoming request
/*
const createTestBooking = async (req, res) => {
    // ...
};
*/
// Get Booking History (Completed or Rejected functions)
const getBookingHistory = async (req, res) => {
    try {
        const bartenderId = req.user.userId;
        const history = await BookingRequest.findAll({
            where: { 
                bartenderId: bartenderId,
                status: ['COMPLETED', 'REJECTED'] 
            },
            order: [['eventDate', 'DESC']]
        });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching history', error: error.message });
    }
};

// NEW: Get Messages for a Booking (Chat History)
const getMessages = async (req, res) => {
    try {
        const { id } = req.params; // Booking ID
        
        const Message = require('../models/message.model');
        const messages = await Message.findAll({
            where: { bookingId: id },
            order: [['createdAt', 'ASC']]
        });
        
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getIncomingRequests,
    acceptBooking,
    rejectBooking,
    getMySchedule,
    getBookingHistory,
    getMessages
};
