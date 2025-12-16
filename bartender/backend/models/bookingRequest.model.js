const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const BookingRequest = sequelize.define('BookingRequest', {
    userId: { type: DataTypes.INTEGER, allowNull: false }, // ID of the user requesting
    bartenderId: { type: DataTypes.INTEGER, allowNull: true }, // Targeted bartender (if direct booking)
    // Core Event Details duplicated for bartender visibility
    eventType: { type: DataTypes.STRING, allowNull: false },
    eventDate: { type: DataTypes.DATEONLY, allowNull: false },
    startTime: { type: DataTypes.TIME, allowNull: false },
    endTime: { type: DataTypes.TIME, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    guestCount: { type: DataTypes.INTEGER },
    
    // Status Flow
    status: { 
        type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REJECTED', 'COMPLETED', 'CANCELLED'), 
        defaultValue: 'PENDING' 
    },
    
    // Financials
    offeredAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    
    // Link to the full booking details in User DB (conceptually)
    originalBookingId: { type: DataTypes.INTEGER, allowNull: false } 
}, {
    tableName: 'booking_requests',
    timestamps: true
});

module.exports = BookingRequest;
