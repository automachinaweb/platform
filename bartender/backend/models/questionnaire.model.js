const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Questionnaire = sequelize.define('Questionnaire', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Assuming one questionnaire per bartender (email)
    },
    yearsOfExperience: {
        type: DataTypes.ENUM('1-2 years', '3-5 years', '6-10 years', '10+ years'),
        allowNull: false
    },
    specialties: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    certifications: {
        type: DataTypes.STRING,
        allowNull: true
    },
    hourlyRate: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    availability: {
        type: DataTypes.JSONB,
        allowNull: true
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    portfolio: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'questionnaires',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Questionnaire;
