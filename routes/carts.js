const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');
const verifyToken = require('../middleware/verifyToken'); // Import your JWT verification middleware

// Apply the verifyToken middleware to these routes
router.use(verifyToken);

router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  // Get cart items for a user
  Cart.getCartItems(userId, (err, cartItems) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching cart items' });
    }
    res.status(200).json(cartItems);
  });
});

router.post('/add', (req, res) => {
  const { userId, bookId, quantity } = req.body;

  // Add book to the user's cart
  const cartItem = new Cart(userId, bookId, quantity);

  Cart.addToCart(cartItem, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error adding to cart' });
    }
    res.status(201).json({ message: 'Added to cart successfully' });
  });
});

router.delete('/clear/:userId', (req, res) => {
  const userId = req.params.userId;

  // Clear the user's cart
  Cart.clearCart(userId, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Error clearing the cart' });
    }
    res.status(200).json({ message: 'Cart cleared successfully' });
  });
});

module.exports = router;
