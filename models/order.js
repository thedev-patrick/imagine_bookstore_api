const db = require('../config/db');

class Order {
  constructor(userId) {
    this.user_id = userId;
  }

  static placeOrder(order, callback) {
    db.query('INSERT INTO orders SET ?', order, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }
}

module.exports = Order;
