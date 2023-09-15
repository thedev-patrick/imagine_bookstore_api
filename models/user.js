const db = require('../config/db');

class User {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  static findByUsername(username, callback) {
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results[0]);
    });
  }

  static create(user, callback) {
    db.query('INSERT INTO users SET ?', user, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  }
}

module.exports = User;
