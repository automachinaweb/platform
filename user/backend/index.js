require('dotenv').config();
const express = require('express');

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
  

const sequelize = require('./db');

// Test the database connection
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Sync all models
sequelize.sync()
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
app.listen(PORT, () => {
    console.log(`User Server is running on port ${PORT}`);
});
