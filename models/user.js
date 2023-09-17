const pool = require('../config/db');

class User {
  constructor(username, password, email) {
    this.username = username;
    this.password = password;
    this.email = email;
  }
  static findByUsername(username, callback) {
    pool.query('SELECT * FROM users WHERE username = $1', [username], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.rows[0]);
    });
  }

  static create(user, callback) {
    // Check if a user with the same username or email already exists
    const checkQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
    const checkValues = [user.username, user.email];
  
    pool.query(checkQuery, checkValues, (checkErr, checkResult) => {
      if (checkErr) {
        return callback(checkErr, null);
      }
  
      if (checkResult.rows.length > 0) {
        // A user with the same username or email already exists
        const error = new Error('User with the same username or email already exists');
        return callback(error, null);
      }
  
      // No duplicate users found, proceed with user creation
      const insertQuery = 'INSERT INTO users (username, password, email) VALUES ($1, $2, $3)';
      const insertValues = [user.username, user.password, user.email];
  
      pool.query(insertQuery, insertValues, (err, result) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, result);
      });
    });
  }
}

module.exports = User;
