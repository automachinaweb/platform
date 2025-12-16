const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Bartender = require('../models/bartender.model');

const signup = async (req, res) => {
    try {
        const { 
            name, 
            email, 
            password, 
            phoneNo,
            profileUrl
        } = req.body;

        // Check if bartender exists
        const existingBartender = await Bartender.findOne({ where: { email } });
        if (existingBartender) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create new bartender
        const bartender = await Bartender.create({
            name,
            email,
            password_hash,
            phoneNo,
            profileUrl
        });

        res.status(201).json({
            message: 'Bartender created successfully',
            userId: bartender.id
        });

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({
            message: 'Error creating bartender',
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const bartender = await Bartender.findOne({ where: { email } });
        if (!bartender) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, bartender.password_hash);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { 
                userId: bartender.id, 
                role: 'BARTENDER',
                email: bartender.email
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        res.json({ 
            token,
            user: {
                id: bartender.id,
                name: bartender.name,
                email: bartender.email
            }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            message: 'Error during login',
            error: error.message
        });
    }
    
};

module.exports = { signup, login };