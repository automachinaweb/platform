const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Message = sequelize.define('Message', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    senderType: {
        type: DataTypes.ENUM('USER', 'BARTENDER'),
        allowNull: false
    },
    bookingId: {
        type: DataTypes.INTEGER,
        allowNull: true // Can be optionally linked to a specific booking context
    },
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    tableName: 'messages'
});

module.exports = Message;
