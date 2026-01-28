require('dotenv').config();
const express = require('express');

const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const bookingRoutes = require('./routes/booking.routes');
const bartenderRoutes = require('./routes/bartender.routes');

// Models & Associations
const Bartender = require('./models/bartender.model');
const Questionnaire = require('./models/questionnaire.model');
const BookingRequest = require('./models/bookingRequest.model');

// Define Associations based on email (since no numeric FK exists)
Bartender.hasOne(Questionnaire, { foreignKey: 'email', sourceKey: 'email' });
Questionnaire.belongsTo(Bartender, { foreignKey: 'email', targetKey: 'email' });

// Association for Booking Requests
Bartender.hasMany(BookingRequest, { foreignKey: 'bartenderId' });
BookingRequest.belongsTo(Bartender, { foreignKey: 'bartenderId' });

// Association for Messages
const Message = require('./models/message.model');
BookingRequest.hasMany(Message, { foreignKey: 'bookingId' });
Message.belongsTo(BookingRequest, { foreignKey: 'bookingId' });

const app = express();
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow connections from any frontend
        methods: ["GET", "POST"]
    }
});

app.set('io', io); // Make io accessible in controllers

app.use(cors({
    origin: "*", 
    credentials: true
  }));

// Middleware
app.use(express.json());
const emptyStringsToNull = require('./middleware/emptyStringsToNull.middleware.js');
app.use(emptyStringsToNull);

// Routes - Note the path change
app.use('/user/auth', authRoutes);  
app.use('/user/bookings', bookingRoutes);
app.use('/user/bartenders', bartenderRoutes);

// Socket.io Logic
io.on('connection', (socket) => {
    console.log('User joined socket:', socket.id);

    // 1. Join Room (Booking ID)
    socket.on('join_chat', (data) => {
        // data = { bookingId: 1 }
        if (data.bookingId) {
            socket.join(`booking_${data.bookingId}`);
            console.log(`Socket ${socket.id} joined booking_${data.bookingId}`);
        }
    });

    // 2. Send Message
    socket.on('send_message', async (data) => {
        // data = { bookingId, senderId, senderType, content }
        console.log('Received message payload:', data);
        try {
            const Message = require('./models/message.model');
            const savedMsg = await Message.create({
                bookingId: parseInt(data.bookingId) || null,
                senderId: parseInt(data.senderId),
                senderType: data.senderType,
                content: data.content
            });
            console.log('Message saved to DB:', savedMsg.id);
            
            // Broadcast to the specific booking room
            io.to(`booking_${data.bookingId}`).emit('receive_message', savedMsg);
            console.log(`Broadcasted to booking_${data.bookingId}`);
        } catch (e) {
            console.error('CRITICAL Error saving message:', e);
            // Optionally emit error back to sender
            socket.emit('error_message', { message: 'Failed to save message' });
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const sequelize = require('./db');

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Sync all models
sequelize.sync({ alter: true })
    .then(() => console.log('Models synchronized...'))
    .catch(err => console.log('Error synchronizing models: ' + err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something broke!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`User Server (with Socket.io) is running on port ${PORT}`);
});
