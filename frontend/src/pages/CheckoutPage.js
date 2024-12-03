import React, { useState } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
  const [scheduledTime, setScheduledTime] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');

  const handleScheduleOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/orders/schedule', {
        user_id: 1,
        restaurant_id: 1,
        scheduled_time: `${scheduledDate}T${scheduledTime}:00.000Z`,
      });
      alert('Order scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling order:', error);
      alert('Error scheduling order. Please try again.');
    }
  };

  return (
    <div className="container my-4">
      <h2>Checkout Page</h2>
      <form onSubmit={handleScheduleOrder}>
        <div className="form-group">
          <label>Choose a date for delivery:</label>
          <input
            type="date"
            className="form-control"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Choose a time for delivery:</label>
          <input
            type="time"
            className="form-control"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Schedule Order</button>
      </form>
    </div>
  );
};

export default CheckoutPage;