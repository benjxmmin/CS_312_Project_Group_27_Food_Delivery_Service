import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar component
import Home from './pages/Home';
import BrowseRestaurants from './pages/BrowseRestaurants';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import OrderTrackingPage from './pages/OrderTrackingPage';

function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar is placed here so it shows on every page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<BrowseRestaurants />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/order-tracking/:orderId" element={<OrderTrackingPage />} />
      </Routes>
    </Router>
  );
}

export default App;