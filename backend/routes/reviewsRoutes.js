const express = require('express');
const router = express.Router();
const pool = require('../db');

// Add a new review
router.post('/', async (req, res) => {
  const { restaurantId, text } = req.body;
  console.log('Incoming POST request:', { restaurantId, text }); // Debugging log

  if (!restaurantId || !text) {
    return res.status(400).json({ message: 'Restaurant ID and text are required' });
  }

  try {
    const newReview = await pool.query(
      'INSERT INTO reviews (restaurant_id, text, created_at) VALUES ($1, $2, NOW()) RETURNING *',
      [restaurantId, text]
    );
    console.log('Inserted Review:', newReview.rows[0]);
    res.status(201).json(newReview.rows[0]); // Return the newly added review
  } catch (error) {
    console.error('Error adding review:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;