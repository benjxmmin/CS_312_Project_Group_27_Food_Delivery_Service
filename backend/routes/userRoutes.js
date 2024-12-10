const express = require('express');
const router = express.Router();
const pool = require('../db'); // PostgreSQL connection
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating authentication tokens

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Secret key for JWT

// User Sign-Up Route
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, hashedPassword]
    );

    // Generate a JWT token
    const token = jwt.sign({ id: newUser.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });

    // Respond with success message and token
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    // Log the error to the server console
    console.error('Signup Error:', error.message);

    // Send a generic error response
    res.status(500).json({ message: 'Server error' });
  }
});

// User Sign-In Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user exists
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.rows[0].id }, JWT_SECRET, { expiresIn: '1h' });

    // Respond with success message and token
    res.json({ message: 'Sign-in successful', token });
  } catch (error) {
    // Log the error to the server console
    console.error('Sign-In Error:', error.message);

    // Send a generic error response
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;