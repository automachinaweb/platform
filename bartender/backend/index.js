require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const questionnaireRoutes = require('./routes/questionnaire.routes');
const bartenderRoutes = require('./routes/bartender.routes');
const sequelize = require('./db');

// Import models
// Import models
const Bartender = require('./models/bartender.model');
const Questionnaire = require('./models/questionnaire.model');
const BookingRequest = require('./models/bookingRequest.model');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
const emptyStringsToNull = require('./middleware/emptyStringsToNull.middleware');
app.use(emptyStringsToNull);

app.get('/', (req, res) => {
    res.send('Bartender Backend is running!');
});


// Routes
app.use('/bartender/auth', authRoutes);
app.use('/bartender/questionnaire', questionnaireRoutes);
app.use('/bartender/bookings', require('./routes/booking.routes'));
app.use('/bartender', bartenderRoutes);


// Define associations
Bartender.hasOne(Questionnaire, { foreignKey: 'email', sourceKey: 'email', as: 'questionnaireData' });
Questionnaire.belongsTo(Bartender, { foreignKey: 'email', targetKey: 'email' });

Bartender.hasMany(BookingRequest, { foreignKey: 'bartenderId' });
BookingRequest.belongsTo(Bartender, { foreignKey: 'bartenderId' });


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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Bartender Server running on port ${PORT}`);
});
