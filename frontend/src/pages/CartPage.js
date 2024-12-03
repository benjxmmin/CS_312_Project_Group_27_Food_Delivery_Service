import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart/1');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div className="container my-4">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="list-group">
          {cartItems.map((item) => (
            <li key={item.cart_item_id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>Item ID: {item.item_id}</h5>
                <p>Quantity: {item.quantity}</p>
              </div>
              <div>
                <button className="btn btn-success mr-2">+</button>
                <button className="btn btn-danger mr-2">-</button>
                <button className="btn btn-outline-danger">Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button className="btn btn-primary mt-4" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
      )}
    </div>
  );
};

export default CartPage;