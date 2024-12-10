const express = require('express');
const cors = require('cors'); // Import CORS middleware
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Default route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Food Delivery Service API');
});

// Importing route files
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const scheduledOrdersRoutes = require('./routes/scheduledOrdersRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');

// Mounting routes
app.use('/api/users', userRoutes); // User routes
app.use('/api/cart', cartRoutes); // Cart routes
app.use('/api/reviews', reviewsRoutes); // Reviews routes
app.use('/api/orders', scheduledOrdersRoutes); // Order scheduling routes
app.use('/api', restaurantRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});