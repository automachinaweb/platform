// This file can be deleted as auth functionality is moved to user and bartender backends
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
        const existingBartender = await Bartender.findOne({ email });
        if (existingBartender) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new bartender with profile info
        const bartender = new Bartender({
            name,
            email,
            password: hashedPassword,
            phoneNo,
            profileUrl
        });

        await bartender.save();

        
        res.status(201).json({
            message: 'Bartender created successfully',
            userId: bartender._id
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

        const bartender = await Bartender.findOne({ email });
        if (!bartender) {

            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isValidPassword = await bcrypt.compare(password, bartender.password);
        if (!isValidPassword) {

            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { 
                userId: bartender._id, 
                role: 'BARTENDER',
                email: bartender.email
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );


        res.json({ 
            token,
            user: {
                id: bartender._id,
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