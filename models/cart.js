const pool = require('../config/db');

class Cart {
  constructor(userId, bookId, quantity) {
    this.user_id = userId;
    this.book_id = bookId;
    this.quantity = quantity;
  }

  static getCartItems(userId, callback) {
    pool.query('SELECT * FROM carts WHERE user_id = $1', [userId], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.rows);
    });
  }

  static addToCart(cartItem, callback) {
    pool.query('INSERT INTO carts (user_id, book_id, quantity) VALUES ($1, $2, $3)', [cartItem.user_id, cartItem.book_id, cartItem.quantity], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }

  static clearCart(userId, callback) {
    pool.query('DELETE FROM carts WHERE user_id = $1', [userId], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }
}

module.exports = Cart;
