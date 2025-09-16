const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Booking = sequelize.define('Booking', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    eventType: { type: DataTypes.ENUM('Birthday Party', 'Wedding Reception', 'Corporate Event', 'Private Celebration'), allowNull: false },
    duration: { type: DataTypes.ENUM('2-3 hours', '4-5 hours', '6-7 hours', '8+ hours'), allowNull: false },
    guestCount: { type: DataTypes.ENUM('10-25 guests', '26-50 guests', '51-100 guests', '100+ guests'), allowNull: false },
    servicePreferences: { type: DataTypes.JSONB },
    ambianceAndExtras: { type: DataTypes.JSONB },
}, { 
    timestamps: true,
    tableName: 'bookings'
});

module.exports = Booking;