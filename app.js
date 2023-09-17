const express = require('express');
require('dotenv').config(); // Load environment variables
const app = express();
const port = process.env.PORT;

// Middleware
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/books', require('./routes/books'));
app.use('/carts', require('./routes/carts'));
app.use('/orders', require('./routes/orders'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
