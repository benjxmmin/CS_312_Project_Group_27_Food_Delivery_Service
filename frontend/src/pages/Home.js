import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Food Delivery Platform</h1>
      <p>Your favorite meals delivered to your door.</p>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <Link to="/signin">
        <button>Sign In</button>
      </Link>
    </div>
  );
};

export default Home;