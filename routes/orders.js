const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Cart = require('../models/cart');
const verifyToken = require('../routes/middleware/verifyToken'); // Import your JWT verification middleware

// Apply the verifyToken middleware to these routes
router.use(verifyToken);

router.post('/place-order', (req, res) => {
  const { userId } = req.body;

  // Create an order record
  const order = new Order(userId);

  Order.placeOrder(order, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error placing the order' });
    }

    // Clear the user's cart after placing the order
    Cart.clearCart(userId, (err, cartResult) => {
      if (err) {
        return res.status(500).json({ error: 'Error clearing the cart' });
      }
      res.status(201).json({ message: 'Order placed successfully' });
    });
  });
});

module.exports = router;
