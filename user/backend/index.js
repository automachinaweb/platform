require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const bookingRoutes = require('./routes/booking.routes');

const app = express();

app.use(cors({
    origin: "*", // your frontend URL
    credentials: true
  }));

// Middleware
app.use(cors());
app.use(express.json());

// Routes - Note the path change
app.use('/user/auth', authRoutes);  
app.use('/user/bookings', bookingRoutes);
  

// MongoDB Connection
const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something broke!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`User Server is running on port ${PORT}`);
});
