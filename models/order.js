const pool = require('../config/db');

class Order {
  constructor(userId) {
    this.user_id = userId;
  }

  static placeOrder(order, callback) {
    pool.query('INSERT INTO orders (user_id) VALUES ($1)', [order.user_id], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }
}

module.exports = Order;
