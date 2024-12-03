const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
    const { user_id, restaurant_id, rating, review_text } = req.body;
    try {
        const newReview = await pool.query(
            "INSERT INTO reviews (user_id, restaurant_id, rating, review_text) VALUES ($1, $2, $3, $4) RETURNING *",
            [user_id, restaurant_id, rating, review_text]
        );
        res.json(newReview.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get('/:restaurant_id', async (req, res) => {
    const { restaurant_id } = req.params;
    try {
        const reviews = await pool.query(
            "SELECT * FROM reviews WHERE restaurant_id = $1",
            [restaurant_id]
        );
        res.json(reviews.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;