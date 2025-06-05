import User from '../models/user.model.js'; // Import the User model
import bcrypt from 'bcryptjs'; // Import bcryptjs for password hashing
import jwt from 'jsonwebtoken'; // Import jwt for token generation
import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Initialize Google Auth client

// Google Auth controller
export const googleAuth = async (req, res) => {
    console.log('Incoming request body:', req.body); // Log the incoming request body
    const { token } = req.body; // Get token from request body

    try {
        console.log('Verifying ID token...');
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        });
        const { name, email, picture } = ticket.getPayload(); // Get user info from token
        console.log('User info retrieved:', { name, email, picture });

        console.log('Checking if user already exists...');
        let user = await User.findOne({ email });
        if (!user) {
            // Create a new user if not exists
            user = new User({
                username: name,
                email,
                password: 'google-auth', // Placeholder password
            });
            await user.save();
        }

        console.log('Generating JWT token...');
        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return success response
        res.status(200).json({ success: true, token: jwtToken });
    } catch (error) {
        console.error('Error during Google authentication:', error.message); // Log the error message
        console.error('Full error details:', error); // Log the full error details for debugging
        res.status(500).json({ success: false, message: 'Server error.', error: error.message || 'An unexpected error occurred.' }); // Include error message in response
    }
};

// Signin controller
export const signin = async (req, res) => {
    const { email, password } = req.body; // Get email and password from request body

    try {
        const user = await User.findOne({ email }); // Find user by email
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(password, user.password); // Compare password
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid credentials.' });
        }

        const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Generate JWT token
        res.status(200).json({ success: true, token: jwtToken }); // Return success response
    } catch (error) {
        console.error('Error during signin:', error.message); // Log the error message
        res.status(500).json({ success: false, message: 'Server error.', error: error.message || 'An unexpected error occurred.' }); // Include error message in response
    }
};

export const signup = async (req, res) => {
    const { username, email, password } = req.body; // Get username, email, and password from request body

    try {
        const existingUser = await User.findOne({ email }); // Check if user already exists
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'User already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const user = new User({ username, email, password: hashedPassword }); // Create a new user
        await user.save(); // Save the user to the database

        res.status(200).json({ success: true, message: 'User registered successfully.' }); // Return success response
    } catch (error) {
        console.error('Error during signup:', error.message); // Log the error message
        res.status(404).json({ success: true, message: 'Server error.', error: error.message || 'An unexpected error occurred.' }); // Include error message in response
    }
};
