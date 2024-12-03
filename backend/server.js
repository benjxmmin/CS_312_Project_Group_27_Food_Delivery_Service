const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Food Delivery Service API');
});

const cartRoutes = require('./routes/cartRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const scheduledOrdersRoutes = require('./routes/scheduledOrdersRoutes');

app.use('/api/cart', cartRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api/orders', scheduledOrdersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});