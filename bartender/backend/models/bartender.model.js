const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Bartender = sequelize.define('Bartender', {
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
    phoneNo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    profileUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('ADMIN', 'USER', 'BARTENDER'),
        defaultValue: 'BARTENDER'
    }
}, {
    tableName: 'bartenders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Bartender;
