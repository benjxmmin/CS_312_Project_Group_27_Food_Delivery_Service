import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderTrackingPage = ({ orderId }) => {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/orders/${orderId}/status`);
        setStatus(response.data.status);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order status:', error);
        setLoading(false);
      }
    };

    // Polling the backend every 5 seconds for status updates
    const interval = setInterval(fetchOrderStatus, 5000);
    fetchOrderStatus(); // Initial call

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) {
    return <div>Loading order status...</div>;
  }

  return (
    <div>
      <h2>Order Tracking</h2>
      <p>Order ID: {orderId}</p>
      <p>Current Status: {status}</p>
    </div>
  );
};

export default OrderTrackingPage;