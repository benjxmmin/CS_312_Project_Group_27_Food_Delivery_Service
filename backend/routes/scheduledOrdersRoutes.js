const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/:order_id/status', async (req, res) => {
  const { order_id } = req.params;
  try {
    const orderStatus = await pool.query(
      "SELECT status FROM scheduled_orders WHERE scheduled_order_id = $1",
      [order_id]
    );
    if (orderStatus.rows.length === 0) {
      return res.status(404).json({ msg: 'Order not found' });
    }
    res.json(orderStatus.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post('/schedule', async (req, res) => {
    const { user_id, restaurant_id, scheduled_time } = req.body;
    try {
        const newScheduledOrder = await pool.query(
            "INSERT INTO scheduled_orders (user_id, restaurant_id, scheduled_time) VALUES ($1, $2, $3) RETURNING *",
            [user_id, restaurant_id, scheduled_time]
        );
        res.json(newScheduledOrder.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.get('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    try {
        const scheduledOrders = await pool.query(
            "SELECT * FROM scheduled_orders WHERE user_id = $1",
            [user_id]
        );
        res.json(scheduledOrders.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;