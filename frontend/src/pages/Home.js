import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <div className="py-5">
        <h1 className="mb-4">Welcome to the Food Delivery Platform</h1>
        <p className="mb-4">
          Your favorite meals delivered to your door. Browse restaurants, add items to your cart, and track your orders in real time.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/signup" className="btn btn-primary">Sign Up</Link>
          <Link to="/signin" className="btn btn-outline-secondary">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;