const db = require('../config/db');

class Cart {
  constructor(userId, bookId, quantity) {
    this.user_id = userId;
    this.book_id = bookId;
    this.quantity = quantity;
  }

  static getCartItems(userId, callback) {
    db.query(
      'SELECT * FROM carts WHERE user_id = ?',
      [userId],
      (err, results) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, results);
      }
    );
  }

  static addToCart(cartItem, callback) {
    db.query('INSERT INTO carts SET ?', cartItem, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }

  static clearCart(userId, callback) {
    db.query('DELETE FROM carts WHERE user_id = ?', [userId], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }
}

module.exports = Cart;
