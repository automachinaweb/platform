require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');
const questionnaireRoutes = require('./routes/questionnaire.routes'); // New import
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/bartender/auth', authRoutes);
app.use('/bartender/questionnaire', questionnaireRoutes); // New route

// MongoDB Connection
const mongo_uri = process.env.MONGO_URI;
mongoose.connect(mongo_uri)
    .then(() => console.log('Connected to Bartender MongoDB Database'))
    .catch(err => console.error('MongoDB connection error:', err));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something broke!',
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Bartender Server running on port ${PORT}`);
});
