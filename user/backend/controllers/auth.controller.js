const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const signup = async (req, res) => {
    try {
        const { name, email, password, phone_number, role } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password_hash,
            phone_number,
            role: role || 'USER'
        });

        res.status(201).json({
            message: 'User created successfully',
            userId: user.id
        });

    } catch (error) {
        console.error('Signup Error:', error);
        res.status(500).json({
            message: 'Error creating user',
            error: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password_hash);
        if (!isValidPassword) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '1h' }
        );

        res.json({ token });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({
            message: 'Error during login',
            error: error.message
        });
    }
};

module.exports = { signup, login };
