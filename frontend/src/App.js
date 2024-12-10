import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Ensure Navbar is properly imported
import Home from './pages/Home'; // Ensure Home component is imported
import BrowseRestaurants from './pages/BrowseRestaurants'; // Ensure BrowseRestaurants is imported
import CartPage from './pages/CartPage'; // Ensure CartPage is imported
import CheckoutPage from './pages/CheckoutPage'; // Ensure CheckoutPage is imported
import SignUp from './pages/SignUp'; // Ensure SignUp is imported
import SignIn from './pages/SignIn'; // Ensure SignIn is imported
import OrderTrackingPage from './pages/OrderTrackingPage'; // Ensure OrderTrackingPage is imported
import ReviewsPage from './pages/ReviewsPage'; // Import the new ReviewsPage component

function App() {
  return (
    <Router>
      {/* Navbar is placed here so it displays on every page */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<BrowseRestaurants />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
        <Route path="/reviews/:restaurantId" element={<ReviewsPage />} /> {/* New Route for ReviewsPage */}
      </Routes>
    </Router>
  );
}

export default App;