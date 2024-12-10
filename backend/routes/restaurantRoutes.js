const express = require('express');
const router = express.Router();
const pool = require('../db'); // Database connection

// Get all restaurants
router.get('/restaurants', async (req, res) => {
  try {
    const restaurants = await pool.query('SELECT * FROM restaurants');
    res.json(restaurants.rows);
  } catch (error) {
    console.error('Error fetching restaurants:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get details of a specific restaurant
router.get('/restaurants/:restaurantId', async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const restaurant = await pool.query('SELECT * FROM restaurants WHERE restaurant_id = $1', [restaurantId]);
    if (restaurant.rows.length === 0) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    const reviews = await pool.query('SELECT * FROM reviews WHERE restaurant_id = $1', [restaurantId]);
    res.json({ restaurant: restaurant.rows[0], reviews: reviews.rows });
  } catch (error) {
    console.error('Error fetching restaurant details:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;