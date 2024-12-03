const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/add', async (req, res) => {
    const { user_id, item_id, quantity } = req.body;
    try {
        const newCartItem = await pool.query(
            "INSERT INTO cart_items (user_id, item_id, quantity) VALUES ($1, $2, $3) RETURNING *",
            [user_id, item_id, quantity]
        );
        res.json(newCartItem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const cartItems = await pool.query(
            "SELECT * FROM cart_items WHERE user_id = $1",
            [user_id]
        );
        res.json(cartItems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.put('/update', async (req, res) => {
    const { cart_item_id, quantity } = req.body;
    try {
        const updatedCartItem = await pool.query(
            "UPDATE cart_items SET quantity = $1 WHERE cart_item_id = $2 RETURNING *",
            [quantity, cart_item_id]
        );
        res.json(updatedCartItem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.delete('/remove/:cart_item_id', async (req, res) => {
    const { cart_item_id } = req.params;
    try {
        await pool.query(
            "DELETE FROM cart_items WHERE cart_item_id = $1",
            [cart_item_id]
        );
        res.send("Item removed from cart");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;