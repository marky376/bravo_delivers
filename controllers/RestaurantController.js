import express from 'express';
import passport from 'passport';
import User from '../models/User.js'; // Assuming you have a User model


const { Request, Response } = express;
/**
 * Get the status of the restaurant.
 */

const getStatus = (req, res) => {
    res.status(200).json({ message: 'Restaurant is operational' });
};

/**
 * Handle user login.
 */

const login = (req, res) => {
    // Implement login logic
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Login failed' });
            }
            return res.status(200).json({ message: 'Login successful', user });
        });
    })(req, res);

};
/**
 * Handle user registration.
 */

const register = (req, res) => {
    const register = async (req, res) => {
        const { username, password } = req.body;

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            // Create a new user
            const newUser = new User({ username, password });
            await newUser.save();

            return res.status(201).json({ message: 'User registered successfully', user: newUser });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export default {
    getStatus,
    login,
    register
};