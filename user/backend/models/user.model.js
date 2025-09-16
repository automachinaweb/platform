const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('ADMIN', 'USER', 'BARTENDER'),
        defaultValue: 'USER'
    },
    profile_image: {
        type: DataTypes.STRING
    },
    phone_number: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED'),
        defaultValue: 'ACTIVE'
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;